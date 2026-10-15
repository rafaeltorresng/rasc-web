import { useEffect, useRef, useState, type CSSProperties } from 'react';
import m0 from '../../Hooded Mascot Cradling a Lilac Orb(1).png';
import m1 from '../../brand/companion/m1-web.webp';
import EditorialCompanion from './EditorialCompanion';
import ThoughtShaping from './ThoughtShaping';
import { landingCopy } from '../content/copy';
import { launch } from '../content/launch';
import ProductTableau from '../product/ProductTableau';
import { AppleIntelligenceIcon } from '../ui/Icon';
import { DownloadLink, Wordmark } from './Brand';
import { NoSystemSection, OwnedMoment } from './EditorialSections';
import Header from './Header';
import InteractionStory from './InteractionStory';
import './CompanionStudy.css';

// Development-only alternative and publication pose. The approved M3 uses the
// real EditorialCompanion component; these bounds register the other assets.
const candidates = {
  m0: { src: m0, x: 223, y: 88, w: 797, h: 1091, canvasWidth: 1254, canvasHeight: 1254 },
  m1: { src: m1, x: 16, y: 16, w: 796, h: 1103, canvasWidth: 832, canvasHeight: 1136 },
} as const;
type Candidate = keyof typeof candidates;
type Surface = 'owned' | 'hero' | 'post' | 'wide' | 'landing';

function CandidateFigure({ candidate, className = '' }: { candidate: Candidate; className?: string }) {
  const { src, x, y, w, h, canvasWidth, canvasHeight } = candidates[candidate];
  return <span className={`companion-figure ${className}`} data-candidate={candidate} aria-hidden="true" style={{
    '--figure-ratio': `${w} / ${h}`,
    '--image-width': `${canvasWidth / w * 100}%`,
    '--image-left': `${-x / w * 100}%`,
    '--image-top': `${-y / h * 100}%`,
  } as CSSProperties}><img src={src} width={canvasWidth} height={canvasHeight} alt="" /></span>;
}

function ReferenceCompanion({ candidate }: { candidate: 'm0' }) {
  return <div className="companion-thought">
    <span className="editorial-index" aria-hidden="true">A thought.<br />Still taking shape.</span>
    <CandidateFigure candidate={candidate} />
  </div>;
}

function Showcase({ companion, caption = true, live = false }: { companion: boolean; caption?: boolean; live?: boolean }) {
  return <div className={`companion-showcase ${companion ? 'companion-showcase--signed' : ''}`}>
    <ProductTableau caption={caption} live={live} />
    {companion && <CandidateFigure candidate="m1" className="companion-signature" />}
  </div>;
}

function Hero({ companion }: { companion: boolean }) {
  return <section className="hero-section hero-section--tableau page-container" aria-labelledby="hero-title">
    <div className="hero-copy"><div className="hero-heading">
      <h1 id="hero-title">A scratchpad for<br /><span>unfinished thoughts.</span></h1>
      <p className="platform-cue"><span className="platform-cue__product">Native Mac app · {launch.sourcePublic ? 'Open source' : 'MIT licensed'}</span><span className="platform-cue__refine"><span className="platform-cue__separator" aria-hidden="true">·</span><AppleIntelligenceIcon alt="Apple Intelligence" />On-device Refine</span></p>
    </div><div className="hero-summary"><p className="hero-description">{landingCopy.hero.description}</p><div className="hero-download"><DownloadLink /></div></div></div>
    <Showcase companion={companion} live />
  </section>;
}

function Publication({ companion, wide, fit }: { companion: boolean; wide: boolean; fit: boolean }) {
  const preview = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  useEffect(() => {
    if (!fit || !preview.current) return;
    const observer = new ResizeObserver(([entry]) => setScale(Math.min(1, entry.contentRect.width / 1200)));
    observer.observe(preview.current);
    return () => observer.disconnect();
  }, [fit]);
  return <div ref={preview} className={`companion-publication-preview ${fit ? 'companion-publication-preview--fit' : ''}`} style={{ '--publication-scale': scale } as CSSProperties}>
    <main className={`companion-publication ${wide ? 'companion-publication--wide' : ''}`}>
      <Wordmark />
      <div className="companion-publication__heading"><h1>A scratchpad for<br /><span>unfinished thoughts.</span></h1><p>The place before the note.</p></div>
      <Showcase companion={companion} caption={false} />
      <footer>Native Mac app. Local-first. A little more room to think.</footer>
    </main>
  </div>;
}

export default function CompanionStudy() {
  const params = new URLSearchParams(window.location.search);
  const requested = params.get('companion');
  const surface: Surface = requested === 'hero' || requested === 'post' || requested === 'wide' || requested === 'landing' ? requested : 'owned';
  const variant = params.get('variant') ?? (surface === 'owned' || surface === 'landing' ? 'orb' : 'original');
  const capture = params.has('capture');
  const editorial = variant === 'm3' || variant === 'm0' ? variant : undefined;
  const signed = (surface === 'post' || surface === 'wide') && variant === 'm1';
  const variants = surface === 'owned' || surface === 'landing' ? ['orb', 'm3', 'm0'] : surface === 'hero' ? ['original'] : ['original', 'm1'];
  return <div className="companion-study" data-surface={surface} data-variant={variant} data-capture={capture}>
    {!capture && <nav className="companion-review" aria-label="Estudos de direção de arte">
      <div className="page-container"><strong>Estudo local · companion editorial</strong><div className="companion-review__surfaces">{(['owned', 'hero', 'post', 'wide', 'landing'] as Surface[]).map(view => <a key={view} aria-current={surface === view ? 'page' : undefined} href={`?companion=${view}`}>{({ owned: 'Seção', hero: 'Hero', post: 'Post 1200 × 1080', wide: 'Post 1200 × 675', landing: 'Contexto da landing' })[view]}</a>)}</div><div className="companion-review__variants">{variants.map(option => <a key={option} aria-current={variant === option ? 'page' : undefined} href={`?companion=${surface}&variant=${option}`}>{({ orb: 'Orb original', m3: 'M3', m0: 'M0', original: 'Produto original', m1: 'M1 · assinatura' } as Record<string, string>)[option]}</a>)}</div><p>Protótipo, sem publicação. As imagens são candidatas; o produto usa as capturas nativas atuais.</p></div>
    </nav>}
    {surface === 'post' || surface === 'wide' ? <Publication companion={signed} wide={surface === 'wide'} fit={!capture || params.has('feed')} /> : <div className="site-shell" id="top">
      <Header /><main id="main">
        {(surface === 'hero' || surface === 'landing') && <Hero companion={signed} />}
        <OwnedMoment aside={editorial === 'm3' ? <EditorialCompanion /> : editorial === 'm0' ? <ReferenceCompanion candidate="m0" /> : <ThoughtShaping />} />
        {surface === 'landing' && <InteractionStory />}
        <NoSystemSection />
      </main>
    </div>}
  </div>;
}
