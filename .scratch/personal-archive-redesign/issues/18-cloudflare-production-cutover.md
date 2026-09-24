# 18: Production Cutover to Cloudflare Pages

**What to build:** Move `lumamontes.com` from Netlify (which serves production today: `server: Netlify`) to Cloudflare Pages, with a safe rollback path. Originally this was a WordPress cutover; WordPress has since been removed (ADR 0003), so all content comes from the repository.

**Blocked by:** 17: Cloudflare Pages Deployment (done). Should happen after the redesign branch is merged.

**Status:** ready-for-human

- [ ] The Cloudflare Pages project builds from the repo (settings in `docs/cloudflare-pages.md`: `pnpm build`, output `dist`, Node 20+).
- [ ] `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET` and `SPOTIFY_REFRESH_TOKEN` are set as encrypted production variables, so `functions/api/listening.ts` works.
- [ ] A Cloudflare preview deploy is checked before the switch: homepage, archive, a portal page in each language, `/rss.xml`, `/books-rss.xml`, the sitemap, and the redirects in `public/_redirects` (Cloudflare Pages supports that file format, including the `:lang` placeholders).
- [ ] `lumamontes.com` is attached in Cloudflare Pages and DNS is switched.
- [ ] The Netlify site is kept (not deleted) for a short rollback window. Rollback means pointing DNS back to Netlify.
- [ ] After the rollback window: `netlify.toml` is deleted from the repo and the Netlify site is shut down. **Not before**: Netlify builds from `netlify.toml` and serves production until DNS moves.

## Comments

- 2026-09-24: Rewritten for Cloudflare. The WordPress criteria ("content loaded from WordPress.com in production") and the `docs/wordpress-production-cutover.md` doc are obsolete; the doc was deleted with WordPress. Luma confirmed Cloudflare Pages as the production host.
