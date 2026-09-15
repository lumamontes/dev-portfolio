# 05: Unified Archive

**What to build:** Give visitors one archive where projects, writing, learning notes, books, zines, photos and music entries can be discovered together while retaining their natural labels.

**Blocked by:** 03: Public Content Selection Boundary.

**Status:** completed

- [x] Mixed public entries render in one archive.
- [x] Each entry has a clear visitor-facing type label.
- [x] Archive filtering respects language, visibility, category and tags.
- [x] Entry detail pages support type-specific presentation without forcing one template.

## Implementation Notes

- Added `/[lang]/archive` with public posts and books as the first content sources.
- Added `/[lang]/archive/[type]/[slug]` for type-specific archive details.
- Projects, learning notes, zines, photos and music remain future sources covered by tickets 09-12.
- Legacy standalone book routes remain intentionally removed; the archive is their replacement.
- Verified with `pnpm build` (31 pages generated).
