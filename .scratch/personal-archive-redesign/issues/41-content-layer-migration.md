# 41: Migrate Content Collections to the Content Layer API

**What to build:** `src/content.config.ts` defines every collection with the older `type: 'content'` API. Astro 5 still supports it for backward compatibility, but the docs now recommend the Content Layer API (`loader: glob(...)`), and a future major version is expected to drop the old style. Move all 9 collections to `glob()` loaders with no change to any public URL.

**Blocked by:** None (can start immediately). Do it before any Astro 6 upgrade. It's easier before tickets 36–39 add more code that reads entry slugs.

**Status:** ready-for-agent

- [ ] Every collection in `src/content.config.ts` uses `loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/<collection>' })` instead of `type: 'content'`. The existing schemas from `src/lib/content-model.ts` are reused unchanged, including their `.transform()`s.
- [ ] Every `entry.slug` read is replaced with `entry.id`. The known call sites are:
  - `src/lib/archive-entries.ts` (every collection mapping, plus the project dedupe by `routeSlug`)
  - `src/pages/[lang]/archive/[type]/[slug].astro` (`getStaticPaths` params and `currentSlug`)
  - `src/pages/rss.xml.js`
  - `src/pages/books-rss.xml.js`
- [ ] `entry.render()` in `[slug].astro` becomes `render(entry)` imported from `astro:content`.
- [ ] Posts are nested as `posts/<lang>/<slug>.md`. Confirm the new `id` still has the `en/…` / `br/…` shape the code splits on (`id.split('/').pop()`), or simplify that logic if it doesn't.
- [ ] Confirm the generated `id`s match today's slugs exactly, including casing and special characters. If any differ, pass a `generateId` to `glob()` rather than letting URLs change.
- [ ] **URL parity check:** the sorted list of built pages under `dist/` is identical before and after (currently 143 pages; 71 archive pages per language). Record both lists in this ticket's comments.
- [ ] `pnpm test` and `pnpm build` pass with no new warnings. In particular, there's no legacy-collections deprecation warning.

## Notes

- Out of scope: converting content to MDX. `@astrojs/mdx` is already installed, and the `{md,mdx}` glob pattern above means any entry can be renamed to `.mdx` later, one at a time. Good first candidates are the 4 music posts with raw YouTube `<iframe>`s (Warpaint and Fleetwood Mac, EN and BR), which would switch to a `<YouTube id="…" />` component.
