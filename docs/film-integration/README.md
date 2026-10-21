# Product Film — landing integration

Local review and Git consolidation, 21 October 2026. Separate website and production-tooling PRs are prepared. No merge, deployment or macOS app modification.

## Decision

Use **Minimal Film** between `OwnedMoment` and `InteractionStory`.
The manifesto already supplies the meaning; the film supplies the evidence. A further visible headline makes this passage read as three separate sections. Minimal keeps one continuous canvas, a restrained 1040 px film, and the existing features heading as the next typographic anchor.

Editorial uses the same player and media, with “See Rasc in motion.” and a small italic counterpoint. It is available for comparison, without a second implementation of playback.

The approved editorial/ambient Hero is now the default local Hero. Download and Installation help remain together; the film action has been removed. The real three-window tableau, Orb semantics, typography and the contained pigment gradients are preserved. The narrower layout becomes vertical naturally.

## Review

- Selected landing: <http://127.0.0.1:5189/>
- Side-by-side desktop/mobile captures: <http://127.0.0.1:5189/docs/film-integration/review.html>
- Integrated player: <http://127.0.0.1:5189/#product-film>

The final integration contains only Minimal and the approved Hero. Historical interactive comparison source was preserved in the local production archive; the static desktop/mobile comparison remains here. Query parameters do not enable retired controls. `docs/` remains outside Vite's production output.

## Media provenance

The public MP4 is **byte-identical** to `film/out/rasc-native-demo-complete-30fps.mp4`, the final native-harness Complete. This is not a V5/V6 study.

| Property | Verified value |
| --- | --- |
| Duration | 27.900 seconds; UI rounds to 0:28 |
| Picture | 1920 × 1080, 30 fps, H.264 |
| Sound | AAC; final softened typing |
| Size | 3,820,121 bytes |
| SHA-256 | `06193972331a6dd5454e95a077c6322591fe2c0a497ca641f3a64007cfc1225a` |
| Initial poster | Actual Complete frame at 5.55 seconds, full frame, 1920 × 1080 |
| Poster encoding | Lossless WebP, 100,128 bytes |

The in-use poster shows the full native scratchpad over the project context, with the thought fully typed. No generated or reconstructed app UI. The original closing poster is retained only as native video fallback after the user requests playback. Full-file FFmpeg decoding completed without errors.

## Playback and accessibility

- No autoplay. Before Play, the video has **no media URL**, `preload="none"`, no active controls and is excluded from the accessibility tree. The lazy poster reserves the same 16:9 geometry.
- The Play handler assigns the source and calls native `play()` inside the original user gesture, including Safari/iOS. The poster yields only on `playing`.
- Native controls provide pause, seeking, volume and fullscreen. The video receives focus when revealed. No dialog, focus trap, scroll lock, custom transport or player library.
- Completion retains the actual final brand frame and native controls. A small replay control occupies the clear right side rather than covering the tagline.
- Visible disclosure: **Illustrative demo · Refine results may vary.**
- “Read the demo” provides the essential visual narrative and identifies scripted wording/processing time. There is no spoken dialogue requiring a separate speech transcript.
- Video failure preserves the poster, direct MP4 link and written alternative. Poster failure preserves a usable Play control. A rejected play request offers retry.
- Motion preference suppresses the 180 ms poster transition. Playback itself remains a deliberate user action.

## Performance and deployment paths

Network assertions confirmed **zero MP4 requests before Play**, even after scrolling to the section. The 3.82 MB media is requested only on interaction. No Remotion, new font, player package or new dependency enters the landing.

Final build main JS: 255,576 bytes / 80,788 bytes gzip. CSS: 63,670 bytes / 13,437 bytes gzip. These are whole-site totals, not an asserted before/after delta. No field LCP/INP or new overall Lighthouse score was measured in this scoped integration.

Paths use the existing `publicUrl`/Vite base convention. The production build served on port 5190 loaded the public MP4 and poster successfully. Studies/capture sources are absent from production assets. No live GitHub Pages deployment was performed.

## Verification

After retiring experimental controls, the final production-build suite passed **94 tests**, with **two intentional lab skips** (the lab runs only in Chromium), no failures or flakes. Lint, typecheck, build and 40 unit tests also passed. `validation/consolidation-final.json` records the exact run. The more detailed runs below are the earlier integration baseline.

