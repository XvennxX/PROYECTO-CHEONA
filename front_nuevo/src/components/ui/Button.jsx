import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  disabled = false,
  type = 'button',
  to,
  icon,
  iconPosition = 'left',
  fullWidth = false,
}) => {
  // Clases base
  const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-300 rounded-lg';
  
  // Variante
  const variantClasses = {
    primary: 'bg-primary text-white hover:bg-primary-dark active:bg-primary-darker disabled:bg-primary/50',
    secondary: 'bg-secondary text-white hover:bg-secondary-dark active:bg-secondary-darker disabled:bg-secondary/50',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white disabled:border-primary/50 disabled:text-primary/50',
    text: 'text-primary hover:bg-primary/10 disabled:text-primary/50',
  };
  
  // Tamaño
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3',
    lg: 'px-8 py-4 text-lg',
  };
  
  // Deshabilitado
  const disabledClasses = disabled ? 'cursor-not-allowed' : '';
  
  // Ancho completo
  const widthClasses = fullWidth ? 'w-full' : '';
  
  // Combinar todas las clases
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${widthClasses} ${className}`;
  
  // Renderizar el contenido con o sin icono
  const renderContent = () => (
    <>
      {icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>}
      {children}
      {icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
    </>
  );
  
  // Si hay un enlace, usar React Router Link
  if (to) {
    return (
      <Link to={to} className={classes}>
        {renderContent()}
      </Link>
    );
  }
  
  // Si no, usar un botón normal
  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
    >
      {renderContent()}
    </button>
  );
};

export default Button;