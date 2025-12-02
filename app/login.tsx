import React, { useState } from "react";
import { 
  Image, 
  Text, 
  View, 
  ImageBackground, 
  StyleSheet, 
  TouchableOpacity,
  Dimensions,
  Alert,
  ActivityIndicator
} from "react-native";
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Componentes Customizados
import { CustomInput } from '@/components/ui/CustomInput';
import { CustomButton } from '@/components/ui/CustomButton';
import { CustomModal } from '@/components/ui/CustomModal';

// Integração API
import api from '@/src/services/api';

const { width, height } = Dimensions.get('window');

export default function LoginScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();

    // Estados
    const [cpfCnpj, setCpfCnpj] = useState("");
    const [senha, setSenha] = useState("");
    const [modalVisible, setModalVisible] = useState(true);
    const [loading, setLoading] = useState(false);

    const handleNavigateToRegister = () => {
        setModalVisible(false);
        // Navega para a tela inicial de registo
        router.push('/register'); 
    };

    const handleLogin = async () => {
        // Validação básica
        if (!cpfCnpj || !senha) {
            Alert.alert("Atenção", "Por favor, preencha todos os campos.");
            return;
        }

        setLoading(true);

        try {
            // Monta o objeto de login
            // O backend espera 'email' e 'password'. 
            // Enviamos o cpfCnpj no campo 'email' pois o backend costuma usar esse campo como identificador principal.
            const payload = {
                email: cpfCnpj, 
                password: senha
            };

            // Chamada à API (Rota correta: /user/login)
            const response = await api.post('/user/login', payload);

            console.log("Login efetuado com sucesso:", response.data);

            // Salvar o token retornado para manter a sessão
            if (response.data.token) {
                await AsyncStorage.setItem('userToken', response.data.token);
                // Se quiser salvar mais dados do utilizador (nome, id, role), pode fazer aqui:
                // await AsyncStorage.setItem('userData', JSON.stringify(response.data.user));
            }

            setModalVisible(false);
            // Redireciona para a Home
            router.replace('/(tabs)/home');

        } catch (error: any) {
            console.error("Erro no login:", error);
            
            let message = "Não foi possível entrar. Verifique suas credenciais.";

            if (error.response) {
                // Erro vindo do servidor (ex: Senha incorreta, Usuário não encontrado)
                message = error.response.data.message || error.response.data.error || message;
            } else if (error.request) {
                // Erro de conexão (sem internet ou servidor fora do ar)
                message = "Sem conexão com o servidor. Verifique sua internet.";
            }

            Alert.alert("Erro de Login", message);
        } finally {
            setLoading(false);
        }
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
                        label="Email, CPF ou CNPJ"
                        placeholder="Digite seu login aqui"
                        value={cpfCnpj}
                        onChangeText={setCpfCnpj}
                        icon={<Feather name="user" size={18} color="#A0AEC0" />}
                        autoCapitalize="none"
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
                                // router.push('/forgot-password'); // Implementar tela de recuperação se necessário
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
                        disabled={loading}
                        icon={!loading ? <Feather name="arrow-right" size={20} color="white" /> : undefined}
                    >
                        {loading ? <ActivityIndicator color="#FFF" /> : "Continuar"}
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