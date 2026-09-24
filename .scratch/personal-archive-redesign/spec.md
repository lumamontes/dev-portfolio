Status: ready-for-agent

# Personal Archive Redesign, Editorial Publishing and Portal Navigation

## Problem Statement

The site currently presents a fragmented, half-finished identity. Three visual eras coexist in the codebase at once (an old dark "terminal/bento" theme still live on `/about` and `/contact`, a newer off-white "paper" theme everywhere else, and a fully-specified but never-implemented "Bootleg Noir" design system in `DESIGN.md`), and the same underlying data (professional experience) renders twice, in two different visual languages, on two different pages (`/about` and `/projects`). A real bug hides a real content type: books have a working schema and content but are fetched and never rendered on the Archive index. The "Listening Now" widget renders twice on every page (once fixed globally, once inside the header), which visually collides with the language picker rather than the two ever actually fighting over z-index.

Beyond bugs, the archive itself does not work the way Luma wants it to. Browsing an entry today means a flat, static detail page with no way to move to other entries without returning to an index. There is no "portal" feeling: clicking a project doesn't let you see the actual project; clicking a zine doesn't get you closer to the actual zine; there is no visible photo/gallery experience at all despite a working `photo` schema; playlists have no home and are not modeled distinctly from music writing. Meanwhile, real content is missing outright — several published technical articles (on dev.to and elsewhere) were never migrated into the canonical system, and a substantial set of Luma's real GitHub projects (both public and private) were never represented anywhere on the site.

Professional and creative identity are also tangled in the wrong places: open-source and personal projects are filed under a "Work" nav tab and mixed into the same page as employment history, when a recruiter wants a fast, clean work-history destination and a cultural reader wants projects treated as archive entries alongside everything else Luma makes.

## Solution

Consolidate the site around a single unified homepage (no separate `/about` or `/contact` — see `docs/adr/0001-remove-about-contact-pages.md`) and rework the Archive into the site's real browsing home, using a "portal" navigation pattern: every entry keeps a real canonical URL, opening one renders its actual content (not just a summary) in a main pane, a persistent sidebar grouped by entry type stays visible for fast lateral navigation between entries (no return-to-index required), and external content is rendered by a verified, tiered strategy rather than a single blanket rule (see `docs/adr/0002-external-entry-preview-strategy.md`): live iframe embed for Luma's own deployed apps that don't block framing, and migrated-and-owned canonical content for her own writing regardless of where it was first published — never live scraping or CSP evasion.

Experience (employment and volunteer history) becomes its own dedicated route, sourced from the existing structured data in the separate `career-engine` project via a one-time, manually re-run import script — never mixed with archive projects again. `/projects`, `/books`, and `/til` become redirects into the unified Archive, which gets a real Books column (fixing the render bug) and a new `playlist` entry type distinct from music entries. The archive project set is expanded with a curated selection of Luma's real public and private GitHub repositories identified during this planning cycle. The `ListeningNow` widget collapses to a single global instance. `DESIGN.md`'s unimplemented "Bootleg Noir" system is fully retired; visual identity (fonts, colors beyond the existing off-white, imagery treatment) is explicitly out of scope for this spec and will be addressed in a separate, dedicated visual pass once this functional/structural work lands.

WordPress.com remains the CMS; the problem here was always an incomplete migration, not a platform limitation, so the plan is to finish migrating the specifically identified missing content rather than switch platforms.

> **Superseded (2026-09-24):** WordPress has since been removed; Markdown in the repository is the only content source. See `docs/adr/0003-remove-wordpress.md`.

## User Stories

