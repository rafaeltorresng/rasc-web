import Cocoa
import ApplicationServices
let pid=pid_t(CommandLine.arguments[1])!
guard NSRunningApplication(processIdentifier:pid)?.bundleIdentifier=="com.rafaeltorres.rasc.filmdemo20261020",AXIsProcessTrusted() else{fatalError("Fixture / Accessibility required")}
let text=try String(contentsOfFile:CommandLine.arguments[2],encoding:.utf8)
let started=Date();var rows:[[String:Any]]=[]
for (i,c) in text.enumerated(){
 let delay=0.085+Double((i*17+13)%11)*0.012
 Thread.sleep(forTimeInterval:delay)
 for down in [true,false]{let e=CGEvent(keyboardEventSource:nil,virtualKey:c=="\n" ? 36:0,keyDown:down)!;if c != "\n"{let chars=Array(String(c).utf16);e.keyboardSetUnicodeString(stringLength:chars.count,unicodeString:chars)};e.postToPid(pid)}
 rows.append(["index":i+1,"character":String(c),"seconds":Date().timeIntervalSince(started)])
}
try JSONSerialization.data(withJSONObject:["text":text,"events":rows],options:[.prettyPrinted,.sortedKeys]).write(to:URL(fileURLWithPath:CommandLine.arguments[3]))
print("Typed \(rows.count) characters in \(Date().timeIntervalSince(started)) seconds")
