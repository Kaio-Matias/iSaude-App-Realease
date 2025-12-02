import React, { useState } from "react";
import { View, Text, ScrollView, KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BackHeader } from "@/components/ui/BackHeader";
import { Stepper } from "@/components/ui/Stepper";
import { CustomButton } from "@/components/ui/CustomButton";
import { CustomInput } from "@/components/ui/CustomInput";
import { ErrorBanner } from "@/components/ui/ErrorBanner";

import { UserData } from "@/components/UserData";

export default function PasswordInformationFormClinic() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [senha, setSenha] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [erro, setErro] = useState("");

  const criteria = [
    { label: 'Mínimo de 8 caracteres', valid: senha.length >= 8 },
    { label: 'Letra maiúscula', valid: /[A-Z]/.test(senha) },
    { label: 'Número', valid: /[0-9]/.test(senha) },
    { label: 'Caractere especial', valid: /[^A-Za-z0-9]/.test(senha) },
  ];
  const allCriteriaMet = criteria.every(c => c.valid);

  const getPasswordStrength = (password: string) => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    if (score <= 1) return 0;
    if (score === 2 || score === 3) return 1;
    return 2;
  };

  const strength = getPasswordStrength(senha);
  const strengthLabels = ["Fraca", "Média", "Forte"];
  const getBarColor = (i: number) => {
    if (strength === 2) return '#10b981';
    if (strength === 1) return i < 2 ? '#f59e42' : '#e5e7eb';
    if (strength === 0) return i === 0 ? '#ef4444' : '#e5e7eb';
    return '#e5e7eb';
  };

  const handleFinish = () => {
    if (!allCriteriaMet || senha !== confirmar) {
        setErro("Verifique os requisitos da senha.");
        return;
    }
    setErro("");
    
    // --- INTEGRAÇÃO ---
    UserData.senha = senha;
    // ------------------

    router.push("/register/clinic/confirm-register");
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ErrorBanner visible={!!erro} message={erro} onClose={() => setErro("")} />
      <BackHeader title="Nova Conta" />
      <Stepper totalSteps={6} currentStep={5} />
      
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.formContainer}>
            <Text style={styles.title}>Crie uma Senha Segura</Text>
            <Text style={styles.subtitle}>Proteja os dados da sua clínica e pacientes.</Text>
            <CustomInput label="Senha" placeholder="Digite sua senha" value={senha} onChangeText={setSenha} secureTextEntry icon={<Feather name="lock" size={18} color="#A0AEC0" />} />
            
            {senha.length > 0 && (
              <View style={styles.strengthContainer}>
                {[0,1,2].map(i => <View key={i} style={[styles.strengthBar, { backgroundColor: getBarColor(i) }]} />)}
                <Text style={styles.strengthText}>{strengthLabels[strength]}</Text>
              </View>
            )}

            <CustomInput label="Confirmar Senha" placeholder="Digite novamente" value={confirmar} onChangeText={setConfirmar} secureTextEntry icon={<Feather name="lock" size={18} color="#A0AEC0" />} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 24 }]}>
        <CustomButton onPress={handleFinish} icon={<Feather name="check" size={18} color="white" />} disabled={!allCriteriaMet || senha !== confirmar}>
          Finalizar Cadastro
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
  strengthContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 24, marginTop: -8 },
  strengthBar: { flex: 1, height: 6, marginRight: 6, borderRadius: 3 },
  strengthText: { fontWeight: 'bold', fontSize: 13, marginLeft: 8 },
  footer: { paddingHorizontal: 24, paddingTop: 16, backgroundColor: "#fff", borderTopWidth: 1, borderTopColor: '#f3f4f6' },
});