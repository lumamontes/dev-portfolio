---
title: "App web offline-first com Inertia.js e React"
publishedAt: 2025-11-22
description: "Construindo um app de notas com Laravel Inertia.js e React que funciona offline e sincroniza ao reconectar."
lang: "br"
tags: ["inertia","offline-first"]
sourceUrl: "https://github.com/lumamontes/today-i-learned/blob/main/offline-web-app-with-inertia-and-react.md"
editorialState: "published-here"
visibility: "public"
---

Construir uma aplicação web offline-first com Laravel (Inertia.js) e React foi um desafio interessante. O objetivo era criar um app de notas que funcionasse offline sem atrito e sincronizasse quando a conexão voltasse.

## A stack

- **Backend**: Laravel (PHP)
- **Frontend**: React com Inertia.js
- **Armazenamento offline**: IndexedDB com Dexie.js
- **Service Worker**: para cache e suporte offline
- **PWA**: Web App Manifest para o app poder ser instalado

## Principais desafios

### 1. Estratégia de armazenamento duplo

O app precisa trabalhar com duas fontes de dados:
- **Local (IndexedDB)**: para acesso imediato e funcionamento offline
- **Remota (API Laravel)**: para persistência e sincronização

O truque é manter as duas sincronizadas sem criar conflitos nem perder dados.

### 2. Integração com o service worker

O service worker precisa:
- Guardar em cache o app shell (HTML, CSS, JS)
- Guardar em cache as respostas da API para acesso offline
- Cuidar da sincronização em segundo plano quando a conexão voltar
- Usar estratégias de cache adequadas (cache-first para assets, network-first para dados)

### 3. Cuidados com o Inertia.js

O Inertia.js foi pensado para apps renderizados no servidor, o que significa que:
- O carregamento inicial da página vem do servidor
- A navegação seguinte usa requisições AJAX
- Precisamos garantir que o service worker guarde essas respostas em cache corretamente

## Abordagem de implementação

### Arquitetura local-first

1. **Escreva primeiro no IndexedDB**: toda ação do usuário (criar, editar, apagar) é gravada imediatamente no IndexedDB
2. **Fila de sincronização**: as mudanças entram numa fila para sincronizar quando houver conexão
3. **Sincronização em segundo plano**: use a Background Sync API para sincronizar quando a conexão voltar
4. **Resolução de conflitos**: trate os casos em que os dados locais e remotos divergem

### Estratégia do service worker

```javascript
// Cache-first for static assets
workbox.strategies.cacheFirst({
  cacheName: 'app-shell',
  plugins: [/* ... */]
});

// Network-first for API calls
workbox.strategies.networkFirst({
  cacheName: 'api-cache',
  plugins: [/* ... */]
});
```

### Padrão de fila de sincronização

```javascript
// When offline, queue operations
const syncQueue = [];

async function createNote(note) {
  // Write to IndexedDB immediately
  await db.notes.add(note);
  
  // Queue for sync
  syncQueue.push({
    type: 'create',
    data: note,
    timestamp: Date.now()
  });
  
  // Try to sync if online
  if (navigator.onLine) {
    await syncQueue();
  }
}
```

## Lições aprendidas

1. **A experiência importa**: a pessoa nunca deveria sentir que está "offline" — o app deve funcionar sem atrito
2. **Conflitos de sincronização são difíceis**: decidir qual versão ganha num conflito exige cuidado
3. **Service workers são poderosos, mas complexos**: fazem muita coisa, mas depurar pode ser chato
4. **O IndexedDB é seu amigo**: para guardar muitos dados estruturados localmente, é a melhor opção

## Aplicação no mundo real

Construí isso como parte do projeto [proesc-notes](https://github.com/lumamontes/proesc-notes) — um app de notas para colaboradores. O app mostra:
- Arquitetura offline-first
- Implementação de service worker
- Uso do IndexedDB com Dexie
- Integração Laravel + Inertia.js + React
- Recursos de PWA (instalação, suporte offline)

Links:

- [Proesc Notes Repository](https://github.com/lumamontes/proesc-notes)
- [Inertia.js Documentation](https://inertiajs.com/)
- [MDN - Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [MDN - Background Sync API](https://developer.mozilla.org/en-US/docs/Web/API/Background_Sync_API)

Escrito originalmente (em inglês) nas minhas notas [today-i-learned](https://github.com/lumamontes/today-i-learned/blob/main/offline-web-app-with-inertia-and-react.md).
