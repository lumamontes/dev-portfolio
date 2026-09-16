import { createServer } from 'node:http';
import { execFile } from 'node:child_process';
import { randomBytes } from 'node:crypto';
import { writeFile } from 'node:fs/promises';

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const redirectUri = 'http://127.0.0.1:4321/spotify/callback';
const scope = 'user-read-currently-playing user-read-playback-state';

if (!clientId || !clientSecret) {
  throw new Error('SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET must be set in .env');
}

const state = randomBytes(24).toString('hex');
const authorizationUrl = new URL('https://accounts.spotify.com/authorize');
authorizationUrl.searchParams.set('client_id', clientId);
authorizationUrl.searchParams.set('response_type', 'code');
authorizationUrl.searchParams.set('redirect_uri', redirectUri);
authorizationUrl.searchParams.set('scope', scope);
authorizationUrl.searchParams.set('state', state);

const server = createServer(async (request, response) => {
  const requestUrl = new URL(request.url ?? '/', redirectUri);
  if (requestUrl.pathname !== '/spotify/callback') {
    response.writeHead(404).end('Not found');
    return;
  }
  if (requestUrl.searchParams.get('state') !== state) {
    response.writeHead(400).end('Invalid OAuth state');
    server.close();
    return;
  }
  const code = requestUrl.searchParams.get('code');
  if (!code) {
    response.writeHead(400).end(`Spotify authorization failed: ${requestUrl.searchParams.get('error') ?? 'missing code'}`);
    server.close();
    return;
  }

  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: { authorization: `Basic ${credentials}`, 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'authorization_code', code, redirect_uri: redirectUri }),
  });
  if (!tokenResponse.ok) {
    response.writeHead(502).end('Spotify token exchange failed');
    server.close();
    throw new Error(`Spotify token exchange failed with ${tokenResponse.status}: ${await tokenResponse.text()}`);
  }

  await writeFile('.spotify-token.json', `${JSON.stringify(await tokenResponse.json(), null, 2)}\n`, { mode: 0o600 });
  response.writeHead(200, { 'content-type': 'text/plain; charset=utf-8' }).end('Spotify authorization completed. You can close this tab.');
  server.close();
  console.log('Spotify token saved to .spotify-token.json');
});

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error('Port 4321 is already in use. Stop the dev server or another callback process, then retry.');
    process.exitCode = 1;
    return;
  }
  throw error;
});

server.listen(4321, '127.0.0.1', () => {
  console.log('Opening Spotify authorization in your browser...');
  execFile('open', [authorizationUrl.toString()]);
});
