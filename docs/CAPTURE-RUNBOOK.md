# Capture Runbook

Operational procedure for the approved Landing Asset Plan. All product UI shown in marketing must come from the real macOS app.

## Environment

- Source app repository: /Users/rafatorres/Desktop/rasc
- Audited source branch/commit: main / eb0884bf6d23335a750f0412b0f8eedd5b769311
- Audited version/build: 0.1.0-beta.3 (4)
- Capture build status: not visually frozen/accepted for definitive marketing capture; see manifests/capture-build.md.
- Use a separate local macOS user account. The app has no database-path override/marketing fixture mode.
- On first launch in that account, complete onboarding once, then verify the normal product surfaces open before fixture capture. Do not use onboarding as a marketing surface in this asset set.
- Set macOS appearance to Light for primary captures.
- Turn on Focus/Do Not Disturb and close unrelated apps; remove banners, notification badges, personal menus, names, paths, and account content from the frame.
- Fix display scale and resolution for the whole session. Asset plan target for hero: 2560 × 1600 or Retina equivalent near 16:10; record actual display resolution/scale in the capture manifest.
- Capture native windows at Retina quality without stretching or aggressive crops. Prefer native window shadow.
- Apple Intelligence/Foundation Models must be available for Refine shaping, preview, and hero validation.
- Apple Intelligence is not required for Capture, editing, Keep, Home, Search, or other non-Refine captures.
- Do not accelerate Refine to meet a target duration.

## Fixture setup

Use docs/CONTENT-FIXTURES.md. In the isolated account, create the nine notes:
- Kept: Launch page, Book flights, API retries.
- Unfinished: pricing idea, follow up, onboarding thought, weekend, error handling, article.

Create and Keep only the three listed kept notes. Home sorts kept notes by kept time, newest first; create/Keep API retries, then Book flights, then Launch page to get the fixture’s listed top-to-bottom order. Create the unfinished notes with Command-N between them, newest first in the intended display order; the app sorts by updated time descending. When all notes are created during one session, Home groups the unfinished notes under the current day; do not fake dates.

The hero capture later in this runbook adds and Keeps one more synthetic note. Home therefore contains ten fixture/demo notes during capture, within the approved 8–12 range; Search for launch may return both this hero note and Launch page. If the approved composition requires Today/Yesterday/Earlier sections, stop and approve a separate deterministic fixture seed process before capture.

Open Home once after fixture setup so the layout loads. Verify the Kept section and unfinished list are visible without a context menu or selected card. Search for launch and verify Launch page is returned. Reuse the same fixture DB throughout the session.

## Hero validation

Candidate input:

    ask maya if launch copy still works and send updated screenshots

Temporary corpus and results only:
- corpus root: /private/tmp/rasc-hero-corpus
- build products: /private/tmp/rasc-hero-derived
- results: /private/tmp/rasc-hero-results
- repetitions: 5

Command:

    DERIVED_DATA=/private/tmp/rasc-hero-derived Scripts/refine-eval.sh --corpus-root /private/tmp/rasc-hero-corpus --split dev --filter hero-maya-launch-copy --repetitions 5 --output /private/tmp/rasc-hero-results

The custom one-case corpus needs corpus.v1.jsonl and splits.v1.json, with the case tagged and categorized hero-maya-launch-copy. Do not edit checked-in eval corpora. See docs/HERO-REFINE-VALIDATION.md for the completed audit run.

The eval uses the production Foundation Models provider and checks repeat behavior; it does not capture or replace the real UI. Enter the same input into the actual scratchpad and invoke Refine to produce real shaping/preview/accept/Keep footage. Use only an output that is actually generated, accepted for meaning and quality, and recorded in the capture manifest. If noChange or output instability recurs, do not edit the result or prompt; choose a better supported example before final capture.

## Capture order

1. Context/hero master: neutral work app visible, Rasc closed; begin cleanly.
2. Capture state: open Rasc with the unfinished hero input.
3. Refine shaping: invoke Command-J and capture the real Orb/shaping state.
4. Refine preview: capture the actual proposal before acceptance.
5. Settled state: accept only if the real generated text is suitable; show the accepted note before Keep.
6. Keep transition: record the real 2–3 second transition through panel dismissal and return to prior work.
7. Home: show Kept plus unfinished fixture notes.
8. Search: query launch and show Launch page.
9. Optional dark Refine: only if captured during the same fixture/build session and useful.
10. Posters/derived exports: extract from the reviewed master; create web-size derivatives and reduced-motion/mobile assets without altering product UI.

Target the 8–12 second narrative, allowing a natural 12–14 seconds if needed. Do not speed up Refine.

## Deliverables and capture log

Retain the source master at source-captures/hero-demo-master.mov. Export the planned MP4, WebM, posters, storyboard frames, screenshots, and retrieval captures listed in manifests/assets.md. Record for each capture:
- app version/build, branch/commit, and capture date;
- actual display dimensions and scale;
- light/dark appearance;
- fixture identity/state;
- screenshot dimensions or video codec/fps;
- actual input and unedited Refine output;
- confirmation that personal data/notifications/debug UI are absent;
- derivative filename/size/format and relationship to source master.

## Quality checklist

- [ ] All app interfaces and Orb states are real captures, not recreated UI.
- [ ] One visually accepted app build, one fixture dataset, one display scale, and one light appearance for primary captures.
- [ ] No personal, company, customer, confidential, username, path, or notification content is visible.
- [ ] Hero text is readable at landing display size; no output is manually rewritten.
- [ ] Maya remains Maya; meaning and English are preserved; no new facts/commitments.
- [ ] Keep is shown as lifecycle completion and dismissal, never as favorite/star.
- [ ] Home/Search content is consistent; Kept and unfinished status is correct.
- [ ] Window shadow/layout are native; screenshots are not stretched.
- [ ] Shaping and Keep motion are sourced from video/frame capture.
- [ ] Web compression does not introduce perceptible blur.
- [ ] Reduced-motion sequence and dedicated mobile composition are prepared.
- [ ] Optional dark capture is genuinely dark-mode product UI, not a dark landing treatment.
- [ ] Filenames and manifests identify masters versus derivatives.
