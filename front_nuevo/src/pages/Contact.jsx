import React, { useState } from 'react';
import SectionTitle from '../components/ui/SectionTitle';
import Button from '../components/ui/Button';
import { contactService } from '../services/contactService';
import { Check, MapPin, Phone, Mail, Clock, Loader, AlertCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      setError('Por favor, completa todos los campos obligatorios.');
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      const response = await contactService.sendContactForm(formData);
      
      if (response) {
        setSuccess(true);
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } else {
        throw new Error('No se pudo enviar el formulario');
      }
    } catch (err) {
      setError('Error al enviar el mensaje. Por favor, inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <>
      {/* Banner */}
      <div className="relative h-64 md:h-80">
        <img
          src="https://images.pexels.com/photos/1822608/pexels-photo-1822608.jpeg"
          alt="Contacto"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-white text-4xl md:text-5xl font-bold">Contacto</h1>
        </div>
      </div>

      {/* Contenido */}
      <section className="section container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Información de contacto */}
          <div>
            <SectionTitle 
              title="Ponte en Contacto" 
              subtitle="Estamos aquí para ayudarte con cualquier consulta"
            />
            
            <p className="text-neutral-600 mb-8">
              Si tienes alguna pregunta sobre nuestras instalaciones, servicios o disponibilidad, no dudes en contactarnos. Nuestro equipo estará encantado de atenderte y ayudarte a planificar tu estancia perfecta en Finca Los Olivos.
            </p>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-start">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <MapPin size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Dirección</h3>
                  <p className="text-neutral-600">Camino de la Finca, 123<br />18001 Granada, España</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <Phone size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Teléfono</h3>
                  <p className="text-neutral-600">
                    <a href="tel:+34912345678" className="hover:text-primary transition-colors">+34 912 345 678</a>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <Mail size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Email</h3>
                  <p className="text-neutral-600">
                    <a href="mailto:info@fincalosolivos.com" className="hover:text-primary transition-colors">info@fincalosolivos.com</a>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <Clock size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Horario de atención</h3>
                  <p className="text-neutral-600">Lunes a Domingo: 8:00 - 22:00</p>
                </div>
              </div>
            </div>
            
            {/* Mapa */}
            <div className="rounded-xl overflow-hidden h-64 shadow-md">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12858.919457221244!2d-3.6033677302246034!3d37.17734999999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd71fce3f2a63f15%3A0xd8a54f27155f811!2sAlhambra!5e0!3m2!1ses!2ses!4v1651234567890!5m2!1ses!2ses" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación de Finca Los Olivos"
              ></iframe>
            </div>
          </div>
          
          {/* Formulario de contacto */}
          <div>
            <div className="card p-8">
              <h2 className="text-2xl font-bold mb-6">Envíanos un mensaje</h2>
              
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start">
                  <AlertCircle size={20} className="text-error mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-error">{error}</p>
                </div>
              )}
              
              {success ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check size={32} className="text-success" />
                  </div>
                  <h3 className="text-xl font-bold text-success mb-2">¡Mensaje Enviado!</h3>
                  <p className="text-neutral-600">
                    Gracias por contactar con nosotros. Te responderemos lo antes posible.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="input-group">
                      <label className="input-label">Nombre *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="input"
                        required
                      />
                    </div>
                    
                    <div className="input-group">
                      <label className="input-label">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="input"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="input-group mb-4">
                    <label className="input-label">Asunto</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="input"
                    />
                  </div>
                  
                  <div className="input-group mb-6">
                    <label className="input-label">Mensaje *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="input"
                      rows={5}
                      required
                    ></textarea>
                  </div>
                  
                  <Button
                    type="submit"
                    variant="primary"
                    fullWidth
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader size={20} className="animate-spin mr-2" />
                        Enviando...
                      </>
                    ) : 'Enviar mensaje'}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;