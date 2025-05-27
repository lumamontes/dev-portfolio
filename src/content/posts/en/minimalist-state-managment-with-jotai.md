---
title: "Managing states in a minimalist way in React Native with Jotai"
publishedAt: 2024-03-09
description: "In this article, I will talk about Jotai, a global state management library for React, explaining how it works and how to use it in a React Native project."
isPublish: false
lang: "en"
tags: ["react-native", "state-management", "jotai", "react", "atomic", "minimalist", "tutorial"]
---

In this article, I will talk about Jotai, a global state management library for React. I will explain what Jotai is, how it works, and how to use it in a React Native project.

## What is Jotai?

Jotai is a global state management library for React, standing out for its simplicity and ease of use. It is capable of scaling from simple applications to those with more complex states, thanks to its flexibility and performance. With only 2kb, the main core API is extremely lightweight, contributing to the efficiency of the library. Jotai adopts an 'atomic' approach to global state management.

In this example, I will be using Jotai in React Native with Typescript, but Jotai is compatible with other frameworks such as Next.js, Gatsby, Remix, and Waku.

## Installation

To install Jotai, just run the command in your React Native project terminal:

```bash
npm install jotai
```

or

```bash
yarn add jotai
```

or

```bash
pnpm add jotai
```

## Example

Jotai has a structure defined by atoms, which are the states. For any state or global variable you want to create, you will create an atom.

In this example, let's say I have a finances app and I want 2 global states that I will need to access in several places in the app:

- an integer that will store the user's balance.
- a boolean that will control whether the financial balance is visible or not.

Therefore, I will create 2 atoms, one for each state I want to store. A good practice is to create a separate file just for creating the atoms, so that it is more organized. In my example, at the root of the project, I will create a file called `Atoms.ts` that will contain all the atoms.

```tsx
import { atom } from "jotai";

export const balanceAtom = atom(0);
export const isBalanceVisibleAtom = atom(false);
```

Taking a look at the example above, I used the `atom` function from Jotai to create an atom that represents a global state.

The `atom` function receives a parameter that is the initial value of the atom, and depending on the type of this value, Jotai can already infer the type of the atom.

In this case, the atom `isBalanceVisibleAtom` is a boolean, so I passed a `false` as the initial value. And the `balanceAtom` atom is a number, so I passed 0 as the initial value.

And that's it! Now i can view and/or change these atoms using the `useAtom` hook from Jotai.

First, i will create a component that will display the user's balance and a button to add a value of 10 to the balance.

```tsx
import { View, Text, Button } from "react-native";
import { useAtom } from "jotai";
import { balanceAtom } from "@/Atoms";

export default function Balance() {
  const [balance, setBalance] = useAtom(balanceAtom);
  return (
    <View>
      <Text>Balance: {balance}</Text>
      <Button title="Add 10" onPress={() => setBalance((prev) => prev + 10)} />
    </View>
  );
}
```

As you can see in the example above, we used the `useAtom` hook from Jotai, which will return two functions that are similar to React's `useState`. The first function will be the value of this atom, and the second is a function to update the value of this atom.

In this case, I want to display the user's balance on the screen, so in the useAtom I passed the `balanceAtom` as a parameter, which is the atom I defined to represent this state. And as a return, I get the value of the balance and the function to update the balance.

```tsx
const [balance, setBalance] = useAtom(balanceAtom);
```

Now, let's create a header component that will display a button to show or hide the user's balance.

```tsx

import {View, Text, Button} from 'react-native';
import { useAtom } from 'jotai';
import { isBalanceVisibleAtom } from '@/Atoms';

export default funcion Header(){
    const [isBalanceVisible, setIsBalanceVisible] = useAtom(isBalanceVisibleAtom);
    return (
        <View>
            <Text>Welcome!</Text>
            <Button title="Show balance" onPress={() => setIsBalanceVisible(!isBalanceVisible)} />
        </View>
    )
}
```

Now, I can update the Balance component so that it is only displayed if the balance is visible.

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

This way, the balance will only be displayed if the user clicks on the "Show balance" button in the Header component.

And that's it! Now I have 2 global states that I can access and update from anywhere in my app. And best of all, Jotai already takes care of updating all the components that are using these atoms, dealing behind the scenes with optimization, memorization, and unnecessary re-renders.

## Conclusion

Jotai is a fantastic library that greatly simplifies state management in React. In addition to the examples I showed, Jotai has several other features that can be very useful, such as a package responsible for caching atoms, making state transitions, integrating with other tools such as React Query, and much more.

I recommend taking a look at the official documentation to see more details and examples of use: https://jotai.org/ 🚀
