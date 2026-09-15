---
title: "Sharing state between Astro islands"
publishedAt: 2026-09-15
description: "Astro islands need a shared client-side store when multiple components share state."
lang: "en"
tags: ["astro", "state-management"]
sourceUrl: "https://github.com/lumamontes/today-i-learned/blob/main/shared-state-between-island-components-astro.md"
editorialState: "published-here"
visibility: "public"
---

While building a Pomodoro with Astro and React, I tried to share state between multiple React components with the Context API. That did not work across Astro islands.

Astro recommends using a client-side store such as [Nanostores](https://docs.astro.build/en/recipes/sharing-state-islands/) to share state between island components.
