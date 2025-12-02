import { Post, PostCard, storageService } from '@/components/feed';
import { notificationService } from '@/components/notifications/NotificationService';
import { CreatePostButton } from '@/components/post';
import { StoriesSection } from '@/components/stories';
import { useTabBadges } from '@/hooks/useTabBadges';
import { Ionicons } from '@expo/vector-icons';
import { router, useFocusEffect } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, FlatList, Image, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '@/src/services/api'; // Import da sua API

// Interface para o User
interface UserProfile {
  id: number;
  nome: string;
  email: string;
  ft_perfil?: string;
  tipo_usuario?: string;
}

export default function HomeScreen() {
  const [isValidated] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [unreadNotifications, setUnreadNotifications] = useState<number>(0);
  const [user, setUser] = useState<UserProfile | null>(null); // Estado do Utilizador
  const { updateBadge } = useTabBadges();

  // Carregar dados iniciais
  useEffect(() => {
    loadUserData();
    loadPosts();
    updateUnreadCounts();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadUserData(); // Recarrega user data se mudar (ex: editou perfil)
      loadPosts();
      updateUnreadCounts();
    }, [])
  );

  // Nova função para carregar dados do utilizador
  const loadUserData = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        // Adiciona o token ao cabeçalho das requisições
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        // Busca os dados do perfil (ajuste a rota conforme seu backend: /user/profile ou /user)
        // Se o backend exigir ID, você precisaria ter salvo o ID no login ou ter um endpoint /me
        // Vou assumir uma rota genérica /user que retorna dados do token ou lista
        // Se o seu backend GetUser.ts retorna uma lista, precisaremos filtrar ou ajustar.
        // Pelo GetUser.ts que vi, ele aceita ?id=... ou pega todos.
        // Vamos tentar pegar o user atual se você salvou o ID no login, senão precisaremos decodificar o token.
        
        // SOLUÇÃO TEMPORÁRIA: Se salvou userData no login, usa ele.
        // Se não, vamos tentar chamar a API.
        
        const savedUser = await AsyncStorage.getItem('userData');
        if (savedUser) {
             setUser(JSON.parse(savedUser));
        } else {
            // Se não tiver salvo, tenta buscar (ajuste conforme sua rota real)
             // const response = await api.get('/user/me'); 
             // setUser(response.data);
        }
      }
    } catch (error) {
      console.error("Erro ao carregar usuário:", error);
    }
  };

  const loadPosts = () => {
    setPosts(storageService.getPosts());
  };

  const updateUnreadCounts = () => {
    const notifications = notificationService.getUnreadCount();
    setUnreadNotifications(notifications);
    updateBadge('home', notifications);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadUserData();
    loadPosts();
    updateUnreadCounts();
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  const handleLike = (postId: string) => {
    console.log('Like no post:', postId);
  };

  const handleDelete = (postId: string) => {
    setPosts(prev => prev.filter(post => post.id !== postId));
  };

  const renderPost = ({ item }: { item: Post }) => (
    <PostCard
      post={item}
      onLike={handleLike}
      onDelete={handleDelete}
    />
  );

  const handleStoryCreated = () => {
    loadPosts();
    console.log('Story criado!');
  };

  const renderStoriesAndTabs = () => (
    <View>
      <StoriesSection onStoryCreated={handleStoryCreated} />
      <View style={styles.tabsContainer}>
        <TouchableOpacity style={styles.tabButtonActive} activeOpacity={0.8}>
          <Text style={styles.tabTextActive}>Feed</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.tabButtonInactive} 
          activeOpacity={0.8}
          onPress={() => router.push('/pulses')}
        >
          <Ionicons name="pulse-outline" size={12} color="#6B7480" style={{ marginRight: 4 }} />
          <Text style={styles.tabTextInactive}>Pulses</Text>
        </TouchableOpacity>
      </View>
    </View> 
  );

  const ListHeader = () => (
    <>
      {renderStoriesAndTabs()}
    </>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.headerContent}>
        <Image 
          source={require('@/assets/images/isaudeicon.png')} 
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <View style={styles.headerActions}>
        <View style={styles.notificationButtonContainer}>
          <TouchableOpacity style={styles.notificationButton} onPress={() => router.push('/(tabs)/notificacoes')}>
            <Ionicons name="notifications-outline" size={24} color="#4A5463" />
          </TouchableOpacity>
          <NotificationBadge count={unreadNotifications} />
        </View>
        
        <TouchableOpacity style={styles.profileButton} onPress={() => {
            // Opcional: Navegar para perfil
            // router.push('/profile');
            Alert.alert("Perfil", `Olá, ${user?.nome || 'Visitante'}`);
        }}>
          <Image 
            source={{ 
                uri: user?.ft_perfil 
                    ? user.ft_perfil 
                    : 'https://api.dicebear.com/7.x/avataaars/png?seed=User&backgroundColor=E2E8F0' 
            }} 
            style={styles.profileImage}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  const handleCreateNote = () => {
    router.push('./post/create-note');
  };

  const handleCreateMedia = () => {
    router.push('./post/create-note?gallery=true');
  };

  const handleCreatePulse = () => {
    Alert.alert('Em breve', 'A funcionalidade Pulse estará disponível em breve!');
  };

  const NotificationBadge = ({ count }: { count: number }) => {
    if (count === 0) return null;
    return (
      <View style={styles.badge}>
        <Text style={styles.badgeText}>
          {count > 99 ? '99+' : count.toString()}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container]} edges={['top']}>
      {renderHeader()}
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={renderPost}
        ListHeaderComponent={ListHeader}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        contentContainerStyle={styles.feedContent}
        showsVerticalScrollIndicator={false}
      />
      
      <CreatePostButton
        onCreateNote={handleCreateNote}
        onCreateMedia={handleCreateMedia}
        onCreatePulse={handleCreatePulse}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#EFF1F5' },
  header: {
    height: 80,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#E5EAF0',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 32,
    marginRight: 8,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  notificationButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationButtonContainer: {
    position: 'relative',
  },
  profileButton: {
    width: 32,
    height: 32,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#E2E8F0', // Cor de fundo caso a imagem falhe
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  feedContent: { paddingBottom: 32, paddingTop: 0 },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
    marginRight: 16,
    paddingVertical: 8,
  },
  tabButtonActive: {
    backgroundColor: '#4576F2',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  tabButtonInactive: {
    backgroundColor: '#D8DCE5',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabTextActive: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  tabTextInactive: {
    fontSize: 12,
    color: '#6B7480',
    fontWeight: '500',
  },
  badge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#FF3040',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
    textAlign: 'center',
  },
});