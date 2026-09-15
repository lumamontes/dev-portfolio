# 11: Photo Entries and Albums

**What to build:** Let Luma publish individual photos and photo albums with images, captions, dates, places and context, while migrating selected material from the existing galleries gradually.

**Blocked by:** 02: Legacy Content and Route Inventory; 03: Public Content Selection Boundary.

**Status:** completed

- [x] A single photo can be published as an archive entry.
- [x] An album can contain ordered photos with shared metadata.
- [x] Image sizes, loading behavior, credits and external media URLs are handled safely.
- [x] Existing galleries remain available while selected content is migrated.

## Selection Note

The initial photo selection is intentionally small. A childhood photo of Luma and her sister is reserved for a later placement decision and is not included in this first album.

## Implementation Notes

- Added the `Recortes` album with three selected photographs from `Photos-1-001`.
- Stored the selected images locally under `public/photos/` and preserved their dimensions and credit metadata.
- The album is a single `photo` archive entry with ordered images, rather than three separate cards.
- Verified with `pnpm build` (35 pages generated).
