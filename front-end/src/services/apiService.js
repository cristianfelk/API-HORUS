import axios from 'axios';

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
      // Redirecionar para a tela de login se o token expirar ou não for válido
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
export const updateUser = (id, data) => apiClient.put(`/usuario/${id}`, data);
export const deleteUser = (id) => apiClient.delete(`/usuario/${id}`);

// Autenticação
export const login = (credentials) => apiClient.post('/login', credentials);
export const logout = () => {
  localStorage.removeItem('authToken');
  // Limpar outras informações de sessão aqui, se necessário
  window.location.href = '/';
};

// Recuperação de Senha
export const requestPasswordReset = (email) => apiClient.post('/recover-password', { email });
export const verifyResetCode = (userId, token) => apiClient.post('/verify-reset-code', { userId, token });
export const resetPassword = (userId, token, newPassword) =>
  apiClient.post('/reset-password', { userId, token, newPassword });

// Municípios
export const getMunicipios = (params) => apiClient.get('/municipio', { params });
export const getMunicipioById = (id) => apiClient.get(`/municipio/${id}`);
export const createMunicipio = (data) => apiClient.post('/municipio', data);
export const updateMunicipio = (id, data) => apiClient.put(`/municipio/${id}`, data);
export const deleteMunicipio = (id) => apiClient.delete(`/municipio/${id}`);

export default apiClient;