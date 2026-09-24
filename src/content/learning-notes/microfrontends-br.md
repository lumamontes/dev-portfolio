---
title: "Microfrontends"
publishedAt: 2025-11-22
description: "Uma abordagem de arquitetura em que uma aplicação frontend é composta por aplicações frontend menores, que podem ser publicadas de forma independente."
lang: "br"
tags: ["architecture","frontend"]
sourceUrl: "https://github.com/lumamontes/today-i-learned/blob/main/microfrontends.md"
editorialState: "published-here"
visibility: "public"
---

Microfrontends são uma abordagem de arquitetura em que uma aplicação frontend é composta por aplicações frontend menores, que podem ser publicadas de forma independente. Cada microfrontend pertence a um time diferente e pode ser desenvolvido, testado e publicado de forma independente.

## O que são microfrontends?

Parecido com os microsserviços no backend, microfrontends quebram um frontend monolítico em pedaços menores e independentes. Cada pedaço:

- **É dono de uma funcionalidade ou domínio**: como "catálogo de produtos", "carrinho", "perfil do usuário"
- **Pode ser desenvolvido de forma independente**: times diferentes trabalham em partes diferentes
- **Pode ser publicado de forma independente**: mudar uma parte não exige publicar tudo de novo
- **Usa sua própria stack** (opcional): cada time pode escolher seus frameworks

## Por que microfrontends?

### Vantagens

1. **Autonomia dos times**: times diferentes trabalham de forma independente sem bloquear uns aos outros
2. **Diversidade de tecnologias**: os times podem usar frameworks diferentes (React, Vue, Angular etc.)
3. **Deploys independentes**: publique mudanças em uma funcionalidade sem afetar as outras
4. **Escalabilidade**: fica mais fácil escalar times e bases de código
5. **Desenvolvimento mais rápido**: bases de código menores são mais fáceis de entender e modificar

### Desafios

1. **Complexidade**: mais peças para gerenciar
2. **Tamanho do bundle**: risco de carregar dependências duplicadas
3. **Consistência**: é mais difícil manter a UI/UX consistente entre os times
4. **Integração**: é preciso coordenar aplicações diferentes
5. **Testes**: testes de integração mais complexos

## Abordagens de implementação

### 1. Integração em tempo de build

Componha os microfrontends em tempo de build:

```
┌─────────────────┐
│  Main App       │
│  (Build Time)   │
├─────────────────┤
│  - Products App │
│  - Cart App     │
│  - Checkout App │
└─────────────────┘
```

**Prós**: simples, bundle único
**Contras**: exige um novo build a cada mudança, sem deploy independente

### 2. Integração em tempo de execução (Module Federation)

Carregue os microfrontends em tempo de execução usando Module Federation:

```javascript
// Host application
const RemoteProduct = React.lazy(() => import('products/ProductList'));
const RemoteCart = React.lazy(() => import('cart/CartView'));

function App() {
  return (
    <div>
      <React.Suspense fallback={<div>Loading...</div>}>
        <RemoteProduct />
        <RemoteCart />
      </React.Suspense>
    </div>
  );
}
```

**Prós**: deploy realmente independente, composição em tempo de execução
**Contras**: configuração mais complexa, dependência de rede

### 3. Integração com iframe

Incorpore os microfrontends usando iframes:

```html
<iframe src="https://products.example.com" />
<iframe src="https://cart.example.com" />
```

**Prós**: isolamento completo, fácil de implementar
**Contras**: dificuldade de comunicação, problemas de estilo, custo de performance

### 4. Web Components

Use Web Components como camada de integração:

```javascript
// Microfrontend exposes as web component
class ProductList extends HTMLElement {
  connectedCallback() {
    this.innerHTML = '<div>Product List</div>';
  }
}

customElements.define('product-list', ProductList);
```

```html
<!-- Host uses web component -->
<product-list></product-list>
```

**Prós**: independente de framework, suporte nativo do navegador
**Contras**: suporte limitado a alguns recursos nos navegadores, experiência de desenvolvimento pior

## Padrões de arquitetura

### Padrão shell

Uma aplicação shell que orquestra os microfrontends:

```
┌─────────────────────────┐
│      Shell App          │
│  (Navigation, Layout)   │
├─────────────────────────┤
│  ┌──────────┐ ┌───────┐│
│  │ Products │ │ Cart  ││
│  │   App    │ │  App  ││
│  └──────────┘ └───────┘│
└─────────────────────────┘
```

### Apps autocontidos

Cada microfrontend é uma aplicação completa:

