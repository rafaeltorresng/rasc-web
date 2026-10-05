# Rasc landing implementation review — 2 October 2026

Historical implementation snapshot. The hero, playback, fixture and retrieval were revised on 3 October; see [latest implementation report](HERO-IMPLEMENTATION-2026-10-03.md) for current behavior and validation.

**Status: implementation delivered locally; launch sign-off pending.** Build, lint, distribution integrity and source-level checks pass. Rendered QA is blocked. This report does not declare visual completion.

## 1. Existing implementation

React 19.2.4, TypeScript 5.9.3 and Vite 7.2.4 already provided reusable scenes, deterministic fixtures, a central timeline, warm/light product tokens and causal Capture/Refine/Accept/Keep. The original hero used a small generic draft surface, clipped raster logo containers, an invented graphite app-icon tile, Maya/launch-copy content and mailto private-beta CTAs. Keep’s supporting scene was already dismissed instead of showing the dismissal. Search used tiny text at mobile sizes. The desktop sticky scene did not stretch through the full narrative column.

The repository arrived with the implementation mostly untracked and an existing README modification. No reset, commit, branch change or history operation was performed. All current web source/configuration and relevant brand, source, content, release and reference documentation were inspected. The baseline could not be rendered because browser access was denied before opening the local page.

## 2. Major visual decisions

Preserve the eight-part narrative; add no generic feature section. Center the introduction and give the product a wide, substantial work environment. Use system typography for the site, native monospace for scratch text and a restrained serif only in the subordinate draft/editorial aside. Strengthen section rhythm, increase readable product text, and reserve shadows for actual windows. Warm neutral desktop structure stays stable while the product performs the semantic transitions.

These decisions have been implemented but require the pending visual review to confirm composition and responsive quality.

## 3. Logo and brand

Actual app assets are raster exports; no verified vector master was found. `RascLogo.imageset/Contents.json` resolves `rasc-dark.png` for light appearance. The main silhouette bounds are approximately 316–937 × 318–938; the file has excessive transparent surround and faint outlying pixels.

The new SVG delivery wrapper embeds this exact raster as an alpha mask, bounds the main mark with a small inset, and fills it graphite. No new geometry was drawn. Header uses a 32px symbol, 23px medium-weight wordmark and 10px gap; footer uses a consistent 26px/18px lockup. The favicon uses the same symbol. The misleading app-icon-on-graphite tile was removed. Original raster sources and the existing social image remain untouched. A finalized production vector/master remains unavailable; the wrapper is explicitly a derivative.

Thinking Orb stays inside product state UI, separate from site identity. Native Home's existing Orb-plus-wordmark behavior is retained in the scene rather than redesigning the app.

## 4. Hero concept

A calm simulated Mac document, titled “Proposal draft,” remains underneath Rasc. Window controls, a subdued document menu, paper surface and warm desktop establish platform context without a dock, fake apps, confidential content or decorative wallpaper effects. The Rasc panel dominates at up to 720px with the native 720:440 default aspect ratio; mobile recomposes it instead of shrinking the whole desktop screenshot.

Work → ⌥\ → empty scratchpad → typing → ⌘J → shaping → preview → Accept → ⇧⌘K → dismissal → same work. The empty state uses actual native placeholder copy. The Mac context is a synthetic staging environment, not a claim to be a captured screenshot.

## 5. Demo choice and real Refine verification

Three candidates, three runs each, using the unchanged production Foundation Models provider and existing evaluation harness with synthetic corpus/build/output under `/private/tmp/rasc-polish`:

| Candidate | Result | Decision |
| --- | --- | --- |
| `workshop idea less slides more time trying things maybe start with one example` | Three unchanged user-visible outputs, rejected by the production no-change guard | Rejected as hero transformation |
| `team meeting idea maybe start with whats blocked then updates at the end` | One unchanged output; two differing rewrites, with uncertainty lost | Rejected |
| `follow up ask what still feels unclear before sending another draft` | Identical conservative changed output in 3/3 runs; no production rejection | Selected |

Final output, verbatim from all three selected runs:

> Follow up and ask what still feels unclear before sending another draft

This is a genuine mid-work reminder across professions. It adds capitalization and a missing conjunction without adding responsibilities, names, dates or context. The small change honestly represents conservative Refine rather than suggesting a dramatic rewrite. Three runs establish plausibility on this build, not a universal guarantee. Public copy says that Refine can suggest another edit or leave text unchanged.

Environment: product HEAD `212b3eb20f680fcf0c623c6886ef83159ebe123c`; beta.3/build 4; macOS 26.5.1; `system-language-model.default`; prompt `refine-v2-language-preference`; model availability available. The first temporary manifest attempts failed decoding or loaded zero cases; only the corrected nine-run evaluation supports these findings. Machine-readable selected run evidence is retained in `docs/landing-refine-evidence.json`.

## 6. Product Scene System

