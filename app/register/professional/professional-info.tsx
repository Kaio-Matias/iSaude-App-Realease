import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform, 
  StyleSheet,
  Alert 
} from 'react-native';
import { useRouter } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Componentes
import { BackHeader } from '@/components/ui/BackHeader';
import { Stepper } from '@/components/ui/Stepper';
import { CustomInput } from '@/components/ui/CustomInput';
import { CustomButton } from '@/components/ui/CustomButton';
import { CustomSelect } from '@/components/ui/CustomSelect';
import { CustomLink } from '@/components/ui/CustomLink';

// Constantes de Dados
const AREAS = ['Médico', 'Enfermeiro', 'Psicólogo', 'Nutricionista', 'Outro'];

const ESTADOS = [
  'Acre', 'Alagoas', 'Amapá', 'Amazonas', 'Bahia', 'Ceará', 'Distrito Federal',
  'Espírito Santo', 'Goiás', 'Maranhão', 'Mato Grosso', 'Mato Grosso do Sul',
  'Minas Gerais', 'Pará', 'Paraíba', 'Paraná', 'Pernambuco', 'Piauí',
  'Rio de Janeiro', 'Rio Grande do Norte', 'Rio Grande do Sul', 'Rondônia',
  'Roraima', 'Santa Catarina', 'São Paulo', 'Sergipe', 'Tocantins'
];

const ESPECIALIDADES_MEDICAS = [
  'Alergologia', 'Anestesiologia', 'Angiologia', 'Cardiologia', 'Cirurgia Geral', 
  'Clínica Médica', 'Dermatologia', 'Endocrinologia', 'Gastroenterologia', 
  'Geriatria', 'Ginecologia e Obstetrícia', 'Neurologia', 'Oftalmologia', 
  'Ortopedia', 'Pediatria', 'Psiquiatria', 'Radiologia', 'Urologia', 'Outro'
];

const ESPECIALIDADES_PSI = [
  'Psicologia Clínica', 'Psicologia Organizacional', 'Psicopedagogia', 'Neuropsicologia', 'Outro'
];

const ESPECIALIDADES_ENF = [
  'Enfermagem Geral', 'Enfermagem Obstétrica', 'Enfermagem Pediátrica', 'Outro'
];

const ESPECIALIDADES_NUTRI = [
  'Nutrição Clínica', 'Nutrição Esportiva', 'Nutrição Funcional', 'Outro'
];

const REGISTRO_LABELS: Record<string, string> = {
  'Médico': 'Conselho Regional de Medicina (CRM)',
  'Enfermeiro': 'Conselho Regional de Enfermagem (COREN)',
  'Psicólogo': 'Conselho Regional de Psicologia (CRP)',
  'Nutricionista': 'Conselho Regional de Nutrição (CRN)',
  'Outro': 'Número de Registro Profissional',
};

export default function ProfessionalInformationForm() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [area, setArea] = useState('Médico');
  const [registro, setRegistro] = useState('');
  const [estado, setEstado] = useState('São Paulo');
  const [especialidade, setEspecialidade] = useState('');

  const isValid = registro.trim().length > 0 && especialidade.trim().length > 0;

  const getEspecialidades = (selectedArea: string) => {
    switch (selectedArea) {
      case 'Médico': return ESPECIALIDADES_MEDICAS;
      case 'Psicólogo': return ESPECIALIDADES_PSI;
      case 'Enfermeiro': return ESPECIALIDADES_ENF;
      case 'Nutricionista': return ESPECIALIDADES_NUTRI;
      default: return ['Outro'];
    }
  };

  const handleNext = () => {
    if (!isValid) return;
    // Segue para o Passo 4: Usuário
    router.push('/register/professional/user-info');
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <BackHeader title="Nova Conta" />
      <Stepper totalSteps={5} currentStep={3} />
      
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
            <Text style={styles.title}>Informações Profissionais</Text>
            <Text style={styles.subtitle}>
              Para oferecer seus serviços em nossa plataforma e assegurar a segurança e credibilidade na comunidade iSaúde, precisamos confirmar suas credenciais.
            </Text>
            
            <CustomSelect
              label="Qual sua área de atuação?"
              value={area}
              options={AREAS}
              onSelect={(val) => {
                setArea(val);
                setEspecialidade(''); // Limpa especialidade ao mudar área
              }}
            />

            <View style={styles.inputGroup}>
                <CustomInput
                    label={REGISTRO_LABELS[area] || REGISTRO_LABELS['Outro']}
                    value={registro}
                    onChangeText={setRegistro}
                    placeholder="Ex: 12345"
                    keyboardType="numeric"
                    icon={<Feather name="credit-card" size={20} color="#A0AEC0" />}
                />
                <CustomLink 
                    variant="primary" 
                    onPress={() => Alert.alert("Informação", "Este número será verificado junto ao conselho de classe.")}
                    style={styles.helpLink}
                >
                    Por que pedimos essa informação?
                </CustomLink>
            </View>

            <CustomSelect
              label="Estado de Atuação"
              value={estado}
              options={ESTADOS}
              onSelect={setEstado}
            />

            <CustomSelect
              label="Qual sua Especialidade?"
              value={especialidade}
              options={getEspecialidades(area)}
              onSelect={setEspecialidade}
            />
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
    backgroundColor: '#fff',
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
    color: '#6B7280',
    fontSize: 16,
    marginBottom: 24,
    lineHeight: 22,
  },
  inputGroup: {
    marginBottom: 8,
  },
  helpLink: {
    marginTop: -8,
    marginBottom: 16,
    alignSelf: 'flex-start',
  },
  footer: {
    paddingHorizontal: 24,
    paddingTop: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
});