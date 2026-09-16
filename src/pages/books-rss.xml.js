import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';
import { isPublicEntry } from '../lib/content-model';

export async function GET(context) {
  const books = [
    ...(await getCollection('books-en')),
    ...(await getCollection('books-br')),
  ].filter(isPublicEntry);

  return rss({
    title: `${SITE_TITLE} books`,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: books.map((book) => ({
      ...book.data,
      link: `/${book.data.lang}/archive/book/${book.slug}/`,
    })),
  });
}
