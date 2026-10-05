# Interface icon sources — 4 October 2026

## Web interface glyphs

`src/ui/Icon.tsx` includes only these 14 Lucide SVGs: download, arrow-up-right, rotate-ccw, house, search, plus, folder, copy, arrow-up, chevron-down, square-pen, grid-2x2, panel-left, ellipsis.
Source: https://github.com/lucide-icons/lucide/tree/500620a2e8123f8d1db191538886dc0c223f69a9/icons .
Downloaded from that exact commit, then converted from SVG markup to JSX.
Geometry is unchanged. Shared 24×24 viewBox, round caps/joins, currentColor,
1.75 stroke; default displayed size 16px, with explicit 13–18px overrides.
The full ISC/Feather MIT notices are retained in `LUCIDE-LICENSE.txt` and shipped
in public/dist. No runtime icon package, remote fetch, icon font or CDN is used.

These are interface glyphs, not application identity marks. Native Wi-Fi,
Control Center and battery assets in `mac-workspace/icons/` remain intact.
Keyboard shortcut symbols remain text because they represent actual Mac keys.

## Apple Intelligence

`apple-intelligence.png` was exported through Bundle/AppKit from the native
`AppleIntelligenceIcon` asset in:
`/System/Library/ExtensionKit/Extensions/SiriPreferenceExtension.appex/Contents/Resources/Assets.car`
on macOS 26.5.1. Native size 44×44 points, exported at 96×96 pixels with alpha.
Its native color treatment is preserved; no invented gradient, redraw or glow.
The export was visually inspected before use.

Displayed at 20px beside “Apple Intelligence · On-device” in the Refine story,
and 24px beside the on-device intelligence explanation in the trust section.
It identifies the actual Apple technology used by Refine; it is not the Rasc
logo, Thinking Orb, a new app action, or an endorsement badge. Refine still uses
the deterministic public fixture; no model inference was added to the website.
The asset belongs to Apple. Technology reference:
https://developer.apple.com/apple-intelligence/ .

## Header reference

Structure and scroll behavior were adapted from the local, read-only Trecho
reference: `index.html`, `entrypoints/landing/styles.css`, `src/landing.ts` and
`tests/e2e/header-scroll.spec.ts`. Existing September 29 screenshots were viewed
for desktop and mobile. This is reference evidence, not a rendered screenshot
of the new Rasc header. Rasc keeps its identity, colors, typeface, section order,
content and direct DMG link.

## GitHub

`GitHubIcon` in `src/ui/Icon.tsx` uses the official Octicons `mark-github-16`
from commit `923a31b34542702800cb90a0fd390e2e60dd92ac`:
https://github.com/primer/octicons/blob/923a31b34542702800cb90a0fd390e2e60dd92ac/icons/mark-github-16.svg .
Geometry and 16×16 viewBox are unchanged. It is displayed at 14px with
`currentColor`, preceding the GitHub label in all shared source links.
The external-link glyph remains at a subordinate 12px. The mark is decorative
for accessibility; the link retains its text name. MIT notice is shipped in
`OCTICONS-LICENSE.txt`. No runtime package or remote asset request was added.