1. As a visitor, I want a single homepage that presents Luma's whole identity (professional and creative) at once, so that I don't have to choose which version of her to explore.
2. As a visitor, I want `/about` and `/contact` to no longer exist as separate destinations, so that identity and contact information live in one coherent place instead of being fragmented across pages.
3. As a visitor, I want old `/about` and `/contact` URLs to redirect to the homepage, so that existing bookmarks and links don't break.
4. As any visitor, I want to move from the homepage into a complete Archive, so that I can discover older and less prominent work.
5. As a visitor, I want each Archive entry to clearly indicate its type (project, text, book, zine, learning note, photo, music, playlist), so that I understand what I'm opening before I open it.
6. As a visitor, I want the Archive index to be visually rich (thumbnails/images per entry), so that browsing feels alive rather than like a plain directory listing.
7. As a visitor, I want clicking an entry to open a "portal" view at a real, shareable URL, so that the experience feels immersive but still behaves like a normal web page (back button, sharing, bookmarking all work).
8. As a visitor, I want a persistent sidebar inside any entry's portal view listing all other entries grouped by type, so that I can jump directly to another entry without returning to the index first.
9. As a visitor opening a text entry, I want to read the actual rendered article content in the portal, not just a summary, so that I don't have to leave the site to read Luma's writing.
10. As a visitor opening a project entry for one of Luma's own live deployed apps, I want to see the actual live site embedded in the portal, so that I can interact with the real thing without leaving the archive.
11. As a visitor opening a project or zine entry that points to something Luma doesn't control or that blocks embedding, I want an honest link-preview card (title, image, excerpt) that opens the real destination in a new tab, so that I'm not shown a fake or broken embed.
12. As a visitor opening a zine entry for something Luma authored, wrote about, or migrated into the canonical system, I want to read that content natively on the site, so that the zine's context and story aren't reduced to a bare link.
13. As a visitor opening a photo entry or album, I want the actual images rendered in the portal, so that visual work is presented as more than a text description.
14. As a visitor, I want playlists to appear as a lightweight, distinct card (name, cover art, destination link, optional short note), so that a playlist doesn't masquerade as a full music-writing entry.
15. As an editor, I want to optionally attach a short personal note or observation to a playlist entry, so that I can add context without it being required.
16. As a visitor, I want music entries (authored writing, artist/album notes, automated listening logs) to remain distinct from playlists, so that authored writing isn't diluted by pointer-style content.
17. As a reader, I want long-form writing and short-form notes to coexist in Writing, so that shorter work doesn't look like an inferior version of an article.
18. As a reader, I want to browse technical writing without losing access to cultural and personal writing, so that the archive reflects Luma's full range.
19. As an editor, I want the sidebar's grouping and the Archive's category taxonomy to be derived from Luma's actual content (not invented in advance), so that navigation reflects what really exists.
20. As a reader, I want entries available only in Portuguese or only in English to appear honestly in their available language, so that missing translations aren't mistaken for broken content.
21. As a reader, I want related Portuguese and English entries to link to each other when they are translations or adaptations, so that I can move between versions when both exist.
22. As an editor, I want to create a private idea, draft, pitch, submission, or in-editing text, so that I can develop unpublished work without exposing it publicly.
23. As an editor, I want public visibility to be independent from editorial state, so that a text published externally can appear in the archive while a submitted text stays private.
24. As an editor, I want to write initial drafts in Markdown/Obsidian and publish through WordPress.com, so that the writing workflow stays free, recoverable, and out of a coding-agent loop.
25. As an editor, I want to define slug, excerpt, category, tags, and featured image before publishing, so that entries have complete presentation metadata.
26. As an editor, I want to update a published entry without losing its WordPress identity, so that revisions don't create duplicate entries.
27. As Luma, I want specific named external articles (the dev.to posts, the arcotech guest post, the zine Substack post) migrated into the canonical content system as real entries with `editorialState: published-elsewhere` and an external publication link, so that my writing lives on my own site instead of only elsewhere.
28. As Luma, I want that migration handled by a script rather than manual copy-paste, so that the specific set of missing articles gets imported reliably.
29. As a visitor, I want a migrated article's portal view to show a clear "originally published at ___" link, so that provenance and the original destination are honest and visible.
30. As Luma, I want my own writing never fetched live or scraped from someone else's page at request time, so that the archive doesn't depend on a third-party API or page structure staying stable.
31. As Luma, I want the archive to never attempt to defeat another site's CSP or embedding restriction, so that the portal never misrepresents content it doesn't have the right to show live.
32. As a recruiter, I want a dedicated Work/Experience page showing employment and volunteer history (organization, dates, role, scope, responsibilities), so that I can assess professional background quickly without wading through personal projects.
33. As Luma, I want the Work/Experience page sourced from the structured data already maintained in `career-engine` (per-employer role files, achievements with metrics), so that I don't have to re-enter data that already exists in a good shape.
34. As Luma, I want that import to be a one-time, manually re-run script (not a live build-time dependency on another private repo), so that the two projects stay decoupled and Cloudflare Pages builds don't need access to `career-engine`.
35. As Luma, I want the Work/Experience import to be re-run by hand whenever `career-engine` data changes or LinkedIn export data becomes available, so that the page can be refreshed without rebuilding the integration.
36. As a visitor, I want the Work/Experience page to never contain open-source or personal project links, so that "work" and "archive projects" stay cleanly separated.
37. As Luma, I want a role that produced a notable open-source project to link to that project's separate Archive entry rather than embed it, so that the two concepts stay distinct while remaining connected.
38. As a visitor, I want expanding an experience item to not lose my scroll position (no forced scroll-down-then-scroll-back-up), so that browsing experience entries feels smooth on any screen size.
39. As a visitor, I want `/projects`, `/books`, and `/til` to redirect into the unified Archive (filtered to the relevant type where applicable), so that old links keep working while content lives in one place.
40. As a visitor, I want the Archive index to actually display Books (fixing the current bug where books are fetched but never rendered), so that Luma's reading life is visible as part of her archive.
41. As Luma, I want a curated set of my real public and private GitHub projects added as Archive project entries — including `kettle`, `bugbash`, `external-resources-monitoring-cli`, `planetario`, `focar`, `luanis`, `pedrito`, `amazine`, `caninoszine`, `tasksz`, `japiim`, `db-lab`, and `technical-docs-portal`, alongside the already-known set (Cuidaty, App Asset Generator, LocalSync RN, Expo Router Auth, Image Gallery, Laravel Payments API, Biblioteca de Zines, Caju Replica App) — so that the archive actually reflects the real breadth of what I've built.
42. As Luma, I want a real `project` content collection/schema (not hardcoded page data) backing these entries, so that adding future projects doesn't require editing page templates.
43. As a visitor, I want the `ListeningNow` widget to render exactly once per page, so that it doesn't visually collide with the language picker or itself.
44. As a visitor, I want `ListeningNow`'s idle/empty state (paused, faded CD, "Not listening right now") to be clearly visible and distinct from its offline/network-error state, so that I understand what's happening when nothing is playing.
45. As Luma, I want the two duplicate "professional timeline" implementations (the dark dotted-line graphic and the plain list) removed along with `/about`, so that experience has exactly one implementation going forward.
46. As Luma, I want dead code from retired visual eras (`PageBackground`, `BentoGrid`, `AboutStyles`, `theme.ts`, the orphaned `ProjectsGrid`/`ProjectCard` components, the unused `Open Sans` Tailwind token, unreferenced local font files) removed, so that the codebase doesn't carry three coexisting visual languages.
47. As Luma, I want new code to follow Astro best practices (componentization, avoiding duplication) rather than accumulating more one-off inline page markup, so that the codebase stays maintainable and doesn't read as ad hoc.
48. As a mobile visitor, I want the Archive, portal views, and Work/Experience page to remain fully usable on a small screen, so that the redesign doesn't require a desktop experience.
49. As a keyboard or assistive-technology user, I want portal navigation (opening an entry, moving via the sidebar, closing back to context) to remain accessible, so that the "portal" feeling doesn't depend on inaccessible effects.
50. As a subscriber, I want RSS feeds to continue working through this restructuring, so that I can keep following new writing without visiting the site.
51. As Luma, I want existing public URLs preserved wherever possible and redirects in place for everything else, so that the redesign doesn't destroy the site's history.
52. As Luma, I want the contact email shown publicly to remain `lumagoesmontes@gmail.com`, so that existing outreach channels don't break.
53. As Luma, I want visual identity work (fonts, colors, imagery treatment) explicitly deferred to a separate pass after this spec, so that structural work isn't blocked on aesthetic decisions that need to be seen, not just described.
54. As Luma, I want `DESIGN.md`'s "Bootleg Noir" system fully retired rather than partially salvaged, so that a future visual pass starts from an honest blank slate instead of an unapproved prior proposal.