One persistent hero panel, real character-by-character text (replacing multiline clip-path reveal), fixed fixture content shared by hero and retrieval, a pending proposal distinct from acceptance, and the same underlying work after dismissal. The scene explorer can hold Invoke, Capture, Shape, Preview, Accept and Keep for inspection. Header Refine/Keep and preview Accept/Cancel support manual exploration. Keeping an unrefined thought does not silently substitute a refined result. Empty and shaping states hide unavailable actions.

Supporting Keep now shows a brief populated panel before dismissing, instead of beginning already gone. Desktop sticky visuals stretch through the whole step list; tablet/mobile use sequential narrative + scene. Home appears before Search; manual Home/Search selection, pause/resume and replay support inspection. Search retrieves the same selected hero thought using `draft`.

## 7. Thinking Orb and motion

20px inline canvas, matching native size. Source-derived shaping uses 18 dots, the circle/triangle/square paths, spread 1.45, native px20 speed 2.08, 1.4s hold/0.9s morph engine segments, and arc-length resampling from `Morph.swift`. Breathing uses native ring presets and traveling radial waves, subordinate to text. Attribution includes the MIT license.

The scripted product loop is 14.5s. Demo timing illustrates the causal sequence; it does not promise actual inference latency. Micro/content/scene/dismiss durations are centralized in `timeline.ts` and applied to CSS from `main.tsx`. The primary movements are appearance, content resolution and dismissal. No motion dependency, shader, parallax, animated background, glow or ambient identity Orb was added.

## 8. Open source / GitHub

Exact source: https://github.com/rafaeltorresng/rasc, verified from Git remote and authenticated GitHub API. The repository contains MIT `LICENSE`. GitHub returned **private** and **zero releases** on 2 October 2026.

GitHub is secondary in the desktop header, MIT/local-trust section and footer. The preview explicitly says public source publication is pending, controlled by the verified `sourcePublic: false` value. Anonymous visitors cannot inspect this repository yet. No claim that public source is available, no substitute repository, and no visibility change or release creation.

## 9. DMG / direct download

Exact existing artifact source:

`/Users/rafatorres/Desktop/rasc/build/rc/Rasc-0.1.0-beta.3.dmg`

Copied byte-for-byte to `rasc-web/public/downloads/Rasc-0.1.0-beta.3.dmg`; the direct same-origin path is `/downloads/Rasc-0.1.0-beta.3.dmg`. All three primary CTAs use `Download for Mac` and the download attribute. No URL or release was fabricated. The checksum sidecar is available beside the DMG.

- Version/build: 0.1.0-beta.3 / 4.
- Size: 4,961,433 bytes.
- SHA-256: `41094a2612d6e38c3ee94ae0d2ac529274e71a56c0282ed154e9cd8ad0045cc2`.
- Actual bundle: ARM64 only, macOS minimum 14.0, ad-hoc signature, no TeamIdentifier. Strict code-signature verification passed.
- Not Developer ID signed/notarized. The direct beta can be downloaded, but trusted first-launch experience remains a distribution gate.
- Refine requires macOS 26+ and Apple Intelligence; capture/retrieval remain independent of AI availability.

