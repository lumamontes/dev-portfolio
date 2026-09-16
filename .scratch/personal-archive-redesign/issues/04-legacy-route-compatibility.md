# 04: Legacy Route Compatibility

**What to build:** Preserve existing public post, book, TIL, language and RSS links, redirecting only routes that intentionally change.

**Blocked by:** 03: Public Content Selection Boundary.

**Status:** completed

- [x] Existing public routes resolve to the correct entry.
- [x] Intentional route changes have permanent redirects.
- [x] Language-specific routes do not cross into the wrong content variant.
- [x] Existing RSS endpoints continue to expose valid public content.

## Implementation Notes

- Preserved `/lang/posts`, `/lang/til`, `/lang/projects`, `/lang/about` and `/lang/contact`.
- Redirected legacy book index and detail routes to the canonical archive with Cloudflare Pages 301 rules.
- Restored `/books-rss.xml` with public bilingual book entries and canonical archive links.
