#!/usr/bin/env node
// One-time migration of the remaining entries from
// https://github.com/lumamontes/today-i-learned (read from a local clone)
// into the canonical learning-notes collection. 17 of 19 notes were never
// migrated; this also corrects the 2 already-migrated notes' publishedAt,
// which used a placeholder date instead of the note's real creation date
// in the source repo's git history.
//
// Usage: node scripts/migrate-today-i-learned.mjs

import { writeFileSync } from 'node:fs';
import { join } from 'node:path';

const root = join(import.meta.dirname, '..');
const REPO = 'lumamontes/today-i-learned';

const notes = [
  {
    slug: 'astro-notion-integration',
    sourceFile: 'astro-notion-integration-guide.md',
    title: 'Astro + Notion integration guide',
    description: 'Notes on syncing a Notion TIL database into an Astro site to automatically pull and display content.',
    tags: ['astro', 'notion'],
    publishedAt: '2026-02-16',
  },
  {
    slug: 'docker-multistage-kotlin-gradle',
    sourceFile: 'docker-multi-stage-builds-kotlin-gradle.md',
    title: 'Docker multi-stage builds for Kotlin/Gradle projects',
    description: 'Setting up efficient Docker builds for Kotlin backend services with Gradle, learned while working on tarefitas-monorepo.',
    tags: ['docker', 'kotlin'],
    publishedAt: '2026-02-16',
  },
  {
    slug: 'graphql-request-queries-mutations',
    sourceFile: 'graphql-request-queries-and-mutations.md',
    title: 'GraphQL Request: queries and mutations',
    description: 'Using graphql-request to make queries and mutations against a backend.',
    tags: ['graphql'],
    publishedAt: '2025-07-24',
  },
  {
    slug: 'indexeddb-and-dexie',
    sourceFile: 'indexed-db-and-dixie.md',
    title: 'IndexedDB and Dexie',
    description: "Dexie.js wraps IndexedDB's low-level browser storage API in a much less verbose interface.",
    tags: ['indexeddb', 'javascript'],
    publishedAt: '2025-11-22',
  },
  {
    slug: 'json-backup-export-patterns',
    sourceFile: 'json-backup-export-import-patterns.md',
    title: 'JSON backup and export patterns for task management',
    description: 'Implementing JSON-based backup functionality for user data export/import while working on the Tarefitas app.',
    tags: ['data-patterns'],
    publishedAt: '2026-02-16',
  },
  {
    slug: 'kotlin-spring-boot-api',
    sourceFile: 'kotlin-with-spring-boot-for-api-usage.md',
    title: 'Kotlin with Spring Boot for API usage',
    description: "Kotlin's interop with Java and Spring Boot makes for concise, modern REST API code.",
    tags: ['kotlin', 'spring-boot'],
    publishedAt: '2025-11-22',
  },
  {
    slug: 'microfrontends',
    sourceFile: 'microfrontends.md',
    title: 'Microfrontends',
    description: 'An architectural approach where a frontend app is composed of smaller, independently deployable frontend apps.',
    tags: ['architecture', 'frontend'],
    publishedAt: '2025-11-22',
  },
  {
    slug: 'module-federation-rspack',
    sourceFile: 'module-federation-with-rspack.md',
    title: 'Module Federation with Rspack',
    description: "Loading JavaScript applications from other applications at runtime, using Rspack's fast Rust-based bundler.",
    tags: ['module-federation', 'rspack'],
    publishedAt: '2025-11-22',
  },
  {
    slug: 'monorepo-structure-patterns',
    sourceFile: 'monorepo-structure-patterns.md',
    title: 'Monorepo structure patterns for full-stack apps',
    description: 'Practical patterns for organizing multi-platform applications in a single repository, learned building tarefitas-monorepo.',
    tags: ['monorepo'],
    publishedAt: '2026-02-16',
  },
  {
    slug: 'offline-first-inertia-react',
    sourceFile: 'offline-web-app-with-inertia-and-react.md',
    title: 'Offline-first web app with Inertia.js and React',
    description: 'Building a note-taking app with Laravel Inertia.js and React that works offline and syncs when reconnected.',
    tags: ['inertia', 'offline-first'],
    publishedAt: '2025-11-22',
  },
  {
    slug: 'progressive-web-apps',
    sourceFile: 'progressive-web-apps.md',
    title: 'Progressive Web Apps',
    description: 'What makes a website installable as an app — the basics of Progressive Web Apps.',
    tags: ['pwa'],
    publishedAt: '2025-07-29',
  },
  {
    slug: 'react-native-conference-app-architecture',
    sourceFile: 'react-native-conference-app-architecture.md',
    title: 'React Native conference app architecture',
    description: 'Patterns for structuring event/conference mobile apps, learned building the Pupunha Conf app.',
    tags: ['react-native', 'expo'],
    publishedAt: '2026-02-16',
  },
  {
    slug: 'react-native-modal-navigation',
    sourceFile: 'react-native-modal-navigation-patterns.md',
    title: 'React Native modal navigation patterns',
    description: 'Key patterns for implementing modal navigation in React Native with Expo Router.',
    tags: ['react-native', 'expo-router'],
    publishedAt: '2026-02-16',
  },
  {
    slug: 'shopify-flashlist-performance',
    sourceFile: 'shopify-flashlist-react-native-performance.md',
    title: 'Shopify FlashList for React Native performance',
    description: "Replacing FlatList with Shopify's FlashList for better performance with large datasets.",
    tags: ['react-native', 'performance'],
    publishedAt: '2026-02-16',
  },
  {
    slug: 'swiftui-basics',
    sourceFile: 'swift-ui-basics.md',
    title: 'SwiftUI basics',
    description: 'A few basics about getting started with SwiftUI.',
    tags: ['swiftui', 'ios'],
    publishedAt: '2025-07-24',
  },
  {
    slug: 'swiftui-notification-authorization',
    sourceFile: 'swift-ui-check-authorization-notifications.md',
    title: 'Checking notification authorization in SwiftUI',
    description: "Creating a Notification class to check and request the user's notification authorization status.",
    tags: ['swiftui', 'ios'],
    publishedAt: '2025-07-24',
  },
  {
    slug: 'tanstack-router-data-loading',
    sourceFile: 'tanstack-router-data-loading.md',
    title: 'TanStack Router data loading',
    description: 'Data loading in TanStack Router turns out to be very simple.',
    tags: ['tanstack-router'],
    publishedAt: '2025-07-24',
  },
];

