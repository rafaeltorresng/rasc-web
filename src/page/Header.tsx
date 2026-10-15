import { useEffect, useState } from 'react';
import { DownloadLink, SourceLink, Wordmark } from './Brand';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [downloadProminent, setDownloadProminent] = useState(() => typeof window !== 'undefined' && window.scrollY >= 96);

  useEffect(() => {
    let current = false;
    let currentDownload: boolean | null = null;
    let frame: number | null = null;
    const update = () => {
      frame = null;
      // Keep the download quiet through the first scroll, with a wider return
      // band so small changes in direction do not keep switching its color.
      const nextDownload = currentDownload === true ? window.scrollY > 32 : window.scrollY >= 96;
      if (nextDownload !== currentDownload) {
        currentDownload = nextDownload;
        setDownloadProminent(nextDownload);
      }
      // Same dead band as Trecho: enter at 16px, return at 4px.
      const next = current ? window.scrollY > 4 : window.scrollY >= 16;
      if (next === current) return;
      current = next;
      setScrolled(next);
    };
    const schedule = () => {
      if (frame === null) frame = window.requestAnimationFrame(update);
    };
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('pageshow', schedule);
    update();
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('pageshow', schedule);
      if (frame !== null) window.cancelAnimationFrame(frame);
    };
  }, []);

  return <header className="site-header"><div className="site-header__inner" data-scrolled={scrolled} data-download-prominent={downloadProminent}><Wordmark /><nav aria-label="Main navigation"><a className="header-story" href="#how-it-works">How it works</a><SourceLink /></nav><DownloadLink className="button button--primary header-download" compact /></div></header>;
}
