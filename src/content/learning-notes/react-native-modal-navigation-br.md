---
title: "Padrões de navegação com modais em React Native"
publishedAt: 2026-02-16
description: "Padrões principais para implementar navegação com modais em React Native com Expo Router."
lang: "br"
tags: ["react-native","expo-router"]
sourceUrl: "https://github.com/lumamontes/today-i-learned/blob/main/react-native-modal-navigation-patterns.md"
editorialState: "published-here"
visibility: "public"
---

Trabalhando no app da pupunha-conf, aprendi alguns padrões importantes para implementar navegação com modais em React Native com Expo Router.

## Estrutura do layout de modais

Em vez de tratar modais como telas separadas, crie um layout dedicado para modais:

```typescript
// app/(tabs)/_layout.tsx
<Stack.Screen 
  name="modal" 
  options={{ presentation: 'modal' }} 
/>
```

Assim dá pra apresentar vários tipos de modal (criar post, visualizador de imagem, detalhes de palestrante) sob uma única rota de modal.

## Apresentação em form sheet

No iOS, use o estilo de apresentação `formSheet` para uma UX melhor:

```typescript
// Modal screen options
{
  presentation: 'formSheet', // Better than 'modal' on iOS
  headerShown: false
}
```

Form sheets passam uma sensação mais nativa de iOS e lidam melhor com o gesto de deslizar pela borda.

## Navegação direta para modais

Em vez de rotas aninhadas como `/dashboard/modal/speaker`, simplifique para caminhos diretos de modal:

```typescript
// Before: complex nested routing
router.push('/dashboard/modal/speaker/123')

// After: direct modal routing  
router.push('/modal/speaker/123')
```

Isso reduz a complexidade da navegação e deixa o comportamento dos modais mais previsível.

## Gerenciando o estado dos modais

Ao navegar para modais, leve em conta o estado da tela pai:

```typescript
// Use safeArea="none" when the modal should handle its own safe areas
<Screen safeArea="none">
  {/* Modal content */}
</Screen>
```

Isso evita padding de safe area duplicado quando o modal tem seu próprio header/navegação.

Escrito originalmente (em inglês) nas minhas notas [today-i-learned](https://github.com/lumamontes/today-i-learned/blob/main/react-native-modal-navigation-patterns.md).
