import React, { useState } from 'react';
import { useAuth } from '../../components/auth/AuthContext';
import { Camera, Mail, Phone, MapPin, Calendar, Edit2, Save, X } from 'lucide-react';
import Button from '../../components/ui/Button';

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+57 300 123 4567',
    location: 'Bogotá, Colombia',
    bio: 'Amante de la naturaleza y los viajes.',
    joinDate: 'Marzo 2025',
    totalReservations: 5
  });

  const handleSave = () => {
    setIsEditing(false);
    // Aquí iría la lógica para guardar los cambios
  };

  return (
    <div className="min-h-screen bg-neutral-50 pt-20">
      <div className="container-custom py-12">
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="flex items-center gap-6 mb-8">
            <div className="relative">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-neutral-100">
                <img
                  src={user?.avatar || 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg'}
                  alt="Foto de perfil"
                  className="w-full h-full object-cover"
                />
              </div>
              <button className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full hover:bg-primary-dark transition-colors">
                <Camera size={16} />
              </button>
            </div>

            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-2xl font-bold">{profileData.name}</h1>
                {!isEditing ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditing(true)}
                    icon={<Edit2 size={16} />}
                  >
                    Editar
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsEditing(false)}
                      icon={<X size={16} />}
                    >
                      Cancelar
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={handleSave}
                      icon={<Save size={16} />}
                    >
                      Guardar
                    </Button>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center text-neutral-600">
                  <Mail size={16} className="mr-2" />
                  {isEditing ? (
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      className="input h-8 text-sm"
                    />
                  ) : (
                    profileData.email
                  )}
                </div>
                <div className="flex items-center text-neutral-600">
                  <Phone size={16} className="mr-2" />
                  {isEditing ? (
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                      className="input h-8 text-sm"
                    />
                  ) : (
                    profileData.phone
                  )}
                </div>
                <div className="flex items-center text-neutral-600">
                  <MapPin size={16} className="mr-2" />
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.location}
                      onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                      className="input h-8 text-sm"
                    />
                  ) : (
                    profileData.location
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-2">Biografía</h2>
            {isEditing ? (
              <textarea
                value={profileData.bio}
                onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                className="input"
                rows={3}
              />
            ) : (
              <p className="text-neutral-600">{profileData.bio}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-neutral-50 rounded-xl p-4">
              <div className="flex items-center gap-2 text-neutral-600 mb-1">
                <Calendar size={16} />
                <span className="text-sm">Miembro desde</span>
              </div>
              <p className="font-semibold">{profileData.joinDate}</p>
            </div>
            <div className="bg-neutral-50 rounded-xl p-4">
              <div className="flex items-center gap-2 text-neutral-600 mb-1">
                <Calendar size={16} />
                <span className="text-sm">Total reservas</span>
              </div>
              <p className="font-semibold">{profileData.totalReservations}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;