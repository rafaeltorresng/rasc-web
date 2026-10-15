# Brand sources and current use

Brand Identity v1 in docs/BRAND-IDENTITY.md defines the approved target direction: two complementary curved forms, intentional negative space, and a subtle structural suggestion of R. That direction is approved; the production master artwork is not yet finalized.

The `source-current/` folder retains the beta.3/build 4 raster snapshot for provenance; it is historical, not a mirror of the current app. Rasc 0.1.1/build 7 exports its existing symbol through `Scripts/assets/export-brand.swift`, including dedicated 24pt Home assets. These are implementation assets, not automatically the final master brand artwork. The app repo contains no verified vector master.

## Brand Symbol and Thinking Orb

The Brand Symbol is static product identity intended to identify Rasc and support future logo/wordmark/favicon/app-icon derivation.

The Thinking Orb is a separate dynamic semantic representation of shaping/state. It appears in real interactions and must not be treated as the logo by convenience. Current app use sites:
- Scratchpad: idle/solving and Refine shaping.
- Search and Command Palette: semantic header state.
- Onboarding: welcome, practice/refine, and completion.
- Home: empty state only. The header uses the static Brand Symbol.

For capture, use the real app Orb. Do not create a replacement or claim a still Orb frame is the Brand Symbol.

## Historical snapshot inventory

- RascLogo two-form PNGs: candidate current brand source; conceptually resembles the approved two-form direction, but no approval record identifies these exact files as final masters.
- AppIcon PNGs: current platform exports. The 512 × 512 PNG is a near-white symbol on transparency, unlike the approved warm-ivory squircle with graphite symbol; it is not a verified final commercial app-icon master.
- MenuBarIcon PNGs: current template-rendered platform derivative; useful provenance and menu-bar evidence, not a web master.
- Wordmark: no separate wordmark source asset found. Current app onboarding/Home use a native text label beside the static Brand Symbol. The snapshot predates that mapping.
- Verified vector master: none found in the app repository.

See source-current/MANIFEST.md for file-level source paths, hashes, dimensions, use, and status.

## Editorial companion — October 2026

The companion is a separate editorial layer, introduced only in the
“Not every thought is a note yet” section. M3 is the working reference, M0 an
alternative, and M1 a secondary publication pose. It replaces neither the
Brand Symbol nor the product's Thinking Orb. Invariants and usage rules are in
`docs/EDITORIAL-COMPANION.md`; provenance is in `brand/companion/manifest.json`.
The integration awaits visual approval before merge/deploy. The macOS app is unchanged.
