import React from 'react';
import { Tent, PartyPopper, Utensils, Mountain, Wifi, Coffee, Music, Camera, Heart } from 'lucide-react';
import Button from '../components/ui/Button';

const Services = () => {
  const services = [
    {
      id: 'camping',
      title: 'Camping',
      description: 'Experiencia única bajo las estrellas',
      icon: <Tent className="w-8 h-8 text-accent" />,
      features: [
        { icon: <Mountain className="w-5 h-5" />, text: 'Vistas panorámicas' },
        { icon: <Coffee className="w-5 h-5" />, text: 'Desayuno incluido' },
        { icon: <Wifi className="w-5 h-5" />, text: 'WiFi gratuito' }
      ]
    },
    {
      id: 'eventos',
      title: 'Eventos',
      description: 'El lugar perfecto para celebrar',
      icon: <PartyPopper className="w-8 h-8 text-accent" />,
      features: [
        { icon: <PartyPopper className="w-5 h-5" />, text: 'Capacidad hasta 200 personas' },
        { icon: <Music className="w-5 h-5" />, text: 'Equipo de sonido incluido' },
        { icon: <Camera className="w-5 h-5" />, text: 'Locaciones fotográficas' }
      ]
    },
    {
      id: 'restaurante',
      title: 'Restaurante',
      description: 'Gastronomía local y gourmet',
      icon: <Utensils className="w-8 h-8 text-accent" />,
      features: [
        { icon: <Heart className="w-5 h-5" />, text: 'Ingredientes locales' },
        { icon: <Coffee className="w-5 h-5" />, text: 'Café de altura' },
        { icon: <Mountain className="w-5 h-5" />, text: 'Vista al valle' }
      ]
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <div className="relative h-[400px] flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/3617496/pexels-photo-3617496.jpeg"
            alt="Servicios"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative text-center text-white z-10 px-4">
          <h1 className="text-5xl font-bold mb-4 text-white">Planes & Servicios</h1>
          <p className="text-xl text-white/90">Descubre todo lo que tenemos para ofrecer</p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.id} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="mb-6">
                {service.icon}
              </div>
              
              <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
              <p className="text-neutral-600 mb-6">{service.description}</p>
              
              <div className="space-y-4 mb-8">
                {service.features.map((feature, index) => (
                  <div key={index} className="flex items-center text-neutral-700">
                    <span className="text-primary mr-3">{feature.icon}</span>
                    <span>{feature.text}</span>
                  </div>
                ))}
              </div>
              
              <Button
                to={`/servicios/${service.id}`}
                variant="outline"
                fullWidth
                className="justify-center"
              >
                Ver detalles
              </Button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Services;