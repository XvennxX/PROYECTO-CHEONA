import React, { useState, useEffect } from 'react';
import SectionTitle from '../components/ui/SectionTitle';
import { X } from 'lucide-react';
import { getGaleriaImagesByTipo } from '../services/galeriaService';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('todos');

  // Cargar imágenes desde el backend según su tipo
  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        // Obtener imágenes para cada tipo de alojamiento
        const fincaImages = await getGaleriaImagesByTipo('finca');
        const cabañaImages = await getGaleriaImagesByTipo('cabaña');
        const glampingImages = await getGaleriaImagesByTipo('glamping');

        // Formatear las imágenes con la estructura necesaria
        const processImages = (imagesList, category) => {
          return imagesList.map(path => {
            // Si ya es una URL completa, usarla directamente
            const src = path.startsWith('http') ? path : `http://localhost:8000${path}`;
            
            // Extraer un título a partir de la ruta del archivo
            const fileName = path.split('/').pop();
            const title = fileName.split('.')[0].replace(/_/g, ' ');
            
            return {
              src,
              category,
              title: title.charAt(0).toUpperCase() + title.slice(1)
            };
          });
        };

        // Combinar todas las imágenes
        const allImages = [
          ...processImages(fincaImages, 'finca'),
          ...processImages(cabañaImages, 'cabaña'),
          ...processImages(glampingImages, 'glamping')
        ];

        setImages(allImages);
      } catch (error) {
        console.error('Error al cargar imágenes:', error);
        // Si hay error, usar algunas imágenes predeterminadas como fallback
        setImages([
          {
            src: "https://images.pexels.com/photos/2507010/pexels-photo-2507010.jpeg",
            category: "finca",
            title: "Exterior finca"
          },
          {
            src: "https://images.pexels.com/photos/2724748/pexels-photo-2724748.jpeg",
            category: "cabaña",
            title: "Interior cabaña"
          },
          {
            src: "https://images.pexels.com/photos/1579253/pexels-photo-1579253.jpeg",
            category: "glamping",
            title: "Vista glamping"
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);
  
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
          subtitle="Descubre todos los rincones de Finca Cheona"
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
            onClick={() => setFilter('finca')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === 'finca' 
                ? 'bg-primary text-white' 
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
            }`}
          >
            Finca
          </button>
          <button
            onClick={() => setFilter('cabaña')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === 'cabaña' 
                ? 'bg-primary text-white' 
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
            }`}
          >
            Cabaña
          </button>
          <button
            onClick={() => setFilter('glamping')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === 'glamping' 
                ? 'bg-primary text-white' 
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
            }`}
          >
            Glamping
          </button>
        </div>
        
        {/* Estado de carga */}
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            {/* Mensaje si no hay imágenes */}
            {filteredImages.length === 0 && (
              <div className="text-center py-16">
                <p className="text-neutral-500">No hay imágenes disponibles para esta categoría.</p>
              </div>
            )}
            
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
                      <p className="text-white/80 text-sm">Tipo: {image.category}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
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