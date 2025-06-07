import React, { useState, useEffect } from 'react';
import RoomCard from '../ui/RoomCard';
import { reservationService } from '../../services/reservationService';

const GlampingSection = () => {
  const [glampingUnits, setGlampingUnits] = useState([]);

  useEffect(() => {
    const fetchGlampingUnits = async () => {
      const rooms = await reservationService.getRooms();
      const filteredUnits = (rooms || []).filter(room => room.type === 'glamping');
      setGlampingUnits(filteredUnits);
    };
    
    fetchGlampingUnits();
  }, []);

  return (
    <div className="space-y-8">
      {glampingUnits.map(unit => (
        <RoomCard 
          key={unit.id} 
          room={unit}
          showAvailabilityCalendar
          showCancellationPolicy
        />
      ))}
    </div>
  );
};

export default GlampingSection;