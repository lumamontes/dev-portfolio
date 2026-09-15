# WordPress Boundary

Astro reads public WordPress content through `src/lib/wordpress.ts`. The client accepts any WordPress REST posts endpoint, so the frontend does not depend on a WordPress theme or rendering.

## Public contract

- Requests always include `status=publish` and discard any response item that is not published.
- The caller supplies the independent language value (`en` or `br`); missing language variants are not generated.
- Pagination is controlled with `page` and `per_page` and reports `nextPage` from `X-WP-TotalPages`.
- Featured media is read from `_embed`; missing media is valid.
- Network and HTTP failures return an empty page with an explicit `error`, allowing the local archive to remain usable.

Set `WORDPRESS_API_URL` to a public endpoint such as `https://public-api.wordpress.com/wp/v2/sites/example.wordpress.com/posts` when the WordPress.com site is provisioned. Authentication is not needed for public reads and must not be required by the public build.

Spotify is intentionally outside this boundary. Selected playlists and live listening require separate integrations with independent privacy and fallback rules.
