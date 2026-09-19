# 35: Codebase Cleanup: Orphaned Components and Dead Assets

**What to build:** Remove code and assets left over from earlier design iterations that are unrelated to the About/Contact removal (ticket 34) — no page currently imports them.

**Blocked by:** None (can start immediately).

**Status:** ready-for-agent

- [ ] `src/components/projects/ProjectsGrid.astro` and `ProjectCard.astro` are deleted (confirmed unused by any current page).
- [ ] The unused `Open Sans` font token in `tailwind.config.cjs` is removed (never loaded via `<link>` or `@font-face`).
- [ ] The unreferenced local font files under `public/fonts/` (`atkinson-bold.woff`, `atkinson-regular.woff`) are deleted.
- [ ] A build after these removals succeeds with no missing-reference errors.
