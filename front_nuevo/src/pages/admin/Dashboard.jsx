import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../components/auth/AuthContext';
import { 
  BarChart as BarChartIcon, 
  Users,
  Calendar,
  DollarSign,
  Settings,
  Bell,
  Home,
  PlusCircle,
  Download,
  Clock,
  AlertCircle,
  Search,
  Filter,
  ChevronDown,
  Edit2,
  Trash2,
  Mail,
  MessageSquare,
  Image,
  FileText,
  Upload,
  Star,
  Save
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  ResponsiveContainer
} from 'recharts';
import Button from '../../components/ui/Button';
import { reservationService } from '../../services/reservationService';
import { userService } from '../../services/userService';
import { getGaleriaImagesByTipo, uploadGaleriaImage } from '../../services/galeriaService';

const API_BASE_URL = 'http://localhost:8000'; // Debe coincidir con la del backend

const Dashboard = () => {
  const location = useLocation();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedDateRange, setSelectedDateRange] = useState('week');
  const [activeReservations, setActiveReservations] = useState([]);
  const [futureReservations, setFutureReservations] = useState([]); // NUEVO estado
  const [ingresosMes, setIngresosMes] = useState(0); // Estado para los ingresos mensuales
  const [showActiveModal, setShowActiveModal] = useState(false);
  const [loadingActive, setLoadingActive] = useState(false);
  const [spaces, setSpaces] = useState([]);
  const [loadingSpaces, setLoadingSpaces] = useState(true);
  const [showNewSpaceModal, setShowNewSpaceModal] = useState(false);
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
    politicas: ''
  });
  const [creatingSpace, setCreatingSpace] = useState(false);
  const [showCreatedMessage, setShowCreatedMessage] = useState(false);
  const [createdMessageText, setCreatedMessageText] = useState('Alojamiento creado');
  const [deleteModal, setDeleteModal] = useState({ open: false, id: null });
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadTipo, setUploadTipo] = useState('finca');
  const [uploadFile, setUploadFile] = useState(null);
  const [uploadMsg, setUploadMsg] = useState("");
  const [globalMsg, setGlobalMsg] = useState("");
  const [showGlobalMsg, setShowGlobalMsg] = useState(false);
  const [galeriaPorTipo, setGaleriaPorTipo] = useState({});

  // Redirigir si el usuario no es admin
  React.useEffect(() => {
    if (user?.rol !== 'admin') {
      navigate('/');
    }
  }, [user, navigate]);

  // Obtener reservas activas y futuras al cargar el dashboard
  useEffect(() => {
    const fetchReservations = async () => {
      setLoadingActive(true);
      try {
        // Traer todas las reservas con datos de cliente
        const all = await reservationService.getAllReservationsWithClient();
        const today = new Date();
        today.setHours(0,0,0,0); // Ignorar hora
        // Activas: fecha_inicio <= hoy <= fecha_fin y no cancelada
        const active = all.filter(r => {
          const start = new Date(r.fecha_inicio);
          const end = new Date(r.fecha_fin);
          start.setHours(0,0,0,0);
          end.setHours(0,0,0,0);
          return start <= today && end >= today && r.estado !== 'cancelada';
        });
        setActiveReservations(active);
        // Futuras: fecha_inicio > hoy y no cancelada
        const future = all.filter(r => {
          const start = new Date(r.fecha_inicio);
          start.setHours(0,0,0,0);
          return start > today && r.estado !== 'cancelada';
        });
        setFutureReservations(future);
        
        // Calcular ingresos mensuales a partir de reservas confirmadas
        const ingresos = calcularIngresosMes(all);
        setIngresosMes(ingresos);
        
        // Log detallado para depuración
        const hoy = new Date();
        const primerDiaMes = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
        const ultimoDiaMes = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0);
        
        console.log('Ingresos del mes calculados:', {
          total: ingresos,
          mesActual: hoy.toLocaleDateString('es-CO', { month: 'long', year: 'numeric' }),
          fechaInicio: primerDiaMes.toISOString().split('T')[0],
          fechaFin: ultimoDiaMes.toISOString().split('T')[0],
          reservasPagadas: all.filter(r => r.pago_confirmado && 
            new Date(r.fecha_reserva) >= primerDiaMes && 
            new Date(r.fecha_reserva) <= ultimoDiaMes).length
        });
      } catch (e) {
        console.error('Error al cargar reservas:', e);
        setActiveReservations([]);
        setFutureReservations([]);
        setIngresosMes(0);
      }
      setLoadingActive(false);
    };
    fetchReservations();
  }, []);

  // Cargar espacios desde el backend
  useEffect(() => {
    const fetchSpaces = async () => {
      setLoadingSpaces(true);
      try {
        const data = await reservationService.getRooms();
        setSpaces(data);
      } catch (e) {
        setSpaces([]);
      } finally {
        setLoadingSpaces(false);
      }
    };
    fetchSpaces();
  }, []);

  // Cargar usuarios reales al cambiar a la pestaña Usuarios
  useEffect(() => {
    if (activeTab === 'users') {
      setLoadingUsers(true);
      userService.getAllUsers()
        .then(data => setUsers(data))
        .catch(() => setUsers([]))
        .finally(() => setLoadingUsers(false));
    }
  }, [activeTab]);

  // Detectar query param ?created=1 y mostrar mensaje de éxito y la pestaña de espacios al llegar desde la creación.
  React.useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('created') === '1') {
      setActiveTab('spaces');
      setShowCreatedMessage(true);
      setTimeout(() => setShowCreatedMessage(false), 2500);
    }
  }, [location.search]);

  // Datos de ejemplo
  const monthlyReservations = [
    { name: 'Ene', reservas: 12 },
    { name: 'Feb', reservas: 15 },
    { name: 'Mar', reservas: 18 },
    { name: 'Abr', reservas: 14 },
    { name: 'May', reservas: 20 },
    { name: 'Jun', reservas: 25 }
  ];

  const occupancyData = [
    { name: 'Ocupadas', value: 7 },
    { name: 'Disponibles', value: 3 }
  ];

  const weeklyIncome = [
    { name: 'Lun', ingresos: 2500000 },
    { name: 'Mar', ingresos: 3200000 },
    { name: 'Mié', ingresos: 2800000 },
    { name: 'Jue', ingresos: 3500000 },
    { name: 'Vie', ingresos: 4200000 },
    { name: 'Sáb', ingresos: 4800000 },
    { name: 'Dom', ingresos: 4000000 }
  ];

  const notifications = [
    {
      id: 1,
      type: "reservation",
      message: "Nueva reserva pendiente de confirmación",
      time: "Hace 5 minutos"
    },
    {
      id: 2,
      type: "payment",
      message: "Pago recibido de María Rodríguez",
      time: "Hace 30 minutos"
    },
    {
      id: 3,
      type: "system",
      message: "Mantenimiento programado para mañana",
      time: "Hace 1 hora"
    }
  ];

  const COLORS = ['#2A9D8F', '#E9C46A', '#F4A261', '#E76F51'];

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(value);
  };

  // Utilidad para formatear fechas a 'YYYY-MM-DD' (útil para cualquier PATCH de reservas)
  const toYYYYMMDD = (d) => {
    if (!d) return undefined;
    if (typeof d === 'string' && d.length === 10) return d;
    if (typeof d === 'string') return d.slice(0, 10);
    if (d instanceof Date) return d.toISOString().slice(0, 10);
    return undefined;
  };

  // Función para calcular los ingresos del mes actual basado en la fecha de creación de la reserva
  const calcularIngresosMes = (reservas) => {
    if (!reservas || reservas.length === 0) return 0;
    
    // Obtener el primer y último día del mes actual
    const hoy = new Date();
    const primerDiaMes = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
    const ultimoDiaMes = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0);
    
    // Filtrar reservas confirmadas (pagadas) realizadas en el mes actual
    const reservasPagadasDelMes = reservas.filter(r => {
      // Verificar si la reserva está pagada/confirmada
      if (!r.pago_confirmado) return false;
      
      // Convertir fecha de reserva a objeto Date
      const fechaReserva = new Date(r.fecha_reserva);
      
      // Verificar si la reserva se realizó en el mes actual
      return (fechaReserva >= primerDiaMes && fechaReserva <= ultimoDiaMes);
    });
    
    // Sumar los costos totales de las reservas confirmadas
    return reservasPagadasDelMes.reduce((total, r) => total + (r.costo_total || 0), 0);
  };

  const renderOverviewTab = () => (
    <>
      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-lg cursor-pointer" onClick={() => setShowActiveModal(true)}>
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 p-3 rounded-xl">
              <Calendar className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h3 className="text-sm text-neutral-600">Reservas Activas</h3>
              <p className="text-2xl font-bold">{loadingActive ? '...' : activeReservations.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 p-3 rounded-xl">
              <DollarSign className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h3 className="text-sm text-neutral-600">Ingresos del Mes</h3>
              <p className="text-2xl font-bold">
                {loadingActive ? (
                  <span className="animate-pulse">Calculando...</span>
                ) : (
                  formatCurrency(ingresosMes)
                )}
              </p>
              <p className="text-xs text-neutral-500">
                Reservas realizadas en {new Date().toLocaleDateString('es-CO', { month: 'long', year: 'numeric' })}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 p-3 rounded-xl">
              <BarChartIcon className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h3 className="text-sm text-neutral-600">Ocupación</h3>
              <p className="text-2xl font-bold">70%</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 p-3 rounded-xl">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h3 className="text-sm text-neutral-600">Clientes Registrados</h3>
              <p className="text-2xl font-bold">156</p>
            </div>
          </div>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Reservas por Mes</h2>
            <select 
              className="input h-9 text-sm"
              value={selectedDateRange}
              onChange={(e) => setSelectedDateRange(e.target.value)}
            >
              <option value="week">Última semana</option>
              <option value="month">Último mes</option>
              <option value="year">Último año</option>
            </select>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyReservations}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="reservas" fill="#2A9D8F" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-bold mb-6">Ocupación Actual</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={occupancyData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {occupancyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Ingresos */}
      <div className="bg-white rounded-2xl p-6 shadow-lg mb-8">
        <h2 className="text-xl font-bold mb-6">Ingresos por Semana</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={weeklyIncome}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis tickFormatter={(value) => `$${value / 1000000}M`} />
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Legend />
              <Line type="monotone" dataKey="ingresos" stroke="#2A9D8F" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Reservas y Alertas */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Próximas Reservas</h2>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                icon={<PlusCircle size={18} />}
                onClick={() => window.open('/admin/crear-alojamiento', '_blank')}
              >
                Nuevo Reserva
              </Button>
              <Button
                variant="outline"
                size="sm"
                icon={<Download size={18} />}
              >
                Exportar
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-200">
                  <th className="text-left py-3 px-4">Cliente</th>
                  <th className="text-left py-3 px-4">Alojamiento</th>
                  <th className="text-left py-3 px-4">Fechas</th>
                  <th className="text-left py-3 px-4">Monto</th>
                  <th className="text-left py-3 px-4">Estado</th>
                  <th className="text-left py-3 px-4">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {futureReservations.length === 0 ? (
                  <tr><td colSpan={6} className="text-center py-6 text-neutral-500">No hay próximas reservas.</td></tr>
                ) : (
                  futureReservations.map((reservation) => (
                    <tr key={reservation.id_reserva} className="border-b border-neutral-100 hover:bg-neutral-50">
                      <td className="py-3 px-4">{`${reservation.nombre} ${reservation.apellido}`}</td>
                      <td className="py-3 px-4">{reservation.alojamiento_nombre || '-'}</td>
                      <td className="py-3 px-4">{`${reservation.fecha_inicio} - ${reservation.fecha_fin}`}</td>
                      <td className="py-3 px-4">{reservation.costo_total ? formatCurrency(reservation.costo_total) : '-'}</td>
                      <td className="py-3 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          reservation.estado === 'pagada' || reservation.estado === 'paid'
                            ? 'bg-green-100 text-green-800'
                            : reservation.estado === 'pendiente' || reservation.estado === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {reservation.estado === 'pagada' || reservation.estado === 'paid'
                            ? 'Pagado'
                            : reservation.estado === 'pendiente' || reservation.estado === 'pending'
                            ? 'Pendiente'
                            : 'Confirmado'}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" icon={<Edit2 size={16} />}>Editar</Button>
                          <Button variant="outline" size="sm" className="text-red-600 hover:bg-red-50" icon={<Trash2 size={16} />}>Cancelar</Button>
                          {!(reservation.estado === 'pagada' || reservation.estado === 'paid') && (
                            <Button 
                              variant="primary" 
                              size="sm" 
                              className="text-white bg-green-600 hover:bg-green-700"
                              onClick={() => handleConfirmPayment(reservation.id_reserva)}
                            >
                              Confirmar pago
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-bold mb-6">Alertas</h2>
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`flex items-start gap-3 p-4 rounded-xl ${
                  notification.type === 'reservation'
                    ? 'bg-blue-50'
                    : notification.type === 'payment'
                    ? 'bg-green-50'
                    : 'bg-yellow-50'
                }`}
              >
                {notification.type === 'reservation' ? (
                  <Calendar className="w-5 h-5 text-blue-600 flex-shrink-0" />
                ) : notification.type === 'payment' ? (
                  <DollarSign className="w-5 h-5 text-green-600 flex-shrink-0" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0" />
                )}
                <div>
                  <p className="font-medium text-neutral-900">{notification.message}</p>
                  <p className="text-sm text-neutral-600">{notification.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal de Reservas Activas */}
      {showActiveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl p-8 relative">
            <button
              className="absolute top-4 right-4 text-neutral-500 hover:text-primary text-2xl"
              onClick={() => setShowActiveModal(false)}
            >
              ×
            </button>
            <h2 className="text-2xl font-bold mb-6">Reservas Activas</h2>
            {loadingActive ? (
              <div className="text-center py-8">Cargando...</div>
            ) : activeReservations.length === 0 ? (
              <div className="text-center py-8 text-neutral-500">No hay reservas activas.</div>
            ) : (
              <div className="overflow-x-auto max-h-[60vh]">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-neutral-200">
                      <th className="text-left py-3 px-4">Cliente</th>
                      <th className="text-left py-3 px-4">Alojamiento</th>
                      <th className="text-left py-3 px-4">Fecha inicio</th>
                      <th className="text-left py-3 px-4">Fecha fin</th>
                      <th className="text-left py-3 px-4">Estado</th>
                      <th className="text-left py-3 px-4">Monto</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeReservations.map((r) => (
                      <tr key={r.id_reserva} className="border-b border-neutral-100 hover:bg-neutral-50">
                        <td className="py-3 px-4">{`${r.nombre} ${r.apellido}`}</td>
                        <td className="py-3 px-4">{r.alojamiento_nombre || '-'}</td>
                        <td className="py-3 px-4">{r.fecha_inicio}</td>
                        <td className="py-3 px-4">{r.fecha_fin}</td>
                        <td className="py-3 px-4">{r.estado}</td>
                        <td className="py-3 px-4">{r.costo_total ? formatCurrency(r.costo_total) : '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal para crear nuevo espacio: ahora visible en cualquier pestaña */}
      {showNewSpaceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 overflow-auto">
          <form 
            onSubmit={handleCreateSpace}
            className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-8 relative"
            style={{ minWidth: '320px', maxHeight: '95vh', overflowY: 'auto' }}
          >
            <button type="button" className="absolute top-4 right-4 text-neutral-500 hover:text-primary text-2xl" onClick={() => setShowNewSpaceModal(false)}>
              ×
            </button>
            <h2 className="text-2xl font-bold mb-6 text-center">Nuevo Alojamiento</h2>
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
      )}

      {/* Modal de confirmación de eliminación */}
      {deleteModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 text-center">
            <h2 className="text-xl font-bold mb-4">¿Estás seguro de que deseas eliminar este alojamiento?</h2>
            <p className="mb-6 text-neutral-600">Esta acción no se puede deshacer.</p>
            <div className="flex justify-center gap-4">
              <Button variant="primary" onClick={confirmDeleteAlojamiento}>Aceptar</Button>
              <Button variant="outline" onClick={cancelDeleteAlojamiento}>Cancelar</Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para subir imágenes SOLO en Espacios */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 text-center">
            <h3 className="text-lg font-bold mb-4">Subir imagen a galería</h3>
            <form onSubmit={handleUploadImage} className="space-y-4">
              <div>
                <label className="block mb-1 font-medium">Tipo de alojamiento</label>
                <select value={uploadTipo} onChange={e => setUploadTipo(e.target.value)} className="input w-full">
                  <option value="finca">Finca</option>
                  <option value="cabaña">Cabaña</option>
                  <option value="glamping">Glamping</option>
                </select>
              </div>
              <div>
                <label className="block mb-1 font-medium">Imagen</label>
                <input type="file" accept="image/*" onChange={e => setUploadFile(e.target.files[0])} className="input w-full" />
              </div>
              <div className="flex gap-2 justify-center mt-4">
                <Button type="button" variant="outline" onClick={() => setShowUploadModal(false)}>Cancelar</Button>
                <Button type="submit" variant="primary">Subir</Button>
              </div>
            </form>
            {uploadMsg && <div className="mt-2 text-center text-sm text-green-600">{uploadMsg}</div>}
          </div>
        </div>
      )}

      {showGlobalMsg && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-all animate-fade-in">
          {globalMsg}
        </div>
      )}
    </>
  );

  const renderUsersTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Gestión de Usuarios</h2>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              icon={<PlusCircle size={18} />}
            >
              Nuevo Usuario
            </Button>
            <Button
              variant="outline"
              size="sm"
              icon={<Download size={18} />}
            >
              Exportar
            </Button>
          </div>
        </div>

        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Buscar usuarios..."
              className="input pl-10"
            />
          </div>
          <Button
            variant="outline"
            icon={<Filter size={18} />}
          >
            Filtros
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-200">
                <th className="text-left py-3 px-4">Nombre</th>
                <th className="text-left py-3 px-4">Email</th>
                <th className="text-left py-3 px-4">Teléfono</th>
                <th className="text-left py-3 px-4">Rol</th>
                <th className="text-left py-3 px-4">Estado</th>
                <th className="text-left py-3 px-4">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {loadingUsers ? (
                <tr><td colSpan={7} className="text-center py-6 text-neutral-500">Cargando usuarios...</td></tr>
              ) : users.length === 0 ? (
                <tr><td colSpan={7} className="text-center py-6 text-neutral-500">No hay usuarios registrados.</td></tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id_cliente} className="border-b border-neutral-100 hover:bg-neutral-50">
                    <td className="py-3 px-4">{user.nombre} {user.apellido}</td>
                    <td className="py-3 px-4">{user.email}</td>
                    <td className="py-3 px-4">{user.telefono}</td>
                    <td className="py-3 px-4">{user.rol || '-'}</td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${user.estado === 'activo' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}> 
                        {user.estado === 'activo' ? 'Activo' : 'Inactivo'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" icon={<Edit2 size={16} />}>
                          Editar
                        </Button>
                        <Button variant="outline" size="sm" icon={<Mail size={16} />}>
                          Contactar
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-red-600 hover:bg-red-50"
                          icon={<Trash2 size={16} />}
                        >
                          Eliminar
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderSpacesTab = () => (
    <div className="space-y-6">
      {showGlobalMsg && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-all animate-fade-in">
          {globalMsg}
        </div>
      )}
      {showCreatedMessage && (
        <div className="flex justify-center items-center py-8">
          <div className="bg-green-100 text-green-800 px-6 py-4 rounded-xl text-lg font-semibold shadow">
            {createdMessageText}
          </div>
        </div>
      )}
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Gestión de Espacios</h2>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              icon={<PlusCircle size={18} />}
              onClick={() => window.location.href = '/admin/crear-alojamiento'}
            >
              Nuevo Alojamiento
            </Button>
            <Button
              variant="outline"
              size="sm"
              icon={<Upload size={18} />}
              onClick={() => setShowUploadModal(true)}
            >
              Subir Imágenes
            </Button>
          </div>
        </div>

        {loadingSpaces ? (
          <div className="text-center py-8">Cargando espacios...</div>
        ) : spaces.length === 0 ? (
          <div className="text-center py-8 text-neutral-500">No hay espacios disponibles.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {spaces.map((space) => (
              <div key={space.id} className="border border-neutral-200 rounded-xl p-4">
                <div className="aspect-video rounded-lg bg-neutral-100 mb-4 overflow-hidden relative">
                  {galeriaPorTipo[space.tipo?.toLowerCase()] && galeriaPorTipo[space.tipo?.toLowerCase()].length > 0 ? (
                    <Carousel images={galeriaPorTipo[space.tipo?.toLowerCase()]} nombre={space.nombre} />
                  ) : (
                    <img
                      src="https://images.pexels.com/photos/2662816/pexels-photo-2662816.jpeg"
                      alt={space.nombre}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  )}
                </div>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold">{space.nombre}</h3>
                    <p className="text-sm text-neutral-600 capitalize">{space.tipo}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    space.estado === 'available' 
                      ? 'bg-green-100 text-green-800'
                      : space.estado === 'occupied'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {space.estado === 'available' ? 'Disponible' : 
                     space.estado === 'occupied' ? 'Ocupado' : 'Mantenimiento'}
                  </span>
                </div>
                <div className="text-neutral-700 mb-2 text-sm line-clamp-2">{space.descripcion}</div>
                <div className="flex items-center gap-2 mb-2">
                  <Users size={16} className="text-neutral-500" />
                  <span className="text-sm text-neutral-600">
                    Capacidad: {space.capacidad} personas
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mb-2">
                  {space.comodidades && space.comodidades.slice(0, 3).map((c, i) => (
                    <span key={i} className="inline-flex items-center bg-neutral-100 text-neutral-700 px-3 py-1 rounded-full text-xs">
                      {c}
                    </span>
                  ))}
                  {space.comodidades && space.comodidades.length > 3 && (
                    <span className="inline-flex items-center bg-neutral-100 text-neutral-700 px-3 py-1 rounded-full text-xs">
                      +{space.comodidades.length - 3} más
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-neutral-600">Precio por noche</p>
                    <p className="font-semibold">${space.precio_por_noche}</p>
                  </div>
                  <div className="flex items-center">
                    <Star size={16} className="text-yellow-400 fill-current" />
                    <span className="ml-1">4.8</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    fullWidth
                    icon={<Edit2 size={16} />}
                    onClick={() => navigate(`/admin/espacios/${space.id}/editar`)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    fullWidth
                    icon={<Image size={16} />}
                  >
                    Galería
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    fullWidth
                    icon={<Trash2 size={16} />}
                    onClick={() => handleDeleteAlojamiento(space.id)}
                  >
                    Eliminar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal para subir imágenes SOLO en Espacios */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 text-center">
            <h3 className="text-lg font-bold mb-4">Subir imagen a galería</h3>
            <form onSubmit={handleUploadImage} className="space-y-4">
              <div>
                <label className="block mb-1 font-medium">Tipo de alojamiento</label>
                <select value={uploadTipo} onChange={e => setUploadTipo(e.target.value)} className="input w-full">
                  <option value="finca">Finca</option>
                  <option value="cabaña">Cabaña</option>
                  <option value="glamping">Glamping</option>
                </select>
              </div>
              <div>
                <label className="block mb-1 font-medium">Imagen</label>
                <input type="file" accept="image/*" onChange={e => setUploadFile(e.target.files[0])} className="input w-full" />
              </div>
              <div className="flex gap-2 justify-center mt-4">
                <Button type="button" variant="outline" onClick={() => setShowUploadModal(false)}>Cancelar</Button>
                <Button type="submit" variant="primary">Subir</Button>
              </div>
            </form>
            {uploadMsg && <div className="mt-2 text-center text-sm text-green-600">{uploadMsg}</div>}
          </div>
        </div>
      )}
    </div>
  );

  const renderSettingsTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <h2 className="text-xl font-bold mb-6">Configuración del Sistema</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-4">General</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Nombre del Sitio
                </label>
                <input
                  type="text"
                  className="input"
                  defaultValue="Finca Cheona"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Email de Contacto
                </label>
                <input
                  type="email"
                  className="input"
                  defaultValue="contacto@fincacheona.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Teléfono
                </label>
                <input
                  type="tel"
                  className="input"
                  defaultValue="+57 300 123 4567"
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Reservas</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Hora de Check-in
                </label>
                <input
                  type="time"
                  className="input"
                  defaultValue="15:00"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Hora de Check-out
                </label>
                <input
                  type="time"
                  className="input"
                  defaultValue="12:00"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1">
                  Mínimo de noches
                </label>
                <input
                  type="number"
                  className="input"
                  defaultValue="2"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-200 mt-6 pt-6">
          <h3 className="font-semibold mb-4">Notificaciones</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Notificaciones por email</p>
                <p className="text-sm text-neutral-600">Recibe alertas de nuevas reservas</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Notificaciones push</p>
                <p className="text-sm text-neutral-600">Recibe notificaciones en tiempo real</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
        </div>

        <div className="border-t border-neutral-200 mt-6 pt-6">
          <h3 className="font-semibold mb-4">Políticas</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Política de Cancelación
              </label>
              <textarea
                className="input"
                rows={4}
                defaultValue="Cancelación gratuita hasta 7 días antes de la llegada. Después de esta fecha, se aplicará un cargo del 50% del valor total."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                Términos y Condiciones
              </label>
              <textarea
                className="input"
                rows={4}
                defaultValue="Los huéspedes deben respetar las normas de convivencia y cuidado de las instalaciones..."
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <Button variant="primary" icon={<Save size={18} />}>
            Guardar Cambios
          </Button>
        </div>
      </div>
    </div>
  );

  // --- FUNCIÓN PARA CONFIRMAR PAGO ---
  const handleConfirmPayment = async (id_reserva) => {
    if (!window.confirm('¿Confirmar el pago de esta reserva?')) return;
    try {
      await reservationService.confirmPayment(id_reserva);
      
      // Refrescar todas las reservas
      const all = await reservationService.getAllReservationsWithClient();
      
      // Recalcular reservas futuras
      const today = new Date();
      today.setHours(0,0,0,0);
      
      const future = all.filter(r => {
        const start = new Date(r.fecha_inicio);
        start.setHours(0,0,0,0);
        return start > today && r.estado !== 'cancelada';
      });
      setFutureReservations(future);
      
      // Recalcular ingresos mensuales basados en la fecha de creación de la reserva
      const ingresos = calcularIngresosMes(all);
      setIngresosMes(ingresos);
      
      console.log('Ingresos recalculados después de confirmar pago:', ingresos);
      
      alert('Pago confirmado correctamente.');
    } catch (e) {
      console.error('Error al confirmar pago:', e);
      alert('No se pudo confirmar el pago.');
    }
  };

  const handleNewSpaceChange = (e) => {
    const { name, value } = e.target;
    setNewSpace((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateSpace = async (e) => {
    e.preventDefault();
    setCreatingSpace(true);
    try {
      await reservationService.createAlojamiento({
        ...newSpace,
        capacidad: Number(newSpace.capacidad),
        precio_por_noche: Number(newSpace.precio_por_noche),
        comodidades: newSpace.comodidades.split(',').map(c => c.trim()),
        imagenes: newSpace.imagenes.split(',').map(i => i.trim()),
        servicios_adicionales: newSpace.servicios_adicionales ? newSpace.servicios_adicionales.split(',').map(s => s.trim()) : [],
      });
      setShowNewSpaceModal(false);
      setNewSpace({
        nombre: '', estado: 'available', capacidad: '', tipo: '', descripcion: '', comodidades: '', precio_por_noche: '', imagenes: '', servicios_adicionales: '', politicas: ''
      });
      // Refrescar lista
      const data = await reservationService.getRooms();
      setSpaces(data);
      setActiveTab('spaces');
      setShowCreatedMessage(true);
      setTimeout(() => setShowCreatedMessage(false), 2500);
    } catch (e) {
      alert('Error al crear el alojamiento');
    } finally {
      setCreatingSpace(false);
    }
  };

  // --- FUNCIÓN PARA ELIMINAR ALOJAMIENTO ---
  const handleDeleteAlojamiento = async (id) => {
    setDeleteModal({ open: true, id });
  };

  const confirmDeleteAlojamiento = async () => {
    if (!deleteModal.id) return;
    try {
      await reservationService.deleteAlojamiento(deleteModal.id);
      const data = await reservationService.getRooms();
      setSpaces(data);
      setCreatedMessageText('Alojamiento eliminado');
      setShowCreatedMessage(true);
      setTimeout(() => setShowCreatedMessage(false), 2500);
      setDeleteModal({ open: false, id: null });
    } catch (e) {
      alert('No se pudo eliminar el alojamiento.');
      setDeleteModal({ open: false, id: null });
    }
  };

  const cancelDeleteAlojamiento = () => {
    setDeleteModal({ open: false, id: null });
  };

  // Handler para subir imagen
  const handleUploadImage = async (e) => {
    e.preventDefault();
    if (!uploadFile) return setUploadMsg("Selecciona una imagen");
    try {
      await uploadGaleriaImage(uploadTipo, uploadFile);
      setGlobalMsg("Imagen subida correctamente");
      setShowGlobalMsg(true);
      setShowUploadModal(false);
      setUploadFile(null);
      setUploadTipo('finca');
      setTimeout(() => setShowGlobalMsg(false), 2500);
    } catch (err) {
      // Mostrar el mensaje real del backend si existe
      if (err.response && err.response.data) {
        setUploadMsg("Error: " + (typeof err.response.data === 'string' ? err.response.data : (err.response.data.detail || JSON.stringify(err.response.data))));
      } else {
        setUploadMsg("Error al subir la imagen");
      }
    }
  };

  useEffect(() => {
    const fetchGaleria = async () => {
      const tipos = ['finca', 'cabaña', 'glamping'];
      const result = {};
      for (const tipo of tipos) {
        try {
          result[tipo] = await getGaleriaImagesByTipo(tipo);
        } catch {
          result[tipo] = [];
        }
      }
      setGaleriaPorTipo(result);
    };
    fetchGaleria();
  }, []);

  return (
    <div className="min-h-screen bg-neutral-50 pt-20">
      <div className="container-custom py-12">
        {/* Navegación */}
        <div className="bg-white rounded-2xl shadow-lg mb-8">
          <div className="flex items-center gap-2 p-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex items-center gap-2 px-4 py-2 rounde
d-xl transition-colors ${
                activeTab === 'overview'
                  ? 'bg-primary text-white'
                  : 'hover:bg-neutral-100'
              }`}
            >
              <BarChartIcon size={20} />
              <span>Vista General</span>
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors ${
                activeTab === 'users'
                  ? 'bg-primary text-white'
                  : 'hover:bg-neutral-100'
              }`}
            >
              <Users size={20} />
              <span>Usuarios</span>
            </button>
            <button
              onClick={() => setActiveTab('spaces')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors ${
                activeTab === 'spaces'
                  ? 'bg-primary text-white'
                  : 'hover:bg-neutral-100'
              }`}
            >
              <Home size={20} />
              <span>Espacios</span>
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors ${
                activeTab === 'settings'
                  ? 'bg-primary text-white'
                  : 'hover:bg-neutral-100'
              }`}
            >
              <Settings size={20} />
              <span>Configuración</span>
            </button>
          </div>
        </div>

        {/* Contenido */}
        {activeTab === 'overview' && renderOverviewTab()}
        {activeTab === 'users' && renderUsersTab()}
        {activeTab === 'spaces' && renderSpacesTab()}
        {activeTab === 'settings' && renderSettingsTab()}
      </div>
      {/* Modal de confirmación de eliminación: ahora global para todas las pestañas */}
      {deleteModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 text-center">
            <h2 className="text-xl font-bold mb-4">¿Estás seguro de que deseas eliminar este alojamiento?</h2>
            <p className="mb-6 text-neutral-600">Esta acción no se puede deshacer.</p>
            <div className="flex justify-center gap-4">
              <Button variant="primary" onClick={confirmDeleteAlojamiento}>Aceptar</Button>
              <Button variant="outline" onClick={cancelDeleteAlojamiento}>Cancelar</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Carrusel simple para imágenes
function Carousel({ images, nombre }) {
  const [index, setIndex] = React.useState(0);
  if (!images || images.length === 0) return null;
  const API_BASE_URL = 'http://localhost:8000';
  const goPrev = (e) => {
    e.stopPropagation();
    setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };
  const goNext = (e) => {
    e.stopPropagation();
    setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };
  return (
    <div className="relative w-full h-full flex items-center justify-center group select-none">
      <img
        src={`${API_BASE_URL}${images[index]}`}
        alt={nombre}
        className="w-full h-full object-cover rounded-lg transition-all duration-500 shadow-lg"
        style={{ minHeight: 180, maxHeight: 260 }}
      />
      {images.length > 1 && (
        <>
          {/* Overlay para mejor contraste */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent rounded-lg pointer-events-none transition-all duration-300" />
          {/* Flechas */}
          <button
            onClick={goPrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-primary hover:text-white text-primary rounded-full p-2 shadow-lg z-10 text-2xl font-bold opacity-0 group-hover:opacity-100 transition-all duration-200"
            aria-label="Anterior"
          >
            &#8592;
          </button>
          <button
            onClick={goNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-primary hover:text-white text-primary rounded-full p-2 shadow-lg z-10 text-2xl font-bold opacity-0 group-hover:opacity-100 transition-all duration-200"
            aria-label="Siguiente"
          >
            &#8594;
          </button>
          {/* Indicadores */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {images.map((_, i) => (
              <span
                key={i}
                className={`inline-block w-3 h-3 rounded-full border-2 ${i === index ? 'bg-green-600 border-white scale-110' : 'bg-white/70 border-green-600'} transition-all duration-200`}
                style={{ boxShadow: i === index ? '0 0 6px #16a34a' : undefined }}
              ></span>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;