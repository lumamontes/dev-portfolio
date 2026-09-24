---
title: "IndexedDB e Dexie"
publishedAt: 2025-11-22
description: "O Dexie.js envolve a API de armazenamento de baixo nível do IndexedDB em uma interface bem menos verbosa."
lang: "br"
tags: ["indexeddb","javascript"]
sourceUrl: "https://github.com/lumamontes/today-i-learned/blob/main/indexed-db-and-dixie.md"
editorialState: "published-here"
visibility: "public"
---

IndexedDB é uma API de baixo nível para armazenar no lado do cliente grandes quantidades de dados estruturados, incluindo arquivos/blobs. É uma API poderosa do navegador que permite guardar muitos dados localmente, mas trabalhar com ela diretamente pode ser bem verboso e complexo.

É aí que entra o Dexie.js. O Dexie é uma biblioteca minimalista que envolve o IndexedDB e deixa o trabalho com ele bem mais agradável. Ele oferece uma API limpa, baseada em promises, que parece mais com usar um banco de dados moderno.

## Por que IndexedDB?

- **Grande capacidade de armazenamento**: diferente do localStorage (limitado a ~5-10MB), o IndexedDB consegue guardar muito mais dados
- **Dados estruturados**: é um banco NoSQL que guarda objetos, não só strings
- **Consultas indexadas**: dá pra criar índices em propriedades para buscas rápidas
- **Transações**: suporte nativo a operações atômicas
- **Assíncrono**: todas as operações são assíncronas, então não bloqueiam a thread principal

## Por que Dexie?

A API nativa do IndexedDB é bem verbosa. Veja como fica uma consulta simples com o IndexedDB nativo vs. com o Dexie:

**IndexedDB nativo** (verboso):
```javascript
const request = indexedDB.open('myDB', 1);
request.onsuccess = (event) => {
  const db = event.target.result;
  const transaction = db.transaction(['notes'], 'readonly');
  const store = transaction.objectStore('notes');
  const getRequest = store.get(1);
  getRequest.onsuccess = (event) => {
    console.log(event.target.result);
  };
};
```

**Dexie** (limpo):
```javascript
const db = new Dexie('myDB');
db.version(1).stores({
  notes: '++id, title, content, createdAt'
});

const note = await db.notes.get(1);
```

## Principais recursos do Dexie

- **Definição de schema**: defina o schema do banco de um jeito limpo e declarativo
- **Baseado em promises**: todas as operações retornam promises, o que facilita usar async/await
- **Suporte a TypeScript**: ótimas definições de tipos disponíveis
- **Suporte a migrações**: versionamento e migrações de schema fáceis
- **Construção de consultas**: métodos encadeáveis como `.where()`, `.filter()`, `.sort()`

## Casos de uso comuns

- Aplicações offline-first que precisam guardar dados localmente
- Cache de grandes volumes de dados vindos de APIs
- Progressive Web Apps (PWAs) que funcionam offline
- Aplicações que precisam de busca e filtros locais rápidos

## Exemplo de configuração

```javascript
import Dexie from 'dexie';

const db = new Dexie('NotesDB');

db.version(1).stores({
  notes: '++id, title, content, createdAt, updatedAt'
});

// Add a note
await db.notes.add({
  title: 'My Note',
  content: 'Note content here',
  createdAt: new Date(),
  updatedAt: new Date()
});

// Query notes
const allNotes = await db.notes.toArray();
const recentNotes = await db.notes
  .where('createdAt')
  .above(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000))
  .toArray();
```

Links:

- [MDN - IndexedDB API](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)
- [Dexie.js Documentation](https://dexie.org/)
- [Dexie.js GitHub](https://github.com/dexie/Dexie.js)

Escrito originalmente (em inglês) nas minhas notas [today-i-learned](https://github.com/lumamontes/today-i-learned/blob/main/indexed-db-and-dixie.md).
