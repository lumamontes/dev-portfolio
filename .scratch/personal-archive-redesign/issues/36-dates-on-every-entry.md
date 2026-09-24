# 36: Dates on Every Entry (Published + Updated)

**What to build:** Every entry type carries a required publish date and an optional "updated" date, so the archive can be ordered chronologically and show when something was last revised. Only `posts`, `music` and `learning-notes` require `publishedAt` today; `photos`, `zines`, `projects` and `playlists` have none (photo/zine `date` is optional and means something else — when the photo was taken / zine was made). Nothing has an updated date.

**Blocked by:** None (can start immediately). Tickets 38 and 39 build on this.

**Status:** ready-for-agent

- [ ] `publishedAt` (when it was added to the archive) is required on every collection's schema in `src/lib/content-model.ts`; existing `date` fields on photos/zines keep their own meaning.
- [ ] An optional `updatedAt` field exists on every collection.
- [ ] Every existing entry has a `publishedAt`, in both language versions (paired `-en`/`-br` files share the same dates). Where no real date is known, use the file's first git commit date — never invent one.
- [ ] `ArchiveEntry` (`src/lib/archive-entries.ts`) exposes `publishedAt` and `updatedAt`.
- [ ] The portal page shows the publish date, and "updated <date>" when `updatedAt` is set.
- [ ] Tests cover the schema requirement.
