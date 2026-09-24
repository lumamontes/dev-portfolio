---
title: "Module Federation com Rspack"
publishedAt: 2025-11-22
description: "Carregando aplicações JavaScript a partir de outras aplicações em tempo de execução, usando o bundler rápido do Rspack, escrito em Rust."
lang: "br"
tags: ["module-federation","rspack"]
sourceUrl: "https://github.com/lumamontes/today-i-learned/blob/main/module-federation-with-rspack.md"
editorialState: "published-here"
visibility: "public"
---

Module Federation é um recurso poderoso que permite que aplicações JavaScript carreguem dinamicamente código de outras aplicações em tempo de execução. Combinado com o Rspack (um bundler web rápido escrito em Rust), ele permite construir arquiteturas de microfrontends com ótima performance.

## O que é Module Federation?

O Module Federation permite que uma aplicação JavaScript use módulos de outra aplicação sem empacotar as duas juntas. Isso possibilita:

- **Deploys independentes**: cada aplicação pode ser publicada separadamente
- **Compartilhamento de código em tempo de execução**: aplicações compartilham código enquanto rodam
- **Autonomia dos times**: times diferentes trabalham em partes diferentes de forma independente
- **Bundles menores**: carregue só o que precisa, quando precisa

## O que é Rspack?

O Rspack é um bundler web rápido, escrito em Rust, pensado para substituir o webpack diretamente. Ele oferece:

- **Builds mais rápidos**: bem mais rápido que o webpack por ser implementado em Rust
- **Compatibilidade com webpack**: suporta a maioria dos plugins e loaders do webpack
- **Mais performance**: otimizado para aplicações de grande porte
- **Suporte a Module Federation**: suporte nativo a Module Federation

## Configuração básica

### Configuração do Rspack

```javascript
// rspack.config.js
const { ModuleFederationPlugin } = require('@rspack/core');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  plugins: [
    new ModuleFederationPlugin({
      name: 'host', // Name of this application
      remotes: {
        // Remote applications we want to consume
        remoteApp: 'remoteApp@http://localhost:3001/remoteEntry.js',
      },
      shared: {
        // Shared dependencies
        react: {
          singleton: true,
          requiredVersion: '^18.0.0',
        },
        'react-dom': {
          singleton: true,
          requiredVersion: '^18.0.0',
        },
      },
    }),
  ],
};
```

### Configuração da aplicação remota

```javascript
// rspack.config.js (Remote App)
const { ModuleFederationPlugin } = require('@rspack/core');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  plugins: [
    new ModuleFederationPlugin({
      name: 'remoteApp',
      filename: 'remoteEntry.js', // Entry point for remote
      exposes: {
        // What this app exposes to others
        './Button': './src/components/Button',
        './Card': './src/components/Card',
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: '^18.0.0',
        },
        'react-dom': {
          singleton: true,
          requiredVersion: '^18.0.0',
        },
      },
    }),
  ],
};
```

## Usando módulos remotos

### Import dinâmico

```javascript
// In the host application
import React from 'react';

const RemoteButton = React.lazy(() => import('remoteApp/Button'));

function App() {
  return (
    <div>
      <React.Suspense fallback={<div>Loading...</div>}>
        <RemoteButton />
      </React.Suspense>
    </div>
  );
}
```

### Import direto (com a configuração certa)

```javascript
// If configured correctly, you can import directly
import Button from 'remoteApp/Button';

function App() {
  return (
    <div>
      <Button label="Click me" />
    </div>
  );
}
```

## Dependências compartilhadas

Um dos recursos principais é compartilhar dependências para não carregá-las várias vezes:

```javascript
shared: {
  react: {
    singleton: true, // Only one instance
    requiredVersion: '^18.0.0', // Version requirement
    eager: false, // Load immediately or lazily
  },
  'react-dom': {
    singleton: true,
    requiredVersion: '^18.0.0',
  },
}
```

## Configuração avançada

### Remotes por ambiente

```javascript
const remotes = process.env.NODE_ENV === 'production'
  ? {
      remoteApp: 'remoteApp@https://cdn.example.com/remoteEntry.js',
    }
  : {
      remoteApp: 'remoteApp@http://localhost:3001/remoteEntry.js',
    };

module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: 'host',
      remotes,
      // ...
    }),
  ],
};
```

### Suporte a TypeScript

Com TypeScript, você vai precisar declarar os módulos remotos:

```typescript
// types/remotes.d.ts
declare module 'remoteApp/Button' {
  export interface ButtonProps {
    label: string;
    onClick?: () => void;
  }
  const Button: React.FC<ButtonProps>;
  export default Button;
}
```

## Vantagens de Rspack + Module Federation

1. **Builds rápidos**: a implementação em Rust do Rspack deixa os builds bem mais rápidos
2. **DX melhor**: ciclo de feedback mais rápido durante o desenvolvimento
3. **Escalabilidade**: lida com bases de código grandes de forma eficiente
4. **Compatibilidade**: funciona com o ecossistema do webpack que já existe
5. **Performance**: divisão de bundles e carregamento de código otimizados

## Padrões comuns

### Arquitetura de microfrontends

```
┌─────────────┐
│   Host App  │
│  (Shell)    │
└──────┬──────┘
       │
       ├───► Remote App 1 (Products)
       ├───► Remote App 2 (Cart)
       └───► Remote App 3 (Checkout)
```

### Biblioteca de componentes compartilhada

```javascript
// Shared library exposes components
exposes: {
  './Button': './src/components/Button',
  './Input': './src/components/Input',
  './Card': './src/components/Card',
}
```

### Configuração em tempo de execução

```javascript
// Load remotes dynamically at runtime
const loadRemote = (remoteName, moduleName) => {
  return import(`${remoteName}/${moduleName}`);
};
```

## Desafios e soluções

### Conflitos de versão
- Use `singleton: true` para dependências críticas
- Especifique `requiredVersion` para garantir compatibilidade
- Use `eager: true` para dependências que precisam carregar imediatamente

### Problemas de rede
- Implemente novas tentativas ao carregar remotes
- Tenha uma interface de fallback quando um remote falhar
- Guarde os remote entries em cache quando possível

### Fluxo de desenvolvimento
- Rode vários servidores de dev (um por app)
- Use ferramentas como `concurrently` para gerenciar vários processos
- Considere usar uma ferramenta de monorepo como Nx ou Turborepo

## Boas práticas

1. **Versione seus remotes**: use versionamento semântico nos módulos remotos
2. **Documente os módulos expostos**: deixe claro o que cada remote expõe
3. **Teste a integração**: teste como os remotes funcionam juntos
4. **Error boundaries**: envolva componentes remotos em error boundaries
5. **Estados de carregamento**: sempre mostre um feedback de carregamento
6. **Dependências compartilhadas**: gerencie com cuidado as dependências compartilhadas para evitar conflitos

Links:

- [Module Federation Documentation](https://module-federation.github.io/)
- [Rspack Documentation](https://rspack.dev/)
- [Webpack Module Federation Guide](https://webpack.js.org/concepts/module-federation/)
- [Micro Frontends (Martin Fowler)](https://martinfowler.com/articles/micro-frontends.html)

Escrito originalmente (em inglês) nas minhas notas [today-i-learned](https://github.com/lumamontes/today-i-learned/blob/main/module-federation-with-rspack.md).
