import React from 'react';
import { Utensils, CookingPot as Hiking, Space as Spa, PartyPopper, Coffee, Bike, Mountain, Wine, Map } from 'lucide-react';

const ServiceCard = ({ service }) => {
  // Mapa de iconos disponibles
  const iconMap = {
    utensils: <Utensils size={40} className="text-primary" />,
    hiking: <Hiking size={40} className="text-primary" />,
    spa: <Spa size={40} className="text-primary" />,
    party: <PartyPopper size={40} className="text-primary" />,
    coffee: <Coffee size={40} className="text-primary" />,
    bike: <Bike size={40} className="text-primary" />,
    mountain: <Mountain size={40} className="text-primary" />,
    wine: <Wine size={40} className="text-primary" />,
    map: <Map size={40} className="text-primary" />,
  };

  return (
    <div className="card p-6 hover:-translate-y-2 transition-all duration-300">
      <div className="mb-4">
        {iconMap[service.icon] || <Utensils size={40} className="text-primary" />}
      </div>
      <h3 className="text-xl font-bold mb-2">{service.name}</h3>
      <p className="text-neutral-600">{service.description}</p>
    </div>
  );
};

export default ServiceCard;