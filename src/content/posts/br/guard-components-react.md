---
title: "Usando Guard/Wrapper components como alternativa a condições ternárias no React"
publishedAt: 2025-12-15
description: "Aprenda a usar componentes Guard/Wrapper para melhorar a legibilidade do código React, substituindo ternários complexos por componentes declarativos e reutilizáveis."
isPublish: false
lang: "br"
tags: ["react", "components", "refactoring", "code-quality", "best-practices", "conditional-rendering", "wrapper-components", "tutorial"]
---

# Usando Guard/Wrapper components como alternativa a condições ternárias no React

Esses dias me deparei com o seguinte código (eu mesma tinha feito ele no meio da madrugada) mais ou menos assim:

```jsx
isPaid ? (
  <section className="flex-1 flex flex-col xl:flex-row max-w-7xl mx-auto w-full p-4 sm:p-6 gap-6 xl:gap-8">
    <div className="flex-1 flex flex-col gap-6">
      <h2 className="text-lg font-semibold">Pagamento já realizado</h2>
      <p className="text-sm text-gray-500">Obrigado por sua compra!</p>
      <Button variant="outline" onClick={handleClick}>
        Ver comprovante
      </Button>
    </div>
  </section>
) : (
  <>
    {(isPixModalOpen && invoice?.pix) && <PixModal ... />}
    <section className="flex-1 flex flex-col xl:flex-row max-w-7xl mx-auto w-full p-4 sm:p-6 gap-6 xl:gap-8">
      <div className="flex-1 flex flex-col gap-6">
        <PaymentMethodSelector />
        <PaymentDetails />
        <SecurityInfo />
      </div>
      <OrderSummary />
    </section>
  </>
)
```

Nada de errado até então... um pouco feio, mas é a vida né?

Porém mais um pouco embaixo no código, **novamente** precisei usar essa condicional:

```jsx
isPaid ? (
  <div>Conteúdo jsx gigantudo aqui quando pago</div>
) : ( 
  <div>Conteúdo jsx gigantudo quando não pago</div>
)
```

Depois ainda usei mais algumas vezes, até me dar conta que tava ficando um pouquito feio de ler, por ser ternários com condições muuuito grandes.

## Melhorando o código

Pensando nisso e inspirada pelo hook que já vem por padrão no inertia js (WhenVisible), podemos criar um componente que vai encapsular nossa regra de negócio!

Por exemplo:

## A versão genérica

Podemos começar criando um componente bem simples:

```jsx
function WhenVisible({ isVisible, children }) {
  return isVisible ? <>{children}</> : null;
}
```

### Antes:
```jsx
{isPaid ? (
  <div>Conteúdo do pagamento realizado</div>
) : (
  <div>Formulário de pagamento</div>
)}
```

### Depois:
```jsx
<WhenVisible isVisible={isPaid}>
  <div>Conteúdo do pagamento realizado</div>
</WhenVisible>

<WhenVisible isVisible={!isPaid}>
  <div>Formulário de pagamento</div>
</WhenVisible>
```

## Versão menos genérica (e mais declarativa)

Também podemos criar componentes ainda mais específicos:

```jsx
<WhenPaid>
  <div>Conteúdo do pagamento realizado</div>
</WhenPaid>

<WhenNotPaid>
  <div>Formulário de pagamento</div>
</WhenNotPaid>
```

### A implementação:

```jsx
function WhenPaid({ children }) {
  const { isPaid } = grab() // função que pega as infos da página
  return isPaid ? <>{children}</> : null;
}

function WhenNotPaid({ children }) {
  const { isPaid } = grab()
  return !isPaid ? <>{children}</> : null;
}
```

## Pontos Positivos

**1. Legibilidade:** O código fica bem legível!!

**2. Menos aninhamento:** É bem chatinho quando a gente precisa ficar se batendo pra fechar parênteses e chaves de um ternário gigantudo

**3. Reutilização:** Esses componentes podem ser usados em **qualquer lugar** da aplicação

