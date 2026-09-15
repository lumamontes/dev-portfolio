import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createMarkdownProcessor } from '@astrojs/markdown-remark';

const site = 'tururu61.wordpress.com';
const apiRoot = `https://public-api.wordpress.com/rest/v1.1/sites/${site}`;
const contentRoot = fileURLToPath(new URL('../src/content/', import.meta.url));
const tokenPath = fileURLToPath(new URL('../.wordpress-token.json', import.meta.url));
const writeMode = process.argv.includes('--write');
const directories = ['posts', 'books-en', 'books-br', 'learning-notes', 'zines', 'photos', 'music'];

function parseFrontmatter(source) {
  const match = source.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) throw new Error('Missing frontmatter');
  const fields = {};
  for (const line of match[1].split('\n')) {
    const scalar = line.match(/^([\w]+):\s*["']?([^"']*)["']?$/);
    const array = line.match(/^([\w]+):\s*\[(.*)\]$/);
    if (scalar) fields[scalar[1]] = scalar[2].trim();
    if (array) fields[array[1]] = array[2].split(',').map((value) => value.trim().replace(/^['"]|['"]$/g, '')).filter(Boolean);
  }
  return { fields, body: match[2].trim() };
}

async function filesIn(directory) {
  const entries = await readdir(join(contentRoot, directory), { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await filesIn(path));
    if (entry.isFile() && entry.name.endsWith('.md')) files.push(path);
  }
  return files;
}

function entryFrom(file, source) {
  const { fields, body } = parseFrontmatter(source);
  const filename = file.split('/').pop().replace(/\.md$/, '');
  const lang = fields.lang || (file.startsWith('posts/en/') || file.startsWith('books-en/') ? 'en' : 'br');
  const type = file.startsWith('posts/') ? 'text' : file.startsWith('books-') ? 'book' : file.split('/')[0];
  return { file, fields, body, lang, type, baseSlug: filename, title: fields.title || filename };
}

function wordpressSlug(entry, duplicateSlugs) {
  return duplicateSlugs.has(entry.baseSlug) && entry.lang === 'en' ? `${entry.baseSlug}-en` : entry.baseSlug;
}

function statusFor(entry) {
  return entry.fields.visibility === 'public' || entry.fields.editorialState?.startsWith('published') || entry.fields.published === 'true' ? 'publish' : 'draft';
}

async function contentFor(entry, processor) {
  const description = entry.fields.description ? `${entry.fields.description}\n\n` : '';
  return (await processor.render(`${description}${entry.body}`)).code;
}

const files = (await Promise.all(directories.map(filesIn))).flat();
const entries = await Promise.all(files.map(async (file) => entryFrom(file, await readFile(join(contentRoot, file), 'utf8'))));
const slugCounts = new Map();
for (const entry of entries) slugCounts.set(entry.baseSlug, (slugCounts.get(entry.baseSlug) ?? 0) + 1);
const duplicateSlugs = new Set([...slugCounts].filter(([, count]) => count > 1).map(([slug]) => slug));

let token;
try {
  token = JSON.parse(await readFile(tokenPath, 'utf8')).access_token;
} catch {
  if (writeMode) throw new Error('Run pnpm wordpress:auth before migrating');
}
const headers = token ? { authorization: `Bearer ${token}` } : {};
const remoteResponses = await Promise.all(['publish', 'draft'].map((status) => fetch(`${apiRoot}/posts/?number=100&status=${status}`, { headers })));
for (const response of remoteResponses) {
  if (!response.ok) throw new Error(`WordPress read failed with ${response.status}`);
}
const remotePosts = (await Promise.all(remoteResponses.map((response) => response.json()))).flatMap((response) => response.posts ?? []);
const remoteBySlug = new Map(remotePosts.map((post) => [post.slug, post]));
const markdownProcessor = await createMarkdownProcessor({});

console.log(`${writeMode ? 'WRITE' : 'DRY RUN'}: ${entries.length} local entries`);
for (const entry of entries) {
  const slug = wordpressSlug(entry, duplicateSlugs);
  const existing = remoteBySlug.get(slug);
  const payload = new URLSearchParams({
    title: entry.title,
    slug,
    content: await contentFor(entry, markdownProcessor),
    excerpt: entry.fields.description ?? '',
    status: statusFor(entry),
    categories: [`entry:${entry.type}`, `lang:${entry.lang}`, entry.fields.category].filter(Boolean).join(','),
    tags: Array.isArray(entry.fields.tags) ? entry.fields.tags.join(',') : '',
  });

  if (!writeMode) {
    console.log(`${existing ? 'UPDATE' : 'CREATE'} ${entry.type.padEnd(15)} ${entry.lang} ${slug}  ${entry.title}`);
    continue;
  }

  const endpoint = existing ? `${apiRoot}/posts/${existing.ID}/` : `${apiRoot}/posts/new/`;
  const response = await fetch(endpoint, { method: 'POST', headers: { ...headers, 'content-type': 'application/x-www-form-urlencoded' }, body: payload });
  if (!response.ok) throw new Error(`${existing ? 'Update' : 'Create'} failed for ${slug}: ${response.status} ${await response.text()}`);
  const post = await response.json();
  remoteBySlug.set(slug, post);
  console.log(`${existing ? 'UPDATED' : 'CREATED'} ${slug} -> ${post.URL ?? post.link}`);
}

if (!writeMode) console.log('\nNothing was written. Run with --write after reviewing this list.');
