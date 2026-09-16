Status: ready-for-agent

# Personal Archive Redesign and Editorial Publishing

## Problem Statement

The current website presents useful professional work but feels generic and overly similar to an AI-generated interface. Its identity is fragmented across a portfolio, a technical blog, a TIL link, books and an emerging zine practice. The current content and route structure also contains overlapping implementations for books and an incomplete TIL integration.

Luma needs a website that presents her as a whole person: a software engineer, an inspiring writer in development, and someone interested in music, culture, technology, memory and intersectionality. The same homepage should work for a recruiter and for an artist or independent publishing community without forcing either audience through a professional-versus-creative split.

Luma also needs a sustainable publishing workflow. She usually begins in Markdown, but wants an accessible, pleasant interface for polishing, adding images and metadata, managing drafts, and publishing without entering a coding-agent workflow. Unpublished personal writing must remain private while it is being developed.

## Solution

Redesign the Astro website as a unified personal archive with a distinctive, authored visual language based on an archive and laboratory sensibility. The homepage will present Luma's identity and a curated mixture of professional and editorial entries. Dedicated navigation will remain available for deeper exploration, but the site will not segregate professional and creative identities.

Consolidate content around a shared entry model that supports writing, learning notes, books, zines, projects, individual photos, photo albums and music entries. Begin with only the categories supported by current content, including Technology and Zines, and let future categories emerge from actual writing.

Preserve existing URLs and current unstaged book work while migrating existing content into a single editorial system. Use WordPress.com Free as the initial hosted backend, with the option to move to self-hosted WordPress later, and Astro as the public frontend on free static hosting such as Cloudflare Pages. Use Obsidian for local-first writing and WordPress.com for review and publishing. Keep WordPress themes and frontend rendering out of the public experience.

Support private editorial states independently from public visibility. A text can be an idea, draft, pitch, submission or work in editing without appearing publicly. Published external work can appear as an archive entry with an external publication link.

## User Stories

1. As a recruiter, I want to understand Luma's software engineering experience quickly, so that I can assess her professional background.
2. As a cultural or independent-publishing reader, I want to understand Luma's interests in writing, music, memory and culture quickly, so that I can recognize the person behind the professional profile.
3. As any visitor, I want to see Luma's professional and creative work in one homepage experience, so that I do not have to choose which version of her identity to explore.
4. As any visitor, I want the homepage to feel intentionally authored, so that it does not resemble a generic AI-generated portfolio template.
5. As any visitor, I want to move from the homepage to a complete archive, so that I can discover older and less prominent work.
6. As a visitor, I want each archive entry to clearly indicate whether it is a project, text, book, zine or learning note, so that I understand what I am opening.
7. As a reader, I want long-form writing and short-form notes to coexist in Writing, so that shorter work does not look like an inferior version of an article.
8. As a reader, I want to browse technical writing without losing access to cultural and personal writing, so that the archive reflects Luma's full range.
9. As a reader, I want to browse by a primary subject category, so that I can find relevant writing without depending on a large taxonomy.
10. As an editor, I want to begin with Technology and Zines as real categories, so that the system reflects current content without inventing future categories.
11. As an editor, I want to add tags when useful, so that I can create secondary connections without turning tags into rigid sections.
12. As a reader, I want entries available only in Portuguese or only in English to appear honestly in their available language, so that missing translations are not mistaken for broken content.
13. As a reader, I want related Portuguese and English entries to link to each other when they are translations or adaptations, so that I can move between versions when both exist.
14. As an editor, I want to create a private idea, so that I can capture a possible text without publishing it.
15. As an editor, I want to keep drafts private, so that unfinished personal writing is not exposed while the website is public.
16. As an editor, I want to mark a text as reserved for a pitch, so that I do not accidentally publish work that I may submit elsewhere.
17. As an editor, I want to track whether a pitch was submitted or a text is in editing, so that the archive can support a real editorial practice.
18. As an editor, I want public visibility to be independent from editorial state, so that a text published externally can appear in the archive while a submitted text remains private.
19. As an editor, I want to write initial drafts in Markdown and VS Code, so that the writing process remains portable and familiar.
20. As an editor, I want to polish writing in an accessible visual editor, so that adding images, captions, links and metadata does not require code.
21. As an editor, I want to write in a comfortable local Markdown tool and publish through WordPress.com, so that I can keep a free, recoverable writing workflow.
22. As an editor, I want to publish a post as a draft or published entry, so that I can control its public state from the writing workflow.
23. As an editor, I want to define a slug, excerpt, category, tags and featured image before publishing, so that entries have complete presentation metadata.
24. As an editor, I want to update a published entry without losing its WordPress identity, so that revisions do not create duplicate entries.
25. As an editor, I want WordPress to store content, media, revisions and editorial metadata, so that the publishing system is resilient and portable.
26. As a visitor, I want the public site to remain Astro-based, so that the frontend can have a distinctive design independent of WordPress themes.
27. As an editor, I want current books to be migrated without losing reading status, ratings, metadata or notes, so that the existing book work is preserved.
28. As a reader, I want books to appear as part of Luma's archive, so that reading is connected to the rest of her interests.
29. As an editor, I want TIL entries to be managed in the same publishing system, so that learning notes are not stranded on an external repository link.
30. As an editor, I want projects to be migrated into the editorial system, so that professional work can participate in the unified homepage and archive.
31. As an editor, I want to create a zine entry with a cover, description, context, date and external link, so that the site can document zines without duplicating their full publication.
32. As a reader, I want a zine entry to link to Biblioteca de Zines, so that I can read the complete work where it is published.
33. As a reader, I want the site to preserve the context and process around a zine when Luma chooses to share it, so that the catalog entry can have personality beyond a link.
34. As a visitor, I want existing links to continue working, so that the redesign does not destroy the site's history.
35. As a visitor, I want old URLs that must change to redirect, so that bookmarks and external references remain useful.
36. As a subscriber, I want RSS feeds to continue working, so that I can follow new writing and other public content without visiting the site.
37. As a visitor, I want to encounter small unexpected details and playful hidden experiences, so that exploring the site feels rewarding and personal.
38. As a visitor, I want to see what Luma is listening to when she chooses to share it, so that music becomes part of the site's living atmosphere.
39. As a visitor, I want to discover selected playlists, so that I can connect with a part of Luma's cultural references.
40. As Luma, I want music integrations to respect privacy and fail gracefully, so that the site does not expose more activity than I intend.
41. As Luma, I want experimental elements to remain secondary to readable content, so that the site stays usable for both professional and cultural visitors.
42. As Luma, I want to develop personal visual motifs manually, so that the site's distinctive details come from my own authorship rather than generated decoration.
43. As a mobile visitor, I want the archive, writing and interactive details to remain usable on a small screen, so that the site does not require a desktop experience.
44. As a keyboard or assistive-technology user, I want navigation, reading and interactive experiences to remain accessible, so that personality does not depend on inaccessible effects.
45. As Luma, I want to create a photo entry for one image, so that selected photographs can live in the archive without requiring a separate website.
46. As Luma, I want to create a photo album entry, so that a group of related photographs can be presented with shared context, date and place.
47. As a visitor, I want to browse photographs and albums as part of Luma's archive, so that visual work feels connected to her writing, music and professional practice.
48. As Luma, I want to preserve the existing photo websites while migrating selected albums gradually, so that the photo archive is not forced into a rushed redesign.
49. As Luma, I want to create music entries for listening notes, artist or album posts, playlists and listening logs, so that the music blog can become part of the larger website.
50. As a visitor, I want to browse Luma's music writing and listening history, so that her cultural interests are visible alongside her technical work.
51. As Luma, I want automatically generated listening summaries to remain distinguishable from authored music writing, so that automation does not erase the difference between a log and an essay.
52. As Luma, I want to use a free hosted WordPress backend initially, so that I can validate the publishing workflow without paying for PHP hosting or database infrastructure.
53. As Luma, I want the public domain to remain served by Astro, so that WordPress.com hosting limitations do not determine the visual experience.
54. As Luma, I want to move from hosted WordPress.com to self-hosted WordPress later if needed, so that the initial free setup does not become a permanent lock-in.

