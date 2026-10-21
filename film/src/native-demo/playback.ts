import { presentationTime as basePresentation } from "../v63/playback";
import { source } from "./timing";
/** Only editorial timing changes. Native processing footage is mapped back at 1×. */
export function presentationTime(logical: number) {
  const u = Math.max(0, Math.min(1, (logical - 6.45) / 2.2));
  const capture = Math.max(0, Math.min(1, (logical - 2) / 4));
  return basePresentation(logical) - 2.3 * capture * capture * (3 - 2 * capture) + source.extraSeconds * u * u * (3 - 2 * u);
}
export function filmTime(seconds: number) {
  let lo = Math.max(0, seconds - Math.max(4, 2 + source.extraSeconds)), hi = seconds + 3;
  for (let i = 0; i < 45; i++) {
    const mid = (lo + hi) / 2;
    if (presentationTime(mid) < seconds) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
}
export const durationInFrames = source.durationFrames;
