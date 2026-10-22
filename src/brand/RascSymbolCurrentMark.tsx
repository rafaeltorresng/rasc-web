import { useEffect, useId, useState } from 'react';
import DarkVeil from './DarkVeil';
import { RASC_SYMBOL_PATH } from './rascSymbolClipPath';
import { publicUrl } from '../lib/publicUrl';
import './RascSymbolCurrentMark.css';

type Props = { className?: string };

const maskUrl = publicUrl('rasc-symbol-current-mask.svg');

export default function RascSymbolCurrentMark({ className = '' }: Props) {
  const clipId = useId().replace(/:/g, '');
  const [reducedMotion, setReducedMotion] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReducedMotion(query.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  if (reducedMotion) {
    return (
      <img
        className={`rasc-symbol-current-mark rasc-symbol-current-mark--static ${className}`}
        src={publicUrl('rasc-symbol-current.png')}
        width={1024}
        height={1024}
        alt=""
        decoding="async"
      />
    );
  }

  return (
    <div className={`rasc-symbol-current-mark ${className}`} aria-hidden="true">
      <svg className="rasc-symbol-current-mark__defs" width="0" height="0" aria-hidden="true">
        <defs>
          <clipPath id={clipId} clipPathUnits="objectBoundingBox">
            <path d={RASC_SYMBOL_PATH} transform="scale(0.0009765625)" />
          </clipPath>
        </defs>
      </svg>
      <div
        className="rasc-symbol-current-mark__veil"
        style={{
          clipPath: `url(#${clipId})`,
          WebkitClipPath: `url(#${clipId})`,
          WebkitMaskImage: `url(${maskUrl})`,
          maskImage: `url(${maskUrl})`,
        }}
      >
        <DarkVeil mouseInteraction={false} speed={0.45} scale={1.1} brightness={1.05} />
      </div>
    </div>
  );
}
