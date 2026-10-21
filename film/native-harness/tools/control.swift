import Cocoa
import ApplicationServices
let pid=pid_t(CommandLine.arguments[1])!
guard let app=NSRunningApplication(processIdentifier:pid), app.bundleIdentifier == "com.rafaeltorres.rasc.filmdemo20261020" else {fatalError("Isolated fixture only")}
let root=AXUIElementCreateApplication(pid)
func get(_ e:AXUIElement,_ k:String)->CFTypeRef?{var v:CFTypeRef?;AXUIElementCopyAttributeValue(e,k as CFString,&v);return v}
func dump(_ e:AXUIElement,_ depth:Int){if depth>8{return};let role=get(e,kAXRoleAttribute) as? String ?? "?",title=get(e,kAXTitleAttribute) as? String ?? "",desc=get(e,kAXDescriptionAttribute) as? String ?? "",value=get(e,kAXValueAttribute) as? String ?? "";print(String(repeating:" ",count:depth*2)+role+" | "+title+" | "+desc+" | "+value);if let ch=get(e,kAXChildrenAttribute) as? [AXUIElement]{for c in ch{dump(c,depth+1)}}}
func press(_ e:AXUIElement,_ name:String)->Bool{let text=[kAXTitleAttribute,kAXDescriptionAttribute].compactMap{get(e,$0)as? String};if text.contains(name){if AXUIElementPerformAction(e,kAXPressAction as CFString) == .success{return true}};if let ch=get(e,kAXChildrenAttribute)as?[AXUIElement]{for c in ch{if press(c,name){return true}}};return false}
let command=CommandLine.arguments[2]
if command=="activate"{print(app.activate(options:[.activateAllWindows]))}
if command=="press"{var found=false;if let ws=get(root,kAXWindowsAttribute)as?[AXUIElement]{for w in ws{if press(w,CommandLine.arguments[3]){found=true;break}}};if !found{found=press(root,CommandLine.arguments[3])};print(found)}
if command=="key"{let code=CGKeyCode(CommandLine.arguments[3])!,flags=CGEventFlags(rawValue:UInt64(CommandLine.arguments[4])!);for down in [true,false]{let e=CGEvent(keyboardEventSource:nil,virtualKey:code,keyDown:down)!;e.flags=flags;e.postToPid(pid)}}
if command=="resize"{if let ws=get(root,kAXWindowsAttribute)as?[AXUIElement]{for w in ws{if get(w,kAXTitleAttribute)as? String == CommandLine.arguments[3]{var s=CGSize(width:Double(CommandLine.arguments[4])!,height:Double(CommandLine.arguments[5])!);let v=AXValueCreate(.cgSize,&s)!;print(AXUIElementSetAttributeValue(w,kAXSizeAttribute as CFString,v).rawValue);var p=CGPoint(x:Double(CommandLine.arguments[6])!,y:Double(CommandLine.arguments[7])!);print(AXUIElementSetAttributeValue(w,kAXPositionAttribute as CFString,AXValueCreate(.cgPoint,&p)!).rawValue);AXUIElementPerformAction(w,kAXRaiseAction as CFString)}}}
}
if command=="text"{let chars=Array(CommandLine.arguments[3].utf16);for down in [true,false]{let e=CGEvent(keyboardEventSource:nil,virtualKey:0,keyDown:down)!;e.keyboardSetUnicodeString(stringLength:chars.count,unicodeString:chars);e.postToPid(pid)}}

if command=="windows" { if let ws=get(root,kAXWindowsAttribute)as?[AXUIElement]{for w in ws{dump(w,0)}} }
func editor(_ e:AXUIElement)->AXUIElement?{if get(e,kAXRoleAttribute)as?String=="AXTextArea",get(e,kAXDescriptionAttribute)as?String=="Scratchpad"{return e};if let ch=get(e,kAXChildrenAttribute)as?[AXUIElement]{for c in ch{if let r=editor(c){return r}}};return nil}
if command=="setEditor",let e=editor(root){let text=try String(contentsOfFile:CommandLine.arguments[3],encoding:.utf8);print(AXUIElementSetAttributeValue(e,kAXValueAttribute as CFString,text as CFString).rawValue);AXUIElementSetAttributeValue(e,kAXFocusedAttribute as CFString,kCFBooleanTrue);var range=CFRange(location:text.utf16.count,length:0);print(AXUIElementSetAttributeValue(e,kAXSelectedTextRangeAttribute as CFString,AXValueCreate(.cfRange,&range)!).rawValue)}
if command=="readEditor",let e=editor(root){print(get(e,kAXValueAttribute)as?String ?? "")}

