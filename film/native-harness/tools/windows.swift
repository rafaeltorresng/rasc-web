import AppKit
import ScreenCaptureKit
@main struct Inspect {
static func main() async throws {
_ = NSApplication.shared
let c = try await SCShareableContent.excludingDesktopWindows(false,onScreenWindowsOnly:false)
for w in c.windows where w.owningApplication?.bundleIdentifier == "com.rafaeltorres.rasc.filmdemo20261020" {
let f=SCContentFilter(desktopIndependentWindow:w)
print(w.windowID,w.title ?? "",w.frame,"scale",f.pointPixelScale,"contentRect",f.contentRect)
}
}
}
