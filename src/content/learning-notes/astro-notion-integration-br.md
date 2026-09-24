---
title: "Guia de integração Astro + Notion"
publishedAt: 2026-02-16
description: "Anotações sobre sincronizar um banco de dados de TIL do Notion com um site Astro para puxar e exibir conteúdo automaticamente."
lang: "br"
tags: ["astro","notion"]
sourceUrl: "https://github.com/lumamontes/today-i-learned/blob/main/astro-notion-integration-guide.md"
editorialState: "published-here"
visibility: "public"
---

## Visão geral
Este guia mostra como integrar seu banco de dados de TIL do Notion com seu site de portfólio em Astro para puxar e exibir o conteúdo automaticamente.

## Pré-requisitos
- Projeto Astro configurado
- Banco de dados do Notion com as entradas de TIL
- Token de integração do Notion

## Passo 1: instale as dependências

```bash
pnpm add @notionhq/client
pnpm add -D @types/node
```

## Passo 2: variáveis de ambiente

Crie/atualize o arquivo `.env`:
```env
NOTION_TOKEN=your_notion_token_here
NOTION_DATABASE_ID=your_database_id_here
```

Adicione ao `.env.example`:
```env
NOTION_TOKEN=
NOTION_DATABASE_ID=
```

## Passo 3: utilitário da API do Notion

Crie `src/lib/notion.ts`:

```typescript
import { Client } from '@notionhq/client';

const notion = new Client({
  auth: import.meta.env.NOTION_TOKEN,
});

export interface TILEntry {
  id: string;
  title: string;
  content: string;
  tags: string[];
  date: string;
  published: boolean;
  slug: string;
  sourceUrl?: string;
}

export async function getTILEntries(): Promise<TILEntry[]> {
  try {
    const response = await notion.databases.query({
      database_id: import.meta.env.NOTION_DATABASE_ID,
      filter: {
        property: 'Published',
        checkbox: {
          equals: true,
        },
      },
      sorts: [
        {
          property: 'Date',
          direction: 'descending',
        },
      ],
    });

    return await Promise.all(
      response.results.map(async (page: any) => {
        // Get page content
        const blocks = await notion.blocks.children.list({
          block_id: page.id,
        });

        // Extract text content from blocks
        const content = blocks.results
          .map((block: any) => {
            if (block.type === 'paragraph') {
              return block.paragraph.rich_text
                .map((text: any) => text.plain_text)
                .join('');
            }
            return '';
          })
          .filter(Boolean)
          .join('\n\n');

        return {
          id: page.id,
          title: page.properties.Title.title[0]?.plain_text || '',
          content,
          tags: page.properties.Tags.multi_select.map((tag: any) => tag.name),
          date: page.properties.Date.date?.start || '',
          published: page.properties.Published.checkbox,
          slug: page.properties.Slug.rich_text[0]?.plain_text || '',
          sourceUrl: page.properties.Source?.url || undefined,
        };
      })
    );
  } catch (error) {
    console.error('Error fetching TIL entries:', error);
    return [];
  }
}

export async function getTILEntry(slug: string): Promise<TILEntry | null> {
  const entries = await getTILEntries();
  return entries.find(entry => entry.slug === slug) || null;
}
```

## Passo 4: página de índice dos TILs

Crie `src/pages/til/index.astro`:

```astro
---
import Layout from '../../layouts/Layout.astro';
import { getTILEntries } from '../../lib/notion';

const tilEntries = await getTILEntries();
---

<Layout title="Today I Learned">
  <main class="max-w-4xl mx-auto px-4 py-8">
    <h1 class="text-4xl font-bold mb-8">Today I Learned</h1>
    
    <div class="grid gap-6">
      {tilEntries.map((entry) => (
        <article class="border rounded-lg p-6 hover:shadow-lg transition-shadow">
          <h2 class="text-2xl font-semibold mb-2">
            <a href={`/til/${entry.slug}`} class="hover:text-blue-600">
              {entry.title}
            </a>
          </h2>
          
          <div class="flex items-center gap-4 mb-3 text-sm text-gray-600">
            <time>{new Date(entry.date).toLocaleDateString()}</time>
            {entry.sourceUrl && (
              <a href={entry.sourceUrl} class="text-blue-500 hover:underline" target="_blank">
                Source
              </a>
            )}
          </div>
          
          <div class="flex flex-wrap gap-2 mb-4">
            {entry.tags.map((tag) => (
              <span class="bg-gray-200 px-2 py-1 rounded-md text-xs">
                {tag}
              </span>
            ))}
          </div>
          
          <p class="text-gray-700 line-clamp-3">
            {entry.content.substring(0, 200)}...
          </p>
        </article>
      ))}
    </div>
  </main>
</Layout>
```

