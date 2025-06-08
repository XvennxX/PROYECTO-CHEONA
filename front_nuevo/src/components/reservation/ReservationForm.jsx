import React, { useState, useEffect } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import { es } from 'date-fns/locale';
import { addDays, formatDateLong, isSameDay } from '../../utils/dates';
import { reservationService } from '../../services/reservationService';
import Button from '../ui/Button';
import { Home, Tent, Castle, ChevronLeft, ChevronRight, Users, Check, Calendar, Loader } from 'lucide-react';
import "react-datepicker/dist/react-datepicker.css";

registerLocale('es', es);

const ReservationForm = ({ preselectedType = 'cabin' }) => {
  const [selectedType, setSelectedType] = useState(preselectedType);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [guests, setGuests] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formStep, setFormStep] = useState(1);
  const [addBreakfast, setAddBreakfast] = useState(false);
  const [addCleaning, setAddCleaning] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    specialRequests: '',
  });

  const accommodation = {
    cabin: {
      name: 'Cabaña de Montaña',
      description: 'Comodidad y privacidad en la naturaleza',
      basePrice: 800000, // $200 USD -> COP 800.000
      additionalGuestPrice: 100000, // $25 USD -> COP 100.000
      maxGuests: 4,
      images: [
        'https://images.pexels.com/photos/2506988/pexels-photo-2506988.jpeg'
      ],
      amenities: [
        'Chimenea',
        'Cocina equipada',
        'Baño privado',
        'WiFi',
        'Estacionamiento'
      ]
    },
    glamping: {
      name: 'Domo Celestial',
      description: 'Una experiencia única bajo las estrellas',
      basePrice: 600000, // $150 USD -> COP 600.000
      additionalGuestPrice: 80000, // $20 USD -> COP 80.000
      maxGuests: 2,
      images: [
        'https://images.pexels.com/photos/2662816/pexels-photo-2662816.jpeg'
      ],
      amenities: [
        'Vista al cielo',
        'Cama king size',
        'Baño privado',
        'Desayuno incluido'
      ]
    },
    full: {
      name: 'Finca Completa',
      description: 'El espacio perfecto para grupos y eventos',
      basePrice: 3200000, // $800 USD -> COP 3.200.000
      additionalGuestPrice: 200000, // $50 USD -> COP 200.000
      maxGuests: 20,
      images: [
        'https://images.pexels.com/photos/2360673/pexels-photo-2360673.jpeg'
      ],
      amenities: [
        'Casa principal',
        'Piscina',
        'Jardines',
        'Cocina industrial'
      ]
    }
  };

  const selectedAccommodation = accommodation[selectedType];

  const handleReservation = async () => {
  setLoading(true);
  try {
    const total = calculateTotal();
    const reservationData = {
      id_cliente: 16, // Cambia por el ID real si tienes autenticación
      id_alojamiento: selectedType === 'cabin' ? 1 : selectedType === 'glamping' ? 2 : 3,
      fecha_inicio: startDate.toISOString(),
      fecha_fin: endDate.toISOString(),
      cantidad_personas: guests,
      metodo_pago: "efectivo", // O agrega un campo para que el usuario elija
      observaciones: formData.specialRequests,
      costo_total: total.total
    };
    await reservationService.createReservation(reservationData);
    alert('¡Reserva realizada con éxito!');
    // Aquí puedes limpiar el formulario o redirigir
  } catch (error) {
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
    if (!startDate || !endDate) return null;
    
    const nights = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
    const baseTotal = selectedAccommodation.basePrice * nights;
    
    // Cálculo detallado de huéspedes adicionales
    const additionalGuests = Math.max(0, guests - 1);
    const additionalGuestPrice = selectedAccommodation.additionalGuestPrice;
    const additionalGuestsTotal = additionalGuests * additionalGuestPrice * nights;
    
    const breakfastTotal = addBreakfast ? 60000 * guests * nights : 0; // $15 USD -> COP 60.000
    const cleaningTotal = addCleaning ? 120000 : 0; // $30 USD -> COP 120.000
    
    return {
      nights,
      basePrice: selectedAccommodation.basePrice,
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

  return (
    <div className="container-custom py-12">
      {/* Selector de tipo de alojamiento */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex bg-white shadow-lg rounded-full p-1">
          <button
            onClick={() => setSelectedType('cabin')}
            className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all ${
              selectedType === 'cabin' 
                ? 'bg-primary text-white' 
                : 'hover:bg-neutral-50'
            }`}
          >
            <Home size={20} />
            <span>Cabaña</span>
          </button>
          <button
            onClick={() => setSelectedType('glamping')}
            className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all ${
              selectedType === 'glamping' 
                ? 'bg-primary text-white' 
                : 'hover:bg-neutral-50'
            }`}
          >
            <Tent size={20} />
            <span>Glamping</span>
          </button>
          <button
            onClick={() => setSelectedType('full')}
            className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all ${
              selectedType === 'full' 
                ? 'bg-primary text-white' 
                : 'hover:bg-neutral-50'
            }`}
          >
            <Castle size={20} />
            <span>Finca Completa</span>
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Información del alojamiento */}
        <div>
          <div className="relative aspect-4/3 rounded-3xl overflow-hidden mb-6">
            <img
              src={selectedAccommodation.images[0]}
              alt={selectedAccommodation.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <h2 className="text-3xl font-bold mb-2">{selectedAccommodation.name}</h2>
              <p className="text-white/90">{selectedAccommodation.description}</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Users size={24} className="text-primary" />
                <div>
                  <p className="font-medium">Capacidad máxima</p>
                  <p className="text-neutral-600">{selectedAccommodation.maxGuests} personas</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-neutral-600">Desde</p>
                <p className="text-3xl font-bold text-primary">{formatCurrency(selectedAccommodation.basePrice)}</p>
                <p className="text-sm text-neutral-600">por noche</p>
              </div>
            </div>

            <div className="space-y-4">
              {selectedAccommodation.amenities.map((amenity, index) => (
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
                  {[...Array(selectedAccommodation.maxGuests)].map((_, i) => (
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
                            {formatCurrency(selectedAccommodation.basePrice)} × {calculateTotal().nights} noches
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
    </div>
  );
};

export default ReservationForm;