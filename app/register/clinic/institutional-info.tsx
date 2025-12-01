import React, { useState } from 'react';
import { View, Text, ScrollView, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BackHeader } from '@/components/ui/BackHeader';
import { Stepper } from '@/components/ui/Stepper';
import { CustomInput } from '@/components/ui/CustomInput';
import { CustomButton } from '@/components/ui/CustomButton';
import { CustomSelect } from '@/components/ui/CustomSelect';

const TIPOS_UNIDADE = ['Clínica Médica', 'Hospital', 'Laboratório', 'Consultório', 'Centro de Diagnóstico', 'Outro'];

export default function InstitutionalInformationFormClinic() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [cnpj, setCnpj] = useState('');
  const [nomeFantasia, setNomeFantasia] = useState('');
  const [tipoUnidade, setTipoUnidade] = useState('Clínica Médica');

  const isValid = cnpj.length >= 18 && nomeFantasia.trim().length > 0;

  const formatCNPJ = (text: string) => {
    const numbers = text.replace(/\D/g, '');
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 5) return `${numbers.slice(0, 2)}.${numbers.slice(2)}`;
    if (numbers.length <= 8) return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5)}`;
    if (numbers.length <= 12) return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5, 8)}/${numbers.slice(8)}`;
    return `${numbers.slice(0, 2)}.${numbers.slice(2, 5)}.${numbers.slice(5, 8)}/${numbers.slice(8, 12)}-${numbers.slice(12, 14)}`;
  };

  const handleNext = () => {
    if (!isValid) return;
    router.push('/register/clinic/unity-info');
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <BackHeader title="Nova Conta" />
      <Stepper totalSteps={6} currentStep={3} />
      
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <View style={styles.formContainer}>
            <Text style={styles.title}>Informações Institucionais</Text>
            <Text style={styles.subtitle}>Preencha as informações da sua instituição para conectarmos você de forma segura.</Text>
            
            <CustomInput
              label="CNPJ"
              value={cnpj}
              onChangeText={(t) => setCnpj(formatCNPJ(t))}
              placeholder="01.234.567/0001-10"
              keyboardType="numeric"
              maxLength={18}
              icon={<Feather name="briefcase" size={20} color="#A0AEC0" />}
            />
            <CustomInput
              label="Nome Fantasia"
              value={nomeFantasia}
              onChangeText={setNomeFantasia}
              placeholder="Clínica Saúde"
              icon={<Feather name="layout" size={20} color="#A0AEC0" />}
            />
            <CustomSelect
              label="Tipo de Unidade"
              value={tipoUnidade}
              options={TIPOS_UNIDADE}
              onSelect={setTipoUnidade}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 24 }]}>
        <CustomButton onPress={handleNext} icon={<Feather name="arrow-right" size={18} color="white" />} disabled={!isValid}>
          Continuar
        </CustomButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollContent: { flexGrow: 1 },
  formContainer: { paddingHorizontal: 24, paddingTop: 16 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1A202C', marginBottom: 8 },
  subtitle: { color: '#6B7280', fontSize: 16, marginBottom: 24, lineHeight: 22 },
  footer: { paddingHorizontal: 24, paddingTop: 16, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#f3f4f6' },
});