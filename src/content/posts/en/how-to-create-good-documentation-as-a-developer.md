---
title: "How to create good documentation as a developer"
publishedAt: 2025-10-10
description: "Learn practical tips for writing effective technical documentation, including how to understand your audience, be direct, and use quality references."
isPublish: false
lang: "en"
tags: ["documentation", "technical-writing", "best-practices", "developer-tips", "writing", "communication"]
---

In the rush of day-to-day work, feature documentation can be forgotten if there's no process in place in your team.

BUT, writing documentation saves a lot of time in the future! Helping other developers or non-technical people understand what was done there. 

In fact, it can even serve as a reference for yourself in the future. 

(Who hasn't had doubts about code, went to check, and found out you yourself had written that code)

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/0js6yhqar3q85nguzv0r.jpg)

In this article, I'll share some tips on writing documentation.

## 1 - Understand your target audience and be accessible

Most of the time, your target audience will be developers, and you'll write technical documentation. However, there are levels among them. There may be an expert in your feature and a beginner who is a bit lost. 

In addition, your target audience may also include people who are not technical. Understand this reality and adapt your material to make it as accessible as possible.

Example of a technical documentation excerpt for developers:

The new feature allows external services to authenticate via the API. To do this, simply include the access key as a Bearer Token in the request header.

Example of the same excerpt for technical documentation for developers + internal team:

The new feature will allow integration services to connect to the system. 

✅ You can access the Cloudflare bindings and environment variables through the Adapter API.

😐 You have the possibility to gain access to all the Cloudflare bindings and utilize any previously configured environment variables through the Adapter API.

## 2 - Get straight to the point

This may seem a bit redundant, but it goes unnoticed when we want to make something very clear, sometimes we can end up going in circles. I help translate Astro's documentation and I REALLY like the example they have from their documentation lead https://www.rainsberger.ca/about/ on how to write good documentation on this point, so I'll leave this translated example here too:

## 3 - Read

Read documentation from famous programming languages/frameworks, books.

Consume technical writing content and over time you'll notice that this will influence your own writing. 

You can even use other public documentation as inspiration (not the content, but the way it was delivered to the reader)

Many frameworks even have documentation guides, reporting instructions on writing style and conventions to be followed.

These examples you can use to create something similar in your team, or use as a basis when writing.

Here are some documentation resources I really like:
- Google developers: https://developers.google.com/style/accessibility
- https://developers.google.com/style/inclusive-documentation
- https://developers.google.com/style/voice
- Laravel: https://laravel.com/docs/11.x/readme
- Astro: https://docs.astro.build/getting-started/
- Astro - Writing guide: https://contribute.docs.astro.build/guides/writing-style/

In addition, I'll link this article with many documentation tips that I really like:
- https://www.rainsberger.ca/blog/50-docs-tips-in-50-days/
