import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';
import { getLangFromUrl } from '@/utils/lang';
import { isPublicEntryInLanguage } from '@/lib/content-model';

export async function GET(context) {
	const posts = await getCollection('posts');
	const lang = getLangFromUrl(context.url);
	const publicPosts = posts.filter((post) => isPublicEntryInLanguage(post, lang));
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: publicPosts.map((post) => ({
			...post.data,
			link: `/${lang}/posts/${post.id}/`,
		})),
	});
}
