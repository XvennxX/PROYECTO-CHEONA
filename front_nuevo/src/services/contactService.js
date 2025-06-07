import { apiService } from './api';

export const contactService = {
  async sendContactForm(formData) {
    try {
      // En producción: return apiService.post('/contact', formData);
      
      // Simulamos una llamada a la API
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            data: null,
            status: 200,
            message: 'Mensaje enviado correctamente. Nos pondremos en contacto contigo pronto.'
          });
        }, 800);
      });
    } catch (error) {
      console.error('Error al enviar formulario de contacto:', error);
      return null;
    }
  }
};