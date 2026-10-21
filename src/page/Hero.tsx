import { Fragment } from 'react';
import { landingCopy } from '../content/copy';
import { launch } from '../content/launch';
import ProductTableau from '../product/ProductTableau';
import { AppleIntelligenceIcon } from '../ui/Icon';
import { DownloadLink } from './Brand';
import { InstallationHelp } from './InstallationGuide';
import './Hero.css';

export default function Hero() {
  return <section className="hero-section hero-section--tableau product-hero" data-layout="editorial" data-atmosphere="ambient" aria-labelledby="hero-title">
    <div className="page-container product-hero-inner">
      <div className="product-hero-intro">
        <div className="product-hero-main">
          <h1 id="hero-title">A scratchpad for <span>unfinished thoughts.</span></h1>
          <p className="platform-cue">
            <span className="platform-cue__product">Native Mac app · {launch.sourcePublic ? 'Open source' : 'MIT licensed'}</span>
            <span className="platform-cue__refine" title="Refine with Apple Intelligence, on your Mac">
              <span className="platform-cue__separator" aria-hidden="true">·</span>
              <AppleIntelligenceIcon alt="Apple Intelligence" />On-device Refine
            </span>
          </p>
          <div className="hero-download product-hero-download">
            <div className="product-hero-actions"><DownloadLink /></div>
            {launch.publicReleaseReady && !launch.notarized && <InstallationHelp />}
          </div>
        </div>
        <p className="hero-description product-hero-editorial">{landingCopy.hero.description.split('\n').map((line, index) => <Fragment key={line}>{index > 0 && ' '}<span>{line}</span></Fragment>)}</p>
      </div>
      <div className="product-hero-product"><ProductTableau live /></div>
    </div>
  </section>;
}
