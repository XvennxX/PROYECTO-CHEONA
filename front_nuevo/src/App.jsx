import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import { AuthProvider } from './components/auth/AuthContext';
import ScrollToTop from './components/utils/ScrollToTop';

// Lazy loading de páginas
const Home = lazy(() => import('./pages/Home'));
const Rooms = lazy(() => import('./pages/Rooms'));
const RoomDetail = lazy(() => import('./pages/RoomDetail'));
const Reservation = lazy(() => import('./pages/Reservation'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Contact = lazy(() => import('./pages/Contact'));
const HowToGet = lazy(() => import('./pages/HowToGet'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Nosotros = lazy(() => import('./pages/Nosotros'));
const PoliticaPrivacidad = lazy(() => import('./pages/PoliticaPrivacidad'));
const TerminosCondiciones = lazy(() => import('./pages/TerminosCondiciones'));

// User pages
const Profile = lazy(() => import('./pages/user/Profile'));
const MyReservations = lazy(() => import('./pages/user/MyReservations'));
const Help = lazy(() => import('./pages/user/Help'));
const Settings = lazy(() => import('./pages/user/Settings'));
const Notifications = lazy(() => import('./pages/user/Notifications'));

// Admin pages
const Dashboard = lazy(() => import('./pages/admin/Dashboard'));
const EditSpace = lazy(() => import('./pages/admin/EditSpace'));
const CrearAlojamiento = lazy(() => import('./pages/admin/CrearAlojamiento'));

// Componente de carga
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Layout>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/habitaciones" element={<Rooms />} />
              <Route path="/habitaciones/:id" element={<RoomDetail />} />
              <Route path="/reservar" element={<Reservation />} />
              <Route path="/galeria" element={<Gallery />} />
              <Route path="/como-llegar" element={<HowToGet />} />
              <Route path="/contacto" element={<Contact />} />
              <Route path="/nosotros" element={<Nosotros />} />
              <Route path="/politica-privacidad" element={<PoliticaPrivacidad />} />
              <Route path="/terminos-condiciones" element={<TerminosCondiciones />} />
              
              {/* User routes */}
              <Route path="/perfil" element={<Profile />} />
              <Route path="/mis-reservas" element={<MyReservations />} />
              <Route path="/ayuda" element={<Help />} />
              <Route path="/configuracion" element={<Settings />} />
              <Route path="/notificaciones" element={<Notifications />} />
              
              {/* Admin routes */}
              <Route path="/admin" element={<Dashboard />} />
              <Route path="/admin/espacios/:id/editar" element={<EditSpace />} />
              <Route path="/admin/crear-alojamiento" element={<CrearAlojamiento />} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;