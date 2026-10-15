# Rasc product tableau — 14 October 2026

## Editorial companion addition — review branch

The product-only hero and canonical `rasc-post.png` / `rasc-post@2x.png` exports
remain unchanged. Separate `rasc-post-companion.png` (1200 × 1080) and
`rasc-post-companion@2x.png` (2400 × 2160) exports add only M1 in the lower-right
negative space. No product surface is moved, reduced or covered. Pixel checks
confirmed zero changes outside the signature rectangle; source hashes and
placement are in `brand/companion/manifest.json`.

Local previews: `/?showcase=post` for the canonical composition and
`/?showcase=post&pose=m1` for the publication variant. Both remain DEV-only.
The lossless publication PNGs are separate from browser-review JPGs.
Character and application rules: `docs/EDITORIAL-COMPANION.md`.

## Decision

Use **A — Product Tableau in the main hero**. It replaces the automatically
playing work-context hero without adding a new landing section or changing the
approved section order. The Capture → Refine → Keep demonstration remains in
the existing interaction section.

Three directions were implemented and reviewed side by side before selection:

- **A, Product Tableau:** Home anchors the back of the composition, a full-sized
  scratchpad leads, and an optional Refine proposal supports it. The overlap
  makes one product scene; no device frame or competing third-party app.
- **B, Mac Context, Minimal:** a generic editorial draft establishes a quiet
  work context. It communicates interruption well, but divides attention and
  explains less of Rasc's recovery surface.
- **C, Editorial Product Spread:** a large note and separate Home, Refine and
  Search captures. Useful for editorial layouts, but the four surfaces create
  competing centers and feel less like one small utility.

Search stays out of the final hero to preserve the requested hierarchy:
scratchpad → Home → optional Refine. It still appears in the existing recovery
section and the recorded C study.

## Implementation

`src/product/ProductTableau.tsx` is the reusable composition. Native
captured pixels supply all app UI, including Home's actual brand symbol and the
current Refine comparison controls. CSS provides only placement, proportional
scaling, frame radii and restrained neutral shadows. The landing enables its
`live` variant: the existing native-derived `ThinkingOrb` renderer overlays the
editor and preview orb slots, and the editor caret blinks. The capture files
remain untouched. No new runtime dependencies, fonts or shaders were introduced.

At desktop width the note renders at approximately 730 CSS px, close to its
native 720 pt width. On mobile it uses 96% of the scene, with Home behind and a
smaller Refine view below. Essential product copy remains outside the images;
the grouped composition has an accessible description. Animation stops outside
the viewport or when the tab is hidden. With reduced motion enabled, the original
static captures render without overlays. Home's Brand Symbol stays static.
The study and post views use the default static variant.

The foreground and supporting colors reuse existing documented web mappings.
Orange and violet remain the existing action and focus colors; native semantic
foregrounds were not assigned new app tokens. The frame introduces no gradient,
glass layer, glow, rotation or laptop mockup.

Capture provenance is in `public/screenshots/tableau/README.md`. The main note
uses the upload-failure example requested by the user, replacing the initial
“maybe ask…” study text.

## Reuse and outputs

With the development server running:

- `/?showcase=studies` — all three directions.
- `/?showcase=post` — a 1200 × 1080 white composition with brand and headline.

These review/export pages are gated by `import.meta.env.DEV`, dynamically loaded,
and excluded from the production bundle. The publication master is
`rasc-post@2x.png` (2400 × 2160, lossless PNG). `rasc-post.png` supplies the
1200 × 1080 version. The existing `rasc-post.jpg` link now also points to a new
2400 × 2160 export, encoded at quality 95 with 4:4:4 color sampling.
`hero-desktop.jpg`, `mobile.jpg`, `tablet.jpg` and `directions.jpg` record the
browser review rather than publication-quality exports.

The initial browser screenshot was a heavily compressed 1200 × 1080 JPEG and
was unsuitable for publication. The replacement was rendered directly at 2×:
native system typography, the existing brand asset, original Retina product
captures, clipping and soft shadows. It was not made by enlarging the initial
JPEG. The product captures remain unchanged, and none is displayed above its
original pixel dimensions in the 2× composition. PNG dimensions, the complete
layout and text detail at 100% were checked before delivery.

**Placement recommendation:** main hero, plus the standalone post export.
Repeating the same tableau immediately below the hero would dilute its impact.

## Compact-window adjustment

