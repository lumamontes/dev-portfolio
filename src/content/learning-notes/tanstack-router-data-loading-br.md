---
title: "Carregamento de dados no TanStack Router"
publishedAt: 2025-07-24
description: "Carregar dados no TanStack Router acaba sendo bem simples."
lang: "br"
tags: ["tanstack-router"]
sourceUrl: "https://github.com/lumamontes/today-i-learned/blob/main/tanstack-router-data-loading.md"
editorialState: "published-here"
visibility: "public"
---

Hoje aprendi que dá pra carregar dados no tanstack router de um jeito bem simples.

Dada esta rota:

```
export const Route = createFileRoute('/_authenticated/companies/')({
  component: RouteComponent,
})

```

Podemos adicionar a propriedade loader e fazer a requisição dos dados:

```
export const Route = createFileRoute('/_authenticated/companies/')({
  component: RouteComponent,
  loader: async () => {
    const companies = await companiesApiService.getCompanies()
    return { companies }
  }
})

```

Depois, no nosso RouteComponent, acessamos a propriedade companies com:

```
function RouteComponent() {
  const { companies } = useLoaderData({ from: Route.id })
  /// rest of code
}
```

Escrito originalmente (em inglês) nas minhas notas [today-i-learned](https://github.com/lumamontes/today-i-learned/blob/main/tanstack-router-data-loading.md).
