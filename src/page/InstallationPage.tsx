import { InstallationContent } from './InstallationGuide';
import { launch } from '../content/launch';
import { DownloadLink } from './Brand';
import { publicUrl } from '../lib/publicUrl';
export default function InstallationPage() {
  return (
    <div className="installation-page">
      <a className="skip-link" href="#installation-main">
        Skip to content
      </a>
      <nav className="installation-page-nav" aria-label="Installation navigation">
        <a className="wordmark" href={publicUrl('')}>
          <img className="brand-symbol" src={publicUrl('brand-symbol.svg')} width="40" height="40" alt="" />
          <span>Rasc</span>
        </a>
        <a href={publicUrl('')}>
          Back to Rasc <span aria-hidden="true">↗</span>
        </a>
      </nav>
      <main id="installation-main">
        <header className="installation-page-heading">
          <p className="eyebrow">Rasc for Mac · Installation</p>
          <h1>Install Rasc.</h1>
          <p>
            {launch.platform} · Version {launch.version}
          </p>
        </header>
        <p className="installation-page-jump">
          <a className="installation-jump" href="#installation-security">
            Blocked by macOS? Open Anyway ↓
          </a>
        </p>
        <h2 className="installation-sr-only">Install in four steps</h2>
        <InstallationContent />
        <div className="installation-page-download"><DownloadLink showRequirements={false} /></div>
      </main>
    </div>
  );
}
