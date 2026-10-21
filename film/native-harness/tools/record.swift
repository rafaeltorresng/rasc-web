// Lossless, window-only source capture. Usage: recorder <windowID> <outputDir> <seconds>
// No app source or personal database access. The filter's native scale is authoritative.
import AppKit
import ApplicationServices
import ScreenCaptureKit
import AVFoundation
import CoreImage
import ImageIO
import Foundation

final class Frames: NSObject, SCStreamOutput, @unchecked Sendable {
 let directory: URL
 let ci = CIContext(options: [.cacheIntermediates: false])
 let space = CGColorSpace(name: CGColorSpace.sRGB)!
 let alphaMask: CIImage?
 let guardedWindow: SCWindow?
 var interrupted=false
 var rows: [[String: Any]] = []
 var origin: Double?
 init(_ directory: URL, alphaMask: CIImage? = nil, guardedWindow: SCWindow? = nil) { self.directory = directory; self.alphaMask = alphaMask; self.guardedWindow=guardedWindow }
 func stream(_ stream: SCStream, didOutputSampleBuffer sampleBuffer: CMSampleBuffer, of type: SCStreamOutputType) {
  guard type == .screen, sampleBuffer.isValid,
    let a = CMSampleBufferGetSampleAttachmentsArray(sampleBuffer, createIfNecessary: false) as? [[SCStreamFrameInfo: Any]],
    let raw = a.first?[.status] as? Int, SCFrameStatus(rawValue: raw) == .complete,
    let buffer = sampleBuffer.imageBuffer else { return }
  // A display-region take must never record another foreground/overlapping window.
  if let window=guardedWindow {
   guard NSRunningApplication(processIdentifier:window.owningApplication!.processID)?.isActive == true else {interrupted=true;return}
   let windows=CGWindowListCopyWindowInfo([.optionOnScreenOnly,.excludeDesktopElements],kCGNullWindowID) as? [[String:Any]] ?? []
   var found=false
   for row in windows {
    guard let id=row[kCGWindowNumber as String] as? UInt32,let data=row[kCGWindowBounds as String] as? NSDictionary,let bounds=CGRect(dictionaryRepresentation:data) else {continue}
    if id==window.windowID {found=true;if bounds != window.frame {interrupted=true};break}
    if (row[kCGWindowAlpha as String] as? Double ?? 1) > 0.01 && !bounds.isEmpty && bounds.intersects(window.frame) {interrupted=true;return}
   }
   guard found && !interrupted else {interrupted=true;return}
  }
  let pts = sampleBuffer.presentationTimeStamp.seconds
  if origin == nil { origin = pts }
  var input = CIImage(cvPixelBuffer: buffer)
  if let alphaMask {
   input=input.applyingFilter("CIBlendWithAlphaMask",parameters:["inputBackgroundImage":CIImage(color:.clear).cropped(to:input.extent),"inputMaskImage":alphaMask])
  }
  guard let image = ci.createCGImage(input, from: input.extent, format: .RGBA8, colorSpace: space) else { return }
  let name = String(format: "%05d.png", rows.count)
  guard let dst = CGImageDestinationCreateWithURL(directory.appendingPathComponent(name) as CFURL, "public.png" as CFString, 1, nil) else { return }
  CGImageDestinationAddImage(dst, image, nil)
  guard CGImageDestinationFinalize(dst) else { return }
  rows.append(["file": name, "seconds": pts - origin!, "width": image.width, "height": image.height])
 }
}
@main struct Capture {
 static func main() async throws {
  NSApplication.shared.setActivationPolicy(.prohibited)
  let id = UInt32(CommandLine.arguments[1])!
  let directory = URL(fileURLWithPath: CommandLine.arguments[2])
  try FileManager.default.createDirectory(at: directory, withIntermediateDirectories: true)
  let content = try await SCShareableContent.excludingDesktopWindows(false, onScreenWindowsOnly: false)
  guard let window = content.windows.first(where: { $0.windowID == id }) else { fatalError("Window unavailable") }
  guard window.owningApplication?.bundleIdentifier == "com.rafaeltorres.rasc.filmdemo20261020" else { fatalError("Capture requires isolated fixture") }
  let displayRegion = CommandLine.arguments.contains("--display-region")
  let filter: SCContentFilter
  if displayRegion {
   guard let display=content.displays.first(where: { $0.frame.contains(window.frame) }) else {fatalError("Fixture window must fit entirely on one Retina display")}
   filter=SCContentFilter(display: display, excludingWindows: [])
  } else { filter=SCContentFilter(desktopIndependentWindow: window) }
  guard filter.pointPixelScale >= 2 else { fatalError("Move fixture to a real Retina display") }
  let config = SCStreamConfiguration()
  config.width = Int(window.frame.width * Double(filter.pointPixelScale))
  config.height = Int(window.frame.height * Double(filter.pointPixelScale))
  if displayRegion {
   let display=content.displays.first(where: { $0.frame.contains(window.frame) })!
   config.sourceRect=window.frame.offsetBy(dx: -display.frame.minX, dy: -display.frame.minY)
   config.ignoreShadowsDisplay=true
   config.shouldBeOpaque=false
  }
  config.captureResolution = .best; config.scalesToFit = false
  config.minimumFrameInterval = CMTime(value: 1, timescale: 60)
  config.pixelFormat = kCVPixelFormatType_32BGRA
  config.colorSpaceName = CGColorSpace.sRGB
  config.showsCursor = false; config.ignoreShadowsSingleWindow = true; config.includeChildWindows = false
  var nativeAlpha: CIImage?
  if displayRegion {
   NSRunningApplication(processIdentifier: window.owningApplication!.processID)?.activate(options:[.activateAllWindows])
   try await Task.sleep(for:.milliseconds(300))
   guard NSRunningApplication(processIdentifier: window.owningApplication!.processID)?.isActive == true else {fatalError("Fixture must be frontmost for its bounded display region")}
   let shapeConfig=SCStreamConfiguration()
   shapeConfig.width=config.width; shapeConfig.height=config.height
   shapeConfig.ignoreShadowsSingleWindow=true; shapeConfig.shouldBeOpaque=false; shapeConfig.showsCursor=false
   let shape=try await SCScreenshotManager.captureImage(contentFilter: SCContentFilter(desktopIndependentWindow: window),configuration:shapeConfig)
   nativeAlpha=CIImage(cgImage:shape)
  }
  let output = Frames(directory,alphaMask:nativeAlpha,guardedWindow:displayRegion ? window : nil); let queue = DispatchQueue(label: "rasc.lossless.frames")
  let stream = SCStream(filter: filter, configuration: config, delegate: nil)
  try stream.addStreamOutput(output, type: .screen, sampleHandlerQueue: queue)
  try await stream.startCapture()
  if let target=NSRunningApplication(processIdentifier: window.owningApplication!.processID){
   target.activate(options:[.activateAllWindows]);let ax=AXUIElementCreateApplication(target.processIdentifier);var ws:CFTypeRef?;AXUIElementCopyAttributeValue(ax,kAXWindowsAttribute as CFString,&ws)
   if let windows=ws as? [AXUIElement]{var best:AXUIElement?;var distance=Double.infinity
   for w in windows {var pos:CFTypeRef?;var size:CFTypeRef?;AXUIElementCopyAttributeValue(w,kAXPositionAttribute as CFString,&pos);AXUIElementCopyAttributeValue(w,kAXSizeAttribute as CFString,&size);if let pos,let size{var p=CGPoint.zero;var s=CGSize.zero;AXValueGetValue(pos as! AXValue,.cgPoint,&p);AXValueGetValue(size as! AXValue,.cgSize,&s);let d=abs(p.x-window.frame.minX)+abs(p.y-window.frame.minY)+abs(s.width-window.frame.width)+abs(s.height-window.frame.height);if d<distance{best=w;distance=d}}};if let best{AXUIElementSetAttributeValue(best,kAXFocusedAttribute as CFString,kCFBooleanTrue)}
   }
   print("fixture active",target.isActive)
  }
  print("RECORDING \(config.width)x\(config.height), native scale \(filter.pointPixelScale)"); fflush(stdout)
  try await Task.sleep(for: .seconds(Double(CommandLine.arguments[3])!))
  try await stream.stopCapture()
  queue.sync {}
  guard !output.interrupted else {fatalError("Fixture capture interrupted, moved or occluded; take rejected") }
  let meta: [String: Any] = ["windowPoints": [window.frame.width, window.frame.height], "pointPixelScale": filter.pointPixelScale,
     "sourcePixels": [config.width, config.height], "requestedFPS": 60, "codec": "lossless PNG / sRGB", "captureMode": displayRegion ? "display region bounded to fixture, native alpha" : "desktop-independent fixture", "frames": output.rows]
  let data = try JSONSerialization.data(withJSONObject: meta, options: [.prettyPrinted, .sortedKeys])
  try data.write(to: directory.appendingPathComponent("take.json"))
  print("FINISHED \(output.rows.count) genuine frames")
 }
}
