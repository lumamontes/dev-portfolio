import { defineCollection, z } from 'astro:content';
import {
  categorySchema,
  entryTypeSchema,
  languageSchema,
  tagSchema,
  bookFieldsSchema,
} from './lib/content-model';

const posts = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		publishedAt: z.date(),
		description: z.string(),
		isPublish: z.boolean(),
		isDraft: z.boolean().default(false),
		lang: languageSchema,
		type: entryTypeSchema.extract(['text']).default('text'),
		category: categorySchema.optional(),
		tags: z.array(tagSchema).default([]),
	}),
});

const books = defineCollection({
  type: 'content',
  schema: bookFieldsSchema,
});

export const collections = {
  posts,
  'books-en': books,
  'books-br': books,
};
