import { createServer } from 'node:http';
import { execFile } from 'node:child_process';
import { randomBytes } from 'node:crypto';
import { writeFile } from 'node:fs/promises';

const clientId = process.env.WORDPRESS_CLIENT_ID;
const clientSecret = process.env.WORDPRESS_CLIENT_SECRET;
const redirectUri = 'http://localhost:4321/callback';
const authorizationEndpoint = 'https://public-api.wordpress.com/oauth2/authorize';
const tokenEndpoint = 'https://public-api.wordpress.com/oauth2/token';

if (!clientId || !clientSecret) {
  throw new Error('WORDPRESS_CLIENT_ID and WORDPRESS_CLIENT_SECRET must be set in .env');
}

const state = randomBytes(24).toString('hex');
const authorizationUrl = new URL(authorizationEndpoint);
authorizationUrl.searchParams.set('client_id', clientId);
authorizationUrl.searchParams.set('redirect_uri', redirectUri);
authorizationUrl.searchParams.set('response_type', 'code');
authorizationUrl.searchParams.set('scope', 'posts media taxonomy');
authorizationUrl.searchParams.set('blog', 'tururu61.wordpress.com');
authorizationUrl.searchParams.set('state', state);

const server = createServer(async (request, response) => {
  const requestUrl = new URL(request.url ?? '/', redirectUri);
  if (requestUrl.pathname !== '/callback') {
    response.writeHead(404).end('Not found');
    return;
  }

  if (requestUrl.searchParams.get('state') !== state) {
    response.writeHead(400).end('Invalid OAuth state');
    server.close();
    return;
  }

  const error = requestUrl.searchParams.get('error');
  const code = requestUrl.searchParams.get('code');
  if (error || !code) {
    response.writeHead(400).end(`WordPress authorization failed: ${error ?? 'missing code'}`);
    server.close();
    return;
  }

  const tokenResponse = await fetch(tokenEndpoint, {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      code,
      grant_type: 'authorization_code',
      redirect_uri: redirectUri,
    }),
  });

  if (!tokenResponse.ok) {
    const details = await tokenResponse.text();
    response.writeHead(502).end('Token exchange failed');
    server.close();
    throw new Error(`Token exchange failed with ${tokenResponse.status}: ${details}`);
  }

  const token = await tokenResponse.json();
  await writeFile('.wordpress-token.json', `${JSON.stringify(token, null, 2)}\n`, { mode: 0o600 });
  response.writeHead(200, { 'content-type': 'text/plain; charset=utf-8' }).end('WordPress authorization completed. You can close this tab.');
  server.close();
  console.log('WordPress token saved to .wordpress-token.json');
});

server.listen(4321, '127.0.0.1', () => {
  console.log('Opening WordPress authorization in your browser...');
  execFile('open', [authorizationUrl.toString()]);
});
