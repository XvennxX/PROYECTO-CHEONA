import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-16">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Column 1: About */}
          <div>
            <h2 className="text-2xl font-bold text-accent mb-4">Finca Cheona</h2>
            <p className="text-white/90 mb-6">
              Tu escape perfecto para eventos especiales y experiencias únicas en la naturaleza.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/10 rounded-full p-2 hover:bg-white/20 transition-colors"
              >
                <Facebook size={20} className="text-white" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/10 rounded-full p-2 hover:bg-white/20 transition-colors"
              >
                <Instagram size={20} className="text-white" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h2 className="text-2xl font-bold text-accent mb-4">Enlaces Rápidos</h2>
            <ul className="space-y-3">
              <li>
                <Link to="/eventos" className="text-white/90 hover:text-accent transition-colors">
                  Eventos
                </Link>
              </li>
              <li>
                <Link to="/glamping" className="text-white/90 hover:text-accent transition-colors">
                  Glamping
                </Link>
              </li>
              <li>
                <Link to="/galeria" className="text-white/90 hover:text-accent transition-colors">
                  Galería
                </Link>
              </li>
              <li>
                <Link to="/contacto" className="text-white/90 hover:text-accent transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h2 className="text-2xl font-bold text-accent mb-4">Contacto</h2>
            <ul className="space-y-3">
              <li className="flex items-center text-white/90">
                <span className="material-icons-outlined mr-2">📍</span>
                <a href="https://maps.app.goo.gl/ruc7fyrHWkiMrenP9" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                  Puente Santa Ana, Sasaima-Alban, Taboga, Sasaima, Cundinamarca
                </a>
              </li>
              <li>
                <a 
                  href="tel:+573222108528" 
                  className="flex items-center text-white/90 hover:text-accent transition-colors"
                >
                  <span className="material-icons-outlined mr-2">📞</span>
                  +57 322 210 8528
                </a>
              </li>
              <li>
                <a 
                  href="mailto:cheona_redes@hotmail.com" 
                  className="flex items-center text-white/90 hover:text-accent transition-colors"
                >
                  <span className="material-icons-outlined mr-2">📧</span>
                  cheona_redes@hotmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-white/20 text-center">
          <p className="text-white/90">
            © 2025 Finca Cheona. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;