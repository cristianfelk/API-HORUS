import axios from 'axios';
import { param } from 'jquery';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/';
    }
    console.error('Erro na resposta da API:', error.response || error.message);
    return Promise.reject(error);
  }
);

// Usuários
export const getUsers = (params) => apiClient.get('/usuario', { params });
export const getUserById = (id) => apiClient.get(`/usuario/${id}`);
export const createUser = (data) => apiClient.post('/usuario', data);
export const updateUser = (id, data) => apiClient.patch(`/usuario/${id}`, data);
export const deleteUser = (id) => apiClient.delete(`/usuario/${id}`);

// Autenticação
export const login = (credentials) => apiClient.post('/login', credentials);
export const logout = () => {
  localStorage.removeItem('authToken');
  window.location.href = '/';
};

// Recuperação de Senha
export const requestPasswordReset = (email) => apiClient.post('/recover-password', { email });
export const verifyResetCode = (token) => apiClient.post('/verify-reset-code', { token });
export const resetPassword = (userId, token, newPassword) => apiClient.post('/reset-password', { userId, token, newPassword });

// Municípios
export const getMunicipios = (params) => apiClient.get('/municipio', { params });
export const getMunicipioById = (id) => apiClient.get(`/municipio/${id}`);
export const createMunicipio = (data) => apiClient.post('/municipio', data);
export const updateMunicipio = (id, data) => apiClient.put(`/municipio/${id}`, data);
export const deleteMunicipio = (id) => apiClient.delete(`/municipio/${id}`);
export const searchMunicipioByNome = (municipio) => {
  return apiClient.get(`/municipio/search/${encodeURIComponent(municipio)}`);
};

// Logradouros
export const getLogradouros = (params) => apiClient.get('/logradouro', { params });
export const getLogradouroById = (id) => apiClient.get(`/logradouro/${id}`);
export const createLogradouro = (data) => apiClient.post('/logradouro', data);
export const updateLogradouro = (id, data) => apiClient.put(`/logradouro/${id}`, data);
export const deleteLogradouro = (id) => apiClient.delete(`/logradouro/${id}`);
export const searchLogradourosByNome = (logradouro) => {
  return apiClient.get(`/logradouro/search/${encodeURIComponent(logradouro)}`);
};
export const searchByComplementos = (complemento) => {
  return apiClient.get(`/logradouro/searchComplemento/${encodeURIComponent(complemento)}`);
};

//Fiscalizacao
export const CreateFiscalizacao = (data) => apiClient.post('/fiscalizacao', data);
export const getFiscalizacao = (params) => apiClient.get('/fiscalizacao', { params });
export const deleteFiscalizacao = (id) => apiClient.delete(`/fiscalizacao/${id}`);
export const getUltimasFiscalizacoes = (limit) => apiClient.get(`/fiscalizacao/ultimas`, { params: { limit } });
export const getFiscalizacaoRel = (params) => apiClient.get('/fiscalizacao/relatorio', { params });


// Logs
export const getLog = () => apiClient.get('/log');

//Monitoramento
export const getMonitoramento = () => apiClient.get('/monitoramento');
export const updateMonitoramento = (data) => apiClient.post('/monitoramento', data);

//Denuncia
export const createDenuncia = (data) => apiClient.post('/denuncia', data, { headers: { 'Content-Type': 'multipart/form-data' } });
export const updateDenuncia = (id, data) => apiClient.patch(`/denuncia/${id}`, data);
export const getDenuncia = (params) => apiClient.get('/denuncia', { params });

//Focos
export const getFocosDengue = (params) => apiClient.get('/foco', { params });
export const updateFoco = (data) => apiClient.patch('/foco', data);
export const adicionarFocoDengue = (data) => apiClient.post('/foco', data);

export default apiClient;