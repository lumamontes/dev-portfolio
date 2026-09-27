# Two local vaults separate drafts from the website

## Status

Accepted

## Context

Luma wants to write in Obsidian across devices while keeping drafts and
private material out of the public website. The website repository already
contains the Astro application and public content. A second private Git
repository and a server-side promotion service would add operational
complexity without being necessary for a deliberately manual publishing step.

## Decision

Use two local Obsidian vaults:

- The **website vault** is this repository, `portfolio-deploy`. It contains
  Astro and only public content. Obsidian Git synchronizes this vault with its
  GitHub repository.
- The **draft vault** is local-only. It contains drafts, private notes and
  source assets. It is not synchronized to GitHub by this workflow.

When an entry is ready, Luma manually copies the approved Markdown and assets
from the draft vault into the website vault. Obsidian Git commits and pushes
the website vault's `main` branch. Cloudflare Pages builds `main`.

Automatic previews remain disabled. No publishing URL, password page, GitHub
App, promotion Worker, deploy hook or second repository is part of the normal
workflow.

## Consequences

The publishing boundary is a deliberate local copy rather than an automated
promotion service. This is simpler to operate and avoids syncing private
material, but the editor must copy the correct files and assets manually.

The website vault is the public deploy source. Editorial work can happen in
the draft vault, but approved content must be copied into the website vault
before it can be published.
