/** Keep the approved calmer opening. */
function openingTime(seconds: number) {
  const u = Math.max(0, Math.min(1, seconds / 4));
  return seconds - u * u * (3 - 2 * u);
}
function openingPresentation(logical: number) {
  let lo = logical,
    hi = logical + 1;
  for (let i = 0; i < 40; i++) {
    const mid = (lo + hi) / 2;
    if (openingTime(mid) < logical) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
}
/** Continuous per-character typing, with smooth joins. */
function typingOffset(t: number) {
  const u = Math.max(0, Math.min(1, (t - 2) / 4));
  return 0.8 * u * u * (3 - 2 * u);
}
/** 0.85–3.05s of continuous native footage, played at exactly 1×.
 * Only the surrounding choreography uses the logical editorial clock.
 * Source duration is measured from this take, not a promised inference time. */
export function presentationTime(logical: number) {
  return openingPresentation(logical) + typingOffset(logical);
}
export function filmTime(seconds: number) {
  let lo = Math.max(0, seconds - 2),
    hi = seconds;
  for (let i = 0; i < 45; i++) {
    const mid = (lo + hi) / 2;
    if (presentationTime(mid) < seconds) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
}
export const durationInFrames = 1776;
