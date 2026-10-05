import React from 'react';
import ReactDOM from 'react-dom/client';
import LandingPage from './page/LandingPage';
import './styles.css';
import { sceneMotion } from './product/timeline';

for (const key of ['micro', 'content', 'scene', 'dismiss', 'editorialEnter', 'editorialStagger'] as const) {
  document.documentElement.style.setProperty(`--motion-${key}`, `${sceneMotion[key]}ms`);
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LandingPage />
  </React.StrictMode>,
);
