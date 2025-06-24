import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import { Loader } from 'lucide-react';
import { reservationService } from '../../services/reservationService';

const EditSpace = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [space, setSpace] = useState(null);
  const [form, setForm] = useState({
    nombre: '',
    tipo: '',
    capacidad: '',
    precio_por_noche: '',
    estado: '',
    descripcion: '',
    imagenes: [],
    comodidades: '',
    politicas: '',
    servicios_adicionales: '',
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchSpace = async () => {
      setLoading(true);
      try {
        // Llama a la API real para obtener el alojamiento
        const data = await reservationService.getRooms();
        const found = (data || []).find(r => r.id === Number(id));
        if (!found) throw new Error('No encontrado');
        setSpace(found);
        setForm({
          nombre: found.nombre || '',
          tipo: found.tipo || '',
          capacidad: found.capacidad || '',
          precio_por_noche: found.precio_por_noche || '',
          estado: found.estado || '',
          descripcion: found.descripcion || '',
          imagenes: found.imagenes || [],
          comodidades: (found.comodidades || []).join(', '),
          politicas: found.politicas || '',
          servicios_adicionales: (found.servicios_adicionales || []).join(', '),
        });
      } catch (e) {
        navigate('/admin');
      } finally {
        setLoading(false);
      }
    };
    fetchSpace();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      // Preparar datos para el backend con más cuidado
      let payload = {
        nombre: form.nombre.trim() || undefined,
        tipo: form.tipo.trim() || undefined,
        descripcion: form.descripcion.trim() || undefined,
        estado: form.estado.trim() || undefined,
        politicas: form.politicas.trim() || undefined
      };
      
      // Convertir capacidad a número si existe
      if (form.capacidad !== '') {
        payload.capacidad = Number(form.capacidad);
      }
      
      // Convertir precio_por_noche a número si existe
      if (form.precio_por_noche !== '') {
        payload.precio_por_noche = Number(form.precio_por_noche);
      }
      
      // Procesar arrays con más cuidado
      if (form.comodidades && form.comodidades.trim()) {
        payload.comodidades = form.comodidades.split(',')
          .map(item => item.trim())
          .filter(item => item !== '');
      } else {
        payload.comodidades = [];
      }
      
      // Manejar imágenes
      if (Array.isArray(form.imagenes)) {
        payload.imagenes = form.imagenes.filter(i => i && i.trim() !== '');
      } else if (typeof form.imagenes === 'string' && form.imagenes.trim()) {
        payload.imagenes = form.imagenes.split(',')
          .map(item => item.trim())
          .filter(item => item !== '');
      } else {
        payload.imagenes = [];
      }
      
      // Servicios adicionales
      if (form.servicios_adicionales && form.servicios_adicionales.trim()) {
        payload.servicios_adicionales = form.servicios_adicionales.split(',')
          .map(item => item.trim())
          .filter(item => item !== '');
      } else {
        payload.servicios_adicionales = [];
      }
      
      // Eliminar campos con valores undefined
      payload = Object.fromEntries(
        Object.entries(payload).filter(([_, value]) => value !== undefined)
      );
      
      console.log('Datos preparados para enviar:', payload);
      
      try {
        await reservationService.updateRoom(Number(id), payload);
        navigate('/admin');
      } catch (error) {
        console.error('Error detallado:', error);
        alert(`Error al guardar los cambios: ${error.message || 'Error desconocido'}`);
      }
    } catch (e) {
      console.error('Error en handleSave:', e);
      alert('Error al preparar los datos para la actualización');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center py-20"><Loader className="animate-spin mr-2" />Cargando...</div>;
  }

  return (
    <div className="min-h-screen bg-neutral-50 pt-20">
      <div className="container-custom py-12 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Editar Espacio</h1>
        <form className="bg-white rounded-2xl shadow-lg p-8 space-y-6" onSubmit={handleSave}>
          <div>
            <label className="block text-sm font-medium mb-1">Nombre</label>
            <input name="nombre" value={form.nombre} onChange={handleChange} className="input w-full" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Tipo</label>
            <input name="tipo" value={form.tipo} onChange={handleChange} className="input w-full" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Capacidad</label>
            <input name="capacidad" type="number" value={form.capacidad} onChange={handleChange} className="input w-full" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Precio por noche</label>
            <input name="precio_por_noche" value={form.precio_por_noche} onChange={handleChange} className="input w-full" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Estado</label>
            <select name="estado" value={form.estado} onChange={handleChange} className="input w-full">
              <option value="available">Disponible</option>
              <option value="occupied">Ocupado</option>
              <option value="maintenance">Mantenimiento</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Descripción</label>
            <textarea name="descripcion" value={form.descripcion} onChange={handleChange} className="input w-full" rows={2} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Comodidades (separadas por coma)</label>
            <input name="comodidades" value={form.comodidades} onChange={handleChange} className="input w-full" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Servicios adicionales (separados por coma)</label>
            <input name="servicios_adicionales" value={form.servicios_adicionales} onChange={handleChange} className="input w-full" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Políticas</label>
            <textarea name="politicas" value={form.politicas} onChange={handleChange} className="input w-full" rows={3} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Fotos</label>
            <div className="flex gap-3 mb-2 flex-wrap">
              {form.imagenes && form.imagenes.length > 0 ? (
                form.imagenes.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`Foto ${idx + 1}`}
                    className="w-24 h-16 object-cover rounded-lg border"
                  />
                ))
              ) : (
                <span className="text-neutral-400 text-sm">Sin fotos</span>
              )}
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={() => alert('Funcionalidad de edición de fotos próximamente')}
              className="mt-2"
            >
              Modificar fotos
            </Button>
          </div>
          <div className="flex justify-end">
            <Button type="submit" variant="primary" disabled={saving}>{saving ? 'Guardando...' : 'Guardar Cambios'}</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSpace;
