# iSaúde - Sprint Structure Documentation

## 📋 Visão Geral da Sprint

Esta sprint do iSaúde é uma aplicação móvel desenvolvida em React Native com Expo, focada em conectar profissionais de saúde e pacientes. A aplicação possui módulos principais para **Feed**, **Flashs** (Stories), **Pulses** (vídeos curtos), **Conversas** (chat) e **Notificações**, permitindo uma experiência completa de rede social médica.

## 📁 Estrutura de Pastas

```
📁 components/
├── 📁 feed/
│   ├── 📄 PostData.ts
│   ├── 📄 PostCard.tsx
│   ├── 📄 CommentsModal.tsx
│   ├── 📄 InlineComments.tsx
│   └── 📄 index.ts
├── 📁 stories/ (flashs)
│   ├── 📄 StoriesData.ts
│   ├── 📄 StoriesSection.tsx
│   ├── 📄 StoryViewer.tsx
│   ├── 📄 CreateStoryModal.tsx
│   └── 📄 index.ts
├── 📁 pulses/
│   ├── 📄 PulseData.ts
│   ├── 📄 PulseCard.tsx
│   ├── 📄 PulseCommentsModal.tsx
│   ├── 📄 PulsesService.ts
│   ├── 📄 PulseStorageService.ts
│   └── 📄 index.ts
├── 📁 chat/ (conversas)
│   ├── 📄 ChatMockData.ts
│   ├── 📄 ChatScreen.tsx
│   ├── 📄 MessageService.ts
│   └── 📄 formatChatMessages.ts
├── 📁 notifications/
│   ├── 📄 NotificationService.ts
│   └── 📄 NotificationsList.tsx
└── 📄 ...
```

## 📂 Explicação de Cada Pasta

### 📁 /feed
Contém todos os componentes e dados relacionados ao feed de posts da aplicação. Inclui cards de posts, modais de comentários, dados mockados de publicações e serviços de armazenamento.

### 📁 /flashs (stories)
Gerencia os stories temporários (flashs) dos usuários. Inclui dados mockados de stories, visualizador de stories, seção de stories e modal de criação.

### 📁 /pulses
Responsável pelos vídeos curtos (pulses) da plataforma. Contém interfaces de dados, cards de exibição, modais de comentários, serviços de dados e armazenamento.

### 📁 /conversas (chat)
Gerencia todas as funcionalidades de chat e mensagens. Inclui dados mockados de conversas, tela de chat, serviços de mensagens e formatação de mensagens.

### 📁 /notificacoes
Controla as notificações da aplicação. Inclui serviço de notificações com dados mockados e lista de notificações.

## 📍 Local dos Dados Mockados

- **Feed**: `components/feed/PostData.ts` - Array `mockPosts`
- **Flashs**: `components/stories/StoriesData.ts` - Array `mockStories`
- **Pulses**: `components/pulses/PulsesService.ts` - Array `mockPulsesData`
- **Conversas**: `components/chat/ChatMockData.ts` - Array `chatConversations`
- **Notificações**: `components/notifications/NotificationService.ts` - Array `notifications` (inicializado no construtor)

## 💡 Exemplos de Dados Mockados

### Feed Post
```typescript
{
  id: '1',
  user: 'Jorge Zikenay',
  avatar: { uri: 'https://api.dicebear.com/7.x/avataaars/png?seed=JorgeZikenay&backgroundColor=FF6B6B&size=100' },
  time: 'Há 3 dias',
  text: 'Demonstração rápida de 3 exercícios para aliviar dor nas costas no home office.',
  image: postImages.workout1,
  likes: 25300,
  comments: 2000,
  shares: 32000,
  location: 'Academia FitHarmony',
  isLiked: false,
}
```

