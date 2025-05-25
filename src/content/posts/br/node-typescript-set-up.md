---
title: "Como criar um projeto Node com Typescript"
publishedAt: 2023-12-31
description: "Aprenda a criar um projeto Node com Typescript e Express"
isPublish: true
lang: "br"
---

Apenas um simples post sobre como criar um projeto Node com Typescript e Express.

## 1. Inicializando o projeto

Rode os seguintes comandos para criar uma pasta com o projeto e inicializar o package.json:

```bash
mkdir node-typescript
cd node-typescript/
npm init -y
```

Rode os comandos abaixo para instalar o Express e Typescript (o -D é para instalar como dependência de desenvolvimento):

```bash
npm i express
npm i -D typescript @types/express @types/node
npx tsc --init
```

## 2. Criando o index.ts

Crie um arquivo chamado `src/index.ts`, e adicione o seguinte código para inicializar o servidor:

```typescript
import express, { Express, Request, Response } from "express";

const app: Express = express();
const port = 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Server rodando!");
});

app.listen(port, () => {
  console.log(`Server rodando em http://localhost:${port}`);
});
```
