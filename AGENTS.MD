# Rasc Web — Agent Instructions

## Product state

The Rasc macOS app is a release candidate, not a certified public binary. Verify claims against the current source and artifact. Do not propose app features while working on the website unless explicitly asked.

This repository contains a React/TypeScript/Vite landing. Historical commercial/design documents are context, not proof of current functionality. The release status and source links must match verified publication facts in `src/content/launch.ts`.

## Source priority

1. Approved Rasc commercial docs: positioning, landing narrative, IA, Brand Identity v1, Landing Asset Plan, and decisions.
2. Actual Rasc app behavior, current assets, build/version, and implemented design tokens.
3. DESIGN.md if present and consistent with approved docs and app facts. No DESIGN.md was present during the source audit.
4. External reference notes, for execution craft only.
5. Agent judgment.

## Hard constraints

Do not:
- reposition Rasc as an AI notes app or knowledge-management system;
- invent product features not present in the app;
- recreate app UI in HTML when a real product capture exists;
- introduce generic AI gradients, glow, spheres, sparkles, or chatbot visuals;
- turn the landing into a SaaS feature grid;
- change approved landing IA without explicit approval;
- copy reference branding, typography, colors, or components wholesale;
- modify the macOS app, its prompts, or product behavior during website work;
- claim planned marketing captures already exist.

## Brand

Brand Symbol = static Rasc identity. Thinking Orb = semantic shaping/state language. They are not interchangeable.

Brand Identity v1 describes the approved direction. The final production master is distinct from current raster app implementation assets; do not declare those assets final without evidence.

## Visual direction

The website is predominantly light and warm/editorial.
- Orange = primary actions.
- Violet = state/focus/identity details.
- Graphite = content.
- Warm neutrals = structure.

Use manifests/design-tokens.md for implementation-derived values. Native semantic text colors do not have invented fixed hex values.

## Product assets and capture

Real product behavior must come from the real macOS app. The site may frame the product but must not fake it. Capture the app only from an accepted build with an isolated fixture account/database. Never copy personal notes or databases into this repository.
