import { tracks } from "./take";
import { typing } from "./typing";
import { frameAt, short, complete } from "./direction";
export function sourceTime(
  t: number,
  mode: "short" | "complete",
): { track: keyof typeof tracks; seconds: number } {
  const b = mode === "short" ? short : complete;
  if (t >= b.keepPress)
    return {
      track: mode === "short" ? "keep-short-final" : "decision-keep",
      seconds:
        (mode === "short" ? 1.63 : 6.03) + Math.min(t - b.keepPress, 0.44),
    };
  if (mode === "complete" && t >= b.refine) {
    if (t < 8.2833)
      return { track: "processing-long", seconds: 1.22 + t - b.refine };
    // Whole native, settled states. Cut past the app's transient double text drawing.
    if (t < 9.15)
      return {
        track: "decision-keep",
        seconds: 0.5 + Math.min(t - 8.2833, 0.8),
      };
    if (t < 9.8)
      return { track: "decision-keep", seconds: 2.4 + Math.min(t - 9.15, 0.5) };
    if (t < 10.65)
      return { track: "decision-keep", seconds: 3.5 + Math.min(t - 9.8, 0.65) };
    return { track: "decision-keep", seconds: 4.9 + Math.min(t - 10.65, 0.95) };
  }
  const list = typing[mode];
  let source = 0.98;
  for (const e of list) {
    if (e.frame > Math.round(t * 60)) break;
    source = e.source;
  }
  return { track: "typing-full", seconds: Math.min(source, 12.35) };
}
export function nativeAt(t: number, mode: "short" | "complete") {
  const s = sourceTime(t, mode);
  return `v62/native/${frameAt(tracks[s.track], s.seconds)}`;
}