// Fixes the 2 already-migrated notes' placeholder publishedAt to their real
// source-repo creation date.
const dateFixes = {
  'effective-technical-writing': '2025-07-24',
  'shared-state-between-islands': '2025-08-21',
};

function writeNote({ slug, sourceFile, title, description, tags, publishedAt }) {
  const frontmatter = [
    '---',
    `title: ${JSON.stringify(title)}`,
    `publishedAt: ${publishedAt}`,
    `description: ${JSON.stringify(description)}`,
    `lang: "en"`,
    `tags: ${JSON.stringify(tags)}`,
    `sourceUrl: "https://github.com/${REPO}/blob/main/${sourceFile}"`,
    `editorialState: "published-here"`,
    `visibility: "public"`,
    '---',
    '',
    `See the full note on [GitHub](https://github.com/${REPO}/blob/main/${sourceFile}).`,
    '',
  ].join('\n');

  const outPath = join(root, `src/content/learning-notes/${slug}.md`);
  writeFileSync(outPath, frontmatter);
  console.log(`Wrote ${outPath}`);
}

for (const note of notes) {
  writeNote(note);
}

console.log('Done writing new notes. Fix the 2 existing notes\' publishedAt manually:');
for (const [slug, date] of Object.entries(dateFixes)) {
  console.log(`  ${slug}.md -> publishedAt: ${date}`);
}
