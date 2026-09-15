# WordPress Production Cutover

The production frontend remains Astro on Cloudflare Pages. WordPress.com is the public editorial source, not the DNS host for the frontend.

## Preconditions

- WordPress migration is complete and representative public posts are available through the REST API.
- Cloudflare Pages has a successful production deployment from the intended branch.
- `lumamontes.com` is attached to the Pages project and HTTPS is active.
- The Astro build has the intended public WordPress endpoint configured, without editor credentials.

## Cutover Checklist

1. Deploy a preview and verify homepage, language routes, archive details, RSS and sitemap.
2. Verify that WordPress-backed content contains only published entries and that private entries are absent.
3. Attach `lumamontes.com` in Cloudflare Pages; keep the previous deployment available.
4. Check canonical URLs, redirects, `/rss.xml`, `/sitemap-index.xml` and representative external links.
5. Monitor the first production deployment before changing any WordPress or DNS settings.

## Rollback

- Re-point the custom domain to the last known-good Pages deployment, or redeploy the previous Git commit.
- Keep WordPress content unchanged during a frontend rollback; editorial data and frontend deployment are independent.
- If the API is unavailable, retain the local-content build as the emergency fallback rather than publishing an empty archive.

## Current Boundary

The repository currently builds a static Astro archive from local collections. The WordPress client is implemented as an isolated REST boundary, but production content cutover cannot be verified until WordPress.com is provisioned and the deployment environment is configured.
