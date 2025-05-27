---
title: "Authentication flow with Expo Router"
publishedAt: 2024-02-17
description: "Learn how to create an authentication flow with Expo Router in your React Native app."
isPublish: false
lang: "en"
tags: ["react-native", "expo", "expo-router", "authentication", "navigation", "file-based-routing", "tutorial"]
---

Ever since I started working with React Native, I've been using React Navigation for navigation. It's a great library, but as the app grows, the code can get a bit long and some processes can be a bit manual, requiring a lot of lines of code to be done. So, the Expo team has launched a new feature: Expo Router, an alternative to React Navigation for routing and navigation with React Native.

## Main features of Expo Router:

- **Native**: Built on top of React Navigation, Expo Router's navigation is native and optimized.
- **Shareable**: Every screen in your app is automatically configured with deep linking. Making any route in your app shareable with links, such as a notification redirect link, without having to manually configure which screens are accessible by links.
- **Offline-first**: Apps are cached and run offline first, with automatic updates when you publish a new version.

O Expo Router trás um conceito de _file based routing_, ou seja, as rotas da aplicação refletem a estrutura dos arquivos
criados na pasta `/app`. Parecido, por exemplo, com a estrutura do Next.js.

Expo Router uses a file-based routing system. When a file is created in the app folder, it automatically becomes a route in the app. Therefore, unlike React Navigation, all stacks (or routes) in your app are already public and available for navigation! In addition, navigation to different screens can be done using a `<Link href='/route-name'` element, for example. Very similar to what we do on the web 🤯 You can use a router.replace to globally define the route, in addition to dynamic routes, creating route groups, and much more.

## Prerequisites

For the following example, you can clone the project to reproduce the example.

```bash
git clone git@github.com:lumamontes/expo-router-auth.git
```

Install the project dependencies:

```bash
npx expo install
```

Run the project:

```bash
npx expo start
```

But, if you want to create a project from scratch, you can follow the original steps from [Expo Router](https://docs.expo.dev/router/installation/#quick-start).

## Code example

Now, let's go to an example in the code! Let's implement an authentication flow using Expo Router for navigation. Let's analyze the project structure:

![Pasted](https://imgur.com/sEF6S5o.png)

Some key points to understand the Expo Router:

- Every file in the `/app` folder will be a route (with the exception of special files, that will be explained later).

- `_layout.tsx`: The expo router allows the creation of _Layout routes_, elements that are shared between several screens, such as a header. In the case of the file app/\_layout.tsx, it is a layout that will be shared between all screens within the `/app` folder.

- Folders `(auth)` and `(tags)`: are groups of Expo Router routes, which are used to organize the app's routes. You can add as many groups as you want. Groups are also good for organizing app sections. In the following example, we have **app/(auth)** that will have the screens for authenticated users. An interesting point is that the groups do not affect the url, that is, a file located in the folder `app/(auth)/file-name.tsx` will not have the url `app/(auth)/file-name`, but `app/file-name`.

- `ctx.tsx`: is an authentication context, which will centralize some global information such as the user's session, the login and logout function.

- `+not-found.tsx`: is a route that will be accessed when no other route is found.

Therefore, our app will have two layers:

- Routes for authenticated users (all content of the group (auth))
- Routes for unauthenticated users (only the login screen)

To make this separation between the layer of authenticated and unauthenticated users, it is possible to create a context that will define these business rules:

### 1 - Create an authentication context

This context will centralize some global information and logic such as the user's session, the signIn and signOut function.

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

The `signIn` function will save the user's session, in this case, a simple string 'John Doe', and the `signOut` function will remove the session by changing this value to null.

For testing purposes, the `signIn` function will not have any validation, whenever it is called, the user will be authenticated. However, in a real app, you can add the login logic of your app by making a request to an API, for example.

An important point is that we will save this user session information in the device's storage, so that the user does not need to log in every time they open the app.

To do this, we will use the `useStorageState` hook that returns a state and a function to change that state, saving and retrieving the information from the device's storage using the `expo-secure-store` library.

This hook is composed of three functions:

- The `useAsyncState` function will return a state and a function to change that state, but with an initial state of loading, which will be true, and the initial value, which will be null.

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

- `setStorageItemAsync`: which will save or delete an item in the device's storage, depending on the value passed.

```typescript
export async function setStorageItemAsync(key: string, value: string | null) {
  if (value == null) {
    await SecureStore.deleteItemAsync(key);
  } else {
    await SecureStore.setItemAsync(key, value);
  }
}
```

- `useStorageState`: which will return a state and a function to change that state, saving and retrieving the information from the device's storage using the `expo-secure-store` library.

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

So, if I use the hook in this way: `useStorageState('session')`, it will return: `isLoading`, `session` and `setSession`.

But if I used it this way: `useStorageState('user')`, it will return: `isLoading`, `user` and `setUser`, for example.

We can then understand that the `useStorageState` is a generic hook that will return a state and a set state function, while saving and retrieving the information from the device's storage using the `expo-secure-store` library.

### 2 - Add the file app/\_layout.tsx

This file is a layout that will be shared between all screens of the app. In it, we can:

- Define the initial route of the app

```typescript
export const unstable_settings = {
  initialRouteName: "login",
};
```

This simple line of code will ensure that the initial route of our app will always be 'login', that is, the component present in the file login.tsx!

#### - Add our context around your entire app

It will only return the children, which will be the stack of the group `(auth)` or the login screen, depending on whether the user is authenticated or not. For this, we will use the `<Slot>` of the Expo Router, which is an element that will render the children of the current route:

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

### 3 - Create the login screen

On the login screen, which will be the file `app/login.tsx`, you can add the login logic of your app, such as an email and password form. In our case, we will only add a button that will log the user into the app.

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

This will redirect to `(auth)/_layout.tsx`!

### 4 - Add the authentication logic in the file `app/(auth)/_layout.tsx`

This file is a layout that will be shared between all screens of the app in the group `(auth)`, that is, all screens that need authentication to be accessed. In it, we can add the app's authentication logic:

- If the user does not have a session, redirect to the login screen
- If the user has a session, return the stack of the group `(tabs)`, which contains the rest of the app's screens.

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

So, when the user clicks to log in and is successfully redirected, the user will have access to the `app/(auth)/(tabs)/index.tsx` screen!

And if the user is not authenticated, they will be redirected to the login screen, completing a basic authentication flow.

## Conclusion

Comparing with React Navigation, I believe that Expo Router is very accessible and easy to understand, especially for those who come from web frontend development.

Where in React Navigation, several functionalities were done manually, such as creating routes, configuring deep linking, and so on, these super important processes are already done automatically by Expo Router, leaving the code much cleaner. Because it is file-based routing, the project structure is much more organized, and navigation between screens is much simpler, with the use of the `<Link href='/route-name'` element. As Expo Router is built on top of React Navigation, it is also native and optimized, and has great integration with Expo.

In general, I believe that Expo Router is a great alternative for those who are starting to develop apps with react native, or for those who already have experience with react native and want to optimize development time.

Here is the link to the project on github, in case you want to test the code:

[Expo Router Auth](https://github.com/lumamontes/expo-router-auth)
