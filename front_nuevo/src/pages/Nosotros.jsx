import React from 'react';

const Nosotros = () => {
  return (
    <div className="pt-20 pb-16">
      <div className="container-custom">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">Nosotros</h1>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-10">            <img 
            src="http://localhost:8000/static/alojamientos/cabaña/IMG-20250623-WA0053.jpg" 
            alt="Finca Cheona" 
            className="w-full h-80 object-cover object-center"
            onError={(e) => {
              console.error('Error cargando la imagen:', e);
              e.target.src = 'http://localhost:8000/static/alojamientos/cabaña/IMG-20250623-WA0060.jpg';
            }}
          />
            
          <div className="p-8">
            <h2 className="text-3xl font-semibold mb-4 text-primary">Nuestra Historia</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
                Finca Cheona nace del sueño de crear un espacio donde la naturaleza y la comodidad se fusionan para ofrecer experiencias inolvidables. Ubicada en el corazón de Sasaima, Cundinamarca, nuestra finca ha sido transformada con amor y dedicación para convertirse en un refugio perfecto para quienes buscan desconectar del bullicio de la ciudad.
            </p>
              
            <h2 className="text-3xl font-semibold mb-4 text-primary">Nuestra Misión</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
                En Finca Cheona nos dedicamos a proporcionar experiencias auténticas en un entorno natural privilegiado. Nuestro compromiso es ofrecer un servicio excepcional, alojamiento confortable y actividades que permitan a nuestros huéspedes reconectar con la naturaleza, disfrutar de momentos especiales y crear recuerdos inolvidables.
            </p>
              
            <h2 className="text-3xl font-semibold mb-4 text-primary">Nuestros Valores</h2>
            <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
              <li><span className="font-semibold">Sostenibilidad:</span> Trabajamos constantemente para minimizar nuestro impacto ambiental y preservar la belleza natural de nuestro entorno.</li>
              <li><span className="font-semibold">Hospitalidad:</span> Nos esforzamos por hacer que cada huésped se sienta como en casa, con un servicio cálido y personalizado.</li>
              <li><span className="font-semibold">Autenticidad:</span> Valoramos las experiencias genuinas y la conexión real con la naturaleza y la cultura local.</li>
              <li><span className="font-semibold">Excelencia:</span> Buscamos constantemente mejorar nuestras instalaciones y servicios para superar las expectativas de nuestros visitantes.</li>
            </ul>
              
            <h2 className="text-3xl font-semibold mb-4 text-primary">Nuestro Equipo</h2>
            <p className="text-gray-700 leading-relaxed">
                Detrás de Finca Cheona hay un equipo apasionado y comprometido que trabaja día a día para asegurar que su estancia sea perfecta. Desde nuestro personal de recepción hasta nuestros encargados de mantenimiento, todos compartimos el mismo objetivo: hacer de su visita una experiencia extraordinaria.
            </p>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nosotros;
