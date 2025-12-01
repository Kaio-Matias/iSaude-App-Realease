import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BackHeader } from "@/components/ui/BackHeader";
import { Stepper } from "@/components/ui/Stepper";
import { CustomInput } from "@/components/ui/CustomInput";
import { CustomButton } from "@/components/ui/CustomButton";

export default function UnityInformationFormClinic() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [email, setEmail] = useState("");
  const [telefones, setTelefones] = useState([""]);

  const handleNext = () => {
    router.push("/register/clinic/password-info");
  };

  const handleTelefoneChange = (value: string, idx: number) => {
    const cleaned = value.replace(/\D/g, "").slice(0, 11);
    let formatted = cleaned;
    if (cleaned.length > 10) formatted = cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    else if (cleaned.length > 6) formatted = cleaned.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    else if (cleaned.length > 2) formatted = cleaned.replace(/(\d{2})(\d{0,5})/, '($1) $2');

    const novos = [...telefones];
    novos[idx] = formatted;
    setTelefones(novos);
  };

  const adicionarTelefone = () => setTelefones([...telefones, ""]);
  const removerTelefone = (idx: number) => setTelefones(telefones.filter((_, i) => i !== idx));

  const podeAvancar = email.trim() && telefones.some(t => t.trim().length >= 14);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <BackHeader title="Nova Conta" />
      <Stepper totalSteps={6} currentStep={4} />
      
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <View style={styles.formContainer}>
            <Text style={styles.title}>Vamos manter sua Unidade conectada!</Text>
            <Text style={styles.subtitle}>Insira o Email e Telefones oficiais da unidade.</Text>
            
            <CustomInput
              label="Email da Unidade"
              placeholder="contato@clinica.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              icon={<Feather name="mail" size={18} color="#A0AEC0" />}
            />

            <Text style={styles.sectionLabel}>Telefones de Contato</Text>
            {telefones.map((telefone, idx) => (
              <View key={idx} style={styles.phoneRow}>
                <View style={{ flex: 1 }}>
                  <CustomInput
                    label=""
                    placeholder="(00) 00000-0000"
                    value={telefone}
                    onChangeText={v => handleTelefoneChange(v, idx)}
                    keyboardType="phone-pad"
                    icon={<Feather name="phone" size={18} color="#A0AEC0" />}
                  />
                </View>
                {telefones.length > 1 && (
                  <TouchableOpacity onPress={() => removerTelefone(idx)} style={styles.removeButton}>
                    <Feather name="trash-2" size={20} color="#EF4444" />
                  </TouchableOpacity>
                )}
              </View>
            ))}
            
            <TouchableOpacity onPress={adicionarTelefone} style={styles.addButton}>
              <Feather name="plus" size={16} color="#01AEA4" />
              <Text style={styles.addButtonText}>Adicionar outro telefone</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 24 }]}>
        <CustomButton onPress={handleNext} icon={<Feather name="arrow-right" size={18} color="white" />} disabled={!podeAvancar}>
          Próximo
        </CustomButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  scrollContent: { flexGrow: 1 },
  formContainer: { paddingHorizontal: 24, paddingTop: 16 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1A202C', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#718096', marginBottom: 24 },
  sectionLabel: { fontSize: 16, fontWeight: '600', color: '#2D3748', marginBottom: 8, marginTop: 8 },
  phoneRow: { flexDirection: 'row', alignItems: 'flex-start' },
  removeButton: { marginLeft: 12, marginTop: 45, padding: 8 }, // Ajuste para alinhar com o input
  addButton: { flexDirection: 'row', alignItems: 'center', padding: 12, justifyContent: 'center', borderWidth: 1, borderColor: '#01AEA4', borderRadius: 8, marginTop: 8, borderStyle: 'dashed' },
  addButtonText: { color: '#01AEA4', fontWeight: '600', marginLeft: 8 },
  footer: { paddingHorizontal: 24, paddingTop: 16, backgroundColor: "#fff", borderTopWidth: 1, borderTopColor: '#f3f4f6' },
});