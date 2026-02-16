---
title: "Como criar uma boa documentação como desenvolvedor"
publishedAt: 2025-10-10
description: "Aprenda dicas práticas para escrever documentação técnica eficaz, incluindo como entender seu público, ser direto e usar referências de qualidade."
isPublish: false
lang: "br"
tags: ["documentation", "technical-writing", "best-practices", "developer-tips", "writing", "communication"]
---

Na correria do dia a dia, a documentação de uma feature pode ser esquecida, se não houver um processo a respeito no seu time.

MAS, escrever documentação salva muito tempo no futuro! Ajudando outros desenvolvedores ou pessoas não-técnicas a entender o que foi feito ali. 

Na verdade, pode até servir de referência pra você mesmo no futuro. 

(Quem nunca ficou com dúvida em um código, foi ver e quem tinha feito aquele código era você mesmo)

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/0js6yhqar3q85nguzv0r.jpg)

Nesse artigo, vou passar algumas dicas sobre escrever documentação.

## 1 - Entenda seu público alvo e seja acessível

Na maioria das vezes, seu público-alvo será desenvolvedores, e você escreverá documentação técnica. Contudo, há níveis entre eles. Pode haver um especialista na sua feature e um iniciante que está um pouco perdido. 

Além disso, seu público alvo também poderá incluir pessoas que não são técnicas. Entenda essa realidade e adapte seu material para que fique o mais acessivo possível.

Exemplo de trecho de uma documentação técnica para desenvolvedores:

A nova funcionalidade permite que serviços externos realizem a autenticação pela API. Para isso, basta incluir a chave de acesso como Bearer Token no cabeçalho da requisição.

Exemplo o mesmo trecho para documentação técnica para desenvolvedores + time interno:

A nova funcionalidade irá permitir que serviços de integração se conectem ao sistema. 

✅ You can access the Cloudflare bindings and environment variables through the Adapter API.

😐 You have the posibility to gain access to all the Cloudflare bindings and utilize any previously configured environment variables through the Adapter API.

## 2 - Vá direto ao ponto

Isso pode parecer um pouco redundante, mas passa batido quando queremos deixar algo bem claro, por vezes podemos acabar dando algumas voltas. Eu ajudo na tradução da documentação do Astro e gosto MUITO do exemplo que eles tem por lá da líder de documentação deles https://www.rainsberger.ca/about/ de como escrever uma boa documentação sobre esse ponto, então vou deixar esse exemplo traduzido aqui também:

## 3 - Leia 

Leia documentações de linguagens de programação/frameworks famosos, livros.

Consuma conteúdo de escrita técnica e com o tempo você vai perceber que isso vai influênciando na sua própria escrita. 

Você pode até mesmo usar outras documentações públicas de inspiração (não no conteúdo, mas da forma que aquele aquilo foi entregue para o leitor)

Muitos frameworks até mesmo possuem guias de documentação, relatando instruções como estilo de escrita e convensões a serem seguidas.

 Esses exemplos que você pode usar pra criar algo do tipo no seu time, ou usar como base quando for escrever.

Aqui algumas documentações que gosto bastante:
- Google developers: https://developers.google.com/style/accessibility
- https://developers.google.com/style/inclusive-documentation
- https://developers.google.com/style/voice
- Laravel: https://laravel.com/docs/11.x/readme
- Astro: https://docs.astro.build/pt-br/getting-started/
- Astro - Guia de escrita: https://contribute.docs.astro.build/guides/writing-style/

Além disso, vou deixar linkado esse artigo com várias dicas sobre documentação que gosto bastante:
- https://www.rainsberger.ca/blog/50-docs-tips-in-50-days/



