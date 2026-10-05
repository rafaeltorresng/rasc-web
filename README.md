# Rasc Web

The React 19 + TypeScript + Vite landing for Rasc, a native Mac scratchpad for unfinished thoughts.

## Current implementation

The landing uses a compact editorial hero, a quiet light canvas, a light ChatGPT work illustration behind the real-product-derived scratchpad, deterministic Capture → Refine → preview → Accept → Keep choreography, and Home/Search retrieval scenes. The fictional Workshop conversation stays unchanged while Rasc appears and disappears; no personal chats or projects are used. The automatic hero rotates through four distinct thoughts after each 2.4-second return to work: follow-up, engineering investigation, product/design observation and personal reminder. Each cycle lasts 14.45s; the full sequence lasts 57.8s. Manual Refine stops at its pending proposal; manual Accept and Keep hold without restarting or changing examples. Explicit Resume returns control to the scripted sequence. Home/Search runs once and retains its own controls. Reduced motion uses static states and manual navigation. The public demo makes no AI calls. Every proposal is an observed production Refine output; punctuation and no-change outcomes varied between real runs.

Updated 4 October: the hero scratchpad is capped at 560px instead of 720px,
revealing more of the work context while keeping editor text at its normal size.
The platform cue reads “Native Mac app · Open source”. System indicators use
native macOS assets; the English date and local 24-hour clock update each minute,
including midnight rollover. The clock pauses while the page is hidden and
refreshes on return; it continues as a clock in reduced-motion mode.

Hero evolution on 4 October: less exposed wallpaper, stronger scratchpad
elevation at the same compact size, one caption below the scene instead of a
duplicate confirmation toast, and reserved caption height. The hero keeps its
violet heading, serif narration, neutral header CTA and orange primary CTA.
Replay, Explore the steps and the hero Download details disclosure remain
removed as requested. Current behavior and checks:
[Hero evolution](docs/HERO-EVOLUTION-2026-10-04.md).

Earlier 4 October update: [four cycles and shared Orb tint](docs/HERO-FOUR-CYCLES-2026-10-04.md).
The user's explicit request authorizes the native app Orb color change.
Violet/orange tint now matches across the native app, inline demos and editorial
Orb. State mapping, geometry, speeds, app icon and brand symbol stay intact.

Two hero cycles now show technical work: preserving input after a failed upload and
clarifying required fields in a form. The other two retain a general follow-up
and a personal reminder. Home includes the same two technical rough thoughts.
Current fixtures and selection evidence: [technical demos](docs/TECHNICAL-DEMOS-2026-10-04.md).
The weaker duplicate-event example was replaced after another production Refine
comparison: [Refine impact and compact section spacing](docs/REFINE-IMPACT-2026-10-04.md).

Following the native breathing → composing change, Scratchpad and Home demos
now use the native px20 composing ribbon at Rasc's 0.48 speed. Refine retains
shaping. The ⌘P demo uses native px20 Searching (scanning globe), at Rasc's 0.68
speed; it pauses with the scene and uses a static frame for reduced motion.
The editorial Orb keeps its separate four-state illustration loop.

Capture → Refine → Keep now uses a single chapter explorer on desktop and mobile,
with explicit accessible tabs, one stable product stage and bounded animations.
The former scroll-selected sticky scene and duplicated mobile scenes were removed.
Accept and Keep remain separate; continuing without Accept keeps the original.
Current implementation and validation: [Interaction story](docs/INTERACTION-STORY-2026-10-04.md).

`src/content/launch.ts` contains verified distribution facts. Every primary CTA directly downloads the existing beta.3 DMG from `public/downloads/`; it does not request beta access or open email. The package is Apple-silicon-only, requires macOS 14+, is ad-hoc signed, and is not notarized. Refine additionally requires macOS 26+ and Apple Intelligence. “Download details” discloses these requirements and first-launch friction.

The product repository is MIT licensed. `launch.sourcePublic` is true so the trust copy matches the hero; make the GitHub repository public before shipping so the source link works for anonymous visitors.

Current implementation and validation: [Hero implementation report](docs/HERO-IMPLEMENTATION-2026-10-03.md). Direction and references: [Hero research](docs/HERO-RESEARCH-2026-10-03.md). The [2 October review](docs/CURRENT-LANDING-REVIEW.md) preserves the previous audit and distribution evidence.

## Source hierarchy

