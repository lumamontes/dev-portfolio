---
title: Gerenciamento de estados de forma minimalista no React Native com Jotai
publishedAt: 2024-03-09
description: 'Nesse artigo, vou falar sobre o Jotai, uma biblioteca de gerenciamento de estados globais para React, explicando seu funcionamento e como utilizá-lo em um projeto React Native.'
isPublish: true
lang: br
tags:
  - react-native
  - state-management
  - jotai
  - react
  - atomic
  - minimalist
  - tutorial
isDraft: false
editorialState: published-elsewhere
visibility: public
externalUrl: 'https://dev.to/lumamontes/gerenciamento-de-estados-de-forma-minimalista-no-react-native-com-jotai-5fle'
---

Nesse artigo, vou falar sobre o Jotai, uma biblioteca de gerenciamento de estados globais para React. Vou explicar o que é o Jotai, como ele funciona, e como utilizá-lo em um projeto React Native.

## O que é Jotai?

Jotai é uma biblioteca de gerenciamento de estados globais para React, destacando-se pela simplicidade e facilidade de uso. Ela é capaz de escalar desde aplicações simples até aquelas com estados mais complexos, graças à sua flexibilidade e performance. Com apenas 2kb, a API principal é extremamente leve, contribuindo para a eficiência da biblioteca. A Jotai adota uma abordagem 'atômica' para o gerenciamento de estados globais.

Nesse exemplo vou estar utilizando Jotai em React Native com Typescript, porém o Jotai é compatível com outros frameworks como Next.js, Gatsby, Remix e Waku.

## Instalação

Para instalar o Jotai, basta rodar o comando no seu terminal do seu projeto React Native:

```bash
npm install jotai
```

ou

```bash
yarn add jotai
```

ou

```bash
pnpm add jotai
```

## Exemplo

O Jotai tem uma estrutura definida por átomos, que são os estados. Pra qualquer estado ou variável global que você quiser criar, você vai criar um átomo.

No meu exemplo, digamos que eu tenha um app financeiro e eu queira 3 estados globais, que vou precisar acessar em vários lugares do app:

- um número inteiro que irá armazenar o saldo do usuário.
- um booleano que vai controlar se o saldo financeiro está visível ou não.

Logo, eu vou criar 2 átomos, um para cada estado que eu quero armazenar. Uma boa prática é criar um arquivo separado somente para a criação dos átomos, para que fique mais organizado. No meu exemplo, na raiz do projeto mesmo irei criar um arquivo chamado `Atoms.ts` que vai conter todos os átomos.

```tsx
import { atom } from "jotai";

export const balanceAtom = atom(0);
export const isBalanceVisibleAtom = atom(false);
```

Conforme o exemplo acima, usei a função `atom` do Jotai para criar um átomo que representa um estado global.

Essa função `atom` recebe um parâmetro que é o valor inicial do átomo, e dependendo do tipo desse valor, o Jotai já consegue inferir o tipo do átomo.

Por exemplo, no meu caso, o átomo `isBalanceVisibleAtom` é um booleano, então eu passei um `false` como valor inicial. E o átomo `balanceAtom` é um número, então eu passei 0 como valor inicial.

E é isso! Agora eu posso chamar esses átomos em qualquer lugar do meu app, para visualizar e/ou alterar o valor dos mesmos utilizando o hook `useAtom` do Jotai.

Primeiro, vou criar um componente que irá exibir o saldo do usuário e um botão para adicionar um valor de 10 ao saldo.

```tsx
import { View, Text, Button } from "react-native";
import { useAtom } from "jotai";
import { balanceAtom } from "@/Atoms";

export default function Balance() {
  const [balance, setBalance] = useAtom(balanceAtom);
  return (
    <View>
      <Text>Saldo: {balance}</Text>
      <Button
        title="Adicionar 10 ao saldo"
        onPress={() => setBalance((prev) => prev + 10)}
      />
    </View>
  );
}
```

Conforme o exemplo acima, utilizamos o hook `useAtom` do Jotai, que irá retornar duas funções que são parecidas com o useState do React. A primeira função será o valor desse átomo, e a segunda é uma função pra atualizar o valor desse átomo.

Nesse caso, quero exibir em tela o saldo do usuário, então no useAtom passei como parâmetro o `balanceAtom` que é o átomo que defini para representar esse estado.

```
useAtom(balanceAtom);
```

E como retorno, eu recebo o valor do saldo e a função para atualizar o saldo.

```
const [balance, setBalance] = useAtom(balanceAtom);
```

Agora, vamos criar um componente de header que irá exibir um botão para mostrar ou esconder o saldo do usuário.

```tsx

import {View, Text, Button} from 'react-native';
import { useAtom } from 'jotai';
import { isBalanceVisibleAtom } from '@/Atoms';

export default funcion Header(){
    const [isBalanceVisible, setIsBalanceVisible] = useAtom(isBalanceVisibleAtom);
    return (
        <View>
            <Text>Bem vindo!</Text>
            <Button title="Mostrar saldo" onPress={() => setIsBalanceVisible(!isBalanceVisible)} />
        </View>
    )
}
```

Agora, posso atualizar o componente Balance para que ele só seja exibido se o saldo estiver visível.

```tsx
import { View, Text, Button } from "react-native";
import { useAtom } from "jotai";
import { balanceAtom, isBalanceVisibleAtom } from "@/Atoms";

export default function Balance() {
  const [balance, setBalance] = useAtom(balanceAtom);
  const [isBalanceVisible] = useAtom(isBalanceVisibleAtom);
  return (
    <View>
      <Text>Saldo: {isBalanceVisible ? balance : "***"}</Text>
      <Button
        title="Adicionar 10 reais"
        onPress={() => setBalance((prev) => prev + 10)}
      />
    </View>
  );
}
```

Dessa forma, o saldo só será exibido se o usuário clicar no botão "Mostrar saldo" do componente Header.

E é isso! Agora eu tenho 2 estados globais que posso acessar e posso atualizar de qualquer lugar do meu app. E o melhor de tudo, o Jotai já cuida de atualizar todos os componentes que estão usando esses átomos, lidando por trás dos panos otimização, memorização, e re-renders desnecessários.

## Conclusão

o Jotai é uma biblioteca fantástica que simplifica muito o gerenciamento de estados do React. Além dos exemplos que mostrei, o Jotai tem várias outras funcionalidades que podem ser muito úteis, como um pacote responsável por fazer cache de átomos, fazer transições de estados, integração com outras ferramentas como React Query, e muito mais.

Recomendo dar uma olhada na documentação oficial para ver mais detalhes e exemplos de uso: https://jotai.org/ 🚀