## Passo 5: página individual de cada TIL

Crie `src/pages/til/[slug].astro`:

```astro
---
import Layout from '../../layouts/Layout.astro';
import { getTILEntry, getTILEntries } from '../../lib/notion';

export async function getStaticPaths() {
  const entries = await getTILEntries();
  
  return entries.map((entry) => ({
    params: { slug: entry.slug },
    props: { entry },
  }));
}

const { entry } = Astro.props;

if (!entry) {
  return Astro.redirect('/404');
}
---

<Layout title={entry.title}>
  <article class="max-w-3xl mx-auto px-4 py-8">
    <header class="mb-8">
      <h1 class="text-4xl font-bold mb-4">{entry.title}</h1>
      
      <div class="flex items-center gap-4 mb-4 text-gray-600">
        <time>{new Date(entry.date).toLocaleDateString()}</time>
        {entry.sourceUrl && (
          <a href={entry.sourceUrl} class="text-blue-500 hover:underline" target="_blank">
            View Source
          </a>
        )}
      </div>
      
      <div class="flex flex-wrap gap-2">
        {entry.tags.map((tag) => (
          <span class="bg-gray-200 px-3 py-1 rounded-md text-sm">
            {tag}
          </span>
        ))}
      </div>
    </header>
    
    <div class="prose max-w-none">
      {entry.content.split('\n\n').map((paragraph) => (
        <p class="mb-4">{paragraph}</p>
      ))}
    </div>
    
    <footer class="mt-8 pt-4 border-t">
      <a href="/til" class="text-blue-500 hover:underline">
        ← Back to TIL
      </a>
    </footer>
  </article>
</Layout>
```

## Passo 6: adicione à navegação

Adicione o link dos TILs à navegação principal:

```astro
<!-- In your navigation component -->
<nav>
  <a href="/til">Today I Learned</a>
  <!-- other nav items -->
</nav>
```

## Passo 7: feed RSS (opcional)

Crie `src/pages/til.xml.js`:

```javascript
import rss from '@astrojs/rss';
import { getTILEntries } from '../lib/notion';

export async function GET(context) {
  const entries = await getTILEntries();
  
  return rss({
    title: 'Today I Learned',
    description: 'My learning journey in tech',
    site: context.site,
    items: entries.map((entry) => ({
      title: entry.title,
      pubDate: new Date(entry.date),
      description: entry.content.substring(0, 200) + '...',
      link: `/til/${entry.slug}/`,
    })),
  });
}
```

## Passo 8: configuração do build

Atualize o `astro.config.mjs` para incluir as variáveis de ambiente:

```javascript
import { defineConfig } from 'astro/config';

export default defineConfig({
  // ... other config
  vite: {
    define: {
      'import.meta.env.NOTION_TOKEN': JSON.stringify(process.env.NOTION_TOKEN),
      'import.meta.env.NOTION_DATABASE_ID': JSON.stringify(process.env.NOTION_DATABASE_ID),
    },
  },
});
```

## Passo 9: deploy

1. Adicione as variáveis de ambiente na sua plataforma de hospedagem (Vercel, Netlify etc.)
2. Publique o site

## Passo 10: automação (opcional)

Para refazer o build automaticamente quando você adicionar novos TILs:

### Opção A: webhook + build hook
1. Configure um webhook no Notion (se disponível)
2. Faça ele disparar o build hook do seu deploy

### Opção B: builds agendados
1. Configure builds agendados na sua plataforma de hospedagem
2. Refaça o build diariamente/semanalmente para puxar o conteúdo novo

## Como usar

1. Escreva novos TILs no Notion
2. Marque como "Published" quando estiverem prontos
3. O site vai puxá-los automaticamente no próximo build
4. Para atualizar na hora, dispare um build manual

## Sobre o estilo

Os exemplos usam classes do Tailwind CSS. Ajuste o estilo para combinar com o seu design system.

## Resolução de problemas

- **Erros de build**: confira se as variáveis de ambiente estão configuradas corretamente
- **Sem conteúdo**: verifique se as entradas estão marcadas como "Published" no Notion
- **Erros na API**: confira se sua integração do Notion tem acesso ao banco de dados

## Próximos passos

- Adicionar busca
- Implementar filtro por tags
- Adicionar paginação para muitas entradas
- Criar uma seção de livros seguindo o mesmo padrão

Escrito originalmente (em inglês) nas minhas notas [today-i-learned](https://github.com/lumamontes/today-i-learned/blob/main/astro-notion-integration-guide.md).