- Lint, TypeScript and 40 unit tests passed.
- Broad production regression: 104 passed; one Firefox assertion inspected an unsupported JS `playsInline` property. It was corrected to inspect the actual HTML attribute, then passed in the targeted run.
- Targeted functional matrix: **30 passed**, six scenarios on Chromium, Firefox, WebKit, emulated iPhone/WebKit and emulated Android/Chromium.
- Final desktop follow-up: **28 passed**, including full 27.9-second playback and the functional cases on Chromium, Firefox, WebKit and the installed Chrome channel (automated/headless).
- Slow-response follow-up: **three passed** on Chromium, WebKit and emulated iPhone. A deliberately held media response retains the poster/loading state and exactly the same frame bounds before and after playback (`validation/slow-network-final.json`).
- DEV comparison: **nine passed**, both layouts, switching/reload, six widths and automated accessibility checks on Chromium, WebKit and emulated iPhone/WebKit.
- Widths: 360, 390, 768, 1024, 1440 and 1920. No horizontal overflow; 16:9 bounds, 44+ px Play target, keyboard activation, disclosure, written alternative, loading failures, replay, reduced motion and native control availability verified.
- Automated axe checks found no violations in the film region. This is not a manual screen-reader certification.
- Existing download/installation, rapid demo transitions, motion and resilience scenarios passed in the broad regression. The film failure test also confirms Refine remains usable.
- See `validation/functional-final.json`, `visual-final.json`, `broad-regression.json` and `playback-final.json` for exact coverage. Screenshot evidence includes both variants and full landing/context views.

## Safari and playback limits

Native Safari was opened through the UI, its Play control activated, and its accessibility state reached native Pause/Mute/Fullscreen, then Replay; replay returned to Pause. However, the remote screenshots remained on the poster while playback advanced. One initial light/blank canvas recovered after raising/reloading the window. These observations do **not** certify native motion smoothness or establish the cause of the capture/compositing discrepancy.

The automated WebKit engine completed playback without a media error but reported **278 discarded frames out of 837** in the final run. Chromium, Firefox and installed Chrome each reported 837 frames and zero discards; the Chrome run was audible. This remains a real measurement requiring native visual confirmation; it is not proof that Safari users see identical drops. Browser recording and competing audible contexts were removed from the final measurement. An earlier audible run paused around ten seconds; a subsequent isolated audible Chrome run completed normally. No automatic resume workaround was added.

The initial unisolated playback pass also exposed a local Cloudflare analytics CORS error, separate from decoding. The final playback benchmark blocks that external analytics script, as the other local tests do; production analytics was not changed or newly certified.

No physical iPhone/Android, manual screen reader or actual mobile fullscreen session was available. Before publication, inspect Safari visibly in foreground: Play once through, pause/resume, seek, fullscreen, finish and replay; confirm surface color and smoothness. Collect Safari/macOS version and a screen recording if a defect is visible.

## Implementation map

- `src/page/Hero.tsx`, `Hero.css`: approved Hero, no film action.
- `LandingPage.tsx`: exact manifesto → film → features placement.
- `ProductFilm.tsx`, `ProductFilm.css`: shared inline player, states, accessible alternative and responsive composition.
- `src/main.tsx`: permanent installation entry; retired Hero/film comparison imports removed.
- `public/media/rasc-product-film-in-use.webp`: new production poster. Approved MP4 and ending poster unchanged.
- `tests/e2e/product-film.spec.ts`, `film-playback.spec.ts`, `native-film-isolation.spec.ts`: canonical browser regressions for the new integration.
- `tests/e2e/fixtures.ts`: retains a useful error message when a browser supplies an empty stack.
- Historical comparison source/tests and full raw screenshots are preserved in the external local production archive. The compact static comparison remains in this directory.

The historical modal verifier was archived with the older film studies. The current landing regressions are the E2E files above. The approved movie bytes and native app were not changed. A separate production-tooling PR consolidates the editable Remotion project, native harness and selected lossless capture assets.

## Git consolidation

Only the final Hero/Minimal implementation, compact static comparisons and selected
validation records are versioned here. Full historical screenshots, retired
comparison source and all raw film iterations are preserved in the external local
production archive. No exploration was silently deleted.

The independent film-production PR contains the editable two-cut Studio, selected
lossless source assets, isolated harness and frame/asset verification. Neither PR
requires changing the macOS repository. Both are based directly on the same current
`main`; neither requires merging the other first.

## CI host distinction found during consolidation

The first GitHub Ubuntu 24.04.5 run passed 90 cases and skipped the two lab-only
variants, but failed four WebKit media cases. The full-video observation reached
0.134 s / three decoded frames, remained unpaused with no media/runtime/network
error, and did not finish. This does not establish a React/player root cause.
The original evidence is retained in `validation/linux-webkit-first-ci.json`.

CI now runs Chromium/Firefox on pinned Ubuntu 24.04 and the **entire WebKit suite
on macOS 15**; no media assertions were relaxed or skipped. This follows
[Playwright's host/codec guidance](https://playwright.dev/docs/browsers#webkit),
which specifically recommends macOS WebKit for video testing close to Safari.
A separate plain-native-video Linux probe records the media clock, buffering,
frames and errors without React/player styling. It is explicitly an observation,
not a passing playback assertion. Its artifact keeps the Linux uncertainty visible.

Moving the test host does not claim that the Linux WebKit playback stall is fixed,
and automated macOS WebKit is still not the installed Safari app. No movie bytes
or application playback behavior changed for this CI adjustment.
