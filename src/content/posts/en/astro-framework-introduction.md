---
title: "Basic introduction to Astro Framework"
publishedAt: 2023-08-13
description: "Discover the Astro framework: speed and modernity in website creation! ✨🚀"
isPublish: true
lang: "en"
---


Lately, I've been hearing a lot about Astro! A recent case that I found quite interesting was the lite version of the NBC News website, which was built using this framework to be more performant and accessible.

![NBC News](https://imgur.com/7cCHIbu.png)

## What is Astro?


Astro, according to its own documentation, is an all-in-one web framework for creating fast, **content-focused websites**. It employs the MPA (Multi Page App) strategy, in contrast to the SPA (Single Page App) strategy used by frameworks like Next, Vue, Svelte, etc. This means that it will have multiple HTML pages and will prefer, whenever possible, server-side rendering of content rather than client-side rendering, as done in SPAs.

The MPA strategy is a traditional approach used by various languages, such as PHP, for instance. However, unlike PHP, where PHP is used on the server and JavaScript in the browser, Astro brings a unique approach where JavaScript is used both on the server and in the browser.

This makes your website much faster and performant. Therefore, websites with a lot of static content such as blogs, news sites, portfolios, etc., are the main candidates to benefit from using Astro.


## Why Astro?

Astro provides a smooth development experience with a relatively simple language and familiar concepts. Their idea is that anyone with a bit of exposure to HTML, CSS, and JavaScript can quickly create a project.

In addition to having its own API for component creation using .astro files, the framework offers various integrations with other tools like React, Vue, Svelte, Solid, and more. This means that within a static .astro component, you can import a React component, for instance. This is quite intriguing as it allows you to use Astro alongside other tools without being tied to a single technology, bringing to the forefront the framework's concept of UI agnosticism.

![React Astro code example](https://imgur.com/I99EsDg.png)

However, one of the major highlights is undoubtedly the performance. With the concept of zero default JavaScript and content rendering preferably on the server, using the MPA architecture, your website will be lightweight and fast. Making a direct comparison of the same blog built with Astro and with Next.js, for example, a 40% faster loading time and 90% less JavaScript were observed.

![Alt text](https://imgur.com/mive5NN.png)

Other key concepts we can highlight:

- Custom component syntax (mycomponent.astro)
- File-based routing
- Asset handling, build process, bundling, optimizations, data fetching, and more.

Finally, it boasts good documentation and a lively, growing community.

If you'd like to learn more about Astro, I recommend checking out the official documentation, which is quite comprehensive and features numerous examples and tutorials. It served as the foundation for this post :)

https://docs.astro.build/pt-br/getting-started/

Over there, you can also find several templates that can help you better grasp the framework or even serve as a foundation for your next project. ✨