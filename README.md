# Portfolio and Deploy Vault

This repository is the deploy vault for the portfolio. It contains the Astro
application and the public Markdown snapshot promoted from the private
Obsidian authoring vault. It is not the place for private drafts.

Read [`docs/obsidian-vault.md`](docs/obsidian-vault.md) for the two-vault
workflow and [`docs/adr/0004-two-vault-publishing.md`](docs/adr/0004-two-vault-publishing.md)
for the publishing decision.

## Project Structure

```text
├── public/            # Published images and static assets
├── src/content/       # Public Markdown collections
├── src/               # Astro pages, components and schemas
├── templates/         # Obsidian templates
└── docs/              # Editorial and deployment decisions
```

## Commands

| Command | Action |
| --- | --- |
| `pnpm install` | Installs dependencies |
| `pnpm dev` | Starts local dev server at `localhost:4321` |
| `pnpm build` | Builds the production site to `./dist/` |
| `pnpm preview` | Previews a production build locally |
| `pnpm test` | Runs the focused unit tests |
