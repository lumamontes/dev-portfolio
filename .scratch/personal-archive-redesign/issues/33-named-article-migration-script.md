# 33: Named External Article Migration Script

**What to build:** A script that migrates the specifically identified externally-published articles into the canonical content system as real entries, per `docs/adr/0002-external-entry-preview-strategy.md`: two dev.to posts under `lumamontes`, one dev.to post under `pupunhacode`, the arcotech guest post, and the zine Substack post.

**Blocked by:** None (can start immediately).

**Status:** completed

- [x] Each of the five named articles is migrated into WordPress/local content as a canonical entry with `editorialState: published-elsewhere` and an external publication link field pointing to the original.
- [x] The migrated content is the full article text/body, not a summary or live-fetched excerpt.
- [x] No live fetching, polling, or scraping machinery is built — content is copied once by the script.
- [x] Each migrated entry's portal view shows a clear "originally published at ___" link.
- [x] Migrated entries pass the same public-selection and schema validation as any other text entry.

## Comments

- Verified 2026-09-24: all named articles are migrated into `posts` with `externalUrl` provenance. The WordPress part is obsolete (ADR 0003).
