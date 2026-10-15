import { createContext, useContext, useEffect, useRef, useState } from 'react';
import type { MouseEvent, ReactNode } from 'react';
import { launch } from '../content/launch';
import Icon from '../ui/Icon';
import downloadShot from '../assets/installation/download.webp';
import dmgShot from '../assets/installation/dmg.webp';
import blockedShot from '../assets/installation/blocked.webp';
import securityShot from '../assets/installation/privacy-security.webp';
import privacyContextShot from '../assets/installation/privacy-context.webp';
import privacySelectionShot from '../assets/installation/privacy-selection.webp';
import './InstallationGuide.css';
import { currentDownloadPlatform } from '../lib/downloadPlatform';

const installationShots = [downloadShot, dmgShot, blockedShot, privacyContextShot, securityShot, privacySelectionShot];
const preloadedShots: HTMLImageElement[] = [];

// The DMG download starts in the same click that opens the guide. Decode the
// shots first so that click does not leave the first frame on its fallback text.
function preloadInstallationShots() {
  if (typeof window === 'undefined' || preloadedShots.length > 0) return;
  for (const src of installationShots) {
    const image = new Image();
    image.src = src;
    preloadedShots.push(image);
    void image.decode?.().catch(() => undefined);
  }
}

preloadInstallationShots();

function retryShot(image: HTMLImageElement) {
  if (image.dataset.retry === '1') return;
  image.dataset.retry = '1';
  const src = image.currentSrc || image.src;
  image.removeAttribute('src');
  queueMicrotask(() => { image.src = src; });
}

const InstallationContext = createContext<((opener: HTMLElement) => void) | null>(null);

// Keep the direct download URL and native link behavior, including modified clicks.
export function useInstallationDownload() {
  const open = useContext(InstallationContext);
  return (event: MouseEvent<HTMLAnchorElement>) => {
    if (currentDownloadPlatform() === 'mac' && launch.publicReleaseReady && !launch.notarized
      && !event.defaultPrevented && event.button === 0 && !event.metaKey && !event.ctrlKey
      && !event.shiftKey && !event.altKey
      && window.matchMedia('(min-width: 768px) and (hover: hover) and (pointer: fine)').matches) {
      open?.(event.currentTarget);
    }
  };
}

export function InstallationHelp() {
  const open = useContext(InstallationContext);
  const platform = currentDownloadPlatform();
  if (platform === 'mobile' || platform === 'other') return null;
  return open
    ? <button className="installation-help" type="button" aria-haspopup="dialog" onClick={event => open(event.currentTarget)}>Installation help</button>
    : <a className="installation-help" href={launch.installGuideHref} target="_blank" rel="noreferrer">Installation help</a>;
}

export function InstallationProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<{ opener: HTMLElement } | null>(null);
  return <InstallationContext.Provider value={opener => setSession({ opener })}>
    {children}
    {session && <InstallationDialog opener={session.opener} onDismiss={() => setSession(null)} />}
  </InstallationContext.Provider>;
}

const steps = [
  {
    label: 'Open the download',
    body: <>Find <strong>{launch.filename}</strong> in your browser’s downloads or Downloads folder. Double-click it.</>,
    image: downloadShot, width: 280, height: 360,
    alt: 'The downloaded Rasc DMG file in Finder.',
    hint: 'The disk image opens in Finder.',
  },
  {
    label: 'Move to Applications',
    body: <>In the window that opens, drag <strong>Rasc</strong> onto the <strong>Applications</strong> folder. Wait for the copy to finish.</>,
    image: dmgShot, width: 650, height: 320,
    alt: 'The real Rasc disk image, with the Rasc app and Applications shortcut.',
    hint: 'Then open Applications in Finder.',
  },
  {
    label: 'Open Rasc',
    body: <>In <strong>Applications</strong>, double-click <strong>Rasc</strong>. If you see this alert, choose <strong>Done</strong> and continue to the last step.</>,
    image: blockedShot, width: 520, height: 536,
    alt: 'The macOS “Rasc” Not Opened alert, with a Done button.',
    hint: 'Rasc opened without an alert? You’re all set.',
  },
  {
    label: 'If macOS blocks it',
    body: <>Open <strong>System Settings → Privacy &amp; Security</strong>. Scroll to Security and choose <strong>Open Anyway</strong> beside Rasc. Follow the prompts, then confirm <strong>Open</strong>.</>,
    image: privacyContextShot, width: 1392, height: 336,
    alt: 'System Settings with Privacy & Security selected, showing Open Anyway for Rasc in the Security section.',
    hint: 'Rasc isn’t notarized by Apple yet. Only continue if you trust this download.',
  },
] as const;

