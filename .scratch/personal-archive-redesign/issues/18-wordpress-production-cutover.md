# 18: WordPress-to-Production Cutover

**What to build:** Serve the public custom domain from the Astro frontend while WordPress.com provides public content, with a safe rollback path.

**Blocked by:** 15: WordPress Content Migration; 17: Cloudflare Pages Deployment.

**Status:** needs-info

- [ ] The custom domain serves the Astro frontend.
- [ ] Public content is loaded from WordPress.com in production.
- [ ] Existing redirects and feeds work after cutover.
- [x] Rollback and preview behavior are documented.

## Blocker

The WordPress.com site and Cloudflare Pages project are not provisioned in this workspace, so DNS, production API content and live rollback cannot be verified.

## Implementation Notes

- Added `docs/wordpress-production-cutover.md` with preconditions, cutover checks and rollback steps.
- Updated `astro.config.mjs` to use `https://lumamontes.com` as the canonical site URL.
