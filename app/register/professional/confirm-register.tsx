import React, { useState } from "react";
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  Alert,
  ActivityIndicator
} from "react-native";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BackHeader } from "@/components/ui/BackHeader";
import { CustomButton } from "@/components/ui/CustomButton";
import { Stepper } from "@/components/ui/Stepper";

// Lógica e Dados
import { registerUser, UserDTO } from "@/src/services/userService";
import { UserData } from "@/components/UserData";

export default function ConfirmRegisterProfessional() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    if (!UserData.email || !UserData.cpf || !UserData.senha) {
      Alert.alert("Erro", "Dados incompletos. Volte e verifique.");
      return;
    }

    setLoading(true);

    try {
      // 1. Montar Payload para Profissional
      const payload: UserDTO = {
        nome: UserData.nome,
        email: UserData.email,
        senha_hash: UserData.senha,
        cpfcnpj: UserData.cpf.replace(/\D/g, ''),
        tipo_usuario: 'PROFISSIONAL', // <--- MUDANÇA PRINCIPAL
        telefone: UserData.telefone.replace(/\D/g, ''),
        genero: UserData.genero,
        dt_nascimento: UserData.dataNascimento,
        areaAtuacao: UserData.areaAtuacao,
        registroProfissional: UserData.registroProfissional
      };

      // 2. Chamar API
      await registerUser(payload);

      // 3. Sucesso
      router.replace("/register/professional/concluido");

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <BackHeader title="Revisão" />
      <Stepper totalSteps={5} currentStep={5} />

      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Confirme seus dados</Text>
          <Text style={styles.subtitle}>
            Revise as informações do seu perfil profissional.
          </Text>

          <View style={styles.summaryCard}>
            <View style={styles.summaryItem}>
              <Text style={styles.label}>Nome</Text>
              <Text style={styles.value}>{UserData.nome}</Text>
            </View>
            <View style={styles.divider} />

            <View style={styles.summaryItem}>
              <Text style={styles.label}>CPF</Text>
              <Text style={styles.value}>{UserData.cpf}</Text>
            </View>
            <View style={styles.divider} />

            <View style={styles.summaryItem}>
              <Text style={styles.label}>Área de Atuação</Text>
              <Text style={styles.value}>{UserData.areaAtuacao}</Text>
            </View>
            <View style={styles.divider} />

            <View style={styles.summaryItem}>
              <Text style={styles.label}>Registro Profissional</Text>
              <Text style={styles.value}>{UserData.registroProfissional}</Text>
            </View>
            <View style={styles.divider} />

            <View style={styles.summaryItem}>
              <Text style={styles.label}>Email</Text>
              <Text style={styles.value}>{UserData.email}</Text>
            </View>
          </View>

        </View>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 24 }]}>
        <CustomButton
          onPress={handleConfirm}
          disabled={loading}
          icon={!loading ? <Feather name="check-circle" size={18} color="white" /> : undefined}
        >
          {loading ? <ActivityIndicator color="#FFF" /> : "Confirmar Cadastro"}
        </CustomButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  scrollContent: { flexGrow: 1 },
  contentContainer: { paddingHorizontal: 24, paddingTop: 16 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1A202C', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#718096', marginBottom: 32, lineHeight: 24 },
  summaryCard: {
    backgroundColor: '#F7FAFC',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#EDF2F7',
    marginBottom: 24,
  },
  summaryItem: { marginBottom: 4 },
  label: { fontSize: 12, color: '#A0AEC0', textTransform: 'uppercase', fontWeight: '600', marginBottom: 4 },
  value: { fontSize: 16, color: '#2D3748', fontWeight: '500' },
  divider: { height: 1, backgroundColor: '#E2E8F0', marginVertical: 12 },
  footer: { paddingHorizontal: 24, paddingTop: 16, backgroundColor: "#fff", borderTopWidth: 1, borderTopColor: '#f3f4f6' },
});