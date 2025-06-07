import React from 'react';
import { PartyPopper, Users, Music, Camera, Calendar, Clock, MapPin, Heart } from 'lucide-react';
import Button from '../../components/ui/Button';

const Events = () => {
  const features = [
    {
      icon: <Users className="w-6 h-6 text-primary" />,
      title: "Capacidad",
      description: "Hasta 200 personas"
    },
    {
      icon: <Music className="w-6 h-6 text-primary" />,
      title: "Equipamiento",
      description: "Sonido profesional incluido"
    },
    {
      icon: <Camera className="w-6 h-6 text-primary" />,
      title: "Locaciones",
      description: "Múltiples espacios para fotos"
    }
  ];

  const eventTypes = [
    {
      name: "Bodas",
      image: "https://images.pexels.com/photos/169198/pexels-photo-169198.jpeg",
      description: "El lugar perfecto para tu día especial"
    },
    {
      name: "Corporativos",
      image: "https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg",
      description: "Reuniones y eventos empresariales"
    },
    {
      name: "Celebraciones",
      image: "https://images.pexels.com/photos/587741/pexels-photo-587741.jpeg",
      description: "Cumpleaños, aniversarios y más"
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <div className="relative h-[500px]">
        <img
          src="https://images.pexels.com/photos/587741/pexels-photo-587741.jpeg"
          alt="Eventos"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">Eventos</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              El espacio perfecto para tus celebraciones especiales
            </p>
          </div>
        </div>
      </div>

      {/* Características */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-neutral-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tipos de Eventos */}
      <section className="py-16 bg-neutral-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">Tipos de Eventos</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {eventTypes.map((type, index) => (
              <div key={index} className="group relative overflow-hidden rounded-2xl">
                <img
                  src={type.image}
                  alt={type.name}
                  className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{type.name}</h3>
                  <p className="text-white/90">{type.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Servicios Incluidos */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Servicios Incluidos</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                    <Calendar className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Coordinación del Evento</h3>
                    <p className="text-neutral-600">
                      Personal dedicado para asegurar que todo salga perfecto
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                    <Music className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Equipo de Sonido</h3>
                    <p className="text-neutral-600">
                      Sistema profesional con técnico incluido
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                    <Heart className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Decoración Básica</h3>
                    <p className="text-neutral-600">
                      Iluminación ambiental y arreglos florales
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6 bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold">Información Importante</h3>
              
              <div className="flex items-center">
                <Clock className="text-primary mr-3" />
                <div>
                  <p className="font-medium">Duración del evento</p>
                  <p className="text-neutral-600">Hasta 8 horas</p>
                </div>
              </div>

              <div className="flex items-center">
                <Users className="text-primary mr-3" />
                <div>
                  <p className="font-medium">Capacidad máxima</p>
                  <p className="text-neutral-600">200 personas</p>
                </div>
              </div>

              <div className="flex items-center">
                <MapPin className="text-primary mr-3" />
                <div>
                  <p className="font-medium">Ubicación</p>
                  <p className="text-neutral-600">A 1 hora de la ciudad</p>
                </div>
              </div>

              <Button variant="primary" fullWidth className="mt-4">
                Solicitar Cotización
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Events;