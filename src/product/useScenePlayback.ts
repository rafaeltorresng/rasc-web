import { useCallback, useEffect, useRef, useState } from 'react';

type Frame<Phase extends string> = Readonly<{ at: number; phase: Phase }>;

// A finite scene clock. Visibility suspends elapsed time; only Replay resets
// it. Manual actions may run to a boundary (Refine stops at pending preview).
export function useScenePlayback<Phase extends string>(
  frames: readonly Frame<Phase>[],
  duration: number,
  enabled: boolean,
  reduced: boolean,
  stillPhase: Phase,
  animatedPhase: Phase,
  keystrokes?: readonly number[],
) {
  const initial = reduced ? frames.find((frame) => frame.phase === stillPhase)!.at : 0;
  const [elapsed, setElapsed] = useState(initial);
  const [wantsPlay, setWantsPlay] = useState(!reduced);
  const [revision, setRevision] = useState(0);
  const time = useRef(initial);
  const stopAt = useRef(duration);
  const pending = useRef<{ at: number; play: boolean } | null>(null);
  const phase = [...frames].reverse().find((frame) => frame.at <= elapsed)!.phase;
  const complete = elapsed >= duration;

  useEffect(() => {
    if (reduced || !enabled || !wantsPlay || complete) return;
    const started = performance.now() - time.current;
    let timer = 0;
    const tick = () => {
      const now = Math.min(stopAt.current, performance.now() - started);
      time.current = now;
      setElapsed(now);
      if (now >= stopAt.current) {
        setWantsPlay(false);
        return;
      }
      const current = [...frames].reverse().find((frame) => frame.at <= now)!;
      const next = frames.find((frame) => frame.at > now)?.at ?? duration;
      const nextKeystroke = keystrokes?.find((at) => at > now);
      const delay = current.phase === animatedPhase
        ? keystrokes ? Math.min(next, nextKeystroke ?? next) - now : Math.min(60, next - now)
        : next - now;
      timer = window.setTimeout(tick, Math.max(1, Math.min(delay, stopAt.current - now)));
    };
    tick();
    return () => {
      time.current = Math.min(stopAt.current, performance.now() - started);
      window.clearTimeout(timer);
    };
  }, [animatedPhase, complete, duration, enabled, frames, keystrokes, reduced, revision, wantsPlay]);

  const pause = useCallback(() => setWantsPlay(false), []);
  const resume = useCallback(() => {
    stopAt.current = duration;
    setWantsPlay(true);
  }, [duration]);
  const seek = useCallback((next: Phase, play = false, until?: Phase) => {
    const at = frames.find((frame) => frame.phase === next)!.at;
    // Cleanup must run before resetting the cursor; the revision effect then
    // installs the requested position instead of an outgoing clock's time.
    setWantsPlay(false);
    setElapsed(at);
    time.current = at;
    stopAt.current = until ? frames.find((frame) => frame.phase === until)!.at : duration;
    setRevision((value) => value + 1);
    pending.current = { at, play: play && !reduced };
  }, [duration, frames, reduced]);
  useEffect(() => {
    if (!pending.current) return;
    time.current = pending.current.at;
    setWantsPlay(pending.current.play);
    pending.current = null;
  }, [revision]);

  useEffect(() => {
    if (reduced) seek(stillPhase);
  }, [reduced, seek, stillPhase]);

  return { phase, elapsed, complete, wantsPlay, pause, resume, seek,
    replay: () => seek(frames[0].phase, true) };
}
