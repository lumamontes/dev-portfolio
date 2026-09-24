---
title: "Arquitetura de app de conferência em React Native"
publishedAt: 2026-02-16
description: "Padrões para estruturar apps mobile de eventos/conferências, aprendidos construindo o app da Pupunha Conf."
lang: "br"
tags: ["react-native","expo"]
sourceUrl: "https://github.com/lumamontes/today-i-learned/blob/main/react-native-conference-app-architecture.md"
editorialState: "published-here"
visibility: "public"
---

Construir o app da pupunha-conf me ensinou padrões para estruturar apps mobile de eventos/conferências com React Native e Expo.

## Arquitetura das funcionalidades principais

Um app de conferência normalmente precisa destes módulos principais:

```
/app
  /(tabs)
    /feed       - Social posts and announcements  
    /schedule   - Sessions and speaker lineup
    /bookmarks  - Saved sessions for attendees
  /modal        - Overlays for details and creation
  /speakers     - Speaker profiles and bios
```

## Padrões de estrutura de dados

Organize os dados do evento com relacionamentos claros:

```typescript
interface Conference {
  id: string;
  name: string;
  year: number;
  sessions: Session[];
  speakers: Speaker[];
}

interface Session {
  id: string;
  title: string;
  speakerId: string;
  timeSlot: string;
  isBookmarked: boolean;
}
```

## Gerenciando sessões salvas

Use `useFocusEffect` para atualizar os dados salvos quando a pessoa volta para a tela:

```typescript
import { useFocusEffect } from '@react-navigation/native';

const BookmarkedScreen = () => {
  const { refetch } = useQuery(['bookmarked-sessions']);
  
  useFocusEffect(
    useCallback(() => {
      refetch(); // Refresh when screen comes into focus
    }, [refetch])
  );
}
```

## Organizando os dados dos eventos

Estruture eventos de vários anos com uma separação clara:

```typescript
// events/pupunha-code-2025.ts
export const pupunhaCode2025 = {
  id: 'pupunha-2025',
  sessions: [...],
  speakers: [...]
};

// events/pupunha-code-2026.ts  
export const pupunhaCode2026 = {
  id: 'pupunha-2026', 
  sessions: [...],
  speakers: [...]
};
```

## Feed e funcionalidades sociais

Implemente a criação de posts com suporte a imagens:

```typescript
const CreatePostModal = () => {
  const [images, setImages] = useState([]);
  
  const pickImages = async () => {
    const result = await ImagePicker.launchImageLibrary({
      mediaType: ['photo'], // Use array for media types
      multiple: true
    });
  };
}
```

Essa arquitetura escala bem para conferências de vários dias com programação complexa.

Escrito originalmente (em inglês) nas minhas notas [today-i-learned](https://github.com/lumamontes/today-i-learned/blob/main/react-native-conference-app-architecture.md).
