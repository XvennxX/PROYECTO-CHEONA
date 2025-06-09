import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, TreePine, User, LogOut, Calendar, HelpCircle, Settings, LayoutDashboard, Bell } from 'lucide-react';
import AuthModal from '../auth/AuthModal';
import Button from '../ui/Button';
import { useAuth } from '../auth/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalView, setAuthModalView] = useState('login');
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isUserMenuOpen && !event.target.closest('.user-menu')) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isUserMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsUserMenuOpen(false);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
  };

  const handleAuthClick = (view) => {
    setAuthModalView(view);
    setIsAuthModalOpen(true);
    closeMenu();
  };

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    setIsMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const navigationItems = [
    ['/', 'Inicio'],
    ['/reservar', 'Reserva'],
    ['/servicios', 'Planes & Servicios'],
    ['/como-llegar', 'Cómo Llegar'],
  ];

  const userMenuItems = [
    { icon: <User size={18} />, label: 'Mi Perfil', path: '/perfil' },
    { icon: <Calendar size={18} />, label: 'Mis Reservas', path: '/mis-reservas' },
    { icon: <HelpCircle size={18} />, label: 'Ayuda', path: '/ayuda' },
    { icon: <Settings size={18} />, label: 'Configuración', path: '/configuracion' },
  ];

  // Si el usuario es admin, agregar el enlace al dashboard
  if (user?.rol === 'admin') {
    userMenuItems.unshift({ 
      icon: <LayoutDashboard size={18} />, 
      label: 'Dashboard', 
      path: '/admin' 
    });
  }

  // Lista de rutas que deben tener header transparente
  const transparentHeaderPaths = ['/', '/reservar', '/servicios', '/como-llegar'];
  const shouldBeTransparent = transparentHeaderPaths.includes(location.pathname);

  // Número de notificaciones no leídas (ejemplo)
  const unreadNotifications = 3;

  return (
    <>
      <header 
        className={`fixed w-full z-50 transition-all duration-500 ${
          isScrolled || !shouldBeTransparent
            ? 'bg-white shadow-lg' 
            : 'bg-transparent'
        }`}
      >
        <div className="container-custom">
          <nav className="flex items-center justify-between h-20 w-full">
            {/* Logo */}
            <Link to="/" className="flex items-center group">
              <div className="flex items-center space-x-3">
                <TreePine 
                  size={32} 
                  className={`transition-colors duration-300 ${
                    isScrolled || !shouldBeTransparent ? 'text-primary' : 'text-white'
                  }`}
                  strokeWidth={1.5}
                />
                <div className="flex flex-col -space-y-1">
                  <span className={`text-2xl font-bold font-heading tracking-wide transition-colors leading-tight ${
                    isScrolled || !shouldBeTransparent ? 'text-primary' : 'text-white'
                  }`}>
                    Finca
                  </span>
                  <span className={`text-xl font-medium font-heading tracking-wide transition-colors ${
                    isScrolled || !shouldBeTransparent ? 'text-primary' : 'text-white'
                  }`}>
                    Cheona
                  </span>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center justify-center flex-1 mx-12">
              {navigationItems.map(([path, label]) => (
                <Link
                  key={path}
                  to={path}
                  className={`px-5 py-2.5 mx-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    isActive(path)
                      ? isScrolled || !shouldBeTransparent
                        ? 'bg-primary/10 text-primary'
                        : 'bg-white/20 text-white'
                      : isScrolled || !shouldBeTransparent
                        ? 'text-neutral-700 hover:bg-neutral-100'
                        : 'text-white/90 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {label}
                </Link>
              ))}
            </div>

            {/* Auth Buttons or User Menu */}
            <div className="hidden md:flex items-center space-x-3">
              {user ? (
                <>
                  {/* Notifications Button */}
                  <Link
                    to="/notificaciones"
                    className={`relative p-2 rounded-full transition-colors ${
                      isScrolled || !shouldBeTransparent
                        ? 'hover:bg-neutral-100 text-neutral-700'
                        : 'text-white hover:bg-white/10'
                    }`}
                  >
                    <Bell size={20} />
                    {unreadNotifications > 0 && (
                      <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">
                        {unreadNotifications}
                      </span>
                    )}
                  </Link>
                  
                  <div className="relative user-menu">
                    <button
                      onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-colors ${
                        isScrolled || !shouldBeTransparent
                          ? 'hover:bg-neutral-100 text-neutral-700' 
                          : 'text-white hover:bg-white/10'
                      }`}
                    >
                      <User size={20} />
                      <span className="font-medium">{user.nombre}</span>
                    </button>

                    {/* User Dropdown Menu */}
                    {isUserMenuOpen && (
                      <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg py-2 animate-fade-in">
                        {userMenuItems.map((item, index) => (
                          <Link
                            key={index}
                            to={item.path}
                            className="flex items-center space-x-3 px-4 py-2 text-neutral-700 hover:bg-neutral-50"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            {item.icon}
                            <span>{item.label}</span>
                          </Link>
                        ))}
                        <button
                          onClick={handleLogout}
                          className="flex items-center space-x-3 px-4 py-2 text-red-600 hover:bg-red-50 w-full"
                        >
                          <LogOut size={18} />
                          <span>Cerrar Sesión</span>
                        </button>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleAuthClick('login')}
                    className={`rounded-full px-5 transition-all duration-300 ${
                      !isScrolled && shouldBeTransparent
                        ? 'border-white text-white hover:bg-white hover:text-primary' 
                        : 'hover:bg-primary/10'
                    }`}
                  >
                    Acceder
                  </Button>
                  <Button 
                    variant="primary" 
                    size="sm"
                    onClick={() => handleAuthClick('register')}
                    className="rounded-full px-5 transition-all duration-300"
                  >
                    Registrarse
                  </Button>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className={`md:hidden p-2 transition-colors ${
                isScrolled || !shouldBeTransparent ? 'text-neutral-700' : 'text-white'
              } hover:text-primary focus:outline-none`}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </nav>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white absolute w-full left-0 top-full shadow-lg py-4 animate-slide-up">
            <div className="container-custom flex flex-col space-y-2">
              {navigationItems.map(([path, label]) => (
                <Link
                  key={path}
                  to={path}
                  onClick={closeMenu}
                  className={`px-5 py-3 rounded-xl transition-colors ${
                    isActive(path)
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'text-neutral-700 hover:bg-neutral-100'
                  }`}
                >
                  {label}
                </Link>
              ))}
              
              {user ? (
                <>
                  {/* Mobile Notifications Link */}
                  <Link
                    to="/notificaciones"
                    onClick={closeMenu}
                    className="flex items-center space-x-3 px-5 py-3 rounded-xl text-neutral-700 hover:bg-neutral-100"
                  >
                    <Bell size={18} />
                    <span>Notificaciones</span>
                    {unreadNotifications > 0 && (
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        {unreadNotifications}
                      </span>
                    )}
                  </Link>
                  
                  {userMenuItems.map((item, index) => (
                    <Link
                      key={index}
                      to={item.path}
                      onClick={closeMenu}
                      className="flex items-center space-x-3 px-5 py-3 rounded-xl text-neutral-700 hover:bg-neutral-100"
                    >
                      {item.icon}
                      <span>{item.label}</span>
                    </Link>
                  ))}
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-3 px-5 py-3 rounded-xl text-red-600 hover:bg-red-50 w-full"
                  >
                    <LogOut size={18} />
                    <span>Cerrar Sesión</span>
                  </button>
                </>
              ) : (
                <div className="pt-4 border-t border-neutral-200 mt-2">
                  <div className="flex flex-col space-y-3 px-4">
                    <Button 
                      variant="outline" 
                      fullWidth
                      onClick={() => handleAuthClick('login')}
                      className="rounded-full py-3"
                    >
                      Acceder
                    </Button>
                    <Button 
                      variant="primary" 
                      fullWidth
                      onClick={() => handleAuthClick('register')}
                      className="rounded-full py-3"
                    >
                      Registrarse
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialView={authModalView}
      />
    </>
  );
};

export default Header;