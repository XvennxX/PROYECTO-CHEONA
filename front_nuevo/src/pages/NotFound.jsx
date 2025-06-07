import React from 'react';
import Button from '../components/ui/Button';
import { ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center max-w-lg">
        <div className="text-primary text-9xl font-bold mb-6">404</div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Página no encontrada</h1>
        <p className="text-neutral-600 mb-8">
          Lo sentimos, la página que estás buscando no existe o ha sido movida.
        </p>
        <Button to="/" variant="primary" icon={<ArrowLeft size={20} />}>
          Volver al inicio
        </Button>
      </div>
    </div>
  );
};

export default NotFound;