# 31: Persistent Sidebar Navigation

**What to build:** Inside any entry's portal view, a persistent sidebar listing all other entries grouped by entry type (Writing, Music, Photos, Zines, Projects, Books, Playlists), so a visitor can jump directly to another entry without returning to the index — the tiger.exposed pattern verified during planning.

**Blocked by:** 28 (Entry Portal View: Native Rendering); 26 (Archive Index: Render Books and Photos Groups); 24 (Real Project Content Collection and GitHub Sweep Migration); 25 (Playlist Entries as a Standalone Type).

**Status:** completed

- [x] The sidebar is present and persistent across every portal view.
- [x] Entries are grouped by type first (not by category).
- [x] Every public entry type appears in the sidebar, including Books, Photos, Projects, and Playlists.
- [x] Clicking any sidebar item navigates directly to that entry's portal view without a full page return to the archive index.
- [x] The sidebar respects language and public-visibility filtering (no private or wrong-language entries listed).
- [x] Keyboard-navigable.
- [x] Verified on mobile (the sidebar degrades to something usable on small screens — it does not need to be identically presented, but must remain reachable).

## Comments

- Verified 2026-09-24: the persistent sidebar is shared by every portal page, via `getArchiveEntries` and `groupArchiveEntries`.
