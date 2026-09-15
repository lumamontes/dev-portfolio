import { readFile, readdir, writeFile } from 'node:fs/promises';
import { basename, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createMarkdownProcessor } from '@astrojs/markdown-remark';

const site = 'tururu61.wordpress.com';
const apiRoot = `https://public-api.wordpress.com/rest/v1.1/sites/${site}`;
const token = JSON.parse(await readFile(fileURLToPath(new URL('../.wordpress-token.json', import.meta.url)), 'utf8')).access_token;
const manifestPath = fileURLToPath(new URL('../.wordpress-media.json', import.meta.url));
const photosPath = fileURLToPath(new URL('../public/photos/', import.meta.url));
const headers = { authorization: `Bearer ${token}` };

let manifest = {};
try {
  manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
} catch {
  // The first run starts with an empty media manifest.
}

const responses = await Promise.all(['publish', 'draft'].map((status) => fetch(`${apiRoot}/posts/?number=100&status=${status}`, { headers })));
for (const response of responses) if (!response.ok) throw new Error(`WordPress read failed with ${response.status}`);
const posts = (await Promise.all(responses.map((response) => response.json()))).flatMap((response) => response.posts ?? []);
const recortes = posts.find((post) => post.slug === 'recortes');
if (!recortes) throw new Error('Could not find the recortes post');

const mediaResponse = await fetch(`${apiRoot}/media/?number=100`, { headers });
if (!mediaResponse.ok) throw new Error(`WordPress media read failed with ${mediaResponse.status}`);
const remoteMedia = (await mediaResponse.json()).media ?? [];
for (const media of remoteMedia) {
  if (media.file) manifest[media.file] = { id: media.ID, url: media.URL };
}

const processor = await createMarkdownProcessor({});
const files = (await readdir(photosPath)).filter((file) => /\.(jpe?g|png|gif|webp)$/i.test(file));
const imageUrls = [];

for (const file of files) {
  let media = manifest[file];
  if (!media?.url) {
    const stem = basename(file, file.slice(file.lastIndexOf('.')));
    media = Object.entries(manifest).find(([remoteFile, remoteMedia]) => remoteFile.startsWith(stem) && remoteMedia?.url)?.[1];
  }
  if (!media) {
    const data = await readFile(join(photosPath, file));
    const form = new FormData();
    form.append('media[]', new Blob([data], { type: file.endsWith('.png') ? 'image/png' : 'image/jpeg' }), file);
    form.append('attrs[0][parent_id]', String(recortes.ID));
    form.append('attrs[0][title]', basename(file, file.slice(file.lastIndexOf('.'))));
    const response = await fetch(`${apiRoot}/media/new/`, { method: 'POST', headers, body: form });
    if (!response.ok) throw new Error(`Media upload failed for ${file}: ${response.status} ${await response.text()}`);
    const uploaded = (await response.json()).media?.[0];
    if (!uploaded?.URL) throw new Error(`Media upload returned no media for ${file}`);
    media = { id: uploaded.ID, url: uploaded.URL };
    manifest[file] = media;
    await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, { mode: 0o600 });
    console.log(`UPLOADED ${file} -> ${media.URL}`);
  } else {
    console.log(`EXISTS  ${file} -> ${media.url}`);
  }
  imageUrls.push({ file, ...media });
}

const source = await readFile(fileURLToPath(new URL('../src/content/photos/recortes.md', import.meta.url)), 'utf8');
const body = source.match(/^---\n[\s\S]*?\n---\n([\s\S]*)$/)?.[1].trim() ?? '';
const images = imageUrls.map(({ file, url }) => `![${basename(file, file.slice(file.lastIndexOf('.')))}](${url})`).join('\n\n');
const content = (await processor.render(`${body}\n\n${images}`)).code;
const response = await fetch(`${apiRoot}/posts/${recortes.ID}/`, {
  method: 'POST',
  headers: { ...headers, 'content-type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams({ content }),
});
if (!response.ok) throw new Error(`Photo post update failed: ${response.status} ${await response.text()}`);
console.log(`UPDATED recortes -> ${recortes.URL}`);
