import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';

const Toast = ({ message, show, onClose, duration = 3000, type = 'success' }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => {
          onClose && onClose();
        }, 300); // Tiempo para la animación de salida
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  if (!show && !isVisible) return null;

  // Definimos los estilos según el tipo de toast
  const toastStyles = {
    success: 'bg-green-50 border-green-500 text-green-700',
    error: 'bg-red-50 border-red-500 text-red-700',
    warning: 'bg-yellow-50 border-yellow-500 text-yellow-700',
    info: 'bg-blue-50 border-blue-500 text-blue-700',
  };

  return (
    <div
      className={`fixed top-4 right-4 z-50 max-w-md transform transition-all duration-300 ease-in-out ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'
      }`}
    >
      <div
        className={`rounded-lg shadow-lg border-l-4 px-4 py-3 ${toastStyles[type]}`}
      >
        <div className="flex justify-between items-center">
          <div className="flex-1 mr-2">{message}</div>
          <button
            onClick={() => {
              setIsVisible(false);
              setTimeout(() => onClose && onClose(), 300);
            }}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Toast;
