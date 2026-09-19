# 34: Remove About/Contact Pages and Consolidate Legacy Routes

**What to build:** Delete the standalone `/about` and `/contact` pages (now that their content lives on the homepage) along with their dead-theme components, update the "Work" nav tab to point at the new Experience route, and wire up redirects for all four remaining legacy routes.

**Blocked by:** 27 (Homepage: Absorb About/Contact Identity Content); 23 (Experience/Work Page from career-engine); 24 (Real Project Content Collection and GitHub Sweep Migration).

**Status:** ready-for-agent

- [ ] `about.astro` and `contact.astro` are deleted.
- [ ] `PageBackground.astro`, `BentoGrid.astro`, and `AboutStyles.astro` are deleted (used only by the pages being removed), along with `src/data/theme.ts`.
- [ ] The "Work" nav tab points at the new Experience/Work route (ticket 23) instead of `/projects`.
- [ ] `/about` and `/contact` redirect (301) to the homepage.
- [ ] `/til` redirects (301) to the Archive filtered to learning notes.
- [ ] `/projects` redirects (301) to the Archive filtered to `project` entries.
- [ ] All four redirects are added to the existing declarative `public/_redirects` table, alongside the existing book redirects.
- [ ] A test asserts every legacy URL recorded in `migration-inventory.md` resolves to its intended destination.
