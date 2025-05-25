---
title: "Introdução básica ao framework Astro"
publishedAt: 2023-08-13
description: "Conheça o framework Astro: rapidez e modernidade na criação de sites! ✨🚀"
isPublish: true
lang: "br"
---


Nos últimos tempos, ouvi falar bastante sobre o Astro! Um case recente que achei bem interessante foi a versão lite do site de noticías americano *NBC news*, que foi criado usando esse framework com a finalidade de ser bem mais performático e acessível.

![NBC News](https://imgur.com/7cCHIbu.png)

## Mas afinal, o que é Astro?

Astro, segundo a própria documentação, é um framework web "tudo em um" para criação de websites rápidos, focados em ***conteúdo***.
Ele utiliza a estratégia de *MPA(Multi Page App)*, em contraste com a estratégia de *SPA(Single Page App)* utilizada por frameworks como Next, Vue, Svelte, etc. Isso significa que ele irá possuir múltiplas páginas HTML e dará preferência, sempre que possível, a rendereração de conteúdo no servidor, ao invés de renderizar no cliente, como é feito em SPAs. 

A estratégia MPA é uma abordangem tradicional e usada por diversas linguagens, como por exemplo o PHP. Mas diferente do PHP, onde é utilizado o PHP no servidor e Javascript no navegador, o Astro trás uma abordagem única onde o Javascript é utilizado tanto no servidor quando no navegador. 

Isso torna o seu site bem mais rápido e performático. Logo, sites que possuem bastante conteúdo estático como blogs, sites de notícias, portfólios, etc, são os principais candidatos a se beneficiar com o uso do Astro.


## Porque Astro? 

O Astro possui uma boa experiência de desenvolvimento, com uma linguagem relativamente simples e conceitos bem famíliares. A ideia deles é que qualquer pessoa que tenha um pouco de contato com HTML, CSS e Javascript consiga criar um projeto rapidamente.

Além de possuir uma API própria para criação de componentes utilizando arquivos `.astro`, o framework oferece diversas integrações com outras ferramentas, como React, Vue, Svelte, Solid e mais. Isso significa que dentro de um componente estático `.astro``, voce pode importar um componente em React, por exemplo. Isso é bem interessante, pois permite que você utilize o Astro em conjunto com outras ferramentas, sem precisar se prender a uma única tecnologia, trazendo a superfície o conceito de UI agnóstica desse framework.

![React Astro code example](https://imgur.com/I99EsDg.png)

No entanto, um dos grandes destaques realmente é a performance. Com o conceito de zero Javascript por padrão e renderização de conteúdo com preferência no servidor, utilizando a arquitetura MPA, o seu site será leve e rápido. Fazendo uma comparação direta do mesmo blog feito com Astro e com o Next.js por exemplo, foi identificado um carregamento 40% mais rápido e com 90% menos Javascript.

![Alt text](https://imgur.com/mive5NN.png)

Outros principais conceitos que podemos destacar:
- Sintaxe de componentes própria(`meucomponente.astro`)
- Roteamento baseado em arquivos
- Manipulação de assets, processo de build, bundling, otimizações, busca de dados e mais.

Por fim, possui uma boa documentação e uma comunidade bem ativa e em crescimento.

Caso voce queira saber mais sobre o Astro, recomendo que voce leia a documentação oficial, que é bem completa e possui diversos exemplos e tutoriais, e serviu como base para esse post :)

https://docs.astro.build/pt-br/getting-started/

Por lá, também é possível encontrar diversos templates que podem ajudar a entender melhor o framework ou até mesmo já servir de base para o seu próximo projeto. ✨