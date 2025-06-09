import { apiService } from './api';
import { rooms, availabilityMock } from '../mocks/data';

// En un entorno real, estas funciones llamarían a la API
// Por ahora, usamos datos mock para desarrollo

export const reservationService = {
  // Crear una reserva REAL en el backend
  async createReservation(reservation) {
    try {
      const response = await fetch('http://127.0.0.1:8000/reservas/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reservation)
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.detail || 'Error al crear la reserva');
      }
      return response.json();
    } catch (error) {
      console.error('Error al crear la reserva:', error);
      throw error;
    }
  },
  async getRoom(id) {
    // Buscar en el mock
    return rooms.find(r => r.id === id);
  },
  async updateRoom(id, data) {
    // Simulación: actualiza el objeto en el mock (solo para frontend dev)
    const idx = rooms.findIndex(r => r.id === id);
    if (idx !== -1) {
      rooms[idx] = { ...rooms[idx], ...data };
      return rooms[idx];
    }
    throw new Error('Alojamiento no encontrado');
  }
};