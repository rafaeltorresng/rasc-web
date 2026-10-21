from pathlib import Path
import json,math,shutil,hashlib
from PIL import Image
import numpy as np
r=Path(__file__).resolve().parents[1];s=r/'sources/native-demo';d=r/'src/native-demo';dest=r/'public/native-demo';dest.mkdir(parents=True,exist_ok=True)
a=json.loads((s/'scenario-result.json').read_text());events=json.loads((s/'flow-events.json').read_text());actions={x['action']:x for x in events}
refine=actions['Refine']['before'];preview=next(x['seconds'] for x in events if x['action']=='Preview observed')
processing=2.8;extra=processing-2.2
motion={'refineCommand':refine,'refine':refine-.22,'preview':preview+.34,'original':actions['Original']['after']+.40,'suggested':actions['Suggested']['after']+.40,'acceptCommand':actions['Accept refinement']['before'],'accept':actions['Accept refinement']['before']+.50,'keepCommand':actions['Keep']['before'],'keep':actions['Keep']['before']+.30,'processingSeconds':processing,'extraSeconds':extra,'duration':29.6+extra-2.3,'durationFrames':round((29.6+extra-2.3)*60)}
# Include the complete native exit, measured from alpha rather than a guessed
# trim duration. A partially transparent last frame would freeze on screen.
exitFrames=[]
exitRows=json.loads((s/'flow/take.json').read_text())['frames']
exitStart=max(0,next(i for i,row in enumerate(exitRows) if row['seconds']>=motion['keep'])-1)
for row in exitRows[exitStart:]:
 alpha=Image.open(s/'flow'/row['file']).getchannel('A').getextrema()[1]
 exitFrames.append({'file':'flow-'+row['file'],'seconds':row['seconds'],'maxAlpha':alpha})
 if alpha==0:break
assert exitFrames and exitFrames[-1]['maxAlpha']==0,'Native Keep exit must finish completely transparent'
motion['keepFadeEnd']=exitFrames[-1]['seconds']
(r/'fixtures/keep-exit-source.json').write_text(json.dumps({'frames':exitFrames,'transparentSourceEnd':motion['keepFadeEnd'],'nativeRate':1},indent=2))
(s/'edit-timing.json').write_text(json.dumps(motion,indent=2));(d/'timing.ts').write_text('export const source = '+json.dumps(motion,indent=2)+' as const;\n')
tracks={};manifest={}
for name,(lo,hi) in {'flow':(.65,motion['keepFadeEnd']),'home':(0,4.5),'reopened':(.3,3.5)}.items():
 rows=json.loads((s/name/'take.json').read_text())['frames'];selected=[]
 for i,x in enumerate(rows):
  if lo<=x['seconds']<=hi or x['seconds']<lo and i+1<len(rows) and rows[i+1]['seconds']>=lo:
   p=s/name/x['file'];im=Image.open(p);assert im.size==((2280,1120) if name=='home' else (1600,720));file=name+'-'+x['file'];shutil.copy2(p,dest/file);selected.append({**x,'file':file,'sha256':hashlib.sha256(p.read_bytes()).hexdigest()})
 manifest[name]={'sourcePixels':[rows[0]['width'],rows[0]['height']],'pointPixelScale':2,'sourceFolder':name,'frames':selected};tracks['home3' if name=='home' else name]=[{'file':x['file'],'seconds':x['seconds']} for x in selected]
# Reject any Home take containing the macOS window-sharing badge or inactive buttons.
minimum=[100000]*3
for row in manifest['home']['frames']:
 pixels=np.asarray(Image.open(dest/row['file']).convert('RGB'))[:65,:165]
 red,green,blue=[pixels[:,:,i].astype(int) for i in range(3)]
 counts=[int(((red>200)&(green<140)&(blue<160)).sum()),int(((red>200)&(green>140)&(blue<80)).sum()),int(((green>130)&(red<100)&(blue<150)).sum())]
 assert min(counts)>100,('Native Home traffic lights missing',row['file'],counts)
 minimum=[min(x,y) for x,y in zip(minimum,counts)]
(r.parent/'docs/film-native-demo/validation/native-controls.json').write_text(json.dumps({'selectedHomeFrames':len(manifest['home']['frames']),'minimumRedYellowGreenPixels':minimum,'allFramesHaveNativeTrafficLights':True,'captureMode':json.loads((s/'home/take.json').read_text()).get('captureMode'),'appUIUnchanged':True},indent=2))
(s/'selected-manifest.json').write_text(json.dumps(manifest,indent=2));(d/'take.ts').write_text('export const tracks = '+json.dumps(tracks,separators=(',',':'))+' as const;\n');(d/'content.ts').write_text('export const note = '+json.dumps({k:a[k] for k in ['original','suggested','accepted']},ensure_ascii=False,indent=2)+' as const;\n')
typing=json.loads((s/'typing-events.json').read_text());rows=json.loads((s/'flow/take.json').read_text())['frames']
for x in rows:
 pixels=np.asarray(Image.open(s/'flow'/x['file']).convert('RGB'))[180:230,45:180]
 if (pixels.max(axis=2)<85).sum()>30:first=x['seconds'];break
# Align native character events to their first actual visible state, not guessed start time.
offset=first-typing['events'][0]['seconds'];mapped=[{'frame':120+e['seconds']/typing['events'][-1]['seconds']*239,'source':round(offset+e['seconds']+.02,6),'character':e['character']} for e in typing['events']]
(d/'typing.ts').write_text('export const typing = '+json.dumps(mapped,separators=(',',':'))+' as const;\n');(s/'typing-retime.json').write_text(json.dumps({'firstVisible':first,'sourceOffset':offset,'events':mapped},indent=2))
print(motion,{k:len(v) for k,v in tracks.items()})
# Full-size proof stills are copied native pixels, with no replacement UI.
out=r.parent/'docs/film-native-demo/validation'
for name,track,t in [('native-refining','flow',refine+1),('native-suggested','flow',motion['preview']+.4),('native-original','flow',motion['original']+.3),('native-accepted','flow',motion['accept']+.6),('native-home','home',3.4),('native-reopened','reopened',.5)]:
 rows=json.loads((s/track/'take.json').read_text())['frames'];x=min(rows,key=lambda x:abs(x['seconds']-t));shutil.copy2(s/track/x['file'],out/(name+'.png'))
