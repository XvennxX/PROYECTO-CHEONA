import React, { useState } from 'react';
import { Loader, Eye, EyeOff } from 'lucide-react';
import Button from '../ui/Button';

const RegisterForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
    documento_identidad: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Llama al endpoint de registro del backend
      const response = await fetch('http://127.0.0.1:8000/usuarios/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: formData.nombre,
          apellido: formData.apellido,
          email: formData.email,
          telefono: formData.telefono,
          documento_identidad: formData.documento_identidad,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Error al crear la cuenta. Por favor, inténtalo de nuevo.');
      }

      onClose();
    } catch (err) {
      setError(err.message || 'Error al crear la cuenta. Por favor, inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (error) setError(null);
  };

  return (
    <div className="max-w-xs w-full mx-auto">
      <form onSubmit={handleSubmit} className="space-y-1.5">
        {error && (
          <div className="bg-red-50 text-red-600 p-2 rounded-xl text-xs font-medium animate-fade-in">
            {error}
          </div>
        )}

        <div className="space-y-1.5">
          <div>
            <label className="block text-xs font-medium text-neutral-700 mb-0.5">
              Nombre
            </label>
            <input
              type="text"
              name="nombre"
              required
              className="input text-sm py-1.5 px-2"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Ej: Juan"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-neutral-700 mb-0.5">
              Apellido
            </label>
            <input
              type="text"
              name="apellido"
              required
              className="input text-sm py-1.5 px-2"
              value={formData.apellido}
              onChange={handleChange}
              placeholder="Ej: Pérez"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-neutral-700 mb-0.5">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              className="input text-sm py-1.5 px-2"
              value={formData.email}
              onChange={handleChange}
              placeholder="tu@email.com"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-neutral-700 mb-0.5">
              Teléfono
            </label>
            <input
              type="text"
              name="telefono"
              required
              className="input text-sm py-1.5 px-2"
              value={formData.telefono}
              onChange={handleChange}
              placeholder="Ej: 3001234567"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-neutral-700 mb-0.5">
              Documento de identidad
            </label>
            <input
              type="text"
              name="documento_identidad"
              required
              className="input text-sm py-1.5 px-2"
              value={formData.documento_identidad}
              onChange={handleChange}
              placeholder="Ej: 123456789"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-neutral-700 mb-0.5">
              Contraseña
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                className="input text-sm pr-8 py-1.5 px-2"
                value={formData.password}
                onChange={handleChange}
                placeholder="Mínimo 8 caracteres"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-neutral-700 mb-0.5">
              Confirmar contraseña
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                required
                className="input text-sm pr-8 py-1.5 px-2"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Repite tu contraseña"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
              >
                {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
        </div>

        <div className="pt-0.5">
          <Button
            type="submit"
            variant="primary"
            fullWidth
            disabled={loading}
            className="h-8 text-sm font-medium rounded-xl"
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <Loader size={16} className="animate-spin mr-2" />
                <span>Creando cuenta...</span>
              </div>
            ) : (
              'Crear cuenta'
            )}
          </Button>
        </div>

        <p className="text-[10px] text-center text-neutral-500 mt-1">
          Al crear una cuenta, aceptas nuestros{' '}
          <a href="/terminos" className="text-primary hover:text-primary-dark">
            Términos y condiciones
          </a>{' '}
          y{' '}
          <a href="/privacidad" className="text-primary hover:text-primary-dark">
            Política de privacidad
          </a>
        </p>
      </form>
    </div>
  );
};

export default RegisterForm;