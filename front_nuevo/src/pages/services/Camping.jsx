import React from 'react';
import { Tent, Users, Mountain, Coffee, Wifi, MapPin } from 'lucide-react';
import Button from '../../components/ui/Button';

const Camping = () => {
  const features = [
    {
      icon: <Mountain className="w-6 h-6 text-primary" />,
      title: "Ubicación Privilegiada",
      description: "Rodeado de naturaleza y vistas panorámicas"
    },
    {
      icon: <Users className="w-6 h-6 text-primary" />,
      title: "Capacidad",
      description: "Espacio para 20 carpas y 60 personas"
    },
    {
      icon: <Wifi className="w-6 h-6 text-primary" />,
      title: "Comodidades",
      description: "WiFi, baños y duchas con agua caliente"
    }
  ];

  const packages = [
    {
      name: "Básico",
      price: "50.000",
      features: [
        "Espacio para carpa",
        "Acceso a baños",
        "Parqueadero",
        "Zona de fogata"
      ]
    },
    {
      name: "Comfort",
      price: "80.000",
      features: [
        "Todo lo del paquete básico",
        "Carpa incluida",
        "Colchonetas",
        "Desayuno incluido"
      ]
    },
    {
      name: "Premium",
      price: "120.000",
      features: [
        "Todo lo del paquete comfort",
        "Sleeping bags",
        "Kit de camping",
        "Todas las comidas incluidas"
      ]
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <div className="relative h-[500px]">
        <img
          src="https://images.pexels.com/photos/2662816/pexels-photo-2662816.jpeg"
          alt="Camping"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">Camping</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Vive una experiencia única en medio de la naturaleza con todas las comodidades
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

      {/* Paquetes */}
      <section className="py-16 bg-neutral-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">Nuestros Paquetes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                <div className="text-3xl font-bold text-primary mb-6">
                  ${pkg.price}
                  <span className="text-sm text-neutral-600 font-normal">/noche</span>
                </div>
                <ul className="space-y-4 mb-8">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                        <span className="text-primary text-sm">✓</span>
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button variant="primary" fullWidth>Reservar ahora</Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Información Adicional */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Todo lo que necesitas</h2>
              <p className="text-lg text-neutral-600 mb-8">
                Nuestro camping está equipado con todas las comodidades necesarias para que tu experiencia sea inolvidable. Contamos con zonas comunes, área de BBQ, y personal disponible 24/7.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <MapPin className="text-primary mr-3" />
                  <span>Ubicado a 1 hora de la ciudad</span>
                </div>
                <div className="flex items-center">
                  <Coffee className="text-primary mr-3" />
                  <span>Cafetería y restaurante en el sitio</span>
                </div>
                <div className="flex items-center">
                  <Mountain className="text-primary mr-3" />
                  <span>Acceso a senderos y actividades</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.pexels.com/photos/2662816/pexels-photo-2662816.jpeg"
                alt="Camping facilities"
                className="rounded-2xl"
              />
              <img
                src="https://images.pexels.com/photos/2666598/pexels-photo-2666598.jpeg"
                alt="Camping area"
                className="rounded-2xl mt-8"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Camping;