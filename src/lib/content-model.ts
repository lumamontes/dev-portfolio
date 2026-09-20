import { z } from 'astro:content';

export const entryTypes = [
  'text',
  'learning-note',
  'book',
  'zine',
  'project',
  'photo',
  'music',
  'playlist',
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
  // Set for a post migrated in from somewhere it was originally published
  // (editorialState: 'published-elsewhere') — shown as provenance, never
  // fetched live. See docs/adr/0002-external-entry-preview-strategy.md.
  externalUrl: z.string().url().optional(),
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
  // A locally hosted PDF of the zine itself (e.g. /zines/gemulas.pdf under
  // public/), rendered inline in the portal so the zine is actually
  // readable on this site — externalUrl remains the Biblioteca de Zines
  // reference link, shown alongside it, not a substitute for it.
  pdfUrl: z.string().trim().optional(),
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

const projectFieldsSchema = z.object({
  title: z.string().trim().min(1),
  description: z.string().trim().min(1),
  role: z.string().trim().optional(),
  period: z.string().trim().optional(),
  stack: z.array(z.string().trim().min(1)).default([]),
  // Omitted entirely for private-repo projects with no safe public
  // destination to link to (see docs/adr/0002).
  externalUrl: z.string().url().optional(),
  // Set only after manually verifying the destination sends no framing
  // restriction — never inferred. See docs/adr/0002.
  embeddable: z.boolean().default(false),
  cover: z.string().url().optional(),
  lang: languageSchema,
  tags: z.array(tagSchema).default([]),
}).merge(optionalCanonicalFieldsSchema);

export const projectSchema = projectFieldsSchema.transform((entry) => ({
  ...entry,
  ...canonicalFields({
    type: 'project',
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

// A playlist is a lightweight pointer to a collection hosted elsewhere —
// name, cover, destination link, optional note — not authored music
// writing. See CONTEXT.md's "playlist entry" definition.
const playlistFieldsSchema = z.object({
  title: z.string().trim().min(1),
  cover: z.string().url().optional(),
  externalUrl: z.string().url(),
  note: z.string().trim().optional(),
  lang: languageSchema,
  tags: z.array(tagSchema).default([]),
}).merge(optionalCanonicalFieldsSchema);

export const playlistSchema = playlistFieldsSchema.transform((entry) => ({
  ...entry,
  ...canonicalFields({
    type: 'playlist',
    lang: entry.lang,
    editorialState: entry.editorialState,
    visibility: entry.visibility,
    fallbackEditorialState: 'published-here',
    fallbackVisibility: 'public',
    category: entry.category,
    tags: entry.tags,
  }),
}));

// A single "shelf" entry per language — favorite books, not book reviews.
// One archive entry holds many books (cover/title/author/link each), rather
// than one entry per book, per the explicit decision that a per-book index
// entry doesn't scale and isn't the point (there's no review prose here).
const favoriteBookSchema = z.object({
  title: z.string().trim().min(1),
  author: z.string().trim().min(1),
  cover: z.string().url().optional(),
  externalUrl: z.string().url(),
});

export const bookFieldsSchema = z.object({
  title: z.string().trim().min(1),
  description: z.string().trim().min(1),
  books: z.array(favoriteBookSchema).min(1),
  published: z.boolean().default(true),
}).merge(optionalCanonicalFieldsSchema);

export const bookSchemaForLanguage = (lang: Language) =>
  bookFieldsSchema.transform((shelf) => {
    const fields = canonicalFields({
      type: 'book',
      lang,
      editorialState: shelf.editorialState,
      visibility: shelf.visibility,
      fallbackEditorialState: shelf.published ? 'published-here' : 'draft',
      fallbackVisibility: shelf.published ? 'public' : 'private',
      category: shelf.category,
      tags: [],
    });

    return {
      ...shelf,
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
