# 14: WordPress Editorial Schema

**What to build:** Configure WordPress.com content structures and editorial metadata for the shared entry model while keeping future migration to self-hosted WordPress possible.

**Blocked by:** 01: Canonical Entry Model and Editorial Invariants; 13: WordPress.com Content Boundary.

**Status:** completed

- [x] Supported entry types and required metadata are defined.
- [x] Editorial states and public visibility are represented separately.
- [x] Languages, categories, tags, media and external publication fields are supported.
- [x] WordPress.com-specific behavior is isolated from the public content model.

## Implementation Notes

- Added `docs/wordpress-editorial-schema.md` with the portable WordPress.com Free mapping.
- Standard posts, native categories/tags and the media library are the initial backend primitives.
- Custom post types and registered REST fields remain an optional self-hosted evolution, not a dependency of Astro or Ulysses.
- The public frontend continues to consume the normalized boundary from `src/lib/wordpress.ts`.
