/** Film-space geometry. The camera never transforms the editorial rail. */
export const grid = {
  stage: { left: 64, top: 64, right: 1856, bottom: 872 },
  rail: { left: 96, top: 912, right: 1824, bottom: 1040 },
  captionBaseline: 950,
} as const;
export const stageClip = "inset(64px 64px 208px 64px round 18px)";
