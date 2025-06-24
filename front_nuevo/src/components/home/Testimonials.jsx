import React, { useState } from 'react';
import SectionTitle from '../ui/SectionTitle';
import { Star, MapPin, Phone, Mail, Loader } from 'lucide-react';
import { chatService } from '../../services/chatService';

const Testimonials = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Aquí deberías obtener el usuario autenticado, por ejemplo desde localStorage
      const user = JSON.parse(localStorage.getItem('userData'));
      if (!user || !user.id_cliente) {
        alert('Debes iniciar sesión para enviar un mensaje.');
        setLoading(false);
        return;
      }
      // 1. Crear conversación (si no existe)
      const id_conversacion = await chatService.crearConversacion(user.id_cliente);
      // 2. Enviar mensaje inicial
      await chatService.enviarMensaje({
        id_conversacion,
        remitente: 'cliente',
        mensaje: formData.message
      });
      setFormData({ name: '', email: '', message: '' });
      alert('Mensaje enviado correctamente.');
    } catch (error) {
      alert('Error al enviar el mensaje.');
    }
    setLoading(false);
  };

  const testimonials = [
    {
      id: 1,
      name: "María Rodríguez",
      date: "Marzo 2025",
      rating: 5,
      comment: "Nuestra estancia en la finca fue mágica. La tranquilidad, el contacto con la naturaleza y las instalaciones superaron nuestras expectativas.",
      avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg"
    },
    {
      id: 2,
      name: "Juan Gómez",
      date: "Febrero 2025",
      rating: 4,
      comment: "Lugar ideal para desconectar. La cabaña es acogedora y la chimenea le da un toque especial en las noches frías.",
      avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
    },
    {
      id: 3,
      name: "Ana Martínez",
      date: "Enero 2025",
      rating: 5,
      comment: "Celebramos el cumpleaños de mi esposo y fue perfecto. Los niños disfrutaron del espacio al aire libre y nosotros de la tranquilidad.",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
    }
  ];

  return (
    <>
      <section className="bg-primary py-16">
        <div className="container-custom">
          <SectionTitle 
            title="Lo Que Dicen Nuestros Huéspedes" 
            subtitle="Descubre por qué nuestros visitantes vuelven una y otra vez"
            centered
            light
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map(testimonial => (
              <div key={testimonial.id} className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name} 
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.date}</p>
                  </div>
                </div>
                
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={16} 
                      className={i < testimonial.rating ? 'fill-accent text-accent' : 'text-gray-300'} 
                    />
                  ))}
                </div>
                
                <p className="text-gray-700">{testimonial.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-neutral-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">¿Tienes alguna pregunta?</h2>
              <div className="space-y-6">
                <div className="flex items-center">
                  <MapPin className="text-primary w-6 h-6 mr-4" />
                  <a href="https://maps.app.goo.gl/ruc7fyrHWkiMrenP9" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                    Puente Santa Ana, Sasaima-Alban, Taboga, Sasaima, Cundinamarca
                  </a>
                </div>
                <div className="flex items-center">
                  <Phone className="text-primary w-6 h-6 mr-4" />
                  <a href="tel:+573104813073" className="hover:text-primary transition-colors">
                    +57 310 481 3073
                  </a>
                </div>
                <div className="flex items-center">
                  <Mail className="text-primary w-6 h-6 mr-4" />
                  <a href="mailto:cheona_redes@hotmail.com" className="hover:text-primary transition-colors">
                    cheona_redes@hotmail.com
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold mb-6">Contáctanos</h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Nombre"
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-primary focus:border-primary outline-none"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Mensaje"
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-primary focus:border-primary outline-none resize-none"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-accent hover:bg-accent/90 text-white font-medium py-3 rounded-xl transition-colors flex items-center justify-center"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader className="animate-spin mr-2" size={20} />
                      Enviandooo...
                    </>
                  ) : (
                    'Enviar Mensaje'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Testimonials;