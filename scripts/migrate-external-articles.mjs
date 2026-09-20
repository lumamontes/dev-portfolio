#!/usr/bin/env node
// One-time migration of Luma's own writing from where it was originally
// published into this repo's canonical content system, per ticket 33 /
// docs/adr/0002-external-entry-preview-strategy.md: migrated once, never
// fetched live at request time.
//
// Handles the two articles with no public API (Medium-style blog post,
// Substack post) via best-effort HTML scraping + review. The four dev.to
// articles are handled by scripts/publish-existing-devto-drafts.mjs
// instead — they already existed locally as unpublished, untranslated-
// provenance drafts (discovered while building this script), so
// re-scraping them here would have created duplicate content.
//
// Usage: node scripts/migrate-external-articles.mjs
//
// HTML-scraped output always needs a manual review pass — page structure
// varies enough (tag-navigation pills, cookie banners, etc.) that this
// can't be fully trusted unattended.

import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { JSDOM } from 'jsdom';
import TurndownService from 'turndown';

const turndown = new TurndownService({ headingStyle: 'atx', codeBlockStyle: 'fenced' });

const browserHeaders = {
  'User-Agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36',
};

function toFrontmatterValue(value) {
  return JSON.stringify(value);
}

function writePost({ slug, title, publishedAt, description, tags, externalUrl, body }) {
  const frontmatter = [
    '---',
    `title: ${toFrontmatterValue(title)}`,
    `publishedAt: ${publishedAt.toISOString().slice(0, 10)}`,
    `description: ${toFrontmatterValue(description)}`,
    `lang: "br"`,
    `tags: ${JSON.stringify(tags)}`,
    `externalUrl: ${toFrontmatterValue(externalUrl)}`,
    `editorialState: "published-elsewhere"`,
    `visibility: "public"`,
    `isPublish: true`,
    '---',
    '',
    body.trim(),
    '',
  ].join('\n');

  const outPath = join(import.meta.dirname, `../src/content/posts/br/${slug}.md`);
  writeFileSync(outPath, frontmatter);
  console.log(`Wrote ${outPath}`);
}

async function migrateHtmlArticle({ slug, url, contentSelector, titleSelector, dateText }) {
  const res = await fetch(url, { headers: browserHeaders });
  if (!res.ok) throw new Error(`Fetch failed for ${url}: ${res.status}`);
  const html = await res.text();
  const dom = new JSDOM(html);
  const doc = dom.window.document;

  const contentEl = doc.querySelector(contentSelector);
  if (!contentEl) throw new Error(`Could not find "${contentSelector}" in ${url} — page structure may have changed`);

  const title = titleSelector ? doc.querySelector(titleSelector)?.textContent?.trim() : undefined;
  const rawBody = turndown.turndown(contentEl.innerHTML);

  // Medium renders its tag-navigation pills inside the <article> container,
  // before the real content, each on its own line with blank lines between
  // them — strip leading blank lines and medium.com/tag/ links until real
  // content starts (Substack's .available-content doesn't have this, so
  // this loop is a no-op there).
  const bodyLines = rawBody.split('\n');
  let start = 0;
  while (start < bodyLines.length) {
    const line = bodyLines[start].trim();
    if (line === '' || /^\[.+\]\(https:\/\/medium\.com\/tag\/.*\)$/.test(line)) {
      start += 1;
    } else {
      break;
    }
  }

  // Medium's byline/read-time/date/clap-repost-bookmark block sits between
  // the title and the real content, and always ends with a literal "Share"
  // line right before the article text starts. If present, skip past it —
  // Substack has no such block, so this is a no-op there.
  const shareIndex = bodyLines.findIndex((line) => line.trim() === 'Share');
  if (shareIndex !== -1 && shareIndex >= start) {
    start = shareIndex + 1;
  }

  let body = bodyLines
    .slice(start)
    .join('\n')
    .replace(/^\n+/, '')
    // A leftover UI hint from Medium's lazy-loaded images that carries no
    // content of its own.
    .replace(/^Press enter or click to view image in full size\n?$/gm, '');

  // Substack appends its own subscribe/share/comment UI inside
  // .available-content, right after the real content ends, always
  // starting with a literal "Inscreva-se" (Subscribe) line.
  const subscribeIndex = body.split('\n').findIndex((line) => line.trim() === 'Inscreva-se');
  if (subscribeIndex !== -1) {
    body = body.split('\n').slice(0, subscribeIndex).join('\n').replace(/\n+$/, '');
  }

  const firstParagraph = body
    .split('\n')
    .find((line) => {
      const trimmed = line.trim();
      return trimmed.length > 20 && !trimmed.startsWith('#') && !trimmed.startsWith('[') && !trimmed.startsWith('!');
    })
    ?.replace(/[*_`]/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .trim();
  const description = firstParagraph
    ? firstParagraph.length > 200
      ? `${firstParagraph.slice(0, 197)}...`
      : firstParagraph
    : title ?? slug;

  writePost({
    slug,
    title: title ?? slug,
    publishedAt: dateText,
    description,
    tags: [],
    externalUrl: url,
    body,
  });
}

await migrateHtmlArticle({
  // Reuses the existing slug — an earlier, shorter draft of this exact
  // article already existed locally under this name (discovered while
  // migrating); this replaces its content with the real, full published
  // text rather than creating a second file for the same article.
  slug: 'how-to-create-good-documentation-as-a-developer',
  url: 'https://blog.arcotech.io/como-criar-uma-boa-documenta%C3%A7%C3%A3o-de-feature-sendo-desenvolvedor-86a6bdb2442c',
  contentSelector: 'article',
  titleSelector: 'h1',
  dateText: new Date('2025-11-10'),
});

await migrateHtmlArticle({
  slug: 'zine-e-a-preservacao-digital-da-memoria',
  url: 'https://bibliotecadezines.substack.com/p/zine-e-a-preservacao-digital-da-memoria',
  contentSelector: '.available-content',
  titleSelector: 'h1.post-title',
  dateText: new Date('2026-09-16'),
});

console.log('Done. Review the generated files under src/content/posts/br/ before committing.');
