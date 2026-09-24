# 39: Feeds for the Whole Archive, per Language

**What to build:** `rss.xml` only includes posts and mixes both languages; `books-rss.xml` is separate; music, photos, learning notes, projects, zines and playlists have no feed. Replace this with one feed per language covering every public entry.

**Blocked by:** 36 (every entry needs a date to be a feed item).

**Status:** ready-for-agent

- [ ] `/en/rss.xml` and `/br/rss.xml` include every public entry type in that language, newest first, built from `getArchiveEntries` so the feed and archive can't disagree.
- [ ] Items use the entry's own portal URL, publish date, description, and category/tags.
- [ ] The existing `/rss.xml` keeps working (redirect or alias to the English feed) so current subscribers don't break. Decide whether `books-rss.xml` is kept or folded in.
- [ ] Each page's `<head>` advertises the feed for its language (`<link rel="alternate" type="application/rss+xml">`).
