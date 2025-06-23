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
    // Actualiza un alojamiento en el backend
    const response = await fetch(`http://localhost:8000/alojamientos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('No se pudo actualizar el alojamiento');
    return response.json();
  },
  async getReservedDates(idAlojamiento) {
    // Llama a la API real para obtener los rangos reservados
    const response = await fetch(`http://localhost:8000/alojamientos/${idAlojamiento}/fechas-reservadas`);
    if (!response.ok) throw new Error('No se pudieron obtener las fechas reservadas');
    return response.json();
  },
  async getUserReservations(idCliente) {
    // Llama a la API real para obtener las reservas del usuario
    const response = await fetch(`http://localhost:8000/reservas/usuario/${idCliente}`);
    if (!response.ok) throw new Error('No se pudieron obtener las reservas del usuario');
    return response.json();
  },
  async getAllReservations() {
    // Llama a la API real para obtener todas las reservas
    const response = await fetch('http://localhost:8000/reservas/');
    if (!response.ok) throw new Error('No se pudieron obtener las reservas');
    return response.json();
  },
  async getAllReservationsWithClient() {
    // Llama al endpoint especial para admin con datos de cliente
    const response = await fetch('http://localhost:8000/reservas/admin/full');
    if (!response.ok) throw new Error('No se pudieron obtener las reservas completas');
    return response.json();
  },
  async updateReservation(id, data) {
    // Actualiza una reserva en el backend
    const response = await fetch(`http://localhost:8000/reservas/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('No se pudo actualizar la reserva');
    return response.json();
  },
  async cancelReservation(id) {
    // Cancela una reserva en el backend
    const response = await fetch(`http://localhost:8000/reservas/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('No se pudo cancelar la reserva');
    return response.json();
  },
  async confirmPayment(id) {
    // Confirma el pago de una reserva en el backend
    const response = await fetch(`http://localhost:8000/reservas/${id}/confirmar-pago`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    });
    if (!response.ok) throw new Error('No se pudo confirmar el pago');
    return response.json();
  },
  async getRooms() {
    // Llama a la API real para obtener todos los alojamientos
    const response = await fetch('http://localhost:8000/alojamientos/');
    if (!response.ok) throw new Error('No se pudieron obtener los alojamientos');
    return response.json();
  },
  async createAlojamiento(alojamiento) {
    // Llama a la API real para crear un alojamiento
    const response = await fetch('http://localhost:8000/alojamientos/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(alojamiento)
    });
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.detail || 'Error al crear el alojamiento');
    }
    return response.json();
  },
  async deleteAlojamiento(id) {
    // Elimina un alojamiento en el backend
    const response = await fetch(`http://localhost:8000/alojamientos/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('No se pudo eliminar el alojamiento');
    return response.json();
  },
};