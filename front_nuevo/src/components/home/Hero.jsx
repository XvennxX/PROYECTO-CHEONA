import React from 'react';
import { ChevronRight, CalendarDays } from 'lucide-react';
import Button from '../ui/Button';

const Hero = () => {
  return (
    <div className="relative h-screen min-h-[600px] max-h-[800px]">
      <div className="absolute inset-0 z-0">
        <img
          src="http://localhost:8000/static/alojamientos/finca/Imagen de WhatsApp 2025-03-10 a las 19.58.48_e6dd73b0 (1).jpg"
          alt="Finca Cheona"
          className="w-full h-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/20"></div>
      </div>
      
      <div className="container-custom relative z-10 h-full flex flex-col justify-center items-center">
        <div className="max-w-4xl text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight slide-up text-white">
            Finca Cheona
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90 slide-up font-light" style={{ animationDelay: '0.2s' }}>
            Donde los sueños se convierten en momentos inolvidables
          </p>
          <div className="flex justify-center slide-up" style={{ animationDelay: '0.3s' }}>
            <Button 
              to="/reservar" 
              variant="primary" 
              size="sm"
              icon={<CalendarDays size={18} />}
              className="w-full sm:w-auto px-6 py-2.5 text-sm"
            >
              Reservar ahora
            </Button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-pulse">
        <div className="w-8 h-12 rounded-full border-2 border-white flex items-start justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse-slow"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;