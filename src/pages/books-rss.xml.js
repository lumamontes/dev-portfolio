import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';
import { isPublicEntry } from '../lib/content-model';

// One item per book, not per shelf file — a shelf entry holds many books
// (see content-model.ts's favoriteBookSchema), and a subscriber wants each
// book as its own item, not one item per language covering the whole shelf.
export async function GET(context) {
  const shelves = [
    ...(await getCollection('books-en')),
    ...(await getCollection('books-br')),
  ].filter(isPublicEntry);

  // No pubDate: a book shelf has no per-book publish date (see
  // bookFieldsSchema in content-model.ts) — it's a living list, not a
  // dated post. @astrojs/rss treats pubDate as optional and omits it
  // when absent, rather than emitting an invalid one.
  const items = shelves.flatMap((shelf) =>
    shelf.data.books.map((book) => ({
      title: `${book.title} — ${book.author}`,
      description: shelf.data.description,
      link: `/${shelf.data.lang}/archive/book/${shelf.id}/`,
    })),
  );

  return rss({
    title: `${SITE_TITLE} books`,
    description: SITE_DESCRIPTION,
    site: context.site,
    items,
  });
}
