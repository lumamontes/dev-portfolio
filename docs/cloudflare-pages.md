# Cloudflare Pages

## Build settings

Configure the Cloudflare Pages project with:

- Framework preset: `Astro`
- Build command: `pnpm build`
- Build output directory: `dist`
- Node version: `20` or the version used by the repository's package manager
- Production branch: `feature/personal-archive-redesign` until the redesign is merged

Cloudflare's Git integration provides preview deployments for pull requests and branch pushes. The project does not need a WordPress theme or a server runtime: Astro currently outputs a static site.

## Environment values

No secret is required for the current local-content build. When WordPress is connected, configure the public REST endpoint as a non-secret value such as `WORDPRESS_API_URL`; never put WordPress editor credentials or Spotify client secrets in the frontend build.

Spotify live listening must use a server-side token exchange or a separately protected integration. Playlist links and public embeds do not require listening permissions.

## Domain

After the first successful production deploy, attach `lumamontes.com` in Cloudflare Pages and verify that the generated sitemap uses the canonical domain.
