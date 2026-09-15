# 15: WordPress Content Migration

**What to build:** Move existing and newly created content into WordPress.com so it can power the public archive without losing content, metadata or URL relationships.

**Blocked by:** 04: Legacy Route Compatibility; 07: Simple Book Entries; 08: Writing Migration; 09: Learning Notes and TIL Migration; 10: Projects and Zine Entries; 11: Photo Entries and Albums; 12: Music Entries and Music Blog Migration; 14: WordPress Editorial Schema; 05: Unified Archive.

**Status:** needs-info

- [x] Existing content types have a documented migration path into WordPress.com.
- [x] Public content retains canonical slugs, language and external links in the migration contract.
- [x] Private editorial content remains private by migration rule.
- [ ] The Astro archive can render representative migrated entries from WordPress.com.

## Blocker

The WordPress.com site has not been provisioned and no public API endpoint is configured. The actual import and end-to-end migrated-content check must happen after those inputs exist.

## Implementation Notes

- Added `docs/wordpress-migration.md` with source mapping, idempotency, privacy, media and validation rules.
- Deliberately did not add an automatic importer or run network writes without a target site.
