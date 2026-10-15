import m3Small from '../assets/companion/m3-224.webp';
import m3Medium from '../assets/companion/m3-448.webp';
import m3Large from '../assets/companion/m3-672.webp';
import m3Fallback from '../assets/companion/m3-448.png';
import './EditorialCompanion.css';

/** A quiet brand illustration, never a product state or an AI indicator. */
export default function EditorialCompanion() {
  return <div className="editorial-companion" aria-hidden="true">
    <span className="editorial-index">A thought.<br />Still taking shape.</span>
    <picture className="editorial-companion__figure">
      <source type="image/webp" srcSet={`${m3Small} 224w, ${m3Medium} 448w, ${m3Large} 672w`} sizes="(max-width: 820px) 97px, 213px" />
      <img src={m3Fallback} width="448" height="612" alt="" loading="lazy" decoding="async" fetchPriority="low" />
    </picture>
  </div>;
}
