import { z } from 'astro:content';

export const entryTypes = [
  'text',
  'learning-note',
  'book',
  'zine',
  'project',
  'photo',
  'photo-album',
  'music',
] as const;

export const entryTypeSchema = z.enum(entryTypes);

export const languageSchema = z.enum(['en', 'br']);

export const editorialStateSchema = z.enum([
  'idea',
  'draft',
  'pitch',
  'submitted',
  'editing',
  'published-here',
  'published-elsewhere',
  'archived',
]);

export const visibilitySchema = z.enum(['public', 'private']);

export const categorySchema = z.string().trim().min(1);
export const tagSchema = z.string().trim().min(1);

export const canonicalEntrySchema = z.object({
  type: entryTypeSchema,
  lang: languageSchema,
  editorialState: editorialStateSchema,
  visibility: visibilitySchema,
  category: categorySchema.optional(),
  tags: z.array(tagSchema).default([]),
});

const postFieldsSchema = z.object({
  title: z.string().trim().min(1),
  publishedAt: z.date(),
  description: z.string().trim().min(1),
  isPublish: z.boolean(),
  isDraft: z.boolean().default(false),
  lang: languageSchema,
  tags: z.array(tagSchema).default([]),
});

export const postSchema = postFieldsSchema.transform((entry) => {
  const canonicalFields = canonicalEntrySchema.parse({
    type: 'text',
    lang: entry.lang,
    editorialState:
      entry.isPublish && !entry.isDraft ? 'published-here' : 'draft',
    visibility: entry.isPublish && !entry.isDraft ? 'public' : 'private',
    tags: entry.tags,
  });

  return { ...entry, ...canonicalFields };
});

export const bookStatusSchema = z.enum([
  'reading',
  'completed',
  'want-to-read',
]);

export const bookFieldsSchema = z.object({
  title: z.string().trim().min(1),
  author: z.string().trim().min(1),
  status: bookStatusSchema.optional(),
  rating: z.number().min(1).max(5).optional(),
  genre: z.array(tagSchema).default([]),
  isbn: z.string().trim().min(1).optional(),
  pages: z.number().int().positive().optional(),
  dateStarted: z.date().optional(),
  dateCompleted: z.date().optional(),
  progress: z.number().min(0).max(100).optional(),
  cover: z.string().url().optional(),
  published: z.boolean().default(true),
});

export const bookSchemaForLanguage = (lang: Language) =>
  bookFieldsSchema.transform((book) => {
    const canonicalFields = canonicalEntrySchema.parse({
      type: 'book',
      lang,
      editorialState: book.published ? 'published-here' : 'draft',
      visibility: book.published ? 'public' : 'private',
      tags: book.genre,
    });

    return { ...book, ...canonicalFields };
  });

export type EntryType = z.infer<typeof entryTypeSchema>;
export type EditorialState = z.infer<typeof editorialStateSchema>;
export type Visibility = z.infer<typeof visibilitySchema>;
export type Language = z.infer<typeof languageSchema>;
