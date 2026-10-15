import ProductTableau from '../product/ProductTableau';
import { Wordmark } from './Brand';
import { publicUrl } from '../lib/publicUrl';
// Publication previews use lossless masters; optimized web assets are for the landing.
import m1 from '../../brand/companion/m1-master.png';
import m3 from '../../brand/companion/m3-master.png';
import './ShowcaseStudy.css';

const directions = [
  { id: 'a', title: 'A — Product Tableau', note: 'Home anchors the scene. The scratchpad leads. Refine is optional and close at hand.' },
  { id: 'b', title: 'B — Mac Context, Minimal', note: 'A quiet working surface establishes context, but gives less room to the Rasc ecosystem.' },
  { id: 'c', title: 'C — Editorial Product Spread', note: 'A generous note with ordered supporting surfaces. Strong as a post, less unified as a product scene.' },
];

export default function ShowcaseStudy({ post = false, companion }: { post?: boolean; companion?: 'm1' | 'm3' }) {
  if (post) return (
    <main className="showcase-post">
      <Wordmark />
      <div className="showcase-post__heading">
        <h1>A scratchpad for<br /><span>unfinished thoughts.</span></h1>
        <p>The place before the note.</p>
      </div>
      <ProductTableau caption={false} />
      {companion && (
        <span className={`showcase-post__signature showcase-post__signature--${companion}`} aria-hidden="true">
          <img src={companion === 'm3' ? m3 : m1} width="832" height="1136" alt="" />
        </span>
      )}
      <footer>Native Mac app. Local-first. A little room to think.</footer>
    </main>
  );
  return <main className="showcase-studies"><header><Wordmark /><h1>One small app. Three ways to show it.</h1><p>Composition studies · native Rasc 0.1.0 captures · synthetic examples</p></header>{directions.map((direction) => <section key={direction.id} className={`showcase-study showcase-study--${direction.id}`}><div className="showcase-study__heading"><h2>{direction.title}</h2><p>{direction.note}</p></div><div className="showcase-study__scene">{direction.id === 'b' && <div className="showcase-study__context" aria-hidden="true"><div>Monday’s draft</div><p>There’s probably a simpler way<br />to explain this.</p><hr /><hr /><hr /></div>}<ProductTableau caption={false} />{direction.id === 'c' && <img className="showcase-study__search" src={publicUrl('screenshots/tableau/search.jpg')} width="1440" height="880" alt="Native Rasc Search, with a result for upload" />}</div></section>)}</main>;
}
