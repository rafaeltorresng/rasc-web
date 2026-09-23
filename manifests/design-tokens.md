# Design Tokens — Extracted from macOS App

Source of truth: Rasc/UI/TransientSurfaceStyle.swift, with layout/radii in Rasc/UI/RascSurfaceShell.swift and component shadow details in Rasc/UI/ShortcutKeycapView.swift and Rasc/Features/Home/HomeView.swift. Values describe the audited app implementation, not a web theme frozen by this file.

sRGB values below are exact decimal implementation values. Hex is the nearest 8-bit sRGB translation for web handoff. Native semantic colors remain semantic.

| Token | Source / exact implementation | Light sRGB / translation | Web recommendation | Caveat |
|---|---|---|---|---|
| Action orange | TransientSurfaceStyle.swift: lightActionAccent = (0.835, 0.318, 0.106, 1) | #D5511B | Use for primary action accents. | Dark mode has a different adaptive value. |
| Filled action orange | lightActionAccentFill = (0.780, 0.290, 0.080, 1) | #C74A14 | Use for filled primary CTA with white label. | Separate, darker contrast token; do not collapse into action orange. |
| State/focus violet | lightViolet = (0.459, 0.392, 0.847, 1) | #7564D8 | Use for state, focus, selection, and restrained identity details. | App code uses opacity overlays for states. |
| Primary warm canvas | warmBackground = (0.984, 0.980, 0.992, 1) | #FBFAFD | Main warm/light page and app canvas starting point. | It is a cool-leaning near-white, not the earlier approximate #F7F4EE in the commercial spec. App value wins for factual reproduction. |
| Raised warm surface | lightElevated = (0.969, 0.957, 0.980, 1) | #F7F4FA | Elevated app surface, where a solid web equivalent is needed. | Home cards are separately pure white. |
| Hairline/border | lightBorder = (0.886, 0.867, 0.906, 1) | #E2DDE7 | Low-contrast border. | App applies local opacity such as 0.72 and 0.62. |
| Primary text | SwiftUI .primary | Native adaptive semantic foreground. | Use the system foreground relationship; if a fixed CSS color is required, make and document a web-only decision. | App defines no graphite RGB token. Do not invent one. |
| Muted/support text | RascSurfacePalette.homeSupportingText: Color.primary.opacity(0.54) in light mode; homeSectionLabel uses .primary.opacity(0.58). Other views also use .secondary/.tertiary. | Native foreground at local opacity, not a fixed RGB. | Preserve contrast hierarchy with a documented web-only semantic color/opacity choice. | No single canonical muted token. Onboarding uses 0.58 and 0.64; scratchpad placeholder uses .primary at 0.38. |
| Raised/subtle fill | subtleFill: black at 0.035 over light; innerHighlight: white at 0.72 | Alpha overlays | Use only as composited UI treatment where needed. | Context/background changes resulting color. |
| Selection fill | violet at 0.13; Home card at 0.035 | #7564D8 at stated opacity | Keep selection quiet; preserve distinction between list selection and Home card selection. | Different surfaces intentionally use different alpha. |
| Selection stroke | violet at 0.34; Home selection stroke at 0.38 | #7564D8 at stated opacity | Border-forward selection; do not replace with saturated full plate. | Increased contrast mode further changes borders. |
| Focused field border | violet at 0.44 | #7564D8 at 44% | Use as a restrained focus treatment. | Not identical to active scratchpad window outline, which is 0.34. |
| Inactive field border | border at 0.72 | #E2DDE7 at 72% | Quiet hairline. | Local composition over raised field. |
| Scratchpad active outline | violet at 0.34; inactive uses border at 0.62 | #7564D8 / #E2DDE7 at stated alpha | Mirror only if recreating native focus state. | Native panel surface behavior. |
| Search field radius | RascSurfaceLayout.searchFieldCornerRadius = 11 pt | 11 pt | 11 CSS px starting point. | Native point-to-CSS mapping is approximate. |
| List row radius | listRowCornerRadius = 10 pt | 10 pt | 10 px. | Shared by search/command list rows. |
| Home card radius | HomeLayout.cardCornerRadius = 12 pt | 12 pt | 12 px. | Product implementation. |
| Transient surface radius | transientCornerRadius = 12 pt | 12 pt | 12 px. | Glass/material may alter visible edge. |
| Refine preview radius | previewCornerRadius = 14 pt | 14 pt | 14 px. | Preview surface. |
| Feedback radius | feedbackCornerRadius = 10 pt | 10 pt | 10 px | Processing/confirmation surfaces. |
| Quiet raised shadow | TransientSurfaceStyle: black alpha 0.08 (processing), 0.045 (confirmation); radius 8 pt, y 3 pt | Native black shadow alpha | Use short, soft shadow with same subdued hierarchy. | Separate opacity per state; not a single shadow token. |
| Home card shadow | Home palette: resting opacity 0.10/radius 6 pt/y 2; hover 0.11/radius 9/y 3; selected 0.09/radius 9/y 3. | Native black shadow alpha | Keep subtle and state-specific if recreating cards. | Dark-mode and increased-contrast paths differ. |
| Keycap shadow | ShortcutKeycapView computes opacity, radius, and y from pressed/elevated state. | Component logic, not global token. | Avoid inventing a shared card shadow; refer to native keycap behavior. | Local implementation. |

## Native/web boundary

The semantic foregrounds .primary, .secondary, and .tertiary have no fixed app hex and must remain un-invented. Web can adopt system colors or define an explicit web-only semantic mapping, preserving the measured hierarchy and documenting that decision.

Light canvas in the app is #FBFAFD and raised fill is #F7F4FA. Older commercial direction text contains approximate alternate surface values; use these implementation-derived values when reproducing the app. This does not silently revise the approved landing narrative or wider web palette; web decisions remain explicit.

## Variations to preserve

- Orange action and darker filled action are distinct.
- Violet selection/focus alpha differs by surface and state.
- Muted text is a family of semantic/native treatments, not one color.
- Home card white fill differs from the general raised fill.
- Shadow opacity/radius is local to surface and interaction state.
