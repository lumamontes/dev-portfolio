# Obsidian Vault Workflow

The publishing model uses two private Git repositories. Obsidian Git keeps
the authoring vault synchronized; Cloudflare publishes a separate deploy vault.

## Vaults

- `personal-vault`: drafts, private notes and source assets. Open this folder
  in Obsidian and sync it with the Obsidian Git plugin.
- `portfolio-deploy`: this repository. It contains Astro and the public
  content snapshot. Do not use it as an editorial workspace.

The deploy vault is intentionally not a mirror of the authoring vault. Only
entries with `visibility: public` and `editorialState: published-here` are
promoted. Changing an entry back to private removes it from the next public
snapshot.

## Publishing

The protected publishing page has two actions:

1. **Prepare publication** validates eligible content, copies it into a
   publishing branch in `portfolio-deploy`, and shows added, changed and
   removed files.
2. **Deploy production** is available after the publishing branch is reviewed
   and merged. It triggers the Cloudflare Pages build.

The page is reached through a secret path and protected with HTTP Basic Auth.
An Obsidian button can open that page, so normal publishing does not require
opening GitHub or using a terminal. Automatic previews are disabled.

Install an Obsidian button/link community plugin in the private authoring vault
and create a local note containing the publishing URL. Keep the real secret
path in that local note only; do not commit it to either repository. The
publishing page itself asks for the Basic Auth password and keeps a short-lived
secure session.

Obsidian Git still needs to pull before editing and push after editing. Do not
edit the same file on two devices at once; resolve sync conflicts before
preparing a publication.

## Content rule

Use the existing collection folders under `src/content/` when working on the
deploy vault or when shaping content for promotion. Astro ignores private and
unpublished entries through the content model, but the promotion service must
also filter them before they reach the deploy vault.
