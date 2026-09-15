import { defineCollection } from 'astro:content';
import {
  bookSchemaForLanguage,
  postSchema,
} from './lib/content-model';

const posts = defineCollection({
	type: 'content',
	schema: postSchema,
});

const booksEn = defineCollection({
  type: 'content',
  schema: bookSchemaForLanguage('en'),
});

const booksBr = defineCollection({
  type: 'content',
  schema: bookSchemaForLanguage('br'),
});

export const collections = {
  posts,
  'books-en': booksEn,
  'books-br': booksBr,
};
