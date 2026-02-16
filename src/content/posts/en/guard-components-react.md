---
title: "Using Guard/Wrapper components as an alternative to ternary conditions in React"
publishedAt: 2025-12-15
description: "Learn how to use Guard/Wrapper components to improve React code readability, replacing complex ternaries with declarative and reusable components."
isPublish: false
lang: "en"
tags: ["react", "components", "refactoring", "code-quality", "best-practices", "conditional-rendering", "wrapper-components", "tutorial"]
---

# Using Guard/Wrapper components as an alternative to ternary conditions in React

The other day I came across the following code (I had written it myself in the middle of the night) that looked something like this:

```jsx
isPaid ? (
  <section className="flex-1 flex flex-col xl:flex-row max-w-7xl mx-auto w-full p-4 sm:p-6 gap-6 xl:gap-8">
    <div className="flex-1 flex flex-col gap-6">
      <h2 className="text-lg font-semibold">Payment already completed</h2>
      <p className="text-sm text-gray-500">Thank you for your purchase!</p>
      <Button variant="outline" onClick={handleClick}>
        View receipt
      </Button>
    </div>
  </section>
) : (
  <>
    {(isPixModalOpen && invoice?.pix) && <PixModal ... />}
    <section className="flex-1 flex flex-col xl:flex-row max-w-7xl mx-auto w-full p-4 sm:p-6 gap-6 xl:gap-8">
      <div className="flex-1 flex flex-col gap-6">
        <PaymentMethodSelector />
        <PaymentDetails />
        <SecurityInfo />
      </div>
      <OrderSummary />
    </section>
  </>
)
```

Nothing wrong so far... a bit ugly, but that's life, right?

But a bit further down in the code, I **again** needed to use this conditional:

```jsx
isPaid ? (
  <div>Huge jsx content here when paid</div>
) : ( 
  <div>Huge jsx content when not paid</div>
)
```

I used it a few more times after that, until I realized it was getting a bit ugly to read, because they were ternaries with really large conditions.

## Improving the code

Thinking about this and inspired by the hook that comes by default in Inertia.js (WhenVisible), we can create a component that will encapsulate our business logic!

For example:

## The generic version

We can start by creating a very simple component:

```jsx
function WhenVisible({ isVisible, children }) {
  return isVisible ? <>{children}</> : null;
}
```

### Before:
```jsx
{isPaid ? (
  <div>Payment completed content</div>
) : (
  <div>Payment form</div>
)}
```

### After:
```jsx
<WhenVisible isVisible={isPaid}>
  <div>Payment completed content</div>
</WhenVisible>

<WhenVisible isVisible={!isPaid}>
  <div>Payment form</div>
</WhenVisible>
```

## Less generic version (and more declarative)

We can also create even more specific components:

```jsx
<WhenPaid>
  <div>Payment completed content</div>
</WhenPaid>

<WhenNotPaid>
  <div>Payment form</div>
</WhenNotPaid>
```

### The implementation:

```jsx
function WhenPaid({ children }) {
  const { isPaid } = grab() // function that gets page info
  return isPaid ? <>{children}</> : null;
}

function WhenNotPaid({ children }) {
  const { isPaid } = grab()
  return !isPaid ? <>{children}</> : null;
}
```

## Positive Points

**1. Readability:** The code becomes very readable!!

**2. Less nesting:** It's really annoying when we need to keep struggling to close parentheses and braces of a huge ternary

**3. Reusability:** These components can be used **anywhere** in the application

**4. Testability:** Each state is isolated and easier to test

**5. Maintainability:** Change in logic? We only touch the wrapper component that's around it, won't need to change the same condition in multiple places in your code (awesome)

## Conditional Wrappers and other architectures

There are also several other ways to use this architecture to refactor code and avoid duplication:

### 1. Conditional Wrappers

You know that code that only applies a wrapper under certain conditions? And then you end up repeating the same code in several places just because of the wrapper?

```jsx
// Before 
{shouldWrap ? (
  <div className="my-wrapper">
    <MyComponent />
  </div>
) : (
  <div className="my-wrapper">
    <MyComponent />
  </div>
)}
```

```jsx
// After 
function ConditionalWrapper({ condition, wrapper: Wrapper, children }) {
  return condition ? <Wrapper>{children}</Wrapper> : children;
}

<ConditionalWrapper condition={shouldWrap} wrapper={({ children }) => <div className="my-wrapper">{children}</div>}>
  <MyComponent />
</ConditionalWrapper>
```

### 2. Role-Based Components

I also see this being used a lot in the permissions part, when we have different types of permissions for the user, and depending on their permission, we show different content.

```jsx
function WhenAdmin({ children }) {
  const { user } = useAuth();
  return user?.role === 'admin' ? <>{children}</> : null;
}

function WhenLoggedIn({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : null;
}

// Super clean usage
<WhenLoggedIn>
  <UserDashboard />
</WhenLoggedIn>

<WhenAdmin>
  <AdminPanel />
</WhenAdmin>
```

### 3. Feature Flag Components

For when you have features that should only be displayed if they're active, like:

```jsx
function WhenFeatureEnabled({ feature, children }) {
  const { isEnabled } = useFeatureFlags(); // If this changes, we'll update it once in multiple places
  return isEnabled(feature) ? <>{children}</> : null;
}

<WhenFeatureEnabled feature="new-checkout">
  <NewCheckoutFlow />
</WhenFeatureEnabled>

<WhenFeatureEnabled feature="beta-features">
  <BetaFeaturesList />
</WhenFeatureEnabled>
```

## When to use (and when NOT to use)

### Use wrapper components when:
- You have the **same conditional repeated** multiple times
- The conditional is **complex** (multiple conditions)
- You want to **encapsulate business** logic
- The code becomes more **readable** and **self-documenting**

### Continue comfortably with ternaries when:
- It's a **simple** conditional
- The ternary makes the code **more direct**
- You won't reuse this logic
- **Simple already works** - no need to complicate!

Example where ternary is perfect:
```jsx
// Super direct and clear!
{isLoading ? <Spinner /> : <Content />}
{user.name || 'Anonymous User'}
{count > 0 && <Badge>{count}</Badge>}
```

## Practical tips for implementation!

### 1. Start simple
Start with the generic `WhenVisible` and only evolve **if** you really need to. Often the generic version already solves many cases!

### 2. Always question yourself: "Is this really better?"
Before refactoring, ask yourself:
- Did the code become more readable?
- Will the team understand it easily?
- Am I solving a real problem or creating unnecessary complexity?

Oh, and like any "pattern" change, communicate with your team, get some feedback and opinions to see if it really makes sense in your use case :)

I personally found it really cool especially in cases of large and hard-to-read ternaries, in addition to those that are very nested or ternaries with conditions repeated in multiple places!
