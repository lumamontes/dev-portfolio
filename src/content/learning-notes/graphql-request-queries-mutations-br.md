---
title: "GraphQL Request: queries e mutations"
publishedAt: 2025-07-24
description: "Usando graphql-request para fazer queries e mutations em um backend."
lang: "br"
tags: ["graphql"]
sourceUrl: "https://github.com/lumamontes/today-i-learned/blob/main/graphql-request-queries-and-mutations.md"
editorialState: "published-here"
visibility: "public"
---

Hoje aprendi a usar o graphql request para fazer queries e mutations no meu backend.

Primeiro, criei um método <code>executeGraphql</code> que posso reutilizar em todo o frontend da aplicação:

```
export async function executeGraphQL<T = any>(
  query: string,
  variables?: Record<string, any>
): Promise<T> {
  try {
    const result = await graphqlClient.request<T>(query, variables);
    return result;
  } catch (error) {
    throw error;
  }

```

Depois, com base na configuração graphql do meu backend, crio as variáveis da query e da mutation:

```
const GET_COMPANIES_QUERY = `
  query GetCompanies {
    companies {
      _id
      name
      cnpj
      createdAt
      updatedAt
    }
  }
`;

const CREATE_COMPANY_MUTATION = `
  mutation CreateCompany($input: CreateCompanyInput!) {
    createCompany(input: $input) {
        name
        cnpj
        status
    }
  }
`;

```

Aí é só usar as consts com a query e a mutation e passar para a requisição do meu cliente graphql.

```
const data = await executeGraphQL<{ companies: Company[] }>(
    GET_COMPANIES_QUERY
);

const data = await executeGraphQL<{ createCompany: CreateCompanyInput }>(
CREATE_COMPANY_MUTATION,
{ input: company }
);

```

Escrito originalmente (em inglês) nas minhas notas [today-i-learned](https://github.com/lumamontes/today-i-learned/blob/main/graphql-request-queries-and-mutations.md).