```
┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│ Products    │  │ Cart        │  │ Checkout    │
│ App         │  │ App         │  │ App         │
│ (Full App)  │  │ (Full App)  │  │ (Full App)  │
└─────────────┘  └─────────────┘  └─────────────┘
```

## Padrões de comunicação

### 1. Props/eventos (pai-filho)

```javascript
// Host passes data down
<RemoteProduct userId={userId} />

// Microfrontend emits events
window.dispatchEvent(new CustomEvent('product-selected', { 
  detail: { productId: 123 } 
}));
```

### 2. Estado compartilhado (store global)

```javascript
// Shared state management
const store = {
  user: null,
  cart: [],
  setUser: (user) => { /* ... */ },
  addToCart: (item) => { /* ... */ },
};

// All microfrontends access the same store
window.sharedStore = store;
```

### 3. Eventos customizados

```javascript
// Microfrontend 1 publishes
window.dispatchEvent(new CustomEvent('cart-updated', {
  detail: { itemCount: 5 }
}));

// Microfrontend 2 subscribes
window.addEventListener('cart-updated', (event) => {
  console.log('Cart updated:', event.detail);
});
```

### 4. Baseado em URL/rota

```javascript
// Share state through URL parameters
// /products?category=electronics&sort=price

// Microfrontends read from URL
const params = new URLSearchParams(window.location.search);
const category = params.get('category');
```

## Opções de stack

### Module Federation (Webpack/Rspack)

- **Melhor para**: aplicações React, Vue, Angular
- **Prós**: suporte a frameworks, code splitting, dependências compartilhadas
- **Contras**: acoplamento com a ferramenta de build

### Single-SPA

- **Melhor para**: ambientes com vários frameworks
- **Prós**: independente de framework, integração com roteamento
- **Contras**: uma camada de abstração a mais

### Qiankun (Alibaba)

- **Melhor para**: aplicações de grande porte
- **Prós**: testado em produção, cheio de recursos
- **Contras**: documentação principalmente em chinês

### Web Components

- **Melhor para**: soluções independentes de framework
- **Prós**: suporte nativo do navegador, não precisa de ferramenta de build
- **Contras**: experiência de desenvolvimento pior, recursos limitados

## Boas práticas

### 1. Design System

Crie um design system compartilhado para manter a consistência:

```javascript
// Shared design tokens
export const colors = {
  primary: '#007bff',
  secondary: '#6c757d',
  // ...
};

// Shared components
export { Button, Input, Card } from './components';
```

### 2. Contratos de API

Defina contratos claros entre os microfrontends:

```typescript
// Shared types
export interface Product {
  id: string;
  name: string;
  price: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
```

### 3. Versionamento

Versione seus microfrontends e APIs:

```
/products/v1/ProductList
/products/v2/ProductList
```

### 4. Error Boundaries

Envolva cada microfrontend em um error boundary:

```javascript
class MicrofrontendErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    // Log error, show fallback UI
  }
  
  render() {
    if (this.state.hasError) {
      return <FallbackUI />;
    }
    return this.props.children;
  }
}
```

### 5. Estratégia de testes

- **Testes unitários**: dentro de cada microfrontend
- **Testes de integração**: testam como os microfrontends funcionam juntos
- **Testes E2E**: testam a jornada completa do usuário

### 6. Performance

- **Lazy loading**: carregue os microfrontends sob demanda
- **Code splitting**: divida o código dentro de cada microfrontend
- **Dependências compartilhadas**: evite carregar bibliotecas duplicadas
- **Cache**: guarde em cache os remote entries e assets

## Quando usar microfrontends

### Faz sentido

- Organizações grandes com vários times de frontend
- Necessidade de deploys independentes
- Times diferentes querem stacks diferentes
- Aplicações grandes e complexas, difíceis de manter como monólito

### Não faz sentido

- Times ou aplicações pequenas
- Funcionalidades muito acopladas
- Quando performance é crítica (custo da integração em tempo de execução)
- Poucos recursos para lidar com a complexidade

Links:

- [Micro Frontends (Martin Fowler)](https://martinfowler.com/articles/micro-frontends.html)
- [Module Federation Documentation](https://module-federation.github.io/)
- [Single-SPA Documentation](https://single-spa.js.org/)
- [Web Components Guide](https://developer.mozilla.org/en-US/docs/Web/Web_Components)

Escrito originalmente (em inglês) nas minhas notas [today-i-learned](https://github.com/lumamontes/today-i-learned/blob/main/microfrontends.md).
