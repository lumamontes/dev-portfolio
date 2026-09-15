# Legacy Content and Route Inventory

This inventory records the current content sources and public routes before migration into the canonical entry model.

## Content Sources

| Source | Current representation | Canonical entry type | Languages | Migration note |
| --- | --- | --- | --- | --- |
| Technical articles | Markdown content collections | `text` | English and Brazilian Portuguese | Existing `isPublish` and `isDraft` values are normalized by the canonical model. |
| Books | Markdown collections plus an optional Notion integration | `book` | English and Brazilian Portuguese | Existing book work is unstaged and must be preserved. Local and Notion sources compete. |
| Today I Learned (TIL) | External GitHub link and incomplete Notion implementation | `learning-note` | Not established | A canonical source must replace the external-only page. |
| Projects | TypeScript data module | `project` | English and Brazilian Portuguese | Data is not currently content-managed. |
| Zines | Biblioteca de Zines external publication | `zine` | Per entry | The portfolio stores context and links; full reading remains external. |
| Quadrados gallery | Netlify-hosted gallery using Cloudinary assets | `photo` | Per entry | Migrate selectively and preserve image credits and source URLs. |
| Photo Gallery Demo | Vercel-hosted Next.js, TypeScript, Contentful and Cloudinary | `photo` | Per album | Albums have year, description and ordered photos. Migrate selectively. |
| Music Logger | WordPress.com site with authored posts and Last.fm-generated summaries | `music` | Primarily Brazilian Portuguese | Keep authored music writing distinct from automated listening logs. |

## Existing Public Routes

| Route family | Current content | Compatibility requirement |
| --- | --- | --- |
| `/{lang}/posts` | Technical article index | Continue resolving or redirect to Writing. |
| `/{lang}/posts/{slug}` | Technical article detail | Preserve existing slugs. |
| `/{lang}/books` | Local book index | Preserve while consolidating the book source. |
| `/{lang}/books/{id}` | Local book detail | Preserve or redirect to the canonical book entry. |
| `/{lang}/books/{slug}` | Notion book detail | Resolve the duplicate route deliberately; do not generate competing pages. |
| `/{lang}/til` | External TIL destination link | Replace with the canonical learning-note archive when migrated. |
| `/{lang}/projects` | TypeScript-backed project page | Preserve as a compatibility route while moving projects into the archive. |
| `/rss.xml` | Posts RSS feed | Keep valid while the public-selection boundary is introduced. |
| `/books-rss.xml` | Books RSS feed | Keep valid while books are migrated. |
| `/{lang}/about`, `/{lang}/contact` | Static profile and contact pages | Preserve unless intentionally redesigned. |
| `/{lang}` | Homepage | Replace with the unified homepage without removing language routes. |

## Existing Post Items

The English and Brazilian Portuguese collections contain 15 shared slugs, represented by 30 language-specific files:

- `optimistic-ui-updates`
- `mobile-tech-lead-learnings`
- `testing-with-pest-and-php-unit`
- `node-typescript-set-up`
- `how-to-create-good-documentation-as-a-developer`
- `modern-monolith-with-inertia`
- `minimalist-state-managment-with-jotai`
- `astro-framework-introduction`
- `ssr-testing-in-next-with-jest`
- `data-migration-tradeoffs`
- `when-to-stop-testing`
- `local-first-legend-state`
- `guard-components-react`
- `authentication-flow-with-expo-router`
- `typing-react-navigation`

The `optimistic-ui-updates` entries contain the invalid calendar date `2025-02-31` in both languages.

## Existing Books

The local English and Brazilian Portuguese collections each contain `clean-code`. The entry includes title, author, status, rating, genres, ISBN, page count, reading dates and cover URL. A second Notion-backed implementation can generate a competing detail route but has no configured database in the current environment.

Disposition: migrate the local `clean-code` entries as the canonical book source; retain the Notion implementation only as historical work and do not migrate it as a second source.

## Existing Projects

The project data contains Cuidaty, App Asset Generator, LocalSync RN, Expo Router Auth, Image Gallery, Laravel Payments API, Biblioteca de Zines and Caju Replica App. Each has English and Brazilian Portuguese descriptions. Several entries link to GitHub repositories; Cuidaty links to its public website.

Disposition: migrate all eight projects, preserving their external links and bilingual descriptions.

## Existing Photo Items

The Photo Gallery Demo exposes two albums:

| Source item | URL | Language | Disposition |
| --- | --- | --- | --- |
| 2024 album | `https://photo-gallery-12.vercel.app/5qeSZgqWT0Sdzlz2ffT3tk` | Not applicable | Migrate after image and metadata review. |
| 2023 album | `https://photo-gallery-12.vercel.app/52otPfzso7wn41TUYeUFW5` | Not applicable | Migrate after image and metadata review. |

The Quadrados gallery exposes 11 individual image items. Their current public routes are:

