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

  const items = shelves.flatMap((shelf) =>
    shelf.data.books.map((book) => ({
      title: `${book.title} — ${book.author}`,
      description: shelf.data.description,
      link: `/${shelf.data.lang}/archive/book/${shelf.slug}/`,
      pubDate: shelf.data.publishedAt,
    })),
  );

  return rss({
    title: `${SITE_TITLE} books`,
    description: SITE_DESCRIPTION,
    site: context.site,
    items,
  });
}
