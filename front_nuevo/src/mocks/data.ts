import { Room, Testimonial } from '../types';

export const rooms: Room[] = [
  {
    id: 1,
    name: "Cabaña El Roble",
    type: "cabin",
    description: "Acogedora cabaña de madera con vistas al bosque. Perfecta para parejas que buscan un retiro romántico en la naturaleza.",
    capacity: 2,
    price: 120,
    size: "45m²",
    images: [
      "https://images.pexels.com/photos/5997993/pexels-photo-5997993.jpeg",
      "https://images.pexels.com/photos/6492397/pexels-photo-6492397.jpeg",
      "https://images.pexels.com/photos/6585601/pexels-photo-6585601.jpeg"
    ],
    amenities: [
      "Chimenea",
      "Terraza privada",
      "Jacuzzi exterior",
      "Wi-Fi",
      "Desayuno incluido",
      "Baño completo",
      "Ropa de cama premium"
    ],
    features: [
      "Vista al bosque",
      "Aislada y privada",
      "Acceso directo a senderos"
    ],
    policies: {
      checkIn: "15:00",
      checkOut: "11:00",
      minStay: 2,
      cancellation: "Gratuita hasta 7 días antes"
    },
    available: true,
    rating: 4.8,
    reviews: 24
  },
  {
    id: 2,
    name: "Cabaña El Valle",
    type: "cabin",
    description: "Espaciosa cabaña familiar con tres habitaciones y amplias vistas al valle. Ideal para familias o grupos de amigos.",
    capacity: 6,
    price: 250,
    size: "120m²",
    images: [
      "https://images.pexels.com/photos/2360673/pexels-photo-2360673.jpeg",
      "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg",
      "https://images.pexels.com/photos/4112553/pexels-photo-4112553.jpeg"
    ],
    amenities: [
      "Cocina completa",
      "Barbacoa",
      "Piscina compartida",
      "Jardín privado",
      "Estacionamiento",
      "Wi-Fi",
      "Smart TV"
    ],
    features: [
      "Vista panorámica",
      "Terraza amplia",
      "Zona de juegos"
    ],
    policies: {
      checkIn: "15:00",
      checkOut: "11:00",
      minStay: 2,
      cancellation: "Gratuita hasta 14 días antes"
    },
    available: true,
    rating: 4.9,
    reviews: 36
  },
  {
    id: 3,
    name: "Domo Celestial",
    type: "glamping",
    description: "Exclusivo domo geodésico con techo transparente para observar las estrellas. Una experiencia única de glamping.",
    capacity: 2,
    price: 180,
    size: "30m²",
    images: [
      "https://images.pexels.com/photos/2662816/pexels-photo-2662816.jpeg",
      "https://images.pexels.com/photos/2440471/pexels-photo-2440471.jpeg",
      "https://images.pexels.com/photos/2659629/pexels-photo-2659629.jpeg"
    ],
    amenities: [
      "Cama king size",
      "Baño privado",
      "Calefacción",
      "Mini nevera",
      "Set de té y café",
      "Iluminación ambiental"
    ],
    features: [
      "Techo transparente",
      "Vista 360°",
      "Aislamiento térmico"
    ],
    policies: {
      checkIn: "15:00",
      checkOut: "11:00",
      minStay: 1,
      cancellation: "Gratuita hasta 7 días antes"
    },
    available: true,
    rating: 4.9,
    reviews: 18
  },
  {
    id: 4,
    name: "Tienda Safari Deluxe",
    type: "glamping",
    description: "Amplia tienda safari elevada con terraza privada y todas las comodidades de un hotel boutique.",
    capacity: 4,
    price: 200,
    size: "40m²",
    images: [
      "https://images.pexels.com/photos/6757788/pexels-photo-6757788.jpeg",
      "https://images.pexels.com/photos/6757779/pexels-photo-6757779.jpeg",
      "https://images.pexels.com/photos/6757789/pexels-photo-6757789.jpeg"
    ],
    amenities: [
      "Camas queen size",
      "Baño completo",
      "Ducha exterior",
      "Ventilador",
      "Mobiliario de lujo",
      "Desayuno incluido"
    ],
    features: [
      "Estructura elevada",
      "Terraza privada",
      "Vista al amanecer"
    ],
    policies: {
      checkIn: "15:00",
      checkOut: "11:00",
      minStay: 2,
      cancellation: "Gratuita hasta 7 días antes"
    },
    available: true,
    rating: 4.7,
    reviews: 15
  }
];

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "María Rodríguez",
    date: "Marzo 2025",
    rating: 5,
    comment: "Nuestra estancia en la Cabaña El Roble fue mágica. La tranquilidad del bosque y las instalaciones superaron nuestras expectativas.",
    avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg"
  },
  {
    id: 2,
    name: "Juan Gómez",
    date: "Febrero 2025",
    rating: 4,
    comment: "El Domo Celestial es una experiencia única. Ver las estrellas desde la cama es algo que no olvidaremos.",
    avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
  },
  {
    id: 3,
    name: "Ana Martínez",
    date: "Enero 2025",
    rating: 5,
    comment: "La Tienda Safari es perfecta para familias. Los niños lo pasaron genial y las comodidades son excelentes.",
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
  }
];

export const availabilityMock = {
  busy: [
    { start: new Date(2025, 2, 10), end: new Date(2025, 2, 15) },
    { start: new Date(2025, 2, 20), end: new Date(2025, 2, 22) },
    { start: new Date(2025, 3, 1), end: new Date(2025, 3, 5) },
    { start: new Date(2025, 3, 15), end: new Date(2025, 3, 20) }
  ]
};

export const services = [
  {
    id: 1,
    name: "Desayuno Gourmet",
    description: "Disfruta de un desayuno elaborado con productos locales y orgánicos, servido en tu alojamiento o en nuestro comedor.",
    icon: "Coffee"
  },
  {
    id: 2,
    name: "Spa y Bienestar",
    description: "Relájate con nuestros tratamientos de spa y masajes, utilizando productos naturales y técnicas tradicionales.",
    icon: "Spa"
  },
  {
    id: 3,
    name: "Actividades al Aire Libre",
    description: "Participa en excursiones guiadas, senderismo, y actividades de aventura en nuestro entorno natural.",
    icon: "Mountain"
  },
  {
    id: 4,
    name: "Servicio de Limpieza",
    description: "Mantenemos tu alojamiento impecable con nuestro servicio diario de limpieza y cambio de ropa de cama.",
    icon: "Sparkles"
  }
];