# Free Writing and WordPress Workflow

Obsidian is the local-first writing environment and WordPress.com is the publishing interface. Astro remains the public frontend and reads only the WordPress REST boundary.

## Publishing Flow

1. Write and organize the document in Obsidian as a local Markdown file.
2. Copy the rendered Markdown into a new WordPress.com post and choose `Draft` for review or `Publish` for an intentional public entry.
3. Set the title, slug, excerpt, featured image, language category and entry-type category before publishing.
4. Add native tags for discovery; add external URLs and type-specific context in the document until custom fields are available.
5. Verify the REST response and the Astro archive before considering the migration complete.

## First-Entry Acceptance Check

Use a throwaway, non-sensitive entry for the first connection:

1. Publish it as a draft and confirm it does not appear in the public Astro archive.
2. Publish the same post from WordPress.com and confirm its `slug`, language and entry category through the API.
3. Confirm the entry appears at the matching `/{lang}/archive/{type}/{slug}` URL after the next Astro build.
4. Update the entry in WordPress.com and confirm it keeps the same post identity.
5. Delete the throwaway entry after verification.

## Supported Defaults

- Obsidian handles local writing, Markdown and organization; WordPress.com handles authentication, title, body, excerpt, slug, status, categories, tags and featured image.
- WordPress native categories carry `entry:*`, `lang:*` and the primary category conventions from the editorial schema.
- Native tags remain the portable discovery mechanism.
- Custom fields are not assumed on WordPress.com Free; they can be added later through registered REST fields on self-hosted WordPress.
- Updating a post should use the existing WordPress post identity rather than creating a new slug.

## Safety Boundary

The target site is now provisioned, but the first-entry acceptance check remains a manual action in WordPress.com. The local Markdown collections remain the recoverable source during the transition. A post is not considered migrated until its public visibility, canonical slug, language, links and media have been checked through the API.
