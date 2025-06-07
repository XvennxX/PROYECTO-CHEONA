import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check authentication status on mount
    const checkAuth = () => {
      const isAuth = localStorage.getItem('isAuthenticated');
      const userData = localStorage.getItem('userData');
      
      if (isAuth === 'true' && userData) {
        try {
          setUser(JSON.parse(userData));
        } catch (e) {
          // Si hay un error al parsear, limpiamos el localStorage
          localStorage.removeItem('isAuthenticated');
          localStorage.removeItem('userData');
          setUser(null);
        }
      } else {
        // Si no hay autenticación válida, limpiamos el localStorage
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('userData');
        setUser(null);
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userData', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userData');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
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