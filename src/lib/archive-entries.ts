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
      getCollection('posts'),
      getCollection('books-en'),
      getCollection('books-br'),
      getCollection('learning-notes'),
      getCollection('zines'),
      getCollection('projects'),
      getCollection('photos'),
      getCollection('music'),
      getCollection('playlists'),
    ]);

  return [
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
      slug: routeSlug(e.slug),
      lang,
      link: `/${lang}/archive/learning-note/${routeSlug(e.slug)}`,
    })),
    // Always link to the entry's own portal page, never straight out to
    // externalUrl — that's where the zine's PDF/link-card actually renders;
    // bypassing it here would skip the portal.
    ...zines.filter((e) => isPublicEntryInLanguage(e, lang)).map((e) => ({
      title: e.data.title,
      type: 'zine',
      slug: routeSlug(e.slug),
      lang,
      link: `/${lang}/archive/zine/${routeSlug(e.slug)}`,
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
        const baseSlug = routeSlug(e.slug);
        const existing = byBaseSlug.get(baseSlug);
        if (!existing || e.data.lang === lang) byBaseSlug.set(baseSlug, e);
      }
      return Array.from(byBaseSlug.values()).map((e) => ({
        title: e.data.title,
        type: 'project',
        slug: routeSlug(e.slug),
        lang: e.data.lang,
        link: `/${e.data.lang}/archive/project/${routeSlug(e.slug)}`,
      }));
    })(),
    ...photos.filter((e) => isPublicEntryInLanguage(e, lang)).map((e) => ({
      title: e.data.title,
      type: 'photo',
      slug: routeSlug(e.slug),
      lang,
      link: `/${lang}/archive/photo/${routeSlug(e.slug)}`,
    })),
    ...musicCollection.filter((e) => isPublicEntryInLanguage(e, lang)).map((e) => ({
      title: e.data.title,
      type: 'music',
      slug: routeSlug(e.slug),
      lang,
      link: `/${lang}/archive/music/${routeSlug(e.slug)}`,
    })),
    ...playlistEntries.filter((e) => isPublicEntryInLanguage(e, lang)).map((e) => ({
      title: e.data.title,
      type: 'playlist',
      slug: routeSlug(e.slug),
      lang,
      link: `/${lang}/archive/playlist/${routeSlug(e.slug)}`,
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
