#!/usr/bin/env python3
"""Build a film-only native snapshot. Does not write to the source app repository."""
from pathlib import Path
import argparse,subprocess,json,hashlib,shutil
p=argparse.ArgumentParser();p.add_argument('--native',type=Path,required=True);p.add_argument('--run',type=Path,required=True);a=p.parse_args();native=a.native.resolve();run=a.run.resolve();own=Path(__file__).resolve().parent
assert str(run).startswith('/private/tmp/rasc-film-harness-') and run.parent==Path('/private/tmp'), 'Dedicated temporary run directory required'
assert (native/'Rasc.xcodeproj').is_dir()
run.mkdir(exist_ok=True);(run/'.demo-only').write_text('rasc-film-demo-only\n')
stage=run/'native';stage.mkdir(exist_ok=True)
for name in ['Rasc','RascTests','Rasc.xcodeproj','Vendor']:
 subprocess.run(['rsync','-a','--exclude=xcuserdata','--exclude=.build',str(native/name),str(stage)+'/'],check=True)
tracked=subprocess.check_output(['git','ls-files','-z','Rasc','RascTests','Rasc.xcodeproj','Vendor'],cwd=native).decode().split('\0');hashes={f:hashlib.sha256((native/f).read_bytes()).hexdigest() for f in tracked if f and (native/f).is_file()}
bootstrap=stage/'Rasc/Platform/AppBootstrap.swift';text=bootstrap.read_text();old='''                let repository = try await Task.detached {
                    try NoteRepository.openDefault()
                }.value
                let controller = PanelController(repository: repository)'''
new='''                #if RASC_FILM_DEMO && DEBUG
                let (scenario, databaseURL) = try FilmDemoScenario.load()
                let repository = try NoteRepository(databaseURL: databaseURL)
                try await scenario.seed(repository, at: databaseURL)
                let controller = PanelController(repository: repository, refinementProvider: FilmRefinementProvider(scenario: scenario))
                #else
'''+old+'''
                #endif'''
assert text.count(old)==1;bootstrap.write_text(text.replace(old,new)+'\n'+(own/'FilmDemo.swift').read_text())
app=stage/'Rasc/App/AppDelegate.swift';text=app.read_text();needle='        GlobalShortcutMigration.migrateFromPreviousDefaultIfNeeded()';assert text.count(needle)==1
text=text.replace(needle,'''        #if RASC_FILM_DEMO && DEBUG
        if NSClassFromString("XCTestCase") != nil { return }
        guard Bundle.main.bundleIdentifier == FilmDemoScenario.bundleID else { fatalError("Film-only bundle required") }
        OnboardingStore().markCompleted()
        AppThemeSettingsStore().save(.rascLight)
        #endif
'''+needle)
start=text.index('        KeyboardShortcuts.onKeyUp(for: .toggleScratchpad)');end=text.index('\n    }\n\n    func applicationShouldTerminateAfterLastWindowClosed',start)
text=text[:start]+'        #if !RASC_FILM_DEMO\n'+text[start:end]+'\n        #endif'+text[end:];app.write_text(text)
tests=stage/'RascTests/RefinementSessionTests.swift';text=tests.read_text();needle='    private func makeFixture() throws -> RefinementFixture {';assert text.count(needle)==1;tests.write_text(text.replace(needle,(own/'FilmDemoTests.swift.txt').read_text()+'\n'+needle))
project=stage/'Rasc.xcodeproj/project.pbxproj'
text=project.read_text().replace('PRODUCT_BUNDLE_IDENTIFIER = com.rafaeltorres.rasc;', 'PRODUCT_BUNDLE_IDENTIFIER = com.rafaeltorres.rasc.filmdemo20261020;').replace('PRODUCT_BUNDLE_IDENTIFIER = com.rafaeltorres.rasc.tests;', 'PRODUCT_BUNDLE_IDENTIFIER = com.rafaeltorres.rasc.filmdemo20261020.tests;')
project.write_text(text)
shutil.copy2(own/'scenario.json',run/'scenario.json')
manifest={'nativeCommit':subprocess.check_output(['git','rev-parse','HEAD'],cwd=native,text=True).strip(),'nativeSourceHashes':hashes,'overlayFiles':['Rasc/Platform/AppBootstrap.swift','Rasc/App/AppDelegate.swift','RascTests/RefinementSessionTests.swift','Rasc.xcodeproj/project.pbxproj'],'bundleID':'com.rafaeltorres.rasc.filmdemo20261020','scenarioSha256':hashlib.sha256((run/'scenario.json').read_bytes()).hexdigest(),'productionRepositoryWritten':False}
(run/'build-manifest.json').write_text(json.dumps(manifest,indent=2))
cmd=['xcodebuild','-project',str(stage/'Rasc.xcodeproj'),'-scheme','Rasc','-configuration','Debug','-derivedDataPath',str(run/'derived'),'-clonedSourcePackagesDirPath',str(run/'packages'),'CODE_SIGN_IDENTITY=-','CODE_SIGN_STYLE=Manual','OTHER_SWIFT_FLAGS=$(inherited) -D RASC_FILM_DEMO','ENABLE_DEBUG_DYLIB=NO','build']
with (run/'build.log').open('w') as log:subprocess.run(cmd,stdout=log,stderr=subprocess.STDOUT,check=True)
app=run/'derived/Build/Products/Debug/Rasc.app';dest=run/'RascFilmDemo.app'
shutil.copytree(app,dest,dirs_exist_ok=True)
for f,h in hashes.items():assert hashlib.sha256((native/f).read_bytes()).hexdigest()==h,'Native source unexpectedly changed'
(run/'tools').mkdir(exist_ok=True)
for source in (own/'tools').glob('*.swift'):
 flags=['-O']+(['-parse-as-library'] if '@main' in source.read_text() else [])
 subprocess.run(['swiftc',*flags,str(source),'-o',str(run/'tools'/source.stem)],check=True)
print(dest,flush=True)
