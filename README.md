# Rasc Web

Public landing for [Rasc](https://github.com/rafaeltorresng/rasc), a native Mac
scratchpad for unfinished thoughts. React 19, TypeScript and Vite; static hosting,
no backend, account, or model endpoint. Page views use Cloudflare Web Analytics
(privacy-oriented, no cookies).

## Current release status

**Rasc 0.1.1 (build 7)** is published as open source with an unsigned ad-hoc DMG on
[GitHub Releases](https://github.com/rafaeltorresng/rasc/releases/tag/v0.1.1). The
landing download CTA points at that release asset. The permanent installation
guide is [rasc.app/install/](https://rasc.app/install/), with the same content as
the contextual download dialog.

`src/content/launch.ts` is the distribution source of truth for version, URLs,
checksum and flags (`publicReleaseReady`, `sourcePublic`, `notarized`).

The app needs macOS 14+; the release artifact is Apple silicon only. Refine also
needs macOS 26+, eligible hardware/region and enabled/ready Apple Intelligence.
Capture, Keep, Home and Search work independently of Refine.

## Development

Use Node 22.12+ (or 24) and npm. From a fresh checkout:

```sh
npm ci
npm run dev
```

Production build (matches GitHub Pages):

```sh
VITE_BASE_PATH=/ VITE_SITE_URL=https://rasc.app/ npm run build
npm run preview
```

## Deploy

Pushes to `main` run `.github/workflows/deploy-pages.yml` (lint, typecheck, build,
GitHub Pages). Custom domain: `https://rasc.app/` with `VITE_BASE_PATH=/`.

Legacy bookmarks to `/rasc-web/` on the same host are redirected via
`public/rasc-web/index.html`. The previous project URL on `rafaeltorres.dev`
must be redirected at that host (DNS or site config); it is not served by this
repository after the domain move.

## Installation and product film

The approved editorial Hero prioritizes Download and Installation help. The
Complete film sits between the manifesto and Capture → Refine → Keep. Playback
is requested explicitly; the MP4 has no source URL before Play. Native controls,
a written alternative and the illustrative-demo disclosure remain accessible.

- [Installation architecture](docs/installation-guide.md)
- [Film integration, media provenance and browser limits](docs/film-integration/README.md)
- `npm test`: platform detection, timelines and discovery metadata.
- `npm run test:e2e -- --project=chromium --project=firefox --project=webkit`: production-build browser regressions.

Historical film iterations, raw captures and local comparison controls are not
part of the website build. The production movie is copied to `public/media/`;
Remotion is a separate development toolchain, never a landing dependency.
