import { getCollection } from 'astro:content';
import { isPublicEntryInLanguage, type Language } from './content-model';
import { getWordPressArchiveEntries } from './wordpress';

export interface ArchiveEntry {
  title: string;
  type: string;
  slug: string;
  lang: Language;
  link: string;
}

/**
 * Every public entry across every local collection and WordPress,
 * flattened into one uniform shape. Shared by the archive index and the
 * portal's persistent sidebar (ticket 31) so both list the same things
 * the same way, instead of two copies of this fetch/merge logic drifting
 * apart the way the project/book duplication bugs did.
 */
export async function getArchiveEntries(lang: Language): Promise<ArchiveEntry[]> {
  const [posts, booksEn, booksBr, learningNotes, zines, projectEntries, photos, musicCollection, playlistEntries, wpEntries] =
    await Promise.all([
      getCollection('posts'),
      getCollection('books-en'),
      getCollection('books-br'),
      getCollection('learning-notes'),
      getCollection('zines'),
      getCollection('projects'),
      getCollection('photos'),
      getCollection('music'),
      getCollection('playlists'),
      getWordPressArchiveEntries(),
    ]);

  // `project` and `book` have their own canonical local content
  // collections — a WordPress-tagged post of either type would otherwise
  // duplicate it under a different (and possibly stale) title (see
  // docs/adr commentary on the "Zine Library" / Clean Code overlaps).
  const wpEntriesExcludingProjects = wpEntries
    .filter((e) => e.type !== 'project' && e.type !== 'book')
    // The 5 existing playlists are hosted in WordPress tagged entry:music
    // (ticket 19, before playlist existed as its own type). Reclassified
    // here rather than by rewriting the live WordPress posts.
    .map((e) => (e.type === 'music' && e.tags.includes('playlist') ? { ...e, type: 'playlist' as const } : e));

  const localEntries: ArchiveEntry[] = [
    ...posts.filter((e) => isPublicEntryInLanguage(e, lang)).map((e) => ({
      title: e.data.title,
      type: 'text',
      slug: e.slug.split('/').pop()!,
      lang,
      link: `/${lang}/archive/text/${e.slug.split('/').pop()}`,
    })),
    ...(lang === 'en' ? booksEn : booksBr).filter((e) => isPublicEntryInLanguage(e, lang)).map((e) => ({
      title: e.data.title,
      type: 'book',
      slug: e.slug,
      lang,
      link: `/${lang}/archive/book/${e.slug}`,
    })),
    ...learningNotes.filter((e) => isPublicEntryInLanguage(e, lang)).map((e) => ({
      title: e.data.title,
      type: 'learning-note',
      slug: e.slug,
      lang,
      link: `/${lang}/archive/learning-note/${e.slug}`,
    })),
    ...zines.filter((e) => isPublicEntryInLanguage(e, lang)).map((e) => ({
      title: e.data.title,
      type: 'zine',
      slug: e.slug,
      lang,
      link: e.data.externalUrl || `/${lang}/archive/zine/${e.slug}`,
    })),
    // Always link to the entry's own portal page, never straight out to
    // externalUrl — that's where the live-embed/link-card tiers (ticket
    // 29) actually render; bypassing it here would skip the portal.
    ...projectEntries.filter((e) => isPublicEntryInLanguage(e, lang)).map((e) => ({
      title: e.data.title,
      type: 'project',
      slug: e.slug,
      lang,
      link: `/${lang}/archive/project/${e.slug}`,
    })),
    ...photos.filter((e) => isPublicEntryInLanguage(e, lang)).map((e) => ({
      title: e.data.title,
      type: 'photo',
      slug: e.slug,
      lang,
      link: `/${lang}/archive/photo/${e.slug}`,
    })),
    ...musicCollection.filter((e) => isPublicEntryInLanguage(e, lang)).map((e) => ({
      title: e.data.title,
      type: 'music',
      slug: e.slug,
      lang,
      link: `/${lang}/archive/music/${e.slug}`,
    })),
    ...playlistEntries.filter((e) => isPublicEntryInLanguage(e, lang)).map((e) => ({
      title: e.data.title,
      type: 'playlist',
      slug: e.slug,
      lang,
      link: `/${lang}/archive/playlist/${e.slug}`,
    })),
  ];

  // externalUrl is a link scraped from the post body's first <a href> —
  // meaningful as "the" destination only for entry types that are
  // inherently pointers (zine, project, playlist). For anything else
  // (text, learning-note, photo, music, book) it's often just a link
  // mentioned mid-article, and treating it as the entry's own link would
  // send visitors somewhere unrelated instead of the entry's own page.
  const pointerTypes = new Set(['zine', 'project', 'playlist']);
  const wordpressEntries: ArchiveEntry[] = wpEntriesExcludingProjects
    .filter((e) => e.lang === lang)
    .map((e) => ({
      title: e.title,
      type: e.type,
      slug: e.slug,
      lang: e.lang,
      link: (pointerTypes.has(e.type) && e.externalUrl) || `/${lang}/archive/${e.type}/${e.slug}`,
    }));

  return [...localEntries, ...wordpressEntries];
}

export interface GroupedArchiveEntries {
  label: string;
  entries: ArchiveEntry[];
}

/** Groups by entry type first, per the sidebar/index navigation decision. */
export function groupArchiveEntries(entries: ArchiveEntry[]): GroupedArchiveEntries[] {
  const groups: Array<{ label: string; types: string[] }> = [
    { label: 'Escritos & Textos', types: ['text', 'learning-note'] },
    { label: 'Projetos & Labs', types: ['project', 'zine'] },
    { label: 'Música & Mídia', types: ['music'] },
    { label: 'Livros', types: ['book'] },
    { label: 'Fotos', types: ['photo'] },
    { label: 'Playlists', types: ['playlist'] },
  ];

  return groups
    .map(({ label, types }) => ({ label, entries: entries.filter((e) => types.includes(e.type)) }))
    .filter((group) => group.entries.length > 0);
}
