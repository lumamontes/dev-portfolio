// Converts an open.spotify.com link (playlist/track/album/artist/show/episode)
// into its embeddable form so a playlist portal entry can show the actual
// track list inline instead of just a link-card out to Spotify.
export function toSpotifyEmbedUrl(url: string): string | undefined {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return undefined;
  }
  if (parsed.hostname !== 'open.spotify.com') return undefined;

  // Spotify's mobile share sheet sometimes prefixes the path with a locale
  // segment, either a bare language code (/intl-pt/) or a region-qualified
  // one (/intl-pt-BR/) — tolerate an optional one of either shape.
  const match = parsed.pathname.match(/^\/(?:intl-[a-z]{2}(?:-[a-zA-Z0-9]+)?\/)?(playlist|track|album|artist|show|episode)\/([A-Za-z0-9]+)/);
  if (!match) return undefined;

  const [, kind, id] = match;
  return `https://open.spotify.com/embed/${kind}/${id}`;
}
