---
title: "Optimistic UI updates with React Native and React Query"
publishedAt: 2025-12-31
description: "About optmistic updates using a React Native app as example"
isPublish: true
lang: "en"
---

Optimistic UI updates are a technique where changes are reflected in the user interface (UI) before being confirmed by the backend. This approach enhances the user experience by providing instant feedback, making the app feel more responsive and fluid.

This article demonstrates how to implement optimistic updates in a React Native application using react-query, SQLite, and a local database for managing likes on posts.

## Why Use Optimistic Updates?

- **Improved Responsiveness**: Updates happen instantly, reducing the perceived latency for users.
- **Seamless Interaction**: Users don't have to wait for server responses to see the effect of their actions.
- **Error Recovery**: Easily revert changes if the server response indicates failure.

## Implementation Walkthrough

We’ll explore optimistic updates through a simple example: liking or unliking posts in a React Native app. The core idea is to update the UI as soon as the user interacts, then reconcile with the database asynchronously.

**Github repository:**

### 1. Setup

The application uses the following technologies:

- **SQLite**: Local database for storing posts and user interactions.
- **react-query**: Handles queries, mutations, and cache management.
- **expo-router**: Navigation system for the app.
- **ThemeProvider**: For managing dark and light modes.

### 2. Code Breakdown

#### Fetching Posts with react-query

The app fetches posts from the SQLite database and determines if the user has liked each post:

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

This query retrieves posts with additional metadata (`is_liked`) indicating the user's like status.

#### Mutation for Optimistic Updates

The mutation toggles the like status of a post and performs optimistic UI updates:

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

Key aspects:

- `onMutate`: Updates the cache optimistically before the mutation is executed.
- `onError`: Reverts the cache to its previous state if the mutation fails.
- `onSuccess`: Ensures the cache reflects the server state after the mutation.
- `onSettled`: Refreshes the data to ensure consistency.

### User Interaction

The user can like or unlike a post by tapping a button:

```typescript
const togglePost = (post) => {
  togglePostMutation.mutate(post);
};
```

The UI reflects the change immediately:

```typescript
<TouchableOpacity onPress={() => togglePost(item)}>
  <Text style={styles.postAction}>
    {item.is_liked ? 'Unlike' : 'Like'}
  </Text>
</TouchableOpacity>
```

### 3. UI Feedback

The app's `FlatList` dynamically renders posts with updated like counts:

```typescript
<FlatList
  data={posts}
  keyExtractor={(item) => item.id.toString()}
  renderItem={({ item }) => (
    <View style={styles.post}>
      <Text>{item.title}</Text>
      <Text>❤️ {item.likes_count} | 💬 {item.comments_count}</Text>
      <TouchableOpacity onPress={() => togglePost(item)}>
        <Text>{item.is_liked ? 'Unlike' : 'Like'}</Text>
      </TouchableOpacity>
    </View>
  )}
/>
```

## Benefits of This Implementation

- **Fast Feedback**: Users see their actions reflected instantly.
- **Resilient to Errors**: If a database operation fails, changes are reverted.
- **Efficient Cache Management**: react-query ensures data consistency and minimal server calls.

## Conclusion

Optimistic UI updates provide a smoother and more responsive experience for users by reducing perceived latency. With libraries like react-query, managing optimistic updates becomes efficient and straightforward. By combining this with SQLite for local data handling, developers can create powerful and engaging mobile applications.