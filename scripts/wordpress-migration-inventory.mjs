import { readdir, readFile } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const contentRoot = new URL('../src/content/', import.meta.url);
const wordpressPostsUrl = 'https://public-api.wordpress.com/wp/v2/sites/tururu61.wordpress.com/posts?per_page=100';

const contentDirectories = ['posts', 'books-en', 'books-br', 'learning-notes', 'zines', 'photos', 'music'];

async function markdownFiles(directory) {
  const entries = await readdir(new URL(directory, contentRoot), { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await markdownFiles(path));
    if (entry.isFile() && entry.name.endsWith('.md')) files.push(path);
  }
  return files;
}

function frontmatter(source) {
  const match = source.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) throw new Error('Missing frontmatter');
  const fields = {};
  for (const line of match[1].split('\n')) {
    const scalar = line.match(/^([\w]+):\s*["']?([^"']*)["']?$/);
    if (scalar) fields[scalar[1]] = scalar[2].trim();
    const array = line.match(/^([\w]+):\s*\[(.*)\]$/);
    if (array) fields[array[1]] = array[2].split(',').map((value) => value.trim().replace(/^['"]|['"]$/g, '')).filter(Boolean);
  }
  return { fields, body: match[2].trim() };
}

const files = (await Promise.all(contentDirectories.map(markdownFiles))).flat();
const localEntries = [];
for (const file of files) {
  const source = await readFile(new URL(file, contentRoot), 'utf8');
  const { fields } = frontmatter(source);
  const filename = file.split('/').pop().replace(/\.md$/, '');
  const lang = fields.lang || (file.startsWith('posts/en/') || file.startsWith('books-en/') ? 'en' : 'br');
  const type = file.startsWith('posts/') ? 'text' : file.startsWith('books-') ? 'book' : file.replace(/\/.*$/, '');
  localEntries.push({ path: relative(process.cwd(), fileURLToPath(new URL(file, contentRoot))), title: fields.title || filename, slug: filename, lang, type });
}

const response = await fetch(wordpressPostsUrl);
if (!response.ok) throw new Error(`WordPress read failed with ${response.status}`);
const remoteEntries = await response.json();
const remoteSlugs = new Set(remoteEntries.map((entry) => entry.slug));

console.log(`Local entries: ${localEntries.length}`);
console.log(`WordPress published posts inspected: ${remoteEntries.length}`);
console.log('');
for (const entry of localEntries) {
  console.log(`${remoteSlugs.has(entry.slug) ? 'EXISTS' : 'NEW   '} ${entry.type.padEnd(15)} ${entry.lang} ${entry.slug}  ${entry.title}`);
}
