import { launch } from '../content/launch';
import { publicUrl } from '../lib/publicUrl';
import Icon, { GitHubIcon } from '../ui/Icon';

export function BrandSymbol({ className = '' }: { className?: string }) {
  return <img className={`brand-symbol ${className}`} src={publicUrl('brand-symbol.svg')} width="32" height="32" alt="" />;
}

export function Wordmark() {
  return <a className="wordmark" href="#top" aria-label="Rasc, home"><BrandSymbol /><span>Rasc</span></a>;
}

export function DownloadLink({ className = 'button button--primary' }: { className?: string }) {
  return <a className={className} href={launch.downloadHref} download={launch.filename}>Download for Mac <Icon name="download" /></a>;
}

export function SourceLink({ className = 'source-link' }: { className?: string }) {
  return <a className={className} href={launch.githubHref} target="_blank" rel="noreferrer"><GitHubIcon />GitHub <Icon name="external" /></a>;
}

export function DownloadDetails({ compact = false, showDetails = true }: { compact?: boolean; showDetails?: boolean }) {
  return <div className={`download-details${compact ? ' download-details--compact' : ''}`}><p>{launch.platform} <span>·</span> Beta</p>{showDetails && <details><summary>Download details</summary><div className="download-details__body"><p>Rasc {launch.version}, build {launch.build}.</p><p>This beta is ad-hoc signed and isn’t notarized. macOS may block the first launch. After trying to open it, use System Settings → Privacy &amp; Security → Open Anyway if you trust this download.</p><p>{launch.refineRequirement} Capture, Keep, Home and Search work without Apple Intelligence.</p><a href={launch.checksumHref} download>Download SHA-256 checksum ↗</a></div></details>}</div>;
}
