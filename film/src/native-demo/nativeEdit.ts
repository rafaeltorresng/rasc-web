import { tracks } from "./take";
import { typing } from "./typing";
import { source } from "./timing";
import { presentationTime } from "./playback";
import { frameAt, complete, decisions as d } from "./direction";
export function sourceTime(t: number) {
  // Let the real native exit finish at 1×. frameAt holds only its fully
  // transparent terminal frame, never a partially faded window.
  if (t >= complete.keepPress) return source.keep + t - complete.keepPress;
  if (t >= d.accept) return source.accept + Math.min(t - d.accept, 1.2);
  if (t >= d.suggested) return source.suggested + Math.min(t - d.suggested, 1.1);
  if (t >= d.original) return source.original + Math.min(t - d.original, 1.1);
  if (t >= d.preview) return source.preview + Math.min(t - d.preview, 1.5);
  // Uninterrupted native invocation/Orb at 1×. Text crossfades are trimmed
  // between authentic stable states; the unedited proof preserves those transitions.
  if (t >= complete.refine) return source.refine + presentationTime(t) - presentationTime(complete.refine);
  let seconds = .7;
  for (const event of typing) {
    if (event.frame > t * 60) break;
    seconds = event.source;
  }
  return seconds;
}
export function nativeAt(t: number) { return `native-demo/${frameAt(tracks.flow, sourceTime(t))}`; }
export function reopenedAt(t: number) { return `native-demo/${frameAt(tracks.reopened, .35 + Math.max(0, t - d.reopen))}`; }
