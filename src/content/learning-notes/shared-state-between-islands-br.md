---
title: "Compartilhando estado entre ilhas do Astro"
publishedAt: 2025-08-21
description: "Ilhas do Astro precisam de uma store no lado do cliente quando vários componentes compartilham estado."
lang: "br"
tags: ["astro", "state-management"]
sourceUrl: "https://github.com/lumamontes/today-i-learned/blob/main/shared-state-between-island-components-astro.md"
editorialState: "published-here"
visibility: "public"
---

Construindo um Pomodoro com Astro e React, tentei compartilhar estado entre vários componentes React com a Context API. Isso não funcionou entre ilhas do Astro.

O Astro recomenda usar uma store no lado do cliente, como o [Nanostores](https://docs.astro.build/pt-br/recipes/sharing-state-islands/), para compartilhar estado entre componentes de ilhas.
