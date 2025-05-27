---
title: "Testando SSR no Next.js com Jest"
publishedAt: 2024-02-18
description: "Como testar uma página SSR no Next.js usando Jest"
isPublish: false
lang: "br"
tags: ["nextjs", "testing", "jest", "ssr", "server-side-rendering", "react", "tutorial"]
---

# Testando SSR no Next.js com Jest

O Jest é uma das ferramentas mais populares para testes no Next.js! Seguindo a documentação oficial, é possível configurar um projeto Next.js com Jest em poucos minutos:

[Setting up Jest with Next.js](https://nextjs.org/docs/app/building-your-application/testing/jest)

No entanto, após configurar o projeto, eu me deparei com um problema ao tentar testar uma página que utiliza SSR (Server Side Rendering), utilizando a estrutura de pastas /app do Next.js. Neste post, eu vou mostrar como resolver esse problema.

Eu tenho uma simples página que utiliza SSR para buscar dados de uma API, e renderiza o conteúdo na tela:

```jsx
async function getData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/my-endpoint`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function Home() {
  const data = await getData();

  return (
    <main>
      <h1>My title</h3>
      <div>
        {data.length === 0 && (
          <p>
           No data available
          </p>
        )}
        {data.map((item: myType, index: number) => (
           // render my data
        ))}
      </div>
    </main>
  );
}
```

Eu quero testar se o conteúdo é renderizado corretamente, então eu criei um teste para a página:

```jsx
import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

describe("Home component", () => {
  it("renders correctly with data", async () => {
    render(<Home />);
    expect(screen.getByText("Title")).toBeInTheDocument();
  });
});
```

No entanto, ao rodar o teste, eu recebo o seguinte erro:

```bash
  Error: Uncaught [Error: Objects are not valid as a React child (found: [object Promise]). If you meant to render a collection of children, use an array instead.]
```

O código acima irá resultar no erro, por conta que o componente Home é renderizado pelo servidor, logo se trata de um componente assíncrono. Por padrão,o Jest não espera a Promise ser resolvida para testar a renderização do componente.

Para resolver esse problema, no momento de testar a renderização do componente Home, eu preciso esperar a Promise ser resolvida. Para isso, eu posso utilizar um `await` e esperar a renderização do componente:

```jsx
import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

describe("Home component", () => {
  it("renders correctly with data", async () => {
    const resolvedComponent = await Home();
    render(resolvedComponent);
    expect(screen.getByText("Title")).toBeInTheDocument();
  });
});
```
