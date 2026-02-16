---
title: "Modern monolith with Inertia.js"
publishedAt: 2025-09-15
description: "Learn about Inertia.js, an approach to facilitate modern monolith development, eliminating the need for traditional APIs and integrating React/Vue with Laravel."
isPublish: false
lang: "en"
tags: ["inertiajs", "laravel", "react", "vue", "monolith", "php", "fullstack", "modern-web-development", "tutorial"]
---

I recently had an experience with Inertia.js on a project, and I was impressed with how easy development was! In this article, I'll talk a bit about how Inertia works and its benefits.

## What is Inertia.js?

Inertia.js is a new approach created to facilitate the development of modern monoliths. It has a strong relationship with the Laravel ecosystem, but can also be used in other backend frameworks. A project with Inertia.js is very similar to PHP projects, the difference is that the frontend is now in React (or Vue). Inertia.js acts by making communication between your frontend and backend, replacing the need for an API, for example.


## Why use Inertia.js?

Your business objective and your team are some of the points to consider! In projects where frontend and backend teams are separated or there's integration between different businesses or companies, it makes sense to divide the system into services or independent projects.

On the other hand, a single team with few developers who would need to be multidisciplinary, working on both frontend and backend code all the time, made a lot of sense to use Inertia to deliver the project without the great complexities that microservices bring.

## How does it work?

Inertia.js eliminates the need for a traditional API. You can send data from the backend directly to the frontend as parameters in a response, and the frontend uses this data to render components. To perform the installation, you can follow the steps in the documentation: https://inertiajs.com/server-side-setup

Here I added a simple example:

Route definition:
```php
// web.php
Route::get('/books', [BooksController::class, 'index']);
```

Creating logic in the controller:
```php
//BooksController.php

namespace App\Http\Controllers;

use App\Models\Book;
use Inertia\Inertia;

class BooksController extends Controller
{
    public function index()
    {
        $books = Book::all();

        return Inertia::render('Books/Index', [
            'books' => $books
        ]);
    }
}
```
Rendering your view using React and TypeScript:

```typescript
// resources/js/Pages/Books/Index.tsx
import { usePage } from '@inertiajs/react';

type Book = {
    id: number;
    title: string;
};

export default function BooksIndex() {
    const { books } = usePage().props;

    return (
        <div>
            {books.map((book: Book) => (
                <div key={book.id}>
                    {book.title}
                </div>
            ))}
        </div>
    );
}
```
And that's it! This is a simple example of how Inertia works, those who come from PHP development will notice it's very similar to PHP blades (except for the fact that it's React/Vue).

In the example above, the `usePage` hook from Inertia is used to pull the information we sent from the controller. In addition, some of the main utilities available are:

- **useRemember**: Stores data between page navigations.
- **WhenVisible**: Component used as a way to only load data when an element becomes visible on the page
- **Deferred**: Allows you to defer loading certain page data until after the initial render, especially used in cases where part of the data is not immediately necessary on the first load
- **Link**: Component used for navigation, similar to <Link> from React Router


## Conclusion

Logically, everything depends on your project and team requirements. But Inertia is a great tool that has been growing and developing more and more in the Laravel ecosystem, a great choice for monolithic projects with PHP and modern frameworks like React/Vue to bring a better experience for users. Below is the documentation link, which was the basis for this article, I recommend reading it to learn more about Inertia:

https://inertiajs.com/


