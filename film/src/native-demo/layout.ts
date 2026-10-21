import { ramp } from "./direction";

/** Film-space geometry. The camera never transforms the editorial rail. */
export const grid = {
  stage: { left: 64, top: 64, right: 1856, bottom: 872 },
  rail: { left: 96, top: 912, right: 1824, bottom: 1040 },
  captionBaseline: 950,
} as const;
export const stageClip = "inset(64px 64px 208px 64px round 18px)";

export function homeCameraAt(time: number) {
  const focus = ramp(time, 20.1, 20.95);
  const scale = 0.61 + 0.055 * focus;
  return {
    scale,
    x: 264 - 62 * focus,
    y: 96 - 4 * focus,
    width: 2280 * scale,
    height: 1120 * scale,
  };
}

// Measured in the unmodified 2280×1120 native Home capture.
export const resultCard = { x: 64, y: 230, width: 696, height: 214 };
export const resultClick = { x: 350, y: 340 };
export function homePoint(time: number, point = resultClick) {
  const c = homeCameraAt(time);
  return { x: c.x + point.x * c.scale, y: c.y + point.y * c.scale };
}

export function resolutionPose(time: number, variant = "margin") {
  const progress = ramp(time, 0.08, 1.55);
  return {
    progress,
    x: 320 + (variant === "margin" ? 1750 * progress : 0),
    y: 214 - (variant === "margin" ? 24 : 900) * progress,
  };
}
