# Two vaults separate authoring from deployment

## Status

Accepted

## Context

The site needs a comfortable local Obsidian workflow across devices without
exposing drafts or private notes to the public build. Obsidian Git can sync a
vault, but it should not be treated as a deployment system. The existing
`dev-portfolio` repository already contains the Astro application and public
content used by production.

## Decision

Keep two private Git repositories:

- `personal-vault` is the authoring vault. It contains drafts, private notes,
  source material and unpublished assets.
- `portfolio-deploy` is the deploy vault and remains this repository. It
  contains Astro code and only promoted public content.

Obsidian Git synchronizes the authoring vault. A protected Cloudflare
publishing page exposes two actions:

1. **Prepare publication** asks a server-side workflow to validate the
   authoring vault, copy entries with `visibility: public` and
   `editorialState: published-here`, remove entries that are no longer
   eligible, and create or update a publishing branch in the deploy vault.
2. **Deploy production** triggers a Cloudflare Pages deploy hook after the
   publishing branch has been reviewed and merged into `main`.

The page uses a secret path plus HTTP Basic Auth and a short-lived secure
session. GitHub access is performed by a narrowly-scoped GitHub App, so normal
publishing does not require logging into GitHub. Automatic previews are
disabled.

Preparation fails without producing a partial branch when frontmatter is
invalid or the deploy vault has unexpected manual changes. A preparation
summary lists added, changed and removed files. Unpublishing removes the
promoted content and assets from the deploy vault on the next preparation.

## Consequences

The public build has a small, explicit input surface and cannot accidentally
include private authoring material. Publishing requires two deliberate steps,
but both can be initiated from an Obsidian button or the protected web page.
The promotion service and GitHub App are operational infrastructure that must
be configured separately from the static Astro site.

The deploy vault is a generated public snapshot. Editorial changes must be
made in the authoring vault, not directly in `portfolio-deploy`.
