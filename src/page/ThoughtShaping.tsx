import { useEffect, useState } from 'react';
import EditorialOrb from '../product/EditorialOrb';

export default function ThoughtShaping() {
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(query.matches);
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  const orb = <EditorialOrb paused={paused} reducedMotion={reduced} />;
  return <div className="thought-shaping"><span className="editorial-index" aria-hidden="true">A thought.<br />Still taking shape.</span><div className="editorial-orb-group">{reduced ? <div className="editorial-orb">{orb}</div> : <button className="editorial-orb" type="button" aria-label="Pause the thought shaping animation" aria-pressed={paused} title={paused ? 'Resume animation' : 'Pause animation'} onClick={() => setPaused(value => !value)}>{orb}</button>}</div></div>;
}
