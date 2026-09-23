# Product Source

Factual bridge to the current macOS product. Approved commercial direction remains in Docs; this file records implementation facts only.

## Source and provenance

- App repository: /Users/rafatorres/Desktop/rasc
- Audited branch: main
- Audited HEAD: eb0884bf6d23335a750f0412b0f8eedd5b769311
- App version/build: 0.1.0-beta.3 (4)
- Audit date: 2026-09-23
- Source status at audit: main tracked files clean; pre-existing untracked docs/RASC-CONTEXT.md left untouched.

## Capture-relevant surfaces and shortcuts

- Scratchpad: native floating NSPanel; global shortcut Option-Backslash (⌥\). Starts a scratch session ready for text. Supports local editing, Refine, Keep, Home, search, copy/share, and discard.
- Refine: Command-J (⌘J) on a non-empty scratch. Uses a real shaping state and then a preview. The proposal is not committed until acceptance; accepted edits have an undoable revision.
- Keep: Shift-Command-K (⇧⌘K) from an eligible populated scratch. Keep marks the note kept, ends/hides the current scratch session, and the next ordinary scratch starts fresh. It is a lifecycle completion action, not a favorite.
- Home: separate normal window for browsing/retrieval of kept and unfinished notes, grouped by time; includes search, New Scratch, and settings.
- Search: Command-P (⌘P), in the scratchpad, searches local note history and can open a result.
- Open Home: Command-Option-Backslash (⌘⌥\).
- Command Palette: Command-K (⌘K).
- Menu bar: menu-bar item provides Home, New Scratch, History/Search, settings, feedback, and quit.

## Refine and platform requirements

Refine uses Apple Foundation Models on-device through the Foundation Models framework. Refine availability depends on compatible macOS/hardware and Apple Intelligence/model availability on that Mac. This is the only product action that requires Apple Intelligence. Capture, editing, local persistence, Keep, Home, and Search remain usable when Refine is unavailable. The UI has unavailable/error paths; do not imply that every Mac can run Refine.

No external/cloud Refine provider is configured in the current product flow. The marketing statement should be “Apple Intelligence is required for Refine only. The rest of Rasc does not.”

## Local storage and retrieval

GRDB/SQLite is the source of truth. The default database path is ~/Library/Application Support/Rasc/Rasc.sqlite. Notes and search operate locally. The current app has no database path override or marketing fixture mode. A separate macOS user account is the recommended capture environment; do not seed or overwrite a maintainer’s normal database.

Home is a browse/retrieval window, not an editing surface. It exposes kept notes and unfinished notes in temporal groups. Search is an in-scratchpad local-history search. Kept notes remain recoverable/searchable; unkeep reverses the kept state.

## Thinking Orb

The Thinking Orb is semantic, dynamic UI for app state and shaping, not the static Brand Symbol. Current use sites include:
- Scratchpad header: note/solving and Refine shaping states.
- Search and Command Palette headers: search/note semantic states.
- Onboarding: welcome identity cluster, practice/refinement steps, and completion states.
- Home: header identity and empty state.

Implementation: Rasc/UI/RascOrb.swift maps Rasc semantic states to vendored ThinkingOrbsKit. Capture orb motion from the real app; do not treat it as the logo by default.

## Capture limitations

- Definitive visual identity is not frozen: the static RascLogo raster is not proven to be the approved master; the current 512 × 512 AppIcon is a near-white symbol on transparency rather than the approved graphite mark on warm-ivory macOS squircle; onboarding/Home use Orb-plus-wordmark lockups.
- No database override or fixture seeder exists. Isolate data with a separate local macOS user.
- Refine shaping and preview require Apple Intelligence/Foundation Models availability. Shaping timing is variable.
- Keep immediately hides the scratchpad; capture that transition as video, not a stable still.
- All primary marketing captures should use one visually accepted build and one fixture dataset.
