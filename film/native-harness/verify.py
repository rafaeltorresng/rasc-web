#!/usr/bin/env python3
"""Verify the staged harness and its compile boundary; never launch Release."""
from pathlib import Path
import argparse,subprocess,re,json,hashlib
p=argparse.ArgumentParser();p.add_argument('--run',type=Path,required=True);p.add_argument('--native',type=Path,required=True);a=p.parse_args();run=a.run.resolve();native=a.native.resolve();assert str(run).startswith('/private/tmp/rasc-film-harness-')
if subprocess.run(['pgrep','-f',str(run/'RascFilmDemo.app/Contents/MacOS/Rasc')],stdout=subprocess.DEVNULL).returncode==0:raise SystemExit('Quit only the demo fixture before testing (native LaunchServices allows one instance of this bundle).')
base=['xcodebuild','-project',str(run/'native/Rasc.xcodeproj'),'-scheme','Rasc','-derivedDataPath',str(run/'derived'),'-clonedSourcePackagesDirPath',str(run/'packages'),'CODE_SIGN_IDENTITY=-','CODE_SIGN_STYLE=Manual','ENABLE_DEBUG_DYLIB=NO']
with (run/'tests-reproduce.log').open('w') as log:subprocess.run(base+['-configuration','Debug','-destination','platform=macOS','-only-testing:RascTests/RefinementSessionTests','-only-testing:RascTests/RefinementContractTests','OTHER_SWIFT_FLAGS=$(inherited) -D RASC_FILM_DEMO','test'],stdout=log,stderr=subprocess.STDOUT,check=True)
with (run/'release-reproduce.log').open('w') as log:subprocess.run(base+['-configuration','Release','build'],stdout=log,stderr=subprocess.STDOUT,check=True)
binary=run/'derived/Build/Products/Release/Rasc.app/Contents/MacOS/Rasc';strings=subprocess.check_output(['strings',str(binary)],text=True)
assert all(x not in strings for x in ['scripted-no-inference','--film-config','illustrative-film-demo'])
gate=subprocess.run(['swiftc','-typecheck','-D','RASC_FILM_DEMO',str(Path(__file__).resolve().parent/'FilmDemo.swift')],capture_output=True,text=True);assert gate.returncode!=0 and 'restricted to explicit Debug' in gate.stderr
m=json.loads((run/'build-manifest.json').read_text());assert all(hashlib.sha256((native/f).read_bytes()).hexdigest()==h for f,h in m['nativeSourceHashes'].items())
count=int(re.search(r'Test run with (\d+) tests', (run/'tests-reproduce.log').read_text())[1]);result={'passedNativeTests':count,'releaseWithoutDemoProvider':True,'releaseNotLaunched':True,'nonDebugDemoFlagRejected':True,'originalNativeFilesUnchanged':len(m['nativeSourceHashes'])};(run/'verification.json').write_text(json.dumps(result,indent=2));print(result)
