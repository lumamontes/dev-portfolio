export type WordPressContent = {
  id: number;
  slug: string;
  title: string;
  description: string;
  html: string;
  url: string;
  lang: 'en' | 'br';
  imageUrl?: string;
};

export type WordPressPage = {
  items: WordPressContent[];
  nextPage: number | null;
  error: Error | null;
};

export type WordPressArchiveEntry = {
  title: string;
  description: string;
  type: 'text' | 'learning-note' | 'book' | 'zine' | 'photo' | 'music' | 'project';
  lang: 'en' | 'br';
  slug: string;
  date: Date;
  tags: string[];
  category?: string;
  html: string;
  externalUrl?: string;
};

export const WORDPRESS_API_URL =
  import.meta.env.WORDPRESS_API_URL ??
  'https://public-api.wordpress.com/wp/v2/sites/tururu61.wordpress.com/posts';

type WordPressPost = {
  id: number;
  slug: string;
  status: string;
  link: string;
  date: string;
  title?: { rendered?: string };
  excerpt?: { rendered?: string };
  content?: { rendered?: string };
  _embedded?: {
    'wp:featuredmedia'?: Array<{ source_url?: string }>;
  };
};

type WordPressOptions = {
  apiUrl: string;
  lang: 'en' | 'br';
  page?: number;
  perPage?: number;
  fetcher?: typeof fetch;
};

function stripHtml(value: string) {
  return value.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}

export async function getWordPressPosts({
  apiUrl,
  lang,
  page = 1,
  perPage = 10,
  fetcher = fetch,
}: WordPressOptions): Promise<WordPressPage> {
  const requestedPage = Number.isInteger(page) && page > 0 ? page : 1;
  const requestedPerPage = Number.isInteger(perPage) && perPage > 0 && perPage <= 100 ? perPage : 10;
  const url = new URL(apiUrl);
  url.searchParams.set('status', 'publish');
  url.searchParams.set('page', String(requestedPage));
  url.searchParams.set('per_page', String(requestedPerPage));
  url.searchParams.set('_embed', '1');

  try {
    const response = await fetcher(url);
    if (!response.ok) {
      throw new Error(`WordPress request failed with ${response.status}`);
    }

    const posts = (await response.json()) as WordPressPost[];
    const totalPages = Number(response.headers.get('X-WP-TotalPages') ?? requestedPage);
    const items = posts
      .filter((post) => post.status === 'publish')
      .map((post) => ({
        id: post.id,
        slug: post.slug,
        title: stripHtml(post.title?.rendered ?? post.slug),
        description: stripHtml(post.excerpt?.rendered ?? ''),
        html: post.content?.rendered ?? '',
        url: post.link,
        lang,
        imageUrl: post._embedded?.['wp:featuredmedia']?.[0]?.source_url,
      }));

    return {
      items,
      nextPage: requestedPage < totalPages ? requestedPage + 1 : null,
      error: null,
    };
  } catch (error) {
    return {
      items: [],
      nextPage: null,
      error: error instanceof Error ? error : new Error('WordPress request failed'),
    };
  }
}

export async function getWordPressArchiveEntries(fetcher: typeof fetch = fetch) {
  try {
    const url = new URL(WORDPRESS_API_URL);
    url.searchParams.set('status', 'publish');
    url.searchParams.set('per_page', '100');
    url.searchParams.set('_embed', '1');
    const response = await fetcher(url);
    if (!response.ok) throw new Error(`WordPress archive request failed with ${response.status}`);
    const posts = (await response.json()) as Array<{
      slug: string;
      date: string;
      title?: { rendered?: string };
      excerpt?: { rendered?: string };
      content?: { rendered?: string };
      _embedded?: { 'wp:term'?: Array<Array<{ name?: string }>> };
    }>;

    return posts.flatMap((post) => {
      const terms = (post._embedded?.['wp:term'] ?? []).flat().map((term) => term.name).filter(Boolean) as string[];
      const typeTerm = terms.find((term) => term.startsWith('entry:'))?.slice(6);
      const langTerm = terms.find((term) => term.startsWith('lang:'))?.slice(5);
      if (!typeTerm || !['text', 'learning-note', 'book', 'zine', 'photo', 'music', 'project'].includes(typeTerm) || !['en', 'br'].includes(langTerm ?? '')) return [];
      return [{
        title: stripHtml(post.title?.rendered ?? post.slug),
        description: stripHtml(post.excerpt?.rendered ?? ''),
        type: typeTerm as WordPressArchiveEntry['type'],
        lang: langTerm as WordPressArchiveEntry['lang'],
        slug: post.slug,
        date: new Date(post.date),
        tags: terms.filter((term) => !term.startsWith('entry:') && !term.startsWith('lang:')),
        category: terms.find((term) => !term.startsWith('entry:') && !term.startsWith('lang:')),
        html: post.content?.rendered ?? '',
        externalUrl: post.content?.rendered?.match(/href="(https?:\/\/[^\"]+)"/)?.[1],
      }];
    });
  } catch {
    return [];
  }
}
