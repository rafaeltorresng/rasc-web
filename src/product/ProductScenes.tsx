import { useEffect, useRef, useState } from 'react';
import { demoExample, heroExamples, thoughts, type DemoExample } from '../content/fixtures';
import { landingCopy } from '../content/copy';
import WorkContext from './WorkContext';
import ThinkingOrb from './ThinkingOrb';
import Icon from '../ui/Icon';
import { BrandSymbol } from '../page/Brand';
import { useScenePlayback } from './useScenePlayback';
import { createTypingPlan, typedLength } from './typing';
import {
  demoDuration,
  demoTimeline,
  isRascVisible,
  isShaping,
  phaseStartedAt,
  sceneMotion,
  searchDuration,
  searchQuery,
  searchTimeline,
  stepPlayback,
  type ProductStep,
  type DemoPhase,
} from './timeline';

const typingStart = phaseStartedAt('typing');
const heroTyping = heroExamples.map((example) => {
  const plan = createTypingPlan(example.rough, sceneMotion.typing - 200);
  return { plan, keystrokes: plan.map((stroke) => typingStart + stroke.at) };
});
const captureTyping = heroTyping[0];
const queryStart = searchTimeline.find((frame) => frame.phase === 'query')!.at;
const queryTyping = createTypingPlan(searchQuery);
const queryKeystrokes = queryTyping.map((stroke) => queryStart + stroke.at);

function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(query.matches);
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);
  return reduced;
}

function usePageVisible(): boolean {
  const [visible, setVisible] = useState(() => document.visibilityState === 'visible');
  useEffect(() => {
    const update = () => setVisible(document.visibilityState === 'visible');
    document.addEventListener('visibilitychange', update);
    return () => document.removeEventListener('visibilitychange', update);
  }, []);
  return visible;
}

function Keycap({ children }: { children: string }) {
  return <kbd className="keycap">{children}</kbd>;
}

function ScratchpadWindow({
  phase,
  progress = 1,
  hero = false,
  reducedMotion = false,
  orbPaused = false,
  onRefine,
  onAccept,
  onKeep,
  onCancel,
  accepted,
  example = demoExample,
}: {
  phase: DemoPhase;
  progress?: number;
  hero?: boolean;
  reducedMotion?: boolean;
  orbPaused?: boolean;
  onRefine?: () => void;
  onAccept?: () => void;
  onKeep?: () => void;
  onCancel?: () => void;
  accepted?: boolean;
  example?: DemoExample;
}) {
  const isPreview = phase === 'preview';
  const isTyping = hero && phase === 'typing';
  const hasThought = !hero || !['opening', 'context', 'shortcut'].includes(phase);
  const committed = accepted ?? ['accepted', 'keepCue', 'closing'].includes(phase);
  const text = isPreview || committed ? example.refined : example.rough;
  const isShapingPhase = isShaping(phase);
  const showCaret = !isShapingPhase && ((hasThought && !isPreview && !committed) || (hero && phase === 'opening'));
  const content = isTyping ? (
    <span className="typed-thought">{text.slice(0, Math.round(text.length * progress))}</span>
  ) : hasThought ? text : null;
  const status = isShapingPhase ? 'Refining…' : isPreview ? 'Refined' : null;

  return (
    <div className={`scratchpad-window${hero ? ' scratchpad-window--hero' : ''}${isPreview ? ' is-preview' : ''}${isShapingPhase ? ' is-shaping' : ''}`}>
      <div className="scratchpad-header">
        <div className="scratchpad-orb-slot">
          <ThinkingOrb active={isShapingPhase} composing={!isShapingPhase} paused={orbPaused} reducedMotion={reducedMotion} label={isShapingPhase ? 'Thinking Orb, shaping' : 'Thinking Orb'} />
        </div>
        {status ? <span className={`scratchpad-state${isShapingPhase ? ' scratchpad-state--shaping' : ''}`}>{status}</span> : <span className="scratchpad-spacer" />}
        {isPreview ? null : phase === 'refineCue' ? (
          <span className="active-shortcut"><Keycap>⌘J</Keycap> Refine</span>
        ) : phase === 'keepCue' ? (
          <span className="active-shortcut"><Keycap>⇧⌘K</Keycap> Keep</span>
        ) : (
          <div className="scratchpad-actions">{hasThought && !isShapingPhase && phase !== 'typing' && (onRefine ? <button type="button" onClick={onRefine}>⌘J <span>Refine</span></button> : <span>⌘J Refine</span>)}{hasThought && !isShapingPhase && phase !== 'typing' && (onKeep ? <button type="button" onClick={onKeep}>⇧⌘K <span>Keep</span></button> : <span>⇧⌘K Keep</span>)}<Icon name="home" className="home-glyph" /></div>
        )}
      </div>
      <div className={`scratchpad-copy${isPreview ? ' scratchpad-copy--preview' : ''}${isTyping ? ' is-typing' : ''}`}>
        {hero && (phase === 'opening' || (isTyping && progress === 0)) && <div className="scratchpad-placeholder">Write something unfinished…<small>Thoughts, tasks, messages, ideas. Anything goes.</small></div>}
        {content && <span className="scratchpad-text" key={isPreview || committed ? 'proposal' : 'rough'}>{content}</span>}
        {showCaret && <span className={`editor-caret${!isTyping || progress === 1 ? ' is-waiting' : ''}`} aria-hidden="true" />}
      </div>
      {isPreview && <div className="preview-footer">{onCancel ? <button className="cancel-action" type="button" onClick={onCancel}><Keycap>Esc</Keycap> Cancel</button> : <span><Keycap>Esc</Keycap> Cancel</span>}{onAccept ? <button className="accept-action" type="button" onClick={onAccept}>↵ &nbsp;Accept</button> : <span className="accept-action">↵ &nbsp;Accept</span>}</div>}
      {reducedMotion && isShapingPhase && <span className="visually-hidden">Refine is shaping a preview. Continue to the next state to see the proposal.</span>}
    </div>
  );
}