The editor was recaptured at 720 × 320 pt instead of 720 × 440 pt: about 27%
less height at the same display width. Refine was recaptured at 640 × 320 pt
and expanded from 42% to 56% of the composition width, with its top moved from
56% to 52%. Its text and controls render about 50% larger, and the suggestion
wraps across two lines. All resizing happened in the native isolated capture
app; the web and export keep each image's actual proportions. Mobile Refine
also increases from 67% to 88% of the scene width.

## Validation

Build and lint passed. Browser checks at 320, 390, 768, 1024 and 1440 CSS px
found no horizontal overflow and all tableau assets loaded. Desktop, tablet and
mobile layouts were visually inspected. A production build at the real Pages
subpath is checked before delivery. No publication, commit or app-source edit.

For the live hero, build and lint passed. Browser review at 1440 and 390 CSS px
confirmed registered overlays and no mobile overflow. Consecutive orb captures
differed while running and matched while paused; the caret showed both opacity
states. Automatic offscreen pause was checked. Reduced-motion
and hidden-tab behavior are implemented but were not separately browser-tested.

The live hero's right-hand provenance caption and Pause control were removed
at the user's request.

## Lossless capture and final cursor correction

All three hero surfaces now use native Retina PNGs: Home 2000 × 1360,
scratchpad 1440 × 640, and Refine 1280 × 640. They were captured from the same
accepted build in another isolated fixture session. The post exports were
regenerated from these PNGs. The older JPEG assets remain historical captures.

The earlier opaque caret mask clipped the y and left a thin violet residue.
It is removed completely. The new note was captured while its native cursor
was invisible; its complete glyph pixels are untouched. One animated 1pt caret
is placed at source x=1330, five pixels beyond the last dark glyph pixel.
The orb-slot backgrounds match the native PNG canvas, #fbfafd.

Build and lint passed after the PNG replacement. Pixel inspection found zero
embedded violet pixels beside retry and confirmed that no caret mask remains.
An offline two-state proof verified the complete y and the single cursor.
The new post export was visually inspected. Browser review of this final
revision was blocked by the browser tool's local-URL policy; earlier browser
checks above do not verify this final asset revision.

## Publication alternative — M3

The M1 signature remains available at `?showcase=post&pose=m1`. A separate
local alternative uses `?showcase=post&pose=m3`; neither changes the canonical
showcase or hero. These preview routes are development-only.

M3 is 190px tall on the 1200 × 1080 canvas (35% taller than M1), positioned at
x=940, y=824. The silhouette moves 61px inward, and its violet fragment relates
the companion to an unfinished thought. There is 15px clearance beneath the
scratchpad, 41px beside Home, and no overlap with any native surface or footer.
The app remains at its original scale and placement.

Prefer M3 for a more expressive brand publication; keep M1 as the quieter
signature. Neither explains app behavior. At 390px feed width, M3 renders
about 62px tall versus M1's 46px; the fragment is a color cue, not readable
functional detail. Product copy still needs the accompanying post at that size.

Lossless exports: `rasc-post-companion-m3.png` (1200 × 1080) and
`rasc-post-companion-m3@2x.png` (2400 × 2160). Both composite the existing M3
master over the matching canonical PNG, with zero changed pixels outside the
character rectangle. No new pose, recoloring or generated imagery.

Comparison boards in `../companion-review/showcase-comparison-desktop.png`
and `showcase-comparison-feed.png` use the lossless exports. The 390px board is
a feed-size simulation, not a mobile landing capture. A real 1200 × 1080 browser
capture is saved as `showcase-m3-browser.jpg`. All preview images loaded; measured
window rectangles confirm no character overlap. Build and lint passed.

## Publication quality review

Browser-review JPEGs and side-by-side thumbnail boards are review artifacts,
not publication masters. Deliver the full `rasc-post-companion-m3@2x.png` or
`rasc-post-companion@2x.png` directly when judging export quality. Both are
lossless 2400 × 2160 PNGs composed from native Retina PNG captures; no JPEG
capture is enlarged to create them.

The development post preview now also loads the original transparent PNG
character masters instead of compressed WebP web derivatives. These imports
remain development-only and do not increase the production bundle. The landing
retains its responsive optimized assets.

Native-pixel detail crops of the note and Refine are in `../companion-review/`.
Export dimensions and SHA-256 hashes were checked against the source manifest;
results are in `showcase-export-quality.json`. Browser inspection confirms all
three native captures and the 832 × 1136 M3 PNG loaded. Build and lint passed.
