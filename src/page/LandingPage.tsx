import { landingCopy } from '../content/copy';
import { launch } from '../content/launch';
import { HeroDemo, HomeSearchScene } from '../product/ProductScenes';
import { BrandSymbol, DownloadDetails, DownloadLink, SourceLink, Wordmark } from './Brand';
import Header from './Header';
import InteractionStory from './InteractionStory';
import { NoSystemSection, OwnedMoment } from './EditorialSections';
import { AppleIntelligenceIcon } from '../ui/Icon';
import { publicUrl } from '../lib/publicUrl';

function NativeAppCapture() {
  return <details className="native-app-capture"><summary>See the real Mac app</summary><figure><img src={publicUrl('screenshots/rasc-scratchpad-0.1.0.png')} width="1440" height="880" alt="The actual Rasc scratchpad in dark mode, with a thought, optional Refine, Keep and Home controls." loading="lazy" /><figcaption>Actual app · Rasc 0.1.0 · synthetic example. The animated scenes on this page are illustrations. Refine suggestions can make mistakes; compare them with your original before accepting.</figcaption></figure></details>;
}

function RetrievalSection() {
  const { retrieval } = landingCopy;
  return <section className="retrieval-section section-pad" aria-labelledby="retrieval-title"><div className="page-container retrieval-layout"><div className="retrieval-copy"><p className="eyebrow">Out of the way. Within reach.</p><h2 id="retrieval-title">{retrieval.title}</h2><p>{retrieval.body}</p><p className="retrieval-shortcut"><kbd className="keycap">⌘P</kbd> Search from your scratchpad</p></div><HomeSearchScene /></div></section>;
}

function TrustSection() {
  const { trust } = landingCopy;
  return <section className="trust-section section-pad" aria-labelledby="trust-title"><div className="page-container"><div className="trust-intro"><p className="eyebrow">A small app. A clear boundary.</p><h2 id="trust-title">{trust.title}</h2><p>{trust.body}</p></div><dl className="trust-facts"><div className="trust-fact"><dt>Local notes</dt><dd>Your thoughts live on your Mac. No Rasc account to create.</dd></div><div className="trust-fact"><dt><AppleIntelligenceIcon />On-device intelligence</dt><dd>Refine uses Apple Foundation Models. No cloud AI fallback.</dd></div><div className="trust-fact"><dt>MIT licensed</dt><dd>{launch.sourcePublic ? 'Open source, open to inspection.' : 'Prepared for open source. Public source publication is pending.'}<SourceLink /></dd></div></dl><p className="compatibility-note">{launch.refineRequirement} Capture, Keep, Home and Search remain available without it.</p></div></section>;
}

function ClosingSection() {
  const { closing } = landingCopy;
  return <section id="release-status" className="closing-section section-pad" aria-labelledby="closing-title"><div className="page-container closing-inner"><BrandSymbol className="closing-symbol" /><p className="eyebrow">For the thought before the note</p><h2 id="closing-title">{closing.title}</h2><p>{closing.body}</p>{launch.publicReleaseReady ? <DownloadLink /> : <p>Public release in preparation. Download and public source links will appear here when ready.</p>}<DownloadDetails /><p className="closing-trust">Native Mac app. No account. A little more room to think.</p></div></section>;
}

function Footer() {
  return <footer className="site-footer"><div className="page-container"><Wordmark /><span>Made for unfinished thoughts.</span><div className="footer-links"><SourceLink /><a href="mailto:rafaeltorresng@gmail.com?subject=Rasc%20website">Contact</a></div></div></footer>;
}

export default function LandingPage() {
  return (
    <div id="top" className="site-shell">
      <a className="skip-link" href="#main">Skip to content</a>
      <Header />
      <main id="main">
        <section className="hero-section page-container" aria-labelledby="hero-title">
          <div className="hero-copy">
            <div className="hero-heading">
              <h1 id="hero-title">A scratchpad for<br /><span>unfinished thoughts.</span></h1>
              <p className="platform-cue">
                <span className="platform-cue__product">Native Mac app · {launch.sourcePublic ? 'Open source' : 'MIT licensed'}</span>
                <span className="platform-cue__refine" title="Refine with Apple Intelligence, on your Mac">
                  <span className="platform-cue__separator" aria-hidden="true">·</span>
                  <AppleIntelligenceIcon alt="Apple Intelligence" />
                  On-device Refine
                </span>
              </p>
            </div>
            <div className="hero-summary">
              <p className="hero-description">{landingCopy.hero.description}</p>
              <div className="hero-download"><DownloadLink /></div>
            </div>
          </div>
          <HeroDemo />
        </section>
        <OwnedMoment />
        <InteractionStory />
        <NoSystemSection />
        <RetrievalSection />
        <TrustSection />
        <div className="page-container"><NativeAppCapture /></div>
        <ClosingSection />
      </main>
      <Footer />
    </div>
  );
}
