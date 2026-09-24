# 24: Real Project Content Collection and GitHub Sweep Migration

**What to build:** Replace the hardcoded project data source (ticket 10) with a real `project` content collection/schema, and populate it with both the already-known projects and the curated set of additional public and private GitHub repositories identified during planning.

**Blocked by:** None (can start immediately).

**Status:** completed

- [x] `project` (already declared in `entryTypes`) gets a real backing collection/schema — title, description, tech stack, external/repo link, live-preview link where applicable, role, period, cover image — following the same canonical-fields pattern as the existing `zine`/`photo`/`music` schemas.
- [x] The existing hardcoded project data (the old `src/data/projects.ts` and the inline project list in the legacy projects page) is migrated into this collection, losing no existing bilingual descriptions or external links.
- [x] The following curated projects are added as new entries: `kettle`, `bugbash`, `external-resources-monitoring-cli`, `planetario`, `focar`, `luanis`, `pedrito`, `amazine`, `caninoszine`, `tasksz`, `japiim`, `db-lab`, `technical-docs-portal`.
- [x] Every project entry passes public-selection and content-schema validation (extending the existing `isPublicEntry` test coverage to this collection).
- [x] Project entries appear in the Archive with a distinct external-link presentation, consistent with how zines already link out to Biblioteca de Zines.

## Comments

- Verified 2026-09-24: `projects` collection holds 16 projects (all in EN and BR); `src/data/projects.ts` no longer exists.
