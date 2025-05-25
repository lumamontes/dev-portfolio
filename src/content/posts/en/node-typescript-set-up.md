---
title: "How to create a Node project with Typescript"
publishedAt: 2023-12-31
description: "Learn how to create a Node project with Typescript and Express"
isPublish: true
lang: "en"
---

Just a simple post on how to create a Node project with Typescript and Express.

## 1. Initializing the project

Use the following commands to create a folder with the project and initialize the package.json:

```bash
mkdir node-typescript
cd node-typescript/
npm init -y
```

Use the following commands to install Express and Typescript (the -D is to install as a development dependency):

```bash
npm i express
npm i -D typescript @types/express @types/node
npx tsc --init
```

## 2. Creating the index.ts

Create a file called `src/index.ts`, and add the following code to initialize the server:

```typescript
import express, { Express, Request, Response } from "express";

const app: Express = express();
const port = 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Server is running!");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
```