func preview(_ e:AXUIElement){let role=get(e,kAXRoleAttribute)as?String ?? "";if role=="AXRadioButton"{print(get(e,kAXDescriptionAttribute)as?String ?? "",get(e,kAXValueAttribute) ?? "nil" as CFString)};if role=="AXScrollArea",get(e,kAXDescriptionAttribute)as?String=="Refined preview"{dump(e,0)};if let ch=get(e,kAXChildrenAttribute)as?[AXUIElement]{for c in ch{preview(c)}}}
if command=="preview",let ws=get(root,kAXWindowsAttribute)as?[AXUIElement]{for w in ws{preview(w)}}
func searchField(_ e:AXUIElement)->AXUIElement?{if get(e,kAXRoleAttribute)as?String=="AXTextField"{return e};if let ch=get(e,kAXChildrenAttribute)as?[AXUIElement]{for c in ch{if let r=searchField(c){return r}}};return nil}
if command=="setSearch",let ws=get(root,kAXWindowsAttribute)as?[AXUIElement]{for w in ws{if let e=searchField(w){let text=CommandLine.arguments[3];print(AXUIElementSetAttributeValue(e,kAXValueAttribute as CFString,text as CFString).rawValue);AXUIElementSetAttributeValue(e,kAXFocusedAttribute as CFString,kCFBooleanTrue);var range=CFRange(location:text.utf16.count,length:0);AXUIElementSetAttributeValue(e,kAXSelectedTextRangeAttribute as CFString,AXValueCreate(.cfRange,&range)!);break}}}
func openResult(_ e:AXUIElement)->Bool{if get(e,kAXRoleAttribute)as?String=="AXButton",(get(e,kAXDescriptionAttribute)as?String ?? "").hasPrefix("this feels almost too polished"){return AXUIElementPerformAction(e,kAXPressAction as CFString) == .success};if let ch=get(e,kAXChildrenAttribute)as?[AXUIElement]{for c in ch{if openResult(c){return true}}};return false}
if command=="openResult",let ws=get(root,kAXWindowsAttribute)as?[AXUIElement]{for w in ws{if openResult(w){print(true);break}}}

if command=="status"{print("active",app.isActive,"hidden",app.isHidden,"policy",app.activationPolicy.rawValue,"trusted",AXIsProcessTrusted());if let ws=get(root,kAXWindowsAttribute)as?[AXUIElement]{for w in ws{print("window",get(w,kAXTitleAttribute) ?? "" as CFString,"main",get(w,kAXMainAttribute) ?? "nil" as CFString,"focused",get(w,kAXFocusedAttribute) ?? "nil" as CFString)}}}
if command=="deactivate"{app.hide()}
if command=="focusWindow",let ws=get(root,kAXWindowsAttribute)as?[AXUIElement]{for w in ws{if get(w,kAXTitleAttribute)as?String=="Rasc"{app.activate(options:[.activateAllWindows]);AXUIElementPerformAction(w,kAXRaiseAction as CFString);print("focus",AXUIElementSetAttributeValue(w,kAXFocusedAttribute as CFString,kCFBooleanTrue).rawValue);break}}}
func prefixPress(_ e:AXUIElement,_ prefix:String)->Bool{if get(e,kAXRoleAttribute)as?String=="AXButton",(get(e,kAXDescriptionAttribute)as?String ?? "").hasPrefix(prefix){return AXUIElementPerformAction(e,kAXPressAction as CFString) == .success};if let ch=get(e,kAXChildrenAttribute)as?[AXUIElement]{for c in ch{if prefixPress(c,prefix){return true}}};return false}
if command=="resizeEditor",let ws=get(root,kAXWindowsAttribute)as?[AXUIElement]{for w in ws{if editor(w) != nil{var s=CGSize(width:800,height:360),p=CGPoint(x:400,y:1250);AXUIElementSetAttributeValue(w,kAXSizeAttribute as CFString,AXValueCreate(.cgSize,&s)!);AXUIElementSetAttributeValue(w,kAXPositionAttribute as CFString,AXValueCreate(.cgPoint,&p)!);AXUIElementSetAttributeValue(w,kAXFocusedAttribute as CFString,kCFBooleanTrue)}}}
if command=="closeHome",let ws=get(root,kAXWindowsAttribute)as?[AXUIElement]{for w in ws{if editor(w)==nil,searchField(w) != nil,let b=get(w,kAXCloseButtonAttribute){print(AXUIElementPerformAction(b as! AXUIElement,kAXPressAction as CFString).rawValue)}}}
if command=="clickEditor",let ws=get(root,kAXWindowsAttribute)as?[AXUIElement]{for w in ws{if editor(w) != nil {app.activate(options:[.activateAllWindows]);AXUIElementPerformAction(w,kAXRaiseAction as CFString);try await Task.sleep(for:.milliseconds(200));guard NSWorkspace.shared.frontmostApplication?.bundleIdentifier==app.bundleIdentifier else{fatalError("Fixture not frontmost; no click sent")};var v:CFTypeRef?;AXUIElementCopyAttributeValue(w,kAXPositionAttribute as CFString,&v);var p=CGPoint.zero;AXValueGetValue(v as! AXValue,.cgPoint,&p);p.x+=80;p.y+=110;for type in [CGEventType.mouseMoved,.leftMouseDown,.leftMouseUp]{CGEvent(mouseEventSource:nil,mouseType:type,mouseCursorPosition:p,mouseButton:.left)!.post(tap:.cghidEventTap)};print("clicked fixture",p);break}}}
if command=="selection",let e=editor(root){var range=CFRange();if let v=get(e,kAXSelectedTextRangeAttribute){AXValueGetValue(v as! AXValue,.cfRange,&range)};print("selection",range.location,range.length,get(e,kAXSelectedTextAttribute) ?? "" as CFString)}
if command=="resizeHome",let ws=get(root,kAXWindowsAttribute)as?[AXUIElement]{for w in ws{if editor(w)==nil,searchField(w) != nil{var s=CGSize(width:1000,height:680),p=CGPoint(x:470,y:1120);AXUIElementSetAttributeValue(w,kAXSizeAttribute as CFString,AXValueCreate(.cgSize,&s)!);AXUIElementSetAttributeValue(w,kAXPositionAttribute as CFString,AXValueCreate(.cgPoint,&p)!);AXUIElementSetAttributeValue(w,kAXFocusedAttribute as CFString,kCFBooleanTrue)}}}
if command=="compactHome",let ws=get(root,kAXWindowsAttribute)as?[AXUIElement]{for w in ws{if editor(w)==nil,searchField(w) != nil{var s=CGSize(width:1140,height:560);print(AXUIElementSetAttributeValue(w,kAXSizeAttribute as CFString,AXValueCreate(.cgSize,&s)!).rawValue)}}}
func matchButton(_ e:AXUIElement,_ prefix:String,_ depth:Int=0)->AXUIElement?{if depth>18{return nil};if get(e,kAXRoleAttribute)as?String=="AXButton",(get(e,kAXDescriptionAttribute)as?String ?? "").hasPrefix(prefix){return e};if let ch=get(e,kAXChildrenAttribute)as?[AXUIElement]{for c in ch{if let r=matchButton(c,prefix,depth+1){return r}}};return nil}
if command=="openMatch",let ws=get(root,kAXWindowsAttribute)as?[AXUIElement]{for w in ws{if searchField(w) != nil,let b=matchButton(w,CommandLine.arguments[3]){print(AXUIElementPerformAction(b,kAXPressAction as CFString).rawValue);break}}}

