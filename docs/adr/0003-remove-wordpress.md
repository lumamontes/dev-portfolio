# Markdown in the repository is the only content source; WordPress is removed

WordPress.com was adopted as a free hosted CMS, with Astro fetching its REST API at build time. In practice the local Markdown collections became canonical for every entry type: text, project and book entries were migrated locally and WordPress posts of those types were filtered out as duplicates; photo, zine and learning-note posts never matched the importer's type check; and the remaining music posts duplicated local files word for word. The only content WordPress uniquely held was five playlist pointers, which are now local `playlists` entries.

Keeping it meant a second source of truth that could silently shadow local files (WordPress won on slug collisions), a network dependency in every build, and an asymmetry that left content present in one language and missing in the other. So WordPress is removed entirely: the API client, the migration/auth scripts, their npm scripts and docs.

Content is written as Markdown and published by committing it. If an editing UI is wanted later, it should be an open-source git-based CMS (e.g. Keystatic, Decap, Sveltia) that edits these same files, rather than reintroducing a separate hosted content store.

Existing `sourceUrl` links on music entries still point at the original WordPress.com posts as provenance; they are external links, not a dependency, and will break only if that blog is deleted.