## Implementation Decisions

- **Entry taxonomy**: add `playlist` to `entryTypes` in `src/lib/content-model.ts`, with its own schema (title, cover image, destination link, optional short note/observation) — distinct from `musicFieldsSchema`, which drops `playlist` from its description now that it's a separate type.
- **Project collection**: `project` is already declared in `entryTypes` but has no backing collection. Add a real `projectFieldsSchema`/collection (title, description, tech stack, external/repo link, live-preview link where applicable, role, period, cover image) following the same `canonicalFields`/`optionalCanonicalFieldsSchema` pattern as `zineFieldsSchema`. Existing hardcoded project data (`src/data/projects.ts`, the inline `featuredProjects` array in `projects.astro`) is migrated into this collection; the curated GitHub sweep (see User Story 41) is added the same way.
- **Experience data**: explicitly not a canonical archive entry type (per `CONTEXT.md`). Lives as its own typed data source, generated by a one-time import script reading `career-engine`'s `career/experiences/*.md`, `career/achievements/*.md`, and `master-cv/master-resume-en.md`, and checked into this repo (not fetched at build time from the other, private, local-only repo).
- **Portal mechanic**: every entry keeps its existing canonical URL shape (`/{lang}/archive/{type}/{slug}`); the portal is a progressive enhancement over that real page, not a URL-less client-side overlay.
- **Preview resolution**: a single pure function decides how an entry's external content renders, per `docs/adr/0002-external-entry-preview-strategy.md` — live iframe embed for Luma's own apps verified to send no framing restriction; native rendered content for anything migrated into the canonical system (all of Luma's own writing, regardless of original host); link-preview card as the ceiling for genuine third-party pointers (playlists, anything she doesn't author). This function takes entry metadata and returns a mode, with no DOM/network/rendering dependency.
- **Sidebar navigation**: persistent inside any portal view, grouped by entry type first (Writing, Music, Photos, Zines, Projects, Books, Playlists), not by category — category remains a secondary axis meaningful mainly within Writing. Exact category taxonomy is derived from real content during implementation, not prescribed here.
- **Archive index vs. portal sidebar**: the index stays image/thumbnail-rich; the plain, text-first persistent list (tiger.exposed-style) is reserved for in-portal navigation, not the index itself.
- **Content migration script**: imports the specifically named external articles (two dev.to posts under `lumamontes`, one dev.to post under `pupunhacode`, the arcotech guest post, the zine Substack post) into WordPress/local content as canonical entries with `editorialState: published-elsewhere` and an external publication link field for provenance. No live fetching or reader-view rendering is built — content is copied once.
- **Route consolidation**: `/about` and `/contact` are removed (content folds into the homepage, per `docs/adr/0001`); `/til`, `/books`, `/projects` become redirects into the Archive (filtered by type where applicable). All legacy→new mappings live in one declarative redirect table (see Testing Decisions).
- **Archive Books bug fix**: `archive/index.astro` already fetches `booksEn`/`booksBr` but never includes them in `localEntries` — add a Books column/group to the rendered index.
- **`ListeningNow` fix**: remove the duplicate instance from `Header.astro`; keep only the global fixed instance from `Layout.astro`. Verify the fix doesn't newly collide with `LanguagePicker` or existing layout in any nav state (`showNav` true/false).
- **Dead code removal**: delete `PageBackground.astro`, `BentoGrid.astro`, `AboutStyles.astro`, `src/data/theme.ts`, the orphaned `src/components/projects/ProjectsGrid.astro` and `ProjectCard.astro`, the unused `Open Sans` Tailwind font token in `tailwind.config.cjs`, and the unreferenced local `.woff` files under `public/fonts/`.
- **Visual identity**: `DESIGN.md` is retired in full; no replacement design system is defined by this spec. The only carried-forward visual constraint is keeping the existing off-white background until the dedicated visual pass happens.
- **CMS**: no change — WordPress.com remains the backend; the gap being closed here is migration completeness, not platform capability.

