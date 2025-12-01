import React from 'react';
import { Text, TouchableOpacity, StyleSheet, TouchableOpacityProps, StyleProp, TextStyle, ViewStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface CustomLinkProps extends TouchableOpacityProps {
  children: React.ReactNode;
  variant?: 'primary' | 'muted' | 'black';
  icon?: keyof typeof Feather.glyphMap;
  textStyle?: StyleProp<TextStyle>;
  inline?: boolean;
}

export function CustomLink({ 
  children, 
  variant = 'primary', 
  icon, 
  style, 
  textStyle,
  inline = false,
  ...props 
}: CustomLinkProps) {
  
  const getTextColor = () => {
    switch (variant) {
      case 'muted': return '#718096';
      case 'black': return '#1A202C';
      default: return '#01AEA4';
    }
  };

  if (inline) {
    return (
      <Text 
        onPress={props.onPress} 
        style={[styles.text, { color: getTextColor() }, textStyle]}
      >
        {children}
      </Text>
    );
  }

  return (
    <TouchableOpacity 
      style={[styles.container, style as ViewStyle]} 
      activeOpacity={0.7}
      {...props}
    >
      <Text style={[styles.text, { color: getTextColor() }, textStyle]}>
        {children}
      </Text>
      {icon && <Feather name={icon} size={16} color={getTextColor()} style={styles.icon} />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  text: {
    fontSize: 14,
    fontWeight: '600',
  },
  icon: {
    marginLeft: 4,
  }
});