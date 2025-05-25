// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import { rehypeHeadingIds,  } from '@astrojs/markdown-remark';
import remarkToc from 'remark-toc';

// https://astro.build/config
export default defineConfig({
	site: 'https://example.com',
	markdown: {
		rehypePlugins: [
			[rehypeHeadingIds, {
			}]
		],
		remarkPlugins: [ [remarkToc, { heading: 'toc', maxDepth: 3 } ] ],
	},
	integrations: [mdx(), sitemap(), tailwind()],
});