function InstallationDialog({ opener, onDismiss }: { opener: HTMLElement; onDismiss: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const closingFromEffectCleanup = useRef(false);
  const [active, setActive] = useState(0);
  const step = steps[active];

  useEffect(() => {
    const dialog = dialogRef.current!;
    const previousOverflow = document.body.style.overflow;
    const previousPadding = document.body.style.paddingRight;
    const gutter = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (gutter > 0) document.body.style.paddingRight = `${gutter}px`;
    dialog.showModal();
    return () => {
      closingFromEffectCleanup.current = true;
      dialog.close();
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPadding;
    };
  }, [opener]);

  useEffect(() => {
    bodyRef.current?.scrollTo(0, 0);
  }, [active]);

  const close = () => dialogRef.current?.close();

  return <dialog
    ref={dialogRef}
    className="installation-dialog"
    aria-labelledby="installation-title"
    aria-describedby="installation-description"
    aria-modal="true"
    onClose={() => {
      if (closingFromEffectCleanup.current) {
        closingFromEffectCleanup.current = false;
        return;
      }
      if (opener.isConnected) opener.focus({ preventScroll: true });
      onDismiss();
    }}
    onKeyDown={event => {
      if (event.key !== 'Tab') return;
      const controls = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], summary'))
        .filter(element => element.getClientRects().length > 0);
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    }}
    onClick={event => {
      if (event.target !== event.currentTarget) return;
      const rect = event.currentTarget.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) close();
    }}
  >
    <header className="installation-header">
      <div>
        <p className="installation-eyebrow">Rasc for Mac <span>·</span> Installation</p>
        <h2 id="installation-title">Set up Rasc.</h2>
        <p id="installation-description">A short guide for your first launch. Keep this open as you go.</p>
      </div>
      <button type="button" className="installation-close" aria-label="Close installation guide" onClick={close} autoFocus><Icon name="close" /></button>
    </header>
    <div ref={bodyRef} className="installation-body">
      <nav className="installation-navigation" aria-label="Installation steps">
        <ol>
          {steps.map((item, index) => <li key={item.label}>
            <button type="button" aria-current={index === active ? 'step' : undefined} onClick={() => setActive(index)}>
              <span className="installation-number" aria-hidden="true">{index + 1}</span>
              <span className="installation-step-label"><span className="sr-only">Step {index + 1}: </span>{item.label}</span>
            </button>
          </li>)}
        </ol>
        <p className="installation-release">Version {launch.version}<br />{launch.platform}</p>
      </nav>
      <section className="installation-panel" aria-labelledby="installation-step-title">
        <p className="installation-progress" aria-live="polite" aria-atomic="true">Step {active + 1} of 4 <span className="sr-only">— {step.label}</span></p>
        <h3 id="installation-step-title">{step.label}</h3>
        <p className="installation-instruction">{step.body}</p>
        <figure className="installation-figure" data-step={active}>
          {steps.map((item, index) => {
            const shown = index === active;
            if (index === 3) {
              return <div key={item.label} className={`installation-shot installation-security-visual${shown ? ' installation-shot--active' : ''}`} aria-hidden={!shown}>
                <div className="installation-setting-cue">
                  <span>System Settings</span>
                  <img src={privacySelectionShot} width={390} height={64} alt="Privacy & Security selected in the Settings sidebar." decoding="sync" loading="eager" onError={event => retryShot(event.currentTarget)} />
                  <span className="installation-setting-connector" aria-hidden="true">↓</span>
                </div>
                <picture>
                  <source media="(max-width: 767px)" srcSet={securityShot} />
                  <img src={item.image} width={item.width} height={item.height} alt={shown ? item.alt : ''} decoding="sync" loading="eager" onError={event => retryShot(event.currentTarget)} />
                </picture>
              </div>;
            }
            return <img
              key={item.label}
              className={`installation-shot${shown ? ' installation-shot--active' : ''}`}
              src={item.image}
              width={item.width}
              height={item.height}
              style={{ width: item.width / 2 }}
              alt={shown ? item.alt : ''}
              decoding="sync"
              loading="eager"
              aria-hidden={!shown}
              onError={event => retryShot(event.currentTarget)}
            />;
          })}
          {active === 1 && <span className="installation-drag-direction" aria-hidden="true">←</span>}
        </figure>
        <p className="installation-hint">{step.hint}</p>
        {active === 3 && <details className="installation-older-mac">
            <summary>Using macOS 14?</summary>
            <p>You can also Control-click Rasc in Applications, choose <strong>Open</strong>, then confirm. On macOS 15 or later, use Privacy &amp; Security above.</p>
          </details>}
      </section>
    </div>
    <footer className="installation-footer">
      <a href={launch.downloadHref} download={launch.filename}>Download again <Icon name="download" /></a>
      <div className="installation-controls">
        {active > 0 && <button type="button" className="installation-back" onClick={() => setActive(active - 1)}>Back</button>}
        <button type="button" className="button button--primary installation-next" onClick={() => active < 3 ? setActive(active + 1) : close()}>{active < 3 ? 'Next' : 'Close guide'}{active < 3 && <span aria-hidden="true">→</span>}</button>
      </div>
    </footer>
  </dialog>;
}
