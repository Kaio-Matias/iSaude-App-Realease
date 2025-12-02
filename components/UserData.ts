export const MOCK_USERS = [
  // ... (pode manter o mock ou remover)
];

// Objeto Global para armazenar dados do cadastro
export const UserData = {
  // Dados do Usuário/Representante
  nome: '',
  cpf: '',
  email: '',
  telefone: '',
  genero: '',
  dataNascimento: '',
  username: '',
  senha: '',

  // Dados Específicos de Profissional
  areaAtuacao: '',
  registroProfissional: '',

  // Dados Específicos de Clínica
  cnpj: '',
  nomeFantasia: '',
  tipoUnidade: '',
  emailUnidade: '',
  telefonesUnidade: [] as string[],

  // Função para limpar tudo
  clear() {
    this.nome = '';
    this.cpf = '';
    this.email = '';
    this.telefone = '';
    this.genero = '';
    this.dataNascimento = '';
    this.username = '';
    this.senha = '';
    this.areaAtuacao = '';
    this.registroProfissional = '';
    this.cnpj = '';
    this.nomeFantasia = '';
    this.tipoUnidade = '';
    this.emailUnidade = '';
    this.telefonesUnidade = [];
  }
};