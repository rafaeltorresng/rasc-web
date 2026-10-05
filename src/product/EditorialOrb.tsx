import { useEffect, useRef } from 'react';
import { editorialOrbFrame, editorialOrbSpeeds, editorialOrbStates, easeOrb } from './editorialOrbFrames';
import { sceneMotion } from './timeline';
import { createOrbTint, orbOpacity } from './orbTint';

export default function EditorialOrb({ paused, reducedMotion }: { paused: boolean; reducedMotion: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const elapsedRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current, context = canvas?.getContext('2d');
    if (!canvas || !context) return;
    let frame = 0, inView = false, lastFrameAt: number | null = null;
    let tint: CanvasGradient | null = null;
    const styles = getComputedStyle(canvas);
    const draw = () => {
      cancelAnimationFrame(frame);
      const running = inView && !paused && !reducedMotion && document.visibilityState === 'visible';
      const now = performance.now();
      if (running && lastFrameAt !== null) elapsedRef.current += Math.max(0, now - lastFrameAt);
      lastFrameAt = running ? now : null;
      const side = Math.max(1, Math.round(canvas.getBoundingClientRect().width * Math.min(2, window.devicePixelRatio || 1)));
      if (canvas.width !== side || canvas.height !== side || !tint) {
        canvas.width = canvas.height = side;
        tint = createOrbTint(context, side, styles);
      }
      context.clearRect(0, 0, side, side);
      const time = reducedMotion ? 0 : elapsedRef.current;
      const index = Math.floor(time / sceneMotion.editorialOrbSlot) % editorialOrbStates.length;
      const state = editorialOrbStates[index], next = editorialOrbStates[(index + 1) % editorialOrbStates.length];
      const local = time % sceneMotion.editorialOrbSlot;
      const blend = reducedMotion ? 0 : easeOrb(Math.max(0, (local - sceneMotion.editorialOrbSlot + sceneMotion.editorialOrbTransition) / sceneMotion.editorialOrbTransition));
      canvas.dataset.orbState = state;
      const zoom = side / 64;
      const paint = (name: typeof state, alpha: number) => {
        if (alpha <= 0) return;
        const nativeTime = (reducedMotion ? .6 : time / 1000) * editorialOrbSpeeds[name];
        const geometry = editorialOrbFrame(name, nativeTime);
        context.fillStyle = tint!; context.strokeStyle = tint!;
        for (const line of geometry.lines) {
          context.globalAlpha = alpha * line.a * (1 - line.white) * orbOpacity;
          context.lineWidth = line.w * zoom;
          context.beginPath(); context.moveTo(line.x1 * zoom, line.y1 * zoom); context.lineTo(line.x2 * zoom, line.y2 * zoom); context.stroke();
        }
        for (const dot of geometry.dots) {
          context.globalAlpha = alpha * dot.a * (1 - dot.white) * orbOpacity;
          context.beginPath(); context.arc(dot.x * zoom, dot.y * zoom, dot.r * zoom, 0, Math.PI * 2); context.fill();
        }
      };
      paint(state, 1 - blend); paint(next, blend); context.globalAlpha = 1;
      if (running) frame = requestAnimationFrame(draw);
    };
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView) draw();
      else { cancelAnimationFrame(frame); lastFrameAt = null; }
    });
    observer.observe(canvas);
    const onVisibility = () => {
      if (document.visibilityState === 'visible' && inView) draw();
      else { cancelAnimationFrame(frame); lastFrameAt = null; }
    };
    document.addEventListener('visibilitychange', onVisibility);
    draw();
    return () => { cancelAnimationFrame(frame); observer.disconnect(); document.removeEventListener('visibilitychange', onVisibility); };
  }, [paused, reducedMotion]);

  return <canvas className="thinking-orb" ref={canvasRef} aria-hidden="true" />;
}