## Testing Decisions

- **Primary seam**: the pure preview-resolution function (entry metadata → embed mode) is unit tested directly against representative entries for every type/state combination (own live app, migrated own writing, third-party pointer, blocked destination) — no DOM, network, or Astro rendering required for this coverage.
- **Extend the existing public-selection boundary**: `isPublicEntry`/`isPublicEntryInLanguage` test coverage extends to the new `project` and `playlist` collections, reusing the highest existing seam rather than inventing a new one.
- **Redirect map seam**: the legacy→new route mappings live in one declarative table; a test asserts every legacy URL recorded in `migration-inventory.md` (`/{lang}/posts`, `/{lang}/books`, `/{lang}/books/{id}`, `/{lang}/til`, `/{lang}/projects`, `/{lang}/about`, `/{lang}/contact`) resolves to its intended destination.
- **Content schema validation**: extends to the new `playlist` schema and the new `project` schema (required metadata, valid dates, supported languages, editorial states).
- **Build/type validation remains the baseline**: the repo has no established automated test suite; Astro build/type validation plus these focused seam tests are the practical ceiling, consistent with the existing testing decisions already recorded for this initiative.
- **Manual acceptance checks**: exactly one `ListeningNow` widget renders on every page/nav state; the Archive index renders a Books column; portal sidebar navigation moves between entries without a full index return; migrated articles show a clear "originally published at" link; redirects work for all five consolidated route families.

