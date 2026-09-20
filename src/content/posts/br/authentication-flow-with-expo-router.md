---
title: Fluxo de autenticação com Expo Router
publishedAt: 2024-02-18
description: Aprenda a criar um fluxo de autenticação com Expo Router no seu app React Native.
isPublish: true
lang: br
tags:
  - react-native
  - expo
  - expo-router
  - authentication
  - navigation
  - file-based-routing
  - tutorial
isDraft: false
editorialState: published-elsewhere
visibility: public
externalUrl: 'https://dev.to/proesc/fluxo-de-autenticacao-no-react-native-usando-expo-router-61h'
---

Quem já trabalhou com rotas com Expo ou React Native, sabe que o React Navigation é a forma padrão de lidar com navegação! No entanto, conforme mais telas você vai criando no seu app, o código utilizando pode ficar um pouco grande, e alguns processos podem ser um pouco manuais, precisando de muitas linhas de código para serem feitos. Logo, o time do Expo lançou uma novidade: Expo Router, uma alternativa ao React Navigation para roteamento e navegação com React Native. Esse post irá mostrar como criar um fluxo de autenticação com Expo Router no seu app React Native.

## Índice

- [Principais funcionalidades do Expo Router](#principais-funcionalidades-do-expo-router)
- [Pré-requisitos](#pré-requisitos)
- [Exemplo de código](#exemplo-de-código)
  - [1 - Crie um contexto de autenticação](#1---crie-um-contexto-de-autenticação)
  - [2 - Adicione o arquivo app/\_layout.tsx](#2---adicione-o-arquivo-app_layouttsx)
  - [3 - Crie a tela de login](#3---crie-a-tela-de-login)
  - [4 - Adicione a lógica de autenticação](#4---adicione-a-lógica-de-autenticação)
- [Conclusão](#conclusão)

## Principais funcionalidades do Expo Router:

- **Nativo**: Construído em cima do React Navigation, a navegação do Expo Router é nativa e otimizada.
- **Compartilhável**: Toda tela do seu aplicativo é automaticamente configurada com deep linking. Tornando qualquer rota do seu aplicativo compartilhável com links, como por exemplo, um link de redirecionamento de uma notificação, não sendo necessário configurar manualmente quais telas são acessíveis por links.
- **Offline-first**: Os aplicativos são armazenados em cache e executados de forma offline first, com atualizações automáticas quando você publica uma nova versão.

O Expo Router trás um conceito de _file based routing_, ou seja, as rotas da aplicação refletem a estrutura dos arquivos criados na pasta `/app`. Parecido, por exemplo, com a estrutura do Next.js.

Quando um arquivo é criado na pasta app, automaticamente se torna uma rota no app. Logo, diferentemente do React Navigation, todas as stacks (ou rotas) do seu app já ficam publicas e disponíveis para navegação! Além disso, as navegações para diferentes telas podem ser feitas usando um elemento `<Link href='/nome-da-rota'`, por exemplo. bem parecido com o que fazemos na web 🤯 Você pode usar um router.replace para definir globalmente a rota, além de rotas dinâmicas, criação de grupos de rotas e muito mais.

## Pré-requisitos

Para o exemplo a seguir, você pode clonar o projeto para reproduzir o exemplo.

```bash
git clone git@github.com:lumamontes/expo-router-auth.git
```

Instale as dependências do projeto:

```bash
npx expo install
```

E rode o projeto:

```bash
npx expo start
```

Mas, caso queira criar um projeto do zero, você pode seguir os passos originais do [Expo Router](https://docs.expo.dev/router/installation/#quick-start).

## Exemplo de código

Agora, vamos a um exemplo no código! Vamos implementar um fluxo de autenticação utilizando o Expo Router para navegação. Vamos analisar a estrutura do projeto:

![Pasted](https://imgur.com/sEF6S5o.png)

Alguns pontos chaves para entender o Expo Router:

- Todos os arquivos que estão na pasta `/app` serão rotas

- `_layout.tsx`: O expo router possibilita a criação de _Layout routes_, elementos que são compartilhados entre diversas telas, como uma header. No caso do arquivo app/\_layout.tsx, ele é um layout que será compartilhado entre todas as telas dentro da pasta `/app`.

- Pastas `(auth)` e `(tags)`: são grupos de rotas do Expo Router, que são usados para organizar as rotas do app. Você pode adicionar quantos grupos quiser. Grupos também são bons para organizar seções do app. No exemplo a seguir, temos **app/(auth)** que irá ter as telas para usuários autenticados. Um ponto interessante é que os grupos não afetam a url, ou seja, um arquivo localizado na pasta `app/(auth)/nome-do-arquivo.tsx` não terá a url `app/(auth)/nome-do-arquivo`, mas sim `app/nome-do-arquivo`.

- `ctx.tsx`: é um contexto de autenticação, que irá centralizar algumas informações globais como a sessão do usuário, a função de logar e deslogar.

- `+not-found.tsx`: é uma rota que será acessada quando nenhuma outra rota for encontrada.

Logo, o nosso app irá possui duas camadas:

- Rotas para usuários autenticados (todo o conteúdo do grupo (auth))
- Rotas para usuários não autenticados (somente a tela de login)

Para fazer essa separação entre a camada de usuários autenticados e não autenticados, é possível criar um contexto que vai definir essas regras de negócio:

### 1 - Crie um contexto de autenticação

Esse contexto irá centralizar algumas informações e lógicas globais como a sessão do usuário, a função de signIn e signOut.

```typescript
iimport React from "react";
import { useStorageState } from "./useStorageState";

const AuthContext = React.createContext<{
  signIn: () => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = React.useContext(AuthContext);
  return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");
  return (
    <AuthContext.Provider
      value={{
        signIn: () => {
          // Add your login logic here
          // For example purposes, we'll just set a fake session in storage
          setSession("John Doe");
        },
        signOut: () => {
          setSession(null);
        },
        session,
        isLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

```

A função `signIn` irá salvar a sessão do usuário, nesse caso, uma simples string 'John Doe', e a função `signOut` irá remover a sessão alterando esse valor para null.

Para finalidade de testes, a função signIn não irá ter nenhum tipo de validação, sempre que ela for chamada, o usuário será autenticado. No entanto, em um app real, você pode adicionar a lógica de login do seu app fazendo uma requisição para uma API, por exemplo.

Um ponto importante é que iremos salvar essas informações de sessão do usuário no storage do dispositivo, para que o usuário não precise logar toda vez que abrir o app.

Para isso, utilizaremos o hook `useStorageState` que retornar um estado e uma função para alterar esse estado, salvar e recuperar as informações do storage do dispositivo utilizando a biblioteca `expo-secure-store`.

Esse hook é composto por três funções:

- A função `useAsyncState` irá retornar um estado e uma função para alterar esse estado, mas com um estado inicial de loading, que será true, e o valor inicial, que será null.

```typescript
import * as SecureStore from "expo-secure-store";
import * as React from "react";
import { Platform } from "react-native";

type UseStateHook<T> = [[boolean, T | null], (value: T | null) => void];

function useAsyncState<T>(
  initialValue: [boolean, T | null] = [true, null]
): UseStateHook<T> {
  return React.useReducer(
    (
      state: [boolean, T | null],
      action: T | null = null
    ): [boolean, T | null] => [false, action],
    initialValue
  ) as UseStateHook<T>;
}
```

- `setStorageItemAsync`: que irá salvar ou deletar um item no storage do dispositivo, dependendo do valor passado.

```typescript
export async function setStorageItemAsync(key: string, value: string | null) {
  if (value == null) {
    await SecureStore.deleteItemAsync(key);
  } else {
    await SecureStore.setItemAsync(key, value);
  }
}
```

- `useStorageState`: que irá retornar um estado e uma função para alterar esse estado, salvando e recuperando as informações do storage do dispositivo utilizando a biblioteca `expo-secure-store`.

```typescript
export function useStorageState(key: string): UseStateHook<string> {
  const [state, setState] = useAsyncState<string>();

  React.useEffect(() => {
    SecureStore.getItemAsync(key).then((value) => {
      setState(value);
    });
  }, [key]);

  const setValue = React.useCallback(
    (value: string | null) => {
      setState(value);
      setStorageItemAsync(key, value);
    },
    [key]
  );

  return [state, setValue];
}
```

Logo, se eu usar o hook dessa forma: useStorageState('session'), ele irá retornar: isLoading, session e setSession.

Mas se eu usasse dessa forma: useStorageState('user'), ele irá retornar: isLoading, user e setUser, por exemplo.

Podemos então entender que o useStorageState é um hook genérico que irá retornar um estado e uma função para alterar esse estado, salvando e recuperando as informações do storage do dispositivo utilizando a biblioteca `expo-secure-store`.

### 2 - Adicione o arquivo app/\_layout.tsx

Esse arquivo é um layout que será compartilhado entre todas as telas do app. Nele, podemos:

#### - Definir a rota inicial do app

```typescript
export const unstable_settings = {
  initialRouteName: "login",
};
```

Essa simples linha de código irá garantir que a rota inicial do nosso app será sempre 'login', ou seja, o componente presente no arquivo de login.tsx!

#### - Adicionar o nosso contexto por volta de todo o seu app

Ele irá apenas retornar o children, que será a stack do grupo `(auth)` ou a tela de login, dependendo se o usuário está autenticado ou não. Para isso, usaremos o `<Slot>` do Expo Router, que é um elemento que irá renderizar o children da rota atual:

```typescript
import { Slot } from "expo-router";
import { SessionProvider } from "./ctx";

export default function RootLayoutNav() {
  return (
    <SessionProvider>
      <Slot />
    </SessionProvider>
  );
}
```

### 3 - Crie a tela de login

Na tela de login, que será o arquivo `app/login.tsx`, você pode adicionar a lógica de login do seu app, como um formulário de email e senha. No nosso caso, vamos somente um botão que irá logar o usuário no app.

```typescript
export default function Login() {
  const { signIn } = useSession();
  const handleLogin = () => {
    signIn();
    //Antes de navegar, tenha certeza de que o usuário está autenticado
    router.replace("/");
  };

  return (
    <View>
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}
```

Isso irá redirecionar para `(auth)/\_layout.tsx`!

### 4 - Adicione a lógica de autenticação

Adicione a lógica de autenticação no arquivo `app/(auth)/\_layout.tsx`. Esse arquivo é um layout que será compartilhado entre todas as telas do app no grupo (auth), ou seja, todas as telas que precisam de autenticação para serem acessadas. Nele, podemos adicionar a lógica de autenticação do app:

- Se o usuário não possuir sessão, redirecionar para a tela de login

- Caso o usuário tenha sessão, retornar a stack do grupo `(tabs)`, que contém o restante das telas do app.

```typescript
const { session } = useSession();

if (!session) {
  return <Redirect href="/login" />;
}

return (
  <Stack>
    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

    <Stack.Screen name="modal" options={{ presentation: "modal" }} />
  </Stack>
);
```

Assim, ao clicar para login e ser redirecionado com sucesso, o usuário irá ter acesso a tela `app/(auth)/(tabs)/index.tsx`!

E caso o usuário não esteja autenticado, ele será redirecionado para a tela de login, completando um fluxo básico de autenticação.

## Conclusão

Fazendo um comparativo com React Navigation, acredito que o Expo Router é bem acessível e fácil de entender, principalmente pra quem verm do desenvolvimento de frontend web.

Onde no React Navigation, várias funcionalidades eram feitas de forma manual, como a criação das rotas, a configuração de deep linking e etc, esses processos super importantes são feitos já automaticamente pelo Expo Router, deixando o código bem mais limpo. Pelo fato de ser file based routing, a estrutura do projeto fica bem mais organizada, e a navegação entre telas é bem mais simples, com a utilização do elemento `<Link href='/nome-da-rota'`. Como o Expo Router é construído em cima do React Navigation, ele também é nativo e otimizado, e possui uma ótima integração com o Expo.

No geral, acredito que o Expo Router é uma ótima alternativa para quem está começando a desenvolver apps com react native, ou para quem já tem experiência com react native e quer otimizar o tempo de desenvolvimento.

Segue o link do projeto no github, caso queira testar o código:

[Expo Router Auth](https://github.com/lumamontes/expo-router-auth)
