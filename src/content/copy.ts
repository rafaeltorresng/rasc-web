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
      copy: 'Press ⌥\\ to bring Rasc up over your work. Jot down a thought, hit Esc, and carry on. No title or folder needed.',
    },
    {
      id: 'refine',
      label: 'Refine',
      heading: 'Same thought.\nClearer words.',
      copy: 'Press ⌘J to refine your writing on-device. No prompts or modes to choose. Review any suggestion against your original, then decide.',
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
    body: 'Closing Rasc doesn’t mean losing your thought. Browse Home or search when you need it again — whether it’s kept or still unfinished.',
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
    body: 'Write it down without leaving your work. Refine if it helps. Keep it if you want to come back. Then carry on.',
  },
} as const;