1. Current `/Users/rafatorres/Desktop/rasc` app source for behavior, assets, visual values and actual release artifacts.
2. User-provided `RASC-CONTEXT-2026-10-02.md` for current landing, launch and commercial decisions.
3. Current landing implementation.
4. Web docs/manifests where consistent with the current context.
5. Historical documents and references.

Older statements about private-beta requests, mailto acquisition, an unimplemented landing, Maya/launch-copy fixtures, closed-paid positioning, or required screenshot-only scenes are superseded. The historical `AGENTS.MD` is preserved; the current explicit user instructions authorize this implementation work.

## Local development

```sh
npm install
npm run dev
npm run build
npm run lint
```

No environment variables or public model endpoint are required. No new dependencies were added.

## Static hosting

Production must serve the **`dist/`** folder after `npm run build`. Do not publish the repository root: `index.html` references `/src/main.tsx`, which only works with the Vite dev server.

| Setting | Value |
| --- | --- |
| Build command | `npm ci && npm run build` |
| Publish directory | `dist` |

`render.yaml` and `netlify.toml` encode these defaults. After deploy, the document should load hashed assets under `/assets/…`, not `/src/main.tsx`.

## Design sources

- Simulated Mac wallpaper: the user's verified macOS “Hello Orange”, static dark appearance from Apple's original system asset. Source/encoding details: `public/mac-workspace/ASSET-SOURCE.md`. This is environment artwork, not Rasc identity.
- Workspace menu assets: native Rasc MenuBarIcon, installed Superwhisper mark, bundled OpenAI Blossom SVG, macOS apple.logo/wifi/switch.2 symbols and ControlCenter battery outline/cap. Each preserves its source proportions inside centered status slots. Provenance and inspection limits: `public/mac-workspace/icons/ASSET-SOURCE.md`. Menu items, date and status indicators simplify on narrow scenes before the Rasc editor does. ChatGPT sidebar follows the current official desktop documentation; toolbar/composer/theme are simplified. This is not a verified copy of the user's current menu bar or installed ChatGPT UI.
- Header: one fixed surface adapted from the local Trecho reference; transparent at the top, restrained rounded surface after scrolling, with unchanged Rasc navigation/download. Interface glyphs use a small, locally included Lucide subset; Apple Intelligence uses its native colored macOS asset beside the Refine explanation. Sources/licenses: `public/icons/ASSET-SOURCE.md`. Implementation and validation limits: `docs/HEADER-ICONS-2026-10-04.md`.
- Orb: native px64 geometry displayed at 80px desktop / 64px compact below “A thought. Still taking shape.”, with the shared violet-dominant tint and orange accent. Four-state editorial loop: Breathing → Connecting → Shaping → Composing; click or keyboard activation pauses/resumes without a separate visible control. Visibility suspension and a static reduced-motion state are preserved. Inline product-scene Orbs and native `RascOrb` now use the same sRGB gradient. Palette and validation: `docs/HERO-FOUR-CYCLES-2026-10-04.md`; original geometry investigation: `docs/EDITORIAL-ORB-2026-10-04.md`.

- App accents and surfaces: `Rasc/UI/TransientSurfaceStyle.swift` and `manifests/design-tokens.md`.
- Geometry and editor: `RascSurfaceShell.swift`, `RascWindowMetrics.swift`, `ScratchpadView.swift`.
- Motion: `RascMotion.swift`, vendored `ThinkingOrbsKit` (MIT attribution retained).
- Static identity: existing `RascLogo.imageset/rasc-dark.png`. `public/brand-symbol.svg` normalizes its raster geometry bounds through an embedded alpha mask and graphite fill. It is a raster-derived delivery wrapper, not a newly drawn logo or a finalized vector master. Original raster derivatives remain untouched.
- Graphite `#29272f`, muted `#6c6870`, and the surrounding work illustration are web-only choices; native semantic text colors have no fixed app RGB.
- No canonical public site domain is documented; canonical URL metadata remains unset.

## Remaining launch gates

The owner's supplied desktop screenshot was used to assess the hero's completed/return state. New rendered visual and interaction QA remains blocked by the browser tool’s enforced access-policy verification failure. The latest composition, open-scratchpad states, mobile viewports, interactive accessibility and Lighthouse remain unverified. The required viewport/state checklist is in the review report.

Public repository availability, trusted signing/notarization, public site hosting, and rendered QA remain prerequisites to calling this launch-ready. Native Orb presentation was modified with explicit authorization and builds successfully; the hosted native tests could not launch through LaunchServices. The distributed beta.3 DMG remains the existing artifact and has not been rebuilt with the new tint. No commits, pushes, PRs, releases or deployments were created.
