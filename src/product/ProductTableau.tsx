import { useEffect, useRef, useState } from 'react';
import { publicUrl } from '../lib/publicUrl';
import ThinkingOrb from './ThinkingOrb';
import './ProductTableau.css';

/** A composition of native captures, not a simultaneous app state. */
export default function ProductTableau({ className = '', caption = true, live = false }: {
  className?: string;
  caption?: boolean;
  live?: boolean;
}) {
  const root = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [pageVisible, setPageVisible] = useState(() => document.visibilityState === 'visible');
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  useEffect(() => {
    if (!live || !root.current) return;
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = () => setReduced(query.matches);
    const updateVisibility = () => setPageVisible(document.visibilityState === 'visible');
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    observer.observe(root.current);
    query.addEventListener('change', updateMotion);
    document.addEventListener('visibilitychange', updateVisibility);
    return () => {
      observer.disconnect();
      query.removeEventListener('change', updateMotion);
      document.removeEventListener('visibilitychange', updateVisibility);
    };
  }, [live]);

  const animated = live && !reduced;
  const running = animated && inView && pageVisible;
  const orb = <span className="product-tableau__orb-mask" aria-hidden="true"><ThinkingOrb composing paused={!running} /></span>;

  return (
    <figure ref={root} className={`product-tableau ${className}`} data-motion={running ? 'running' : 'paused'}>
      <div className="product-tableau__stage" role="img" aria-label={`Rasc on Mac: a scratchpad with an unfinished thought in front of Home, and an optional Refine preview. Composed from real app captures with synthetic examples.${live ? ' Animated Thinking Orb and cursor details.' : ''}`}>
        <div className="product-tableau__window product-tableau__home">
          <img src={publicUrl('screenshots/tableau/home.png')} width="2000" height="1360" alt="" aria-hidden="true" />
        </div>
        <div className="product-tableau__window product-tableau__scratchpad">
          <img src={publicUrl('screenshots/tableau/scratchpad.png')} width="1440" height="640" alt="" aria-hidden="true" fetchPriority="high" />
          {animated && <>{orb}<span className="product-tableau__caret" aria-hidden="true" /></>}
        </div>
        <div className="product-tableau__window product-tableau__refine">
          <img src={publicUrl('screenshots/tableau/refine.png')} width="1280" height="640" alt="" aria-hidden="true" />
          {animated && orb}
        </div>
      </div>
      {caption && <figcaption className="product-tableau__caption">
        <p><span>Catch a thought.</span> A little room to come back to it.</p>
        {!live && <span className="product-tableau__provenance">Real Mac app · composed views</span>}
      </figcaption>}
    </figure>
  );
}
