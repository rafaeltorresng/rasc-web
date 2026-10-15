# Inventory and diagnostic plan — 2026-10-15

Baseline: origin/main 089363a, isolated branch rafa/website-reliability-audit. No production mutations.

| Surface | State owners / resources | Critical paths | Existing coverage |
| --- | --- | --- | --- |
| Hero tableau | ProductTableau; ThinkingOrb; IntersectionObserver; visibility; reduced-motion; RAF | initial images, resize, background/return, offscreen pause | none |
| Capture/Refine/Keep | InteractionStory selection/accepted/revision; StepScene; useScenePlayback elapsed/time/stopAt/pending | primary advance, repeat tab, keyboard, accept/cancel/keep, rapid interruption | none |
| Home/Search | HomeSearchScene; finite searchTimeline; motionPaused; typing | manual Home/Search, pause/resume/replay, focus, visibility | none |
| Editorial | EditorialEntrance; one-shot observer; CSS text reveal; companion image srcset | viewport entry, reduced preference change, image failure | none |
| Header | scroll RAF/listeners; anchor navigation | fixed header, skip link, requirements anchor | none |
| Download | shared platform classifier; direct release anchors; modal context | compatible/incompatible/unknown, modified click, image decode | 32 platform unit cases |
| Installation | native dialog; scroll lock; close event; four images | first/last/rapid step, Escape/backdrop/reopen, focus return, image failure | manual prior report only |
| SEO/build | Vite canonical/discovery generation; static assets; development routes | HTTP redirects, discovery, missing routes/assets, bundle exclusions | 2 discovery unit tests |

Priority investigation: reproduce the white-screen report on the unchanged production build before applying scene fixes. Collect browser pageerror, console, request failures, visible scene/content snapshots and trace on failure. Distinguish blank page from intentional Capture opening/Keep return. Exercise rapid input, timer boundaries, focus, background/scroll and preference changes.

Test layers: source unit tests; production-build Playwright regression (Chromium/Firefox/WebKit engines on macOS, mobile emulation); browser visual review. Windows/Android/iOS physical devices, Safari hardware graphics and screen-reader coverage must not be implied by engine emulation.
