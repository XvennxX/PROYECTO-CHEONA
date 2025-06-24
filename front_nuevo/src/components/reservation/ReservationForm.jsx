import React, { useState, useEffect } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import { es } from 'date-fns/locale';
import { addDays, formatDateLong, isSameDay } from '../../utils/dates';
import { reservationService } from '../../services/reservationService';
import Button from '../ui/Button';
import { Home, Tent, Castle, ChevronLeft, ChevronRight, Users, Check, Calendar, Loader } from 'lucide-react';
import "react-datepicker/dist/react-datepicker.css";
import { useAuth } from '../auth/AuthContext';
import Carousel from '../ui/Carousel';
import { getGaleriaImagesByTipo } from '../../services/galeriaService';

registerLocale('es', es);

const ReservationForm = ({ preselectedType = null }) => {
  const { user } = useAuth();
  const [spaces, setSpaces] = useState([]);
  const [selectedSpace, setSelectedSpace] = useState(null);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [guests, setGuests] = useState(1);
  const [loading, setLoading] = useState(false);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const [addCleaning, setAddCleaning] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    specialRequests: '',
  });
  const [reservedRanges, setReservedRanges] = useState([]);
  const [galeriaPorTipo, setGaleriaPorTipo] = useState({});

  // Cargar espacios reales desde el backend
  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        const data = await reservationService.getRooms();
        setSpaces(data);
        if (data.length > 0) setSelectedSpace(data[0]);
      } catch (e) {
        setSpaces([]);
      }
    };
    fetchSpaces();
  }, []);

  useEffect(() => {
    if (!selectedSpace) return;
    const fetchReservedDates = async () => {
      try {
        const data = await reservationService.getReservedDates(selectedSpace.id);
        setReservedRanges(data);
      } catch (e) {
        setReservedRanges([]);
      }
    };
    fetchReservedDates();
  }, [selectedSpace]);

  // Cargar galería de imágenes por tipo (igual que en dashboard)
  useEffect(() => {
    const fetchGaleria = async () => {
      const tipos = ['finca', 'cabaña', 'glamping'];
      const result = {};
      for (const tipo of tipos) {
        try {
          result[tipo] = await getGaleriaImagesByTipo(tipo);
        } catch {
          result[tipo] = [];
        }
      }
      setGaleriaPorTipo(result);
    };
    fetchGaleria();
  }, []);

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

  const handleReservation = async () => {
    setLoading(true);
    try {
      const totalCalculado = calculateTotal();
      if (!totalCalculado) {
        alert('Error al calcular el costo. Por favor, verifica las fechas de reserva.');
        setLoading(false);
        return;
      }
      
      if (!user || !user.id_cliente) {
        alert('Debes iniciar sesión para reservar.');
        setLoading(false);
        return;
      }
      
      // Formatear las fechas correctamente (YYYY-MM-DD)
      const formatDate = (date) => {
        return date.toISOString().split('T')[0];
      };
      
      const reservationData = {
        id_cliente: user.id_cliente,
        id_alojamiento: selectedSpace.id,
        fecha_inicio: formatDate(startDate),
        fecha_fin: formatDate(endDate),
        cantidad_personas: guests,
        metodo_pago: "efectivo",
        observaciones: formData.specialRequests || "",
        costo_total: totalCalculado.total
      };
      
      console.log("Enviando datos de reserva:", reservationData);
      
      await reservationService.createReservation(reservationData);
      alert('¡Reserva realizada con éxito!');
      // Limpiar formulario
      setDateRange([null, null]);
      setGuests(1);
      setAddBreakfast(false);
      setAddCleaning(false);
      
    } catch (error) {
      console.error("Error completo:", error);
      alert(error.message || 'Error al crear la reserva');
    }
    setLoading(false);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const calculateTotal = () => {
    if (!startDate || !endDate || !selectedSpace) return null;
    
    const nights = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    // Usar precio_por_noche en lugar de precio_base
    const precioNoche = selectedSpace.precio_por_noche || 0;
    const baseTotal = precioNoche * nights;
    
    // Cálculo detallado de huéspedes adicionales (asumimos 50% del precio por noche)
    const additionalGuests = Math.max(0, guests - 1);
    const additionalGuestPrice = selectedSpace.precio_adicional_huesped || (precioNoche * 0.5);
    const additionalGuestsTotal = additionalGuests * additionalGuestPrice * nights;
    
    const breakfastTotal = addBreakfast ? 60000 * guests * nights : 0; // $15 USD -> COP 60.000
    const cleaningTotal = addCleaning ? 120000 : 0; // $30 USD -> COP 120.000
    
    return {
      nights,
      basePrice: precioNoche,
      baseTotal,
      additionalGuests,
      additionalGuestPrice,
      additionalGuestsTotal,
      breakfastTotal,
      cleaningTotal,
      total: baseTotal + additionalGuestsTotal + breakfastTotal + cleaningTotal
    };
  };

  const CustomHeader = ({
    date,
    decreaseMonth,
    increaseMonth,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled
  }) => (
    <div className="flex items-center justify-between px-4 py-2">
      <button
        onClick={decreaseMonth}
        disabled={prevMonthButtonDisabled}
        className="p-1 hover:bg-neutral-100 rounded-lg transition-colors disabled:opacity-50"
      >
        <ChevronLeft size={20} className="text-neutral-600" />
      </button>
      <h3 className="text-lg font-semibold">
        {date.toLocaleString('es', { month: 'long', year: 'numeric' })}
      </h3>
      <button
        onClick={increaseMonth}
        disabled={nextMonthButtonDisabled}
        className="p-1 hover:bg-neutral-100 rounded-lg transition-colors disabled:opacity-50"
      >
        <ChevronRight size={20} className="text-neutral-600" />
      </button>
    </div>
  );

  // Utilidad para mapear nombre de alojamiento a tipo de carpeta
  function getTipoCarpeta(space) {
    if (!space) return 'finca'; // Valor predeterminado si no hay espacio
    
    // Si tiene nombre, intentar determinar por el nombre
    if (space.nombre) {
      const nombre = space.nombre.toLowerCase();
      if (nombre.includes('finca')) return 'finca';
      if (nombre.includes('cabaña') || nombre.includes('miyacure')) return 'cabaña';
      if (nombre.includes('glamping')) return 'glamping';
    }
    
    // Si tiene tipo, usarlo en minúsculas
    if (space.tipo) {
      const tipo = space.tipo.toLowerCase();
      if (tipo === 'cabin') return 'cabaña';
      if (tipo === 'glamping') return 'glamping';
      if (tipo === 'full' || tipo === 'finca') return 'finca';
      return tipo;
    }
    
    // Valor predeterminado final
    return 'finca';
  }

  if (spaces.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[40vh]">
        <Loader size={32} className="animate-spin mb-4 text-primary" />
        <p className="text-lg text-neutral-500">Cargando alojamientos reales...</p>
      </div>
    );
  }

  return (
    <div className="container-custom py-12">
      {/* Selector de tipo de alojamiento */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex bg-white shadow-lg rounded-full p-1">
          {spaces.map((space) => (
            <button
              key={space.id}
              onClick={() => setSelectedSpace(space)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all ${
                selectedSpace?.id === space.id 
                  ? 'bg-primary text-white' 
                  : 'hover:bg-neutral-50'
              }`}
            >
              {space.tipo === 'cabin' && <Home size={20} />}
              {space.tipo === 'glamping' && <Tent size={20} />}
              {space.tipo === 'full' && <Castle size={20} />}
              <span>{space.nombre}</span>
            </button>
          ))}
        </div>
      </div>

      {selectedSpace && (
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Información detallada */}
          <div>
            <div className="relative aspect-4/3 rounded-3xl overflow-hidden mb-6 bg-neutral-100 flex items-center justify-center">
              {(() => {
                // Preparar imágenes para el Carousel
                function prepareImages() {
                  // Obtener el tipo de alojamiento
                  const tipo = getTipoCarpeta(selectedSpace).toLowerCase();
                  
                  // Obtener las imágenes de la galería para este tipo
                  const galeria = galeriaPorTipo[tipo] || [];
                  
                  // Imágenes predeterminadas según el tipo de alojamiento (como fallback)
                  const defaultImages = {
                    'finca': [
                      'https://images.pexels.com/photos/2091166/pexels-photo-2091166.jpeg',
                      'https://images.pexels.com/photos/2662816/pexels-photo-2662816.jpeg',
                      'https://images.pexels.com/photos/106400/pexels-photo-106400.jpeg'
                    ],
                    'cabaña': [
                      'https://images.pexels.com/photos/731082/pexels-photo-731082.jpeg',
                      'https://images.pexels.com/photos/46792/the-hut-wooden-hut-ref-hut-shelter-46792.jpeg',
                      'https://images.pexels.com/photos/210137/pexels-photo-210137.jpeg'
                    ],
                    'glamping': [
                      'https://images.pexels.com/photos/2422968/pexels-photo-2422968.jpeg',
                      'https://images.pexels.com/photos/2516423/pexels-photo-2516423.jpeg',
                      'https://images.pexels.com/photos/6271625/pexels-photo-6271625.jpeg'
                    ]
                  };
                  
                  // Si tenemos imágenes de la galería, convertirlas a URLs absolutas
                  if (galeria && galeria.length > 0) {
                    console.log('Galería encontrada para tipo:', tipo, galeria);
                    
                    // Convertir rutas relativas a URLs absolutas
                    const processedImages = galeria.map(path => {
                      // Si ya es una URL completa, devolverla tal cual
                      if (path.startsWith('http')) return path;
                      
                      // Si es una ruta relativa, convertirla en URL absoluta
                      return `http://localhost:8000${path}`;
                    });
                    
                    console.log('Imágenes procesadas:', processedImages);
                    return processedImages;
                  }
                  
                  // Si no hay imágenes en la galería, usar las predeterminadas
                  console.log('Usando imágenes por defecto para tipo:', tipo);
                  return defaultImages[tipo] || defaultImages['finca'];
                }
                
                const imagesToUse = prepareImages();
                
                // Mostrar el componente Carousel con las imágenes
                return <Carousel images={imagesToUse} alt={selectedSpace.nombre} />;
              })()}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white pointer-events-none">
                <h2 className="text-3xl font-bold mb-2">{selectedSpace.nombre}</h2>
                <p className="text-white/90">{selectedSpace.descripcion}</p>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Users size={24} className="text-primary" />
                  <div>
                    <p className="font-medium">Capacidad máxima</p>
                    <p className="text-neutral-600">{selectedSpace.capacidad} personas</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-neutral-600">Desde</p>
                  <p className="text-3xl font-bold text-primary">{formatCurrency(selectedSpace.precio_por_noche || 0)}</p>
                  <p className="text-sm text-neutral-600">por noche</p>
                </div>
              </div>
              <div className="space-y-4">
                {(selectedSpace.comodidades || []).map((amenity, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Check size={16} className="text-primary" />
                    </div>
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Formulario de reserva */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-8 border-b border-neutral-100">
              <div className="flex items-center gap-3 mb-6">
                <Calendar size={24} className="text-primary" />
                <h2 className="text-2xl font-bold">Selecciona las fechas</h2>
              </div>
              <p className="text-neutral-600">Mínimo 2 noches</p>
            </div>

            <div className="p-8">
              <DatePicker
                selected={startDate}
                onChange={(dates) => setDateRange(dates)}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                inline
                monthsShown={2}
                minDate={new Date()}
                locale="es"
                renderCustomHeader={CustomHeader}
                calendarClassName="reservation-calendar"
                dayClassName={date => 
                  `hover:bg-primary/10 hover:text-primary transition-colors ${
                    isSameDay(date, new Date()) ? 'font-bold' : ''
                  }`
                }
                excludeDates={reservedDays}
              />

              <div className="mt-8 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Número de huéspedes
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(parseInt(e.target.value))}
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  >
                    {[...Array(selectedSpace?.capacidad_maxima)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1} {i === 0 ? 'huésped' : 'huéspedes'}
                      </option>
                    ))}
                  </select>
                </div>

                {startDate && endDate && (
                  <>
                    <div className="space-y-3">
                      <label className="block text-sm font-medium text-neutral-700">
                        Servicios adicionales
                      </label>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="breakfast"
                          checked={addBreakfast}
                          onChange={(e) => setAddBreakfast(e.target.checked)}
                          className="w-4 h-4 rounded border-neutral-300 text-primary focus:ring-primary/20"
                        />
                        <label htmlFor="breakfast" className="ml-2 text-sm">
                          Desayuno ({formatCurrency(60000)} por persona/noche)
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="cleaning"
                          checked={addCleaning}
                          onChange={(e) => setAddCleaning(e.target.checked)}
                          className="w-4 h-4 rounded border-neutral-300 text-primary focus:ring-primary/20"
                        />
                        <label htmlFor="cleaning" className="ml-2 text-sm">
                          Servicio de limpieza adicional ({formatCurrency(120000)})
                        </label>
                      </div>
                    </div>

                    <div className="bg-neutral-50 rounded-xl p-6">
                      <h3 className="font-semibold mb-4">Resumen de precios</h3>
                      {calculateTotal() && (
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-neutral-600">
                              {formatCurrency(calculateTotal().basePrice)} × {calculateTotal().nights} noches
                            </span>
                            <span>{formatCurrency(calculateTotal().baseTotal)}</span>
                          </div>

                          {guests > 1 && (
                            <div className="space-y-2 border-t border-neutral-200 pt-3">
                              <div className="flex justify-between text-sm text-neutral-600">
                                <span>Huéspedes adicionales:</span>
                                <span>{calculateTotal().additionalGuests}</span>
                              </div>
                              <div className="flex justify-between text-sm text-neutral-600">
                                <span>Precio por huésped adicional:</span>
                                <span>{formatCurrency(calculateTotal().additionalGuestPrice)}/noche</span>
                              </div>
                              <div className="flex justify-between text-sm font-medium">
                                <span>Total huéspedes adicionales:</span>
                                <span>{formatCurrency(calculateTotal().additionalGuestsTotal)}</span>
                              </div>
                            </div>
                          )}

                          {addBreakfast && (
                            <div className="flex justify-between text-sm border-t border-neutral-200 pt-3">
                              <span className="text-neutral-600">
                                Desayuno ({guests} personas × {calculateTotal().nights} días)
                              </span>
                              <span>{formatCurrency(calculateTotal().breakfastTotal)}</span>
                            </div>
                          )}

                          {addCleaning && (
                            <div className="flex justify-between text-sm border-t border-neutral-200 pt-3">
                              <span className="text-neutral-600">Servicio de limpieza</span>
                              <span>{formatCurrency(calculateTotal().cleaningTotal)}</span>
                            </div>
                          )}

                          <div className="flex justify-between font-bold pt-3 border-t border-neutral-200">
                            <span>Total</span>
                            <span>{formatCurrency(calculateTotal().total)}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}

                <Button
                  variant="primary"
                  fullWidth
                  className="h-12 text-lg font-medium"
                  disabled={!startDate || !endDate || loading}
                  onClick={handleReservation}
                >
                  {loading ? (
                    <>
                      <Loader size={20} className="animate-spin mr-2" />
                      <span>Procesando...</span>
                    </>
                  ) : (
                    'Reservar'
                  )}
                </Button>

                
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservationForm;