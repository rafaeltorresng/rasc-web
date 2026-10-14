# Native capture set — 14 October 2026

These are direct, light-appearance window captures of Rasc 0.1.0 (build 6).
No product interface, note text, Refine result or dates were painted into them.
The capture tool returns JPEG; these files preserve those bytes without
transcoding or retouching.

Source: `../rasc/build/rc/export/Rasc.app`, from app repository HEAD
`82db8f4505717719c3e58baebef8e736eb0b5f60` at capture time. Website work did
not change that repository, app source, prompts or release artifacts.

The capture copy lives outside both repositories, at
`/private/tmp/rasc-tableau-20261014/RascShowcase.app`. Only its bundle identifier
and light-appearance Info.plist setting were changed, followed by ad-hoc signing.
Its sandbox entitlement was verified before launch. Its unique identifier,
`com.rafaeltorres.rasc.showcase20261014`, created an empty, separate container.
No personal Rasc database, notes or preferences were imported. The original and
re-signed copy have identical `__TEXT,__text` machine code (SHA256 of the
`otool` section listing: `bc7047ace1e8b158e749385a183882f368848db14adc4456cab15a844f89c413`).

The initial scratchpad, Refine and current Search captures used a second fresh capture copy,
`/private/tmp/rasc-tableau-20261014/RascCleanCapture.app`, with identifier
`com.rafaeltorres.rasc.showcase20261014.clean`. It has the same source, signing,
sandbox and appearance setup. Starting a fresh capture session avoids the
previous automation session's cursor highlights without retouching any pixels.
Home uses the first isolated fixture set; both copies contain the identical
unfinished upload thought. These are separate views composed for marketing.

The compact scratchpad and enlarged Refine now use
`/private/tmp/rasc-compact-showcase/RascNoteCapture.app`, identifier
`com.rafaeltorres.rasc.compactnote20261014`, copied from that same accepted build
with another empty sandbox. Both windows were resized through the native UI:
720 × 320 pt for the editor, then 640 × 320 pt for the Refine preview. This is
the app's supported minimum height. No screenshot was stretched or cropped to
simulate a shorter window, and no app source or prompts were changed.

The actual light UI was visually reviewed and accepted for this website
composition. This is not certification of the binary, notarization or approval
of a new brand master.

| File | Native window | Capture pixels | Content |
| --- | --- | --- | --- |
| scratchpad.jpg | 720 × 320 pt | 1440 × 640 | Original unfinished upload thought |
| refine.jpg | 640 × 320 pt | 1280 × 640 | Actual Foundation Models proposal, not accepted |
| home.jpg | 1000 × 680 pt | 2000 × 1360 | Two kept thoughts and three unfinished thoughts |
| search.jpg | 720 × 440 pt | 1440 × 880 | Query `upload`, matching the same original thought |

The requested example is the existing `engineering` fixture:

    user loses everything if upload fails keep what they typed show clear error let them retry

Refine was run in the native app with Apple Intelligence. Observed proposals
preserved the words and added capitalization and sentence punctuation. One run
produced the reference text exactly; another omitted the final period. The
captured proposal is an actual run, with no manual correction or forced output.

Final captured proposal (compact native window):

    user loses everything if upload fails. Keep what they typed. Show clear error. Let them retry.

Other synthetic thoughts were entered through the app: `opening paragraph`,
`leave saturday open`, `retry logic`, and `less in the first screen?`. Kept
status and timestamps come from actual app actions. No dates were backdated.

The marketing tableau combines separate captured states. It does not claim that
the editor and its replacement Refine preview are simultaneously open in Rasc.
The landing caption identifies this as “Real Mac app · composed views”. Only
outside framing, proportional scaling, layering and soft CSS shadows are added.
