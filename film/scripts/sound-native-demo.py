"""Original procedural UI score. No samples, stock audio, or third-party music."""
from pathlib import Path
import numpy as np,wave,json
root=Path(__file__).resolve().parents[1];rate=48000
rng=np.random.default_rng(20261019)
typing_rng=np.random.default_rng(20261020)
edit=json.loads((root/'sources/native-demo/edit-timing.json').read_text())
for mode,duration,keep,resume in [('complete',edit['duration'],14.85,16.25)]:
 score=np.zeros((int(duration*rate),2),dtype=np.float64);events=[]
 def presentation_time(logical):
  lo,hi=logical,logical+1
  for _ in range(40):
   mid=(lo+hi)/2;u=max(0,min(1,mid/4));t=mid-u*u*(3-2*u)
   if t<logical:lo=mid
   else:hi=mid
  u=max(0,min(1,(logical-2)/4));typing=(.8-2.3)*u*u*(3-2*u);v=max(0,min(1,(logical-6.45)/2.2));processing=edit['extraSeconds']*v*v*(3-2*v)
  return (lo+hi)/2+typing+processing
 def tick(at,kind,amp=.07,typing=False,character=''):
  at=presentation_time(at)
  length=.04 if typing else {'key':.032,'open':.18,'keep':.22,'close':.16,'find':.18}[kind];n=int(length*rate);t=np.arange(n)/rate
  # Preserve the existing non-typing random sequence as the key timbre changes.
  noise=rng.normal(size=int(.032*rate) if typing else n)
  if typing:noise=typing_rng.normal(size=n)
  noise=np.convolve(noise,np.ones(7)/7,mode='same')
  if kind=='key' and typing:
   # Muted key mechanism rather than a repeated pitched click. A short rounded
   # attack avoids a digital transient; separate seeded variation keeps timing
   # exact and doesn't change the other approved UI sounds.
   noise=np.convolve(noise,np.ones(17)/17,mode='same')
   frequency=typing_rng.uniform(170,215);decay=typing_rng.uniform(.007,.009)
   envelope=(1-np.exp(-t/.0012))**2*np.exp(-t/decay)
   sig=(.72*noise+.20*np.sin(2*np.pi*frequency*t))*envelope
   sig*=typing_rng.uniform(.92,1.06)*(.70 if character==' ' else 1)
  elif kind=='key': sig=(.5*noise+.5*np.sin(2*np.pi*730*t))*np.exp(-t*150)
  elif kind=='keep': sig=(np.sin(2*np.pi*520*t)+.2*np.sin(2*np.pi*1040*t))*np.exp(-t*28)
  elif kind=='find': sig=np.sin(2*np.pi*(580*t+150*t*t))*np.exp(-t*25)
  else: sig=(.7*noise+.3*np.sin(2*np.pi*180*t))*np.sin(np.pi*t/length)**2
  sig*=amp;start=int(at*rate);end=min(start+n,len(score));sig=sig[:end-start];score[start:end,0]+=sig*.96;score[start:end,1]+=sig
  events.append({'seconds':at,'kind':kind,**({'treatment':'soft-typing','character':character} if typing else {})})
 tick(1.59,'key');tick(1.65,'open',.045)
 # Same per-character native state schedule used by the composition.
 data=json.loads((root/'sources/native-demo/typing-retime.json').read_text())['events']
 for e in data:tick(e['frame']/60,'key',.026,typing=True,character=e['character'])
 if mode=='complete':tick(6.45,'key');tick(8.65,'find',.025);tick(10.25,'key',.03);tick(11.7,'key',.03);tick(13.1,'key',.035)
 tick(keep,'keep',.055);tick(keep+.6,'close',.035);tick(resume,'key',.04)
 if mode=='complete':tick(17.6,'key',.035);tick(17.75,'open',.04);tick(21.5,'find',.045)
 path=root/f'public/native-demo/audio/{mode}.wav';path.parent.mkdir(parents=True,exist_ok=True)
 with wave.open(str(path),'wb') as w:w.setnchannels(2);w.setsampwidth(2);w.setframerate(rate);w.writeframes((np.clip(score,-1,1)*32767).astype('<i2').tobytes())
 (root/f'public/native-demo/audio/{mode}.json').write_text(json.dumps({'origin':'Original procedural synthesis; no external samples or music','sampleRate':rate,'seed':20261019,'peakDBFS':float(20*np.log10(abs(score).max())),'events':events},indent=2))
 print(mode,float(20*np.log10(abs(score).max())))
