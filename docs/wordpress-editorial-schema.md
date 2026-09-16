# WordPress Editorial Schema

The public model remains the source of truth. WordPress stores the same information in a portable way so the initial WordPress.com Free site can later move to self-hosted WordPress without changing Astro's content contract.

## Entry Mapping

| Canonical field | WordPress.com Free | Notes |
| --- | --- | --- |
| `type` | Category `entry:{type}` | Keeps the model usable without custom post types or plugins. |
| `lang` | Category `lang:{en\|br}` | Each language is an independent entry. |
| `editorialState` | Private custom field or editorial convention | WordPress `draft`/`publish` controls workflow; Astro still applies its own public boundary. |
| `visibility` | WordPress status plus `visibility:private` convention | Never infer public visibility from a missing field. |
| `category` | Native category | Initial values include `Technology`, `Zines`, `Music` and `Fotografia`. |
| `tags` | Native tags | Free-form discovery metadata. |
| `cover` and media | Featured image / media library | Astro consumes the public media URL, never WordPress theme markup. |
| `externalUrl` | Custom field or canonical link in content | Used for zines, external publications and music sources. |

## Type-Specific Fields

- `text`: `format` (`long` or `short`) and description.
- `learning-note`: source URL and short technical body.
- `book`: author, optional cover and personal impression.
- `zine`: authors, context, optional date, optional cover and external URL.
- `project`: bilingual description, technology tags and external URL.
- `photo`: ordered image list, captions, credits, dimensions, date, place and context.
- `music`: `kind` (`authored` or `automated`), source URL and optional image.

WordPress.com Free can begin with standard posts, native categories/tags and media. Structured fields that cannot be exposed through the free editor should remain in the post body until the backend supports custom fields. Self-hosted WordPress can later promote these types to custom post types and registered REST fields without changing the Astro-side normalized shape.

## Editorial Rules

- The writing tool produces normal authored posts through WordPress.com; it does not need to know about the Astro frontend.
- Draft, private and otherwise non-public entries are excluded by the API boundary.
- `published-elsewhere` entries remain public only when their source URL is intentional.
- Automated music entries are labeled as automated and never replace authored music writing.
- WordPress themes, blocks and rendered HTML are not part of the public site contract.
