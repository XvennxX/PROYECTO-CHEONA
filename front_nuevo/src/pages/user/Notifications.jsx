import React from 'react';
import { Bell, Calendar, DollarSign, AlertCircle } from 'lucide-react';

const Notifications = () => {
  const notifications = [
    {
      id: 1,
      type: 'reservation',
      message: 'Tu reserva para "Cabaña El Roble" ha sido confirmada',
      date: '2025-03-20',
      read: false
    },
    {
      id: 2,
      type: 'payment',
      message: 'Pago recibido por $800.000',
      date: '2025-03-19',
      read: true
    },
    {
      id: 3,
      type: 'system',
      message: 'Tu contraseña fue actualizada exitosamente',
      date: '2025-03-18',
      read: true
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-50 pt-20">
      <div className="container-custom py-12">
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h1 className="text-2xl font-bold mb-6">Notificaciones</h1>
          
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`flex items-start gap-4 p-4 rounded-xl transition-colors ${
                  notification.read ? 'bg-white' : 'bg-primary/5'
                } hover:bg-neutral-50`}
              >
                <div className={`p-2 rounded-full ${
                  notification.type === 'reservation'
                    ? 'bg-blue-100 text-blue-600'
                    : notification.type === 'payment'
                    ? 'bg-green-100 text-green-600'
                    : 'bg-yellow-100 text-yellow-600'
                }`}>
                  {notification.type === 'reservation' ? (
                    <Calendar size={20} />
                  ) : notification.type === 'payment' ? (
                    <DollarSign size={20} />
                  ) : (
                    <AlertCircle size={20} />
                  )}
                </div>
                
                <div className="flex-1">
                  <p className={`${!notification.read ? 'font-medium' : ''}`}>
                    {notification.message}
                  </p>
                  <p className="text-sm text-neutral-500 mt-1">
                    {new Date(notification.date).toLocaleDateString()}
                  </p>
                </div>

                {!notification.read && (
                  <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;