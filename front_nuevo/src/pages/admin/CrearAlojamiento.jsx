import React, { useState } from 'react';
import Button from '../../components/ui/Button';
import { reservationService } from '../../services/reservationService';
import { useNavigate } from 'react-router-dom';

const CrearAlojamiento = () => {
  const navigate = useNavigate();
  const [newSpace, setNewSpace] = useState({
    nombre: '',
    estado: 'available',
    capacidad: '',
    tipo: '',
    descripcion: '',
    comodidades: '',
    precio_por_noche: '',
    imagenes: '',
    servicios_adicionales: '',
    politicas: '',
  });
  const [creatingSpace, setCreatingSpace] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleNewSpaceChange = (e) => {
    const { name, value } = e.target;
    setNewSpace((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateSpace = async (e) => {
    e.preventDefault();
    setCreatingSpace(true);
    setError('');
    setSuccess(false);
    try {
      await reservationService.createAlojamiento({
        ...newSpace,
        capacidad: Number(newSpace.capacidad),
        precio_por_noche: Number(newSpace.precio_por_noche),
        comodidades: newSpace.comodidades.split(',').map(c => c.trim()),
        imagenes: newSpace.imagenes.split(',').map(i => i.trim()),
        servicios_adicionales: newSpace.servicios_adicionales ? newSpace.servicios_adicionales.split(',').map(s => s.trim()) : [],
      });
      // Redirigir al dashboard en la pestaña de espacios y mostrar mensaje
      navigate('/admin?created=1');
    } catch (e) {
      setError('Error al crear el alojamiento');
    } finally {
      setCreatingSpace(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 p-4">
      <form onSubmit={handleCreateSpace} className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-8 relative">
        <h2 className="text-2xl font-bold mb-6 text-center">Nuevo Alojamiento</h2>
        {success && <div className="mb-4 text-green-600 text-center">¡Alojamiento creado correctamente!</div>}
        {error && <div className="mb-4 text-red-600 text-center">{error}</div>}
        <div className="grid grid-cols-1 gap-4">
          <input name="nombre" value={newSpace.nombre} onChange={handleNewSpaceChange} className="input" placeholder="Nombre" required />
          <input name="tipo" value={newSpace.tipo} onChange={handleNewSpaceChange} className="input" placeholder="Tipo (cabaña, glamping, etc)" required />
          <input name="capacidad" value={newSpace.capacidad} onChange={handleNewSpaceChange} className="input" placeholder="Capacidad" type="number" required />
          <input name="precio_por_noche" value={newSpace.precio_por_noche} onChange={handleNewSpaceChange} className="input" placeholder="Precio por noche" type="number" required />
          <input name="estado" value={newSpace.estado} onChange={handleNewSpaceChange} className="input" placeholder="Estado (available, occupied, maintenance)" required />
          <textarea name="descripcion" value={newSpace.descripcion} onChange={handleNewSpaceChange} className="input" placeholder="Descripción" required />
          <input name="imagenes" value={newSpace.imagenes} onChange={handleNewSpaceChange} className="input" placeholder="URLs de imágenes (separadas por coma)" required />
          <input name="comodidades" value={newSpace.comodidades} onChange={handleNewSpaceChange} className="input" placeholder="Comodidades (separadas por coma)" required />
          <input name="servicios_adicionales" value={newSpace.servicios_adicionales} onChange={handleNewSpaceChange} className="input" placeholder="Servicios adicionales (opcional, separadas por coma)" />
          <textarea name="politicas" value={newSpace.politicas} onChange={handleNewSpaceChange} className="input" placeholder="Políticas (opcional)" />
        </div>
        <div className="flex justify-end mt-6">
          <Button type="submit" variant="primary" disabled={creatingSpace} fullWidth>{creatingSpace ? 'Creando...' : 'Crear'}</Button>
        </div>
      </form>
    </div>
  );
};

export default CrearAlojamiento;
