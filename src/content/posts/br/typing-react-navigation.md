---
title: "Como Tipar Navegação no React Native com TypeScript"
publishedAt: 2024-02-17
description: "Algumas formas que a gente consegue fazer a tipagem de diferentes navegadores no React 
Navigation"
isPublish: false
lang: "br"
tags: ["react-native", "typescript", "navigation", "react-navigation", "mobile-development", "tutorial"]
---

# Como Tipar Navegação no React Native com TypeScript

Trabalhar com navegação tipada no React Native pode parecer complexo no início, mas depois que a gente pega fica bem mais produtivo de codar seu app. Esse artigo fala um pouquinho sobre as estratégias de configuração de tipos spara React Navigation!

## Por que usar tipos na navegação?

Sem tipagem, você pode facilmente passar parâmetros errados entre telas, causar crashes ou gastar tempo debugando problemas que poderiam ser evitados. Com TypeScript, você tem:

- Autocomplete para nomes de rotas (melhor coisa!!)
- Validação de parâmetros em tempo de compilação
- Refatoração mais segura
- Documentação automática das rotas

## Estrutura de arquivos

Primeiro, vamos organizar nossos arquivos de navegação:

```
src/
  navigation/
    types.ts
    AppNavigator.tsx
  screens/
    HomeScreen.tsx
    ProductScreen.tsx
```

## Definindo os tipos

Crie o arquivo `navigation/types.ts`:

```typescript
export type RootStackParamList = {
  Home: undefined;
  Product: { productId: string };
  Profile: { userId: string; canEdit?: boolean };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
```

A `RootStackParamList` define todas as rotas do seu app. Cada rota pode ser:
- `undefined`: quando não recebe parâmetros
- Um objeto: quando recebe parâmetros específicos

A declaração global permite que o React Navigation use automaticamente seus tipos em todo o app.

## Criando o Navigator

No arquivo `navigation/AppNavigator.tsx`:

```typescript
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './types';
import HomeScreen from '../screens/HomeScreen';
import ProductScreen from '../screens/ProductScreen';

const Stack = createStackNavigator<RootStackParamList>();

export function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Product" component={ProductScreen} />
    </Stack.Navigator>
  );
}
```

## Usando nos componentes

### Navegando entre telas

```typescript
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../navigation/types';

type NavigationProp = StackNavigationProp<RootStackParamList>;

export function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();

  const handleProductPress = (productId: string) => {
    //Aqui teremos a validação da rota
    navigation.navigate('Product', { productId });
  };

  return (
    // seu código aqui
  );
}
```

### Acessando parâmetros

```typescript
import { useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '../navigation/types';

type ProductRouteProp = RouteProp<RootStackParamList, 'Product'>;

export function ProductScreen() {
  const route = useRoute<ProductRouteProp>();
  const { productId } = route.params; // typescript sabe que productId é string

  return (
    // seu código aqui
  );
}
```

## Alternativa com props tipados

Se preferir receber navigation e route como props:

```typescript
import type { StackScreenProps } from '@react-navigation/stack';
import type { RootStackParamList } from '../navigation/types';

type Props = StackScreenProps<RootStackParamList, 'Product'>;

export function ProductScreen({ navigation, route }: Props) {
  const { productId } = route.params;
  
  const goBack = () => {
    navigation.goBack();
  };

  return (
    // seu código aqui
  );
}
```

## Dicas práticas

### 1. Parâmetros opcionais
Use `?` para parâmetros opcionais:

```typescript
export type RootStackParamList = {
  Profile: { userId: string; canEdit?: boolean };
};
```

### 2. Navegação aninhada
Para navegação aninhada (tabs, drawer), crie tipos específicos:

```typescript
export type TabParamList = {
  Feed: undefined;
  Search: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  Auth: undefined;
  Main: NavigatorScreenParams<TabParamList>;
};
```

### 3. Hook customizado
Crie um hook para simplificar o uso:

```typescript
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from './types';

export function useAppNavigation() {
  return useNavigation<StackNavigationProp<RootStackParamList>>();
}
```

## Conclusão

Tipar a navegação no React Native pode parecer verboso no início, mas os benefícios são bem bons. Você terá menos bugs, melhor experiência de desenvolvimento e código mais fácil de manter.

A configuração inicial é simples: defina seus tipos, declare globalmente e use nos componentes. O importante é começar simples e ir evoluindo conforme a necessidade do seu projeto.