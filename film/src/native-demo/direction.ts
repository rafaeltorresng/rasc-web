import { interpolate, Easing } from "remotion";
import { note } from "./content";
export const thought = note;
export const easing = Easing.bezier(0.65, 0, 0.2, 1);
export const ramp = (t: number, a: number, b: number) =>
  interpolate(t, [a, b], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing,
  });
export const nativeWindow = {
  left: 320,
  top: 214,
  width: 1280,
  height: 576,
  sourceWidth: 1600,
  sourceHeight: 720,
};
export const short = {
  duration: 10,
  window: 1.65,
  captureCue: 0.95,
  capturePress: 1.59,
  refine: 1000,
  keepCue: 5.72,
  keepTrack: 5.95,
  keepPress: 6.3,
  hide: 6.98,
  resume: 7.9,
  retrieve: 1000,
  closing: 1000,
};
export const complete = {
  duration: 27.8,
  window: 1.65,
  captureCue: 0.95,
  capturePress: 1.59,
  refine: 6.45,
  keepCue: 14.25,
  keepTrack: 14.85,
  keepPress: 14.85,
  hide: 15.55,
  resume: 16.25,
  retrieve: 17.75,
  closing: 23.4,
};
export const decisions = {
  preview: 8.65,
  original: 10.25,
  suggested: 11.7,
  accept: 13.1,
  homeCue: 17,
  homePress: 17.6,
  search: 19.2,
  queryEnd: 20.65,
  reopen: 21.5,
};
export type Timing = typeof short;
export function cameraAt(t: number, b: Timing) {
  const keys = [
    { t: 0, x: 960, y: 540, s: 1 },
    { t: 0.15, x: 960, y: 540, s: 1 },
    { t: 0.95, x: 1135, y: 590, s: 1.5 },
    { t: 1.27, x: 1135, y: 590, s: 1.5 },
    { t: 1.62, x: 960, y: 540, s: 1 },
    { t: 2.75, x: 960, y: 540, s: 1 },
    { t: 3.8, x: 970, y: 520, s: 1.12 },
    ...(b.refine < 100
      ? [
          { t: 6.45, x: 970, y: 520, s: 1.12 },
          { t: 8.65, x: 960, y: 520, s: 1.14 },
          { t: 11.7, x: 960, y: 520, s: 1.14 },
          { t: 13.1, x: 970, y: 520, s: 1.12 },
        ]
      : []),
    { t: b.hide, x: 970, y: 520, s: 1.12 },
    { t: b.hide + 0.7, x: 1135, y: 590, s: 1.5 },
    { t: b.resume + 0.35, x: 1135, y: 590, s: 1.5 },
    { t: b.resume + 1.25, x: 960, y: 540, s: 1 },
  ];
  const v = (key: "x" | "y" | "s") =>
    interpolate(
      t,
      keys.map((k) => k.t),
      keys.map((k) => k[key]),
      { easing, extrapolateLeft: "clamp", extrapolateRight: "clamp" },
    );
  return { x: v("x"), y: v("y"), s: v("s") };
}
export function frameAt(
  track: readonly { file: string; seconds: number }[],
  t: number,
) {
  let lo = 0,
    hi = track.length - 1;
  while (lo < hi) {
    const m = Math.ceil((lo + hi) / 2);
    if (track[m].seconds <= t) lo = m;
    else hi = m - 1;
  }
  return track[lo].file;
}
export function windowBounds(t: number, b: Timing) {
  const c = cameraAt(t, b);
  return {
    left: 960 + (nativeWindow.left - c.x) * c.s,
    top:
      540 +
      (nativeWindow.top + (1 - ramp(t, b.window, b.window + 0.25)) * 14 - c.y) *
        c.s,
    width: nativeWindow.width * c.s,
    height: nativeWindow.height * c.s,
    sourceScale: (nativeWindow.width * c.s) / 1600,
  };
}
