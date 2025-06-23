import { apiService } from './api';

export const userService = {
  async getAllUsers() {
    // Llama al endpoint real del backend para obtener todos los usuarios
    return apiService.get('/usuarios/all');
  },
};
