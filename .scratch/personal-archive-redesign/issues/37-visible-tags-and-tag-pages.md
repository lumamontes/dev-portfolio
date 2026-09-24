# 37: Visible Tags and Tag Pages

**What to build:** Every entry already has `tags` and an optional `category`, but they're never shown. Surface them on the portal page and generate one page per tag listing every entry with it, across all entry types, so a visitor can follow a topic (e.g. "Zines", "React Native") instead of only browsing by type.

**Blocked by:** None (can start immediately).

**Status:** ready-for-agent

- [ ] Tags are normalized (case-insensitive; "Community"/"community" collapse to one tag). Decide and document how translated tags pair up ("Community" ↔ "Comunidade") so the language picker lands on the equivalent tag page — simplest is a small EN↔BR tag map in `src/data/`.
- [ ] The portal page lists the entry's category and tags, each linking to its tag page.
- [ ] `/<lang>/archive/tag/<tag>` lists every public entry in that language with the tag, grouped the same way as the archive index.
- [ ] The archive index links to the tag list (or a tag index page).
- [ ] Machine tags that aren't topics (`listening-log`, `music-logger`, `playlist`, `Spotify`) are either excluded or renamed — decide per tag.
