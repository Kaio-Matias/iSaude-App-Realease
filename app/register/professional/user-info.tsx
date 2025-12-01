import React, { useState } from "react";
import { 
  View, 
  Text, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform, 
  StyleSheet, 
  TouchableOpacity 
} from "react-native";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Componentes
import { BackHeader } from "@/components/ui/BackHeader";
import { Stepper } from "@/components/ui/Stepper";
import { CustomButton } from "@/components/ui/CustomButton";
import { CustomInput } from "@/components/ui/CustomInput";

const SUGESTOES = [
  "dr.silva",
  "drsilva.med",
  "med.silva88",
  "doutor.silva"
];

export default function UserInformationFormProfessional() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [username, setUsername] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const isValid = username.trim().length > 0;

  const handleNext = () => {
    if (!isValid) return;
    // Segue para a criação de senha
    router.push("/register/professional/password-info");
  };

  const AtIcon = () => (
    <Text style={[styles.atIcon, isFocused ? styles.atIconActive : styles.atIconInactive]}>
      @
    </Text>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <BackHeader title="Nova Conta" />
      <Stepper totalSteps={5} currentStep={4} />
      
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
            <Text style={styles.title}>Escolha um nome de usuário</Text>
            <Text style={styles.subtitle}>
              Esse nome será usado para identificar você na plataforma e facilitar que pacientes o encontrem.
            </Text>
            
            <CustomInput
              label="Nome de Usuário"
              placeholder="Ex: dr.carlos"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              autoCorrect={false}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              icon={<AtIcon />}
            />

            <View style={styles.suggestionsContainer}>
              <Text style={styles.suggestionsLabel}>Sugestões disponíveis</Text>
              <View style={styles.suggestionsList}>
                {SUGESTOES.map((sugestao) => (
                  <TouchableOpacity 
                    key={sugestao} 
                    onPress={() => setUsername(sugestao)} 
                    style={styles.suggestionItem}
                    activeOpacity={0.6}
                  >
                    <Text style={styles.suggestionText}>@{sugestao}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

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
  atIcon: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: 4,
  },
  atIconActive: {
    color: '#01AEA4', 
  },
  atIconInactive: {
    color: '#A0AEC0',
  },
  suggestionsContainer: {
    marginTop: 8,
  },
  suggestionsLabel: {
    fontSize: 12,
    color: '#1A202C',
    marginBottom: 8,
    fontWeight: '500',
  },
  suggestionsList: {
    paddingLeft: 8,
  },
  suggestionItem: {
    paddingVertical: 6,
  },
  suggestionText: {
    fontSize: 14,
    color: '#718096',
  },
  footer: {
    paddingHorizontal: 24,
    paddingTop: 16,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
});