# Cloudflare Pages

## Build settings

Configure the Cloudflare Pages project with:

- Framework preset: `Astro`
- Build command: `pnpm build`
- Build output directory: `dist`
- Node version: `20` or the version used by the repository's package manager
- Production branch: `main` in the `portfolio-deploy` repository

Automatic preview deployments are disabled. Cloudflare Pages builds `main`
after Obsidian Git pushes the website vault. Astro remains a static site and
does not need a publishing control plane.

## Environment values

No secret is required for the build: all content lives in the repository. Never put Spotify client secrets in the frontend build.

No publishing-control-plane variables are required. The only content that
Cloudflare can build is the content already committed to the website vault's
GitHub repository.

Spotify live listening must use a server-side token exchange or a separately protected integration. Playlist links and public embeds do not require listening permissions.

For the live listening Pages Function, add `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET` and `SPOTIFY_REFRESH_TOKEN` as encrypted production variables. The refresh token comes from `.spotify-token.json`; copy only its value into the Cloudflare secret, never into Git or a public variable.

## Domain

After the first successful production deploy, attach `lumamontes.com` in Cloudflare Pages and verify that the generated sitemap uses the canonical domain.
