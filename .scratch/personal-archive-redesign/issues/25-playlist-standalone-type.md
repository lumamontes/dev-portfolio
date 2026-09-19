# 25: Playlist Entries as a Standalone Type

**What to build:** Reclassify playlists out of the `music` entry type into their own minimal entry type — name, cover image, destination link, and an optional short note/observation — per the updated domain model in `CONTEXT.md`. Not a full Spotify-embed treatment.

**Blocked by:** None (can start immediately).

**Status:** ready-for-agent

- [ ] `playlist` is added to `entryTypes` in `src/lib/content-model.ts`, with its own schema (title, cover, destination link, optional note).
- [ ] `musicFieldsSchema`'s description no longer includes playlists.
- [ ] The 5 existing WordPress playlist entries (currently modeled as `music` entries with Spotify embeds, from ticket 19) are migrated into the new `playlist` shape, with no data loss (source platform and link preserved).
- [ ] A playlist renders as a lightweight card (name, cover, link out), not a full music-writing page.
- [ ] The optional note field, when present, displays alongside the card.
- [ ] Covered by the same content-schema validation used for other entry types.
