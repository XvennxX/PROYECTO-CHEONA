import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { reservationService } from '../services/reservationService';
import Button from '../components/ui/Button';
import { ChevronLeft, ChevronRight, User, Check, CalendarDays, Loader } from 'lucide-react';

const RoomDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const loadRoom = async () => {
      if (!id) return;
      
      try {
        const roomData = await reservationService.getRoom(parseInt(id));
        if (roomData) {
          setRoom(roomData);
        } else {
          navigate('/habitaciones'); // Redirigir si no se encuentra la habitación
        }
      } catch (error) {
        console.error('Error al cargar la habitación:', error);
      } finally {
        setLoading(false);
      }
    };

    loadRoom();
  }, [id, navigate]);

  const nextImage = () => {
    if (room) {
      setCurrentImageIndex((prev) => (prev + 1) % room.images.length);
    }
  };

  const prevImage = () => {
    if (room) {
      setCurrentImageIndex((prev) => (prev - 1 + room.images.length) % room.images.length);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader className="animate-spin mr-2" size={24} />
        <span>Cargando detalles...</span>
      </div>
    );
  }

  if (!room) {
    return <div className="container-custom section">Habitación no encontrada</div>;
  }

  return (
    <div className="pt-20">
      {/* Galería de imágenes */}
      <div className="relative h-96 md:h-128">
        <img
          src={room.images[currentImageIndex]}
          alt={room.name}
          className="w-full h-full object-cover"
        />
        
        {/* Controles de la galería */}
        <div className="absolute inset-0 flex items-center justify-between p-4">
          <button
            onClick={prevImage}
            className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
            aria-label="Imagen anterior"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextImage}
            className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
            aria-label="Imagen siguiente"
          >
            <ChevronRight size={24} />
          </button>
        </div>
        
        {/* Indicadores de imagen */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
          {room.images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentImageIndex ? 'bg-white' : 'bg-white/50'
              }`}
              aria-label={`Ver imagen ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Detalles de la habitación */}
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Información principal */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{room.name}</h1>
            
            <div className="flex items-center text-neutral-600 mb-6">
              <User size={18} className="mr-1" />
              <span>Hasta {room.capacity} personas</span>
            </div>
            
            <div className="prose max-w-none mb-8">
              <p className="text-lg">{room.description}</p>
            </div>
            
            <h2 className="text-2xl font-semibold mb-4">Comodidades</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {room.amenities.map((amenity, index) => (
                <div key={index} className="flex items-center">
                  <Check size={18} className="text-primary mr-2 flex-shrink-0" />
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Sidebar */}
          <div>
            <div className="card p-6 sticky top-24">
              <div className="mb-4">
                <span className="text-3xl font-bold text-primary">{room.price}€</span>
                <span className="text-neutral-600 ml-1">/noche</span>
              </div>
              
              <div className="border-t border-b border-neutral-200 py-4 my-4">
                <div className="flex justify-between mb-2">
                  <span className="text-neutral-600">Impuestos:</span>
                  <span>Incluidos</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Desayuno:</span>
                  <span>{room.amenities.includes('Desayuno incluido') ? 'Incluido' : 'No incluido'}</span>
                </div>
              </div>
              
              <Button 
                to={`/reservar?room=${room.id}`} 
                variant="primary" 
                fullWidth 
                icon={<CalendarDays size={18} />}
                className="mb-3"
              >
                Reservar ahora
              </Button>
              
              <p className="text-center text-sm text-neutral-500">
                Sin cargos por cancelación hasta 7 días antes de la llegada
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetail;