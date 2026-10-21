import { createContext, useContext, useEffect, useRef, useState } from 'react';
import type { MouseEvent, ReactNode } from 'react';
import { launch } from '../content/launch';
import Icon from '../ui/Icon';
import downloadShot from '../assets/installation/download.webp';
import dmgShot from '../assets/installation/dmg.webp';
import blockedShot from '../assets/installation/blocked.webp';
import securityShot from '../assets/installation/privacy-security.webp';
import privacySelectionShot from '../assets/installation/privacy-selection.webp';
import './InstallationGuide.css';
import { currentDownloadPlatform } from '../lib/downloadPlatform';

const InstallationContext = createContext<((opener: HTMLElement) => void) | null>(null);

// Keep the direct download URL and native link behavior, including modified clicks.
export function useInstallationDownload() {
  const open = useContext(InstallationContext);
  return (event: MouseEvent<HTMLAnchorElement>) => {
    if (
      currentDownloadPlatform() === 'mac' &&
      launch.publicReleaseReady &&
      !launch.notarized &&
      !event.defaultPrevented &&
      event.button === 0 &&
      !event.metaKey &&
      !event.ctrlKey &&
      !event.shiftKey &&
      !event.altKey &&
      window.matchMedia('(min-width: 768px) and (hover: hover) and (pointer: fine)').matches
    ) {
      open?.(event.currentTarget);
    }
  };
}

export function InstallationHelp() {
  const open = useContext(InstallationContext);
  return (
    <a
      className="installation-help"
      href={launch.installGuideHref}
      aria-haspopup={open ? 'dialog' : undefined}
      onClick={(event) => {
        if (
          open &&
          !event.defaultPrevented &&
          !event.metaKey &&
          !event.ctrlKey &&
          !event.shiftKey &&
          !event.altKey &&
          event.button === 0
        ) {
          event.preventDefault();
          open(event.currentTarget);
        }
      }}
    >
      Installation help <span aria-hidden="true">↗</span>
    </a>
  );
}

export function InstallationProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<{ opener: HTMLElement } | null>(null);
  return (
    <InstallationContext.Provider value={(opener) => setSession({ opener })}>
      {children}
      {session && <InstallationDialog opener={session.opener} onDismiss={() => setSession(null)} />}
    </InstallationContext.Provider>
  );
}

const steps = [
  {
    label: 'Open the .dmg',
    body: null,
    image: downloadShot,
    width: 280,
    height: 360,
    alt: 'The Rasc DMG in Finder.',
  },
  {
    label: 'Drag Rasc to Applications',
    body: null,
    image: dmgShot,
    width: 650,
    height: 320,
    alt: 'Rasc and the Applications shortcut inside the real disk image. Drag Rasc to Applications.',
  },
  {
    label: 'Open Rasc in Applications',
    body: (
      <>
        Blocked? Choose <strong>Done</strong>.
      </>
    ),
    image: blockedShot,
    width: 520,
    height: 536,
    alt: 'The macOS Rasc Not Opened alert. Choose Done if this appears.',
  },
] as const;

function GuideImage({
  src,
  width,
  height,
  alt,
}: {
  src: string;
  width: number;
  height: number;
  alt: string;
}) {
  const [failed, setFailed] = useState(false);
  return failed ? (
    <p className="installation-image-error" role="status">
      Image unavailable. Follow the written instructions.
    </p>
  ) : (
    <a
      className="installation-image-link"
      href={src}
      target="_blank"
      rel="noreferrer"
      aria-label={`Enlarge image: ${alt} (opens in a new tab)`}
    >
      <img src={src} width={width} height={height} alt={alt} onError={() => setFailed(true)} />
    </a>
  );
}

