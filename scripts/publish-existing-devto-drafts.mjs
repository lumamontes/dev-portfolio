#!/usr/bin/env node
// One-time fixup: four dev.to articles (ticket 33) already existed locally
// as unpublished drafts (both languages, full content) under different
// slugs than dev.to uses — discovered while writing the migration script,
// which would otherwise have created duplicate content. This publishes
// the real drafts instead of duplicating them: sets editorialState/
// visibility/isPublish, and records externalUrl + the real dev.to publish
// date on the Portuguese originals (the English files are translations
// authored for this site, not independently published elsewhere).

import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import matter from 'gray-matter';

const root = join(import.meta.dirname, '..');

const items = [
  {
    br: 'src/content/posts/br/guard-components-react.md',
    en: 'src/content/posts/en/guard-components-react.md',
    externalUrl: 'https://dev.to/pupunhacode/usando-guardwrapper-components-como-alternativa-a-condicoes-ternarias-no-react-1ch8',
    publishedAt: '2025-08-18',
  },
  {
    br: 'src/content/posts/br/mobile-tech-lead-learnings.md',
    en: 'src/content/posts/en/mobile-tech-lead-learnings.md',
    externalUrl: 'https://dev.to/lumamontes/o-que-eu-aprendi-liderando-tecnicamente-a-criacao-de-um-aplicativo-de-comunicacao-escolar-1agl',
    publishedAt: '2025-08-09',
  },
  {
    br: 'src/content/posts/br/minimalist-state-managment-with-jotai.md',
    en: 'src/content/posts/en/minimalist-state-managment-with-jotai.md',
    externalUrl: 'https://dev.to/lumamontes/gerenciamento-de-estados-de-forma-minimalista-no-react-native-com-jotai-5fle',
    publishedAt: '2024-03-09',
  },
  {
    br: 'src/content/posts/br/authentication-flow-with-expo-router.md',
    en: 'src/content/posts/en/authentication-flow-with-expo-router.md',
    externalUrl: 'https://dev.to/proesc/fluxo-de-autenticacao-no-react-native-usando-expo-router-61h',
    publishedAt: '2024-02-18',
  },
];

// Normalizes to a plain YYYY-MM-DD string — js-yaml round-trips an
// unquoted date like `2025-12-15` into a Date object, which then
// re-serializes as a full ISO datetime unless forced back to a string.
function asDateOnly(value) {
  const date = value instanceof Date ? value : new Date(value);
  return date.toISOString().slice(0, 10);
}

function publish(path, { editorialState, externalUrl, publishedAt }) {
  const fullPath = join(root, path);
  const { data, content } = matter(readFileSync(fullPath, 'utf8'));
  data.isPublish = true;
  data.isDraft = false;
  data.editorialState = editorialState;
  data.visibility = 'public';
  if (externalUrl) data.externalUrl = externalUrl;
  data.publishedAt = asDateOnly(publishedAt ?? data.publishedAt);
  // js-yaml quotes `data.publishedAt` here because it's a plain JS string,
  // not a Date — but Astro's schema (z.date()) needs the bare, unquoted
  // YAML timestamp form the rest of this collection already uses.
  const rawYaml = matter.stringify(content, data, { lineWidth: -1 });
  const fixedYaml = rawYaml.replace(/^publishedAt: ['"](.+?)['"]$/m, 'publishedAt: $1');
  writeFileSync(fullPath, fixedYaml);
  console.log(`Updated ${path}`);
}

for (const item of items) {
  publish(item.br, { editorialState: 'published-elsewhere', externalUrl: item.externalUrl, publishedAt: item.publishedAt });
  publish(item.en, { editorialState: 'published-here' });
}
