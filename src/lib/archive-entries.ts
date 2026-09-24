import { getCollection } from 'astro:content';
import { isPublicEntry, isPublicEntryInLanguage, routeSlug, type Language } from './content-model';
import { useTranslations } from '../utils/lang';

export interface ArchiveEntry {
  title: string;
  type: string;
  slug: string;
  lang: Language;
  link: string;
}

// The Content Layer loader doesn't guarantee an order, so sort by id
// (file path) to keep lists alphabetical by file, as they always were.
const byId = <T extends { id: string }>(entries: T[]) =>
  [...entries].sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));

/**
 * Every public entry across every content collection, flattened into one
 * uniform shape. Shared by the archive index and the portal's persistent
 * sidebar (ticket 31) so both list the same things the same way, instead
 * of two copies of this fetch/merge logic drifting apart the way the
 * project/book duplication bugs did.
 */
export async function getArchiveEntries(lang: Language): Promise<ArchiveEntry[]> {
  const [posts, booksEn, booksBr, learningNotes, zines, projectEntries, photos, musicCollection, playlistEntries] =
    await Promise.all([
      getCollection('posts').then(byId),
      getCollection('books-en').then(byId),
      getCollection('books-br').then(byId),
      getCollection('learning-notes').then(byId),
      getCollection('zines').then(byId),
      getCollection('projects').then(byId),
      getCollection('photos').then(byId),
      getCollection('music').then(byId),
      getCollection('playlists').then(byId),
    ]);

  return [
    ...posts.filter((e) => isPublicEntryInLanguage(e, lang)).map((e) => ({
      title: e.data.title,
      type: 'text',
      slug: e.id.split('/').pop()!,
      lang,
      link: `/${lang}/archive/text/${e.id.split('/').pop()}`,
    })),
    ...(lang === 'en' ? booksEn : booksBr).filter((e) => isPublicEntryInLanguage(e, lang)).map((e) => ({
      title: e.data.title,
      type: 'book',
      slug: e.id,
      lang,
      link: `/${lang}/archive/book/${e.id}`,
    })),
    ...learningNotes.filter((e) => isPublicEntryInLanguage(e, lang)).map((e) => ({
      title: e.data.title,
      type: 'learning-note',
      slug: routeSlug(e.id),
      lang,
      link: `/${lang}/archive/learning-note/${routeSlug(e.id)}`,
    })),
    // Always link to the entry's own portal page, never straight out to
    // externalUrl — that's where the zine's PDF/link-card actually renders;
    // bypassing it here would skip the portal.
    ...zines.filter((e) => isPublicEntryInLanguage(e, lang)).map((e) => ({
      title: e.data.title,
      type: 'zine',
      slug: routeSlug(e.id),
      lang,
      link: `/${lang}/archive/zine/${routeSlug(e.id)}`,
    })),
    // Always link to the entry's own portal page, never straight out to
    // externalUrl — that's where the live-embed/link-card tiers (ticket
    // 29) actually render; bypassing it here would skip the portal.
    //
    // A project write-up that exists in only one language still shows on
    // BOTH archive language pages, linking to wherever it actually lives.
    // Translated pairs (e.g. biblioteca-de-zines.md / biblioteca-de-zines-en.md)
    // are deduped by route slug, preferring the current page's language.
    ...(() => {
      const byBaseSlug = new Map<string, (typeof projectEntries)[number]>();
      for (const e of projectEntries.filter(isPublicEntry)) {
        const baseSlug = routeSlug(e.id);
        const existing = byBaseSlug.get(baseSlug);
        if (!existing || e.data.lang === lang) byBaseSlug.set(baseSlug, e);
      }
      return Array.from(byBaseSlug.values()).map((e) => ({
        title: e.data.title,
        type: 'project',
        slug: routeSlug(e.id),
        lang: e.data.lang,
        link: `/${e.data.lang}/archive/project/${routeSlug(e.id)}`,
      }));
    })(),
    ...photos.filter((e) => isPublicEntryInLanguage(e, lang)).map((e) => ({
      title: e.data.title,
      type: 'photo',
      slug: routeSlug(e.id),
      lang,
      link: `/${lang}/archive/photo/${routeSlug(e.id)}`,
    })),
    ...musicCollection.filter((e) => isPublicEntryInLanguage(e, lang)).map((e) => ({
      title: e.data.title,
      type: 'music',
      slug: routeSlug(e.id),
      lang,
      link: `/${lang}/archive/music/${routeSlug(e.id)}`,
    })),
    ...playlistEntries.filter((e) => isPublicEntryInLanguage(e, lang)).map((e) => ({
      title: e.data.title,
      type: 'playlist',
      slug: routeSlug(e.id),
      lang,
      link: `/${lang}/archive/playlist/${routeSlug(e.id)}`,
    })),
  ];
}

export interface GroupedArchiveEntries {
  label: string;
  entries: ArchiveEntry[];
}

/** Groups by entry type first, per the sidebar/index navigation decision. */
export function groupArchiveEntries(entries: ArchiveEntry[], lang: Language): GroupedArchiveEntries[] {
  const t = useTranslations(lang);
  const groups: Array<{ label: string; types: string[] }> = [
    { label: t('archive.group.text'), types: ['text', 'learning-note'] },
    { label: t('archive.group.projects'), types: ['project', 'zine'] },
    { label: t('archive.group.music'), types: ['music', 'playlist'] },
    { label: t('archive.group.books'), types: ['book'] },
    { label: t('archive.group.photos'), types: ['photo'] },
  ];

  return groups
    .map(({ label, types }) => ({ label, entries: entries.filter((e) => types.includes(e.type)) }))
    .filter((group) => group.entries.length > 0);
}
