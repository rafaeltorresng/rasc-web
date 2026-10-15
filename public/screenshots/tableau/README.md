# Native capture set — 14 October 2026

## Current hero assets

These are direct, lossless Retina PNG window captures of Rasc 0.1.0 (build 6).
No product interface, note text, Refine result or dates were painted into them.
The native macOS capture excludes the mouse pointer and outside window shadow.
The PNG files are copied unchanged from the capture output.

| File | Native window | Capture pixels | Content |
| --- | --- | --- | --- |
| scratchpad.png | 720 × 320 pt | 1440 × 640 | Original unfinished upload thought, native cursor invisible |
| refine.png | 640 × 320 pt | 1280 × 640 | Actual Foundation Models proposal, not accepted |
| home.png | 1000 × 680 pt | 2000 × 1360 | Two kept thoughts and three unfinished thoughts |

Source: the accepted release-candidate build previously captured from
`../rasc/build/rc/export/Rasc.app`, app repository HEAD
`82db8f4505717719c3e58baebef8e736eb0b5f60` at the original capture time.
Website work did not modify app source, prompts or release artifacts.

The PNG capture copy is outside both repositories:
`/private/tmp/rasc-clean-cursor-20261014/RascCursorCapture.app`.
It was copied from the same accepted light-appearance capture build, assigned
identifier `com.rafaeltorres.rasc.cursorcapture20261014`, and ad-hoc signed while
preserving its verified sandbox entitlement. Its new identifier created an empty,
separate container. No personal database, notes or preferences were imported.
Onboarding reset was used only in this isolated capture copy to reopen its
capture session; fixture notes stayed in that copy.

All fixture content was entered through native app controls. The original note:

    user loses everything if upload fails keep what they typed show clear error let them retry

The actual PNG Refine proposal from Apple Intelligence:

    User loses everything if upload fails. Keep what they typed. Show clear error. Let them retry

The proposal is an observed native result, with no correction or forced output.
Other short synthetic examples are `opening paragraph`, `leave saturday open`,
`maybe retry once before showing the error`, and
`do we need all of this before the first click?`. Kept state and timestamps come
from actual app actions; no dates were backdated.

The native cursor was invisible during the scratchpad capture. Inspection of
its final glyph region finds no violet caret pixels. The complete y in retry
remains intact. The live website adds one separate blinking caret beyond the
glyph, without a mask, repainting or retouching the text.

The live hero overlays the editor/preview Thinking Orb slots with the existing
native-derived renderer. Slot backgrounds match the PNG canvas (#fbfafd).
Reduced motion uses the original PNGs without overlays. The post remains static.
Outside framing, proportional scaling, layering and soft CSS shadows are added.
The editor and Refine preview are separate captured states composed for marketing,
not a claim that both are simultaneously open. An accessible description explains
the composed scene; the live right-hand caption was removed at the user's request.

The light UI was accepted for this website composition. This is not certification
of the binary, notarization or approval of a new brand master.

## Historical JPEG captures

The .jpg files retain earlier direct capture-tool output. Home originally used
`/private/tmp/rasc-tableau-20261014/RascShowcase.app`, identifier
`com.rafaeltorres.rasc.showcase20261014`. Search used
`RascCleanCapture.app`, identifier
`com.rafaeltorres.rasc.showcase20261014.clean`. The compact editor and Refine used
`/private/tmp/rasc-compact-showcase/RascNoteCapture.app`, identifier
`com.rafaeltorres.rasc.compactnote20261014`.

All were isolated, light-appearance copies of the same accepted build.
`search.jpg` (1440 × 880 pixels; 720 × 440 pt) remains in the editorial direction
study. The final hero and post now use the PNGs above.

## Home refreshed from 0.1.1 / build 7

`home.png` was recaptured on 14 October 2026 from the locally verified Release
0.1.1/build 7 package, using the same isolated synthetic fixture identifier and
notes listed above. The bundle was copied from
`../rasc/build/releases/0.1.1-build7/export/Rasc.app`, assigned only the isolated
capture identifier, and re-signed with the same sandbox entitlement. The new
Home identity is 24 pt with native 1x/2x backing assets.

The accepted PNG is a direct `screencapture -x -o -l` output at 2000 × 1360, chosen
while the native search caret was in its invisible phase. Its pixels were copied
unchanged. Screen-sharing indicators introduced by the inspection tool were
avoided by separating native control from the final capture, never retouched.
Home PNG SHA-256: `757336988001089c2dc13909d864094feba86d138260a4bb7cedc3742d640116`.

Scratchpad and Refine PNGs remain the build-6 native captures documented above:
those surfaces and behavior are unchanged in build 7. All canonical and mascot
publication exports were regenerated using the refreshed Home. The release is
ad-hoc signed and not notarized. Published source: Rasc tag `v0.1.1`, commit
`6e41805954a91a09f591e6a00dd4384bb59c4809`.
