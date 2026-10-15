export type Keystroke = Readonly<{ at: number; end: number; character: string }>;
export type TypingPlan = readonly Keystroke[];

// Scripted keystrokes, not random delays or a percentage of the string.
// Short runs vary in pace; word boundaries and punctuation leave thinking room.
/** `pace` scales delays (lower = faster). Hero demos keep the default. */
export function createTypingPlan(text: string, budget?: number, pace = 1): TypingPlan {
  let offset = 0;
  const characters = typeof Intl.Segmenter === 'function'
    ? [...new Intl.Segmenter('en', { granularity: 'grapheme' }).segment(text)]
    : Array.from(text, segment => {
      // Older browsers keep complete code points instead of failing during
      // module initialization. Modern browsers retain full grapheme shaping.
      const character = { segment, index: offset };
      offset += segment.length;
      return character;
    });
  const rhythm = [48, 63, 41, 54, 72, 46, 58];
  const seed = [...text].reduce((value, character) => (value + character.codePointAt(0)!) % rhythm.length, 0);
  let at = 170;
  let word = 0;
  const strokes = characters.map(({ segment: character, index }, position) => {
    if (position > 0) {
      const previous = characters[position - 1].segment;
      if (/\s/.test(previous)) {
        word++;
        at += 85 + ((word + seed) % 4) * 17 + (word % 4 === 0 ? 130 : 0);
      } else if (/[,.!?;:…]/.test(previous)) {
        at += 220 + ((position + seed) % 3) * 35;
      } else {
        at += rhythm[(position + word + seed) % rhythm.length];
      }
    }
    return { at, end: index + character.length, character };
  });
  const paced = strokes.map((stroke) => ({ ...stroke, at: Math.round(stroke.at * pace) }));
  const pacedEnd = paced.at(-1)?.at ?? 0;
  // Longer fixtures fit their scene without speeding up the shorter ones.
  const scale = budget && pacedEnd > budget ? budget / pacedEnd : 1;
  return paced.map((stroke) => ({ ...stroke, at: Math.round(stroke.at * scale) }));
}

export function typedLength(plan: TypingPlan, elapsed: number): number {
  let lower = 0;
  let upper = plan.length;
  while (lower < upper) {
    const middle = (lower + upper) >>> 1;
    if (plan[middle].at <= elapsed) lower = middle + 1;
    else upper = middle;
  }
  return lower ? plan[lower - 1].end : 0;
}