## Implementation Decisions

- Astro remains the public frontend and the current bilingual route strategy remains the basis for migration.
- The public information architecture uses a unified homepage and a primary Writing / Escrita area, with dedicated exploration paths for projects, books, learning notes and zines.
- The neutral internal concept is an entry. Visitor-facing labels use natural names such as project, text, book, zine and learning note.
- The content system uses one shared editorial model where practical, with type, language, title, subtitle or excerpt, slug, canonical URL, body or caption, publication dates, category, tags, media, credits, related language versions, external publication data and editorial state.
- Supported entry types include text, learning note, book, zine, project, photo (individual or album) and music entry. A shared model must not force every type to render identically.
- A book entry is a simple personal recommendation or memory with the book's identity, optional cover and optional short impression. Existing reading metadata may be preserved during migration, but it is not required in the public interface. Separate reading-note entries and book-to-note relationships are not required.
- Editorial state and public visibility are separate fields. Public queries must require explicit public visibility and the relevant language.
- Existing posts, books, TILs, projects and newly added zines are migrated into the shared system without discarding the current unstaged book changes.
- The overlapping book implementations and competing data sources are consolidated into one canonical public representation during migration.
- The initial primary categories are Technology and Zines. New categories are added only when recurring content demonstrates a need for them.
- Photo albums are entries with a collection of images and shared metadata. Individual images may remain nested inside an album unless Luma chooses to feature them separately.
- Music entries include authored music writing, album or artist notes, playlists and automated listening logs. Automated logs are labeled as automated and do not replace authored writing.
- English and Brazilian Portuguese are independent content variants. Missing variants are omitted from that language's public archive rather than represented as broken translations.
- Existing public URLs are preserved whenever possible. Redirects are required for intentional URL changes.
- WordPress is the selected long-term CMS because it is open source, mature, resilient and supports structured content, media, revisions and APIs.
- The initial infrastructure should use a free WordPress.com site as the hosted content backend and Cloudflare Pages for the Astro frontend. The custom domain remains attached to the Astro site, not the WordPress.com site.
- The public Astro build consumes only public WordPress content. Private editorial content stays in WordPress and is never exposed through the public build.
- The architecture must keep WordPress.com-specific assumptions behind a content access boundary so that migration to self-hosted WordPress remains possible.
- WordPress is headless: the public frontend does not depend on WordPress themes, templates or frontend rendering.
- The initial authoring workflow should use Obsidian for local Markdown writing and the WordPress.com editor for publishing metadata, drafts, media and final review.
- The WordPress.com REST API is the initial Astro integration boundary because it avoids plugin requirements on the free hosted plan. WPGraphQL remains a future option if the shared content model requires it after prototyping.
- WordPress admin is not the primary writing interface, but remains available for configuration, media and fields that an external writing client cannot manage.
- The repository remains private while it contains unpublished personal writing. A future public-repository transition must account for Git history and must not expose private drafts.
- Local Markdown remains a supported intake format even after WordPress is introduced.
- Visual identity is based on an authored archive and laboratory language. Personal drawings, scans, textures, diagrams and other motifs are intentionally left for Luma to develop manually rather than prescribed by the implementation.
- Hidden interactions, currently-listening status and playlists are treated as optional experimental modules. They must not be required for core navigation, reading, accessibility or professional comprehension.
- Music integrations should prefer a privacy-conscious source and graceful fallback. Playlist presentation can begin with links or embeds before live listening status is added.
- Existing photo galleries and the music blog are migration sources, not dependencies that must remain visually unchanged. Migration can happen selectively and incrementally.
- The CMS and public content architecture should make future editorial experiments possible without forcing every entry into the same visual template.

