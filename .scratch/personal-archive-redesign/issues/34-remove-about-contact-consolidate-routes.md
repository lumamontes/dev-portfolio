# 34: Remove About/Contact Pages and Consolidate Legacy Routes

**What to build:** Delete the standalone `/about` and `/contact` pages (now that their content lives on the homepage) along with their dead-theme components, update the "Work" nav tab to point at the new Experience route, and wire up redirects for all four remaining legacy routes.

**Blocked by:** 27 (Homepage: Absorb About/Contact Identity Content); 23 (Experience/Work Page from career-engine); 24 (Real Project Content Collection and GitHub Sweep Migration).

**Status:** completed

- [x] `about.astro` and `contact.astro` are deleted.
- [x] `PageBackground.astro`, `BentoGrid.astro`, and `AboutStyles.astro` are deleted (used only by the pages being removed), along with `src/data/theme.ts`.
- [x] The "Work" nav tab points at the new Experience/Work route (ticket 23) instead of `/projects`.
- [x] `/about` and `/contact` redirect (301) to the homepage.
- [ ] `/til` redirects (301) to the Archive filtered to learning notes.
- [ ] `/projects` redirects (301) to the Archive filtered to `project` entries.
- [x] All four redirects are added to the existing declarative `public/_redirects` table, alongside the existing book redirects.
- [x] A test asserts every legacy URL recorded in `migration-inventory.md` resolves to its intended destination.

## Comments

- Closed 2026-09-24: pages, components and `theme.ts` are removed, and redirects are in `public/_redirects`. `/til` and `/projects` go to the unfiltered archive because the archive has no filters. Accepted as-is.