const demoStates: { label: string; phase: DemoPhase }[] = [
  { label: 'Invoke', phase: 'opening' }, { label: 'Capture', phase: 'idle' },
  { label: 'Shape', phase: 'shaping' }, { label: 'Preview', phase: 'preview' },
  { label: 'Accept', phase: 'accepted' }, { label: 'Keep', phase: 'return' },
];
const stateLabels: Record<DemoPhase, string> = {
  context: 'A thought comes up while you work.', shortcut: '⌥\\. Rasc is within reach.',
  opening: 'An empty scratchpad. Ready immediately.', typing: 'Catch the thought while it’s here.',
  idle: 'No title. No folder. Just the thought.', refineCue: '⌘J. Give the wording a little shape.',
  shaping: 'On-device AI, shaping your words.', preview: 'A proposal. You decide what changes.',
  accepted: 'Accepted. Still your thought.', keepCue: 'Keep it and carry on.',
  closing: 'Rasc gets out of the way.', return: 'The thought is kept. Your work remains.',
};

export function HeroDemo() {
  const rootRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [committed, setCommitted] = useState<boolean | undefined>(undefined);
  const [automatic, setAutomatic] = useState(true);
  const [exampleIndex, setExampleIndex] = useState(0);
  const example = heroExamples[exampleIndex];
  const reduced = useReducedMotion();
  const pageVisible = usePageVisible();
  const typing = heroTyping[exampleIndex];
  const clock = useScenePlayback(demoTimeline, demoDuration, visible && pageVisible, reduced, 'preview', 'typing', typing.keystrokes);
  const { phase, elapsed } = clock;
  const { complete, seek } = clock;
  const progress = typedLength(typing.plan, elapsed - typingStart) / example.rough.length;

  useEffect(() => {
    // Repeat only the scripted demonstration. A visitor's pending proposal,
    // accepted edit or Keep action must never restart behind their back.
    if (complete && automatic && !reduced && visible && pageVisible) {
      setExampleIndex((index) => (index + 1) % heroExamples.length);
      seek('context', true);
    }
  }, [automatic, complete, pageVisible, reduced, seek, visible]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.intersectionRatio >= 0.35), { threshold: [0, 0.35] });
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  const showState = (next: DemoPhase) => {
    setAutomatic(false);
    setCommitted(['accepted', 'keepCue', 'closing', 'return'].includes(next));
    clock.seek(next);
  };
  const refine = () => {
    setAutomatic(false);
    setCommitted(false);
    clock.seek(reduced ? 'preview' : 'shaping', !reduced, 'preview');
  };
  const keep = () => {
    setAutomatic(false);
    setCommitted(committed ?? ['accepted', 'keepCue', 'closing'].includes(phase));
    clock.seek(reduced ? 'return' : 'keepCue', !reduced);
  };
  const resume = () => {
    // Explicitly resuming the scripted sequence transfers control back to it.
    setCommitted(undefined);
    setAutomatic(true);
    clock.resume();
  };
  const nextState = () => {
    const at = demoTimeline.findIndex((frame) => frame.phase === phase);
    const next = demoStates.find((state) => demoTimeline.findIndex((frame) => frame.phase === state.phase) > at) ?? demoStates[0];
    if (next === demoStates[0]) setExampleIndex((index) => (index + 1) % heroExamples.length);
    showState(next.phase);
  };
  const rascVisible = isRascVisible(phase);
  const running = clock.wantsPlay && !clock.complete;
  const finished = phase === 'return';
  return (
    <figure className="hero-demo" ref={rootRef} aria-labelledby="hero-demo-caption">
      <div className={`demo-stage${reduced ? ' demo-stage--reduced' : ''}`} data-phase={phase} data-example={example.id} data-paused={!running || !visible || !pageVisible}>
        <WorkContext />
        <div className={`shortcut-cue${phase === 'shortcut' ? ' is-active' : ''}`} aria-hidden="true"><Keycap>⌥\</Keycap><span>Open Rasc</span></div>
        <div onFocusCapture={clock.pause} aria-hidden={!rascVisible || phase === 'closing'} inert={!rascVisible || phase === 'closing'} className={`rasc-layer${rascVisible ? ' is-visible' : ''}${phase === 'closing' ? ' is-closing' : ''}`}>
          <ScratchpadWindow phase={phase} progress={progress} example={example} hero reducedMotion={reduced} orbPaused={!pageVisible || !visible || !running || !rascVisible || phase === 'closing'} onRefine={refine} onAccept={() => showState('accepted')} onKeep={keep} onCancel={() => showState('idle')} accepted={committed} />
        </div>
      </div>
      <figcaption className="demo-caption" id="hero-demo-caption">
        <p>{landingCopy.hero.demoCaption}</p>
        {reduced && <span className="visually-hidden" role="status" aria-atomic="true">{stateLabels[phase]}</span>}
        {(reduced || automatic || !finished) && <div className="demo-controls">
          {reduced ? <button className="text-button" type="button" onClick={nextState}>Next state →</button> :
            <button className="text-button" type="button" onClick={running ? clock.pause : resume} aria-label={running ? 'Pause product demonstration' : 'Resume product demonstration'}>{running ? 'Pause' : 'Resume'}</button>}
        </div>}
      </figcaption>
    </figure>
  );
}

