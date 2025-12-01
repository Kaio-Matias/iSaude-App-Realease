import React from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CustomButton } from "@/components/ui/CustomButton";

const { width } = Dimensions.get('window');

export default function ConfirmedRegisterClinic() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleFinish = () => {
    router.replace("/(tabs)/home"); 
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom + 24 }]}>
      <View style={styles.content}>
        <View style={styles.imageContainer}>
            <Image
                source={require("../../../assets/images/Confirm-Register-Clinic.png")}
                style={styles.image}
                resizeMode="contain"
            />
        </View>
        <Text style={styles.title}>Cadastro realizado com sucesso!</Text>
        <Text style={styles.subtitle}>
          Agora sua Unidade faz parte do iSaúde. Vincule profissionais e gerencie seus serviços de forma simples.
        </Text>
      </View>
      <View style={styles.footer}>
        <CustomButton onPress={handleFinish} icon={<Feather name="home" size={18} color="white" />}>
          Começar a Navegar
        </CustomButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", justifyContent: 'space-between' },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 32 },
  imageContainer: { marginBottom: 40, width: width * 0.8, height: width * 0.8, alignItems: 'center', justifyContent: 'center' },
  image: { width: '100%', height: '100%' },
  title: { fontSize: 26, fontWeight: 'bold', color: '#1A202C', textAlign: 'center', marginBottom: 16 },
  subtitle: { fontSize: 16, color: '#718096', textAlign: 'center', lineHeight: 24 },
  footer: { paddingHorizontal: 24, width: '100%' },
});