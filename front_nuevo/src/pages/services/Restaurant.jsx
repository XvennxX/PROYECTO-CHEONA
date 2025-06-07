import React from 'react';
import { Utensils, Coffee, Wine, Clock, Star, MapPin } from 'lucide-react';
import Button from '../../components/ui/Button';

const Restaurant = () => {
  const features = [
    {
      icon: <Utensils className="w-6 h-6 text-primary" />,
      title: "Cocina Local",
      description: "Platos tradicionales con un toque moderno"
    },
    {
      icon: <Coffee className="w-6 h-6 text-primary" />,
      title: "Café de Altura",
      description: "Granos seleccionados de la región"
    },
    {
      icon: <Wine className="w-6 h-6 text-primary" />,
      title: "Cava Selecta",
      description: "Vinos nacionales e importados"
    }
  ];

  const menuSections = [
    {
      name: "Desayunos",
      items: [
        {
          name: "Desayuno Campesino",
          description: "Huevos, arepa, queso, café y jugo natural",
          price: "25.000"
        },
        {
          name: "Desayuno Especial",
          description: "Pancakes, frutas, yogurt y granola",
          price: "30.000"
        }
      ]
    },
    {
      name: "Platos Principales",
      items: [
        {
          name: "Trucha al Ajillo",
          description: "Trucha fresca con papas criollas y ensalada",
          price: "45.000"
        },
        {
          name: "Lomo en Salsa",
          description: "Lomo fino con champiñones y pure de papa",
          price: "50.000"
        }
      ]
    },
    {
      name: "Postres",
      items: [
        {
          name: "Postre de la Casa",
          description: "Receta especial del chef",
          price: "15.000"
        },
        {
          name: "Frutas de Temporada",
          description: "Selección de frutas locales",
          price: "12.000"
        }
      ]
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <div className="relative h-[500px]">
        <img
          src="https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg"
          alt="Restaurante"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-4">Restaurante</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Una experiencia gastronómica única en medio de la naturaleza
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

      {/* Menú */}
      <section className="py-16 bg-neutral-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">Nuestro Menú</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {menuSections.map((section, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold mb-6">{section.name}</h3>
                <div className="space-y-6">
                  {section.items.map((item, i) => (
                    <div key={i} className="pb-6 border-b border-neutral-100 last:border-0">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold">{item.name}</h4>
                        <span className="text-primary font-bold">${item.price}</span>
                      </div>
                      <p className="text-neutral-600 text-sm">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Información */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Información del Restaurante</h2>
              <div className="space-y-6">
                <div className="flex items-center">
                  <Clock className="text-primary mr-3" />
                  <div>
                    <p className="font-medium">Horario</p>
                    <p className="text-neutral-600">
                      Lunes a Domingo: 7:00 AM - 10:00 PM
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <MapPin className="text-primary mr-3" />
                  <div>
                    <p className="font-medium">Ubicación</p>
                    <p className="text-neutral-600">
                      En el corazón de la finca, con vista al valle
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Star className="text-primary mr-3" />
                  <div>
                    <p className="font-medium">Calificación</p>
                    <p className="text-neutral-600">4.8/5 basado en 120 reseñas</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Button variant="primary">Hacer Reservación</Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg"
                alt="Platos"
                className="rounded-2xl"
              />
              <img
                src="https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg"
                alt="Ambiente"
                className="rounded-2xl mt-8"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Restaurant;