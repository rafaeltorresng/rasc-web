import React from 'react';
import ReactDOM from 'react-dom/client';
import LandingPage from './page/LandingPage';
import './styles.css';
import { sceneMotion } from './product/timeline';

for (const key of ['micro', 'content', 'scene', 'dismiss', 'editorialEnter', 'editorialStagger'] as const) {
  document.documentElement.style.setProperty(`--motion-${key}`, `${sceneMotion[key]}ms`);
}

const root = ReactDOM.createRoot(document.getElementById('root')!);
const params = new URLSearchParams(window.location.search);
const showcase = params.get('showcase');
// Local art-direction and export surfaces do not ship in the production bundle.
if (/\/install(?:\/index\.html|\/)?$/.test(window.location.pathname)) {
  import('./page/InstallationPage').then(({ default: InstallationPage }) => root.render(<React.StrictMode><InstallationPage /></React.StrictMode>));
} else if (import.meta.env.DEV && params.has('companion')) {
  import('./page/CompanionStudy').then(({ default: CompanionStudy }) => {
    root.render(<CompanionStudy />);
  });
} else if (import.meta.env.DEV && (showcase === 'studies' || showcase === 'post')) {
  import('./page/ShowcaseStudy').then(({ default: ShowcaseStudy }) => {
    const pose = params.get('pose');
    root.render(<ShowcaseStudy post={showcase === 'post'} companion={pose === 'm1' || pose === 'm3' ? pose : undefined} />);
  });
} else {
  root.render(<React.StrictMode><LandingPage /></React.StrictMode>);
}
