import React from 'react';
import { Mountain, Wifi, UtensilsCrossed, Users } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Mountain className="w-16 h-16 text-accent" />,
      title: "Vista Panorámica",
      description: "Paisajes espectaculares"
    },
    {
      icon: <Wifi className="w-16 h-16 text-accent" />,
      title: "WiFi Gratuito",
      description: "Conectividad total"
    },
    {
      icon: <UtensilsCrossed className="w-16 h-16 text-accent" />,
      title: "Restaurante",
      description: "Gastronomía local"
    },
    {
      icon: <Users className="w-16 h-16 text-accent" />,
      title: "Eventos",
      description: "Capacidad 200 personas"
    }
  ];

  return (
    <div className="bg-white py-24">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center space-y-4">
              <div className="mb-2">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-semibold text-primary">
                {feature.title}
              </h3>
              <p className="text-neutral-600 text-lg">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;