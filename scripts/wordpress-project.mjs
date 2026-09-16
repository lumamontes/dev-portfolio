import { readFile } from 'node:fs/promises';
import { createMarkdownProcessor } from '@astrojs/markdown-remark';

const site = 'tururu61.wordpress.com';
const apiRoot = `https://public-api.wordpress.com/rest/v1.1/sites/${site}`;
const token = JSON.parse(await readFile(new URL('../.wordpress-token.json', import.meta.url), 'utf8')).access_token;
const headers = { authorization: `Bearer ${token}` };
const project = {
  slug: 'biblioteca-de-zines',
  title: {
    br: 'Biblioteca de Zines',
    en: 'Zine Library',
  },
  description: {
    br: 'Uma plataforma viva de arquivo e publicação de zines de artistas independentes, feita para tornar trabalhos de pequeno formato mais fáceis de descobrir e preservar.',
    en: 'A live archive and publishing platform for zines by independent artists, built to make small-format work easier to discover and preserve.',
  },
  link: 'https://biblioteca-de-zines.com.br/',
  tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Contentful'],
};

const response = await fetch(`${apiRoot}/posts/?number=100&status=publish`, { headers });
if (!response.ok) throw new Error(`WordPress read failed with ${response.status}`);
const posts = (await response.json()).posts ?? [];
const processor = await createMarkdownProcessor({});

for (const lang of ['br', 'en']) {
  const slug = lang === 'en' ? `${project.slug}-en` : project.slug;
  const existing = posts.find((post) => post.slug === slug);
  const markdown = `${project.description[lang]}\n\n[${project.link}](${project.link})`;
  const content = (await processor.render(markdown)).code;
  const payload = new URLSearchParams({
    title: project.title[lang],
    slug,
    content,
    excerpt: project.description[lang],
    status: 'publish',
    categories: `entry:project,lang:${lang}`,
    tags: project.tags.join(','),
  });
  const endpoint = existing ? `${apiRoot}/posts/${existing.ID}/` : `${apiRoot}/posts/new/`;
  const result = await fetch(endpoint, { method: 'POST', headers: { ...headers, 'content-type': 'application/x-www-form-urlencoded' }, body: payload });
  if (!result.ok) throw new Error(`Project ${lang} migration failed with ${result.status}: ${await result.text()}`);
  const post = await result.json();
  console.log(`${existing ? 'UPDATED' : 'CREATED'} ${slug} -> ${post.URL}`);
}