**4. Testabilidade:** Cada estado fica isolado e mais fácil de testar

**5. Manutenibilidade:** Mudança na lógica? Mexemos só no wrapper component que está em volta, não vai precisar alterar a mesma condição em vários lugares do seu código (tops)

## Conditional Wrappers e outras arquiteturas

Também existem várias outras formas de usar essa arquitetura para refatorar código e evitar duplicação:

### 1. Conditional Wrappers

Sabe aquele código que só aplica um wrapper em certas condições? e aí você acaba repetindo o mesmo código em vários lugares só por causa do wrapper?

```jsx
// Antes 
{shouldWrap ? (
  <div className="my-wrapper">
    <MyComponent />
  </div>
) : (
  <div className="my-wrapper">
    <MyComponent />
  </div>
)}
```

```jsx
// Depois 
function ConditionalWrapper({ condition, wrapper: Wrapper, children }) {
  return condition ? <Wrapper>{children}</Wrapper> : children;
}

<ConditionalWrapper condition={shouldWrap} wrapper={({ children }) => <div className="my-wrapper">{children}</div>}>
  <MyComponent />
</ConditionalWrapper>
```

### 2. Role-Based Components

Também vejo esse cara sendo usado bastante na parte de permissionamento, quando temos alguns tipos diferentes de permissão para o usuário, e dependendo da permissão dele, mostramos conteúdos diferentes.

```jsx
function WhenAdmin({ children }) {
  const { user } = useAuth();
  return user?.role === 'admin' ? <>{children}</> : null;
}

function WhenLoggedIn({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : null;
}

// Uso super limpo
<WhenLoggedIn>
  <UserDashboard />
</WhenLoggedIn>

<WhenAdmin>
  <AdminPanel />
</WhenAdmin>
```

### 3. Feature Flag Components

Para quando você tem features que só devem ser exibidas se estiverem ativas, como:

```jsx
function WhenFeatureEnabled({ feature, children }) {
  const { isEnabled } = useFeatureFlags(); // Se isso aqui mudar, iremos alterar de uma vez em vários lugares
  return isEnabled(feature) ? <>{children}</> : null;
}

<WhenFeatureEnabled feature="new-checkout">
  <NewCheckoutFlow />
</WhenFeatureEnabled>

<WhenFeatureEnabled feature="beta-features">
  <BetaFeaturesList />
</WhenFeatureEnabled>
```

## Quando usar (e quando NÃO usar)

### Use wrapper components quando:
- Você tem a **mesma condicional repetida** várias vezes
- A condicional é **complexa** (múltiplas condições)
- Você quer **encapsular lógica** de negócio
- O código fica mais **legível** e **autodocumentado**

### Continue tranquilamente com ternários quando:
- É uma condicional **simples**
- O ternário deixa o código **mais direto**
- Você não vai reutilizar essa lógica
- **O simples já funciona** - não precisa complicar!

Exemplo onde ternário é perfeito:
```jsx
// Super direto e claro !
{isLoading ? <Spinner /> : <Content />}
{user.name || 'Usuário Anônimo'}
{count > 0 && <Badge>{count}</Badge>}
```

## Dicas práticas para implementação!

### 1. Comece simples
Comece com o `WhenVisible` genérico e só evolua **se** realmente precisar. Muitas vezes a versão genérica já resolve vários casos!

### 2. Questione-se sempre: "Isso realmente está melhor?"
Antes de refatorar, se pergunte:
- O código ficou mais legível?
- A equipe vai entender facilmente?
- Estou resolvendo um problema real ou criando complexidade desnecessária?

Ah, e como toda mudança de "padrão", comunique com a sua equipe, pegue uns pitacos e opiniões pra ver se realmente faz sentido no seu caso de uso :)

Eu particularmente achei bem legal principalmente em casos de ternários grandes e difíceis de ler, além dos que são muito aninhados ou ternários com condições repetidas em vários lugares!
