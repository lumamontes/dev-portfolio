import { readFileSync } from 'node:fs';

export interface RedirectRule {
  from: string;
  to: string;
  status: number;
}

/** Parses a Cloudflare Pages `_redirects` file (blank lines/comments skipped). */
export function parseRedirects(filePath: string): RedirectRule[] {
  const content = readFileSync(filePath, 'utf8');
  return content
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && !line.startsWith('#'))
    .map((line) => {
      const [from, to, status] = line.split(/\s+/);
      return { from, to, status: Number(status) };
    });
}

/**
 * Resolves a request path against the parsed rules the same way Cloudflare
 * Pages would: first exact match, then `:param` patterns, substituting
 * matched segments into the destination.
 */
export function resolveRedirect(rules: RedirectRule[], path: string): string | undefined {
  const exact = rules.find((rule) => rule.from === path);
  if (exact) return exact.to;

  for (const rule of rules) {
    if (!rule.from.includes(':')) continue;
    const fromParts = rule.from.split('/');
    const pathParts = path.split('/');
    if (fromParts.length !== pathParts.length) continue;

    const params: Record<string, string> = {};
    const isMatch = fromParts.every((part, i) => {
      if (part.startsWith(':')) {
        params[part.slice(1)] = pathParts[i];
        return true;
      }
      return part === pathParts[i];
    });
    if (!isMatch) continue;

    return rule.to.replace(/:(\w+)/g, (_, name) => params[name] ?? '');
  }

  return undefined;
}
