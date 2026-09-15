# 10: Projects and Zine Entries

**What to build:** Migrate professional projects and create zine entries that document published zines while linking complete reading experiences to Biblioteca de Zines.

**Blocked by:** 02: Legacy Content and Route Inventory; 03: Public Content Selection Boundary.

**Status:** completed

- [x] Existing project information is represented as the current editable project source and appears in the archive.
- [x] A zine entry supports title, optional cover, description, context, optional date and external link.
- [x] Zine entries link clearly to Biblioteca de Zines.
- [x] Projects appear in the unified archive with a distinct external-link presentation.

## Blocker

The first real zine details are now available. Future zines can be added to the same collection as they are provided.

## Implementation Notes

- Existing project data is included in `/[lang]/archive` with preserved bilingual descriptions, technology tags and external URLs.
- Project links open their original public destination and are clearly labeled `project`.
- Added `Gêmulas` by Luana Góes and Luma Montes as the first public `zine` entry in Portuguese.
- The zine keeps its autobiographical context and points readers to Biblioteca de Zines for the complete reading experience.
- Verified with `pnpm build` (34 pages generated).
