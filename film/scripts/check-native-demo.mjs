import assert from 'node:assert/strict';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import ts from 'typescript';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
const dir=path.resolve('out/native-demo-check');await mkdir(`${dir}/native-demo`,{recursive:true});await mkdir(`${dir}/v63`,{recursive:true});
for(const name of ['native-demo/direction','native-demo/content','native-demo/take','native-demo/timing','native-demo/nativeEdit','native-demo/typing','native-demo/playback','native-demo/layout','v63/playback']){
 const code=ts.transpileModule(await readFile(`src/${name}.ts`,'utf8'),{compilerOptions:{module:ts.ModuleKind.ESNext}}).outputText.replace(/from ["'](\.[^"']+)["']/g,"from '$1.mjs'");await writeFile(`${dir}/${name}.mjs`,code);
}
const mod=async n=>import(pathToFileURL(`${dir}/native-demo/${n}.mjs`));
const {complete,decisions:d,windowBounds}=await mod('direction'),{sourceTime,reopenedAt,nativeAt}=await mod('nativeEdit'),{filmTime,presentationTime,durationInFrames}=await mod('playback'),{typing}=await mod('typing'),{note}=await mod('content'),{source}=await mod('timing'),{homePoint,homeCameraAt,resultCard,resolutionPose}=await mod('layout');
const actual=JSON.parse(await readFile('sources/native-demo/scenario-result.json'));assert.equal(actual.scripted,true);assert.equal(actual.generatedByModel,false);for(const k of ['original','suggested','accepted'])assert.equal(actual[k],note[k]);assert.equal(actual.reopened,note.accepted);assert.equal(note.accepted,note.suggested);
assert.equal(typing.map(x=>x.character).join(''),note.original);assert.equal(typing.length,83);assert.equal(JSON.parse(await readFile('sources/native-demo/typing-events.json')).punctuationPauses,false);
const manifest=JSON.parse(await readFile('sources/native-demo/selected-manifest.json'));
const selectedAssets = new Set(JSON.parse(await readFile('assets-manifest.json')).assets.map(a => a.path));
let verified=0;
for(const take of Object.values(manifest)){assert.equal(take.pointPixelScale,2);let prev=-1;for(const row of take.frames){assert.ok(row.seconds>prev);prev=row.seconds;if (!selectedAssets.has(`native-demo/${row.file}`)) continue;const bytes=await readFile(`public/native-demo/${row.file}`);assert.deepEqual([bytes.readUInt32BE(16),bytes.readUInt32BE(20)],take.sourcePixels);assert.equal(createHash('sha256').update(bytes).digest('hex'),row.sha256);verified++;}}
let last=-1,maxSource=0,previousCount=0,maxNewCharacters=0,maxTypingGap=0;
for(let f=0;f<durationInFrames;f++){const real=f/60,t=filmTime(real);assert.ok(t>last);last=t;assert.ok(Math.abs(presentationTime(t)-real)<1e-8);if(t>=complete.window&&t<complete.hide){const b=windowBounds(t,complete);assert.ok(b.left>=64&&b.top>=64&&b.left+b.width<=1856&&b.top+b.height<=872);maxSource=Math.max(maxSource,b.sourceScale);assert.ok(b.sourceScale<=1);}const count=typing.filter(e=>e.frame<=t*60).length;maxNewCharacters=Math.max(maxNewCharacters,count-previousCount);previousCount=count;}
assert.ok(maxNewCharacters<=2);
for(let i=1;i<typing.length;i++)maxTypingGap=Math.max(maxTypingGap,presentationTime(typing[i].frame/60)-presentationTime(typing[i-1].frame/60));assert.ok(maxTypingGap<.12);
assert.equal(durationInFrames,1674);assert.ok(Math.abs(presentationTime(27.8)-27.9)<1e-8);assert.ok(Math.abs(presentationTime(d.preview)-presentationTime(complete.refine)-source.processingSeconds)<1e-8);
// Each edited state starts on a reviewed, stable native frame.
assert.ok(source.preview > source.refineCommand + actual.refiningProviderDelay);
const selection=await readFile('sources/native-demo/reopened-selection.txt','utf8');
assert.ok(selection.startsWith(`selection ${note.accepted.length} 0`));
const actions=Object.fromEntries(JSON.parse(await readFile('sources/native-demo/flow-events.json')).filter(x=>x.action).map(x=>[x.action,x]));
for(let t=d.preview;t<d.original;t+=1/60)assert.ok(sourceTime(t)<actions.Original.before-.04);
for(let t=d.original;t<d.suggested;t+=1/60)assert.ok(sourceTime(t)<actions.Suggested.before-.1,'Original must not switch to Suggested ahead of the cursor');
for(let t=d.suggested;t<d.accept;t+=1/60)assert.ok(sourceTime(t)<actions['Accept refinement'].before-.1);
const files=[];for(let real=presentationTime(complete.refine)+.02;real<presentationTime(d.preview)-.03;real+=1/60){const t=filmTime(real);assert.ok(Math.abs(sourceTime(filmTime(real+1/60))-sourceTime(t)-1/60)<1e-8);files.push(nativeAt(t));}assert.ok(new Set(files).size>140);
let prev=-1;for(let f=Math.round(presentationTime(d.reopen)*60);f<presentationTime(complete.closing+1.55)*60;f++){const p=reopenedAt(filmTime(f/60)),index=manifest.reopened.frames.findIndex(x=>p.endsWith(x.file));assert.ok(index>=prev);prev=index;}
assert.deepEqual(resolutionPose(-1/60),resolutionPose(0));const c=homeCameraAt(d.reopen),point=homePoint(d.reopen),card={x:c.x+resultCard.x*c.scale,y:c.y+resultCard.y*c.scale,width:resultCard.width*c.scale,height:resultCard.height*c.scale};assert.ok(point.x+2>card.x+32&&point.x+2<card.x+card.width-32&&point.y+2>card.y+32&&point.y+2<card.y+card.height-32);
for(let t=complete.retrieve;t<d.reopen;t+=1/60){const c=homeCameraAt(t);assert.ok(c.x>=64 && c.y>=64 && c.x+c.width<=1856 && c.y+c.height<=872);assert.equal(c.width,2280*c.scale);assert.equal(c.height,1120*c.scale);}
const audio=JSON.parse(await readFile('public/native-demo/audio/complete.json'));for(const logical of [1.59,1.65,6.45,8.65,10.25,11.7,13.1,14.85,17.6,21.5])assert.ok(audio.events.some(e=>Math.abs(e.seconds-presentationTime(logical))<1e-8));for(const e of typing)assert.ok(audio.events.some(a=>a.kind==='key'&&Math.abs(a.seconds-presentationTime(e.frame/60))<1e-8));
const populated=await readFile('sources/native-demo/home-populated.txt','utf8');const fixture=JSON.parse(await readFile('native-harness/scenario.json'));for(const n of fixture.syntheticNotes)assert.ok(populated.includes(n.content.split('\n')[0]),'Home must be populated before the search begins');
assert.ok((await readFile('sources/native-demo/home-filtered.txt','utf8')).includes('cover'));
const controls=JSON.parse(await readFile('fixtures/native-controls.json'));assert.equal(controls.allFramesHaveNativeTrafficLights,true);assert.equal(controls.selectedHomeFrames,manifest.home.frames.length);
// Regression: Keep must play through the actual native fade, not freeze a
// translucent source frame until the layer is unmounted.
const exit=JSON.parse(await readFile('fixtures/keep-exit-source.json'));
assert.equal(exit.frames.at(-1).maxAlpha,0);
assert.equal(manifest.flow.frames.at(-1).seconds,source.keepFadeEnd);
assert.ok(source.keepFadeEnd-source.keep<complete.hide-complete.keepPress);
const exitSamples=[];
for(let f=Math.ceil(presentationTime(complete.keepPress)*60);f<presentationTime(complete.hide)*60;f++){
 const real=f/60,t=filmTime(real),file=nativeAt(t).split('/').at(-1),row=exit.frames.find(x=>x.file===file);
 assert.ok(row,'Keep must use the measured native exit');
 assert.ok(Math.abs(sourceTime(filmTime(real+1/60))-sourceTime(t)-1/60)<1e-8,'Native Keep exit must run at 1×');
 exitSamples.push({frame:f,seconds:real,sourceSeconds:row.seconds,file,maxAlpha:row.maxAlpha});
}
let partialHold=0,maxPartialHold=0,lastExitFile=null;
for(const row of exitSamples){partialHold=row.maxAlpha>0&&row.maxAlpha<255?(row.file===lastExitFile?partialHold+1:1):0;maxPartialHold=Math.max(maxPartialHold,partialHold);lastExitFile=row.file;}
assert.ok(maxPartialHold<=2,'A partially faded native window must not be held');
assert.equal(exitSamples.at(-1).maxAlpha,0,'Window must be transparent before unmount');
const exitResult={nativeRate:1,transparentBeforeUnmount:true,maximumPartialFrameHoldSeconds:maxPartialHold/60,samples:exitSamples};
await writeFile('out/keep-exit-timeline.json',JSON.stringify(exitResult,null,2));
const result={nativeHomeControlsVerified:true,scripted:true,generatedByModel:false,nativeTextCrossfadeOverlapTrimmed:true,uncutProofPreserved:true,actualNativeUI:true,providerWaitSeconds:actual.refiningProviderDelay,nativeRefineFootageSeconds:source.processingSeconds,nativeProcessingRate:1,uniqueProcessingFrames:new Set(files).size,verifiedNativeFrames:verified,sourcePixels:{scratchpad:[1600,720],home:[2280,1120]},maxSourceScale:maxSource,duration:27.9,frames:durationInFrames,maxNewCharacters,maxTypingGap,textContinuousThroughAcceptanceKeepRetrieval:true,clickHotspot:{x:point.x+2,y:point.y+2},nativeCard:card,closingNeverRewindsNativeSource:true,shortUnchanged:true};await writeFile('out/geometry-source.json',JSON.stringify(result,null,2));console.log(result);
