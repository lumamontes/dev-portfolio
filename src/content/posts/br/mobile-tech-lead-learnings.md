---
title: "O que eu aprendi liderando tecnicamente a criação de um aplicativo de comunicação escolar"
publishedAt: 2025-11-20
description: "Compartilho aprendizados práticos sobre liderança técnica em mobile, incluindo escolha de stack, TypeScript, Expo, documentação e como evitar o Bus Factor."
isPublish: false
lang: "br"
tags: ["react-native", "mobile-development", "tech-lead", "typescript", "expo", "leadership", "best-practices", "documentation", "team-management"]
---

# O que eu aprendi liderando tecnicamente a criação de um aplicativo de comunicação escolar

## 1. Como decidir a stack inicial de um produto mobile?

Valide sempre com a sua equipe a escolha de stack e ferramentas!

No nosso caso, optamos por React Native por conta de alguns motivos como:

- Equipe reduzida alocada no projeto
- Equipe com experiência prévia em React (e não em desenvolvimento nativo ou outras tecnologias mobile)
- Facilidade de compartilhamento de código com a versão web do produto (que é em React)
- Prazo de entrega que exigia agilidade no desenvolvimento.

## 2. Se for React Native, use TypeScript!

Como uma dev que precisou migrar nos 45 do segundo tempo o projeto pra TypeScript, eu digo: faça com TypeScript desde o início. Por favor (!!!)

Vai facilitar muito a manutenção do seu app, reduzir bugs bobos e tornar o onboarding de novos devs muito mais tranquilo. O que parece "trabalho extra" no começo vira economia de tempo gigante depois.


![Print da migração para typescript](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/fk4vledc0mfnq3f1v6pg.png)

_no meio da jornada..já estava alucinando_


![Print da migração para typescript](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/mn0w7a578hsyd2jt393m.png)


_conseguimos!!_

## 3. Defina um padrão de código e arquitetura de pastas

Isso foi algo um pouco difícil no começo, pois eu mesma tinha pouca experiência em desenvolvimento mobile, e precisei estudar bastante pra entender qual seria o melhor fluxo pra nossa realidade.

O mais importante é definir um padrão de código claro, que faça sentido pro seu projeto, e ser consistente com ele. Não precisa ser perfeito desde o início, não tem nenhum problema em evoluir conforme a equipe aprende também! Seja receptivo a sugestões e mudanças.

## 4. Faça uma "entrega de bastão" com outras pessoas do time

Depois de um tempo do começo do projeto, percebi que como muita coisa do app estava sendo desenvolvida somente por mim, isso gerava um sentimento de que "eu" era a única pessoa responsável pelo projeto que poderia resolver alguns pepinos depois da primeira entrega. É o famoso Bus Factor, evite ele a todo custo!

Por isso, organizei um momento onde reuni a galera, compartilhei a tela e mostrei na prática como o projeto funcionava, junto com uma documentação. O objetivo era quebrar essa barreira e incentivar todo mundo a se sentir à vontade pra mexer no app.


![Print da reunião de entrega de bastão](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/5bxmnem87yffzzex1kvv.png)
_Minha cartolina_

##  5. Crie uma documentação bacana

Mais uma coisa que pequei no começo do projeto (até devido ao prazo de entrega) foi a documentação. Isso acabou gerando problemas quando outros devs foram me ajudar no projeto: pela falta de documentação, ficou difícil entender algumas decisões que foram tomadas e como o código estava estruturado também, além de alguns processos que estavam só na minha cabeça. Basicamente eu me tornei a documentação, o que não é muito legal.

Como viver é aprender, hoje já tenho mais cuidado com a documentação e procuro sempre deixá-la atualizada! Recomendo fortemente que você faça o mesmo desde o início.


![Print sobre a minha documetação do projeto](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/bxks4mad6n59krnwqgoa.png)
_Um pouco da documentação que criei_

##  6. Recomendação: utilize Expo

Eu sempre tento ir por uma abordagem pragmática das coisas (não sei se é por que sou dev PHP haha), mas considerando nosso contexto (equipe reduzida de 1-2 devs, prazo de entrega bem curto, aplicativo sem funcionalidades super complexas) foi muito fácil a decisão de usar o Expo.

Ele atende super bem e a parte do EAS (que é a cloud deles) também vai quebrar um galho caso existam pessoas no seu time com pouca experiência em desenvolvimento mobile ou sem ambiente configurado.

E agora, com os Expo Modules, cada vez mais é possível ter liberdade pra mexer com código nativo quando necessário também!

## 7. Fique de olho nas novas tecnologias e ferramentas

Algo muito importante é a melhoria contínua. O ecossistema React/React Native é bem dinâmico e tá sempre lançando novidades.

Fique atento às atualizações, tanto pra ver algo que você pode melhorar na sua aplicação quanto pra identificar algo que não esteja mais funcionando bem e que você pode remover ou substituir.

## Reflexão final

Tooodo esse processo me ensinou que as decisões técnicas precisam sempre considerar o contexto da equipe e do negócio. O que funciona pra um projeto pode não funcionar pra outro, e tudo bem! O importante é aprender, adaptar e compartilhar o conhecimento com a galera.