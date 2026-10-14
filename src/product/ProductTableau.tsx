import { publicUrl } from '../lib/publicUrl';
import './ProductTableau.css';

/** A composition of native captures, not a simultaneous app state. */
export default function ProductTableau({ className = '', caption = true }: {
  className?: string;
  caption?: boolean;
}) {
  return (
    <figure className={`product-tableau ${className}`}>
      <div className="product-tableau__stage" role="img" aria-label="Rasc on Mac: a large scratchpad with an unfinished thought in front of Home, and an optional Refine preview. Composed from real app captures with synthetic examples.">
        <img className="product-tableau__home" src={publicUrl('screenshots/tableau/home.jpg')} width="2000" height="1360" alt="" aria-hidden="true" />
        <img className="product-tableau__scratchpad" src={publicUrl('screenshots/tableau/scratchpad.jpg')} width="1440" height="880" alt="" aria-hidden="true" fetchPriority="high" />
        <img className="product-tableau__refine" src={publicUrl('screenshots/tableau/refine.jpg')} width="1440" height="880" alt="" aria-hidden="true" />
      </div>
      {caption && <figcaption className="product-tableau__caption">
        <p><span>Catch a thought.</span> A little room to come back to it.</p>
        <span className="product-tableau__provenance">Real Mac app · composed views</span>
      </figcaption>}
    </figure>
  );
}
