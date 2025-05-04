export  interface Car {
  id: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  seats: number;
  transmission: string;
  fuelType: string;
  image: string;
  description: string;
  available: boolean;
  location: string;
  category: string;
  driverId?: string;
}

export interface Booking {
  id: string;
  carId: string;
  userId: string;
  driverId?: string;
  startDate: Date | string;
  endDate: Date | string;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  paymentStatus: 'pending' | 'paid';
  createdAt: Date | string;
  pickupLocation?: string;
  dropoffLocation?: string;
  specialRequests?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  isAdmin: boolean;
  address?: string;
  profileImage?: string;
}

export interface Driver {
  id: string;
  name: string;
  email: string;
  phone: string;
  licenseNumber: string;
  experience: number;
  rating: number;
  available: boolean;
  image: string;
  specialties?: string[];
}
 