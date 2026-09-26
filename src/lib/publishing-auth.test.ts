import { describe, expect, it } from 'vitest';
import {
  createSessionToken,
  isValidSessionToken,
  parseBasicCredentials,
  sessionFromCookie,
  sessionCookie,
} from './publishing-auth';

describe('publishing authentication', () => {
  it('parses valid HTTP Basic Auth credentials', () => {
    expect(parseBasicCredentials(`Basic ${btoa('luma:secret')}`)).toEqual({ username: 'luma', password: 'secret' });
    expect(parseBasicCredentials('Bearer token')).toBeNull();
  });

  it('accepts an unexpired signed session and rejects tampering or expiry', async () => {
    const token = await createSessionToken('test-secret', 1_000, 100);

    await expect(isValidSessionToken(token, 'test-secret', 1_050)).resolves.toBe(true);
    await expect(isValidSessionToken(token.replace(/.$/, 'x'), 'test-secret', 1_050)).resolves.toBe(false);
    await expect(isValidSessionToken(token, 'test-secret', 1_100)).resolves.toBe(false);
  });

  it('sets and reads a secure short-lived session cookie', async () => {
    const cookie = sessionCookie(await createSessionToken('test-secret', 1_000));

    expect(cookie).toContain('HttpOnly');
    expect(cookie).toContain('Secure');
    expect(sessionFromCookie(cookie)).toMatch(/^[^.]+\.[^.]+$/);
  });
});
