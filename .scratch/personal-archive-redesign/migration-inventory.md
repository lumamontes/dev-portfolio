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

## Existing Projects

The project data contains Cuidaty, App Asset Generator, LocalSync RN, Expo Router Auth, Image Gallery, Laravel Payments API, Biblioteca de Zines and Caju Replica App. Each has English and Brazilian Portuguese descriptions. Several entries link to GitHub repositories; Cuidaty links to its public website.

## Existing Music Assets and External Sources

- Local audio tracks are `portishead-only-you`, `jorja-smith-greatest-gift`, `linkin-park-IGYEIH` and `little-simz-free`, used by the existing radio player.
- The authored music source is `https://tururu61.wordpress.com/`.
- The music source includes posts about Wolf Alice, Warpaint, Fleetwood Mac and The Cranberries, plus Last.fm-generated monthly summaries.
- The photo sources are `https://quadrados.netlify.app/`, `https://photo-gallery-12.vercel.app/` and the 2023 album at `https://photo-gallery-12.vercel.app/52otPfzso7wn41TUYeUFW5`.
- The TIL source is `https://github.com/lumamontes/today-i-learned`.
- The zine destination is Biblioteca de Zines, linked by the current project data at `https://github.com/lumamontes/biblioteca-de-zines`.

## Language Inventory

- Existing posts have parallel `en` and `br` directories for most technical articles.
- Existing books have parallel English and Brazilian Portuguese collections.
- Projects have English and Brazilian Portuguese fields in shared data.
- TIL, zine, photo and music language availability is per entry and must not assume a translation exists.
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
4. Migrate selected photo albums and individual photo entries.
5. Migrate authored music posts and automated listening summaries separately.
6. Connect the canonical content model to WordPress after source data is understood.

## Inventory Limits

This document records source-level and item-level identifiers available in the repository and linked sites. It does not decide final redirects, image licensing, WordPress field mappings or which unpublished/private material should be migrated.
