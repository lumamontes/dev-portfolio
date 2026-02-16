---
title: "Migração de dados: trade-offs e estratégias"
publishedAt: 2026-01-18
description: "Aprenda sobre os principais trade-offs e estratégias ao realizar migrações de dados, incluindo ETL, Jupyter Notebook vs CLI, e desafios práticos."
isPublish: false
lang: "br"
tags: ["data-migration", "etl", "data-engineering", "jupyter-notebook", "cli", "database", "best-practices", "tutorial"]
---

**Contexto**

Recentemente precisei migrar dezenas de milhares de registros de 
auditoria entre dois serviços durante uma task! Era minha primeira vez fazendo uma migração de dados, ainda mais dessa escala e aprendi bastante coisa, então decidi registrar neste artigo.


Basicamente, uma migração de dados envolve pegar um conjunto de informações que estão armazenadas em uma determinada base (seja um banco de dados, uma planilha ou outro formato) e transformá-las para que possam ser consumidas corretamente por outro serviço, respeitando o modelo e as regras esperadas no destino.

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/tidf3075vbpf88htky3x.png)

As motivações para uma migração são diversas: Em alguns casos, estamos lidando com dados legados que precisam ser movidos para um novo serviço. Em outros, diferentes sistemas passam a compartilhar responsabilidades e precisam de uma interseção consistente de dados. Muitas vezes esse processo acontece de forma planejada, o que permite mais tempo para análise e execução. Mas também pode surgir de maneira urgente, pode ser demanda de um cliente, de um setor ou por uma necessidade operacional inesperada.

A decisão de migrar pode partir tanto do time de produto quanto da engenharia. Ainda assim, é **responsabilidade** do time de **engenharia** avaliar e bater o martelo sobre a viabilidade técnica dessa migração! E essa viabilidade depende diretamente do estudo que a gente faz sobre os dados disponíveis.

Por exemplo, quando a demanda vem de produto, normalmente existe um espaço maior para a engenharia investigar complexidade, riscos e custos. Mas nada disso se resolve apenas com um “dá pra migrar, galera! deixa que eu resolvo”. Antes de qualquer compromisso, é muuuuito importante analisar volumetria, estrutura e complexidade dos dados envolvidos.

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/tijffltga9lazq3ip299.png)

Um exemplo claro: vale a pena a gente paralisar um ou dois devs por DUAS sprints para migrar 15 registros? Na maioria dos cenários, **não**. O custo de engenharia pode ser alto demais para um impacto pequeno no produto.

Claro que viabilidade não se resume apenas a números. O contexto do produto também importa. Que tipo de dado está sendo migrado? São dados simples ou recursivos? Existem dependências entre registros? Há estados intermediários, históricos ou regras de negócio acopladas a esses dados? Tudo isso influencia diretamente na decisão.

Uma vez que a migração é considerada viável, fica mais claro o conjunto de problemas que precisam ser resolvidos. Em geral, eles se dividem em três grandes etapas:

- **Extração**: como os dados serão puxados?
- **Transformação**: como esses dados serão adaptados para o formato esperado?
- **Carregamento**: como os dados transformados serão enviados para o serviço de destino?

Foi nesse contexto que eu aprendi sobre **ETL**, que é uma abordagem criada justamente para organizar e estruturar esse tipo de processo (Parabéns, você também aprendeu o que é ETL :))) 

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ilolo2cpy7t1xqxes4fa.png)

Ainda assim, é importante reforçar: **ETL** não é bala de prata. Em muitos casos, criar uma aplicação dedicada para migração pode ser uma complexidade desnecessária. Antes de qualquer implementação, é essencial estudar a viabilidade real da migração, entender o formato dos dados de origem, o esforço de transformação e o custo de manter essa solução também.

De forma geral, ETLs fazem mais sentido quando a migração precisa ser executada mais de uma vez ou reaproveitada no futuro. Para migrações pontuais, uma solução mais simples pode ser suficiente e mais segura.

## Estratégias 

Quando estou lidando com migrações menores, costumo optar por soluções simples. Em especial, gosto bastante de usar Jupyter Notebook, principalmente quando os dados de origem estão em planilhas ou em bases pequenas. Nesses cenários, não vejo muito sentido em construir uma aplicação inteira só para executar um processo pontual.

Criar um notebook é relativamente simples: basta um arquivo com extensão .ipynb e um kernel configurado localmente. Dependendo do contexto, dá para usar Kotlin, Python, Deno, entre outras opções. A grande vantagem aqui é a rapidez para explorar os dados, testar transformações e iterar sem muitas dificuldades.

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ppnmk045glscgqcx19so.png)

Já para migrações mais complexas, minha preferência passa a ser criar uma aplicação local que roda via terminal — uma CLI simples, mas controlada. Esse tipo de abordagem permite mais previsibilidade, controle de execução e facilidade para lidar com grandes volumes de dados.


![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/o8w59uslh300rzxxop5e.png)


Aqui, uma preocupação fundamental é ter uma estratégia de rollback. Nunca dá para assumir que a migração vai rodar perfeitamente de primeira. Sempre que possível, vale testar em ambiente de staging antes de executar em produção, além de alinhar muito bem o rollout com o time.

A forma de carregar os dados também faz diferença. Em alguns casos, inserir diretamente no banco pode ser suficiente. Em outros, usar uma API ou até publicar eventos em fila é mais seguro, principalmente quando estamos lidando com grandes volumes e queremos processar tudo de forma assíncrona.

No fim das contas, o formato do ETL importa menos do que o objetivo final. Ele pode ser um notebook, uma CLI ou até um script simples — desde que atenda às necessidades de extração, transformação e carregamento de forma segura e previsível.

### Desafios práticos que você vai enfrentar
##### Dados faltando ou inconsistentes

Em migrações reais, é muito comum encontrar dados incompletos, inconsistentes ou marcados como removidos (como casos de soft delete). Esses cenários precisam ser tratados explicitamente, seja ignorando registros, preenchendo valores padrão ou sinalizando dados desconhecidos.

##### Enriquecimento de dados

Nem sempre todas as informações necessárias estão em um único lugar. Em alguns casos, é preciso bater em outros bancos de dados, outros serviços/apis pra buscar as informações que você precisa. É bom estar de olho nesse ponto desde o início, pois aumenta a complexidade


---

### Trade-offs técnicos

Abaixo estão alguns dos principais trade-offs que enfrentei: 

#### Velocidade vs correção

Quando a migração é urgente, você precisa decidir até onde aceitar inconsistências nos dados sem comprometer a entrega.

#### Jupyter Notebook vs CLI

Para migrações pequenas, notebook resolve e acelera muito! Mas por experiência própria, ele pode crescer muito e dificultar a legibilidade e manutenção do script. Quando isso acontece, vale  mais a pena adotar uma CLI. 

### Migrar tudo vs migrar só o essencial

Nem todo dado merece ser migrado, é muito importante alinhar com o time de produto quais dados serão preservados e quais dados podemos aceitar como "perdidos", de forma consciente.

#### Processar tudo de uma vez vs em lotes

Por experiência própria, recomendo ir processando os registros em batches e ir verificando após cada uma se os dados foram da forma esperada. Isso é muito melhor do que ter que processar tudo de uma vez e precisar reprocessar por qualquer errinho nos tratamentos de dados. 

### Conclusão

Se ninguém percebeu que a migração de dados aconteceu em produção, provavelmente foi um bom sinal. No fim, tudo se resume a contexto, equilíbrio e trade-offs — e a manter o time alinhado sobre o que é possível entregar.
