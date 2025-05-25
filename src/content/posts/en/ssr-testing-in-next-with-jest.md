---
title: "Testing SSR in Next.js with Jest"
publishedAt: 2024-02-18
description: "How to test a SSR page in Next.js using Jest"
isPublish: false
lang: "en"
---

# Testing SSR in Next.js with Jest

Jest is one of the most popular tools for testing in Next.js! Following the official documentation, it is possible to set up a Next.js project with Jest in a few minutes:

[Setting up Jest with Next.js](https://nextjs.org/docs/app/building-your-application/testing/jest)

However, after setting up the project, I came across a problem when trying to test a page that uses SSR (Server Side Rendering), using the /app folder structure of Next.js. In this post, I will show how to solve this problem.

I have a simple page that uses SSR to fetch data from an API, and renders the content on the screen:

```jsx
async function getData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/my-endpoint`);

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Home() {
  const data = await getData();

  return (
    <main>
      <h3>My title</h3>
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

I want to test if the content is rendered correctly, so I created a test for the page:

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

However, when running the test, I get the following error:

```bash
  Error: Uncaught [Error: Objects are not valid as a React child (found: [object Promise]). If you meant to render a collection of children, use an array instead.]
```

The code above will result in the error, because the Home component is rendered by the server, so it is an asynchronous component. By default, Jest does not wait for the Promise to be resolved to test the component rendering.

To solve this problem, when testing the rendering of the Home component, I need to wait for the Promise to be resolved. For that, I can use an `await` and wait for the rendering of the component:

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
