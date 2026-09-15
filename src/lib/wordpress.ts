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
