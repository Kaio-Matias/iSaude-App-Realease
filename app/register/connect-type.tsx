import React from "react";
import { View, Text, Image, ScrollView, StyleSheet, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Componentes
import { BackHeader } from "@/components/ui/BackHeader";
import { SelectionButton } from "@/components/ui/SelectionButton";

const { height } = Dimensions.get('window');

export default function ConnectTypeScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();

    const handleNavigateToProfessional = () => {
        // Rota futura para cadastro de profissional
        router.push('/register/professional/personal-info');
        // console.log("Navegar para cadastro de Profissional");
    };

    const handleNavigateToClinic = () => {
        // Rota futura para cadastro de clínica
        router.push('/register/clinic/personal-info');
        // console.log("Navegar para cadastro de Clínica");
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
                        source={require("../../assets/images/register-image-part2.png")}
                        style={styles.image}
                        resizeMode="contain"
                    />
                </View>

                {/* Conteúdo */}
                <View style={styles.contentContainer}>
                    <Text style={styles.title}>Como você quer se conectar?</Text>
                    
                    <Text style={styles.description}>
                        Escolha se deseja oferecer seus serviços como <Text style={styles.boldText}>profissional de saúde</Text> ou cadastrar sua <Text style={styles.boldText}>unidade de atendimento</Text> (Clínicas, Laboratórios, Consultórios e outros).
                    </Text>

                    {/* Botão Profissional (Cor Teal/Verde Água - Primary) */}
                    <SelectionButton 
                        title="Continuar como Profissional de Saúde"
                        variant="primary" 
                        onPress={handleNavigateToProfessional}
                    />

                    {/* Botão Clínica (Cor Roxa - Secondary) */}
                    <SelectionButton 
                        title="Continuar como Unidade de Atendimento"
                        variant="secondary"
                        onPress={handleNavigateToClinic}
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
        height: height * 0.35, // Mantém a proporção visual da tela anterior
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
        fontSize: 22, // Ligeiramente menor que a tela inicial para caber melhor
        fontWeight: 'bold',
        color: '#1A202C',
        marginBottom: 12,
    },
    description: {
        fontSize: 16,
        color: '#718096',
        marginBottom: 32,
        lineHeight: 24,
    },
    boldText: {
        fontWeight: 'bold',
        color: '#4A5568',
    },
});