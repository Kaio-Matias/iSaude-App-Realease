import React, { useState } from "react";
import { 
  View, 
  Text, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform, 
  StyleSheet 
} from "react-native";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Componentes
import { BackHeader } from "@/components/ui/BackHeader";
import { Stepper } from "@/components/ui/Stepper";
import { CustomButton } from "@/components/ui/CustomButton";
import { CustomInput } from "@/components/ui/CustomInput";
import { ErrorBanner } from "@/components/ui/ErrorBanner";

// Lógica de Dados
import { UserData } from "@/components/UserData";

export default function PasswordInformationFormPacient() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [senha, setSenha] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [erro, setErro] = useState("");

  // Lógica de Validação
  const criteria = [
    { label: 'Mínimo de 8 caracteres', valid: senha.length >= 8 },
    { label: 'Letra maiúscula', valid: /[A-Z]/.test(senha) },
    { label: 'Número', valid: /[0-9]/.test(senha) },
    { label: 'Caractere especial', valid: /[^A-Za-z0-9]/.test(senha) },
  ];
  const allCriteriaMet = criteria.every(c => c.valid);

  // Força da senha: 0 = fraca, 1 = média, 2 = forte
  const getPasswordStrength = (password: string) => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    if (score <= 1) return 0; // fraca
    if (score === 2 || score === 3) return 1; // média
    return 2; // forte
  };

  const strength = getPasswordStrength(senha);
  const strengthLabels = ["Fraca", "Média", "Forte"];

  const getBarColor = (barIndex: number) => {
    if (strength === 2) return '#10b981'; // forte: verde
    if (strength === 1) return barIndex < 2 ? '#f59e42' : '#e5e7eb'; // média: laranja
    if (strength === 0) return barIndex === 0 ? '#ef4444' : '#e5e7eb'; // fraca: vermelho
    return '#e5e7eb'; // inativo
  };

  const getStrengthTextColor = () => {
    if (strength === 2) return '#10b981';
    if (strength === 1) return '#f59e42';
    if (strength === 0) return '#ef4444';
    return '#6b7280';
  };

  const isValid = senha.trim() && confirmar.trim() && senha === confirmar && (strength === 2 && allCriteriaMet);

  const handleNext = () => {
    if (!senha || !confirmar) {
      setErro("Preencha todos os campos.");
      return;
    }
    if (senha !== confirmar) {
      setErro("As senhas não coincidem.");
      return;
    }
    if (!(strength === 2 && allCriteriaMet)) {
      setErro("A senha precisa ser forte e atender todos os requisitos.");
      return;
    }
    
    setErro("");
    
    // --- LÓGICA INTEGRADA: Salvar senha ---
    UserData.senha = senha;
    // -------------------------------------

    // Navegar para a tela de confirmação final (que vai chamar a API)
    // OBS: Certifique-se de usar o código de 'confirm-register.tsx' que gerei na resposta anterior
    router.push("/register/pacient/confirm-register");
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ErrorBanner visible={!!erro} message={erro} onClose={() => setErro("")} />
      
      <BackHeader title="Nova Conta" />
      <Stepper totalSteps={4} currentStep={4} />
      
      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent} 
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.formContainer}>
            <Text style={styles.title}>Agora vamos criar uma Senha!</Text>
            <Text style={styles.subtitle}>
              Crie uma senha forte que será usada para fazer login. A senha deve conter letras minúsculas e maiúsculas, números e caracteres especiais.
            </Text>
            
            <CustomInput
              label="Crie uma Senha"
              placeholder="Digite sua senha aqui"
              value={senha}
              onChangeText={setSenha}
              secureTextEntry
              icon={<Feather name="lock" size={18} color="#A0AEC0" />}
            />

            {/* Lista de Critérios */}
            {senha.length > 0 && !(strength === 2 && allCriteriaMet) && (
              <View style={styles.criteriaContainer}>
                <Text style={styles.criteriaTitle}>
                  Para criar a senha, atenda todos os requisitos:
                </Text>
                {criteria.filter(c => !c.valid).map((c, idx) => (
                  <Text key={idx} style={styles.criteriaText}>• {c.label}</Text>
                ))}
              </View>
            )}

            {/* Medidor de Força */}
            {senha.length > 0 && (
              <View style={styles.strengthContainer}>
                <View style={styles.barsContainer}>
                  {[0, 1, 2].map((i) => (
                    <View
                      key={i}
                      style={[
                        styles.strengthBar,
                        { backgroundColor: getBarColor(i) }
                      ]}
                    />
                  ))}
                </View>
                <Text style={[styles.strengthLabel, { color: getStrengthTextColor() }]}>
                  {strengthLabels[strength]}
                </Text>
              </View>
            )}

            <CustomInput
              label="Digite novamente a Senha"
              placeholder="Confirme sua senha"
              value={confirmar}
              onChangeText={setConfirmar}
              secureTextEntry
              icon={<Feather name="lock" size={18} color="#A0AEC0" />}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 24 }]}>
        <CustomButton
          onPress={handleNext}
          icon={<Feather name="check" size={18} color="white" />}
          disabled={!isValid}
        >
          Finalizar Cadastro
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
  formContainer: {
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
    marginBottom: 24,
    lineHeight: 22,
  },
  criteriaContainer: {
    marginTop: -8,
    marginBottom: 16,
    backgroundColor: '#FFF5F5',
    padding: 12,
    borderRadius: 8,
  },
  criteriaTitle: {
    color: '#EF4444',
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 4,
  },
  criteriaText: {
    color: '#EF4444',
    fontSize: 13,
    marginLeft: 4,
  },
  strengthContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: -8,
  },
  barsContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  strengthBar: {
    flex: 1,
    height: 6,
    marginRight: 6,
    borderRadius: 3,
  },
  strengthLabel: {
    fontWeight: 'bold',
    fontSize: 13,
    marginLeft: 8,
    width: 50,
    textAlign: 'right',
  },
  footer: {
    paddingHorizontal: 24,
    paddingTop: 16,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
});