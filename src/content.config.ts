import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import {
  bookSchemaForLanguage,
  learningNoteSchema,
  postSchema,
  photoSchema,
  musicSchema,
  playlistSchema,
  projectSchema,
  zineSchema,
} from './lib/content-model';

// Content Layer loader for a folder under src/content/. Both .md and .mdx
// are picked up, so any entry can be converted to MDX on its own.
const contentGlob = (directory: string) =>
  glob({ pattern: '**/*.{md,mdx}', base: `./src/content/${directory}` });

const posts = defineCollection({
  loader: contentGlob('posts'),
  schema: postSchema,
});

const booksEn = defineCollection({
  loader: contentGlob('books-en'),
  schema: bookSchemaForLanguage('en'),
});

const booksBr = defineCollection({
  loader: contentGlob('books-br'),
  schema: bookSchemaForLanguage('br'),
});

const learningNotes = defineCollection({
  loader: contentGlob('learning-notes'),
  schema: learningNoteSchema,
});

const zines = defineCollection({
  loader: contentGlob('zines'),
  schema: zineSchema,
});

const projects = defineCollection({
  loader: contentGlob('projects'),
  schema: projectSchema,
});

const photos = defineCollection({
  loader: contentGlob('photos'),
  schema: photoSchema,
});

const music = defineCollection({
  loader: contentGlob('music'),
  schema: musicSchema,
});

const playlists = defineCollection({
  loader: contentGlob('playlists'),
  schema: playlistSchema,
});

export const collections = {
  posts,
  'books-en': booksEn,
  'books-br': booksBr,
  'learning-notes': learningNotes,
  zines,
  projects,
  photos,
  music,
  playlists,
};
