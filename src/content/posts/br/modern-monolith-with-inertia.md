---
title: "Monolito moderno com Inertia.js"
publishedAt: 2025-09-15
description: "Aprenda sobre Inertia.js, uma abordagem para facilitar o desenvolvimento de monolitos modernos, eliminando a necessidade de APIs tradicionais e integrando React/Vue com Laravel."
isPublish: false
lang: "br"
tags: ["inertiajs", "laravel", "react", "vue", "monolith", "php", "fullstack", "modern-web-development", "tutorial"]
---

Recentemente tive uma experiência com Inertia Js em um projeto, e fiquei impressionada com a facilidade que foi o desenvolvimento! Neste artigo, vou falar um pouquinho sobre como o Inertia funciona e seus benefícios.

## O que é o Inertia.js?

O Inertia JS é uma nova abordagem criada pra facilitar o desenvolvimento de monolitos modernos. Ele tem uma forte relação com o ecossistema Laravel, mas também pode ser usado em outros frameworks de backend.  Um projeto com Inertia.js é bem parecido com os projetos em PHP, a diferença é que o frontend agora é em React (ou Vue). O inertia.js atua fazendo a comunicação entre o seu frontend e seu backend, substituindo a necessidade por uma API, por exemplo.


## Por que usar o Inertia.js?

Seu objetivo de negócio e o seu time são alguns dos pontos a levar em consideração! Em projetos onde os times de frontend e backend são separados ou há integração entre diferentes negócios ou empresas, faz sentido dividir o sistema em serviços ou projetos independentes.

Em contrapartida, um só time com poucos desenvolvedores que precisariam ser multidisciplinares, trabalhando tanto no código frontend quando backend o tempo todo, fez bastante sentido em utilizar o inertia pra entregar o projeto sem grandes complexidades que os microserviços trazem.

## Como funciona?

O Inertia.js elimina a necessidade de uma API tradicional. Você pode enviar dados do backend diretamente para o frontend como parâmetros em uma resposta, e o frontend usa esses dados para renderizar componentes. Para realizar a instalação, você pode seguir os passos da documentação:https://inertiajs.com/server-side-setup

Aqui adicionei um exemplo simples:

Definição de rota:
```php
// web.php
Route::get('/books', [BooksController::class, 'index']);
```

Criação de lógica no controller:
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
Renderização da sua view usando React e Typescript:

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
E pronto! Esse é um exemplo simples do funcionamento do inertia, quem já vem do desenvolvimento em PHP percebe que é bem parecido com as blades do PHP (tirando o fato de ser React/Vue).

Nesse exemplo acima, o hook `usePage` do Inertia é usado pra puxar as informações que mandamos como lá no controller. Além disso, alguns dos principais utilitários disponíveis são:

- **useRemember**: Armazena dados entre navegações de página.
- **WhenVisible**: Componente usado como forma de só carregar dados quando um elemento se torna vísivel na página
- **Deferred**: Permite você adiar o carregamento de determinados dados da página até depois da renderização inicial, especialmente usando em casos onde parte dos dados não são imediatamente necessárias no primeiro carregamento
- **Link**: Componente usado para navegação, similar ao <Link> do React Router


## Conclusão

Logicamente, tudo depende dos requisitos do seu projeto e do seu time. Mas o Inertia é uma ótima ferramenta que vem crescendo e se desenvolvendo cada vez mais no ecossistema laravel, uma ótima pedida pra projetos monolitos com PHP e com frameworks modernos como React/Vue para trazer uma melhor experiência para os usuários. A seguir o link da documentação, que foi base para este artigo, recomendo a leitura para conhecer mais sobre o Inertia:

https://inertiajs.com/


