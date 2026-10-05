// RascOrbPalette / ThinkingOrb.swift use the same sRGB stops and coordinates.
export const orbOpacity = .96;

export function createOrbTint(context: CanvasRenderingContext2D, side: number, styles: CSSStyleDeclaration): CanvasGradient {
  const tint = context.createLinearGradient(side * .18, side * .18, side * .82, side * .82);
  const violet = styles.getPropertyValue('--violet').trim() || '#7564d8';
  const orange = styles.getPropertyValue('--action-fill').trim() || '#c74a14';
  tint.addColorStop(0, violet);
  tint.addColorStop(.58, violet);
  tint.addColorStop(1, orange);
  return tint;
}