function FixtureCard({ id }: { id: string }) {
  const note = thoughts.find((item) => item.id === id)!;
  const [title, ...excerpt] = note.text.split('\n');
  const dateLabel = note.period === 'Today' ? 'Today' : 'Earlier';
  return (
    <article className="fixture-note" aria-label={`${title}: ${note.state}`}>
      <div className="fixture-note__top"><span className="fixture-note__title">{title}</span><time>{dateLabel}</time></div>
      <p>{excerpt.join(' ')}</p>
    </article>
  );
}

export function HomeSearchScene() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [motionPaused, setMotionPaused] = useState(false);
  const reduced = useReducedMotion();
  const pageVisible = usePageVisible();
  const clock = useScenePlayback(searchTimeline, searchDuration, visible && pageVisible, reduced, 'home', 'query', queryKeystrokes);
  const { phase, elapsed } = clock;
  const query = phase === 'result' ? searchQuery : phase === 'query'
    ? searchQuery.slice(0, typedLength(queryTyping, elapsed - queryStart)) : '';
  const filtered = thoughts.filter((item) => item.text.toLowerCase().includes(query.trim().toLowerCase()));
  const today = thoughts.filter((note) => note.period === 'Today');
  const kept = today.filter((note) => note.state === 'kept').slice(0, 2);
  const unfinished = today.filter((note) => note.state === 'unfinished').slice(0, 2);
  const earlier = thoughts.filter((note) => note.period === 'Earlier').slice(0, 1);
  const searchVisible = ['search', 'query', 'result'].includes(phase);
  const resultSelected = phase === 'result';
  // The finite walkthrough settles on its result; the native state orbs stay
  // alive until the visitor pauses motion or the scene leaves the viewport.
  const orbsPaused = motionPaused || reduced || !visible || !pageVisible;
  const toggleMotion = () => {
    setMotionPaused(!motionPaused);
    if (!motionPaused) clock.pause();
    else if (!clock.complete) clock.resume();
  };

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.intersectionRatio >= 0.2), { threshold: [0, 0.2] });
    observer.observe(root);
    return () => observer.disconnect();
  }, [reduced]);

  return (
    <div className={`home-search-scene${reduced ? ' is-static' : ''}`} ref={rootRef} data-search-phase={phase} data-paused={!visible || !pageVisible || !clock.wantsPlay || clock.complete}>
      <section className="home-window" aria-label="Rasc Home example">
        <div className="home-titlebar" aria-hidden="true"><div className="traffic-lights"><i /><i /><i /></div><span className="window-title">Rasc</span><span className="window-titlebar-spacer" /></div>
        <div className="home-toolbar"><div className="mini-brand"><BrandSymbol />Rasc</div><span className="home-toolbar__search"><Icon name="search" />Search thoughts…</span><span className="new-scratch"><Icon name="plus" /><span className="new-scratch__label">New Scratch</span></span></div>
        <div className="home-content">
          <div className="home-group">
            <h3>Kept</h3>
            <div className="home-grid home-grid--kept">{kept.map((note) => <FixtureCard key={note.id} id={note.id} />)}</div>
          </div>
          <div className="home-group">
            <h3>Today</h3>
            <div className="home-grid home-grid--unfinished">{unfinished.map((note) => <FixtureCard key={note.id} id={note.id} />)}</div>
          </div>
          <div className="home-group home-group--earlier">
            <h3>Earlier</h3>
            <div className="home-grid home-grid--unfinished">{earlier.map((note) => <FixtureCard key={note.id} id={note.id} />)}</div>
          </div>
        </div>
      </section>
      <div className={`search-shortcut${phase === 'shortcut' ? ' is-visible' : ''}`} aria-hidden="true"><Keycap>⌘P</Keycap> Search this scratchpad</div>
      <section className={`search-window${searchVisible ? ' is-visible' : ''}`} aria-label="Rasc scratchpad Search example" aria-hidden={!searchVisible} inert={!searchVisible}>
        <div className="search-window__header"><span className="home-orb"><ThinkingOrb searching reducedMotion={reduced} paused={orbsPaused || !searchVisible} label="Thinking Orb, searching" /></span><span className="visually-hidden">Find a note</span><div className="search-query" aria-label={`Search query: ${query}`}>{query}<span className={`search-caret${phase !== 'query' || query === searchQuery ? ' is-waiting' : ''}`} aria-hidden="true" /></div></div>
        <div className="search-results">
          {filtered.length ? filtered.slice(0, 3).map((note, index) => {
            const [title, ...excerpt] = note.text.split('\n');
            return <div className={`search-result${resultSelected && index === 0 ? ' is-selected' : ''}`} key={note.id}><div><span className="search-result__title">{title}</span><p>{excerpt.join(' ')}</p></div><time>{note.period}</time></div>;
          }) : <p className="search-empty">No notes found.</p>}
        </div>
        <div className="search-window__footer"><span>⌘P&nbsp; Search this scratchpad</span><span>↵&nbsp; Open</span></div>
      </section>
      <div className="search-scene-controls">
        <span aria-live="polite">{reduced ? 'Home, then Search results' : phase === 'result' ? 'A matching thought, ready to reopen' : 'Home → Search'}</span>
        <div className="demo-controls"><button className="text-button" type="button" onClick={() => clock.seek('home')} aria-pressed={phase === 'home'}>Home</button><button className="text-button" type="button" onClick={() => clock.seek('result')} aria-pressed={phase === 'result'}>Search</button>{!reduced && <button className="text-button" type="button" onClick={toggleMotion}>{motionPaused ? 'Resume' : 'Pause'}</button>}<button className="text-button replay-button" type="button" disabled={reduced} onClick={() => { setMotionPaused(false); clock.replay(); }} aria-label="Replay the Home and Search example">{reduced ? 'Static view' : 'Replay search'} <Icon name="replay" /></button></div>
      </div>
      <span className="visually-hidden">{reduced ? 'Static Home example. Choose Search to find the kept thought.' : ''}</span>
    </div>
  );
}

