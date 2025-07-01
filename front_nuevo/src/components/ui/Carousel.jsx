import React, { useState } from 'react';

// Imagen de respaldo si hay error
const FALLBACK_IMAGE = 'https://placehold.co/600x400/e2e8f0/475569?text=Imagen+no+disponible';

const Carousel = ({ images = [], alt = '' }) => {
  const [current, setCurrent] = useState(0);
  const [error, setError] = useState(false);
  
  // Si no hay imágenes, mostrar imagen por defecto
  if (!images || images.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded-xl">
        <img 
          src={FALLBACK_IMAGE}
          alt="Sin imagen disponible" 
          className="w-full h-full object-cover rounded-xl"
          style={{ minHeight: 180 }}
        />
      </div>
    );
  }

  const prev = (e) => {
    if (e) e.stopPropagation();
    setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
    setError(false);
  };
  
  const next = (e) => {
    if (e) e.stopPropagation();
    setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));
    setError(false);
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center group select-none">      <img
      src={error ? FALLBACK_IMAGE : images[current]}
      alt={alt || 'Imagen de alojamiento'}
      className="w-full h-full object-cover rounded-xl transition-all duration-500 shadow-lg"
      style={{ minHeight: 180 }}
      onError={(e) => {
        console.log('Error al cargar imagen:', images[current]);
        setError(true);
      }}
    />
      
    {images.length > 1 && (
      <>
        {/* Overlay para mejor contraste */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent rounded-lg pointer-events-none transition-all duration-300" />
        {/* Flechas */}
        <button
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-primary hover:text-white text-primary rounded-full p-2 shadow-lg z-10 text-2xl font-bold opacity-0 group-hover:opacity-100 transition-all duration-200"
          aria-label="Anterior"
        >
            &#8592;
        </button>
        <button
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-primary hover:text-white text-primary rounded-full p-2 shadow-lg z-10 text-2xl font-bold opacity-0 group-hover:opacity-100 transition-all duration-200"
          aria-label="Siguiente"
        >
            &#8594;
        </button>
        {/* Indicadores */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {images.map((_, i) => (
            <span
              key={i}
              className={`inline-block w-3 h-3 rounded-full border-2 ${i === current ? 'bg-green-600 border-white scale-110' : 'bg-white/70 border-green-600'} transition-all duration-200`}
              style={{ boxShadow: i === current ? '0 0 6px #16a34a' : undefined }}
            ></span>
          ))}
        </div>
      </>
    )}
    </div>
  );
};

export default Carousel;
