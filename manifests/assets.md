# Landing Asset Manifest

Planned inventory transcribed from docs/ASSET-PLAN.md. This is a plan/status ledger, not a claim that landing captures exist. Existing implementation files copied for provenance are listed as current source assets. App captures are pending, and brand derivatives are blocked by production brand closure.

| Filename | Category | Source | Required? | Current status | Expected source build | Appearance | Master format | Web format | Notes |
|---|---|---|---|---|---|---|---|---|---|
| source-captures/hero-demo-master.mov | Hero master | Real macOS capture | Yes | Pending capture; hero example validation unstable | Freeze after visual acceptance | Light | ProRes 422 or high-quality HEVC, 2560×1600 or Retina 16:10, 30 fps | N/A | Do not accelerate Refine. |
| hero/rasc-hero-demo-light.mp4 | Hero | Derived from hero master | Yes | Pending capture/export | Same accepted build | Light | Source MOV above | H.264 MP4 | 8–12 seconds target; natural 12–14 acceptable. |
| hero/rasc-hero-demo-light.webm | Hero | Derived from hero master | Yes | Pending export | Same accepted build | Light | Source MOV above | WebM VP9/AV1 | Muted, no audio. |
| hero/rasc-hero-poster.webp | Hero poster | Frame from real capture | Yes | Pending capture/export | Same accepted build | Light | Retina source frame | WebP | Initial load/mobile. |
| hero/rasc-hero-poster@2x.webp | Hero poster | Frame from real capture | Yes | Pending capture/export | Same accepted build | Light | Retina source frame | WebP 2x | Do not upscale a smaller source. |
| hero/rasc-hero-poster.jpg | Hero poster | Frame from real capture | Yes | Pending export | Same accepted build | Light | Source frame | JPEG | Simple fallback. |
| hero/frame-01-context.webp | Storyboard | Hero master | Yes | Pending capture | Same accepted build | Light | Retina frame | WebP 2x | Other app visible; Rasc closed. |
| hero/frame-02-capture.webp | Storyboard | Hero master | Yes | Pending capture | Same accepted build | Light | Retina frame | WebP 2x | Scratchpad with unfinished thought. |
| hero/frame-03-refining.webp | Storyboard | Hero master | Yes | Pending capture | Same accepted build | Light | Retina frame | WebP 2x | Real shaping state. |
| hero/frame-04-preview.webp | Storyboard | Hero master | Yes | Pending capture | Same accepted build | Light | Retina frame | WebP 2x | Real Refine preview. |
| hero/frame-05-settled.webp | Storyboard | Hero master | Yes | Pending capture | Same accepted build | Light | Retina frame | WebP 2x | Accepted result before Keep. |
| hero/frame-06-return.webp | Storyboard | Hero master | Yes | Pending capture | Same accepted build | Light | Retina frame | WebP 2x | Rasc closed; prior work visible. |
| interaction/capture-light.webp | Capture | Real app | Yes | Pending capture | Same accepted build | Light | Native NSPanel screenshot, Retina | WebP 2x | Editor focused; unfinished hero thought; no overlays/palette. |
| interaction/capture-empty-light.webp | Capture alternate | Real app | Optional | Optional / pending | Same accepted build | Light | Native NSPanel screenshot | WebP | Empty scratch placeholder. |
| interaction/refine-shaping-light.webp | Refine | Real app/video frame | Yes | Pending capture | Same accepted build; Apple Intelligence available | Light | Real shaping frame | WebP 2x | Original thought and Orb; no fabricated output. |
| interaction/refine-preview-light.webp | Refine | Real app | Yes | Pending capture; hero example unstable | Same accepted build; Apple Intelligence available | Light | Native app screenshot | WebP 2x | Input/output and user control visible; record raw output. |
| interaction/keep-transition.mp4 | Keep | Real app video | Yes | Pending capture | Same accepted build | Light | Clip from master | H.264 MP4 | 2–3 seconds; real dismissal/focus return. |
| interaction/keep-poster.webp | Keep poster | Frame before Keep | Yes | Pending capture | Same accepted build | Light | Retina frame | WebP | Settled note; no invented checkmark UI. |
| retrieval/home-light@2x.webp | Retrieval | Real Home window | Yes | Pending capture | Same accepted build + fixture | Light | Native window screenshot, ≥2000×1360 target | WebP 2x | Kept and temporal unfinished sections as naturally available. |
| retrieval/home-light.webp | Retrieval | Derived from Home master | Yes | Pending export | Same accepted build + fixture | Light | Home master | WebP 1x | Do not stretch. |
| retrieval/search-light@2x.webp | Retrieval | Real Search UI | Yes | Pending capture | Same accepted build + fixture | Light | Native scratchpad screenshot | WebP 2x | Query launch; Launch page visible. |
| retrieval/search-light.webp | Retrieval | Derived from Search master | Yes | Pending export | Same accepted build + fixture | Light | Search master | WebP 1x | Search UI stays real capture. |
| interaction/refine-preview-dark.webp | Refine | Real app | Optional | Optional / pending | Same accepted build; Apple Intelligence available | Dark | Native app screenshot | WebP 2x | Only if useful; optional in v1. |
| retrieval/home-dark.webp | Retrieval | Real Home window | Optional | Optional / pending | Same accepted build + fixture | Dark | Native window screenshot | WebP 2x | Capture only if trivial in same session. |
| brand/rasc-wordmark.svg | Brand | Final brand master | Yes | Blocked by brand closure | N/A | Graphite | Verified vector | SVG | No separate wordmark master found. |
| brand/rasc-wordmark-white.svg | Brand | Final brand master | Optional | Blocked by brand closure | N/A | Reversed | Verified vector | SVG | Only if future dark surfaces need it. |
| brand/rasc-symbol.svg | Brand | Final brand master | Yes | Blocked by brand closure | N/A | Graphite | Verified vector | SVG | Existing PNG is a candidate source, not final master. |
| brand/rasc-symbol-graphite.svg | Brand variant | Final brand master | Conditional | Blocked by brand closure | N/A | Graphite | Verified vector | SVG | Only if distinct from canonical SVG. |
| brand/rasc-symbol-white.svg | Brand variant | Final brand master | Conditional | Blocked by brand closure | N/A | Reversed | Verified vector | SVG | Only if required by final identity. |
| brand/rasc-app-icon-1024.png | Brand/app icon | Official app master | Yes | Blocked by brand closure | Accepted icon build | N/A | Official master 1024×1024 | PNG | Do not recreate from a web logo. |
| brand/rasc-app-icon-512.png | App icon derivative | Official app master | Yes | Pending derivative after master | Accepted icon build | N/A | Official master | PNG 512×512 | |
| brand/rasc-app-icon-256.png | App icon derivative | Official app master | Yes | Pending derivative after master | Accepted icon build | N/A | Official master | PNG 256×256 | |
| brand/rasc-app-icon-128.png | App icon derivative | Official app master | Yes | Pending derivative after master | Accepted icon build | N/A | Official master | PNG 128×128 | |
| brand/favicon.svg | Brand metadata | Final brand master | Yes | Blocked by brand closure | N/A | Graphite | Verified vector | SVG | |
| brand/og-image.png | Social metadata | Approved brand + real product capture | Yes | Blocked by brand closure and captures | Accepted brand/capture | Light | 1200×630 composition | PNG | Warm canvas, wordmark/symbol, canonical line, legible real product image. |
| posters/hero-reduced-motion.webp | Reduced motion | Real capture frame | Yes | Pending capture | Same accepted build | Light | Retina frame | WebP | Static capture poster. |
| posters/hero-sequence-01.webp | Reduced motion | Real capture frame | Yes | Pending capture | Same accepted build | Light | Retina frame | WebP | Capture. |
| posters/hero-sequence-02.webp | Reduced motion | Real capture frame | Yes | Pending capture | Same accepted build | Light | Retina frame | WebP | Refine preview. |
| posters/hero-sequence-03.webp | Reduced motion | Real capture frame | Yes | Pending capture | Same accepted build | Light | Retina frame | WebP | Settled. |
| posters/hero-mobile.webp | Responsive hero | Dedicated real capture composition | Yes | Pending capture | Same accepted build | Light | About 1200×1500 | WebP | Dedicated mobile composition; do not center-crop desktop video. |
| Shortcut overlays ⌥\\, ⌘J, ⇧⌘K | Site-native overlay | Text constructed in site | Yes | Not applicable as source asset | N/A | Light | N/A | HTML/text | Keep overlays out of video. No landing implementation in this repo yet. |
| Trust/compatibility copy | Site copy | Approved docs/ASSET-PLAN.md | Yes | Copy spec available | N/A | N/A | N/A | Text | No separate image asset specified. |
| app-capture source masters | Source captures | Real app | Yes | Pending capture | Same accepted build | Light; optional dark | Retina stills / source recording | N/A | Preserve uncompressed originals under source-captures/. |

## Existing app source assets copied for provenance

Full SHA-256 list and source mappings are in brand/source-current/MANIFEST.md. The originals came from app source main at eb0884bf6d23335a750f0412b0f8eedd5b769311 (version/build 0.1.0-beta.3/4). These are current implementation sources/derivatives, not final web exports.

| Filename group | Category | Source | Required? | Current status | Appearance | Master format | Web format | Notes |
|---|---|---|---|---|---|---|---|---|
| brand/source-current/RascLogo.imageset/* | Brand symbol | App asset catalog | Provenance only | Candidate brand source; not suitable to call final web master | Appearance-specific | PNG plus catalog metadata | None | Two 1254×1254 rasters. |
| brand/source-current/AppIcon.appiconset/* | App icon | App asset catalog | Provenance only | Current implementation exports; brand closure pending | Platform set | PNG plus catalog metadata | None | Ten platform-size exports; 512 × 512 image inspected as near-white mark on transparent background, not the approved warm-ivory/graphite icon direction. |
| brand/source-current/MenuBarIcon.imageset/* | Menu bar | App asset catalog | Provenance only | Platform derivative | Template rendering | PNG plus catalog metadata | None | 32×32 1x and 2x exports. |
