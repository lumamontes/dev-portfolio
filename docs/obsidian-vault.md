# Obsidian Vault Workflow

The workflow uses two local vaults with different responsibilities.

## Vaults

- **Website vault:** this repository. Open the repository root in Obsidian.
  Install Obsidian Git here and synchronize it with the website GitHub
  repository. It contains Astro and public content only.
- **Draft vault:** a separate local folder. Use it for drafts, private notes,
  source material and unpublished assets. Do not configure Obsidian Git for it
  as part of this workflow.

The draft vault is not a second deploy source. Cloudflare never reads it, and
no private draft reaches production until it is deliberately copied into the
website vault.

## Publishing

1. Write and edit in the draft vault.
2. When an entry is ready, copy its Markdown file and required assets into the
   matching collection folder in the website vault.
3. Confirm the entry has the public/published frontmatter required by the
   collection schema.
4. Open the website vault in Obsidian and use Obsidian Git to pull, commit and
   push the change to `main`.
5. Cloudflare Pages builds `main` and deploys the website.

Obsidian Git synchronizes the website vault only. It does not move files
between vaults, so the copy from draft to website is the intentional editorial
checkpoint.

## Safety

Keep the draft vault outside the website repository so private notes cannot be
committed accidentally. Do not copy private drafts or unrelated source assets
into the website vault. Pull the website vault before editing it on another
device and resolve Git conflicts before pushing.

Automatic previews and deployment-control pages are not part of this workflow.
