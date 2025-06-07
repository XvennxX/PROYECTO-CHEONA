import React from 'react';
import Button from '../ui/Button';
import { Check } from 'lucide-react';

const About = () => {
  const highlights = [
    "Casa principal y dos cabañas con encanto",
    "Ubicación privilegiada en plena naturaleza",
    "Gastronomía local con productos de temporada",
    "Actividades al aire libre para todas las edades",
    "Desconexión digital y reconexión personal",
    "Personal atento a todos los detalles"
  ];

  return (
    <section className="section">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Finca Cheona</h2>
            <div className="h-1 w-20 bg-accent mb-6 mx-auto lg:mx-0"></div>
            
            <p className="text-lg text-neutral-700 mb-4 text-center lg:text-left">
              En el corazón de la naturaleza, Finca Cheona es un refugio donde el tiempo parece detenerse. Un lugar para reconectar con lo esencial, disfrutar de la tranquilidad y vivir experiencias auténticas.
            </p>
            
            <p className="text-neutral-600 mb-6 text-center lg:text-left">
              Nuestra finca, con su casa principal y dos acogedoras cabañas, ha sido cuidadosamente restaurada para ofrecer todas las comodidades modernas sin perder su encanto rústico. Rodeados de naturaleza y montañas, te invitamos a descubrir un estilo de vida donde la sostenibilidad y el respeto por el entorno son nuestra prioridad.
            </p>
            
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
              {highlights.map((item, index) => (
                <li key={index} className="flex items-start justify-center lg:justify-start">
                  <Check size={18} className="text-primary mt-1 mr-2 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            
            <div className="flex justify-center lg:justify-start">
              <Button to="/servicios" variant="primary">
                Descubre nuestros servicios
              </Button>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="rounded-xl overflow-hidden h-64">
                <img 
                  src="https://images.pexels.com/photos/2506988/pexels-photo-2506988.jpeg?auto=compress&cs=tinysrgb&w=800" 
                  alt="Finca Cheona" 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="rounded-xl overflow-hidden h-40">
                <img 
                  src="https://images.pexels.com/photos/2957862/pexels-photo-2957862.jpeg?auto=compress&cs=tinysrgb&w=800" 
                  alt="Gastronomía local" 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="space-y-4 mt-8">
              <div className="rounded-xl overflow-hidden h-40">
                <img 
                  src="https://images.pexels.com/photos/13450767/pexels-photo-13450767.jpeg?auto=compress&cs=tinysrgb&w=800" 
                  alt="Actividades rurales" 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="rounded-xl overflow-hidden h-64">
                <img 
                  src="https://images.pexels.com/photos/2901212/pexels-photo-2901212.jpeg?auto=compress&cs=tinysrgb&w=800" 
                  alt="Entorno natural" 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;