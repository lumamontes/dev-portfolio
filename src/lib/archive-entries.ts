import { getCollection } from 'astro:content';
import { isPublicEntryInLanguage, type Language } from './content-model';
import { getWordPressArchiveEntries, type WordPressArchiveEntry } from './wordpress';

export interface ArchiveEntry {
  title: string;
  type: string;
  slug: string;
  lang: Language;
  link: string;
}

// Memoized so the WordPress API is hit once per build/process, no matter
// how many times this or getArchiveEntries is called (getStaticPaths for
// paths, then once per language for the sidebar) — three separate
// round-trips to the same endpoint was a real, measured build slowdown.
let canonicalWordPressEntries: Promise<WordPressArchiveEntry[]> | null = null;

/**
 * WordPress entries with the project/book exclusion and the playlist
 * reclassification applied — the single place that logic lives, reused
 * by getArchiveEntries and by [type]/[slug].astro's getStaticPaths so
 * the two can't drift into disagreeing about which entries exist.
 */
export function getCanonicalWordPressEntries(): Promise<WordPressArchiveEntry[]> {
  if (!canonicalWordPressEntries) {
    canonicalWordPressEntries = getWordPressArchiveEntries().then((entries) =>
      entries
        // `project`, `book`, and `text` all have their own canonical local
        // content collections now (ticket 33 migrated every article Luma
        // has written into the local `posts` collection) — a WordPress-
        // tagged post of any of these types would otherwise duplicate a
        // local entry under a stale/broken title (confirmed in practice:
        // WordPress `text` posts here were literal duplicates of migrated
        // local articles, with un-decoded `&nbsp;` entities in their
        // titles and one with an empty title that fell back to its slug).
        .filter((e) => e.type !== 'project' && e.type !== 'book' && e.type !== 'text')
        // The 5 existing playlists are hosted in WordPress tagged
        // entry:music (ticket 19, before playlist existed as its own
        // type). Reclassified here rather than by rewriting the live
        // WordPress posts.
        .map((e) => (e.type === 'music' && e.tags.includes('playlist') ? { ...e, type: 'playlist' as const } : e)),
    );
  }
  return canonicalWordPressEntries;
}

/**
 * Every public entry across every local collection and WordPress,
 * flattened into one uniform shape. Shared by the archive index and the
 * portal's persistent sidebar (ticket 31) so both list the same things
 * the same way, instead of two copies of this fetch/merge logic drifting
 * apart the way the project/book duplication bugs did.
 */
export async function getArchiveEntries(lang: Language): Promise<ArchiveEntry[]> {
  const [posts, booksEn, booksBr, learningNotes, zines, projectEntries, photos, musicCollection, playlistEntries, wpEntriesExcludingProjects] =
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
      getCanonicalWordPressEntries(),
    ]);

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
    // Always link to the entry's own portal page, never straight out to
    // externalUrl — that's where the zine's PDF/link-card actually renders;
    // bypassing it here would skip the portal.
    ...zines.filter((e) => isPublicEntryInLanguage(e, lang)).map((e) => ({
      title: e.data.title,
      type: 'zine',
      slug: e.slug,
      lang,
      link: `/${lang}/archive/zine/${e.slug}`,
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

  // Always link to the entry's own portal page, never straight out to
  // externalUrl — every entry type now has its own portal rendering (zine
  // PDF/link-card, playlist Spotify embed, etc.), so bypassing it here
  // would skip the portal entirely, the same bug already fixed once for
  // local zine/project entries above.
  const wordpressEntries: ArchiveEntry[] = wpEntriesExcludingProjects
    .filter((e) => e.lang === lang)
    .map((e) => {
      // The generated route strips a trailing -en (see getStaticPaths in
      // [type]/[slug].astro) — the link built here must match exactly,
      // or entries with such a slug 404 when clicked.
      const routeSlug = e.slug.replace(/-en$/, '');
      return {
        title: e.title,
        type: e.type,
        slug: routeSlug,
        lang: e.lang,
        link: `/${lang}/archive/${e.type}/${routeSlug}`,
      };
    });

  // WordPress wins on a (type, slug) collision — matching the exact
  // priority [type]/[slug].astro's getStaticPaths already uses when
  // generating routes. Without this, a local entry later migrated into
  // WordPress under the same slug would list twice here even though only
  // one page actually exists to link to.
  const wordpressKeys = new Set(wordpressEntries.map((e) => `${e.type}/${e.slug}`));
  const dedupedLocalEntries = localEntries.filter((e) => !wordpressKeys.has(`${e.type}/${e.slug}`));

  return [...dedupedLocalEntries, ...wordpressEntries];
}

export interface GroupedArchiveEntries {
  label: string;
  entries: ArchiveEntry[];
}

/** Groups by entry type first, per the sidebar/index navigation decision. */
export function groupArchiveEntries(entries: ArchiveEntry[]): GroupedArchiveEntries[] {
  const groups: Array<{ label: string; types: string[] }> = [
    { label: 'Escritos & Textos', types: ['text'] },
    { label: 'TIL / Aprendizados', types: ['learning-note'] },
    { label: 'Projetos & Labs', types: ['project', 'zine'] },
    { label: 'Música & Mídia', types: ['music', 'playlist'] },
    { label: 'Livros', types: ['book'] },
    { label: 'Fotos', types: ['photo'] },
  ];

  return groups
    .map(({ label, types }) => ({ label, entries: entries.filter((e) => types.includes(e.type)) }))
    .filter((group) => group.entries.length > 0);
}