## Testing Decisions

- Tests should verify externally observable content behavior rather than implementation details or component internals.
- The highest-value seam is the editorial content selection boundary: public queries must exclude private editorial states and select only the requested language.
- The build seam should verify that the unified homepage, Writing archive, projects, books, learning notes and zine entries render successfully from representative content.
- Content schema validation should cover required metadata, valid dates, supported languages, editorial states, categories, reading statuses and media fields.
- Migration tests should verify that representative existing posts, books, projects and TILs retain their public metadata and links.
- Route compatibility tests should verify existing URLs and intentional redirects.
- Feed tests should verify that only public entries appear in RSS and that existing feed endpoints remain valid.
- CMS configuration tests should verify collection fields, draft behavior, media configuration and publishing metadata where automated validation is possible.
- Interactive music and hidden-experience tests should verify graceful behavior when APIs are unavailable, permissions are denied, data is stale or the user prefers reduced motion.
- Accessibility checks should cover keyboard navigation, semantic labels, focus states, reduced motion and content readability for experimental elements.
- The current repository has no established automated test suite, so the initial implementation should use Astro build/type validation plus focused content and route tests at the highest available seam.
- Manual acceptance testing should cover Markdown-to-WordPress transfer, WordPress-to-Astro build delivery, media upload, post update, private content exclusion and mobile browsing.

## Out of Scope

- Creating a custom writing editor from scratch.
- Creating a bespoke CMS or publishing bridge before an existing free workflow has been validated.
- Making the repository public while it contains private writing or private Git history.
- Defining a complete future taxonomy before new content exists.
- Requiring every entry to have an English and Brazilian Portuguese version.
- Hosting complete zine reading experiences on the portfolio site when Biblioteca de Zines is the publication destination.
- Requiring WordPress themes, WordPress frontend rendering or WordPress page builders.
- Building a social network, newsletter platform or submissions platform.
- Automatically publishing every draft or every item in the editorial archive.
- Making live listening, playlists or hidden interactions necessary to understand the site.
- Rebuilding every existing photograph or every music-blog post in the first migration slice.
- Self-hosting WordPress before the hosted workflow has been validated.
- Choosing Luma's personal visual motifs on her behalf.
- Removing or resetting any existing unstaged changes.

## Further Notes

- The current implementation has duplicated book routes and collection definitions, plus an incomplete TIL source. Migration should resolve these deliberately rather than layering another source on top.
- WordPress.com Free provides hosted WordPress, unlimited posts/pages and 1 GB of media storage, but custom-domain and plugin requirements must be checked before relying on them. The public custom domain can remain on Cloudflare Pages.
- Cloudflare Pages can build and deploy the Astro frontend from Git and supports preview deployments. It is not itself a WordPress/PHP host.
- Obsidian is free for personal use and provides the writing environment; WordPress.com remains responsible for publishing metadata, media and editorial status on the free plan.
- The current photo sites use static/gallery-oriented frontend stacks and external Cloudinary-hosted images; migration should preserve image credits, URLs and storage decisions rather than blindly copying assets.
- The current music blog already contains authored music notes, embedded links/images and automatically generated Last.fm listening summaries. These are distinct migration sources and should receive different entry treatment.
- The live listening feature should not be designed until its source, authentication model and privacy boundary are chosen.
- This is a broad redesign and migration. Implementation should be split into vertical slices that preserve a working site throughout: content model, unified archive, migration, WordPress integration, then experimental modules.
