---
title: "Progressive Web Apps"
publishedAt: 2025-07-29
description: "O que faz um site poder ser instalado como app — o básico de Progressive Web Apps."
lang: "br"
tags: ["pwa"]
sourceUrl: "https://github.com/lumamontes/today-i-learned/blob/main/progressive-web-apps.md"
editorialState: "published-here"
visibility: "public"
---

Já entrou em um site e apareceu um aviso pedindo pra instalar o app? Isso é um progressive web app.
Hoje aprendi sobre progressive web apps (PWAs) e como podemos usá-los para oferecer uma experiência offline-first para as pessoas. PWAs podem ser instalados no dispositivo do usuário, parecido com apps nativos. Eles oferecem funcionamento offline, notificações push e design responsivo, o que faz deles uma ótima escolha no desenvolvimento web moderno.

O que precisamos para construir um PWA?
1. **Web app manifest**: um arquivo que, no mínimo, dá ao navegador as informações para instalar o app, como nome e ícone, e também outras informações como cor do tema e cor de fundo.
2. **Service worker**: fiquei meio confusa com esse no começo, mas fazendo uma demo entendi melhor: basicamente ele funciona como um servidor proxy que fica entre os web apps, o navegador e a rede. É um arquivo JavaScript que roda em segundo plano e pode interceptar e modificar a navegação e as requisições, guardando recursos em cache para permitir acesso offline e melhorar a performance. Só funciona em https ou em contextos seguros.

Links:

- [MDN Web Docs - Progressive Web Apps](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
- [Google Developers - Progressive Web Apps](https://developers.google.com/web/progressive-web-apps)

Escrito originalmente (em inglês) nas minhas notas [today-i-learned](https://github.com/lumamontes/today-i-learned/blob/main/progressive-web-apps.md).