### Flash (Story)
```typescript
{
  id: 'jorge',
  user: {
    id: 'jorge',
    name: 'Jorge Zikenay',
    avatar: avatars.jorge,
  },
  stories: [
    {
      id: 'jorge-story-1',
      type: 'image',
      content: storyImages.workout,
      timestamp: Date.now() - 1800000,
      duration: 5000,
      caption: 'Treino funcional de hoje! 💪',
      captionPosition: 'bottom',
    }
  ],
  hasNewStories: true,
}
```

### Pulse
```typescript
{
  id: '1',
  author: {
    id: 'dr_ana',
    name: 'Dra. Ana Silva',
    avatar: 'https://api.dicebear.com/7.x/avataaars/png?seed=Ana&backgroundColor=4576F2&size=200',
    isVerified: true,
    specialty: 'Cardiologista',
    isFollowing: false
  },
  video: {
    url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_640x360_1mb.mp4',
    thumbnail: 'https://picsum.photos/1080/1920?random=1&blur=2',
    duration: 45,
    resolution: { width: 1080, height: 1920 }
  },
  content: {
    title: 'Dicas para um coração saudável 💓',
    description: 'Exercícios simples que podem salvar sua vida...'
  },
  interactions: {
    likes: { count: 1240, isLiked: false },
    comments: { count: 89 },
    shares: { count: 156 },
    views: { count: 15420 }
  },
  createdAt: '2024-10-06T14:30:00Z',
  medicalCategory: 'education',
  visibility: 'public'
}
```

### Conversa
```typescript
{
  id: '1',
  name: 'Dr. Marcos Toledo',
  avatar: { uri: 'https://api.dicebear.com/7.x/avataaars/png?seed=MarcosToledo&backgroundColor=20B2AA&size=100' },
  verified: true,
  messages: [
    { _id: 1, text: 'Olá', createdAt: new Date('2023-10-10T06:25:00'), user: { _id: 2 } },
    { _id: 2, text: 'Bom dia', createdAt: new Date('2023-10-10T06:40:00'), user: { _id: 1 } }
  ]
}
```

### Notificação
```typescript
{
  id: '1',
  type: 'consulta',
  title: 'Consulta agendada para hoje.',
  description: 'A consulta com a Dra. Maria Glenda irá iniciar hoje às...',
  time: 'Há 05 Minutos',
  isRead: false,
}
```

## ⚙️ Instruções para Adicionar Novos Mocks

### Feed
1. Abra `components/feed/PostData.ts`
2. Adicione um novo objeto ao array `mockPosts`
3. Siga a interface `Post` para garantir consistência
4. Use imagens do `postImages` ou adicione novas URLs

### Flashs
1. Abra `components/stories/StoriesData.ts`
2. Adicione um novo objeto ao array `mockStories`
3. Siga a interface `Story` com `StoryItem[]`
4. Use `avatars` existentes ou adicione novos

### Pulses
1. Abra `components/pulses/PulsesService.ts`
2. Adicione um novo objeto ao array `mockPulsesData`
3. Siga a interface `PulseData`
4. Use URLs de vídeo de exemplo válidas

### Conversas
1. Abra `components/chat/ChatMockData.ts`
2. Adicione um novo objeto ao array `chatConversations`
3. Inclua `messages` como array de objetos com `_id`, `text`, `createdAt` e `user`

### Notificações
1. Abra `components/notifications/NotificationService.ts`
2. No método `initializeMockNotifications()`, adicione ao array `notificationsToday` ou `notificationsWeek`
3. Siga a interface `Notification`

## 🚀 Instruções para Execução Local

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm ou yarn
- Expo CLI

### Instalação
```bash
npm install
```

### Execução
```bash
# Iniciar o servidor de desenvolvimento
npm start

# Ou especificamente para uma plataforma
npm run android  # Para Android
npm run ios      # Para iOS
npm run web      # Para Web
```

### Desenvolvimento
- Use `npm run lint` para verificar código
- A aplicação usa Expo Router para navegação
- Componentes estão organizados por funcionalidade em `components/`
- Estilos usam tema definido em `constants/theme.ts`</content>
<parameter name="filePath">c:\Users\henrique.lyra\Desktop\Henrique\Isaude\README.md