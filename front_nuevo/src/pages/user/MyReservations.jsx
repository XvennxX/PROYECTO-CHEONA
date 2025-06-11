import React, { useState, useEffect } from 'react';
import Button from '../../components/ui/Button';
import { Calendar, Search, Filter } from 'lucide-react';
import { useAuth } from '../../components/auth/AuthContext';
import { reservationService } from '../../services/reservationService';
import DatePicker, { registerLocale } from 'react-datepicker';
import { es } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';

registerLocale('es', es);

const MyReservations = () => {
  const { user } = useAuth();
  const [filter, setFilter] = useState('all');
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editModal, setEditModal] = useState({ open: false, reservation: null, saving: false, error: null });
  const [reservedRanges, setReservedRanges] = useState([]);
  const [editDateRange, setEditDateRange] = useState([null, null]);
  const [showCancelled, setShowCancelled] = useState(false);
  const [detailsModal, setDetailsModal] = useState({ open: false, reservation: null });

  useEffect(() => {
    const fetchReservations = async () => {
      if (!user?.id_cliente) return;
      setLoading(true);
      setError(null);
      try {
        const data = await reservationService.getUserReservations(user.id_cliente);
        setReservations(data);
      } catch (err) {
        setError('No se pudieron cargar tus reservas.');
      } finally {
        setLoading(false);
      }
    };
    fetchReservations();
  }, [user]);

  const statusStyles = {
    confirmed: "bg-green-100 text-green-800",
    pending: "bg-yellow-100 text-yellow-800",
    completed: "bg-blue-100 text-blue-800"
  };

  const statusText = {
    confirmed: "Confirmada",
    pending: "Pendiente",
    completed: "Completada"
  };

  // Filtrado simple (puedes mejorar según los datos reales)
  const now = new Date();
  const filteredReservations = reservations.filter(res => {
    if (showCancelled) return res.estado === 'cancelada';
    if (filter === 'all') return res.estado !== 'cancelada';
    const endDate = new Date(res.fecha_fin);
    if (filter === 'active') return endDate >= now && res.estado !== 'cancelada';
    if (filter === 'past') return endDate < now && res.estado !== 'cancelada';
    return true;
  });

  // Manejo de edición
  const openEditModal = async (reservation) => {
    // Cargar fechas ocupadas del alojamiento
    let idAlojamiento = reservation.id_alojamiento || reservation.idAlojamiento;
    if (!idAlojamiento && reservation.id_alojamiento !== 0) {
      // Si no está el campo, no cargar fechas
      setReservedRanges([]);
    } else {
      try {
        const data = await reservationService.getReservedDates(idAlojamiento);
        setReservedRanges(data);
      } catch {
        setReservedRanges([]);
      }
    }
    // Inicializar el rango editable con las fechas actuales
    setEditDateRange([
      reservation.fecha_inicio ? new Date(reservation.fecha_inicio) : null,
      reservation.fecha_fin ? new Date(reservation.fecha_fin) : null
    ]);
    setEditModal({ open: true, reservation: { ...reservation }, saving: false, error: null });
  };
  const closeEditModal = () => setEditModal({ open: false, reservation: null, saving: false, error: null });
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditModal((prev) => ({ ...prev, reservation: { ...prev.reservation, [name]: value } }));
  };

  const handleSaveEdit = async () => {
    setEditModal((prev) => ({ ...prev, saving: true, error: null }));
    try {
      const { id_reserva, cantidad_personas } = editModal.reservation;
      // Usar fechas del calendario si se seleccionaron
      const [start, end] = editDateRange;
      const data = {};
      if (start) data.fecha_inicio = start.toISOString().slice(0, 10);
      if (end) data.fecha_fin = end.toISOString().slice(0, 10);
      if (cantidad_personas) data.cantidad_personas = Number(cantidad_personas);
      Object.keys(data).forEach(key => {
        if (data[key] === undefined || data[key] === null || data[key] === "") {
          delete data[key];
        }
      });
      await reservationService.updateReservation(id_reserva, data);
      const updated = await reservationService.getUserReservations(user.id_cliente);
      setReservations(updated);
      closeEditModal();
    } catch (e) {
      setEditModal((prev) => ({ ...prev, saving: false, error: 'Error al actualizar la reserva' }));
    }
  };

  const handleCancelReservation = async (id_reserva) => {
    if (!window.confirm('¿Estás seguro de que deseas cancelar esta reserva?')) return;
    try {
      await reservationService.cancelReservation(id_reserva);
      const updated = await reservationService.getUserReservations(user.id_cliente);
      setReservations(updated);
    } catch (e) {
      alert('No se pudo cancelar la reserva');
    }
  };

  const openDetailsModal = (reservation) => {
    setDetailsModal({ open: true, reservation });
  };
  const closeDetailsModal = () => setDetailsModal({ open: false, reservation: null });

  // Utilidad para convertir rangos a fechas individuales
  function getAllReservedDays(ranges) {
    const days = [];
    ranges.forEach(({ start, end }) => {
      let current = new Date(start);
      const last = new Date(end);
      while (current <= last) {
        days.push(new Date(current));
        current.setDate(current.getDate() + 1);
      }
    });
    return days;
  }
  const reservedDays = getAllReservedDays(reservedRanges);

  const toYYYYMMDD = (d) => {
    if (!d) return undefined;
    if (typeof d === 'string' && d.length === 10) return d;
    if (typeof d === 'string') return d.slice(0, 10);
    if (d instanceof Date) return d.toISOString().slice(0, 10);
    return undefined;
  };

  return (
    <div className="min-h-screen bg-neutral-50 pt-20">
      <div className="container-custom py-12">
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold">Mis Reservas</h1>
            <div className="flex gap-4">
              <div className="relative">
                <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Buscar reservas..."
                  className="pl-10 input h-10"
                  disabled
                />
              </div>
              <div className="flex bg-neutral-100 rounded-lg p-1">
                <button
                  onClick={() => { setFilter('all'); setShowCancelled(false); }}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    filter === 'all' && !showCancelled ? 'bg-white shadow text-primary' : 'text-neutral-600'
                  }`}
                >
                  Todas
                </button>
                <button
                  onClick={() => { setFilter('active'); setShowCancelled(false); }}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    filter === 'active' && !showCancelled ? 'bg-white shadow text-primary' : 'text-neutral-600'
                  }`}
                >
                  Activas
                </button>
                <button
                  onClick={() => { setFilter('past'); setShowCancelled(false); }}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    filter === 'past' && !showCancelled ? 'bg-white shadow text-primary' : 'text-neutral-600'
                  }`}
                >
                  Pasadas
                </button>
                <button
                  onClick={() => { setShowCancelled(true); }}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    showCancelled ? 'bg-white shadow text-red-600' : 'text-neutral-600'
                  }`}
                >
                  Canceladas
                </button>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12 text-neutral-500">Cargando reservas...</div>
          ) : error ? (
            <div className="text-center py-12 text-red-500">{error}</div>
          ) : filteredReservations.length === 0 ? (
            <div className="text-center py-12 text-neutral-400">
              {showCancelled ? 'No tienes reservas canceladas.' : 'No tienes reservas.'}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredReservations.map(reservation => (
                <div key={reservation.id_reserva} className={`flex gap-4 p-4 border border-neutral-100 rounded-xl hover:bg-neutral-50 transition-colors ${reservation.estado === 'cancelada' ? 'opacity-60' : ''}`}>
                  <div className="w-32 h-24 rounded-lg overflow-hidden">
                    <img
                      src={reservation.imagen_alojamiento || 'https://images.pexels.com/photos/2662816/pexels-photo-2662816.jpeg'}
                      alt={reservation.nombre_alojamiento || 'Alojamiento'}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{reservation.nombre_alojamiento || 'Alojamiento'}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${reservation.estado === 'cancelada' ? 'bg-red-100 text-red-600' : statusStyles[reservation.estado] || 'bg-neutral-200 text-neutral-600'}`}>
                        {reservation.estado === 'cancelada' ? 'Cancelada' : statusText[reservation.estado] || reservation.estado || 'Desconocido'}
                      </span>
                    </div>
                    <div className="flex items-center text-neutral-600 mb-3">
                      <Calendar size={16} className="mr-2" />
                      <span className="text-sm">{reservation.fecha_inicio} - {reservation.fecha_fin}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold">$ {reservation.precio_total || '---'}</span>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" type="button" onClick={() => openDetailsModal(reservation)}>
                          Ver detalles
                        </Button>
                        {reservation.estado !== 'cancelada' && (
                          <Button variant="outline" size="sm" onClick={() => openEditModal(reservation)}>
                            Actualizar
                          </Button>
                        )}
                        {reservation.estado !== 'completed' && reservation.estado !== 'cancelada' && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-red-600 hover:bg-red-50"
                            onClick={() => handleCancelReservation(reservation.id_reserva)}
                          >
                            Cancelar
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Modal de edición */}
          {editModal.open && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
              <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 relative">
                <button
                  className="absolute top-4 right-4 text-neutral-500 hover:text-primary text-2xl"
                  onClick={closeEditModal}
                >
                  ×
                </button>
                <h2 className="text-xl font-bold mb-4">Actualizar Reserva</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Fechas</label>
                    <DatePicker
                      selectsRange
                      startDate={editDateRange[0]}
                      endDate={editDateRange[1]}
                      onChange={(range) => setEditDateRange(range)}
                      minDate={new Date()}
                      excludeDates={reservedDays}
                      locale="es"
                      inline
                      monthsShown={2}
                      calendarClassName="reservation-calendar"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Cantidad de personas</label>
                    <input
                      type="number"
                      name="cantidad_personas"
                      className="input"
                      min={1}
                      value={editModal.reservation.cantidad_personas || 1}
                      onChange={handleEditChange}
                    />
                  </div>
                  {editModal.error && <div className="text-red-500 text-sm">{editModal.error}</div>}
                </div>
                <div className="flex justify-end gap-2 mt-6">
                  <Button variant="outline" onClick={closeEditModal}>Cancelar</Button>
                  <Button variant="primary" loading={editModal.saving} onClick={handleSaveEdit}>
                    Guardar Cambios
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Modal de detalles */}
          {detailsModal.open && detailsModal.reservation && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
              <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-0 relative overflow-hidden">
                <button
                  className="absolute top-4 right-4 text-neutral-500 hover:text-primary text-2xl z-10"
                  onClick={closeDetailsModal}
                >
                  ×
                </button>
                {/* Imagen superior */}
                <div className="h-48 w-full overflow-hidden relative">
                  <img
                    src={detailsModal.reservation.imagen_alojamiento || 'https://images.pexels.com/photos/2662816/pexels-photo-2662816.jpeg'}
                    alt={detailsModal.reservation.nombre_alojamiento || 'Alojamiento'}
                    className="w-full h-full object-cover"
                  />
                  <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium shadow-lg ${detailsModal.reservation.estado === 'cancelada' ? 'bg-red-100 text-red-600' : statusStyles[detailsModal.reservation.estado] || 'bg-neutral-200 text-neutral-600'}`}>{detailsModal.reservation.estado === 'cancelada' ? 'Cancelada' : statusText[detailsModal.reservation.estado] || detailsModal.reservation.estado}</span>
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-2">{detailsModal.reservation.nombre_alojamiento || 'Alojamiento'}</h2>
                  <div className="mb-4 text-neutral-600 text-sm flex flex-col gap-1">
                    <div><span className="font-medium text-neutral-800">Fechas:</span> {detailsModal.reservation.fecha_inicio} - {detailsModal.reservation.fecha_fin}</div>
                    <div><span className="font-medium text-neutral-800">Cantidad de personas:</span> {detailsModal.reservation.cantidad_personas}</div>
                    <div><span className="font-medium text-neutral-800">Método de pago:</span> {detailsModal.reservation.metodo_pago || '---'}</div>
                    <div><span className="font-medium text-neutral-800">Observaciones:</span> {detailsModal.reservation.observaciones || '---'}</div>
                  </div>
                  <div className="flex items-center justify-between border-t pt-4 mt-4">
                    <span className="font-semibold text-neutral-700">Total pagado:</span>
                    <span className="text-lg font-bold text-primary">$ {detailsModal.reservation.precio_total || detailsModal.reservation.costo_total || '---'}</span>
                  </div>
                  <div className="flex justify-end gap-2 mt-6">
                    <Button variant="outline" onClick={closeDetailsModal}>Cerrar</Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyReservations;