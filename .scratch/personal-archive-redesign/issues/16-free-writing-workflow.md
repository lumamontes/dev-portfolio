# 16: Free Writing and WordPress Workflow

**What to build:** Allow Luma to write in a free local Markdown tool and publish WordPress content through WordPress.com as drafts or published entries, using the standard metadata needed by the archive.

**Blocked by:** 14: WordPress Editorial Schema.

**Status:** completed

- [x] The free Obsidian-to-WordPress.com workflow is defined.
- [x] Draft and published states are mapped to the editorial boundary.
- [x] Slug, excerpt, categories, tags and featured image behavior is documented.
- [x] Updating an existing published entry is defined as an update by WordPress post identity.

## Scope Boundary

No publishing plugin or custom bridge is required for the initial free workflow. Obsidian is used for writing, while WordPress.com handles authentication, metadata, media and publishing.

## Implementation Notes

- Added `docs/wordpress-writing-workflow.md`.
- The workflow keeps Obsidian focused on authoring and leaves publishing and public rendering to WordPress.com and Astro.
