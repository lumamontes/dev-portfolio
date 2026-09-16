import { readFile } from 'node:fs/promises';

const site = 'tururu61.wordpress.com';
const apiRoot = `https://public-api.wordpress.com/rest/v1.1/sites/${site}`;
const token = JSON.parse(await readFile(new URL('../.wordpress-token.json', import.meta.url), 'utf8')).access_token;
const headers = { authorization: `Bearer ${token}` };
const playlists = [
  ['ap-das-gemeas', 'ap das gemeas', '51gthShGNUzGGOnSxvTe70'],
  ['recs', 'recs', '52gB2JloVdWjQx31Ok7EeK'],
  ['pop-perfections', 'pop perfections', '3dKYMHSunsWgYglFczfXUH'],
  ['2026', '2026', '7okjRp5hd0n9jpJci5MenL'],
  ['violao-classico', 'violão clássico', '0EM2soOos0zyyhFO96ggiq'],
];

const response = await fetch(`${apiRoot}/posts/?number=100&status=publish`, { headers });
if (!response.ok) throw new Error(`WordPress read failed with ${response.status}`);
const posts = (await response.json()).posts ?? [];

for (const [slug, title, id] of playlists) {
  const existing = posts.find((post) => post.slug === `playlist-${slug}`);
  const spotifyUrl = `https://open.spotify.com/playlist/${id}`;
  const embedUrl = `https://open.spotify.com/embed/playlist/${id}?utm_source=archive`;
  const content = `<p>Uma playlist que faz parte do meu arquivo musical.</p><iframe style="border-radius:12px" src="${embedUrl}" width="100%" height="352" frameborder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" title="Spotify playlist: ${title}"></iframe><p><a href="${spotifyUrl}">Ouvir no Spotify ↗</a></p>`;
  const payload = new URLSearchParams({
    title,
    slug: `playlist-${slug}`,
    content,
    excerpt: 'Playlist do arquivo musical.',
    status: 'publish',
    categories: 'entry:music,lang:br',
    tags: 'playlist,Spotify',
  });
  const endpoint = existing ? `${apiRoot}/posts/${existing.ID}/` : `${apiRoot}/posts/new/`;
  const result = await fetch(endpoint, { method: 'POST', headers: { ...headers, 'content-type': 'application/x-www-form-urlencoded' }, body: payload });
  if (!result.ok) throw new Error(`Playlist ${title} failed with ${result.status}: ${await result.text()}`);
  const post = await result.json();
  console.log(`${existing ? 'UPDATED' : 'CREATED'} ${title} -> ${post.URL}`);
}
