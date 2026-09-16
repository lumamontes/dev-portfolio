interface Env {
  SPOTIFY_CLIENT_ID: string;
  SPOTIFY_CLIENT_SECRET: string;
  SPOTIFY_REFRESH_TOKEN: string;
}

interface SpotifyPlayback {
  is_playing?: boolean;
  item?: {
    name?: string;
    artists?: Array<{ name?: string }>;
    album?: { name?: string; images?: Array<{ url?: string }> };
    external_urls?: { spotify?: string };
  } | null;
}

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  if (!env.SPOTIFY_CLIENT_ID || !env.SPOTIFY_CLIENT_SECRET || !env.SPOTIFY_REFRESH_TOKEN) return new Response(null, { status: 204 });
  const credentials = btoa(`${env.SPOTIFY_CLIENT_ID}:${env.SPOTIFY_CLIENT_SECRET}`);
  const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: { authorization: `Basic ${credentials}`, 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'refresh_token', refresh_token: env.SPOTIFY_REFRESH_TOKEN }),
  });
  if (!tokenResponse.ok) return new Response(null, { status: 204 });
  const { access_token: accessToken } = (await tokenResponse.json()) as { access_token?: string };
  if (!accessToken) return new Response(null, { status: 204 });
  const playbackResponse = await fetch('https://api.spotify.com/v1/me/player', { headers: { authorization: `Bearer ${accessToken}` } });
  if (playbackResponse.status === 204 || !playbackResponse.ok) return new Response(null, { status: 204 });
  const playback = (await playbackResponse.json()) as SpotifyPlayback;
  const item = playback.item;
  if (!playback.is_playing || !item?.name) return new Response(null, { status: 204 });
  return Response.json({
    title: item.name,
    artist: item.artists?.map((artist) => artist.name).filter(Boolean).join(', ') ?? '',
    album: item.album?.name ?? '',
    image: item.album?.images?.[0]?.url ?? null,
    url: item.external_urls?.spotify ?? null,
  }, { headers: { 'cache-control': 'no-store' } });
};
