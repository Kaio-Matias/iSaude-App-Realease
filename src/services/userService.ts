import api from './api';
import { Alert } from 'react-native';

export interface UserDTO {
  nome: string;
  email: string;
  senha_hash: string;
  cpfcnpj: string;
  tipo_usuario: 'PACIENTE' | 'PROFISSIONAL' | 'CLINICA';
  telefone?: string;
  genero?: string;
  dt_nascimento?: string;
  // Profissional
  areaAtuacao?: string;
  registroProfissional?: string;
  // Clínica
  cnpj?: string;
  nomeFantasia?: string;
  tipoUnidade?: string;
  emailUnidade?: string;
  telefonesUnidade?: string[];
}

export const registerUser = async (userData: UserDTO) => {
  try {
    // Mapeamento para o Backend
    const backendPayload = {
      name: userData.nome,
      email: userData.email,
      password: userData.senha_hash,
      role: userData.tipo_usuario,
      cpf: userData.cpfcnpj,
      phone: userData.telefone,
      gender: userData.genero,
      birthDate: userData.dt_nascimento,
      // Campos extras (Backend precisa estar preparado para salvar em tabelas relacionadas)
      professionalArea: userData.areaAtuacao,
      professionalRegister: userData.registroProfissional,
      clinicCnpj: userData.cnpj,
      clinicFantasyName: userData.nomeFantasia,
      clinicType: userData.tipoUnidade,
      clinicEmail: userData.emailUnidade,
      clinicPhones: userData.telefonesUnidade
    };

    console.log("Enviando payload:", backendPayload);
    
    const response = await api.post('/user/create', backendPayload);
    
    console.log("Cadastro realizado:", response.data);
    return response.data;

  } catch (error: any) {
    console.error("Erro na requisição:", error);
    
    let errorMessage = "Ocorreu um erro inesperado.";

    if (error.response) {
      console.log("Erro Response:", error.response.status, error.response.data);
      errorMessage = error.response.data.error || error.response.data.message || "Erro nos dados enviados.";
    } else if (error.request) {
      errorMessage = "Não foi possível conectar ao servidor. Verifique se o Docker está rodando.";
    }

    Alert.alert("Falha no Cadastro", errorMessage);
    throw error;
  }
};