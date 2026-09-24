---
title: "Padrões de estrutura de monorepo para apps full-stack"
publishedAt: 2026-02-16
description: "Padrões práticos para organizar aplicações multiplataforma em um único repositório, aprendidos construindo o tarefitas-monorepo."
lang: "br"
tags: ["monorepo"]
sourceUrl: "https://github.com/lumamontes/today-i-learned/blob/main/monorepo-structure-patterns.md"
editorialState: "published-here"
visibility: "public"
---

Construir o tarefitas-monorepo me ensinou padrões práticos para organizar aplicações multiplataforma em um único repositório.

## Estrutura de diretórios

Organize por plataforma/tecnologia em vez de por funcionalidade:

```
tarefitas-monorepo/
├── backend/          # Kotlin Spring Boot API
│   ├── src/
│   ├── build.gradle.kts
│   └── Dockerfile
├── frontend/         # Web app (React/Vue/etc)
│   ├── src/
│   ├── package.json
│   └── dist/
├── mobile/          # React Native/Flutter app
│   ├── src/
│   ├── package.json
│   └── app.config.js
├── shared/          # Common types, utils, constants
│   └── types/
└── docker-compose.yml
```

## Vantagens dessa estrutura

- **Separação clara de responsabilidades**: cada plataforma tem seu próprio processo de build
- **Deploys independentes**: backend, frontend e mobile podem ser publicados separadamente  
- **Código compartilhado**: tipos e utilitários comuns em `/shared`
- **Repositório único**: coordenação mais fácil entre os times

## Gerenciamento de pacotes

Use workspaces para gerenciar as dependências:

```json
// package.json (root)
{
  "workspaces": [
    "frontend",
    "mobile",
    "shared"
  ]
}
```

Assim dá pra instalar todas as dependências JS a partir da raiz: `npm install`

## Orquestração com Docker Compose

Defina todos os serviços em um único arquivo compose:

```yaml
services:
  backend:
    build: ./backend
    ports: ["8080:8080"]
  
  frontend:
    build: ./frontend  
    ports: ["3000:3000"]
    
  postgres:
    image: postgres:16
```

## Desenvolvimento multiplataforma

Mantenha as interfaces compartilhadas consistentes:

```typescript
// shared/types/task.ts
export interface Task {
  id: string;
  title: string;
  completed: boolean;
}

// Used in backend (Kotlin), frontend (TS), and mobile (TS)
```

Essa estrutura escala bem conforme os times e as funcionalidades crescem.

Escrito originalmente (em inglês) nas minhas notas [today-i-learned](https://github.com/lumamontes/today-i-learned/blob/main/monorepo-structure-patterns.md).
