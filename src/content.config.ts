import { defineCollection } from 'astro:content';
import {
  bookSchemaForLanguage,
  learningNoteSchema,
  postSchema,
  photoSchema,
  musicSchema,
  zineSchema,
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

const learningNotes = defineCollection({
  type: 'content',
  schema: learningNoteSchema,
});

const zines = defineCollection({
  type: 'content',
  schema: zineSchema,
});

const photos = defineCollection({
  type: 'content',
  schema: photoSchema,
});

const music = defineCollection({
  type: 'content',
  schema: musicSchema,
});

export const collections = {
  posts,
  'books-en': booksEn,
  'books-br': booksBr,
  'learning-notes': learningNotes,
  zines,
  photos,
  music,
};
