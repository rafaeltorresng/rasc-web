import AppKit
import ApplicationServices
import ScreenCaptureKit
import CoreGraphics
import ImageIO
import Foundation
@main struct Capture {
 static func main() async throws {
  NSApplication.shared.setActivationPolicy(.prohibited)
  let id = CGWindowID(CommandLine.arguments[1])!
  let content = try await SCShareableContent.excludingDesktopWindows(false, onScreenWindowsOnly: false)
  guard let window = content.windows.first(where: { $0.windowID == id }) else { fatalError("Fixture window unavailable") }
  guard window.owningApplication?.bundleIdentifier == "com.rafaeltorres.rasc.filmdemo20261020",let target=NSRunningApplication(processIdentifier:window.owningApplication!.processID) else {fatalError("Fixture only")}
  let active=CommandLine.arguments.count<4
  if active {target.activate(options:[.activateAllWindows])}
  let ax=AXUIElementCreateApplication(target.processIdentifier);var ws:CFTypeRef?;AXUIElementCopyAttributeValue(ax,kAXWindowsAttribute as CFString,&ws)
  if let windows=ws as? [AXUIElement]{for w in windows{print("focus result",AXUIElementSetAttributeValue(w,kAXFocusedAttribute as CFString,active ? kCFBooleanTrue : kCFBooleanFalse).rawValue)}}
  try await Task.sleep(for:.milliseconds(200))
  print("target active",target.isActive)
  let config = SCStreamConfiguration()
  config.width = Int(window.frame.width * 2)
  config.height = Int(window.frame.height * 2)
  config.captureResolution = .best; config.scalesToFit = true
  config.showsCursor = false
  config.ignoreShadowsSingleWindow = true
  config.includeChildWindows = false
  let filter = SCContentFilter(desktopIndependentWindow: window)
  let image = try await SCScreenshotManager.captureImage(contentFilter: filter, configuration: config)
  let url = URL(fileURLWithPath: CommandLine.arguments[2])
  let destination = CGImageDestinationCreateWithURL(url as CFURL, "public.png" as CFString, 1, nil)!
  CGImageDestinationAddImage(destination, image, nil)
  guard CGImageDestinationFinalize(destination) else { fatalError("PNG write failed") }
  print("\(image.width) × \(image.height)")
 }
}
