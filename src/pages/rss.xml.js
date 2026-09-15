import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';
import { getSlugFromUrl } from '@/utils/lang';
import { isPublicEntry } from '@/lib/content-model';

export async function GET(context) {
	const posts = await getCollection('posts');
	const publicPosts = posts.filter(isPublicEntry);
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: publicPosts.map((post) => ({
			...post.data,
			link: `/${post.data.lang}/posts/${getSlugFromUrl(post.slug)}/`,
		})),
	});
}
