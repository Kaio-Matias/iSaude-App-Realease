import React, { useState } from "react";
import { 
  Image, 
  Text, 
  View, 
  ImageBackground, 
  StyleSheet, 
  TouchableOpacity,
  Dimensions
} from "react-native";
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';

// Componentes Customizados
import { CustomInput } from '@/components/ui/CustomInput';
import { CustomButton } from '@/components/ui/CustomButton';
import { CustomModal } from '@/components/ui/CustomModal';

const { width, height } = Dimensions.get('window');

export default function LoginScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();

    // Estados
    const [cpfCnpj, setCpfCnpj] = useState("");
    const [senha, setSenha] = useState("");
    const [modalVisible, setModalVisible] = useState(true);

    const handleNavigateToRegister = () => {
        setModalVisible(false);
        // ✅ Conexão feita: Navega para a tela inicial de registo (onde escolhe Paciente ou Profissional)
        router.push('/register'); 
    };

    const handleLogin = () => {
        // Lógica de login simulada
        console.log("Login efetuado");
        // ✅ Conexão feita: Redireciona para o Feed Principal (Home)
        router.replace('/(tabs)/home');
    };

    return (
        <ImageBackground 
            source={require("../assets/images/home-image.png")} 
            style={[styles.background, { paddingBottom: modalVisible ? 300 : 0 }]}
            resizeMode="cover"
        >
            <View style={[styles.container, { paddingTop: insets.top + 20 }]}>
                
                {/* Topo com Logo */}
                <View style={styles.logoContainer}>
                    <Image 
                        source={require("../assets/images/logo-text.png")} 
                        style={styles.logo} 
                        resizeMode="contain" 
                    />
                </View>

                {/* Botão 'Começar' - Só aparece se o modal estiver fechado */}
                {!modalVisible && (
                    <View style={[styles.startButtonContainer, { paddingBottom: insets.bottom + 24 }]}>
                         <CustomButton onPress={() => setModalVisible(true)}>
                            Começar
                        </CustomButton>
                    </View>
                )}

                {/* Modal de Login */}
                <CustomModal visible={modalVisible} onClose={() => setModalVisible(false)}>
                    <Text style={styles.modalTitle}>Que bom ter você de volta!</Text>
                    <Text style={styles.modalSubtitle}>
                        Utilize suas Informações de Login para entrar na comunidade iSaúde!
                    </Text>
                    
                    <CustomInput
                        label="CPF ou CNPJ"
                        placeholder="Digite seu CPF ou CNPJ aqui"
                        value={cpfCnpj}
                        onChangeText={setCpfCnpj}
                        icon={<Feather name="credit-card" size={18} color="#A0AEC0" />}
                        keyboardType="numeric"
                    />
                    
                    <CustomInput
                        label="Senha"
                        placeholder="Digite sua senha aqui"
                        value={senha}
                        onChangeText={setSenha}
                        secureTextEntry
                        icon={<Feather name="key" size={18} color="#A0AEC0" />}
                    />

                    <View style={styles.forgotPasswordContainer}>
                        <TouchableOpacity 
                            onPress={() => {
                                setModalVisible(false);
                                // router.push('/forgot-password'); // TODO: Criar tela de recuperação de senha se necessário
                                console.log("Esqueci senha");
                            }}
                            style={styles.linkButton}
                        >
                            <Text style={styles.linkText}>Esqueci minha Senha!</Text>
                            <Feather name="chevron-right" size={16} color="#222" />
                        </TouchableOpacity>
                    </View>

                    <CustomButton 
                        onPress={handleLogin} 
                        icon={<Feather name="arrow-right" size={20} color="white" />}
                    >
                        Continuar
                    </CustomButton>

                    <View style={styles.footerContainer}>
                        <Text style={styles.footerText}>Novo por aqui? </Text>
                        <TouchableOpacity onPress={handleNavigateToRegister}>
                            <Text style={styles.footerLink}>Crie uma conta!</Text>
                        </TouchableOpacity>
                    </View>
                </CustomModal>

            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: width,
        height: height,
    },
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 60, 
    },
    logo: {
        width: 240,
        height: 120,
    },
    startButtonContainer: {
        paddingHorizontal: 24,
        width: '100%',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#11181C',
        marginBottom: 8,
    },
    modalSubtitle: {
        fontSize: 16,
        color: '#718096',
        marginBottom: 24,
        lineHeight: 22,
    },
    forgotPasswordContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 32,
        marginTop: 8,
    },
    linkButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    linkText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#11181C',
        marginRight: 4,
    },
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 24,
        alignItems: 'center',
    },
    footerText: {
        fontSize: 16,
        color: '#4A5568',
    },
    footerLink: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'rgba(69, 118, 242, 1)', // Cor primária
    },
});