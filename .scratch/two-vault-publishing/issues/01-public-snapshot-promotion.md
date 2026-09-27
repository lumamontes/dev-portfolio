# 01: Public Snapshot Promotion

**What to build:** A validated authoring-vault snapshot can be compared with the deploy vault and turned into an auditable plan of public additions and updates. Only entries with `visibility: public` and `editorialState: published-here` are eligible for promotion.

**Blocked by:** None (can start immediately)

**Status:** wontfix

Superseded: publishing is a deliberate local copy from the draft vault into the website vault; no promotion service is needed.

- [ ] The promotion boundary validates authoring entries using the canonical content model.
- [ ] Private, draft, submitted, editing and externally published entries are excluded from the public snapshot.
- [ ] The promotion plan reports additions and updates deterministically.
- [ ] Promoted files and assets are recorded in a manifest.
- [ ] Invalid eligible content fails the complete plan without producing partial output.
- [ ] GitHub repository access is isolated behind an adapter that can be replaced by a test fake.
- [ ] Focused tests cover eligibility, validation, additions, updates and all-or-nothing behavior.
