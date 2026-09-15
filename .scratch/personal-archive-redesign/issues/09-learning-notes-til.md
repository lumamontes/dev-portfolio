# 09: Learning Notes and TIL Migration

**What to build:** Turn TIL content into manageable learning-note entries that can be drafted, published and browsed through the unified archive.

**Blocked by:** 02: Legacy Content and Route Inventory; 03: Public Content Selection Boundary.

**Status:** completed

- [x] Existing TIL material has a canonical content source.
- [x] Learning notes support title, body, date, tags and publication state.
- [x] Private learning notes stay out of pages and feeds.
- [x] The TIL route becomes a useful archive view rather than an external-only link.

## Implementation Notes

- Added the `learning-notes` content collection with canonical `learning-note` entries.
- Migrated two representative English notes from the existing GitHub TIL repository, preserving source links.
- The remaining external notes stay listed in the migration inventory until their dates and publication states are audited.
- `/[lang]/til` now renders canonical public notes and links into the unified archive; the external repository remains a reference link.
- Verified with `pnpm build` (33 pages generated).
