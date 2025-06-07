import React, { useState } from 'react';
import { Bell, Lock, CreditCard, Globe, Trash2, LogOut } from 'lucide-react';
import Button from '../../components/ui/Button';
import { useAuth } from '../../components/auth/AuthContext';

const Settings = () => {
  const { logout, token } = useAuth();
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    marketing: false
  });
  const [deleting, setDeleting] = useState(false); // Nuevo estado para deshabilitar botón

  // Función para eliminar la cuenta
  const handleDeleteAccount = async () => {
    console.log("Intentando eliminar cuenta"); // Depuración
    const userToken = token || localStorage.getItem('token'); // <-- Cambia aquí
    if (!userToken) {
      alert('No hay sesión activa. Por favor inicia sesión de nuevo.');
      return;
    }
    if (!window.confirm('¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.')) return;
    setDeleting(true);
    try {
      const res = await fetch('http://localhost:8000/usuarios/delete', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${userToken}`,
          'Content-Type': 'application/json'
        }
      });
      let data = null;
      const text = await res.text();
      try {
        data = text ? JSON.parse(text) : {};
      } catch (e) {
        data = {};
      }
      if (res.ok) {
        alert('Cuenta eliminada exitosamente');
        localStorage.removeItem('token');
        logout();
      } else {
        alert((data && data.detail) || 'Error al eliminar la cuenta');
      }
    } catch (err) {
      alert('Error de red o del servidor: ' + err.message);
      console.error(err);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 pt-20">
      <div className="container-custom py-12">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Notificaciones */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <Bell size={24} className="text-primary" />
              <h2 className="text-xl font-bold">Notificaciones</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Notificaciones por email</h3>
                  <p className="text-sm text-neutral-600">Recibe actualizaciones sobre tus reservas</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.email}
                    onChange={(e) => setNotifications({...notifications, email: e.target.checked})}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Notificaciones push</h3>
                  <p className="text-sm text-neutral-600">Recibe notificaciones en tu navegador</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.push}
                    onChange={(e) => setNotifications({...notifications, push: e.target.checked})}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Comunicaciones de marketing</h3>
                  <p className="text-sm text-neutral-600">Recibe ofertas y novedades</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications.marketing}
                    onChange={(e) => setNotifications({...notifications, marketing: e.target.checked})}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Seguridad */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <Lock size={24} className="text-primary" />
              <h2 className="text-xl font-bold">Seguridad</h2>
            </div>
            
            <div className="space-y-4">
              <Button
                variant="outline"
                fullWidth
                className="justify-start h-12"
              >
                Cambiar contraseña
              </Button>
              <Button
                variant="outline"
                fullWidth
                className="justify-start h-12"
              >
                Verificación en dos pasos
              </Button>
              <Button
                variant="outline"
                fullWidth
                className="justify-start h-12"
              >
                Dispositivos conectados
              </Button>
            </div>
          </div>

          {/* Pagos */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <CreditCard size={24} className="text-primary" />
              <h2 className="text-xl font-bold">Métodos de pago</h2>
            </div>
            
            <div className="space-y-4">
              <Button
                variant="outline"
                fullWidth
                className="justify-start h-12"
              >
                Agregar método de pago
              </Button>
              <Button
                variant="outline"
                fullWidth
                className="justify-start h-12"
              >
                Ver historial de pagos
              </Button>
            </div>
          </div>

          {/* Preferencias */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <Globe size={24} className="text-primary" />
              <h2 className="text-xl font-bold">Preferencias</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Idioma
                </label>
                <select className="input h-12">
                  <option value="es">Español</option>
                  <option value="en">English</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Moneda
                </label>
                <select className="input h-12">
                  <option value="COP">Peso Colombiano (COP)</option>
                  <option value="USD">US Dollar (USD)</option>
                  <option value="EUR">Euro (EUR)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Acciones de cuenta */}
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-bold text-red-600 mb-6">Acciones de cuenta</h2>
            
            <div className="space-y-4">
              <Button
                variant="outline"
                fullWidth
                className="justify-start h-12 text-red-600 hover:bg-red-50"
                icon={<LogOut size={18} />}
                onClick={logout}
              >
                Cerrar sesión
              </Button>
              <Button
                variant="outline"
                fullWidth
                className="justify-start h-12 text-red-600 hover:bg-red-50"
                icon={<Trash2 size={18} />}
                onClick={handleDeleteAccount}
                disabled={deleting} // Deshabilita mientras elimina
              >
                {deleting ? 'Eliminando...' : 'Eliminar cuenta'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;