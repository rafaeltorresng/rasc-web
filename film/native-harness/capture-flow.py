#!/usr/bin/env python3
"""Capture only the native demo bundle via PID-scoped AX and Retina window streams.
Requires the explicit native demo build and a clean scenario store; no real notes.
"""
from pathlib import Path
import argparse,subprocess,json,time,re
p=argparse.ArgumentParser();p.add_argument('--run',type=Path,required=True);p.add_argument('--out',type=Path,required=True);a=p.parse_args();run=a.run.resolve();out=a.out.resolve();assert str(run).startswith('/private/tmp/rasc-film-harness-');assert not out.exists(),'Use a fresh capture output';out.mkdir(parents=True)
marker=run/'.capture-started';assert not marker.exists(),'Capture already attempted; use a fresh isolated run directory';marker.write_text(str(out)+'\n')
tools=run/'tools';cfg=json.loads((run/'scenario.json').read_text())
for attempt in range(40):
 found=subprocess.run(['pgrep','-f',str(run/'RascFilmDemo.app/Contents/MacOS/Rasc')],capture_output=True,text=True)
 rows=found.stdout.split()
 if len(rows)==1:break
 time.sleep(.25)
else:raise RuntimeError('Exactly one isolated demo process must be launched first')
pid=rows[0]
def ctl(*args):return subprocess.check_output([str(tools/'control'),pid,*args],text=True)
def size(kind):
 ctl('resize'+kind);time.sleep(.4)
 if kind=='Home':ctl('compactHome');time.sleep(.4);ctl('compactHome');ctl('positionHomeForCapture')
 else:ctl('resize'+kind)
 ctl('focusWindow');time.sleep(.4)
def window(w,h):
 raw=subprocess.check_output([str(tools/'windows')],text=True)
 for line in raw.splitlines():
  if 'Rasc (' in line and f'{w}.0, {h}.0)' in line and 'scale 2.0' in line:return line.split()[0]
 raise RuntimeError('Required native Retina window not available: '+raw)
def record(id,name,seconds):
 folder=out/name;proc=subprocess.Popen([str(tools/'record'),id,str(folder),str(seconds),*(['--display-region'] if name=='home' else [])],stdout=subprocess.PIPE,text=True)
 while True:
  line=proc.stdout.readline()
  if 'RECORDING' in line:break
  if proc.poll() is not None:raise RuntimeError('Native recording failed')
 return proc,time.monotonic()
def write(name,text):p=out/name;p.write_text(text);return str(p)
ctl('press','New Scratch');ctl('closeHome');size('Editor');wid=window(800,360);ctl('focusWindow');ctl('setEditor',write('empty.txt',''));time.sleep(.3)
proc,start=record(wid,'flow',27);events=[]
def press(name):
 before=time.monotonic()-start;result=ctl('press',name);after=time.monotonic()-start;events.append({'action':name,'before':before,'after':after,'result':result.strip()})
time.sleep(.8);subprocess.run([str(tools/'type-flow'),pid,write('original.txt',cfg['original']),str(out/'typing-events.json')],check=True);assert ctl('readEditor').removesuffix('\n')==cfg['original'];events.append({'action':'typing complete','seconds':time.monotonic()-start});time.sleep(.45);press('Refine')
for _ in range(70):
 raw=ctl('preview')
 if 'AXStaticText |  |  | ' in raw:
  suggested=raw.split('AXStaticText |  |  | ',1)[1].removesuffix('\n');break
 time.sleep(.08)
else:raise RuntimeError('Native preview not observed')
assert suggested==cfg['suggested'];events.append({'action':'Preview observed','seconds':time.monotonic()-start});time.sleep(1.9);press('Original');time.sleep(1.65);press('Suggested');time.sleep(1.65);press('Accept refinement');time.sleep(.35);accepted=ctl('readEditor').removesuffix('\n');assert accepted==cfg['suggested'];events.append({'action':'accepted text verified','seconds':time.monotonic()-start});time.sleep(1.25);press('Keep');proc.wait();assert proc.returncode==0
(out/'flow-events.json').write_text(json.dumps(events,indent=2));print(events,flush=True)
# Native menu command, not a fabricated Home shortcut.
for _ in range(40):
 ctl('press','Open Home');time.sleep(.3)
 if 'Search thoughts' in ctl('windows'):break
else:raise RuntimeError('Native Home did not become ready')
size('Home');home=window(1140,560);ctl('clearSearch');time.sleep(1.2);populated=ctl('windows');(out/'home-populated.txt').write_text(populated)
for note in cfg['syntheticNotes']:assert note['content'].splitlines()[0] in populated,'Home must show every synthetic note before search'
proc,startHome=record(home,'home',6);time.sleep(1.7);subprocess.run([str(tools/'type-query'),pid,write('query.txt',cfg['query']),str(out/'query-events.json')],check=True);proc.wait();assert proc.returncode==0;(out/'home-filtered.txt').write_text(ctl('windows'))
ctl('openMatch',cfg['suggested'].splitlines()[0][:35]);time.sleep(.4);size('Editor');ctl('closeHome');ctl('focusWindow');ctl('caretEnd');time.sleep(.4);(out/'reopened-selection.txt').write_text(ctl('selection'));assert ctl('readEditor').removesuffix('\n')==accepted;wid=window(800,360);proc,_=record(wid,'reopened',4.5);proc.wait();assert proc.returncode==0
(out/'scenario-result.json').write_text(json.dumps({'original':cfg['original'],'suggested':suggested,'accepted':accepted,'reopened':accepted,'query':cfg['query'],'scripted':True,'generatedByModel':False,'refiningProviderDelay':cfg['refiningSeconds'],'bundleID':'com.rafaeltorres.rasc.filmdemo20261020','disclosure':cfg['disclosure'],'nativeMenuHomeAction':'Open Home','nativeBuildManifest':json.loads((run/'build-manifest.json').read_text())},indent=2))
ctl('press','Quit Rasc');print('Native scripted flow and persistence verified; fixture quit.',flush=True)
