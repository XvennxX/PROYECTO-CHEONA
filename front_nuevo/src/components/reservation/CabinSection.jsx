import React, { useState, useEffect } from 'react';
import RoomCard from '../ui/RoomCard';
import { reservationService } from '../../services/reservationService';

const CabinSection = () => {
  const [cabins, setCabins] = useState([]);

  useEffect(() => {
    const fetchCabins = async () => {
      const rooms = await reservationService.getRooms();
      const filteredCabins = (rooms || []).filter(room => room.type === 'cabin');
      setCabins(filteredCabins);
    };
    
    fetchCabins();
  }, []);

  return (
    <div className="space-y-8">
      {cabins.map(cabin => (
        <RoomCard 
          key={cabin.id} 
          room={cabin}
          showAvailabilityCalendar
          showCancellationPolicy
        />
      ))}
    </div>
  );
};

export default CabinSection;