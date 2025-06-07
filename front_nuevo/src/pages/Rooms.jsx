import React, { useState, useEffect } from 'react';
import SectionTitle from '../components/ui/SectionTitle';
import RoomCard from '../components/ui/RoomCard';
import { reservationService } from '../services/reservationService';
import { Loader } from 'lucide-react';

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRooms = async () => {
      try {
        const data = await reservationService.getRooms();
        setRooms(data);
      } catch (error) {
        console.error('Error al cargar habitaciones:', error);
      } finally {
        setLoading(false);
      }
    };

    loadRooms();
  }, []);

  return (
    <>
      {/* Banner */}
      <div className="relative h-64 md:h-80">
        <img
          src="https://images.pexels.com/photos/3617496/pexels-photo-3617496.jpeg"
          alt="Habitaciones y Cabañas"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-white text-4xl md:text-5xl font-bold">Nuestros Alojamientos</h1>
        </div>
      </div>

      {/* Contenido */}
      <section className="section container-custom">
        <SectionTitle 
          title="Habitaciones y Cabañas" 
          subtitle="Cada uno de nuestros alojamientos ha sido diseñado para ofrecerte una estancia inolvidable en armonía con la naturaleza"
        />
        
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader className="animate-spin mr-2" size={24} />
            <span>Cargando alojamientos...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {rooms.map(room => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default Rooms;