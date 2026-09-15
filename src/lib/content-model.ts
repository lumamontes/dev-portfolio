import { z } from 'astro:content';

export const entryTypes = [
  'text',
  'learning-note',
  'book',
  'zine',
  'project',
  'photo',
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
const validDateSchema = z.date().refine((date) => !Number.isNaN(date.getTime()), {
  message: 'Date must be valid',
});

export const canonicalEntrySchema = z.object({
  type: entryTypeSchema,
  lang: languageSchema,
  editorialState: editorialStateSchema,
  visibility: visibilitySchema,
  category: categorySchema.optional(),
  tags: z.array(tagSchema).default([]),
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

const optionalCanonicalFieldsSchema = z.object({
  editorialState: editorialStateSchema.optional(),
  visibility: visibilitySchema.optional(),
  category: categorySchema.optional(),
});

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
  publishedAt: validDateSchema,
  description: z.string().trim().min(1),
  format: z.enum(['long', 'short']).default('long'),
  isPublish: z.boolean(),
  isDraft: z.boolean().default(false),
  lang: languageSchema,
  tags: z.array(tagSchema).default([]),
}).merge(optionalCanonicalFieldsSchema);

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

  return {
    ...entry,
    ...fields,
    isPublish: fields.visibility === 'public',
    isDraft: fields.editorialState === 'draft',
  };
});

const learningNoteFieldsSchema = z.object({
  title: z.string().trim().min(1),
  publishedAt: validDateSchema,
  description: z.string().trim().min(1),
  lang: languageSchema,
  tags: z.array(tagSchema).default([]),
  sourceUrl: z.string().url().optional(),
}).merge(optionalCanonicalFieldsSchema);

export const learningNoteSchema = learningNoteFieldsSchema.transform((entry) => ({
  ...entry,
  ...canonicalFields({
    type: 'learning-note',
    lang: entry.lang,
    editorialState: entry.editorialState,
    visibility: entry.visibility,
    fallbackEditorialState: 'published-here',
    fallbackVisibility: 'public',
    category: entry.category,
    tags: entry.tags,
  }),
}));

const zineFieldsSchema = z.object({
  title: z.string().trim().min(1),
  authors: z.array(z.string().trim().min(1)).min(1),
  description: z.string().trim().min(1),
  context: z.string().trim().min(1),
  date: validDateSchema.optional(),
  cover: z.string().url().optional(),
  externalUrl: z.string().url(),
  lang: languageSchema,
  tags: z.array(tagSchema).default([]),
}).merge(optionalCanonicalFieldsSchema);

export const zineSchema = zineFieldsSchema.transform((entry) => ({
  ...entry,
  ...canonicalFields({
    type: 'zine',
    lang: entry.lang,
    editorialState: entry.editorialState,
    visibility: entry.visibility,
    fallbackEditorialState: 'published-here',
    fallbackVisibility: 'public',
    category: entry.category,
    tags: entry.tags,
  }),
}));

const photoImageSchema = z.object({
  src: z.string().trim().min(1),
  alt: z.string().trim().min(1),
  caption: z.string().trim().optional(),
  credit: z.string().trim().optional(),
  width: z.number().int().positive().optional(),
  height: z.number().int().positive().optional(),
});

const photoFieldsSchema = z.object({
  title: z.string().trim().min(1),
  description: z.string().trim().min(1),
  images: z.array(photoImageSchema).min(1),
  date: validDateSchema.optional(),
  place: z.string().trim().optional(),
  context: z.string().trim().optional(),
  externalUrl: z.string().url().optional(),
  lang: languageSchema,
  tags: z.array(tagSchema).default([]),
}).merge(optionalCanonicalFieldsSchema);

export const photoSchema = photoFieldsSchema.transform((entry) => ({
  ...entry,
  ...canonicalFields({
    type: 'photo',
    lang: entry.lang,
    editorialState: entry.editorialState,
    visibility: entry.visibility,
    fallbackEditorialState: 'published-here',
    fallbackVisibility: 'public',
    category: entry.category,
    tags: entry.tags,
  }),
}));

const musicFieldsSchema = z.object({
  title: z.string().trim().min(1),
  publishedAt: validDateSchema,
  description: z.string().trim().min(1),
  kind: z.enum(['authored', 'automated']),
  sourceUrl: z.string().url(),
  image: z.string().url().optional(),
  lang: languageSchema,
  tags: z.array(tagSchema).default([]),
}).merge(optionalCanonicalFieldsSchema);

export const musicSchema = musicFieldsSchema.transform((entry) => ({
  ...entry,
  ...canonicalFields({
    type: 'music',
    lang: entry.lang,
    editorialState: entry.editorialState,
    visibility: entry.visibility,
    fallbackEditorialState: 'published-here',
    fallbackVisibility: 'public',
    category: entry.category,
    tags: entry.tags,
  }),
}));

export const bookFieldsSchema = z.object({
  title: z.string().trim().min(1),
  author: z.string().trim().min(1),
  cover: z.string().url().optional(),
  published: z.boolean().default(true),
}).merge(optionalCanonicalFieldsSchema);

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
      tags: [],
    });

    return {
      ...book,
      ...fields,
      published: fields.visibility === 'public',
    };
  });

export type EntryType = z.infer<typeof entryTypeSchema>;
export type EditorialState = z.infer<typeof editorialStateSchema>;
export type Visibility = z.infer<typeof visibilitySchema>;
export type Language = z.infer<typeof languageSchema>;

type EntryWithPublicationMetadata = {
  data: {
    visibility: Visibility;
    lang: Language;
    editorialState: EditorialState;
  };
};

export function isPublicEntry(entry: EntryWithPublicationMetadata) {
  return (
    entry.data.visibility === 'public' &&
    ['published-here', 'published-elsewhere'].includes(entry.data.editorialState)
  );
}

export function isPublicEntryInLanguage(
  entry: EntryWithPublicationMetadata,
  lang: Language,
) {
  return isPublicEntry(entry) && entry.data.lang === lang;
}
