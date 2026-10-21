import { useEffect, useRef, useState } from 'react';
import { publicUrl } from '../lib/publicUrl';
import Icon from '../ui/Icon';
import './ProductFilm.css';

const film = publicUrl('media/rasc-product-film.mp4');
const poster = publicUrl('media/rasc-product-film-in-use.webp');
const ending = publicUrl('media/rasc-product-film-poster.webp');

/** Native playback, activated in the visitor's click; no media URL before then. */
export default function ProductFilm() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [requested, setRequested] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [ended, setEnded] = useState(false);
  const [failed, setFailed] = useState(false);
  const [posterFailed, setPosterFailed] = useState(false);
  const [playRejected, setPlayRejected] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    return () => video?.pause();
  }, []);
  useEffect(() => {
    if (revealed) videoRef.current?.focus({ preventScroll: true });
  }, [revealed]);

  function play() {
    const video = videoRef.current;
    if (!video) return;
    setRequested(true);
    setPlayRejected(false);
    if (!video.getAttribute('src')) video.src = film;
    if (video.ended) video.currentTime = 0;
    if (revealed) video.focus({ preventScroll: true });
    // Stay inside the original user gesture, including on Safari/iOS.
    video.play().catch(() => {
      if (video.error) setFailed(true);
      else { setPlayRejected(true); setRequested(false); }
    });
  }

  return <section id="product-film" className="film-section" data-variant="minimal" aria-labelledby="product-film-title">
    <div className="page-container film-inner">
      <header className="visually-hidden">
        <h2 id="product-film-title">See Rasc in motion.</h2>
      </header>
      <div className="film-frame" data-revealed={revealed && !failed} data-ended={ended}>
        <video ref={videoRef} controls={requested && !failed} tabIndex={requested && !failed ? 0 : -1} aria-hidden={!requested || failed} poster={requested ? ending : undefined} playsInline preload="none" width="1920" height="1080"
          aria-label="Rasc product film" aria-describedby="product-film-disclosure"
          onPlaying={() => { setRevealed(true); setEnded(false); }}
          onEnded={() => setEnded(true)} onError={() => setFailed(true)} />
        {!posterFailed && <img className="film-poster" src={poster} width="1920" height="1080" loading="lazy" decoding="async"
          alt="Rasc captures an unfinished thought over a design project, without leaving the work."
          onError={() => setPosterFailed(true)} />}
        {posterFailed && !revealed && <p className="film-poster-fallback">Rasc in motion.</p>}
        {!failed && (!revealed || ended) && <button type="button" className="film-play" aria-label={ended ? 'Replay product film' : 'Play product film'}
          disabled={requested && !revealed && !playRejected} onClick={play}>
          <span className="film-play-icon"><Icon name="play" /></span>
          <span>{ended ? 'Watch again' : requested ? 'Loading film…' : 'Play film'}<small>0:28</small></span>
        </button>}
      </div>
      {failed && <p className="film-error" role="status">Video unavailable. <a href={film}>Open the MP4</a>.</p>}
      {playRejected && <p className="film-error" role="status">Playback paused. Select Play to try again.</p>}
      <div className="film-caption">
        <p id="product-film-disclosure">Illustrative demo · Refine results may vary.</p>
      </div>
    </div>
  </section>;
}