| Item | Current route | Language | Disposition |
| --- | --- | --- | --- |
| `2_mnthlw` | `/image/quadrados%2F2_mnthlw` | Not applicable | Review for photo migration. |
| `4_kfd820` | `/image/quadrados%2F4_kfd820` | Not applicable | Review for photo migration. |
| `3_dzwv4h` | `/image/quadrados%2F3_dzwv4h` | Not applicable | Review for photo migration. |
| `6_qplsbt` | `/image/quadrados%2F6_qplsbt` | Not applicable | Review for photo migration. |
| `5_cquaaj` | `/image/quadrados%2F5_cquaaj` | Not applicable | Review for photo migration. |
| `7_pgptnq` | `/image/quadrados%2F7_pgptnq` | Not applicable | Review for photo migration. |
| `1_tnubou` | `/image/quadrados%2F1_tnubou` | Not applicable | Review for photo migration. |
| `0d46920e-4589-4680-a8ea-f7d70f956286` | `/image/quadrados%2F0d46920e-4589-4680-a8ea-f7d70f956286` | Not applicable | Review for photo migration. |
| `IMG_20201105_235627` | `/image/quadrados%2FIMG_20201105_235627` | Not applicable | Review for photo migration. |
| `1519b851-e80f-4360-ba79-41f1592725ad` | `/image/quadrados%2F1519b851-e80f-4360-ba79-41f1592725ad` | Not applicable | Review for photo migration. |
| `20190116_155742_1` | `/image/quadrados%2F20190116_155742_1` | Not applicable | Review for photo migration. |

All routes are relative to `https://quadrados.netlify.app/`. The images are served from the `quadrados` Cloudinary folder; credits and ownership still require review.

Disposition: preserve the Quadrados source while reviewing each image for migration as an individual `photo` entry or inclusion in an album. No language variants are currently identified.

## Existing Music Assets and External Sources

- Local audio tracks are `portishead-only-you`, `jorja-smith-greatest-gift`, `linkin-park-IGYEIH` and `little-simz-free`, used by the existing radio player.
- The authored music source is `https://tururu61.wordpress.com/`.
- Authored entries currently include `inicio de um blog aleatório` (`2025-01-16`), `The Cranberries – Everybody Else Is Doing It, So Why Can’t We?` (`2025-01-16`), `Fletwood Mac` (`2025-01-21`), `Warpaint` (`2025-06-27`), `Gritos femininos` (`2025-07-23`) and `Viciada em wolf alice` (`2025-07-23`). Their current URLs are `/2025/01/16/inicio-de-um-blog-aleatorio/`, `/2025/01/16/the-cranberries-everybody-else-is-doing-it-so-why-cant-we/`, `/2025/01/21/fletwood-mac/`, `/2025/06/27/warpaint/`, `/2025/07/23/gritos-femininos/` and `/2025/07/23/viciada-em-wolf-alice/`. All are currently Brazilian Portuguese entries.
- Automated entries currently include `Fevereiro de 2025` and `Março de 2025`, both generated from Last.fm, currently written in Brazilian Portuguese, and available at `/2026/01/17/fevereiro-de-2025/` and `/2026/01/17/marco-de-2025/`.
- Local audio tracks are retained as existing site assets and are not automatically treated as authored music entries.
- The photo sources are `https://quadrados.netlify.app/`, `https://photo-gallery-12.vercel.app/` and the 2023 album at `https://photo-gallery-12.vercel.app/52otPfzso7wn41TUYeUFW5`.
- The TIL source is `https://github.com/lumamontes/today-i-learned`.
- The zine destination is Biblioteca de Zines, linked by the current project data at `https://github.com/lumamontes/biblioteca-de-zines`.

Disposition: migrate all authored music entries, migrate automated summaries as explicitly automated entries, and retain local audio tracks only if a later experience needs them.

## Language Inventory

- Existing posts have parallel `en` and `br` directories for most technical articles.
- Existing books have parallel English and Brazilian Portuguese collections.
- Projects have English and Brazilian Portuguese fields in shared data.
- The TIL repository is English-oriented based on its README and entry filenames; no Brazilian Portuguese variants are present in the repository. Individual entries should still be audited before migration.
- Zine and photo entries have no identified language variants and should be treated as language-independent unless their descriptions contain prose.
- All currently inventoried music-blog entries are Brazilian Portuguese; no English variants were found.
- The canonical language values are `en` and `br`.

## Editorial-State Inventory

- Existing posts use `isPublish` and optional `isDraft` legacy flags.
- Existing local books use `published` as a legacy public flag.
- Notion book and TIL implementations have separate, incomplete publication assumptions.
- Photos and the music blog currently have no shared editorial-state model in this repository.
- Future migration must map legacy flags into canonical editorial state and visibility without exposing private entries.

## Known Conflicts and Risks

- Two dynamic book routes represent overlapping URL patterns and data sources.
- The active Astro content configuration and the additional book configuration are separate files; only one is recognized as the content configuration.
- The Notion client is incomplete for the installed Notion SDK and currently produces a failed request when its environment is not configured.
- The current site is statically built, while future WordPress content will require a build-time API boundary and secret configuration.
- Existing image assets are hosted externally, especially through Cloudinary and WordPress media URLs. Ownership, credits, transformations and availability need verification before copying assets.
- The current deployment configuration contains Netlify assumptions, while the target deployment is Cloudflare Pages.
- At least one existing post has an invalid calendar date and must be corrected or rejected during migration.

## Migration Order

1. Stabilize the canonical model and public-selection boundary.
2. Preserve and consolidate local book entries.
3. Migrate writing, learning notes, projects and the first zine entry.
4. Migrate the two Photo Gallery Demo albums and review the 11 Quadrados images for individual or album migration.
5. Migrate the six authored music posts and two automated listening summaries separately.
6. Connect the canonical content model to WordPress after source data is understood.

## Inventory Limits

This document records source-level and item-level identifiers available in the repository and linked sites. It does not decide final redirects, image licensing, WordPress field mappings or which unpublished/private material should be migrated.
