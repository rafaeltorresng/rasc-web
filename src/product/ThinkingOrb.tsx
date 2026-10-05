import { useEffect, useRef } from 'react';
import { sceneMotion } from './timeline';
import { createOrbTint, orbOpacity } from './orbTint';
import { composingOrbFrame, searchingOrbFrame } from './editorialOrbFrames';

type Point = readonly [number, number];

const triangle: Point[] = [[0, -0.26], [0.24, 0.16], [-0.24, 0.16]];
const square: Point[] = [[0, -0.2], [0.2, -0.2], [0.2, 0.2], [-0.2, 0.2], [-0.2, -0.2]];

function polygonPoint(vertices: Point[], progress: number): Point {
  const lengths = vertices.map((point, index) => {
    const next = vertices[(index + 1) % vertices.length];
    return Math.hypot(next[0] - point[0], next[1] - point[1]);
  });
  const perimeter = lengths.reduce((sum, length) => sum + length, 0);
  let remaining = progress * perimeter;
  let index = 0;
  while (index < vertices.length - 1 && remaining > lengths[index]) {
    remaining -= lengths[index];
    index += 1;
  }
  const start = vertices[index];
  const end = vertices[(index + 1) % vertices.length];
  const part = lengths[index] ? Math.min(1, remaining / lengths[index]) : 0;
  return [start[0] + (end[0] - start[0]) * part, start[1] + (end[1] - start[1]) * part];
}

function shapePoint(shape: number, progress: number): Point {
  if (shape === 0) {
    const angle = -Math.PI / 2 + progress * Math.PI * 2;
    return [Math.cos(angle) * 0.24, Math.sin(angle) * 0.24];
  }
  return polygonPoint(shape === 1 ? triangle : square, progress);
}

function smooth(value: number): number {
  return value * value * (3 - 2 * value);
}

/**
 * Web rendering of ThinkingOrbsKit's inline shaping, composing and searching.
 * Geometry follows Morph.swift, Strands.swift and Lattice.swift (MIT; see notice).
 * Each mode starts with its Rasc state and stops when the state ends.
 */
