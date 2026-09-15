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

export const entrySchema = canonicalEntrySchema.extend({
  title: z.string().trim().min(1),
  description: z.string().trim().min(1).optional(),
});

type CanonicalFieldInput = {
  type: EntryType;
  lang: Language;
  editorialState?: EditorialState;
  visibility?: Visibility;
  fallbackEditorialState: EditorialState;
  fallbackVisibility: Visibility;
  category?: string;
  tags: string[];
};

function canonicalFields({
  type,
  lang,
  editorialState,
  visibility,
  fallbackEditorialState,
  fallbackVisibility,
  category,
  tags,
}: CanonicalFieldInput) {
  return canonicalEntrySchema.parse({
    type,
    lang,
    editorialState: editorialState ?? fallbackEditorialState,
    visibility: visibility ?? fallbackVisibility,
    category,
    tags,
  });
}

const postFieldsSchema = z.object({
  title: z.string().trim().min(1),
  publishedAt: z.date(),
  description: z.string().trim().min(1),
  isPublish: z.boolean(),
  isDraft: z.boolean().default(false),
  lang: languageSchema,
  editorialState: editorialStateSchema.optional(),
  visibility: visibilitySchema.optional(),
  category: categorySchema.optional(),
  tags: z.array(tagSchema).default([]),
});

export const postSchema = postFieldsSchema.transform((entry) => {
  const fields = canonicalFields({
    type: 'text',
    lang: entry.lang,
    editorialState: entry.editorialState,
    visibility: entry.visibility,
    fallbackEditorialState:
      entry.isPublish && !entry.isDraft ? 'published-here' : 'draft',
    fallbackVisibility: entry.isPublish && !entry.isDraft ? 'public' : 'private',
    category: entry.category,
    tags: entry.tags,
  });

  return { ...entry, ...fields };
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
  editorialState: editorialStateSchema.optional(),
  visibility: visibilitySchema.optional(),
  category: categorySchema.optional(),
  published: z.boolean().default(true),
});

export const bookSchemaForLanguage = (lang: Language) =>
  bookFieldsSchema.transform((book) => {
    const fields = canonicalFields({
      type: 'book',
      lang,
      editorialState: book.editorialState,
      visibility: book.visibility,
      fallbackEditorialState: book.published ? 'published-here' : 'draft',
      fallbackVisibility: book.published ? 'public' : 'private',
      category: book.category,
      tags: book.genre,
    });

    return { ...book, ...fields };
  });

export type EntryType = z.infer<typeof entryTypeSchema>;
export type EditorialState = z.infer<typeof editorialStateSchema>;
export type Visibility = z.infer<typeof visibilitySchema>;
export type Language = z.infer<typeof languageSchema>;
