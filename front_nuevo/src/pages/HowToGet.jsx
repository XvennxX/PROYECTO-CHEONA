import React from 'react';
import { MapPin, Clock, Phone, Mail } from 'lucide-react';
import Button from '../components/ui/Button';

const HowToGet = () => {
  const tips = [
    'Recomendamos llegar durante horas de luz natural',
    'El último tramo es camino rural, conducir con precaución',
    'Desde Bogotá, tomar la ruta hacia La Mesa, Cundinamarca'
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Contenedor con padding para que el mapa quede bajo el header */}
      <div className="pt-20">
        {/* Mapa */}
        <div className="w-full h-[400px] bg-neutral-200">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125502.7819978526!2d-74.44416194252872!3d4.9152316974333505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e409d4ede2045d5%3A0x418832ed144e8d4b!2sFinca%20cheona!5e0!3m2!1ses-419!2sco!4v1750784668909!5m2!1ses-419!2sco" 
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      <div className="container-custom py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Información de ubicación */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="text-accent" size={24} />
              <h2 className="text-2xl font-bold">Finca Cheona</h2>
            </div>
            
            <p className="text-neutral-600 mb-4">
              Finca Cheona, La Mesa, Cundinamarca, Colombia
            </p>

            <div className="flex items-center gap-2 text-neutral-600 mb-6">
              <Clock size={20} />
              <span>Abierto: 8:00 AM - 6:00 PM</span>
            </div>

            <div className="text-sm text-neutral-500 font-mono mb-6">
              4.915232° N, 74.444162° W
            </div>

            <Button
              variant="primary"
              fullWidth
              className="bg-accent hover:bg-accent/90"
              onClick={() => window.open('https://www.google.com/maps?q=Finca+cheona+La+Mesa+Colombia')}
            >
              Obtener Direcciones
            </Button>
          </div>

          {/* Contacto Directo */}
          <div className="bg-accent rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">Contacto Directo</h2>
            <p className="mb-6">¿Necesitas ayuda para llegar? Llámanos:</p>
            
            <div className="space-y-4">
              <a 
                href="tel:+573001234567"
                className="flex items-center gap-3 bg-accent-dark/20 p-4 rounded-xl hover:bg-accent-dark/30 transition-colors"
              >
                <Phone size={20} />
                +57 300 123 4567
              </a>
              
              <a 
                href="mailto:contacto@fincacheona.com"
                className="flex items-center gap-3 bg-accent-dark/20 p-4 rounded-xl hover:bg-accent-dark/30 transition-colors"
              >
                <Mail size={20} />
                contacto@fincacheona.com
              </a>
            </div>
          </div>

          {/* Tips para Llegar */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Tips para Llegar</h2>
            <div className="space-y-4">
              {tips.map((tip, index) => (
                <div key={index} className="flex gap-4">
                  <div className="w-6 h-6 rounded-full bg-accent/10 text-accent flex items-center justify-center flex-shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-neutral-600">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowToGet;