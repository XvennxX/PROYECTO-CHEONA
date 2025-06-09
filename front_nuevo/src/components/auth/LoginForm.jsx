import React, { useState } from 'react';
import { Loader, Eye, EyeOff } from 'lucide-react';
import Button from '../ui/Button';
import { useAuth } from './AuthContext';

const LoginForm = ({ onClose }) => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Llamada al backend para autenticar
      const response = await fetch('http://localhost:8000/api/login', { // Cambia la URL si es necesario
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });

      if (!response.ok) {
        throw new Error('Credenciales incorrectas');
      }

      const userData = await response.json();
      login({
        id_cliente: userData.user.id_cliente,
        nombre: userData.user.nombre,
        email: userData.user.email,
        rol: userData.user.rol
      });
      onClose();
    } catch (err) {
      setError('Email o contraseña incorrectos');
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
    
    if (error) setError(null);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-medium animate-fade-in">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-1.5">
          Email
        </label>
        <input
          type="email"
          name="email"
          required
          className="input text-base"
          value={formData.email}
          onChange={handleChange}
          placeholder="tu@email.com"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-700 mb-1.5">
          Contraseña
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            required
            className="input text-base pr-10"
            value={formData.password}
            onChange={handleChange}
            placeholder="Tu contraseña"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="w-4 h-4 rounded border-neutral-300 text-primary focus:ring-primary/20"
          />
          <span className="ml-2 text-sm text-neutral-600">Recordarme</span>
        </label>

        <button
          type="button"
          className="text-sm text-primary hover:text-primary-dark transition-colors"
        >
          ¿Olvidaste tu contraseña?
        </button>
      </div>

      <Button
        type="submit"
        variant="primary"
        fullWidth
        disabled={loading}
        className="h-11 text-base font-medium"
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <Loader size={20} className="animate-spin mr-2" />
            <span>Iniciando sesión...</span>
          </div>
        ) : (
          'Iniciar sesión'
        )}
      </Button>
    </form>
  );
};

export default LoginForm;