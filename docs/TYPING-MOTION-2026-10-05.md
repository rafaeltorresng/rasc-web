# Typing motion review

The Hero's four stories, Capture chapter, Search query and editorial thought fragments share a deterministic keystroke rhythm. Letters arrive individually, with faster runs, longer word boundaries and brief thinking pauses. The scene clock schedules actual keystrokes instead of sampling a uniform character percentage every 60 ms.

The main typing window is 5.6 seconds. Each complete thought appears in 4.93–5.4 seconds, followed by a readable dwell before Refine. Search types `draft` in 385 ms, then settles before selecting its result. Editorial fragments write once on entry, separated by 500 ms plus the next thought's initial pause. Their complete geometry stays reserved throughout.

The caret stays solid while typing, blinks while waiting, and disappears during Refine. The empty-state hint overlays the editor, matching `rasc/Rasc/Features/Scratchpad/ScratchpadView.swift`; it stays until the first keystroke. The native app and existing demo content were not modified.

## Validation

- Build, lint and whitespace checks passed.
- StrictMode playback checks passed: four full stories, one character per scheduled keystroke, deterministic cadence, word/thinking pauses, grapheme integrity, manual Refine/Accept/Keep, pause/resume, visibility suspension and reduced motion.
- Editorial checks passed: complete accessible copy, no letter-by-letter announcements, one-time entrance and static fallbacks. Browser accessibility exposes each complete thought once.
- Rendered review: 1440 px desktop, 768 px tablet, 390 px mobile and 320 px narrow mobile. Capture text remains inside its window; no horizontal overflow observed at the checked mobile widths. Search was observed mid-query (`dra`) with a solid caret.
- Tablet editorial list height remained exactly 122.1953125 px before and after typing. All 83 visual glyphs resolved fully. A stepped 1 ms opacity animation left some glyphs hidden in the in-app browser; a near-instant linear resolve fixed the rendered result.
- Browser console: no warnings or errors at final inspection. Reduced motion was checked through playback/entrance tests and stylesheet behavior; no browser preference emulation was used.
- No new dependencies, live inference, layout animation, commits, publication or native app changes.

Review screenshots are stored at `/private/tmp/rasc-typing-review/`.
