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

// Componentes
import { BackHeader } from "@/components/ui/BackHeader";
import { CustomButton } from "@/components/ui/CustomButton";
import { Stepper } from "@/components/ui/Stepper";

// Serviço e Dados
import { registerUser, UserDTO } from "@/src/services/userService";
import { UserData } from "@/components/UserData";

export default function ConfirmRegisterPacient() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = useState(false);

  // Validação rápida para garantir que temos dados
  const hasData = UserData.email && UserData.cpf && UserData.senha;

  const handleConfirm = async () => {
    if (!hasData) {
      Alert.alert("Erro", "Dados incompletos. Por favor, volte e preencha o formulário.");
      return;
    }

    setLoading(true);

    try {
      // 1. Montar o objeto para envio (Payload)
      // Removemos formatação de CPF e Telefone para enviar limpo
      const payload: UserDTO = {
        nome: UserData.nome,
        email: UserData.email,
        senha_hash: UserData.senha,
        cpfcnpj: UserData.cpf.replace(/\D/g, ''), // Remove pontos e traços
        tipo_usuario: 'PACIENTE',
        telefone: UserData.telefone.replace(/\D/g, ''),
        genero: UserData.genero,
        dt_nascimento: UserData.dataNascimento,
      };

      // 2. Chamar a API
      console.log("Enviando cadastro...", payload);
      await registerUser(payload);

      // 3. Sucesso!
      // Navegar para a tela de sucesso (Crie o arquivo concluido.tsx com o código da imagem que você mandou)
      router.replace("/register/pacient/concluido");

    } catch (error) {
      // O alerta de erro já é exibido dentro do registerUser, 
      // mas se quiser um específico aqui:
      console.error("Erro no componente:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <BackHeader title="Revisão" />
      {/* Exibindo como passo final */}
      <Stepper totalSteps={4} currentStep={4} />

      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Quase lá!</Text>
          <Text style={styles.subtitle}>
            Verifique se os seus dados estão corretos antes de finalizar o cadastro.
          </Text>

          {/* Cartão de Resumo dos Dados */}
          <View style={styles.summaryCard}>
            <View style={styles.summaryItem}>
              <Text style={styles.label}>Nome</Text>
              <Text style={styles.value}>{UserData.nome || "Não informado"}</Text>
            </View>
            
            <View style={styles.divider} />

            <View style={styles.summaryItem}>
              <Text style={styles.label}>CPF</Text>
              <Text style={styles.value}>{UserData.cpf || "Não informado"}</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.summaryItem}>
              <Text style={styles.label}>Email</Text>
              <Text style={styles.value}>{UserData.email || "Não informado"}</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.summaryItem}>
              <Text style={styles.label}>Telefone</Text>
              <Text style={styles.value}>{UserData.telefone || "Não informado"}</Text>
            </View>
          </View>

          <Text style={styles.infoText}>
            Ao clicar em confirmar, a sua conta será criada e você poderá fazer login imediatamente.
          </Text>

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
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    flexGrow: 1,
  },
  contentContainer: {
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A202C',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#718096',
    marginBottom: 32,
    lineHeight: 24,
  },
  summaryCard: {
    backgroundColor: '#F7FAFC',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#EDF2F7',
    marginBottom: 24,
  },
  summaryItem: {
    marginBottom: 4,
  },
  label: {
    fontSize: 12,
    color: '#A0AEC0',
    textTransform: 'uppercase',
    fontWeight: '600',
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    color: '#2D3748',
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#E2E8F0',
    marginVertical: 12,
  },
  infoText: {
    fontSize: 13,
    color: '#718096',
    textAlign: 'center',
    marginBottom: 20,
  },
  footer: {
    paddingHorizontal: 24,
    paddingTop: 16,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
});