import React from 'react';
import { MapPin, Clock, Phone, Mail } from 'lucide-react';
import Button from '../components/ui/Button';

const HowToGet = () => {
  const tips = [
    'Recomendamos llegar durante horas de luz natural',
    'El último tramo es camino de lastre, conducir con precaución',
    'Hay señalización en los puntos principales del recorrido'
  ];

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Mapa */}
      <div className="w-full h-[400px] bg-neutral-200">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15721.550083814584!2d-84.12836508363646!3d9.951651424751926!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fa0e342c50d15c5%3A0xe6746a6a9f11b882!2sSan%20Jos%C3%A9%20Province%2C%20San%20Jos%C3%A9%2C%20Costa%20Rica!5e0!3m2!1sen!2s!4v1650000000000!5m2!1sen!2s"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
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
              Calle Yerbabuena, San José Province, San José, Costa Rica
            </p>

            <div className="flex items-center gap-2 text-neutral-600 mb-6">
              <Clock size={20} />
              <span>Abierto: 8:00 AM - 6:00 PM</span>
            </div>

            <div className="text-sm text-neutral-500 font-mono mb-6">
              9.951651° N, 84.128365° W
            </div>

            <Button
              variant="primary"
              fullWidth
              className="bg-accent hover:bg-accent/90"
              onClick={() => window.open('https://maps.google.com')}
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
                href="tel:+12345678890"
                className="flex items-center gap-3 bg-accent-dark/20 p-4 rounded-xl hover:bg-accent-dark/30 transition-colors"
              >
                <Phone size={20} />
                +1 234 567 890
              </a>
              
              <a 
                href="mailto:info@fincacheona.com"
                className="flex items-center gap-3 bg-accent-dark/20 p-4 rounded-xl hover:bg-accent-dark/30 transition-colors"
              >
                <Mail size={20} />
                info@fincacheona.com
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