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
    name: '',
    type: '',
    capacity: '',
    price: '',
    status: '',
    images: [],
    amenities: '',
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchSpace = async () => {
      setLoading(true);
      try {
        // Aquí deberías llamar a la API real
        const data = await reservationService.getRoom(Number(id));
        setSpace(data);
        setForm({
          name: data.name || '',
          type: data.type || '',
          capacity: data.capacity || '',
          price: data.price || '',
          status: data.status || '',
          images: data.images || [],
          amenities: (data.amenities || []).join(', '),
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
      // Aquí deberías llamar a la API real para actualizar
      await reservationService.updateRoom(Number(id), {
        ...form,
        capacity: Number(form.capacity),
        price: form.price,
        amenities: form.amenities.split(',').map(a => a.trim()),
      });
      navigate('/admin');
    } catch (e) {
      alert('Error al guardar los cambios');
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
            <input name="name" value={form.name} onChange={handleChange} className="input w-full" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Tipo</label>
            <input name="type" value={form.type} onChange={handleChange} className="input w-full" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Capacidad</label>
            <input name="capacity" type="number" value={form.capacity} onChange={handleChange} className="input w-full" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Precio por noche</label>
            <input name="price" value={form.price} onChange={handleChange} className="input w-full" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Estado</label>
            <select name="status" value={form.status} onChange={handleChange} className="input w-full">
              <option value="available">Disponible</option>
              <option value="occupied">Ocupado</option>
              <option value="maintenance">Mantenimiento</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Comodidades (separadas por coma)</label>
            <input name="amenities" value={form.amenities} onChange={handleChange} className="input w-full" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Fotos</label>
            <div className="flex gap-3 mb-2 flex-wrap">
              {form.images && form.images.length > 0 ? (
                form.images.map((img, idx) => (
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
