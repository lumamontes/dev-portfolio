---
title: "Local-First com Legend State"
publishedAt: 2025-05-25
description: "Aprenda a implementar um app Local-First com sincronização automática usando Legend State."
isPublish: true
lang: "br"
---

***Se você quiser ir direto para o código, esse [repositório aqui](https://github.com/lumamontes/local-first-legend-state) tá contendo uma API e um app com Expo que implementam tudo que falei nesse artigo:***

Local-First é um conceito super popular no desenvolvimento de aplicações modernas que oferece uma ótima experiência para o usuário. Na prática, é um conceito bem direto: todas as ações são "cacheadas" localmente antes de serem sincronizadas com o backend, permitindo que o app funcione mesmo offline.

## Os desafios do Local-First

Implementar traz alguns desafios bem específicos:

- Como monitorar o status de conectividade do usuário que fica mudando o tempo todo?
- Como disparar a sincronização com o backend quando voltar online?
- Vou precisar fazer todo esse gerenciamento do zero no meu projeto?

Felizmente, existem diversas soluções que facilitam a implementação do Local-First em diferentes aplicações, mas neste artigo eu vou falar um pouquinho sobre uma lib mais recente e bem legal que oferece uma solução elegante para esse problema: **Legend State**.



## Por que Legend State?

O Legend State é **extremamente rápido** ([dá uma olhada nos benchmarks](https://legendapp.com/open-source/state/v3/intro/introduction/#2-%EF%B8%8F-the-fastest-react-state-library)) e se trata de uma lib de gerenciamento de estado local e remoto com um poderoso sistema de sincronização que funciona com qualquer backend.

Maaaas para ser tão rápido, o Legend State possui um conceito de "reatividade" um pouco diferente do React tradicional. Não vou entrar em muitos detalhes aqui, mas recomendo dar uma olhada na documentação oficial sobre, existe alguns conceitos novos que precisamos aprender para usar a lib da melhor forma.

- [Introduction](https://legendapp.com/open-source/state/v3/intro/introduction/)
- [Fine Grained Reactivity](https://legendapp.com/open-source/state/v3/concepts/fine-grained/)

Um ponto que também vale a pena mencionar é que versão recomendada  atualmente pelo Legend State ainda está em beta, mas bem próximo de um lançamento oficial.

## Vamos ao código!

Vamos criar um app de posts que funciona offline-first, com sincronização automática quando online. Primeiro, vamos configurar nossa store:

```typescript
// store/posts.ts
import { observable } from '@legendapp/state';
import { ObservablePersistLocalStorage } from '@legendapp/state/persist-plugins/local-storage';
import { ObservablePersistMMKV } from '@legendapp/state/persist-plugins/mmkv';
import { syncedCrud } from '@legendapp/state/sync-plugins/crud';
import { Platform } from 'react-native';

export interface Post {
  id?: string;
  title: string;
  content: string;
  createdAt?: string;
  updatedAt?: string;
}

export type CreatePostInput = Pick<Post, 'title' | 'content'>;

export type CreatePostOutput = {
  status: string;
  data: Post;
  message: string;
}

const API_URL = 'http://localhost:3000/api';

const getPosts = async () => {
  const response = await fetch(`${API_URL}/posts`);
  return response.json().then(data => {
    return data.data;
  });
};

const createPost = async (input: CreatePostInput): Promise<Post> => {
  const response = await fetch(`${API_URL}/posts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  const result = await response.json();
  return result.data;
};

const updatePost = async (input: Partial<Post>) => {
  const response = await fetch(`${API_URL}/posts/${input.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });
  return response.json();
};

const deletePost = async (input: Post) => {
  await fetch(`${API_URL}/posts/${input.id}`, {
    method: 'DELETE',
  });
  return { id: input.id };
};

export const postStore$ = observable(syncedCrud<CreatePostInput, CreatePostInput, 'array'>({
  initial: [] as Record<string, Post>[],
  as: 'array',
  list: getPosts, // Aqui usamos list pois nosso endpoint retorna // um conjunto de dados. caso retornasse somente um dado, usariamos // get e não list
  create: createPost,
  update: updatePost,
  delete: deletePost,
  persist: {
    name: 'posts',
    plugin: Platform.OS === 'web' ? ObservablePersistLocalStorage : ObservablePersistMMKV,
  },
  onSaved: (data) => {
    //Quando o post é salvo no backend, recebemos a resposta aqui
    //E podemos atualizar o post no store de acordo com os dados do post salvo no backend, caso quisermos
    //Por exemplo, se quisermos atualizar o post com o id do post salvo no backend etc
    return {
      ...data.saved,
    }
  },
  retry: {
    infinite: true, // Continua tentando em caso de erro
  },
  syncMode: 'auto',
  fieldUpdatedAt: 'updatedAt',
  fieldCreatedAt: 'createdAt',
}));
```

Perceba que usamos o `syncedCrud`, um plugin pronto criado pelo Legend State que pode se conectar com qualquer backend. Com ele, basta a gente definir quais funções se conectam aos endpoints para ter toda a lógica de sincronização pronta (bem show).

O código acima já configura:

1. A tipagem
2. Os métodos CRUD que se comunicam com a API. Então o list seria o endpoint getAll do meu CRUD, e assim por diante
3. A persistência de dados multiplataforma (LocalStorage na web, MMKV no mobile)
4. O modo de sincronização automática

## Implementando o componente principal

O componente principal do app mostra como usar o store e lidar com conectividade:

```typescript
// App.tsx
import { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { observer, use$ } from '@legendapp/state/react';
import { useObservable } from '@legendapp/state/react';
import NetInfo from '@react-native-community/netinfo';
import { syncState } from "@legendapp/state"

import { postStore$ } from 'store/posts';
import { Post } from 'types/post';
import { CreatePostForm } from './components/CreatePostForm';
import { PostCard } from './components/PostCard';

const App = observer(() => { //Adicionamos o observer para esse componente ficar verificando as mudanças 
  const connectivityStatus$ = useObservable<string>('checking');
  const posts = use$(postStore$)
  const state$ = syncState(postStore$);
  const isLoaded = state$.isLoaded.get();
  const isError = state$.error.get();
  const error = state$.error.get();
  
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      connectivityStatus$.set(state.isConnected ? 'online' : 'offline');
    });

    return () => unsubscribe();
  }, []);

  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView className="flex-1 px-4 pt-12">
        <View className="mb-6">
          <Text className="text-3xl font-bold text-gray-900">Posts</Text>
        </View>

        <ConnectionStatus status={connectivityStatus$.get()} />

        {isError && (
          <View className="mb-6 rounded-lg bg-red-100 p-4">
            <Text className="text-sm font-medium text-red-800">Error {error?.message}</Text>
          </View>
        )}

        {!isLoaded && (
          <View className="mb-6 rounded-lg bg-blue-100 p-4">
            <Text className="text-sm font-medium text-blue-800">Carregando posts...</Text>
          </View>
        )}

        {Object.entries(posts || {}).map(([id, post]) => (
          <PostCard key={id} post={{ ...post, id }} />
        ))}

        {posts.length === 0 && (
          <View className="mb-6 rounded-lg bg-gray-100 p-4">
            <Text className="text-sm font-medium text-gray-800">Nenhum post encontrado</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
});

export default App;
```

O componente acima:

1. Monitora o status de conectividade com o NetInfo
2. Exibe um indicador visual para informar o usuário se está online ou offline
3. Mostra estados de loading e erro conforme necessário
4. Renderiza a lista de posts, já usando nossa store!

## E agora para criar, atualizar e deletar os registros?

Basta chamarmos a nossa store e manipularmos diretamente o nosso array: dando um push para criar, um set para atualizar e um delete para deletar.

Por exemplo, o código no componente de card do post ficaria assim:

```typescript
const PostCard = observer(({ post }: { post: Post }) => {
  const postId = post.id;
  const handleUpdate = () => {
    postStore$[postId].set({
      ...postStore$[postId].get(),
      title,
      content,
    }) //Aqui automaticamente será chamado o endpoint de PUT
  };

  const handleDelete = () => {
    postStore$[postId].delete(); //Automaticamente sera chamado o endpoint de delete que configuramos
  };

  ...resto do código
  };
});
```

E o código no componente de criação do post:

```typescript
const CreatePostForm = observer(() => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    const randomId = Date.now().toString(); //Adiciona um id aleatório para o post, para salvar no local (e depois salvar no backend)
    if (title && content) {
      const input = { id: randomId, title, content, author: 'Lumix'};
      postStore$.push(input); //Aqui adicionamos na nossa store, e automaticamente será chamado o endpoint POST
      setTitle('');
      setContent('');
    }
  };

  return (
    ...resto do código
  );
});
```

Prontinho! Nosso CRUD está pronto, com sincronização de dados offline que se conecta automaticamente com nosso backend ao mudar o status de conectividade do usuário :)

Conseguimos implementar:

1. **Persistência Cross-Platform**: 
   - Web: LocalStorage
   - Mobile: MMKV

2. **Sincronização Automática**:
   - Mudanças são salvas localmente primeiro
   - Sincronização automática quando online

3. **UI Responsiva**:
   - Feedback imediato para o usuário
   - Indicador de status de conexão
   - Loading e error states

4. **CRUD Completo**:
   - Create: Cria posts mesmo offline
   - Read: Lista posts do cache local
   - Update: Atualiza posts com sync automático
   - Delete: Remove posts com sync quando online

## Menção honrosa: Hook onSaved

Um recurso interessante do `syncedCrud` é o hook `onSaved`, que nos permite receber e processar a resposta do backend após uma operação ser sincronizada. No nosso exemplo:

```typescript
onSaved: (data) => {
  //Quando o post é salvo no backend, recebemos a resposta aqui
  //E podemos atualizar o post no store de acordo com os dados do post salvo no backend
  return {
    ...data.saved,
  }
}
```

Isso é útil para casos onde o backend pode adicionar informações extras ao nosso objeto (como IDs gerados pelo banco, timestamps atualizados, etc).

## Conclusão

Com o Legend State, implementamos um app Local-First robusto com poucas linhas de código. A biblioteca cuida de toda a complexidade de sincronização, persistência e gerenciamento de estado, adiantando bastante o tempo de desenvolvimento.

Recursos úteis:
- [Repositório do github](https://github.com/lumamontes/local-first-legend-state)
- [Legend State Docs](https://legendapp.com/open-source/state/)
- [Sync Plugins](https://legendapp.com/open-source/state/v3/sync/persist-sync/)
- [CRUD Plugin](https://legendapp.com/open-source/state/v3/sync/crud/)
