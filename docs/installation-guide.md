# Installation help

The contextual dialog and `/install/` reuse `InstallationContent` from
`src/page/InstallationGuide.tsx`. There is one set of instructions and real
screenshots. `install/index.html` is a separate Vite entry, so opening or
refreshing the permanent URL does not require a GitHub Pages SPA fallback.

## Hierarchy

The macOS block and **Privacy & Security → Open Anyway** are the lead content.
The three basic actions remain visible below: open the DMG, drag to Applications,
open Rasc. There is no mandatory Next/Back navigation. Copy is intentionally
short, with a separate conditional macOS 14 path rather than an incorrect
universal right-click override. The guide honestly identifies the app as not
notarized and never asks users to disable Gatekeeper globally.

Installation help is a real, shareable link beside the Hero and closing CTA,
and in the footer. A normal activation inside the landing opens the dialog;
modified clicks keep native navigation. Help remains accessible on non-Mac
platforms, even when their download CTA becomes a compatibility message.

## Download contract

Every supported Download for Mac remains a direct link to the release asset in
`src/content/launch.ts`. A normal primary click also opens help on a detected Mac
with a wide viewport/fine pointer. It does not prevent or wait for the download,
claim completion, or require the user to finish the guide. Mobile/unsupported
platform handling remains in the existing download-availability component.

## Interaction and fallback

Native dialogs, explicit focus restoration, Escape, backdrop handling and scroll
restoration are shared with the existing component patterns. Screenshots can be
expanded by selecting the image; the redundant white arrow badges were removed.
A failed image leaves written instructions. Mobile/short-height dialogs scroll
inside the available viewport; the permanent page is ordinary document flow.

No asset preloading occurs before help is needed. Screenshots are existing real
Finder/Gatekeeper/System Settings captures, with the actual orange-selected
Privacy & Security row. No system UI is reconstructed in HTML.

## Verification

The production browser suite covers direct `/install/` refresh, all instructions,
blocked-path discovery, image failure, keyboard/focus/scroll, modified clicks,
desktop download help and mobile access. Source discovery tests include the
installation canonical and sitemap. See the film integration report for the
consolidated validation and remaining native Safari playback limitation.

Source provenance and the first wizard remain in [the historical record](installation/README.md).
