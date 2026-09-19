# 19: Playlist Entries and Embeds

**What to build:** Let Luma publish selected playlists as intentional music entries or embeds that fit the archive's visual language.

**Blocked by:** 12: Music Entries and Music Blog Migration.

**Status:** completed

**Superseded by:** 25 (playlists move from being WordPress `music` entries with Spotify embeds to their own standalone entry type — name, cover, link, optional note — per the updated domain model in `CONTEXT.md`; the 5 existing playlist entries get reclassified, not discarded).

- [x] A playlist can be represented as an archive entry or embedded experience.
- [x] The source platform and attribution are visible.
- [x] The page remains useful when embeds are blocked or unavailable.
- [x] Playlist content does not require live listening permissions.

## Implementation Notes

- Added five selected Spotify playlists as WordPress music entries.
- Each entry includes a responsive Spotify embed and a direct Spotify fallback link.
