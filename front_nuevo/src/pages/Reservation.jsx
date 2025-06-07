import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ReservationForm from '../components/reservation/ReservationForm';
import SectionTitle from '../components/ui/SectionTitle';

const Reservation = () => {
  const [searchParams] = useSearchParams();
  const initialType = searchParams.get('type') || 'cabin';

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <div className="relative h-[400px] w-full">
        <img
          src="https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg"
          alt="Reservas"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Reserva tu Estancia
          </h1>
          <p className="text-xl text-white/90 max-w-2xl">
            Elige entre nuestras opciones de alojamiento y vive una experiencia única
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container-custom py-12">
        <SectionTitle 
          title="Selecciona tu Alojamiento"
          subtitle="Encuentra el espacio perfecto para tu escapada"
          centered
        />

        <div className="mt-8">
          <ReservationForm preselectedType={initialType} />
        </div>
      </div>
    </div>
  );
};

export default Reservation;