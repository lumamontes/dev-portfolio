# Ulysses and WordPress Workflow

Ulysses is the authoring client for normal WordPress posts. Astro remains the public frontend and reads only the WordPress REST boundary.

## Publishing Flow

1. Connect Ulysses to the provisioned WordPress.com site using its WordPress publishing integration.
2. Write the document in Ulysses and choose `Draft` for review or `Publish` for an intentional public entry.
3. Set the title, slug, excerpt, featured image, language category and entry-type category before publishing.
4. Add native tags for discovery; add external URLs and type-specific context in the document until custom fields are available.
5. Verify the REST response and the Astro archive before considering the migration complete.

## Supported Defaults

- Ulysses handles standard post authentication, title, body, excerpt, slug, status and featured image where the integration exposes them.
- WordPress native categories carry `entry:*`, `lang:*` and the primary category conventions from the editorial schema.
- Native tags remain the portable discovery mechanism.
- Custom fields are not assumed on WordPress.com Free; they can be added later through registered REST fields on self-hosted WordPress.
- Updating a post should use the existing WordPress post identity rather than creating a new slug.

## Safety Boundary

Do not connect Ulysses or run an import until the target site is confirmed. The local Markdown collections remain the recoverable source during the transition. A post is not considered migrated until its public visibility, canonical slug, language, links and media have been checked through the API.
