# Rasc Web

Public landing for [Rasc](https://github.com/rafaeltorresng/rasc), a native Mac
scratchpad for unfinished thoughts. React 19, TypeScript and Vite; static hosting,
no backend, account, analytics or model endpoint.

## Current release status

**Rasc 0.1.0 (build 6)** is published as open source with an unsigned ad-hoc DMG on
[GitHub Releases](https://github.com/rafaeltorresng/rasc/releases/tag/v0.1.0). The
landing download CTA points at that release asset; install steps are in the app
repo’s [INSTALL-UNSIGNED.md](https://github.com/rafaeltorresng/rasc/blob/main/docs/INSTALL-UNSIGNED.md).

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
VITE_BASE_PATH=/rasc-web/ VITE_SITE_URL=https://rafaeltorres.dev/rasc-web/ npm run build
npm run preview
```

## Deploy

Pushes to `main` run `.github/workflows/deploy-pages.yml` (lint, typecheck, build,
GitHub Pages). Custom domain path: `/rasc-web/` on `rafaeltorres.dev`.
