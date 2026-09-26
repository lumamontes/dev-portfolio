# Cloudflare Pages

## Build settings

Configure the Cloudflare Pages project with:

- Framework preset: `Astro`
- Build command: `pnpm build`
- Build output directory: `dist`
- Node version: `20` or the version used by the repository's package manager
- Production branch: `main` in the `portfolio-deploy` repository

Automatic preview deployments are disabled. A protected publishing action
creates and prepares a publishing branch, and a separate deploy action triggers
the production build after that branch is reviewed and merged into `main`.
Astro itself remains a static site; the publishing control plane is a separate
Cloudflare Worker or Pages Function.

## Environment values

No secret is required for the build: all content lives in the repository. Never put Spotify client secrets in the frontend build.

The publishing control plane uses encrypted server-side variables for the
secret path, HTTP Basic Auth username and password, session-signing secret,
server-side prepare and approval endpoints, their authorization token, and the
Cloudflare Pages deploy hook. None of these values belong in Astro's public
build variables. The endpoint contract is:

- `PUBLISH_PREPARE_URL`: server-side operation that validates the authoring
  vault and prepares `publish/current` in the deploy vault.
- `PUBLISH_APPROVE_URL`: server-side operation that reviews and merges the
  prepared branch.
- `PUBLISH_DEPLOY_HOOK_URL`: Cloudflare Pages deploy hook for the merged
  production branch.

The GitHub App credentials belong to the server-side prepare and approval
implementation, not to the browser-facing function.

Spotify live listening must use a server-side token exchange or a separately protected integration. Playlist links and public embeds do not require listening permissions.

For the live listening Pages Function, add `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET` and `SPOTIFY_REFRESH_TOKEN` as encrypted production variables. The refresh token comes from `.spotify-token.json`; copy only its value into the Cloudflare secret, never into Git or a public variable.

## Domain

After the first successful production deploy, attach `lumamontes.com` in Cloudflare Pages and verify that the generated sitemap uses the canonical domain.
