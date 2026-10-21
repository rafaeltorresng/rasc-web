# Guided installation — local review

Historical record of the first wizard. The current overview prototype and permanent guide are documented in [current installation architecture](../installation-guide.md).

Branch: `rafa/guided-installation`. No commit, push or deployment was made for this implementation.

## UX decision

Keep every Download for Mac CTA as a real link to the existing release DMG. A normal primary activation also opens one native HTML dialog when the viewport is at least 768 CSS px and the primary pointer is fine and supports hover. No download is intercepted, delayed, or inferred to have completed. Modified clicks retain their usual link behavior.

The guide has four directly selectable steps, Back/Next controls, a persistent close button, and Download again. Its desktop size stays stable between steps. On mobile, downloading does not open it automatically; Installation help opens the same content as a bottom sheet. The manual link appears below the hero and closing CTAs, and inside the existing Download details disclosure. The header stays visually unchanged.

Steps: open the downloaded DMG → drag Rasc into Applications → open Rasc and dismiss the first-launch alert with Done, if present → review Privacy & Security and choose Open Anyway if blocked. The last step is conditional; there is no claim that every installation requires it. Rasc is explicitly described as not notarized. The guide never changes security settings or asserts that Apple verified the app.

Since macOS 15, Control-click → Open no longer overrides this Gatekeeper block. That alternative is confined to an optional macOS 14 disclosure, rather than presented as the primary path. Sources reviewed on 2026-10-15:

- [Apple Developer: runtime protection in macOS Sequoia](https://developer.apple.com/news/?id=saqachfa)
- [Apple Support: safely open apps on your Mac](https://support.apple.com/en-us/102445)

The app's existing source installation document was not modified in this website task. Its right-click-first wording should be aligned separately when that repository is in scope.

## Capture provenance

Captured on macOS 26.5.1 (25F80), in English, using native `screencapture` PNG window captures. The native system appearance was retained; the light website frames real dark native surfaces. No global appearance or security preferences were changed.

- `captures/download.png`: the actual release DMG, copied byte-for-byte into an otherwise empty temporary capture folder. Crop includes only the file, not the sidebar, path, or personal downloads.
- `captures/dmg.png`: the actual mounted v0.1.1 DMG, showing the real Rasc app and Applications shortcut. Finder icon scale was enlarged for the capture. This is the static state used to explain the drag; no ghost cursor or drag trail was painted into the screenshot. One separate, decorative web arrow indicates direction between the actual icons.
- `captures/blocked.png`: real Gatekeeper alert produced for an isolated capture copy of the v0.1.1/build 7 app. The capture copy uses identifier `com.rafaeltorres.rasc.installcapture20261015` and was re-signed ad-hoc with the existing sandbox entitlement, retaining download quarantine metadata. This reproduces first launch without terminating the user's running app or accessing its personal container. The alert was dismissed with Done.
- `captures/privacy-security.png`: real System Settings Security section showing that Rasc was blocked, with Open Anyway visible. Open Anyway was **not clicked**, and no security exception was granted.
- `captures/privacy-context.png`: a continuous crop from that same foreground Settings capture, including the real **orange-selected Privacy & Security sidebar row** and the adjacent Security content. No account information is included. The orange is the native active accent, not recoloring.
- `captures/privacy-selection.png`: a close crop of the same active sidebar selection. On mobile, this sits above the Security detail with a separate editorial down arrow. A responsive picture uses the complete context on desktop and the readable detail on mobile; native controls are never reconstructed.

Only crops, framing, and proportional scaling were used; no native text, controls or security messages were reconstructed. The installed app, its source, prompts and personal database were not modified. The volume mounted for this capture was ejected afterward. Temporary originals and the isolated fixture remain outside the repositories under `/private/tmp/rasc-installation-captures/`.

Production assets are `src/assets/installation/*.webp`: lossless, exact transparent pixels, original ICC profiles preserved. Total approximately 173 KiB. The six PNG crops remain here as source evidence and do not ship in the public bundle. Visuals mount only when the guide is open, and only the selected step’s visual is rendered. Display size never exceeds half the capture pixel width, preserving Retina resolution. Fixed figure dimensions prevent image decode from moving the controls.

## Accessibility and behavior

Native `dialog.showModal()` supplies modal semantics and makes the page behind it inert. Title and description are associated; step changes have a polite live announcement. Initial focus goes to the close button. Explicit Tab/Shift+Tab wrapping handles WebKit keyboard behavior; Escape and close controls dismiss the dialog and restore focus to the exact opener without scrolling. Body scrolling is restored on unmount, including React Strict Mode cleanup. The content area scrolls on small/short displays while the header and footer remain reachable.

Entrance animation is 160 ms and applies only under `prefers-reduced-motion: no-preference`; there is no animated step transition, autoplay or persistent dismissal state.

## Verification

- `npm run lint`, `npm run build` (including TypeScript), and `git diff --check`: passed.
- Local production build reviewed at `http://127.0.0.1:5182/`, with UI interactions through the browser.
- Actual hero and header downloads completed while the guide opened on desktop. The downloaded DMG SHA-256 matched `launch.sha256`: `812323655859a5389cbd872075e81bc51509084ac14966c6a293911b5b383973`.
- Actual download at a 390 px viewport completed without opening a dialog; the Installation help control then opened the sheet.
- Direct step selection, Back/Next, Escape, close, manual re-opening from step 1, optional macOS 14 disclosure and focus restoration were exercised. Tab wraps from the last control to close; Shift+Tab wraps back.
- 1440 × 1000 desktop, 1024 × 768 compact desktop, 600 × 900 intermediate sheet, 390 × 844 mobile and 320 × 568 short mobile checked. No horizontal page overflow. Close and footer remain inside the viewport; short displays use internal scrolling.
- Native screenshots were inspected individually for private information, cropping and readability. WebP ICC metadata was checked after export. A native ImageIO comparison confirmed identical decoded Display P3 pixels between each PNG crop and its WebP export, at all six original dimensions.
- QA captures are in `validation/`. These are browser-tool JPEG proofs, not the lossless production screenshots.
- Mobile checks are viewport emulation in the desktop browser, not physical-device testing. VoiceOver and a separate Chrome session were not run. Reduced motion is enforced in CSS; no operating-system preference was changed for testing.

## Files

- New: `src/page/InstallationGuide.tsx`, `src/page/InstallationGuide.css`.
- Changed: `src/page/Brand.tsx` (shared download handler and corrected release disclosure), `src/page/LandingPage.tsx` (provider and manual help controls), `src/ui/Icon.tsx` (close glyph).
- New: six optimized WebP assets in `src/assets/installation/`, six native PNG crops in `docs/installation/captures/`, validation captures and this record.

## Assessment

A contextual dialog is the right interim solution: it reaches the user during download, keeps the landing's narrative intact, and gives the security step sufficient room. The mobile screenshot is a visual reference; the readable text carries the instruction at narrow widths. This guide reduces uncertainty but cannot remove Gatekeeper friction. A properly signed and notarized release remains the better long-term installation experience.

When the release filename, installer layout, macOS wording or signing status changes, review the corresponding capture and step copy together. Release URLs and version text continue to come from `src/content/launch.ts`.
