# 13: WordPress.com Content Boundary

**What to build:** Establish a replaceable integration boundary through which Astro retrieves public content from a free WordPress.com backend.

**Blocked by:** 01: Canonical Entry Model and Editorial Invariants; 03: Public Content Selection Boundary.

**Status:** completed

- [x] Astro can retrieve representative public WordPress.com content.
- [x] Private and draft WordPress content is never included in the public response.
- [x] Language, pagination, media URLs and failures are handled explicitly.
- [x] The integration does not require WordPress themes or frontend rendering.

## Implementation Notes

- Added `src/lib/wordpress.ts` as a replaceable REST client boundary.
- Public reads force `status=publish`, validate response status, normalize content and safely extract embedded media.
- The result exposes language, pagination and an explicit error without taking down the local archive when WordPress is unavailable.
- Added `docs/wordpress-boundary.md` with the WordPress.com endpoint contract and future `WORDPRESS_API_URL` configuration.
- Spotify playlists and live listening remain intentionally separate integrations covered by tickets 19 and 20.
