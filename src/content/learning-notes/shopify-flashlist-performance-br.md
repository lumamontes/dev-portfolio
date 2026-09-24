---
title: "Shopify FlashList para performance em React Native"
publishedAt: 2026-02-16
description: "Trocando a FlatList pela FlashList da Shopify para ter mais performance com grandes volumes de dados."
lang: "br"
tags: ["react-native","performance"]
sourceUrl: "https://github.com/lumamontes/today-i-learned/blob/main/shopify-flashlist-react-native-performance.md"
editorialState: "published-here"
visibility: "public"
---

Construindo o app da pupunha-conf, troquei a FlatList pela FlashList da Shopify para ter mais performance com grandes volumes de dados.

## Por que FlashList?

A FlashList tem performance melhor que a FlatList em listas grandes porque:
- Recicla os itens da lista de forma mais eficiente
- Gerencia melhor a memória
- Tem uma rolagem mais suave, com menos travadas

## Implementação básica

```typescript
import { FlashList } from "@shopify/flash-list";

<FlashList
  data={sessions}
  renderItem={({ item }) => <SessionCard session={item} />}
  keyExtractor={(item) => item.id}
  estimatedItemSize={100} // Important for performance
/>
```

## Principais diferenças em relação à FlatList

A prop `estimatedItemSize` é essencial — ela ajuda a FlashList a pré-calcular o layout:

```typescript
// FlashList - requires estimated size
<FlashList
  estimatedItemSize={120} // Height estimate for each item
  data={items}
  renderItem={renderItem}
/>

// vs FlatList - no size estimation needed
<FlatList
  data={items}
  renderItem={renderItem}
/>
```

## Estados de carregamento

A FlashList funciona muito bem com indicadores de carregamento em estados vazios:

```typescript
<FlashList
  data={isLoading ? [] : sessions}
  ListEmptyComponent={() => 
    isLoading ? <ActivityIndicator /> : <EmptyState />
  }
  renderItem={renderSessionCard}
  estimatedItemSize={150}
/>
```

## Dicas de performance

- Sempre informe um `estimatedItemSize` preciso
- Use `keyExtractor` para ter chaves estáveis
- Evite funções inline no `renderItem` — extraia para componentes separados
- Considere usar `getItemType` em listas com itens de alturas diferentes

Escrito originalmente (em inglês) nas minhas notas [today-i-learned](https://github.com/lumamontes/today-i-learned/blob/main/shopify-flashlist-react-native-performance.md).
