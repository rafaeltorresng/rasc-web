# Workspace interface assets

These identify applications inside a fictional work context. They are not Rasc
branding, partner marks, integration claims, or a capture of the user's desktop.

- `rasc-menubar.png`: byte copy of
  `/Users/rafatorres/Desktop/rasc/Rasc/Resources/Assets.xcassets/MenuBarIcon.imageset/menubar@2x.png`.
  Native asset is 64 × 64, has template rendering intent, and is loaded by
  `Rasc/Platform/MenuBarController.swift`. CSS masks account for its transparent
  padding. The landing header/footer/favicon continue to use the brand symbol.
- `superwhisper-symbol.png`: rasterized from the installed vendor asset
  `providerSuperwhisper` in `/Applications/superwhisper.app/Contents/Resources/Assets.car`.
  Rendered at 64 × 64 with AppKit. The bundled static `OnboardingAppMenu` image
  was inspected and shows the corresponding menu-bar silhouette. This does not
  verify that the icon is currently present on the user's menu bar.
- `chatgpt-symbol.svg`: unchanged OpenAI Blossom SVG shipped in
  `/Applications/Cursor.app/Contents/Resources/app/node_modules/@chenglou/pretext/pages/assets/openai-symbol.svg`.
  It is a bundled third-party derivative/reference, not a newly downloaded
  official production master. OpenAI owns the mark. Usage remains subordinate
  to Rasc and restricted to the ChatGPT work illustration. Brand reference:
  https://openai.com/brand/ .
- `apple-menu.png`: macOS SF Symbol `apple.logo`, regular at 14 points, rendered
  at 3× through AppKit. Native dimensions 13 × 16 points; PNG 39 × 48. This
  replaces the oversized system-font U+F8FF export. Apple owns the mark.

Updated 4 October 2026: system indicators now use native assets, replacing the
approximate inline SVGs:

- `wifi.png`: macOS SF Symbol `wifi`, medium at 14 points, rendered at 3× through
  AppKit. Native dimensions 18 × 14 points; PNG 54 × 42.
- `controls.png`: macOS SF Symbol `switch.2`, regular at 14 points, rendered at
  3× through AppKit. Native dimensions 17 × 15 points; PNG 51 × 45. This replaces
  the two rectangle outlines with Apple's actual switch geometry.
- `battery-outline.png` and `battery-cap.png`: loaded from
  `/System/Library/CoreServices/ControlCenter.app/Contents/Resources/Assets.car`
  via Bundle/AppKit, 23 × 12 and 2 × 12 points, rendered at 3× (69 × 36, 6 × 36).
  CSS places outline, cap and charge fill at native proportions. Static fill
  illustrates 90% charge, matching the local battery reading during this pass;
  it does not monitor visitors' batteries or imply live charge state.

The owner's macOS locale `en_BR` and native DateFormatter patterns were read:
`EEEE, d MMMM` and `HH:mm`. The clock now updates at minute boundaries and
refreshes immediately when a hidden page becomes visible. Dates resolve in the
visitor's local timezone, in English with a 24-hour clock. Explicit en-GB Intl
formatters/parts reproduce those patterns because en-BR can fall back to US in
browser ICU. Full date on wide scenes; abbreviated date on compact scenes; time
only on the narrowest scenes. No fixed Saturday or 9:41 remains.

Network and battery state are illustrations; no network/device telemetry is
collected. Cursor's application icon is not substituted for an unverified
menu-bar icon. Native ControlCenter inspection timed out, so exact equivalence
with the currently displayed menu bar is not claimed. Individual exported
symbols were visually inspected on a neutral background.

Later on 4 October, System Settings → Menu Bar was successfully inspected via
the native accessibility tree. “Show menu bar background” was **off**. macOS
26.5.1 and Dark appearance were verified locally. No setting was changed; the
view was returned to General afterward. The simulated bar now has a transparent
background, no divider and light foregrounds over the static dark wallpaper,
with restrained shadow for legibility. No frosted strip, blur or refractive FX
is added to the resting bar. Visitors requesting reduced transparency or more
contrast receive an opaque dark fallback.

Official reference describes Tahoe's menu bar as completely transparent:
https://www.apple.com/newsroom/2025/06/macos-tahoe-26-makes-the-mac-more-capable-productive-and-intelligent-than-ever/ .
This confirms the treatment and the owner's setting, not a screenshot comparison
of the full menu bar or the rendered landing.

The ChatGPT application was unavailable to native inspection because the
computer-use tool blocked the host app. Its illustrated layout is deliberately
simplified; do not describe it as a pixel-exact copy of the current installed UI.
No chat history, personal files or private projects were copied.

Additional 4 October pass: status items now have centered layout slots with
shared spacing. Each glyph keeps its own aspect ratio; Wi-Fi is 18 × 14,
Control Center 17 × 15, battery 25 × 12 including its cap. Rasc's unchanged
64 × 64 template is displayed at its native 32-point image scale, producing a
16-point visible symbol after transparent padding is excluded from layout.
These are verified asset dimensions, not measurements of the current menu-bar
screenshot. On narrow scenes optional slots disappear entirely, leaving no
empty gaps. Clock alignment and live-minute behavior remain unchanged.

ChatGPT sidebar structure was checked against the official desktop illustration
in https://learn.chatgpt.com/docs/quickstart: sidebar product selector followed
by New chat, Projects, Plugins and Chats. Pinning a project in the sidebar is
documented in https://learn.chatgpt.com/docs/projects. The fictional Workshop
project and conversation are retained. The conversation toolbar, composer,
theme and window dimensions remain simplified interpretations; documentation
does not establish the owner's exact installed layout or custom preferences.
Native access was denied again; no indirect capture was used. Rendered landing
comparison remains blocked by the browser tool's administrative access check.
