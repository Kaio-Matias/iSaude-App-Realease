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

import { BackHeader } from "@/components/ui/BackHeader";
import { Stepper } from "@/components/ui/Stepper";
import { CustomButton } from "@/components/ui/CustomButton";
import { CustomSelect } from "@/components/ui/CustomSelect";
import { CustomDateInput } from "@/components/ui/CustomDateInput";

// Lógica
import { UserData } from "@/components/UserData";

const GENDER_OPTIONS = ["Masculino", "Feminino", "Outro", "Prefiro não dizer"];

export default function BasicInformationFormProfessional() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [selectedOption, setSelectedOption] = useState(UserData.genero || "Masculino");
  const [birthDate, setBirthDate] = useState(UserData.dataNascimento || "");

  const isValid = selectedOption && birthDate.length === 10;

  const handleNext = () => {
    if (!isValid) return;

    // --- INTEGRAÇÃO ---
    UserData.genero = selectedOption;
    UserData.dataNascimento = birthDate;
    // ------------------

    // Rota DIFERENTE: vai para informações profissionais
    router.push("/register/professional/professional-info");
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <BackHeader title="Nova Conta" />
      <Stepper totalSteps={5} currentStep={2} />
      
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
            <Text style={styles.title}>Queremos te conhecer melhor.</Text>
            <Text style={styles.subtitle}>
              Agora vamos definir algumas informações básicas sobre você, para criar uma experiência única em nossa plataforma.
            </Text>
            
            <CustomSelect
              label="Qual opção melhor representa você?"
              value={selectedOption}
              options={GENDER_OPTIONS}
              onSelect={setSelectedOption}
            />
            
            <CustomDateInput
              label="Data de Nascimento"
              value={birthDate}
              onChangeText={setBirthDate}
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