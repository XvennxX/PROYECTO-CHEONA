import React from 'react';
import ChatNotifications from '../../components/user/ChatNotifications';
import { useAuth } from '../../components/auth/AuthContext';

const Notifications = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-neutral-50 pt-20">
      <div className="container-custom py-12">
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h1 className="text-2xl font-bold mb-6">Notificaciones</h1>
          
          {/* Notificaciones de chat */}
          <ChatNotifications user={user} />
        </div>
      </div>
    </div>
  );
};

export default Notifications;