# WordPress Migration Plan

The migration is intentionally a separate step from the public API client. It runs against the provisioned WordPress.com site and should never rewrite or delete the local sources automatically.

## Source Mapping

| Local source | WordPress representation | Public rule |
| --- | --- | --- |
| Posts | Standard post with `entry:text` and `lang:*` categories | Publish only entries passing the canonical public boundary. |
| Learning notes | Standard post with `entry:learning-note` | Preserve source URL and tags. |
| Books | Standard post with `entry:book` | Preserve title, author, cover and impression only. |
| Projects | Standard post with `entry:project` | Preserve bilingual descriptions and external URL. |
| Zines | Standard post with `entry:zine` | Preserve authors, context, cover and Biblioteca de Zines URL. |
| Photos | Standard post with `entry:photo` | Upload only selected images after credit review. |
| Music | Standard post with `entry:music` | Preserve `authored` versus `automated` kind and original URL. |

## Execution Rules

- Export or snapshot the local Markdown/data sources before any import.
- Use the canonical slug as the idempotency key; never create a second entry for an existing slug.
- Keep private and draft entries private or out of the public backend entirely.
- Preserve the original source URL in metadata or the body when no custom field is available.
- Upload media only after ownership, credits and remote URL availability are verified.
- Run a dry-run report before creating or updating any WordPress content.
- After import, compare title, slug, language, visibility, tags, external links and representative body content.
- Do not cut Astro over to WordPress until the public API returns representative entries and the local fallback remains available.

## Provisioned Target

- WordPress.com site: `https://tururu61.wordpress.com/`
- Public REST endpoint: `https://public-api.wordpress.com/wp/v2/sites/tururu61.wordpress.com/posts`
- The public endpoint exposes only published entries; private editorial entries are not returned.

## Required Inputs

- A provisioned WordPress.com site and its public REST posts endpoint.
- A decision about which private drafts should be copied to WordPress.
- Any custom fields that the Free editor cannot represent in the post body.
- A reviewed list of media credits and selected photo assets.

The importer is not run as part of `pnpm build`; this prevents a network failure or accidental credential from affecting local development or public static output. The Astro client uses the public endpoint at build time and falls back to local content when it is unavailable.