## Out of Scope

- All visual identity work — fonts, colors beyond the existing off-white, imagery/halftone/grain treatment, or any new `DESIGN.md` — deferred to a separate, dedicated visual pass after this spec ships.
- Checking or migrating anything from the `maluesgo-art` GitHub account — raised during planning but not yet confirmed; deferred pending explicit follow-up.
- Merging LinkedIn export data into `career-engine`/Experience — blocked on the export file, which hasn't arrived yet; follow-up work once available.
- Any live-fetch, API-polling, or scraping machinery for externally-hosted writing — explicitly rejected in favor of one-time migration of owned content (`docs/adr/0002`).
- Any attempt to defeat, proxy around, or otherwise evade a third-party site's CSP or framing restriction.
- Full back-catalog content migration beyond the specifically named articles and the curated GitHub project list — the rest remains Luma's own ongoing editorial work.
- Self-hosting WordPress or switching to a different CMS.
- Building a custom writing editor or a bespoke CMS/publishing bridge.
- Rebuilding every existing photo album or every music-blog post in this pass (selective/incremental migration remains acceptable, per the original migration plan).

## Further Notes

- The existing `.scratch/personal-archive-redesign/issues/` (21 files) predate this spec revision. Several remain valid; several are now superseded (anything assuming `/about`/`/contact` still exist as pages, or written before the portal mechanic and the projects/experience split existed). Reconciling these is `/to-tickets`' job, not this spec's.
- `docs/adr/0001-remove-about-contact-pages.md` and `docs/adr/0002-external-entry-preview-strategy.md` record the two hardest-to-reverse decisions from this planning cycle. `CONTEXT.md` was updated in place for the `playlist` and `Experience` vocabulary during grilling.
- The portal/sidebar interaction pattern is directly modeled on `tiger.exposed` (`/project` index, `/project/components` detail view) — verified via live browser screenshots during planning, not just a text description. Its plain-text index/sidebar treatment is reused only for in-portal navigation, not the Archive index itself, which stays image-rich per Luma's own stated goal.
- `career-engine` (`~/www/career/career-engine`, a separate private repo) is the source of truth for Experience content: per-employer files under `career/experiences/`, achievement write-ups with metrics under `career/achievements/`, and a generated `master-cv/master-resume-en.md`.
- Verified technical facts worth preserving: `biblioteca-de-zines.com.br` and `pupunhacode.com` send no framing-restriction headers (live embed is genuinely possible); dev.to, Substack, and Medium-style blogs (`blog.arcotech.io`) all send CSP headers that block framing — confirmed by direct header checks during planning, not assumed.
