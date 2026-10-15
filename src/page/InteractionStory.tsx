import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { landingCopy } from '../content/copy';
import { StepScene } from '../product/ProductScenes';
import type { ProductStep } from '../product/timeline';
import { AppleIntelligenceIcon } from '../ui/Icon';

const shortcuts: Record<ProductStep, string> = { capture: '⌥\\', refine: '⌘J', keep: '⇧⌘K' };

function focusInView(control: HTMLButtonElement | null | undefined) {
  control?.focus({ preventScroll: true });
  // Explicit navigation must reveal keyboard focus without leaving a smooth
  // document scroll competing with the scene's visibility observer.
  control?.scrollIntoView({ block: 'nearest', behavior: 'instant' });
}

export default function InteractionStory() {
  const [step, setStep] = useState<ProductStep>('capture');
  const [accepted, setAccepted] = useState(false);
  const [revision, setRevision] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const nextButton = useRef<HTMLButtonElement>(null);
  const current = landingCopy.steps.find((item) => item.id === step)!;

  const select = (next: ProductStep) => {
    if (next !== 'keep') setAccepted(false);
    setStep(next);
    setRevision((value) => value + 1);
    focusInView(tabs.current[landingCopy.steps.findIndex((item) => item.id === next)]);
  };
  const onKey = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let next: number;
    if (event.key === 'ArrowRight') next = (index + 1) % landingCopy.steps.length;
    else if (event.key === 'ArrowLeft') next = (index + landingCopy.steps.length - 1) % landingCopy.steps.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = landingCopy.steps.length - 1;
    else return;
    event.preventDefault();
    select(landingCopy.steps[next].id);
  };
  const advance = () => {
    const next = step === 'capture' ? 'refine' : step === 'refine' ? 'keep' : 'capture';
    select(next);
  };
  const accept = () => {
    setAccepted(true);
  };
  useEffect(() => {
    // Accept removes the preview button; hand keyboard focus to the stable
    // continuation control after its label reflects the accepted state.
    if (accepted && step === 'refine') focusInView(nextButton.current);
  }, [accepted, step]);
  const nextLabel = step === 'capture' ? 'Try Refine' : step === 'refine'
    ? accepted ? 'Keep the thought' : 'Keep the original' : 'Start another thought';

  return (
    <section id="how-it-works" className="interaction-section section-pad" aria-labelledby="interaction-title">
      <div className="page-container">
        <div className="interaction-heading">
          <div><p className="eyebrow">A little room to think</p><h2 id="interaction-title">Capture. Refine. Keep.</h2></div>
          <p>Catch a thought. Shape it if you need to.<br />Then back to what you were doing.</p>
        </div>
        <div className="step-tabs" role="tablist" aria-label="Explore how Rasc works">
          {landingCopy.steps.map((item, index) => (
            <button key={item.id} ref={(node) => { tabs.current[index] = node; }} type="button" role="tab"
              id={`step-tab-${item.id}`} aria-controls="interaction-panel" aria-selected={step === item.id}
              tabIndex={step === item.id ? 0 : -1} data-step={item.id} className="step-tab"
              onClick={() => select(item.id)} onKeyDown={(event) => onKey(event, index)}>
              <span className="step-tab__number" aria-hidden="true">0{index + 1}</span>
              <span className="step-tab__label">{item.label}</span>
              <kbd className="keycap" aria-hidden="true">{shortcuts[item.id]}</kbd>
            </button>
          ))}
        </div>
        <div id="interaction-panel" className="interaction-panel" role="tabpanel" aria-labelledby={`step-tab-${step}`} data-step={step}>
          <div className="interaction-copy">
            <h3>{current.heading}</h3>
            <p>{current.copy}</p>
            <div className="interaction-note">
              {step === 'refine' ? <><span className="intelligence-attribution"><AppleIntelligenceIcon />Apple Intelligence · On-device</span><span>A proposal. You choose what changes.</span></>
                : <span>{step === 'capture' ? 'No title. No folder. No setup.' : 'Kept locally. Always within reach.'}</span>}
            </div>
          </div>
          <StepScene step={step} accepted={accepted} revision={revision} onSelect={select} onAccept={accept} />
        </div>
        <div className="interaction-footer">
          <p>Refine is optional. Capture and Keep work on their own.</p>
          <button ref={nextButton} className="interaction-next" type="button" onClick={advance}>{nextLabel}<span aria-hidden="true">→</span></button>
        </div>
      </div>
    </section>
  );
}