export default function ThinkingOrb({
  active = false,
  composing = false,
  searching = false,
  paused = false,
  reducedMotion = false,
  label = 'Thinking Orb',
}: {
  active?: boolean;
  composing?: boolean;
  searching?: boolean;
  paused?: boolean;
  reducedMotion?: boolean;
  label?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const startedAtRef = useRef(0);
  const pausedAtRef = useRef(0);
  const modeRef = useRef<'idle' | 'shaping' | 'composing' | 'searching'>('idle');

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;
    let animation = 0;
    let inView = false;
    let tint: CanvasGradient | null = null;
    const styles = getComputedStyle(canvas);
    const phaseLength = (sceneMotion.orbHold + sceneMotion.orbMorph) / 1000;

    const dot = (x: number, y: number, radius: number, alpha = 1) => {
      context.globalAlpha = alpha * orbOpacity;
      context.beginPath();
      context.arc(x, y, radius, 0, Math.PI * 2);
      context.fill();
    };

    const draw = (elapsed = 0) => {
      cancelAnimationFrame(animation);
      const running = (active || composing || searching) && !paused && !reducedMotion && inView && document.visibilityState === 'visible';
      const bounds = canvas.getBoundingClientRect();
      const scale = Math.min(2, window.devicePixelRatio || 1);
      const side = Math.max(1, Math.round(bounds.width * scale));
      if (canvas.width !== side || canvas.height !== side || !tint) {
        canvas.width = side;
        canvas.height = side;
        tint = createOrbTint(context, side, styles);
      }
      context.clearRect(0, 0, side, side);
      const shapingTime = elapsed * 2.08; // native px20 preset × refining speed 1
      const local = shapingTime % phaseLength;
      const shapeIndex = Math.floor(shapingTime / phaseLength) % 3;
      const composingTime = (reducedMotion ? .6 : elapsed) * 0.48 * 3.12;
      const progress = active && !reducedMotion && local > sceneMotion.orbHold / 1000
        ? smooth((local - sceneMotion.orbHold / 1000) / (sceneMotion.orbMorph / 1000))
        : 0;
      const count = side / scale <= 32 ? 18 : 24;
      const center = side / 2;
      const dotRadius = Math.max(0.35 * scale, side * (side / scale <= 32 ? 0.042 : 0.0163));
      context.fillStyle = tint!;
      if (composing || searching) {
        // Native px20 presets with the real Rasc state speeds.
        const geometry = searching
          ? searchingOrbFrame((reducedMotion ? .6 : elapsed) * .68 * 2.665)
          : composingOrbFrame(composingTime, 20);
        const zoom = side / 20;
        for (const point of geometry.dots) {
          dot(point.x * zoom, point.y * zoom, point.r * zoom, point.a * (1 - point.white));
        }
      } else {
        const pulse = active && !reducedMotion ? 1 + 0.02 * Math.sin(local * 3.1) : 1;
        // Native Morph.swift re-samples the blended path by arc length.
        const spread = 1.45;
        const path = Array.from({ length: 160 }, (_, index) => {
          const from = shapePoint(shapeIndex, index / 160);
          const to = shapePoint((shapeIndex + 1) % 3, index / 160);
          return [(from[0] + (to[0] - from[0]) * progress) * spread,
            (from[1] + (to[1] - from[1]) * progress) * spread] as Point;
        });
        const lengths = path.map((point, index) => {
          const next = path[(index + 1) % path.length];
          return Math.hypot(next[0] - point[0], next[1] - point[1]);
        });
        const total = lengths.reduce((sum, length) => sum + length, 0);
        let segment = 0;
        let accumulated = 0;
        for (let index = 0; index < count; index += 1) {
          const target = index / count * total;
          while (segment < path.length - 1 && accumulated + lengths[segment] < target) {
            accumulated += lengths[segment]; segment += 1;
          }
          const from = path[segment];
          const to = path[(segment + 1) % path.length];
          const part = lengths[segment] ? (target - accumulated) / lengths[segment] : 0;
          dot(center + (from[0] + (to[0] - from[0]) * part) * side * pulse,
            center + (from[1] + (to[1] - from[1]) * part) * side * pulse, dotRadius);
        }
      }
      context.globalAlpha = 1;
      if (running) {
        animation = requestAnimationFrame(() => draw((performance.now() - startedAtRef.current) / 1000));
      }
    };

    const mode = active ? 'shaping' : searching ? 'searching' : composing ? 'composing' : 'idle';
    if (modeRef.current !== mode) {
      modeRef.current = mode;
      startedAtRef.current = mode === 'idle' || reducedMotion ? 0 : performance.now();
    }
    if (mode !== 'idle' && !reducedMotion && !startedAtRef.current) startedAtRef.current = performance.now();
    if (mode === 'idle' || reducedMotion) pausedAtRef.current = 0;
    else if (paused && !pausedAtRef.current) pausedAtRef.current = performance.now();
    else if (!paused && pausedAtRef.current) {
      startedAtRef.current += performance.now() - pausedAtRef.current;
      pausedAtRef.current = 0;
    }
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView) {
        if ((active || composing || searching) && !reducedMotion && !startedAtRef.current) startedAtRef.current = performance.now();
        draw((active || composing || searching) && !reducedMotion ? (performance.now() - startedAtRef.current) / 1000 : 0);
      } else {
        cancelAnimationFrame(animation);
      }
    });
    observer.observe(canvas);
    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible' && inView) {
        if ((active || composing || searching) && !reducedMotion && !startedAtRef.current) startedAtRef.current = performance.now();
        draw((active || composing || searching) && !reducedMotion ? (performance.now() - startedAtRef.current) / 1000 : 0);
      } else {
        cancelAnimationFrame(animation);
      }
    };
    document.addEventListener('visibilitychange', onVisibilityChange);
    draw((active || composing || searching) && !reducedMotion ? (performance.now() - startedAtRef.current) / 1000 : 0);

    return () => {
      cancelAnimationFrame(animation);
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [active, composing, searching, paused, reducedMotion]);

  return <canvas ref={canvasRef} className={`thinking-orb${active ? ' is-shaping' : ''}`} role="img" aria-label={label} />;
}
