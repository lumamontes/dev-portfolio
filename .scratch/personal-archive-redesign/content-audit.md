# WordPress Content Audit

## What I checked

- Local content inventory in `src/content/` against the public WordPress REST endpoint.
- Representative live posts for body formatting, taxonomy, title rendering and excerpt quality.

## Findings

- A large part of the local writing archive is still not present in WordPress. The missing set is mostly technical writing posts across both languages.
- Some live posts are missing the canonical `entry:*` and `lang:*` taxonomy that the Astro archive expects.
- A few older music posts are effectively raw notes rather than shaped archive entries.
- Some post bodies still contain unnormalized formatting such as run-on paragraphs, raw URLs, and title text that renders awkwardly because of HTML entities.

## Concrete examples

- `fletwood-mac` is published without the canonical entry taxonomy.
- `the-cranberries-everybody-else-is-doing-it-so-why-cant-we` is also uncategorized.
- `inicio-de-um-blog-aleatorio` has the correct taxonomy, but the body still reads like a draft note and could be structured more deliberately.

## Content format to standardize

- Every public post should have a clear title, short excerpt, canonical slug, `entry:*` category and `lang:*` category.
- Body copy should be broken into short paragraphs with intentional line breaks when the entry is a note, playlist or reflection.
- If a post links out to a source or playlist, the external link should be obvious and consistent.
- Music entries should read like archive notes, not pasted listening logs.
- Technical writing should keep the same information but use a cleaner, more editorial paragraph structure.

## Recommended next cleanup pass

1. Migrate the remaining missing technical posts into WordPress.
2. Add or repair canonical taxonomy on existing WordPress posts.
3. Normalize older music entries so they match the current archive voice.
4. Review excerpts and titles for HTML-entity cleanup and readability.
5. Decide which entries should stay deliberately informal and which should be rewritten into the new archive format.