import assert from 'node:assert/strict';
import { test } from 'node:test';
import { demoTimeline, demoDuration, searchTimeline, searchDuration, stepPlayback, phaseForTime, sceneMotion } from '../src/product/timeline.ts';
import { createTypingPlan, typedLength } from '../src/product/typing.ts';
import { heroExamples } from '../src/content/fixtures.ts';

test('scene clocks have a valid ordered first frame and finite stop boundaries', () => {
  for (const [frames, duration] of [[demoTimeline, demoDuration], [searchTimeline, searchDuration]]) {
    assert.equal(frames[0].at, 0);
    assert.equal(new Set(frames.map(f => f.phase)).size, frames.length);
    for (let i = 1; i < frames.length; i++) assert.ok(frames[i].at > frames[i - 1].at);
    assert.ok(duration >= frames.at(-1).at);
  }
});

test('all chapter start, still and stop phases resolve and remain inside the timeline', () => {
  for (const chapter of Object.values(stepPlayback)) {
    const frame = phase => demoTimeline.find(f => f.phase === phase);
    for (const phase of Object.values(chapter)) assert.ok(frame(phase));
    assert.ok(frame(chapter.start).at <= frame(chapter.still).at);
    assert.ok(frame(chapter.still).at <= frame(chapter.end).at);
    assert.ok(frame(chapter.end).at <= demoDuration);
  }
});

test('timeline transitions are defined on both sides of every boundary', () => {
  for (let i = 0; i < demoTimeline.length; i++) {
    const frame = demoTimeline[i];
    assert.equal(phaseForTime(frame.at), frame.phase);
    if (i) assert.equal(phaseForTime(frame.at - .001), demoTimeline[i - 1].phase);
  }
  assert.equal(phaseForTime(-1), 'context');
  assert.equal(phaseForTime(demoDuration + 1000), 'return');
});

test('typing fits Capture and holds a complete thought at the stop boundary', () => {
  for (const example of heroExamples) {
    const plan = createTypingPlan(example.rough, sceneMotion.typing - 200);
    assert.ok(plan.at(-1).at < sceneMotion.typing);
    assert.equal(typedLength(plan, -1), 0);
    assert.equal(typedLength(plan, sceneMotion.typing), example.rough.length);
    assert.equal(plan.map(stroke => stroke.character).join(''), example.rough);
  }
});

test('typing preserves grapheme clusters and empty input', () => {
  const plan = createTypingPlan('a 👩🏽‍💻 é');
  assert.ok(plan.some(stroke => stroke.character === '👩🏽‍💻'));
  assert.ok(plan.some(stroke => stroke.character === 'é'));
  assert.equal(typedLength([], 100), 0);
});

test('browsers without Intl.Segmenter retain complete code points and final text', () => {
  const original = Object.getOwnPropertyDescriptor(Intl, 'Segmenter');
  Object.defineProperty(Intl, 'Segmenter', { configurable: true, value: undefined });
  try {
    const text = 'an unfinished thought… 👋';
    const plan = createTypingPlan(text);
    assert.equal(plan.map(stroke => stroke.character).join(''), text);
    assert.equal(typedLength(plan, Infinity), text.length);
    assert.equal(plan.at(-1).character, '👋');
  } finally { Object.defineProperty(Intl, 'Segmenter', original); }
});
