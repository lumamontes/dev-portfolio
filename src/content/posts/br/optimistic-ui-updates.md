---
title: "Atualizações 'otimistas' de UI com React Native e React Query"
publishedAt: 2025-02-31
description: "Um pouco sobre atualizações otimistas de UI usando um app React Native como exemplo"
isPublish: true
lang: "br"
tags: ["react-native", "react-query", "optimistic-updates", "ui-ux", "sqlite", "performance", "tutorial"]
---

Optimistic updates de UI são uma técnica onde as mudanças são refletidas na UI antes de serem confirmadas pelo backend. Essa abordagem melhora a experiência do usuário ao fornecer feedback instantâneo, fazendo o app parecer mais responsivo e fluido.

Este artigo demonstra uma implementação de exemplo em uma aplicação React Native usando react-query, SQLite e um banco de dados local para gerenciar curtidas em posts, mas em um app real poderia ser feito a conexão com uma API.

## Por que usar optimistic updates?

- **Melhorar a resposta para o cliente**: As atualizações acontecem instantaneamente, reduzindo a latência percebida pelos usuários.
- **Interação Sem Interrupções**: Os usuários não precisam esperar pelas respostas do servidor para ver o efeito de suas ações.
- **Recuperação de Erros**: Reverter facilmente as mudanças se a resposta do servidor indicar falha.

## Exemplo

Vamos ver um exemplo de código simples: dar like e deslike em posts de um app React Native. A ideia central é atualizar a UI assim que o usuário interagir, depois reconciliar com o banco de dados de forma assíncrona.

**Repositório no Github:** https://github.com/lumamontes/expo-optimistic-ui-updates-tanstack-query

### 1. Configuração

A aplicação usa as seguintes tecnologias:

- **SQLite**: Banco de dados local para armazenar posts e interações dos usuários.
- **react-query**: Gerencia consultas, mutações e cache.
- **expo-router**: Sistema de navegação para o app.

### 2. Código

#### Retornando Posts com react-query

O app busca posts do banco de dados SQLite e verifica se o usuário curtiu cada post:

```typescript
const { data: posts, isLoading, refetch } = useQuery({
  queryKey: ['posts'],
  queryFn: async () => {
    const result = await db.getAllAsync(`
      SELECT 
        posts.*, 
        CASE 
          WHEN EXISTS (
            SELECT 1 FROM posts_likes WHERE post_id = posts.id AND user_id = ?
          ) THEN 1 
          ELSE 0 
        END AS is_liked
      FROM posts
    `, [userId]);
    return result;
  },
});
```

Essa consulta recupera posts como o alias (`is_liked`), indicando o status de curtida do usuário.

#### Mutação para Atualizações Otimistas

A mutação alterna o status de curtida de um post e realiza o optimistic update:

```typescript
const togglePostMutation = useMutation({
  mutationFn: async (post) => {
    const likeExists = await db.getFirstAsync(
      'SELECT COUNT(*) as count FROM posts_likes WHERE post_id = ? AND user_id = ?',
      [post.id, userId]
    );

    const newLikedStatus = likeExists?.count === 0;
    const likeCountChange = newLikedStatus ? 1 : -1;
    const updatedLikesCount = post.likes_count + likeCountChange;

    if (newLikedStatus) {
      await db.runAsync('INSERT INTO posts_likes (post_id, user_id) VALUES (?, ?)', [post.id, userId]);
    } else {
      await db.runAsync('DELETE FROM posts_likes WHERE post_id = ? AND user_id = ?', [post.id, userId]);
    }

    await db.runAsync('UPDATE posts SET likes_count = ? WHERE id = ?', [updatedLikesCount, post.id]);

    return {
      ...post,
      is_liked: newLikedStatus,
      likes_count: updatedLikesCount,
    };
  },
  onMutate: async (post) => {
    await queryClient.cancelQueries(['posts']);
    const previousPosts = queryClient.getQueryData(['posts']);

    queryClient.setQueryData(['posts'], (oldPosts) =>
      oldPosts?.map((p) =>
        p.id === post.id
          ? { ...p, is_liked: !post.is_liked, likes_count: post.likes_count + (post.is_liked ? -1 : 1) }
          : p
      )
    );

    return { previousPosts };
  },
  onError: (error, _, context) => {
    if (context?.previousPosts) {
      queryClient.setQueryData(['posts'], context.previousPosts);
    }
  },
  onSuccess: (updatedPost) => {
    queryClient.setQueryData(['posts'], (oldPosts) =>
      oldPosts?.map((post) => (post.id === updatedPost.id ? updatedPost : post))
    );
  },
  onSettled: () => {
    queryClient.invalidateQueries(['posts']);
  },
});
```

Aspectos principais:

- `onMutate`: Atualiza o cache de forma otimista antes da execução da mutação.
- `onError`: Reverte o cache para seu estado anterior se a mutação falhar.
- `onSuccess`: Garante que o cache reflita o estado do servidor após a mutação.
- `onSettled`: Atualiza os dados para garantir consistência.

### Interação do Usuário

O usuário pode curtir ou descurtir um post tocando em um botão:

```typescript
const togglePost = (post) => {
  togglePostMutation.mutate(post);
};
```

A UI reflete a mudança imediatamente:

```typescript
<TouchableOpacity onPress={() => togglePost(item)}>
  <Text style={styles.postAction}>
    {item.is_liked ? 'Descurtir' : 'Curtir'}
  </Text>
</TouchableOpacity>
```

### 3. Feedback da UI

O `FlatList` do app renderiza dinamicamente os posts com contagens de curtidas atualizadas:

```typescript
<FlatList
  data={posts}
  keyExtractor={(item) => item.id.toString()}
  renderItem={({ item }) => (
    <View style={styles.post}>
      <Text>{item.title}</Text>
      <Text>❤️ {item.likes_count} | 💬 {item.comments_count}</Text>
      <TouchableOpacity onPress={() => togglePost(item)}>
        <Text>{item.is_liked ? 'Descurtir' : 'Curtir'}</Text>
      </TouchableOpacity>
    </View>
  )}
/>
```

## Benefícios 

- **Feedback Rápido**: Os usuários veem suas ações refletidas instantaneamente.
- **Resiliente a Erros**: Se uma operação no banco de dados falhar, as mudanças são revertidas.
- **Gerenciamento Eficiente de Cache**: react-query garante consistência de dados e chamadas mínimas ao servidor.

## Conclusão

Atualizações otimistas de UI proporcionam uma experiência mais suave e responsiva para os usuários ao reduzir a latência percebida. Com bibliotecas como react-query, gerenciar atualizações otimistas se torna eficiente e direto. Combinando isso com SQLite para manipulação de dados locais, os desenvolvedores podem criar aplicativos móveis poderosos e envolventes.