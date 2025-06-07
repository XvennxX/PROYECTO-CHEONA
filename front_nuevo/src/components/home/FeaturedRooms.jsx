import React, { useState, useEffect } from 'react';
import SectionTitle from '../ui/SectionTitle';
import RoomCard from '../ui/RoomCard';
import Button from '../ui/Button';
import { reservationService } from '../../services/reservationService';
import { ChevronRight } from 'lucide-react';

const FeaturedRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRooms = async () => {
      try {
        const data = await reservationService.getRooms();
        setRooms(data.slice(0, 3)); // Mostrar solo las 3 primeras
      } catch (error) {
        console.error('Error al cargar habitaciones:', error);
      } finally {
        setLoading(false);
      }
    };

    loadRooms();
  }, []);

  if (loading) {
    return (
      <div className="section container-custom">
        <SectionTitle 
          title="Nuestros Alojamientos" 
          subtitle="Descubre nuestras acogedoras opciones de hospedaje"
        />
        <div className="grid grid-cols-1 gap-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="card animate-pulse">
              <div className="h-64 bg-neutral-200"></div>
              <div className="p-6">
                <div className="h-6 bg-neutral-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-neutral-200 rounded w-1/2 mb-3"></div>
                <div className="h-20 bg-neutral-200 rounded mb-4"></div>
                <div className="flex justify-between items-center">
                  <div className="h-8 bg-neutral-200 rounded w-1/4"></div>
                  <div className="h-10 bg-neutral-200 rounded w-1/3"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <section className="section container-custom">
      <SectionTitle 
        title="Nuestros Alojamientos" 
        subtitle="Descubre nuestras acogedoras opciones de hospedaje"
      />
      
      <div className="grid grid-cols-1 gap-8">
        {rooms.map((room, index) => (
          <RoomCard key={room.id} room={room} featured={index === 0} />
        ))}
      </div>
      
      <div className="mt-10 text-center">
        <Button 
          to="/habitaciones" 
          variant="outline"
          icon={<ChevronRight size={18} />}
          iconPosition="right"
        >
          Ver todos los alojamientos
        </Button>
      </div>
    </section>
  );
};

export default FeaturedRooms;