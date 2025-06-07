import axios from 'axios';

// Esta URL debe ser actualizada cuando el backend esté disponible
const API_BASE_URL = 'http://localhost:5000/api';

// Configura axios con valores predeterminados
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para manejar errores de manera global
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Loguear error o mostrar notificación
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Funciones genéricas para peticiones HTTP
export const apiService = {
  async get(endpoint) {
    const response = await api.get(endpoint);
    return response.data;
  },

  async post(endpoint, data) {
    const response = await api.post(endpoint, data);
    return response.data;
  },

  async put(endpoint, data) {
    const response = await api.put(endpoint, data);
    return response.data;
  },

  async delete(endpoint) {
    const response = await api.delete(endpoint);
    return response.data;
  },
};

export default api;