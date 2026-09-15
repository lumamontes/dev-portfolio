# 08: Writing Migration

**What to build:** Migrate existing technical posts and support new long and short Writing entries with independent English and Brazilian Portuguese availability.

**Blocked by:** 02: Legacy Content and Route Inventory; 03: Public Content Selection Boundary.

**Status:** completed

- [x] Existing public writing retains its metadata and content.
- [x] Writing entries support private editorial states.
- [x] Missing language variants are omitted rather than shown as broken translations.
- [x] Technical and future cultural writing use the same archive without identical presentation requirements.

## Implementation Notes

- Added `format: long | short` to the writing schema, defaulting existing entries to `long`.
- Marked current public writing explicitly as `published-here` and `public`.
- Retained private posts in the collection while excluding them from pages, archive and RSS through the shared public-selection helper.
- Existing localized entries remain independently addressable; missing variants are not synthesized.
- Verified with `pnpm build` (31 pages generated).
