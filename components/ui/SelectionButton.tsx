import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, TouchableOpacityProps } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface SelectionButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary';
}

export function SelectionButton({ title, variant = 'primary', style, ...props }: SelectionButtonProps) {
  const backgroundColor = variant === 'primary' ? '#01AEA4' : '#7F5CE1';

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor }, style]}
      activeOpacity={0.9}
      {...props}
    >
      <Text style={styles.title}>{title}</Text>
      <View style={styles.iconContainer}>
        <Feather name="arrow-right" size={22} color="#fff" />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    height: 80,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
    marginRight: 16,
  },
  iconContainer: {
    // Se quiser adicionar um círculo atrás da seta futuramente
  }
});