export function StepScene({ step, accepted, revision, onSelect, onAccept }: {
  step: ProductStep;
  accepted: boolean;
  revision: number;
  onSelect: (step: ProductStep) => void;
  onAccept: () => void;
}) {
  const rootRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const reduced = useReducedMotion();
  const pageVisible = usePageVisible();
  const chapter = stepPlayback[step];
  const clock = useScenePlayback(demoTimeline, demoDuration, visible && pageVisible, reduced, chapter.still, 'typing', captureTyping.keystrokes);
  const { seek } = clock;
  const { phase, elapsed } = clock;

  useEffect(() => {
    // Chapter selection is explicit. No scrolling-driven selection or timers
    // moving to the next chapter; each stops before another action is needed.
    const selected = stepPlayback[step];
    if (step === 'refine' && accepted) seek('accepted');
    else seek(reduced ? selected.still : selected.start, !reduced, selected.end);
  }, [accepted, reduced, revision, seek, step]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (typeof IntersectionObserver === 'undefined') { setVisible(true); return; }
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.intersectionRatio >= .2), { threshold: [0, .2] });
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  const rascVisible = isRascVisible(phase);
  const running = clock.wantsPlay && !clock.complete;
  const progress = typedLength(captureTyping.plan, elapsed - typingStart) / demoExample.rough.length;
  const accept = () => { seek('accepted'); onAccept(); };
  const status = phase === 'preview' ? 'The proposal is pending. Accept it, or keep your original.'
    : phase === 'accepted' ? 'Accepted. Keep it when you’re ready.'
    : step === 'capture' ? phase === 'idle' ? 'Captured. Ready to Refine or Keep.' : 'An empty scratchpad → your unfinished thought.'
    : step === 'keep' ? phase === 'return' ? 'Kept. Your work is still here.' : 'Keeping the thought. Back to your work.' : 'Your words, taking shape on your Mac.';

  return (
    <figure ref={rootRef} className="step-scene">
      <div className="step-stage" data-product-state={step} data-phase={phase} data-paused={!running || !visible || !pageVisible}>
        <WorkContext desktop={false} />
        <div onFocusCapture={clock.pause} aria-hidden={!rascVisible || phase === 'closing'} inert={!rascVisible || phase === 'closing'}
          className={`step-scratch-layer${rascVisible ? ' is-visible' : ''}${phase === 'closing' ? ' is-closing' : ''}`}>
          <ScratchpadWindow phase={phase} progress={progress} hero accepted={accepted} reducedMotion={reduced}
            orbPaused={!running || !visible || !pageVisible || !rascVisible || phase === 'closing'}
            onRefine={() => onSelect('refine')} onAccept={accept} onCancel={() => onSelect('capture')} onKeep={() => onSelect('keep')} />
        </div>
      </div>
      <figcaption className="step-caption visually-hidden" aria-live="polite" aria-atomic="true">{status}</figcaption>
    </figure>
  );
}
