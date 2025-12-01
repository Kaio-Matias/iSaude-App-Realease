import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Platform } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface BackHeaderProps {
  title: string;
  onBackPress?: () => void; // Opcional, caso queira sobrescrever o comportamento padrão
}

export function BackHeader({ title, onBackPress }: BackHeaderProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleBack = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      router.back();
    }
  };

  return (
    <View style={[styles.container, { paddingTop: Platform.OS === 'ios' ? 0 : insets.top + 10 }]}>
      <TouchableOpacity onPress={handleBack} style={styles.button} activeOpacity={0.7}>
        <Feather name="arrow-left" size={24} color="#1A202C" />
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.placeholder} /> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 16,
    backgroundColor: '#fff',
    // Sombra suave para dar destaque ao header (opcional)
    borderBottomWidth: 1,
    borderBottomColor: '#F7FAFC',
  },
  button: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#F7FAFC',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A202C',
  },
  placeholder: {
    width: 40, // Mesmo tamanho do botão para centralizar o título
  }
});