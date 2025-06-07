import { apiService } from './api';
import { rooms, availabilityMock } from '../mocks/data';

// En un entorno real, estas funciones llamarían a la API
// Por ahora, usamos datos mock para desarrollo

export const reservationService = {
  // Obtener todas las habitaciones
  async getRooms() {
    try {
      // Simulamos una llamada a la API
      // En producción sería: return apiService.get('/rooms').then(res => res.data);
      return new Promise((resolve) => {
        setTimeout(() => resolve(rooms || []), 500);
      });
    } catch (error) {
      console.error('Error al obtener habitaciones:', error);
      return [];
    }
  },

  // Obtener una habitación específica
  async getRoom(id) {
    try {
      // En producción: return apiService.get(`/rooms/${id}`).then(res => res.data);
      return new Promise((resolve) => {
        setTimeout(() => {
          const room = rooms.find(r => r.id === id);
          resolve(room || null);
        }, 300);
      });
    } catch (error) {
      console.error(`Error al obtener la habitación ${id}:`, error);
      return null;
    }
  },

  // Verificar disponibilidad
  async checkAvailability(checkIn, checkOut, roomId) {
    try {
      // En producción: 
      // return apiService.post('/availability', { checkIn, checkOut, roomId }).then(res => res.data);
      
      return new Promise((resolve) => {
        setTimeout(() => {
          // Lógica simple para verificar si hay solapamiento con fechas ocupadas
          const isAvailable = !availabilityMock.busy.some(period => 
            (checkIn >= period.start && checkIn <= period.end) || 
            (checkOut >= period.start && checkOut <= period.end) ||
            (checkIn <= period.start && checkOut >= period.end)
          );
          resolve(isAvailable);
        }, 500);
      });
    } catch (error) {
      console.error('Error al verificar disponibilidad:', error);
      return false;
    }
  },

  // Crear una reserva
  async createReservation(reservation) {
    try {
      // En producción: return apiService.post('/reservations', reservation);
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            data: { ...reservation, id: Math.floor(Math.random() * 1000), status: 'pending', createdAt: new Date() },
            status: 200,
            message: 'Reserva creada exitosamente'
          });
        }, 800);
      });
    } catch (error) {
      console.error('Error al crear la reserva:', error);
      return null;
    }
  },

  // Obtener reservas del usuario (requeriría autenticación en un entorno real)
  async getUserReservations() {
    try {
      // En producción: return apiService.get('/user/reservations').then(res => res.data);
      return new Promise((resolve) => {
        resolve([]);  // Sin datos mock por ahora
      });
    } catch (error) {
      console.error('Error al obtener reservas del usuario:', error);
      return [];
    }
  }
};