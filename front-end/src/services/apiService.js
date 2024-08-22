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
    console.error('Erro na resposta da API:', error);
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
export const login = (credentials) => apiClient.post('/auth/login', credentials);
export const logout = () => {
  localStorage.removeItem('authToken');
};

// Outros endpoints (exemplo: Municípios)
export const getMunicipios = (params) => apiClient.get('/municipio', { params });
export const getMunicipioById = (id) => apiClient.get(`/municipio/${id}`);
export const createMunicipio = (data) => apiClient.post('/municipio', data);
export const updateMunicipio = (id, data) => apiClient.put(`/municipio/${id}`, data);
export const deleteMunicipio = (id) => apiClient.delete(`/municipio/${id}`);

export default apiClient;