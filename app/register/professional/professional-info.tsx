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
import { CustomSelect } from "@/components/ui/CustomSelect";

// Lógica
import { UserData } from "@/components/UserData";

const AREAS_ATUACAO = [
  "Médico(a)",
  "Enfermeiro(a)",
  "Fisioterapeuta",
  "Psicólogo(a)",
  "Nutricionista",
  "Dentista",
  "Outro"
];

export default function ProfessionalInfoForm() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [area, setArea] = useState(UserData.areaAtuacao || "Médico(a)");
  const [registro, setRegistro] = useState(UserData.registroProfissional || "");

  const isValid = area && registro.length >= 4;

  const handleNext = () => {
    if (!isValid) return;
    
    // --- SALVAR DADOS ---
    UserData.areaAtuacao = area;
    UserData.registroProfissional = registro;
    // --------------------

    router.push("/register/professional/user-info");
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <BackHeader title="Profissional" />
      <Stepper totalSteps={5} currentStep={3} />
      
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
            <Text style={styles.title}>Dados Profissionais</Text>
            <Text style={styles.subtitle}>
              Informe sua área de atuação e seu registro profissional para validação.
            </Text>
            
            <CustomSelect
              label="Área de Atuação"
              value={area}
              options={AREAS_ATUACAO}
              onSelect={setArea}
            />
            
            <CustomInput
              label="Nº Registro Profissional (CRM, COREN, etc)"
              placeholder="Ex: 123456-SP"
              value={registro}
              onChangeText={setRegistro}
              icon={<Feather name="briefcase" size={18} color="#A0AEC0" />}
            />

          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 24 }]}>
        <CustomButton
          onPress={handleNext}
          icon={<Feather name="arrow-right" size={18} color="white" />}
          disabled={!isValid}
        >
          Próximo
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
  footer: {
    paddingHorizontal: 24,
    paddingTop: 16,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
});