---
title: "Typing React Navigation with TypeScript"
publishedAt: 2024-02-17
description: "Different ways we can type navigation and routes with React Navigation"
isPublish: false
lang: "en"
tags: ["react-native", "typescript", "navigation", "react-navigation", "mobile-development", "tutorial"]
---

# Typing React Navigation with TypeScript

Working with typed navigation in React Native might seem complex at first, but once you get the hang of it, coding your app becomes much more productive. This article covers some strategies for configuring types with React Navigation!

## Why use types in navigation?

Without typing, you can easily pass wrong parameters between screens, cause crashes, or spend time debugging issues that could have been avoided. With TypeScript, you get:

- Autocomplete for route names (best thing ever!!)
- Parameter validation at compile time
- Safer refactoring
- Automatic route documentation

## File structure

First, let's organize our navigation files:

```
src/
  navigation/
    types.ts
    AppNavigator.tsx
  screens/
    HomeScreen.tsx
    ProductScreen.tsx
```

## Defining the types

Create the `navigation/types.ts` file:

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

The `RootStackParamList` defines all routes in your app. Each route can be:
- `undefined`: when it doesn't receive parameters
- An object: when it receives specific parameters

The global declaration allows React Navigation to automatically use your types throughout the app.

## Creating the Navigator

In the `navigation/AppNavigator.tsx` file:

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

## Using in components

### Navigating between screens

```typescript
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../navigation/types';

type NavigationProp = StackNavigationProp<RootStackParamList>;

export function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();

  const handleProductPress = (productId: string) => {
    // Here we'll have route validation
    navigation.navigate('Product', { productId });
  };

  return (
    // your code here
  );
}
```

### Accessing parameters

```typescript
import { useRoute } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '../navigation/types';

type ProductRouteProp = RouteProp<RootStackParamList, 'Product'>;

export function ProductScreen() {
  const route = useRoute<ProductRouteProp>();
  const { productId } = route.params; // typescript knows that productId is string

  return (
    // your code here
  );
}
```

## Alternative with typed props

If you prefer to receive navigation and route as props:

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
    // your code here
  );
}
```

## Practical tips

### 1. Optional parameters
Use `?` for optional parameters:

```typescript
export type RootStackParamList = {
  Profile: { userId: string; canEdit?: boolean };
};
```

### 2. Nested navigation
For nested navigation (tabs, drawer), create specific types:

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

### 3. Custom hook
Create a hook to simplify usage:

```typescript
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from './types';

export function useAppNavigation() {
  return useNavigation<StackNavigationProp<RootStackParamList>>();
}
```

## Conclusion

Typing navigation in React Native might seem verbose at first, but the benefits are really good. You'll have fewer bugs, better development experience, and easier-to-maintain code.

The initial setup is simple: define your types, declare them globally, and use them in components. The important thing is to start simple and evolve according to your project's needs.