# 38: Links Between Entries (Related + Backlinks)

**What to build:** Entries that are about the same thing don't point to each other. The zine essay, the Biblioteca de Zines project, the Gêmulas zine and Amazine are one story told across four entries. Add explicit relations plus automatic backlinks.

**Blocked by:** None; nicer after 37 (tags can seed suggestions).

**Status:** ready-for-agent

- [ ] Every collection's schema accepts an optional `related` list of entry references (`type/slug`, using route slugs so one reference works for both language versions). Invalid references fail the build.
- [ ] Backlinks are computed automatically: if A lists B in `related`, B's page shows A under a "mentioned in" section without B having to list A. Markdown links in an entry body that point at another archive entry also count.
- [ ] The portal page shows "Related" and "Mentioned in" sections, in the current language.
- [ ] `relatedProjectSlug` in `src/data/experience.ts` is wired to real project entries where one exists (it's currently never set). Because that file is generated, this likely goes in `scripts/import-career-engine.mjs` or the career-engine source.
- [ ] Seed the obvious clusters: zines (essay, Biblioteca de Zines, Gêmulas, Amazine, caninoszine), Pupunha Code (project, conference-app learning note), Tarefitas (project, monorepo/docker/backup notes).