The download disclosure includes first-launch friction and checksum access. Its opening guidance follows [Apple Support](https://support.apple.com/en-ie/102445); no security setting was changed by this work. The artifact is included in the production build. This is ready for static-site hosting but has not been published and has no claimed public website URL.

## 10. Responsive implementation

Fluid page width and typography, 1100/820/600/360px composition breakpoints, 320px minimum, centered desktop product panel and reflowed compact scenes. At 820px the sticky story becomes sequential. Home becomes full-width before tablet; kept cards stack on mobile while unfinished cards retain two columns. Search aligns within the page at compact widths. Header collapses to identity + download; GitHub remains in trust/footer. Long text wraps, metadata becomes compact, and scene controls remain available.

**Not visually verified:** 1440, 1366, 1024, 768, 390 and 320px. CSS reasoning is not a substitute for screenshots or overflow measurements.

## 11. Accessibility / reduced motion

Skip link, semantic section landmarks, keyboard-operable links/buttons/disclosures, visible violet focus rings, labeled scene controls, pressed-state semantics, and aria-hidden/inert dismissed hero layer. The hero pauses when keyboard focus enters. Both automatic demos have pause/replay controls. Hidden-page/offscreen observers suspend autoplay and canvas animation work. Reduced motion removes transitions/type animation, starts from a static captured thought and provides manual state selection; Home/Search is manually selectable without motion. No live model inference.

Computed contrast: white on #C74A14 = 4.75:1; #6C6870 on #FBFAFD = 5.24:1. These are targeted token checks, not a complete accessibility audit. Browser keyboard, focus retention through manual state changes, screen-reader behavior and complete contrast/zoom checks remain pending.

## 12. Performance

No new dependencies, external fonts, video, model calls, analytics or remote image calls. The unchanged React runtime is the bulk of JS. Scene updates are state-driven; frequent updates are limited to typing. Orb canvas uses capped 2× DPR and stops offscreen/when hidden or paused. The brand SVG embeds its raster source (~328KB raw, cached and reused) to preserve known geometry; a future approved vector master can reduce this. The 4.7MiB DMG is fetched only on download.

Latest production build: JS ~226KB raw/~71KB gzip; CSS ~27KB raw/~6.7KB gzip. No Lighthouse, browser memory/frame-rate or Core Web Vitals measurements were performed.

## 13. Validation

Passed:

- Production TypeScript + Vite build.
- ESLint.
- Three observed selected Refine outputs from the unchanged provider.
- Source-level causal timeline and Home-before-Search assertions.
- Unique matching retrieval fixture and shared hero/refinement text.
- React server-render checks in normal and reduced-motion initial modes: direct CTAs, compatibility and pending-source disclosures, skip link, initial phases and fixture visibility.
- Original, copied, locally HTTP-served and build-included DMG checksum identity.
- `hdiutil verify`: disk-image checksum valid.
- `codesign --verify --deep --strict`: existing bundled app signature valid (ad-hoc, not notarized).
- Product Git status remained clean after inspection and temporary evaluation.

Blocked:

The browser tool repeatedly failed before access, including a retry after filesystem access was enabled: “The admin-enforced policy could not be verified, so access was not granted.” No alternate browser/control path was used to bypass this. There are no baseline or final browser screenshots.

Pending rendered QA must cover all requested widths; hero idle/Invoke/Capture/shaping/preview/Accept/Keep; Home/Search; header/favicon/footer; hover/focus; reduced motion; overflow; readable editor text; shadows; sticky sequencing; keyboard interaction; console/network health. This remains required before visual and launch sign-off.

## 14. Materially changed files

- `src/page/LandingPage.tsx`: composition, narrative, trust, direct conversion.
- `src/page/Brand.tsx`: reusable identity, download/source links and release disclosure.
- `src/product/ProductScenes.tsx`: Mac context, real typing, manual states, Keep transition and retrieval controls.
- `src/product/ThinkingOrb.tsx`: source-derived shaping cycle/resampling and ring geometry.
- `src/product/timeline.ts`: centralized 14.5s timing and shared search query.
- `src/content/fixtures.ts`: observed follow-up transformation and broad synthetic thought history.
- `src/content/launch.ts`: actual package/source facts.
- `src/styles.css`: centralized light theme, native window depth, typography, rhythm, responsive composition and reduced motion.
- `src/main.tsx`: shared motion values applied to CSS.
- `index.html`: normalized symbol favicon.
- `public/brand-symbol.svg`: raster-derived monochrome delivery wrapper.
- `public/downloads/Rasc-0.1.0-beta.3.dmg` and `.sha256`: exact existing artifact and sidecar.
- `.env.example`, `README.md`, this report, and Refine evidence.
- Removed `src/content/beta.ts`, the obsolete mailto acquisition adapter.

## 15. Remaining blockers and explicit source statement

1. **Browser access / rendered QA:** required before declaring this polished or launch-ready. Build/lint passes do not resolve it.
2. **Public GitHub:** currently private; opening the repository is an external access change and was not authorized/performed. Its source publication must precede claiming publicly inspectable open source.
3. **Trusted package:** existing DMG is ad-hoc signed. Developer ID signing and notarization are needed for a low-friction public launch; the native app was not rebuilt or modified for distribution.
4. **Hosting/domain:** no site publication was requested/performed; there is no publicly reachable landing/download claimed here.
5. **Brand master:** no verified vector/editable identity master exists in the inspected sources. The current wrapper improves usage of the actual raster geometry; it does not close master approval.

**`rasc` was not modified.** Read-only product HEAD and clean Git status were verified. Temporary evaluation builds/corpora/results stayed under `/private/tmp`. Product source, prompts, fixtures, stored notes, assets and release binaries were not changed. No commits, pushes, PRs, visibility changes, GitHub releases or deployments were made.

Actual source values used: action #D5511B, filled action #C74A14, violet #7564D8, canvas #FBFAFD, raised #F7F4FA, border #E2DDE7; 20px Orb; 720×440 scratchpad; 16pt monospaced native editor; 14px preview radius; actual native placeholder/preview/shortcut/Keep behavior; `RascLogo.imageset/rasc-dark.png`; vendored Morph/Strands/Core/OrbSpec; beta.3 ARM64 bundle and DMG; MIT LICENSE and verified Git remote/API state.

Superseded docs ignored where conflicting: documentation-only repository state, private-beta/waitlist/mailto funnel, Maya fixture, beta.2 as latest artifact, screenshot-only presentation requirement, closed-paid commercial ordering, and any old global cloud-fallback language. Current product implementation plus `RASC-CONTEXT-2026-10-02.md` and the explicit user request took precedence.
