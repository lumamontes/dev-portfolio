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
        // `project` and `book` have their own canonical local content
        // collections — a WordPress-tagged post of either type would
        // otherwise duplicate it under a different (and possibly stale)
        // title (see docs/adr commentary on the "Zine Library" / Clean
        // Code overlaps).
        .filter((e) => e.type !== 'project' && e.type !== 'book')
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
        link: (pointerTypes.has(e.type) && e.externalUrl) || `/${lang}/archive/${e.type}/${routeSlug}`,
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
