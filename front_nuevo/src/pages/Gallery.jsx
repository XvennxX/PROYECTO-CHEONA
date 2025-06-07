import React, { useState } from 'react';
import SectionTitle from '../components/ui/SectionTitle';
import { X } from 'lucide-react';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  
  const images = [
    {
      src: "https://images.pexels.com/photos/2507010/pexels-photo-2507010.jpeg",
      category: "exterior",
      title: "Fachada principal"
    },
    {
      src: "https://images.pexels.com/photos/2724748/pexels-photo-2724748.jpeg",
      category: "habitaciones",
      title: "Suite con vistas"
    },
    {
      src: "https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg",
      category: "exterior",
      title: "Jardines"
    },
    {
      src: "https://images.pexels.com/photos/2736388/pexels-photo-2736388.jpeg",
      category: "habitaciones",
      title: "Habitación doble"
    },
    {
      src: "https://images.pexels.com/photos/5490917/pexels-photo-5490917.jpeg",
      category: "gastronomia",
      title: "Desayuno"
    },
    {
      src: "https://images.pexels.com/photos/2659629/pexels-photo-2659629.jpeg",
      category: "habitaciones",
      title: "Cabaña El Pinar"
    },
    {
      src: "https://images.pexels.com/photos/3048524/pexels-photo-3048524.jpeg",
      category: "actividades",
      title: "Senderismo"
    },
    {
      src: "https://images.pexels.com/photos/6638576/pexels-photo-6638576.jpeg",
      category: "gastronomia",
      title: "Productos locales"
    },
    {
      src: "https://images.pexels.com/photos/1918291/pexels-photo-1918291.jpeg",
      category: "exterior",
      title: "Piscina"
    },
    {
      src: "https://images.pexels.com/photos/6121058/pexels-photo-6121058.jpeg",
      category: "actividades",
      title: "Yoga al aire libre"
    },
    {
      src: "https://images.pexels.com/photos/26135/pexels-photo-26135.jpg",
      category: "actividades",
      title: "Paseos a caballo"
    },
    {
      src: "https://images.pexels.com/photos/2263510/pexels-photo-2263510.jpeg",
      category: "gastronomia",
      title: "Cena romántica"
    }
  ];
  
  const [filter, setFilter] = useState('todos');
  
  const filteredImages = filter === 'todos' 
    ? images 
    : images.filter(img => img.category === filter);
  
  const openLightbox = (imageSrc) => {
    setSelectedImage(imageSrc);
    document.body.style.overflow = 'hidden';
  };
  
  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };
  
  return (
    <>
      {/* Banner */}
      <div className="relative h-64 md:h-80">
        <img
          src="https://images.pexels.com/photos/3540375/pexels-photo-3540375.jpeg"
          alt="Galería"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-white text-4xl md:text-5xl font-bold">Galería</h1>
        </div>
      </div>

      {/* Contenido */}
      <section className="section container-custom">
        <SectionTitle 
          title="Nuestra Finca en Imágenes" 
          subtitle="Descubre todos los rincones de Finca Los Olivos"
          centered
        />
        
        {/* Filtros */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <button
            onClick={() => setFilter('todos')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === 'todos' 
                ? 'bg-primary text-white' 
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => setFilter('exterior')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === 'exterior' 
                ? 'bg-primary text-white' 
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
            }`}
          >
            Exteriores
          </button>
          <button
            onClick={() => setFilter('habitaciones')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === 'habitaciones' 
                ? 'bg-primary text-white' 
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
            }`}
          >
            Habitaciones
          </button>
          <button
            onClick={() => setFilter('gastronomia')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === 'gastronomia' 
                ? 'bg-primary text-white' 
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
            }`}
          >
            Gastronomía
          </button>
          <button
            onClick={() => setFilter('actividades')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === 'actividades' 
                ? 'bg-primary text-white' 
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
            }`}
          >
            Actividades
          </button>
        </div>
        
        {/* Galería */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredImages.map((image, index) => (
            <div 
              key={index} 
              className="overflow-hidden rounded-lg cursor-pointer group relative"
              onClick={() => openLightbox(image.src)}
            >
              <img 
                src={image.src}
                alt={image.title}
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-end">
                <div className="p-4 w-full translate-y-full group-hover:translate-y-0 transition-transform">
                  <h3 className="text-white font-semibold">{image.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button 
            className="absolute top-4 right-4 text-white p-2 rounded-full bg-black/50 hover:bg-black/70"
            onClick={closeLightbox}
          >
            <X size={24} />
          </button>
          <img 
            src={selectedImage} 
            alt="Imagen ampliada" 
            className="max-w-full max-h-[90vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
};

export default Gallery;