---
title: "Classes de Equivalência: O que devo testar durante o desenvolvimento de software?"
publishedAt: 2024-07-16
description: "Falando um pouco sobre classes de equivalência e como elas podem ajudar a determinar o que testar e quando parar durante o desenvolvimento de software."
isPublish: false
lang: "br"
---

# Classes de Equivalência: O que devo testar durante o desenvolvimento de software?

Um conceito muito comum durante o desenvolvimento de software é a criação de testes para garantir que o sistema funcione corretamente. Quando estamos desenvolvendo testes de determinada funcionalidade, é importante saber o que testar e quando parar de testar, para cobrir a maior parte dos cenários possíveis sem gastar tempo desnecessário.

Nesse ponto entra o conceito de *classes de equivalência*, uma técnica utilizada para agrupar comportamentos diferentes que possuem o mesmo resultado, reduzindo a quantidade de testes necessários para cobrir todas as possibilidades. É considerado uma técnica de teste de caixa preta, pois não leva em consideração a lógica interna do sistema, mas sim o comportamento esperado.

Na realidade, a maioria dos desenvolvedores utiliza esse conceito mesmo sem saber a exata definição, pois é uma forma natural de pensar sobre os testes. 

## O que são Classes de Equivalência?

Classes de equivalência podem ser resumidas como uma técnica utilizada para agrupar os casos de testes, particionando os dados de entrada em diferentes classes. Cada classe representa um conjunto de entradas válidas ou inválidas que são tratadas de forma semelhante pelo sistema. Ao identificar essas classes, podemos selecionar um valor representativo de cada classe para usar em nossos testes, assumindo que se um valor na classe passar, todos os outros valores na mesma classe também passarão.

## Como Identificar Classes de Equivalência

1. **Analisar Dados de Entrada**: Identifique todas as entradas possíveis para o sistema/funcionalidade. Ter um documento de requisitos ou especificações pode ajudar nisso, mas também é possível analisar o código que será testado para identificar as possíveis entradas.
2. **Categorizar Entradas**: Divida as entradas em categorias válidas e inválidas, determinando o que deve passar ou não.
3. **Agrupar Entradas Similares**: Dentro de cada categoria, agrupe entradas que devem ser tratadas de forma semelhante pelo sistema.

## Exemplo Prático

Considere um sistema que aceita uma entrada de valores de 0 a 100, representando a nota de um aluno, e que realiza a classificação do aluno com base nessa nota, com as seguintes regras de negócio:

- Notas de 0 a 60 são consideradas Reprovadas
- Notas de 61 a 100 são consideradas Aprovadas

Dessa forma, podemos identificar as seguintes classes de equivalência:

**Classes Válidas**:

- Notas de 61 a 100 (Aprovadas)

**Classes Inválidas**:

- Notas de 0 a 60 (Reprovadas)
- Notas menores que 0
- Notas maiores que 100
- Valores não numéricos

Para garantir que o sistema lida corretamente com uma ampla gama de entradas, devemos criar um teste por classe. Exemplos de valores de teste para cada classe são:

- Classe válida: 70 (Nota Aprovada)
- Classes inválidas:
  - 30 (Nota Reprovada)
  - -5 (Nota menor que 0)
  - 150 (Nota maior que 100)
  - "abc" (Valor não numérico)

Logo, testar um valor de cada classe, como 70, 30, -5, 150 e "abc", já vai cobrir uma boa parte dos cenários!


## Quando Parar de Testar

1. **Cobertura Completa**: Garanta que todas as classes de equivalência foram testadas com pelo menos um valor representativo.
2. **Sem Novas Classes**: Pare quando nenhuma nova classe de equivalência for identificada a partir de análises adicionais.
3. **Avaliação de Risco**: Considere o risco e o impacto de possíveis bugs não descobertos. Se o risco for baixo, pode ser aceitável parar de testar, dependendo do contexto.

## Conclusão

Utilizar classes de equivalência ajuda a criar casos de testes eficientes e economizar tempo, sendo uma técnica comumente utilizada para garantir a qualidade do software. 
No entanto, é sempre bom analisar o contexto ou complexidade do sistema para considerar diferentes técnicas e abordagens de acordo com a necessidade.
