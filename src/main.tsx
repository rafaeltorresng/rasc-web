import React from 'react';
import ReactDOM from 'react-dom/client';
import LandingPage from './page/LandingPage';
import './styles.css';
import { sceneMotion } from './product/timeline';

for (const key of ['micro', 'content', 'scene', 'dismiss', 'editorialEnter', 'editorialStagger'] as const) {
  document.documentElement.style.setProperty(`--motion-${key}`, `${sceneMotion[key]}ms`);
}

const root = ReactDOM.createRoot(document.getElementById('root')!);
const showcase = new URLSearchParams(window.location.search).get('showcase');
// Local art-direction and export surfaces do not ship in the production bundle.
if (import.meta.env.DEV && (showcase === 'studies' || showcase === 'post')) {
  import('./page/ShowcaseStudy').then(({ default: ShowcaseStudy }) => {
    root.render(<ShowcaseStudy post={showcase === 'post'} />);
  });
} else {
  root.render(<React.StrictMode><LandingPage /></React.StrictMode>);
}
