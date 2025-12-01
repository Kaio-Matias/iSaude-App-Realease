import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, TouchableOpacityProps, View } from 'react-native';

interface CustomButtonProps extends TouchableOpacityProps {
  variant?: 'primary' | 'secondary' | 'outline';
  loading?: boolean;
  icon?: React.ReactNode;
}

export function CustomButton({ 
  children, 
  variant = 'primary', 
  loading, 
  icon, 
  style, 
  ...props 
}: CustomButtonProps) {
  
  const getBackgroundColor = () => {
    if (props.disabled) return '#CBD5E0';
    switch (variant) {
      case 'secondary': return '#7F5CE1';
      case 'outline': return 'transparent';
      default: return '#rgba(69, 118, 242, 1)'; // Cor principal do iSaúde
    }
  };

  const getTextColor = () => {
    if (variant === 'outline') return '#rgba(69, 118, 242, 1)';
    return '#FFFFFF';
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: getBackgroundColor() },
        variant === 'outline' && styles.borderOutline,
        style,
      ]}
      activeOpacity={0.8}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <>
          <Text style={[styles.text, { color: getTextColor() }]}>
            {children}
          </Text>
          {icon && <View style={styles.iconRight}>{icon}</View>}
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    height: 56,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    width: '100%',
  },
  borderOutline: {
    borderWidth: 1,
    borderColor: '#rgba(69, 118, 242, 1)',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  iconRight: {
    marginLeft: 8,
  },
});