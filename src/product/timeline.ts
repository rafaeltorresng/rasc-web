export type DemoPhase =
  | 'context'
  | 'shortcut'
  | 'opening'
  | 'typing'
  | 'idle'
  | 'refineCue'
  | 'shaping'
  | 'preview'
  | 'accepted'
  | 'keepCue'
  | 'closing'
  | 'return';

export type TimelineFrame = Readonly<{ at: number; phase: DemoPhase }>;
export type ProductStep = 'capture' | 'refine' | 'keep';

// Chapters share the hero's causal clock but stop at their own boundaries.
export const stepPlayback: Record<ProductStep, { start: DemoPhase; end: DemoPhase; still: DemoPhase }> = {
  capture: { start: 'opening', end: 'idle', still: 'idle' },
  refine: { start: 'shaping', end: 'preview', still: 'preview' },
  keep: { start: 'keepCue', end: 'return', still: 'return' },
};

// One clock owns choreography, typing, cues and state transitions. Durations
// are derived from real Rasc interaction timing where applicable; no AI runs.
export const sceneMotion = {
  micro: 150,
  content: 200,
  scene: 300,
  dismiss: 500,
  orbHold: 1400,
  orbMorph: 900,
  editorialOrbSlot: 4000,
  editorialOrbTransition: 600,
  editorialEnter: 500,
  editorialStagger: 120,
  editorialThoughtPause: 260,
  typing: 5600,
  invokeCue: 800,
  shortcutCue: 450,
  acceptedDwell: 800,
  keepCue: 450,
  roughThoughtDwell: 1200,
  previewDwell: 3200,
  returnDwell: 2400,
} as const;

const at = {
  context: 0,
  shortcut: 180,
  opening: 180 + sceneMotion.invokeCue,
  typing: 180 + sceneMotion.invokeCue + sceneMotion.scene,
} as const;

const typingEnd = at.typing + sceneMotion.typing;
const roughThoughtEnd = typingEnd + sceneMotion.roughThoughtDwell;
const refineCueEnd = roughThoughtEnd + sceneMotion.shortcutCue;
const shapingEnd = refineCueEnd + sceneMotion.orbHold + sceneMotion.orbMorph;
const previewEnd = shapingEnd + sceneMotion.previewDwell;
const acceptedEnd = previewEnd + sceneMotion.acceptedDwell;
const keepCueEnd = acceptedEnd + sceneMotion.keepCue;
const closingEnd = keepCueEnd + sceneMotion.dismiss;

export const demoTimeline: readonly TimelineFrame[] = [
  { at: at.context, phase: 'context' },
  { at: at.shortcut, phase: 'shortcut' },
  { at: at.opening, phase: 'opening' },
  { at: at.typing, phase: 'typing' },
  { at: typingEnd, phase: 'idle' },
  { at: roughThoughtEnd, phase: 'refineCue' },
  { at: refineCueEnd, phase: 'shaping' },
  { at: shapingEnd, phase: 'preview' },
  { at: previewEnd, phase: 'accepted' },
  { at: acceptedEnd, phase: 'keepCue' },
  { at: keepCueEnd, phase: 'closing' },
  { at: closingEnd, phase: 'return' },
];

export const demoDuration = closingEnd + sceneMotion.returnDwell;

export type SearchPhase = 'home' | 'shortcut' | 'search' | 'query' | 'result';
export const searchTimeline: readonly { at: number; phase: SearchPhase }[] = [
  { at: 0, phase: 'home' },
  { at: 1500, phase: 'shortcut' },
  { at: 2300, phase: 'search' },
  { at: 2800, phase: 'query' },
  { at: 4000, phase: 'result' },
];
export const searchDuration = 6500;
export const searchQuery = 'draft';

export function phaseForTime(time: number): DemoPhase {
  return [...demoTimeline].reverse().find((frame) => time >= frame.at)?.phase ?? 'context';
}

export function phaseStartedAt(phase: DemoPhase): number {
  return demoTimeline.find((frame) => frame.phase === phase)?.at ?? 0;
}

export function isRascVisible(phase: DemoPhase): boolean {
  return !['context', 'shortcut', 'return'].includes(phase);
}

export function isShaping(phase: DemoPhase): boolean {
  return phase === 'shaping';
}
