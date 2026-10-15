import { launch } from '../content/launch';
import { publicUrl } from '../lib/publicUrl';
import Icon, { GitHubIcon } from '../ui/Icon';
import { InstallationHelp, useInstallationDownload } from './InstallationGuide';

export function BrandSymbol({ className = '' }: { className?: string }) {
  const mark128 = publicUrl('brand-symbol-128.png');
  const mark256 = publicUrl('brand-symbol-256.png');
  return (
    <img
      className={`brand-symbol ${className}`}
      src={mark128}
      srcSet={`${mark128} 128w, ${mark256} 256w`}
      sizes="48px"
      width={256}
      height={256}
      alt=""
      decoding="async"
    />
  );
}

export function Wordmark() {
  return <a className="wordmark" href="#top" aria-label="Rasc, home"><BrandSymbol /><span>Rasc</span></a>;
}

export function DownloadLink({ className = 'button button--primary' }: { className?: string }) {
  const handleDownload = useInstallationDownload();
  return launch.publicReleaseReady
    ? <a className={className} href={launch.downloadHref} download={launch.filename} onClick={handleDownload}>Download for Mac <Icon name="download" /></a>
    : <a className={className} href="#release-status">View release status <span aria-hidden="true">↓</span></a>;
}

export function SourceLink({ className = 'source-link' }: { className?: string }) {
  if (!launch.sourcePublic) return <span className={className}><GitHubIcon />Source publication pending</span>;
  return <a className={className} href={launch.githubHref} target="_blank" rel="noreferrer"><GitHubIcon />GitHub <Icon name="external" /></a>;
}

export function DownloadDetails({ compact = false, showDetails = true }: { compact?: boolean; showDetails?: boolean }) {
  return (
    <div className={`download-details${compact ? ' download-details--compact' : ''}`}>
      <p>
        {launch.platform} <span>·</span>{' '}
        {launch.publicReleaseReady ? `Rasc ${launch.version}` : 'Public release in preparation'}
      </p>
      {showDetails && (
        <details>
          <summary>{launch.publicReleaseReady ? 'Download details' : 'Release details'}</summary>
          <div className="download-details__body">
            {launch.publicReleaseReady ? (
              <>
                <p>Rasc {launch.version}, build {launch.build}.</p>
                {launch.notarized ? (
                  <p>Developer ID signed and notarized. Open the DMG and drag Rasc to Applications.</p>
                ) : (
                  <p>
                    Ad-hoc signed Release from GitHub, not notarized by Apple. If macOS blocks the first launch, use <strong>Privacy &amp; Security → Open Anyway</strong>.{' '}
                    <InstallationHelp />
                  </p>
                )}
                <p>
                  <a href={launch.checksumHref} target="_blank" rel="noreferrer">
                    SHA-256 checksum file ↗
                  </a>
                </p>
                <p className="download-details__checksum">
                  <code>{launch.sha256}</code>
                </p>
              </>
            ) : (
              <p>A public download is not available yet.</p>
            )}
            <p>{launch.refineRequirement} Capture, Keep, Home and Search work without Apple Intelligence.</p>
          </div>
        </details>
      )}
    </div>
  );
}
