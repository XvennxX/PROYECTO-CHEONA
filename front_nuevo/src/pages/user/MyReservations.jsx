import React, { useState } from 'react';
import Button from '../../components/ui/Button';
import { Calendar, Search, Filter } from 'lucide-react';

const MyReservations = () => {
  const [filter, setFilter] = useState('all');

  const reservations = [
    {
      id: 1,
      name: "Cabaña El Roble",
      dates: "27 - 29 Mayo, 2025",
      status: "confirmed",
      image: "https://images.pexels.com/photos/2662816/pexels-photo-2662816.jpeg",
      price: "1.200.000"
    },
    {
      id: 2,
      name: "Domo Celestial",
      dates: "15 - 17 Junio, 2025",
      status: "pending",
      image: "https://images.pexels.com/photos/2506988/pexels-photo-2506988.jpeg",
      price: "800.000"
    },
    {
      id: 3,
      name: "Cabaña El Valle",
      dates: "1 - 3 Julio, 2025",
      status: "completed",
      image: "https://images.pexels.com/photos/2659629/pexels-photo-2659629.jpeg",
      price: "950.000"
    }
  ];

  const statusStyles = {
    confirmed: "bg-green-100 text-green-800",
    pending: "bg-yellow-100 text-yellow-800",
    completed: "bg-blue-100 text-blue-800"
  };

  const statusText = {
    confirmed: "Confirmada",
    pending: "Pendiente",
    completed: "Completada"
  };

  return (
    <div className="min-h-screen bg-neutral-50 pt-20">
      <div className="container-custom py-12">
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold">Mis Reservas</h1>
            
            <div className="flex gap-4">
              <div className="relative">
                <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Buscar reservas..."
                  className="pl-10 input h-10"
                />
              </div>
              
              <div className="flex bg-neutral-100 rounded-lg p-1">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    filter === 'all' ? 'bg-white shadow text-primary' : 'text-neutral-600'
                  }`}
                >
                  Todas
                </button>
                <button
                  onClick={() => setFilter('active')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    filter === 'active' ? 'bg-white shadow text-primary' : 'text-neutral-600'
                  }`}
                >
                  Activas
                </button>
                <button
                  onClick={() => setFilter('past')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    filter === 'past' ? 'bg-white shadow text-primary' : 'text-neutral-600'
                  }`}
                >
                  Pasadas
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {reservations.map(reservation => (
              <div key={reservation.id} className="flex gap-4 p-4 border border-neutral-100 rounded-xl hover:bg-neutral-50 transition-colors">
                <div className="w-32 h-24 rounded-lg overflow-hidden">
                  <img
                    src={reservation.image}
                    alt={reservation.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{reservation.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[reservation.status]}`}>
                      {statusText[reservation.status]}
                    </span>
                  </div>
                  
                  <div className="flex items-center text-neutral-600 mb-3">
                    <Calendar size={16} className="mr-2" />
                    <span className="text-sm">{reservation.dates}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold">$ {reservation.price}</span>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Ver detalles</Button>
                      {reservation.status !== 'completed' && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-red-600 hover:bg-red-50"
                        >
                          Cancelar
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyReservations;