import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Check, Star, Calendar } from 'lucide-react';
import Button from './Button';
import DatePicker from 'react-datepicker';
import { es } from 'date-fns/locale';
import { registerLocale } from 'react-datepicker';

registerLocale('es', es);

const RoomCard = ({ 
  room, 
  featured = false,
  showAvailabilityCalendar = false,
  showCancellationPolicy = false
}) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  return (
    <div className={`card hover:shadow-xl ${featured ? 'lg:flex' : ''}`}>
      <div className={`relative overflow-hidden ${featured ? 'lg:w-1/2' : 'h-64 sm:h-72'}`}>
        <img 
          src={room.images[0]} 
          alt={room.name} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        {room.available && (
          <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-medium">
            Disponible
          </div>
        )}
      </div>
      
      <div className={`p-6 ${featured ? 'lg:w-1/2' : ''}`}>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-bold">{room.name}</h3>
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="ml-1 text-sm font-medium">{room.rating}</span>
            <span className="text-xs text-neutral-500 ml-1">({room.reviews})</span>
          </div>
        </div>
        
        <div className="flex items-center text-neutral-600 mb-3">
          <User size={16} className="mr-1" />
          <span className="text-sm">Hasta {room.capacity} personas • {room.size}</span>
        </div>
        
        <p className="text-neutral-700 mb-4 line-clamp-2">{room.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {room.amenities.slice(0, 3).map((amenity, index) => (
            <span key={index} className="inline-flex items-center bg-neutral-100 text-neutral-700 px-3 py-1 rounded-full text-xs">
              <Check size={12} className="mr-1 text-primary" />
              {amenity}
            </span>
          ))}
          {room.amenities.length > 3 && (
            <span className="inline-flex items-center bg-neutral-100 text-neutral-700 px-3 py-1 rounded-full text-xs">
              +{room.amenities.length - 3} más
            </span>
          )}
        </div>

        {showCancellationPolicy && (
          <div className="bg-neutral-50 rounded-lg p-3 mb-4 text-sm">
            <p className="font-medium mb-1">Política de cancelación</p>
            <p className="text-neutral-600">{room.policies.cancellation}</p>
          </div>
        )}
        
        <div className="flex items-center justify-between mt-auto">
          <div>
            <span className="text-2xl font-bold text-primary">${room.price}</span>
            <span className="text-neutral-600 text-sm">/noche</span>
          </div>
          
          <div className="flex space-x-2">
            {showAvailabilityCalendar ? (
              <Button 
                variant="primary"
                size="sm"
                onClick={() => setShowCalendar(!showCalendar)}
                icon={<Calendar size={18} />}
              >
                Ver disponibilidad
              </Button>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  size="sm" 
                  to={`/habitaciones/${room.id}`}
                >
                  Detalles
                </Button>
                <Button 
                  variant="primary" 
                  size="sm" 
                  to={`/reservar?room=${room.id}`}
                >
                  Reservar
                </Button>
              </>
            )}
          </div>
        </div>

        {showCalendar && (
          <div className="mt-4 p-4 bg-neutral-50 rounded-xl">
            <DatePicker
              selectsRange={true}
              startDate={startDate}
              endDate={endDate}
              onChange={(update) => setDateRange(update)}
              minDate={new Date()}
              locale="es"
              inline
              className="w-full"
            />
            <div className="mt-4 flex justify-end">
              <Button 
                variant="primary"
                size="sm"
                disabled={!startDate || !endDate}
                to={`/reservar?room=${room.id}&start=${startDate?.toISOString()}&end=${endDate?.toISOString()}`}
              >
                Continuar reserva
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomCard;