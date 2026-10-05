export const landingCopy = {
  hero: {
    eyebrow: 'Rasc for Mac',
    title: 'A scratchpad for unfinished thoughts.',
    description: 'A thought comes up.\nRasc appears.\nYou carry on.',
    demoCaption: 'Capture a thought. Carry on.',
    trust: 'Native Mac app · No Rasc account required · Notes stay local',
    compatibility: 'Apple Intelligence is required for Refine only. The rest of Rasc does not.',
  },
  pause: {
    title: 'Not every thought is a note yet.',
    intro: 'Ideas arrive half-formed.',
    thoughts: [
      ['maybe ask', 'what’s still', 'unclear…'],
      ['remember to', 'bring this', 'up…'],
      ['that sentence', 'still isn’t', 'right…'],
    ],
    statement: {
      capture: 'Worth capturing.',
      organize: 'Not worth organizing.',
      yet: 'Yet.',
    },
    close: 'Rasc gives them somewhere to land. Decide what they become later.',
  },
  steps: [
    {
      id: 'capture',
      label: 'Capture',
      heading: 'Catch it\nwhile it’s here.',
      copy: 'Press ⌥\\ and start writing. There’s nothing to name or organize first. Just a little room for the thought.',
    },
    {
      id: 'refine',
      label: 'Refine',
      heading: 'Same thought.\nClearer words.',
      copy: 'Press ⌘J when the wording needs work. Rasc offers an edit on your Mac. Accept it, or keep your original.',
    },
    {
      id: 'keep',
      label: 'Keep',
      heading: 'Leave it here.\nCarry on.',
      copy: 'Press ⇧⌘K to keep the thought and dismiss Rasc. It stays in Home, ready when you need it.',
    },
  ],
  system: {
    title: 'A scratchpad, not another system.',
    promises: [
      { lead: 'No folders', rest: 'to set up.' },
      { lead: 'No prompt', rest: 'to write.' },
      { lead: 'No account', rest: 'to maintain.' },
    ],
    close: 'No need to decide where a thought belongs before you’ve even finished thinking it.',
  },
  retrieval: {
    title: 'Pick it up later.',
    body: 'The thought you just kept is still here. Open Home to pick it up, or Search when you know what you’re looking for. Unfinished thoughts stay within reach, too.',
  },
  trust: {
    title: 'Your thoughts stay on your Mac.',
    body: 'Notes are stored locally. Refine runs with Apple Foundation Models on-device. No cloud AI. No Rasc account required.',
    items: [
      ['Native macOS', 'Built as a real Mac app.'],
      ['On-device Refine', 'Apple Foundation Models run on your Mac.'],
      ['No account required', 'Use Rasc without creating an account.'],
    ],
    compatibility: 'Apple Intelligence is required for Refine only. Capture, Keep, Home, Search and the rest of Rasc remain available without it.',
  },
  closing: {
    title: 'Give unfinished thoughts somewhere to land.',
    body: 'Capture them before they become notes. Shape them when they need it. Keep only what matters.',
  },
} as const;
