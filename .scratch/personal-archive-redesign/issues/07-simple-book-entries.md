# 07: Simple Book Entries

**What to build:** Migrate existing books into simple personal entries showing the book identity, optional cover and optional personal impression without creating a reading-tracker experience.

**Blocked by:** 02: Legacy Content and Route Inventory; 03: Public Content Selection Boundary.

**Status:** completed

- [x] Existing book data and current unstaged book work are preserved.
- [x] Public book entries remain simple and personal.
- [x] Legacy standalone book URLs are intentionally replaced by the unified archive before the next deployment.
- [x] Competing book sources and detail routes have one canonical public representation.

## Implementation Notes

- Reduced book frontmatter to title, author, optional cover and publication metadata.
- Removed tracker fields: status, rating, genre, ISBN, page count, progress and reading dates.
- Kept the existing English and Portuguese impressions as the entry body.
- Books now use `/[lang]/archive/book/[slug]` as their canonical public detail route.
- Verified with `pnpm build` (31 pages generated).
