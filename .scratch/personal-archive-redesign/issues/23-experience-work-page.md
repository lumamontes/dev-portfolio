# 23: Experience/Work Page from career-engine

**What to build:** A dedicated Work/Experience route showing Luma's employment and volunteer history (organization, dates, role, scope, responsibilities), sourced from the structured data already maintained in the separate `career-engine` project. Never contains projects or repository links.

**Blocked by:** None (can start immediately).

**Status:** ready-for-agent

- [ ] A one-time, manually re-run import script reads `career-engine`'s `career/experiences/*.md`, `career/achievements/*.md`, and `master-cv/master-resume-en.md`, and writes the result into this repo as a typed data source (not a live build-time dependency on the other, private, local-only repo).
- [ ] The Work/Experience page renders each role with organization, dates, title, scope, and responsibilities.
- [ ] A role that produced a notable open-source project links to that project's separate Archive entry rather than embedding or duplicating it.
- [ ] Expanding an experience item does not lose the visitor's scroll position (no forced scroll-down-then-scroll-back-up), on any screen size.
- [ ] Experience is not modeled as a canonical archive entry type — it has no editorial state or visibility field, consistent with `CONTEXT.md`.
- [ ] The page remains usable on mobile.
