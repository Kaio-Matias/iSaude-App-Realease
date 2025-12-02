import React, { useState } from "react";
import { 
  View, 
  Text, 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView, 
  StyleSheet, 
  Alert 
} from "react-native";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BackHeader } from "@/components/ui/BackHeader";
import { CustomInput } from "@/components/ui/CustomInput";
import { CustomButton } from "@/components/ui/CustomButton";
import { Stepper } from "@/components/ui/Stepper";
import { CustomLink } from "@/components/ui/CustomLink";
import { SmsVerificationModal } from "@/components/ui/SmsVerificationModal";

// Lógica
import { UserData } from "@/components/UserData";

export default function PersonalInformationFormClinic() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // Carrega dados existentes caso o usuário volte
  const [nome, setNome] = useState(UserData.nome || "");
  const [cpf, setCpf] = useState(UserData.cpf || "");
  const [email, setEmail] = useState(UserData.email || "");
  const [telefone, setTelefone] = useState(UserData.telefone || "");
  
  const [showSmsModal, setShowSmsModal] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const rawCpf = cpf.replace(/\D/g, '');
  const rawTelefone = telefone.replace(/\D/g, '');

  const isValid = 
    nome.trim().length > 2 && 
    rawCpf.length === 11 && 
    email.includes('@') && 
    rawTelefone.length >= 10;

  const formatCpf = (value: string) => {
    const cleaned = value.replace(/\D/g, "").slice(0, 11);
    let formatted = cleaned;
    if (cleaned.length > 9) formatted = cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, "$1.$2.$3-$4");
    else if (cleaned.length > 6) formatted = cleaned.replace(/(\d{3})(\d{3})(\d{1,3})/, "$1.$2.$3");
    else if (cleaned.length > 3) formatted = cleaned.replace(/(\d{3})(\d{1,3})/, "$1.$2");
    return formatted;
  };

  const formatTelefone = (value: string) => {
    const cleaned = value.replace(/\D/g, "").slice(0, 11);
    let formatted = cleaned;
    if (cleaned.length > 10) formatted = cleaned.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    else if (cleaned.length > 6) formatted = cleaned.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
    else if (cleaned.length > 2) formatted = cleaned.replace(/(\d{2})(\d{0,5})/, "($1) $2");
    return formatted;
  };

  const handleContinue = () => {
    if (!isValid) return;

    if (!isVerified) {
      setShowSmsModal(true);
      return;
    }

    // --- INTEGRAÇÃO ---
    UserData.nome = nome;
    UserData.cpf = cpf;
    UserData.email = email;
    UserData.telefone = telefone;
    // ------------------

    router.push("/register/clinic/basic-info");
  };

  const handleVerifyCode = (code: string) => {
    setShowSmsModal(false);
    setIsVerified(true);
    Alert.alert("Sucesso", "Telefone verificado com sucesso!", [
        { 
            text: "OK", 
            onPress: () => {
                UserData.nome = nome;
                UserData.cpf = cpf;
                UserData.email = email;
                UserData.telefone = telefone;
                router.push("/register/clinic/basic-info");
            }
        }
    ]);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <BackHeader title="Nova Conta" />
      <Stepper totalSteps={6} currentStep={1} />

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.formContainer}>
            <Text style={styles.title}>Vamos começar sua jornada!</Text>
            <Text style={styles.subtitle}>Precisamos dos dados do representante legal para criar a conta.</Text>

            <CustomInput
              label="Nome Completo"
              placeholder="Carlos Magno de Souza"
              icon={<Feather name="user" size={18} color="#A0AEC0" />}
              value={nome}
              onChangeText={setNome}
            />

            <View style={styles.inputGroup}>
                <CustomInput
                    label="CPF"
                    placeholder="000.000.000-00"
                    icon={<Feather name="credit-card" size={18} color="#A0AEC0" />}
                    value={cpf}
                    onChangeText={(text) => setCpf(formatCpf(text))}
                    keyboardType="numeric"
                />
                <CustomLink variant="muted" icon="chevron-right" style={styles.helpLink} onPress={() => Alert.alert("Informação", "O CPF do representante é necessário para a validação legal.")}>
                    Por que pedimos seu CPF?
                </CustomLink>
            </View>

            <CustomInput
              label="Email Pessoal"
              placeholder="seuemail@exemplo.com"
              icon={<Feather name="mail" size={18} color="#A0AEC0" />}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <CustomInput
              label="Número de Telefone"
              placeholder="(00) 00000-0000"
              icon={<Feather name="phone" size={18} color="#A0AEC0" />}
              value={formatTelefone(telefone)}
              onChangeText={(text) => setTelefone(text.replace(/\D/g, "").slice(0, 11))}
              keyboardType="phone-pad"
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 24 }]}>
        <CustomButton onPress={handleContinue} icon={<Feather name="arrow-right" size={18} color="white" />} disabled={!isValid}>
          Continuar
        </CustomButton>
      </View>

      <SmsVerificationModal 
        visible={showSmsModal} 
        onClose={() => setShowSmsModal(false)}
        onVerify={handleVerifyCode}
        phoneEnding={telefone.slice(-4)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  scrollContent: { flexGrow: 1 },
  formContainer: { paddingHorizontal: 24, paddingTop: 16 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1A202C', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#718096', marginBottom: 24 },
  inputGroup: { marginBottom: 8 },
  helpLink: { marginTop: -8, marginBottom: 16, alignSelf: 'flex-start' },
  footer: { paddingHorizontal: 24, paddingTop: 16, backgroundColor: "#fff", borderTopWidth: 1, borderTopColor: '#f7fafc' },
});