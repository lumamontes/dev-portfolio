# 16: Ulysses Publishing Workflow

**What to build:** Allow Luma to write and publish WordPress content from Ulysses as drafts or published entries, using the standard metadata needed by the archive.

**Blocked by:** 14: WordPress Editorial Schema.

**Status:** needs-info

- [x] The Ulysses publishing workflow is defined for WordPress.
- [x] Draft and published states are mapped to the editorial boundary.
- [x] Slug, excerpt, categories, tags and featured image behavior is documented.
- [x] Updating an existing published entry is defined as an update by WordPress post identity.

## Remaining Manual Check

The WordPress.com site is provisioned. Authentication and live publish/update verification still require connecting Ulysses locally with a throwaway entry; no credentials are stored in the repository.

## Implementation Notes

- Added `docs/ulysses-wordpress-workflow.md`.
- The workflow keeps Ulysses focused on authoring and leaves public rendering to Astro.
