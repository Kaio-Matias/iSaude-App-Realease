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

// Componentes
import { CustomButton } from "@/components/ui/CustomButton";

const { width } = Dimensions.get('window');

export default function ConfirmedRegisterPacient() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleFinish = () => {
    // Aqui finalizamos o fluxo. 
    // Geralmente redireciona para a Home (Logado) ou para o Login.
    // Vamos assumir que faz o login automático e vai para o Feed.
    router.replace("/(tabs)/home"); 
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom + 24 }]}>
      
      <View style={styles.content}>
        {/* Imagem de Sucesso */}
        <View style={styles.imageContainer}>
            {/* Certifique-se de que a imagem existe neste caminho */}
            <Image
                 source={require("../../../assets/images/Confirm-Register-Pacient.png")}
                style={styles.image}
                resizeMode="contain"
            />
        </View>

        <Text style={styles.title}>Cadastro realizado com sucesso!</Text>
        <Text style={styles.subtitle}>
          Agora você faz parte da rede iSaúde. Cuide do seu bem-estar e conecte-se com os melhores profissionais.
        </Text>
      </View>

      <View style={styles.footer}>
        <CustomButton
          onPress={handleFinish}
          icon={<Feather name="home" size={18} color="white" />}
        >
          Ir para o Início
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