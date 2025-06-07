import React, { useState } from 'react';
import { MessageCircle, Phone, Mail, FileText, ChevronDown, ChevronUp } from 'lucide-react';
import Button from '../../components/ui/Button';

const Help = () => {
  const [openSection, setOpenSection] = useState(null);

  const faqs = [
    {
      category: "Reservas",
      questions: [
        {
          q: "¿Cómo puedo modificar mi reserva?",
          a: "Puedes modificar tu reserva hasta 48 horas antes de la fecha de llegada desde la sección 'Mis Reservas'."
        },
        {
          q: "¿Cuál es la política de cancelación?",
          a: "Ofrecemos cancelación gratuita hasta 7 días antes de la fecha de llegada. Después de este período, se aplicará un cargo del 50%."
        }
      ]
    },
    {
      category: "Pagos",
      questions: [
        {
          q: "¿Qué métodos de pago aceptan?",
          a: "Aceptamos tarjetas de crédito/débito, transferencias bancarias y PSE."
        },
        {
          q: "¿Cuándo se realiza el cargo?",
          a: "El cargo se realiza en el momento de la reserva para garantizar tu estadía."
        }
      ]
    },
    {
      category: "Servicios",
      questions: [
        {
          q: "¿Qué incluye el desayuno?",
          a: "El desayuno incluye opciones continentales y típicas, servido de 7:00 a 10:00 AM."
        },
        {
          q: "¿Tienen servicio de transporte?",
          a: "Ofrecemos servicio de transporte desde/hacia el aeropuerto con cargo adicional."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-50 pt-20">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* FAQs */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h1 className="text-2xl font-bold mb-6">Preguntas Frecuentes</h1>
              
              <div className="space-y-6">
                {faqs.map((section, index) => (
                  <div key={index} className="border border-neutral-100 rounded-xl overflow-hidden">
                    <button
                      className="w-full px-6 py-4 flex items-center justify-between bg-neutral-50 hover:bg-neutral-100 transition-colors"
                      onClick={() => setOpenSection(openSection === index ? null : index)}
                    >
                      <h2 className="text-lg font-semibold">{section.category}</h2>
                      {openSection === index ? (
                        <ChevronUp size={20} />
                      ) : (
                        <ChevronDown size={20} />
                      )}
                    </button>
                    
                    {openSection === index && (
                      <div className="p-6 space-y-4">
                        {section.questions.map((item, qIndex) => (
                          <div key={qIndex}>
                            <h3 className="font-medium mb-2">{item.q}</h3>
                            <p className="text-neutral-600">{item.a}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contacto */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-bold mb-4">Contacto Directo</h2>
              <div className="space-y-4">
                <Button
                  variant="outline"
                  fullWidth
                  className="justify-start h-12"
                  icon={<MessageCircle size={18} />}
                >
                  Chat en vivo
                </Button>
                <Button
                  variant="outline"
                  fullWidth
                  className="justify-start h-12"
                  icon={<Phone size={18} />}
                >
                  +57 300 123 4567
                </Button>
                <Button
                  variant="outline"
                  fullWidth
                  className="justify-start h-12"
                  icon={<Mail size={18} />}
                >
                  soporte@fincacheona.com
                </Button>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h2 className="text-xl font-bold mb-4">Recursos</h2>
              <div className="space-y-4">
                <Button
                  variant="outline"
                  fullWidth
                  className="justify-start h-12"
                  icon={<FileText size={18} />}
                >
                  Guía del huésped
                </Button>
                <Button
                  variant="outline"
                  fullWidth
                  className="justify-start h-12"
                  icon={<FileText size={18} />}
                >
                  Términos y condiciones
                </Button>
                <Button
                  variant="outline"
                  fullWidth
                  className="justify-start h-12"
                  icon={<FileText size={18} />}
                >
                  Política de privacidad
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;