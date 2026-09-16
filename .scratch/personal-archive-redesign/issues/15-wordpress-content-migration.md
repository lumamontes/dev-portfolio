# 15: WordPress Content Migration

**What to build:** Move existing and newly created content into WordPress.com so it can power the public archive without losing content, metadata or URL relationships.

**Blocked by:** 04: Legacy Route Compatibility; 07: Simple Book Entries; 08: Writing Migration; 09: Learning Notes and TIL Migration; 10: Projects and Zine Entries; 11: Photo Entries and Albums; 12: Music Entries and Music Blog Migration; 14: WordPress Editorial Schema; 05: Unified Archive.

**Status:** completed

- [x] Existing content types have a documented migration path into WordPress.com.
- [x] Public content retains canonical slugs, language and external links in the migration contract.
- [x] Private editorial content remains private by migration rule.
- [x] The Astro archive can render representative migrated entries from WordPress.com.

## Implementation Notes

- Added `docs/wordpress-migration.md` with source mapping, idempotency, privacy, media and validation rules.
- Migrated content is available at `https://tururu61.wordpress.com/` through the public REST API.
- Verified the public endpoint returns only `publish` entries, including representative playlists, projects, music, photos and books.
- `pnpm build` renders the WordPress-backed archive and detail pages while retaining local fallback behavior.
