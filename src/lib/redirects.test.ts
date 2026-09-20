import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { parseRedirects, resolveRedirect } from './redirects';

// The real, deployed file — this test fails if the actual redirect rules
// regress, not a copy of them.
const redirectsPath = fileURLToPath(new URL('../../public/_redirects', import.meta.url));
const rules = parseRedirects(redirectsPath);

describe('legacy route redirects (ticket 34 + existing book redirects)', () => {
  it.each([
    ['/en/about', '/en'],
    ['/br/about', '/br'],
    ['/en/contact', '/en'],
    ['/br/contact', '/br'],
    ['/en/til', '/en/archive'],
    ['/br/til', '/br/archive'],
    ['/en/projects', '/en/archive'],
    ['/br/projects', '/br/archive'],
    ['/en/books', '/en/archive'],
    ['/br/books', '/br/archive'],
    ['/en/books/clean-code', '/en/archive/book/clean-code'],
    ['/br/books/clean-code', '/br/archive/book/clean-code'],
  ])('%s resolves to %s', (from, expected) => {
    expect(resolveRedirect(rules, from)).toBe(expected);
  });

  it('does not redirect an unrelated path', () => {
    expect(resolveRedirect(rules, '/en/archive')).toBeUndefined();
  });
});
