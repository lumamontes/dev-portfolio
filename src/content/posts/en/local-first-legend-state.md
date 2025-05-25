---
title: "Local-First With Legend State"
publishedAt: 2025-05-25
description: "Learn how to implement a Local-First app with Legend State, a powerful state management library for React."
isPublish: false
lang: "br"
---

***If you want to jump straight to the code, this [repository here](https://github.com/lumamontes/local-first-legend-state) contains an API and an Expo app that implement everything discussed in this article:***

Local-First is a very popular concept in modern app development that provides a great user experience. In practice, it’s pretty straightforward: all actions are "cached" locally before being synced with the backend, allowing the app to work even offline.

## The Challenges of Local-First

Implementing Local-First brings some specific challenges:

- How do you monitor the user's connectivity status, which can change all the time?
- How do you trigger synchronization with the backend when coming back online?
- Do you need to build all this management from scratch in your project?

Fortunately, there are several solutions that make Local-First implementation easier in different apps, but in this article, I’ll talk a bit about a newer and very cool library that offers an elegant solution to this problem: **Legend State**.

## Why Legend State?

Legend State is **extremely fast** ([check out the benchmarks](https://legendapp.com/open-source/state/v3/intro/introduction/#2-%EF%B8%8F-the-fastest-react-state-library)) and is a library for local and remote state management with a powerful sync system that works with any backend.

But to be so fast, Legend State has a "reactivity" concept that’s a bit different from traditional React. I won’t go into too much detail here, but I recommend checking out the official documentation—there are some new concepts you’ll need to learn to use the library effectively.

- [Introduction](https://legendapp.com/open-source/state/v3/intro/introduction/)
- [Fine Grained Reactivity](https://legendapp.com/open-source/state/v3/concepts/fine-grained/)

It’s also worth mentioning that the currently recommended version of Legend State is still in beta, but very close to an official release.

## Let’s Get to the Code!

Let’s create a posts app that works offline-first, with automatic sync when online. First, let’s set up our store:

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
  list: getPosts, // We use list here because our endpoint returns a set of data. If it returned only one item, we’d use get instead of list
  create: createPost,
  update: updatePost,
  delete: deletePost,
  persist: {
    name: 'posts',
    plugin: Platform.OS === 'web' ? ObservablePersistLocalStorage : ObservablePersistMMKV,
  },
  onSaved: (data) => {
    // When the post is saved to the backend, we receive the response here
    // We can update the post in the store based on the data returned from the backend, if we want
    // For example, to update the post with the backend-generated id, etc.
    return {
      ...data.saved,
    }
  },
  retry: {
    infinite: true, // Keep retrying on error
  },
  syncMode: 'auto',
  fieldUpdatedAt: 'updatedAt',
  fieldCreatedAt: 'createdAt',
}));
```

Notice that we use `syncedCrud`, a ready-made plugin from Legend State that can connect to any backend. With it, you just define which functions connect to your endpoints and you get all the sync logic out of the box (pretty cool).

The code above sets up:

1. Typing
2. CRUD methods that communicate with the API. So list would be the getAll endpoint of your CRUD, and so on
3. Cross-platform data persistence (LocalStorage on web, MMKV on mobile)
4. Automatic sync mode

## Implementing the Main Component

The main app component shows how to use the store and handle connectivity:

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

const App = observer(() => { // Add observer so this component reacts to changes
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
            <Text className="text-sm font-medium text-blue-800">Loading posts...</Text>
          </View>
        )}

        {Object.entries(posts || {}).map(([id, post]) => (
          <PostCard key={id} post={{ ...post, id }} />
        ))}

        {posts.length === 0 && (
          <View className="mb-6 rounded-lg bg-gray-100 p-4">
            <Text className="text-sm font-medium text-gray-800">No posts found</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
});

export default App;
```

The component above:

1. Monitors connectivity status with NetInfo
2. Shows a visual indicator to inform the user if they’re online or offline
3. Displays loading and error states as needed
4. Renders the list of posts, already using our store!

## And How to Create, Update, and Delete Records?

Just call our store and manipulate the array directly: push to create, set to update, and delete to remove.

For example, the code in the post card component would look like this:

```typescript
const PostCard = observer(({ post }: { post: Post }) => {
  const postId = post.id;
  const handleUpdate = () => {
    postStore$[postId].set({
      ...postStore$[postId].get(),
      title,
      content,
    }) // This will automatically call the PUT endpoint
  };

  const handleDelete = () => {
    postStore$[postId].delete(); // This will automatically call the delete endpoint we set up
  };

  ...rest of the code
  };
});
```

And the code in the post creation component:

```typescript
const CreatePostForm = observer(() => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    const randomId = Date.now().toString(); // Add a random id for the post to save locally (and then save to the backend)
    if (title && content) {
      const input = { id: randomId, title, content, author: 'Lumix'};
      postStore$.push(input); // Add to our store, and the POST endpoint will be called automatically
      setTitle('');
      setContent('');
    }
  };

  return (
    ...rest of the code
  );
});
```

Done! Our CRUD is ready, with offline data sync that automatically connects to our backend when the user’s connectivity status changes :)

We’ve implemented:

1. **Cross-Platform Persistence**: 
   - Web: LocalStorage
   - Mobile: MMKV

2. **Automatic Synchronization**:
   - Changes are saved locally first
   - Automatic sync when online

3. **Responsive UI**:
   - Immediate feedback for the user
   - Connection status indicator
   - Loading and error states

4. **Full CRUD**:
   - Create: Create posts even offline
   - Read: List posts from local cache
   - Update: Update posts with automatic sync
   - Delete: Remove posts with sync when online

## Honorable Mention: onSaved Hook

An interesting feature of `syncedCrud` is the `onSaved` hook, which lets you receive and process the backend response after an operation is synced. In our example:

```typescript
onSaved: (data) => {
  // When the post is saved to the backend, we receive the response here
  // We can update the post in the store based on the data returned from the backend
  return {
    ...data.saved,
  }
}
```

This is useful for cases where the backend might add extra information to our object (like generated IDs, updated timestamps, etc).

## Conclusion

With Legend State, we implemented a robust Local-First app with just a few lines of code. The library handles all the complexity of synchronization, persistence, and state management, saving a lot of development time.

Useful resources:
- [GitHub repository](https://github.com/lumamontes/local-first-legend-state)
- [Legend State Docs](https://legendapp.com/open-source/state/)
- [Sync Plugins](https://legendapp.com/open-source/state/v3/sync/persist-sync/)
- [CRUD Plugin](https://legendapp.com/open-source/state/v3/sync/crud/)
