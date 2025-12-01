import React from "react";
import { View, Text, Image, ScrollView, StyleSheet, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Componentes
import { BackHeader } from "@/components/ui/BackHeader";
import { SelectionButton } from "@/components/ui/SelectionButton";

const { height } = Dimensions.get('window');

export default function RegisterScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();

    const handleNavigateToPacient = () => {
        router.push('/register/pacient/personal-info');
        // console.log("Navegar para cadastro de paciente");
    };

    const handleNavigateToConnectType = () => {
        // Esta rota vamos criar no próximo passo
        router.push('/register/connect-type'); 
    };

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <BackHeader title="Nova Conta" />

            <ScrollView 
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Ilustração */}
                <View style={styles.imageContainer}>
                    <Image
                        source={require("../../assets/images/register-image.png")}
                        style={styles.image}
                        resizeMode="contain"
                    />
                </View>

                {/* Conteúdo de Texto e Botões */}
                <View style={styles.contentContainer}>
                    <Text style={styles.title}>Vamos iniciar sua Jornada.</Text>
                    
                    <Text style={styles.description}>
                        No iSaúde, conectamos profissionais de saúde, clínicas, farmácias e pacientes em uma rede de cuidado e bem-estar.
                    </Text>
                    
                    <Text style={[styles.description, styles.marginBottom]}>
                        Escolha abaixo como você deseja começar sua jornada com a gente:
                    </Text>

                    <SelectionButton 
                        title="Quero cuidar da minha Saúde"
                        variant="primary"
                        onPress={handleNavigateToPacient}
                    />

                    <SelectionButton 
                        title="Quero oferecer meus Serviços"
                        variant="secondary"
                        onPress={handleNavigateToConnectType}
                        style={{ marginBottom: insets.bottom + 20 }}
                    />
                </View>
            </ScrollView>
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
    imageContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        height: height * 0.35, // Ocupa cerca de 35% da tela
    },
    image: {
        width: "90%",
        height: "100%",
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1A202C',
        marginBottom: 12,
    },
    description: {
        fontSize: 16,
        color: '#718096',
        marginBottom: 12,
        lineHeight: 24,
    },
    marginBottom: {
        marginBottom: 32,
    }
});