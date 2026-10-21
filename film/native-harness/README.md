# Native film harness

A scripted provider response, rendered by the real Rasc UI. **Not a model result.**

The original native repository is read-only for this workflow. `build.py` snapshots its app, tests, Xcode project and vendored ThinkingOrbsKit into a dedicated temporary directory. It overlays the existing `AppBootstrap` provider/repository construction and app startup, appending `FilmDemo.swift` to an already compiled file; it does not duplicate any window, view, Thinking Orb or Preview implementation.

## Reproduce

From the `rasc-web` root, on the Retina Mac with Xcode, Screen Recording and Accessibility already authorized:

```sh
python3 film/native-harness/build.py --native /Users/rafatorres/Desktop/rasc --run /private/tmp/rasc-film-harness-NEW-RUN
open -na /private/tmp/rasc-film-harness-NEW-RUN/RascFilmDemo.app --args --film-config /private/tmp/rasc-film-harness-NEW-RUN/scenario.json
python3 film/native-harness/capture-flow.py --run /private/tmp/rasc-film-harness-NEW-RUN --out /absolute/path/to/new-capture-output
```

Use a **new run directory and new capture output** for a new full take. No automatic database deletion, import or production-store reset exists. Place the scratchpad on the same real Retina screen as the captured run (800×360 pt at x400/y1250; Home 1140×560 pt at x470/y1120). Adapt the window-placement helpers for a different monitor arrangement; do not compensate for a 1× capture by upscaling. The recorder fails if the native window is below 2×. Tools refuse any process/window outside the exact demo bundle ID.

To re-edit the current captured material, `prepare-native-demo.py` uses `film/sources/native-demo`, creates the selected source manifest and generated Remotion tracks, and preserves the untouched raw captures. Run it with the Python environment containing Pillow and NumPy, then run `sound-native-demo.py` and `render-native-demo.sh` from `film/`. Source timing is recorded in `edit-timing.json`; frame-driven Remotion playback keeps the actual Refining footage at 1×. All scripts and current fixture configuration are local files; there is no runtime network dependency for the scripted Refine.

## Isolation and compile boundary

- Explicit **Debug + RASC_FILM_DEMO** build only. A demo flag without DEBUG is a compile error.
- Dedicated bundle ID `com.rafaeltorres.rasc.filmdemo20261020`; separate standard preferences. Test bundle has a separate `.tests` ID.
- Configuration file must resolve to a direct child directory of canonical `/private/tmp`, named `rasc-film-harness-*`, with the exact `.demo-only` marker.
- Database location is fixed to that directory's `store/notes.sqlite`. Store symlink escape is rejected. No default-database fallback or personal-note read/import occurs in the demo bootstrap.
- Synthetic Home notes are seeded through the native repository's create/keep operations. The demonstrated note is typed, accepted, kept and retrieved through the actual app.
- Provider accepts only the configured original whole note. Other inputs fail; no Foundation Models or cloud fallback runs in this flow. Metadata says `illustrative-film-demo` / `scripted-no-inference`.
- Global shortcut registration is disabled **in the snapshot only**, to avoid stealing shortcuts from the installed app. Capture and Home are invoked through real menu actions. Film key graphics display the verified production defaults; they are editorial cues, not a claim that physical key events were recorded.
- Public native sources are unchanged. A Release build of the snapshot **without the flag** compiled successfully and contained none of the scripted-provider/CLI marker strings. This Release artifact was inspected only, never launched.
- Three added tests run in the staged test source only: native Preview retains Original before explicit acceptance, unexpected input is rejected, cancellation cannot publish a late Preview. Existing session/contract suite: 92 tests passed.

The configuration sets a 2.4-second **illustrative provider wait**. Captured state plus native transitions occupies 2.8 seconds in this cut. Neither value is a measured or promised Foundation Models latency. The Thinking Orb's implementation and animation rate are unchanged.

## Publication boundary

Always keep **“Illustrative demo · Refine results may vary.”** visible adjacent to the player. The separate website integration uses the approved public export and disclosure. The harness and scripted provider remain development tooling; neither is included in the website JavaScript or public app binary. Publishing/merging is a separate approval.


No external music samples: the inherited procedural UI sound design is synthesized locally and resynchronized to this cut. The Short remains unchanged because this work improves the Complete's Refine/Home story only.

## Existing native Search transition

The initial Home → query switch briefly shows the native empty-results state before the first debounced search returns (about 0.16 s in the selected capture). A faster query take was also captured and inspected; it increased this interval, so it was not selected. Neither take was painted or filtered to hide the state. The selected original capture remains at native playback speed; no Home/Search code was changed. This is a native app polish opportunity, distinct from the scripted Refine provider and from a video rendering flash.

## Native text transitions in the final edit

The continuous proof preserves SwiftUI's original text crossfades, including their momentary overlap. The composed film trims those overlapping intervals at Preview, comparison and Accept/Keep boundaries, cutting only between actual captured native states. No text is redrawn or painted over. The Refine clip itself is uninterrupted and plays at 1×, including brief native pre-command context; the configured 2.4-second wait/official Orb is not slowed, looped or frozen.

For build/test isolation verification, quit only the demo fixture, then run `python3 film/native-harness/verify.py --run /private/tmp/rasc-film-harness-NEW-RUN --native /Users/rafatorres/Desktop/rasc`. It tests the staged app and inspects a Release build without launching that Release artifact. Capture attempts are marked; use a fresh run directory after either a completed take or a failed attempt.

## Short-note polish (current Complete)

The scenario now uses the 83-character “cover feels too perfect…” thought and the supplied scripted suggestion. A paragraph break between its two sentences preserves the exact words while giving the native Home a clean title/body structure. Capture is approximately 2.7 seconds; the Complete is 27.9 seconds. The provider wait remains 2.4 seconds and uninterrupted processing footage remains 2.8 seconds at 1×.

Home is captured at 1140×560 pt / 2280×1120 px. This width keeps the actual search-card text readable without native line-limit ellipses. All four native alpha corners remain in frame; no top/right/bottom UI crop is applied. `caretEnd` sets the actual editor focus and UTF-16 selected-text range to the content length, then the capture verifies that range before recording retrieval. The public app is unchanged.

The current capture includes a separate Home pickup after testing narrower window sizes. Only the final Home take is selected. Fresh full captures use the final geometry directly. Result-card activation matches the first-line native accessibility title so the paragraph break does not break automation.

## Native traffic lights during Home recording

On this macOS version a desktop-independent window stream inserts the system sharing indicator over the Home title-bar buttons. The Home capture therefore uses `record --display-region`: a display stream cropped at capture time to the fixture’s exact bounds, wholly on the Retina display. The window is placed at x180/y1120 for this take. Only the window’s native alpha contour, obtained by a non-streaming window screenshot, is reapplied to remove pixels outside its rounded shape. No controls, title-bar pixels or app text are repainted. Capture fails if the fixture loses foreground, moves, is occluded or leaves the display. All other app captures retain window isolation. The resulting PNGs contain the actual red/yellow/green controls, checked in every selected Home frame.
