// Gradient stops aligned with RascOrbPalette (light) in the native app.
export const orbOpacity = 1;

function cssColor(styles: CSSStyleDeclaration, name: string, fallback: string): string {
  const value = styles.getPropertyValue(name).trim();
  return value || fallback;
}

export function createOrbTint(context: CanvasRenderingContext2D, side: number, styles: CSSStyleDeclaration): CanvasGradient {
  const tint = context.createLinearGradient(side * 0.18, side * 0.18, side * 0.82, side * 0.82);
  tint.addColorStop(0, cssColor(styles, '--orb-violet-highlight', '#6754cc'));
  tint.addColorStop(0.34, cssColor(styles, '--orb-violet-deep', '#5c47bd'));
  tint.addColorStop(0.58, cssColor(styles, '--violet', '#7564d8'));
  tint.addColorStop(0.8, cssColor(styles, '--orb-violet-shadow', '#473296'));
  tint.addColorStop(1, cssColor(styles, '--action-ink', '#a93c10'));
  return tint;
}
