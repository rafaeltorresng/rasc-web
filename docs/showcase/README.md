# Rasc product tableau — 14 October 2026

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

`src/product/ProductTableau.tsx` is the reusable static composition. Native
captured pixels supply all app UI, including Home's actual brand symbol and the
current Refine comparison controls. CSS provides only placement, proportional
scaling, frame radii and restrained neutral shadows. No new runtime dependencies,
fonts, shaders or animation timers were introduced.

At desktop width the note renders at approximately 730 CSS px, close to its
native 720 pt width. On mobile it uses 96% of the scene, with Home behind and a
smaller Refine view below. Essential product copy remains outside the images;
the grouped composition has an accessible description and a visible provenance
caption. The static hero needs no special reduced-motion behavior.

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
