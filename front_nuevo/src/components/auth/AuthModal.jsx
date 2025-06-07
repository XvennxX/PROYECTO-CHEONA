import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const AuthModal = ({ isOpen, onClose, initialView = 'login' }) => {
  const [view, setView] = useState(initialView);

  useEffect(() => {
    setView(initialView);
  }, [initialView]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[400px] relative transform transition-all duration-300 scale-100 animate-slide-up">
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-neutral-500 hover:text-neutral-700 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="p-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2 text-primary">
              {view === 'login' ? 'Bienvenido de nuevo' : 'Únete a nosotros'}
            </h2>
            <p className="text-sm text-neutral-600">
              {view === 'login' 
                ? 'Accede a tu cuenta para gestionar tus reservas'
                : 'Crea tu cuenta y disfruta de beneficios exclusivos'}
            </p>
          </div>

          {view === 'login' ? (
            <LoginForm onClose={onClose} />
          ) : (
            <RegisterForm onClose={onClose} />
          )}

          <div className="mt-6 text-center">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-neutral-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-neutral-500">
                  {view === 'login' ? '¿Nuevo en Finca Cheona?' : '¿Ya tienes cuenta?'}
                </span>
              </div>
            </div>

            <button 
              onClick={() => setView(view === 'login' ? 'register' : 'login')}
              className="mt-4 text-primary hover:text-primary-dark font-medium transition-colors"
            >
              {view === 'login' ? 'Crear una cuenta' : 'Iniciar sesión'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;