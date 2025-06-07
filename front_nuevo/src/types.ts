export interface Room {
  id: number;
  name: string;
  type: 'cabin' | 'glamping';
  description: string;
  capacity: number;
  price: number;
  size: string;
  images: string[];
  amenities: string[];
  features: string[];
  policies: {
    checkIn: string;
    checkOut: string;
    minStay: number;
    cancellation: string;
  };
  available: boolean;
  rating: number;
  reviews: number;
}

export interface Testimonial {
  id: number;
  name: string;
  date: string;
  rating: number;
  comment: string;
  avatar: string;
}

export interface Service {
  id: number;
  name: string;
  description: string;
  icon: string;
}

export interface DateRange {
  start: Date;
  end: Date;
}

export interface Availability {
  busy: DateRange[];
}