if command=="caretEnd",let e=editor(root){
 AXUIElementSetAttributeValue(e,kAXFocusedAttribute as CFString,kCFBooleanTrue)
 let text=get(e,kAXValueAttribute)as?String ?? ""
 var range=CFRange(location:text.utf16.count,length:0)
 guard AXUIElementSetAttributeValue(e,kAXSelectedTextRangeAttribute as CFString,AXValueCreate(.cfRange,&range)!) == .success else{fatalError("Cannot position native caret")}
 print("caretEnd",range.location)
}

if command=="positionHomeForCapture",let ws=get(root,kAXWindowsAttribute)as?[AXUIElement]{for w in ws{if editor(w)==nil,searchField(w) != nil{var p=CGPoint(x:180,y:1120);print(AXUIElementSetAttributeValue(w,kAXPositionAttribute as CFString,AXValueCreate(.cgPoint,&p)!).rawValue)}}}

if command=="clearSearch" {
 NSApplication.shared.setActivationPolicy(.prohibited)
 app.activate(options:[.activateAllWindows])
 try await Task.sleep(for:.milliseconds(300))
 guard app.isActive else{fatalError("Fixture must be active before clearing Search")}
 if let ws=get(root,kAXWindowsAttribute)as?[AXUIElement] {
  for w in ws where editor(w)==nil {
   guard let field=searchField(w) else{continue}
   AXUIElementPerformAction(w,kAXRaiseAction as CFString)
   AXUIElementSetAttributeValue(field,kAXFocusedAttribute as CFString,kCFBooleanTrue)
   let text=get(field,kAXValueAttribute)as?String ?? ""
   var range=CFRange(location:0,length:text.utf16.count)
   guard AXUIElementSetAttributeValue(field,kAXSelectedTextRangeAttribute as CFString,AXValueCreate(.cfRange,&range)!) == .success else{fatalError("Cannot select the fixture query")}
   for down in [true,false]{let e=CGEvent(keyboardEventSource:nil,virtualKey:51,keyDown:down)!;e.postToPid(pid)}
   try await Task.sleep(for:.milliseconds(500))
   guard (get(field,kAXValueAttribute)as?String ?? "").isEmpty else{fatalError("Native search did not clear")}
   print("Native Search cleared through selected-text deletion")
   break
  }
 }
}
