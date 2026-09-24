---
title: "O básico de SwiftUI"
publishedAt: 2025-07-24
description: "Algumas noções básicas para começar com SwiftUI."
lang: "br"
tags: ["swiftui","ios"]
sourceUrl: "https://github.com/lumamontes/today-i-learned/blob/main/swift-ui-basics.md"
editorialState: "published-here"
visibility: "public"
---

Algumas noções básicas de SwiftUI:
- Você vai precisar de um mac e do xcode. óbvio. eu segui essa documentação https://www.swift.org/getting-started/swiftui/ e foi uma delícia.
- NIL no swift UI significa a ausência de um valor.
- O Swift vem com vários elementos básicos padrão para a interface, como `Circle` e `Text`.
- Existem coisas chamadas <code>View modifiers</code> que podemos aplicar nos elementos da interface para mudar o estilo e a aparência deles.
Por exemplo:

```
var body: some View {
    Circle()
        .fill(.blue)
        .padding()
        .overlay(
            Image(systemName: "figure.archery")
                .font(.system(size: 144))
                .foregroundColor(.white)
        )

    Text("Archery!")
        .font(.title)
}
```

- ah, dá pra aninhar stacks! muito legal. usando `VStack`, por exemplo.

```
VStack {
    Text("Why not try…")
        .font(.largeTitle.bold())

    VStack {
        Circle()
            .fill(.blue)
            .padding()
            .overlay(
                Image(systemName: "figure.archery")
                    .font(.system(size: 144))
                    .foregroundColor(.white)
            )

        Text("Archery!")
            .font(.title)
    }
}
```

Escrito originalmente (em inglês) nas minhas notas [today-i-learned](https://github.com/lumamontes/today-i-learned/blob/main/swift-ui-basics.md).
