import React, { createContext, useContext, useState, useEffect } from 'react';
import Toast from '../ui/Toast';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({
    show: false,
    message: '',
    type: 'success'
  });
  const [toastQueue, setToastQueue] = useState([]);

  useEffect(() => {
    // Check authentication status on mount
    const checkAuth = () => {
      const isAuth = localStorage.getItem('isAuthenticated');
      const userData = localStorage.getItem('userData');
      const token = localStorage.getItem('token');
      const tokenExp = localStorage.getItem('tokenExp');
      if (isAuth === 'true' && userData && token && tokenExp) {
        // Verificar expiración del token
        const now = Math.floor(Date.now() / 1000);
        if (Number(tokenExp) > now) {
          try {
            setUser(JSON.parse(userData));
          } catch (e) {
            localStorage.removeItem('isAuthenticated');
            localStorage.removeItem('userData');
            localStorage.removeItem('token');
            localStorage.removeItem('tokenExp');
            setUser(null);
          }
        } else {
          // Token expirado
          localStorage.removeItem('isAuthenticated');
          localStorage.removeItem('userData');
          localStorage.removeItem('token');
          localStorage.removeItem('tokenExp');
          setUser(null);
        }
      } else {
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('userData');
        localStorage.removeItem('token');
        localStorage.removeItem('tokenExp');
        setUser(null);
      }
      setLoading(false);
    };
    checkAuth();
  }, []);

  const login = (userData, token, expiresIn, isNewAccount = false) => {
    setUser(userData);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userData', JSON.stringify(userData));
    localStorage.setItem('token', token);
    // Guardar timestamp de expiración (segundos UNIX)
    localStorage.setItem('tokenExp', (Math.floor(Date.now() / 1000) + expiresIn).toString());
    
    if (isNewAccount) {
      // Para cuentas nuevas, mostrar primero mensaje de cuenta creada y luego bienvenida
      showMultipleToasts([
        {
          message: '¡Cuenta creada con éxito!',
          type: 'success'
        },
        {
          message: `¡Bienvenido/a a Finca Cheona, ${userData.nombre}!`,
          type: 'success'
        }
      ]);
    } else {
      // Para inicios de sesión normales, solo mostrar mensaje de bienvenida
      setToast({
        show: true,
        message: `¡Bienvenido/a a Finca Cheona, ${userData.nombre}!`,
        type: 'success'
      });
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userData');
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExp');
  };
  
  const hideToast = () => {
    setToast({...toast, show: false});
    
    // Si hay toasts en cola, mostrar el siguiente después de un pequeño retraso
    setTimeout(() => {
      if (toastQueue.length > 0) {
        const nextToast = toastQueue[0];
        setToast({
          show: true,
          message: nextToast.message,
          type: nextToast.type
        });
        setToastQueue(toastQueue.slice(1));
      }
    }, 500);
  };
  
  const showMultipleToasts = (toasts) => {
    if (toasts.length === 0) return;
    
    // Mostrar el primer toast inmediatamente
    setToast({
      show: true,
      message: toasts[0].message,
      type: toasts[0].type
    });
    
    // Encolar el resto de toasts
    if (toasts.length > 1) {
      setToastQueue(toasts.slice(1));
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, showMultipleToasts }}>
      {children}
      <Toast 
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={hideToast}
        duration={3000}
      />
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};