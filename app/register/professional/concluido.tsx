import React from "react";
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  Dimensions 
} from "react-native";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CustomButton } from "@/components/ui/CustomButton";

const { width } = Dimensions.get('window');

export default function ConfirmedRegisterProfessional() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleFinish = () => {
    // Redireciona para Login
    router.replace("/login"); 
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom + 24 }]}>
      
      <View style={styles.content}>
        <View style={styles.imageContainer}>
            {/* Imagem específica do Profissional */}
            <Image
                 source={require("@/assets/images/Confirm-Register-Professional.png")}
                style={styles.image}
                resizeMode="contain"
            />
        </View>

        <Text style={styles.title}>Conta Criada!</Text>
        <Text style={styles.subtitle}>
          Seu cadastro como Profissional foi realizado. Agora você pode acessar a plataforma e configurar sua agenda.
        </Text>
      </View>

      <View style={styles.footer}>
        <CustomButton
          onPress={handleFinish}
          icon={<Feather name="log-in" size={18} color="white" />}
        >
          Fazer Login
        </CustomButton>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  imageContainer: {
    marginBottom: 40,
    width: width * 0.8,
    height: width * 0.8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A202C',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#718096',
    textAlign: 'center',
    lineHeight: 24,
  },
  footer: {
    paddingHorizontal: 24,
    width: '100%',
  },
});