import React from "react";
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet 
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from "@expo/vector-icons";

// Componentes
import { BackHeader } from "@/components/ui/BackHeader";
import { CustomButton } from "@/components/ui/CustomButton";

export default function PrivacyPolicyScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <BackHeader title="Política de Privacidade" />
      
      <View style={styles.content}>
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={[
            styles.scrollContent, 
            { paddingBottom: insets.bottom + 100 } // Espaço extra para o botão
          ]} 
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.text}>
            Para proteger cada etapa da sua jornada, solicitamos seu CPF por 3 motivos muito importantes:
            {"\n\n"}
            1. Validar sua identidade com segurança durante consultas e procedimentos médicos.
            {"\n\n"}
            2. Garantir transparência na emissão de notas fiscais para exames, medicamentos e serviços.
            {"\n\n"}
            3. Assegurar a integridade das transações e dos seus dados pessoais.
            {"\n\n"}
            Assim, mantemos um ambiente confiável e transparente para você e toda nossa comunidade.
            {"\n\n"}
            Fique tranquilo(a)! Seus dados são protegidos com os mais altos padrões de segurança, e usaremos essas informações apenas para seu benefício.
            {"\n\n"}
            Para proteger cada etapa da sua jornada, solicitamos seu CPF por 3 motivos muito importantes:
            {"\n\n"}
            1. Validar sua identidade com segurança durante consultas e procedimentos médicos.
            {"\n\n"}
            2. Garantir transparência na emissão de notas fiscais para exames, medicamentos e serviços.
            {"\n\n"}
            3. Assegurar a integridade das transações e dos seus dados pessoais.
            {"\n\n"}
            Assim, mantemos um ambiente confiável e transparente para você e toda nossa comunidade.
            {"\n\n"}
            Fique tranquilo(a)! Seus dados são protegidos com os mais altos padrões de segurança, e usaremos essas informações apenas para seu benefício.
          </Text>
        </ScrollView>

        <View style={[styles.footer, { paddingBottom: insets.bottom + 24 }]}>
          <CustomButton 
            onPress={() => router.back()} 
            icon={<Feather name="check" size={20} color="white" />}
          >
            Entendi!!
          </CustomButton>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    position: 'relative',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 16,
  },
  text: {
    fontSize: 16,
    color: '#4A5568', // text-gray-700
    lineHeight: 24,
    marginBottom: 16,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    paddingTop: 16,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: '#f7fafc',
  },
});