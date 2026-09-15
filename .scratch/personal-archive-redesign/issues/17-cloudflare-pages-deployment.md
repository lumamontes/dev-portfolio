# 17: Cloudflare Pages Deployment

**What to build:** Deploy the Astro frontend through Cloudflare Pages with repeatable builds, previews and the configuration needed for the WordPress-backed site.

**Blocked by:** 05: Unified Archive; 13: WordPress.com Content Boundary.

**Status:** completed

- [x] The Astro site builds successfully with the Cloudflare Pages build settings.
- [x] Preview deployments are defined through Cloudflare's Git integration.
- [x] Required environment values are documented without exposing secrets.
- [x] Static behavior is explicit and compatible with content delivery.

## Implementation Notes

- Updated Astro's canonical site URL to `https://lumamontes.com`.
- Added `docs/cloudflare-pages.md` with build, preview, environment and domain settings.
- No Cloudflare account changes or production deployment were attempted without account access.
- Verified with `pnpm build` (43 pages generated).