export function InstallationContent() {
  return (
    <div className="installation-content">
      <ol className="installation-basics">
        {steps.map((step, index) => (
          <li key={step.label}>
            <span className="installation-number">0{index + 1}</span>
            <div>
              <h3>{step.label}</h3>
              {step.body && <p>{step.body}</p>}
            </div>
          </li>
        ))}
      </ol>
      <section
        id="installation-security"
        className="installation-security"
        aria-labelledby="installation-security-title"
      >
        <div className="installation-security-copy">
          <span className="installation-number">04 · First launch</span>
          <h3 id="installation-security-title" tabIndex={-1}>
            If macOS blocks it.
          </h3>
          <p>Rasc isn’t notarized by Apple. Continue only if you trust this download.</p>
          <ol>
            <li>
              Open <strong>System Settings → Privacy &amp; Security</strong>.
            </li>
            <li>
              Under <strong>Security</strong>, choose <strong>Open Anyway</strong> for Rasc.
            </li>
            <li>
              Authenticate if asked, then <strong>Open</strong>.
            </li>
          </ol>
          <p className="installation-hint">
            Not listed? Open Rasc again, then return here.
          </p>
        </div>
        <div className="installation-security-images">
          <figure className="installation-selection">
            <GuideImage
              src={privacySelectionShot}
              width={390}
              height={64}
              alt="Privacy & Security selected in the System Settings sidebar."
            />
          </figure>
          <figure className="installation-security-detail">
            <GuideImage
              src={securityShot}
              width={920}
              height={330}
              alt="Security section with Open Anyway beside the blocked Rasc app."
            />
          </figure>
          <p className="installation-capture-note">Shown on macOS 26.</p>
        </div>
      </section>
      <details className="installation-screenshots">
        <summary>See installation screenshots</summary>
        <div className="installation-shots">
          {steps.map((step, index) => (
            <figure key={step.label}>
              <figcaption><span>0{index + 1}</span> {step.label}</figcaption>
              <div className="installation-figure" data-step={index}>
                <GuideImage src={step.image} width={step.width} height={step.height} alt={step.alt} />
              </div>
            </figure>
          ))}
        </div>
      </details>
      <p className="installation-complete">
        Rasc is ready in your menu bar.
      </p>
    </div>
  );
}

function InstallationDialog({ opener, onDismiss }: { opener: HTMLElement; onDismiss: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closingFromEffectCleanup = useRef(false);

  useEffect(() => {
    const dialog = dialogRef.current!;
    const previousOverflow = document.body.style.overflow;
    const previousPadding = document.body.style.paddingRight;
    const gutter = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (gutter > 0) document.body.style.paddingRight = `${gutter}px`;
    dialog.showModal();
    dialog.querySelector<HTMLButtonElement>('.installation-close')?.focus({ preventScroll: true });
    return () => {
      closingFromEffectCleanup.current = true;
      dialog.close();
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPadding;
    };
  }, [opener]);

  const close = () => dialogRef.current?.close();

  return (
    <dialog
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
      onKeyDown={(event) => {
        if (event.key !== 'Tab') return;
        const controls = Array.from(
          event.currentTarget.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], summary'),
        ).filter((element) => element.getClientRects().length > 0);
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
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const rect = event.currentTarget.getBoundingClientRect();
        if (
          event.clientX < rect.left ||
          event.clientX > rect.right ||
          event.clientY < rect.top ||
          event.clientY > rect.bottom
        )
          close();
      }}
    >
      <header className="installation-header">
        <button
          type="button"
          className="installation-close"
          aria-label="Close installation guide"
          onClick={close}
          autoFocus
        >
          <Icon name="close" />
        </button>
        <div>
          <p className="installation-eyebrow">
            Rasc for Mac <span>·</span> Installation
          </p>
          <h2 id="installation-title">Set up Rasc.</h2>
          <p id="installation-description">Install once. Allow the first launch.</p>
          <a
            className="installation-jump"
            href="#installation-security"
            onClick={(event) => {
              event.preventDefault();
              const heading = dialogRef.current?.querySelector<HTMLElement>('#installation-security-title');
              heading?.closest('section')?.scrollIntoView({ block: 'start' });
              heading?.focus({ preventScroll: true });
            }}
          >
            Blocked by macOS? Open Anyway <span aria-hidden="true">↓</span>
          </a>
        </div>
      </header>
      <div className="installation-body">
        <InstallationContent />
      </div>
      <footer className="installation-footer">
        <a href={launch.installGuideHref}>
          Open full guide <span aria-hidden="true">↗</span>
        </a>
        <a href={launch.downloadHref} download={launch.filename}>
          Download again <Icon name="download" />
        </a>
      </footer>
    </dialog>
  );
}
