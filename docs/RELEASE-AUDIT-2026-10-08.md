# Rasc Web — release audit, 8 October 2026

**Verdict: CLOSE TO READY, gated by the actual app release.** The landing exists
and its production build is healthy. It must not advertise the archived beta.3
as a verified public version. No publication, push or repository visibility change
was performed. See `../rasc/RELEASE_READINESS.md` for the ordered release checklist.

## Verified facts and changes

- The app source is beta.4/build 5. The retained beta.3/build 4 DMG matches its
  SHA256 `41094a2612d6e38c3ee94ae0d2ac529274e71a56c0282ed154e9cd8ad0045cc2`.
  Its bytes were not changed. It is ad-hoc signed and not notarized.
- Authenticated GitHub metadata reports both repositories private and no app
  Releases. The existing Pages site at `https://rafaeltorres.dev/rasc-web/` returns
  HTTP 200, but still serves the previous deployed revision. Local fixes have
  not been deployed; private repositories can still have a reachable Pages site.
- `sourcePublic` and `publicReleaseReady` now start false. The primary CTA opens
  release status, private source links are disclosed, and first-launch security
  bypass instructions were removed. Real download/source CTAs require verified
  release/publication facts, not just existing local files.
- Vite updated from 7.2.4 to 7.3.7 within the existing major; source-map-js updated
  transitively. `npm audit` now reports zero findings (including dev dependencies).
- Root MIT license added for original code; borrowed artwork/marks retain their
  original notices and are not claimed to be MIT. Maintainer still needs to clear
  redistribution rights for system-derived wallpaper/vendor assets, or substitute
  original/cleared artwork before publishing those assets.
- A real beta.4 scratchpad capture with synthetic text was added, behind a small
  “See the real Mac app” disclosure. Animated scenes are explicitly illustrations;
  no personal account, notes or conversations were captured. Source/provenance:
  `public/screenshots/README.md`. Refine mistakes are disclosed.
- Illustrated editor now uses proportional system text at 16px, matching the
  native editor's 16pt direction; shortcut keycaps retain their own treatment.
- Pages build sets both base and canonical site URL. Open Graph/Twitter images
  are absolute for the public address; icon, preload and application assets retain
  the Pages subpath. Other deployments must supply their own real site URL.
- CI now runs lint/typecheck before production build. README and stale agent
  guidance were reconciled with the actual implementation; generated/local files
  remain ignored.

## Checks executed

| Check | Result |
| --- | --- |
| Clean `npm ci` | Passed; lockfile reproduced, zero audit findings |
| `npm run lint` / `npm run typecheck` | Passed |
| Root production build | Passed |
| Pages production build | Passed; correct `/rasc-web/` paths and absolute social metadata |
| Production preview | Rendered through the browser at the Pages subpath |
| 390 / 768 / 1024 / 1440 px | No horizontal overflow or broken loaded images/anchors observed |
| Keyboard chapter navigation | ArrowRight selects Refine and moves tab focus |
| Accept → Keep | Separate actions complete and return to work illustration |
| Real screenshot disclosure | Opens correctly and identifies native capture versus illustration |
| Console | No warnings/errors captured on the successful production preview |
| Archived DMG/checksum | Match; original bytes retained |
| Historical credential scan | 159 historical blobs; no matches for known key/token patterns |

The production bundle is about **247 KB JS / 78 KB gzip** and **44 KB CSS / 10 KB
gzip**, plus local media. There are no remote fonts, analytics SDKs, forms or AI
calls in the page implementation. The host can maintain ordinary access logs;
this audit does not make claims about GitHub's infrastructure logging.

The first preview used a Pages build with a root-base preview server, which served
HTML for the JS path. This was a preview setup mismatch, not a production code
failure. The documented preview now sets `VITE_BASE_PATH=/rasc-web/` too.

## Remaining limits

No Lighthouse score, full automated accessibility audit, Safari/Firefox comparison,
real screen-reader session or browser reduced-motion emulation was run. Reduced
motion, visibility suspension, inert hidden scenes, tab roles and focus behavior
were inspected in code; do not confuse that with assistive-technology acceptance.
No dedicated web test suite exists. Native app/system accessibility acceptance is
tracked separately. Desktop/mobile evidence is saved outside git in the app's
`build/readiness/web-desktop.jpg` and `web-mobile.jpg`.

The animated work context retains third-party/system artwork requested in earlier
work. Provenance documents do not themselves establish redistribution permission.
Do not present it as an integration with OpenAI, Apple or Superwhisper.

## Activate the public release

1. Obtain the exact Developer ID-signed, notarized, clean-install-tested app DMG.
2. Publish public source and versioned app Release/checksum/release notes with the
   maintainer's authorization; verify unauthenticated links.
3. Update every field in `src/content/launch.ts` from that release. Set publication
   flags only when true. If using GitHub-hosted downloads, use that Release's asset
   URL rather than duplicating/renaming the old DMG.
4. Build/lint/typecheck again, inspect the download details and actual artifact link,
   and deploy `dist/` through the existing Pages workflow when authorized.
5. Open the live landing anonymously, inspect canonical/social images and download
   the final DMG; verify its SHA256 against the same release record.
