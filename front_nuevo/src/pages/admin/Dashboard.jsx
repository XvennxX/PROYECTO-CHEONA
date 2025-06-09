import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedDateRange, setSelectedDateRange] = useState('week');
  
  // Redirigir si el usuario no es admin
  React.useEffect(() => {
    if (user?.rol !== 'admin') {
      navigate('/');
    }
  }, [user, navigate]);

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

  const recentUsers = [
    {
      id: 1,
      name: "María Rodríguez",
      email: "maria@example.com",
      phone: "+57 300 123 4567",
      registeredDate: "2025-03-15",
      reservations: 3,
      status: "active"
    },
    {
      id: 2,
      name: "Juan Pérez",
      email: "juan@example.com",
      phone: "+57 300 987 6543",
      registeredDate: "2025-03-14",
      reservations: 1,
      status: "active"
    },
    {
      id: 3,
      name: "Ana García",
      email: "ana@example.com",
      phone: "+57 300 456 7890",
      registeredDate: "2025-03-13",
      reservations: 2,
      status: "inactive"
    }
  ];

  const upcomingReservations = [
    {
      id: 1,
      client: "María Rodríguez",
      accommodation: "Cabaña El Roble",
      dates: "27-29 Mayo",
      status: "paid",
      amount: "1.200.000"
    },
    {
      id: 2,
      client: "Juan Pérez",
      accommodation: "Domo Celestial",
      dates: "1-3 Junio",
      status: "pending",
      amount: "800.000"
    },
    {
      id: 3,
      client: "Ana García",
      accommodation: "Cabaña El Valle",
      dates: "5-7 Junio",
      status: "confirmed",
      amount: "950.000"
    }
  ];

  const spaces = [
    {
      id: 1,
      name: "Cabaña El Roble",
      type: "cabin",
      capacity: 4,
      price: "1.200.000",
      status: "available"
    },
    {
      id: 2,
      name: "Domo Celestial",
      type: "glamping",
      capacity: 2,
      price: "800.000",
      status: "occupied"
    },
    {
      id: 3,
      name: "Cabaña El Valle",
      type: "cabin",
      capacity: 6,
      price: "1.500.000",
      status: "maintenance"
    }
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

  const renderOverviewTab = () => (
    <>
      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 p-3 rounded-xl">
              <Calendar className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h3 className="text-sm text-neutral-600">Reservas Activas</h3>
              <p className="text-2xl font-bold">24</p>
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
              <p className="text-2xl font-bold">{formatCurrency(45000000)}</p>
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
              >
                Nueva Reserva
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
                {upcomingReservations.map((reservation) => (
                  <tr key={reservation.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                    <td className="py-3 px-4">{reservation.client}</td>
                    <td className="py-3 px-4">{reservation.accommodation}</td>
                    <td className="py-3 px-4">{reservation.dates}</td>
                    <td className="py-3 px-4">${reservation.amount}</td>
                    <td className="py-3 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        reservation.status === 'paid' 
                          ? 'bg-green-100 text-green-800'
                          : reservation.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {reservation.status === 'paid' ? 'Pagado' : 
                         reservation.status === 'pending' ? 'Pendiente' : 'Confirmado'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" icon={<Edit2 size={16} />}>
                          Editar
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-red-600 hover:bg-red-50"
                          icon={<Trash2 size={16} />}
                        >
                          Cancelar
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
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
                <th className="text-left py-3 px-4">Registro</th>
                <th className="text-left py-3 px-4">Reservas</th>
                <th className="text-left py-3 px-4">Estado</th>
                <th className="text-left py-3 px-4">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {recentUsers.map((user) => (
                <tr key={user.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                  <td className="py-3 px-4">{user.name}</td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4">{user.phone}</td>
                  <td className="py-3 px-4">{user.registeredDate}</td>
                  <td className="py-3 px-4">{user.reservations}</td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      user.status === 'active' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {user.status === 'active' ? 'Activo' : 'Inactivo'}
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderSpacesTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Gestión de Espacios</h2>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              icon={<PlusCircle size={18} />}
            >
              Nuevo Espacio
            </Button>
            <Button
              variant="outline"
              size="sm"
              icon={<Upload size={18} />}
            >
              Subir Imágenes
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {spaces.map((space) => (
            <div key={space.id} className="border border-neutral-200 rounded-xl p-4">
              <div className="aspect-video rounded-lg bg-neutral-100 mb-4">
                <img
                  src="https://images.pexels.com/photos/2662816/pexels-photo-2662816.jpeg"
                  alt={space.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-semibold">{space.name}</h3>
                  <p className="text-sm text-neutral-600 capitalize">{space.type}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  space.status === 'available' 
                    ? 'bg-green-100 text-green-800'
                    : space.status === 'occupied'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {space.status === 'available' ? 'Disponible' : 
                   space.status === 'occupied' ? 'Ocupado' : 'Mantenimiento'}
                </span>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <Users size={16} className="text-neutral-500" />
                <span className="text-sm text-neutral-600">
                  Capacidad: {space.capacity} personas
                </span>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-neutral-600">Precio por noche</p>
                  <p className="font-semibold">${space.price}</p>
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
              </div>
            </div>
          ))}
        </div>
      </div>
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
    </div>
  );
};

export default Dashboard;