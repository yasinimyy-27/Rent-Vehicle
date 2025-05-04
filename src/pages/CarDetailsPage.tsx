import  { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { Car } from '../types';
import { 
  Calendar, 
  Users, 
  Zap, 
  Check, 
  AlertCircle,
  CreditCard 
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { format } from 'date-fns';

export const CarDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [totalDays, setTotalDays] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCar = async () => {
      if (!id) return;

      try {
        // First try to fetch from Firebase
        try {
          const docRef = doc(db, 'cars', id);
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists()) {
            setCar({ id: docSnap.id, ...docSnap.data() } as Car);
          } else {
            // Use mock data if the document doesn't exist
            const mockCar = getMockCarById(id);
            if (mockCar) {
              setCar(mockCar);
            } else {
              navigate('/cars');
            }
          }
        } catch (error) {
          console.error('Error fetching car from Firebase:', error);
          // Fallback to mock data
          const mockCar = getMockCarById(id);
          if (mockCar) {
            setCar(mockCar);
          } else {
            navigate('/cars');
          }
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [id, navigate]);

  useEffect(() => {
    if (car && startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      setTotalDays(diffDays || 1);
      setTotalPrice(car.price * (diffDays || 1));
    }
  }, [car, startDate, endDate]);

  const getMockCarById = (id: string) => {
    const mockCars: Car[] = [
      {
        id: '1',
        name: 'Lamborghini Aventador',
        brand: 'Lamborghini',
        model: 'Aventador',
        year: 2022,
        price: 899,
        seats: 2,
        transmission: 'Automatic',
        fuelType: 'Gasoline',
        image: 'https://images.unsplash.com/photo-1522255272218-7ac5249be344?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHw0fHxsdXh1cnklMjBjYXJzJTIwcndhbmRhJTIwc2FmYXJpfGVufDB8fHx8MTc0MzQxMTEyMXww&ixlib=rb-4.0.3&fit=fillmax&h=600&w=800',
        description: 'Experience the thrill of driving a Lamborghini Aventador, a luxury sports car that combines stunning design with exhilarating performance. The Aventador features a powerful V12 engine, all-wheel drive, and an aerodynamic design that turns heads wherever you go. Perfect for those who want to experience the ultimate in automotive engineering and luxury.',
        available: true,
        location: 'Kigali',
        category: 'sports'
      },
      {
        id: '2',
        name: 'Mercedes S-Class',
        brand: 'Mercedes-Benz',
        model: 'S-Class',
        year: 2023,
        price: 499,
        seats: 5,
        transmission: 'Automatic',
        fuelType: 'Hybrid',
        image: 'https://images.unsplash.com/photo-1500627964684-141351970a7f?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwzfHxsdXh1cnklMjBjYXJzJTIwcndhbmRhJTIwc2FmYXJpfGVufDB8fHx8MTc0MzQxMTEyMXww&ixlib=rb-4.0.3&fit=fillmax&h=600&w=800',
        description: 'The Mercedes-Benz S-Class is the epitome of luxury sedans, offering exceptional comfort, cutting-edge technology, and sophisticated design. With its plush interior, state-of-the-art entertainment system, and smooth ride, the S-Class provides a first-class experience for both driver and passengers. Ideal for business trips, airport transfers, or special occasions where comfort and style matter.',
        available: true,
        location: 'Kigali',
        category: 'luxury'
      },
      {
        id: '3',
        name: 'Premium Safari Jeep',
        brand: 'Jeep',
        model: 'Wrangler',
        year: 2023,
        price: 299,
        seats: 4,
        transmission: 'Manual',
        fuelType: 'Diesel',
        image: 'https://images.unsplash.com/photo-1528154291023-a6525fabe5b4?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjYXJzJTIwcndhbmRhJTIwc2FmYXJpfGVufDB8fHx8MTc0MzQxMTEyMXww&ixlib=rb-4.0.3&fit=fillmax&h=600&w=800',
        description: 'Perfect for adventurous safaris through Rwanda\'s national parks. This Jeep Wrangler is built for off-road exploration with rugged tires, high ground clearance, and exceptional 4x4 capabilities. Experience the beauty of Rwanda\'s wilderness in comfort and style, with open-air options available for the ultimate safari experience.',
        available: true,
        location: 'Kigali',
        category: 'suv'
      }
    ];
    
    return mockCars.find(car => car.id === id) || null;
  };

  const handleBookNow = () => {
    if (!currentUser) {
      navigate('/login', { state: { redirect: `/cars/${id}` } });
      return;
    }
    
    if (!startDate || !endDate) {
      alert('Please select both pickup and return dates');
      return;
    }
    
    // Normally would submit to Firebase here
    alert(`Booking confirmed!\n\nCar: ${car?.brand} ${car?.model}\nDates: ${format(new Date(startDate), 'MMM d, yyyy')} - ${format(new Date(endDate), 'MMM d, yyyy')}\nTotal: $${totalPrice}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-60">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Car not found</h2>
          <p className="mb-6">The car you're looking for doesn't exist or has been removed.</p>
          <Link to="/cars" className="btn btn-primary">View All Cars</Link>
        </div>
      </div>
    );
  }

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img 
                src={car.image} 
                alt={`${car.brand} ${car.model}`} 
                className="w-full h-full object-cover"
                style={{ height: '500px' }}
              />
            </div>
            <div className="md:w-1/2 p-6 md:p-8">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold text-primary">{car.brand} {car.model}</h1>
                  <p className="text-gray-600 text-lg">{car.year} • {car.fuelType}</p>
                </div>
                <div className="bg-primary text-white text-xl font-semibold px-4 py-2 rounded">
                  ${car.price}/day
                </div>
              </div>
              
              <div className="my-6">
                <h2 className="text-xl font-semibold mb-3">Description</h2>
                <p className="text-gray-700">{car.description}</p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-accent" />
                  <span>{car.seats} Seats</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Zap className="h-5 w-5 text-accent" />
                  <span>{car.fuelType}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-accent" />
                  <span>{car.year}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Check className="h-5 w-5 text-accent" />
                  <span>{car.transmission}</span>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-6">
                <h2 className="text-xl font-semibold mb-4">Book This Car</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Pick-up Date</label>
                    <input 
                      type="date" 
                      className="input w-full"
                      min={today}
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Return Date</label>
                    <input 
                      type="date" 
                      className="input w-full"
                      min={startDate || today}
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                </div>
                
                {startDate && endDate && (
                  <div className="bg-gray-50 p-4 rounded-md mb-4">
                    <div className="flex justify-between mb-2">
                      <span>Daily Rate:</span>
                      <span>${car.price}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span>Number of Days:</span>
                      <span>{totalDays}</span>
                    </div>
                    <div className="flex justify-between font-semibold">
                      <span>Total:</span>
                      <span>${totalPrice}</span>
                    </div>
                  </div>
                )}
                
                <button 
                  onClick={handleBookNow}
                  className="btn btn-accent w-full flex items-center justify-center"
                >
                  <CreditCard className="mr-2 h-5 w-5" />
                  Book Now
                </button>
                
                <div className="mt-4 flex items-center text-sm text-gray-600">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  <span>Free cancellation up to 24 hours before pickup</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
 