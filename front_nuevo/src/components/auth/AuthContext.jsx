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

  const login = (userData, token, expiresIn) => {
    setUser(userData);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userData', JSON.stringify(userData));
    localStorage.setItem('token', token);
    // Guardar timestamp de expiración (segundos UNIX)
    localStorage.setItem('tokenExp', (Math.floor(Date.now() / 1000) + expiresIn).toString());
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userData');
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExp');
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