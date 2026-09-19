# 33: Named External Article Migration Script

**What to build:** A script that migrates the specifically identified externally-published articles into the canonical content system as real entries, per `docs/adr/0002-external-entry-preview-strategy.md`: two dev.to posts under `lumamontes`, one dev.to post under `pupunhacode`, the arcotech guest post, and the zine Substack post.

**Blocked by:** None (can start immediately).

**Status:** ready-for-agent

- [ ] Each of the five named articles is migrated into WordPress/local content as a canonical entry with `editorialState: published-elsewhere` and an external publication link field pointing to the original.
- [ ] The migrated content is the full article text/body, not a summary or live-fetched excerpt.
- [ ] No live fetching, polling, or scraping machinery is built — content is copied once by the script.
- [ ] Each migrated entry's portal view shows a clear "originally published at ___" link.
- [ ] Migrated entries pass the same public-selection and schema validation as any other text entry.
