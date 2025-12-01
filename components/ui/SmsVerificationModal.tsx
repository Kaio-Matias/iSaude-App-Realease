import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import { CustomModal } from '@/components/ui/CustomModal';
import { CustomButton } from '@/components/ui/CustomButton';
import { CustomLink } from '@/components/ui/CustomLink';

interface SmsVerificationModalProps {
  visible: boolean;
  onClose: () => void;
  onVerify: (code: string) => void;
  phoneEnding: string;
}

export function SmsVerificationModal({ visible, onClose, onVerify, phoneEnding }: SmsVerificationModalProps) {
  const [code, setCode] = useState('');

  return (
    <CustomModal visible={visible} onClose={onClose}>
      <Text style={styles.title}>Verifique seu número</Text>
      <Text style={styles.subtitle}>
        Enviamos um código de 6 dígitos para o número final {phoneEnding}.
      </Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="000000"
          keyboardType="number-pad"
          maxLength={6}
          value={code}
          onChangeText={setCode}
          textAlign="center"
        />
      </View>

      <CustomButton 
        onPress={() => onVerify(code)} 
        disabled={code.length < 6}
      >
        Verificar Código
      </CustomButton>

      <View style={styles.resendContainer}>
        <Text style={styles.resendText}>Não recebeu? </Text>
        <CustomLink onPress={() => console.log('Reenviar SMS')}>Reenviar código</CustomLink>
      </View>
    </CustomModal>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A202C',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#718096',
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    padding: 16,
    fontSize: 24,
    letterSpacing: 8,
    backgroundColor: '#F7FAFC',
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
    alignItems: 'center',
  },
  resendText: {
    color: '#718096',
    fontSize: 14,
  }
});