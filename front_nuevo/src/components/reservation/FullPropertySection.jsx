import React from 'react';
import { Check, Users, MapPin, CalendarDays } from 'lucide-react';
import Button from '../ui/Button';

const FullPropertySection = () => {
  const features = [
    'Casa principal con 4 habitaciones',
    '2 cabañas independientes',
    '3 unidades de glamping',
    'Capacidad total para 20 personas',
    'Cocina completamente equipada',
    'Salón de eventos para 100 personas',
    'Piscina y áreas de recreación',
    'Estacionamiento privado',
    'Personal de servicio incluido',
    'Actividades organizadas disponibles'
  ];

  const additionalServices = [
    'Servicio de catering',
    'Decoración para eventos',
    'Actividades guiadas',
    'Transporte desde/hacia aeropuerto',
    'Masajes y tratamientos de spa'
  ];

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Imágenes y Descripción */}
      <div>
        <div className="relative rounded-2xl overflow-hidden mb-6 aspect-4/3">
          <img
            src="https://images.pexels.com/photos/2360673/pexels-photo-2360673.jpeg"
            alt="Finca Completa"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <img
            src="https://images.pexels.com/photos/2662816/pexels-photo-2662816.jpeg"
            alt="Áreas comunes"
            className="rounded-xl aspect-4/3 object-cover"
          />
          <img
            src="https://images.pexels.com/photos/2659629/pexels-photo-2659629.jpeg"
            alt="Jardines"
            className="rounded-xl aspect-4/3 object-cover"
          />
        </div>

        <h2 className="text-2xl font-bold mb-4">Características Incluidas</h2>
        <div className="grid sm:grid-cols-2 gap-3 mb-8">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start">
              <Check size={18} className="text-primary mt-1 mr-2 flex-shrink-0" />
              <span>{feature}</span>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold mb-4">Servicios Adicionales</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {additionalServices.map((service, index) => (
            <div key={index} className="flex items-start">
              <Check size={18} className="text-primary mt-1 mr-2 flex-shrink-0" />
              <span>{service}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Información de Reserva */}
      <div>
        <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-24">
          <h2 className="text-3xl font-bold mb-2">Finca Completa</h2>
          
          <div className="flex items-center text-neutral-600 mb-6">
            <Users size={18} className="mr-2" />
            <span>Hasta 20 personas</span>
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex items-center">
              <MapPin size={18} className="text-primary mr-2" />
              <span>San José, Costa Rica</span>
            </div>
            <div className="flex items-center">
              <CalendarDays size={18} className="text-primary mr-2" />
              <span>Mínimo 2 noches</span>
            </div>
          </div>

          <div className="border-t border-b border-neutral-200 py-4 my-6">
            <div className="flex justify-between mb-2">
              <span className="text-neutral-600">Por noche:</span>
              <span className="text-2xl font-bold">$1,200</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-neutral-600">Fin de semana completo:</span>
              <span className="text-2xl font-bold">$3,000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-600">Semana completa:</span>
              <span className="text-2xl font-bold">$7,000</span>
            </div>
          </div>

          <Button 
            variant="primary"
            fullWidth
            className="mb-4"
            to="/reservar/finca-completa"
          >
            Consultar disponibilidad
          </Button>

          <div className="bg-primary/5 rounded-xl p-4">
            <h3 className="font-semibold mb-2">Política de cancelación</h3>
            <p className="text-sm text-neutral-600">
              Cancelación gratuita hasta 30 días antes de la llegada. 
              Después de esta fecha, se aplicará un cargo del 50% del valor total.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullPropertySection;