import  { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import { Booking, Car } from '../types';
import { Calendar, CheckCircle, AlertTriangle, Clock, X, Eye } from 'lucide-react';
import { format } from 'date-fns';

export const BookingsPage = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState<(Booking & { carDetails: Car | null })[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed' | 'cancelled'>('upcoming');
  
  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    
    const fetchBookings = async () => {
      try {
        setLoading(true);
        
        // Simplified query without ordering to avoid index issues
        const bookingsQuery = query(
          collection(db, 'bookings'),
          where('userId', '==', currentUser.uid)
        );
        
        try {
          const bookingsSnapshot = await getDocs(bookingsQuery);
          
          if (!bookingsSnapshot.empty) {
            const bookingsData = bookingsSnapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data(),
              carDetails: null
            })) as (Booking & { carDetails: Car | null })[];
            
            // Sort client-side instead
            bookingsData.sort((a, b) => {
              const dateA = new Date(a.startDate).getTime();
              const dateB = new Date(b.startDate).getTime();
              return dateB - dateA; // newest first
            });
            
            // Fetch car details for each booking
            const bookingsWithCars = await Promise.all(
              bookingsData.map(async (booking) => {
                try {
                  // Use mock data for now since we might not have a cars collection
                  const mockCars = getMockCars();
                  const car = mockCars.find(car => car.id === booking.carId) || null;
                  return { ...booking, carDetails: car };
                } catch (error) {
                  console.error('Error fetching car details:', error);
                  return booking;
                }
              })
            );
            
            setBookings(bookingsWithCars);
          } else {
            // Use mock data if no bookings found
            const mockBookings = getMockBookings();
            setBookings(mockBookings);
          }
        } catch (error) {
          console.error('Error fetching bookings from Firestore:', error);
          // Fallback to mock data
          const mockBookings = getMockBookings();
          setBookings(mockBookings);
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchBookings();
  }, [currentUser, navigate]);
  
  const getMockCars = (): Car[] => {
    return [
      {
        id: '1',
        name: 'Land Cruiser Safari',
        brand: 'Toyota',
        model: 'Land Cruiser',
        year: 2022,
        price: 150,
        seats: 7,
        transmission: 'Automatic',
        fuelType: 'Diesel',
        image: 'https://images.unsplash.com/photo-1522255272218-7ac5249be344?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHw0fHxsdXh1cnklMjBjYXJzJTIwcndhbmRhJTIwc2FmYXJpfGVufDB8fHx8MTc0MzQxMTEyMXww&ixlib=rb-4.0.3&fit=fillmax&h=600&w=800',
        description: 'Perfect for wildlife safaris and off-road adventures in Rwanda. Spacious and comfortable with excellent 4x4 capabilities.',
        available: true,
        location: 'Kigali',
        category: 'suv',
        driverId: 'd1'
      },
      {
        id: '2',
        name: 'Mercedes Luxury Sedan',
        brand: 'Mercedes-Benz',
        model: 'E-Class',
        year: 2023,
        price: 200,
        seats: 5,
        transmission: 'Automatic',
        fuelType: 'Hybrid',
        image: 'https://images.unsplash.com/photo-1500627964684-141351970a7f?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwzfHxsdXh1cnklMjBjYXJzJTIwcndhbmRhJTIwc2FmYXJpfGVufDB8fHx8MTc0MzQxMTEyMXww&ixlib=rb-4.0.3&fit=fillmax&h=600&w=800',
        description: 'Premium luxury sedan perfect for business travel or exploring Rwanda in style and comfort.',
        available: true,
        location: 'Kigali',
        category: 'luxury',
        driverId: 'd2'
      },
      {
        id: '3',
        name: 'Premium Safari Jeep',
        brand: 'Jeep',
        model: 'Wrangler',
        year: 2023,
        price: 180,
        seats: 4,
        transmission: 'Manual',
        fuelType: 'Diesel',
        image: 'https://images.unsplash.com/photo-1528154291023-a6525fabe5b4?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjYXJzJTIwcndhbmRhJTIwc2FmYXJpfGVufDB8fHx8MTc0MzQxMTEyMXww&ixlib=rb-4.0.3&fit=fillmax&h=600&w=800',
        description: 'Perfect for adventurous safaris through Rwanda\'s national parks. Rugged and reliable with open-air options.',
        available: true,
        location: 'Kigali',
        category: 'suv',
        driverId: 'd3'
      }
    ];
  };
  
  const getMockBookings = (): (Booking & { carDetails: Car | null })[] => {
    const cars = getMockCars();
    
    return [
      {
        id: 'b1',
        carId: '1',
        userId: currentUser?.uid || '',
        driverId: 'd1',
        startDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        totalPrice: 600,
        status: 'confirmed',
        paymentStatus: 'paid',
        createdAt: new Date(),
        pickupLocation: 'Kigali International Airport',
        dropoffLocation: 'Volcanoes National Park',
        carDetails: cars.find(car => car.id === '1') || null
      },
      {
        id: 'b2',
        carId: '2',
        userId: currentUser?.uid || '',
        driverId: 'd2',
        startDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15 days ago
        endDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
        totalPrice: 1000,
        status: 'completed',
        paymentStatus: 'paid',
        createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
        pickupLocation: 'Kigali Marriott Hotel',
        dropoffLocation: 'Kigali Marriott Hotel',
        carDetails: cars.find(car => car.id === '2') || null
      },
      {
        id: 'b3',
        carId: '3',
        userId: currentUser?.uid || '',
        driverId: 'd3',
        startDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
        endDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        totalPrice: 540,
        status: 'cancelled',
        paymentStatus: 'refunded',
        createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
        pickupLocation: 'Nyungwe Forest Lodge',
        dropoffLocation: 'Kigali International Airport',
        carDetails: cars.find(car => car.id === '3') || null
      }
    ];
  };
  
  const getFilteredBookings = () => {
    if (activeTab === 'upcoming') {
      return bookings.filter(booking => booking.status === 'pending' || booking.status === 'confirmed');
    } else if (activeTab === 'completed') {
      return bookings.filter(booking => booking.status === 'completed');
    } else {
      return bookings.filter(booking => booking.status === 'cancelled');
    }
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-blue-500" />;
      case 'cancelled':
        return <X className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-yellow-500" />;
    }
  };
  
  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmed';
      case 'completed':
        return 'Completed';
      case 'cancelled':
        return 'Cancelled';
      default:
        return 'Pending';
    }
  };
  
  const formatDate = (date: Date | string) => {
    return typeof date === 'string' 
      ? format(new Date(date), 'MMM d, yyyy') 
      : format(date, 'MMM d, yyyy');
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-60">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
      </div>
    );
  }
  
  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-primary mb-8">Your Bookings</h1>
        
        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-8">
          <button
            className={`py-2 px-4 font-medium text-sm focus:outline-none ${
              activeTab === 'upcoming'
                ? 'text-accent border-b-2 border-accent'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('upcoming')}
          >
            Upcoming
          </button>
          <button
            className={`py-2 px-4 font-medium text-sm focus:outline-none ${
              activeTab === 'completed'
                ? 'text-accent border-b-2 border-accent'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('completed')}
          >
            Completed
          </button>
          <button
            className={`py-2 px-4 font-medium text-sm focus:outline-none ${
              activeTab === 'cancelled'
                ? 'text-accent border-b-2 border-accent'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('cancelled')}
          >
            Cancelled
          </button>
        </div>
        
        {/* Bookings List */}
        {getFilteredBookings().length > 0 ? (
          <div className="space-y-6">
            {getFilteredBookings().map((booking) => (
              <div key={booking.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/3">
                    {booking.carDetails ? (
                      <img
                        src={booking.carDetails.image}
                        alt={booking.carDetails.name}
                        className="w-full h-48 md:h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-48 md:h-full bg-gray-200 flex items-center justify-center">
                        <AlertTriangle className="h-12 w-12 text-gray-400" />
                      </div>
                    )}
                  </div>
                  
                  <div className="md:w-2/3 p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h2 className="text-xl font-bold text-primary">
                          {booking.carDetails ? booking.carDetails.name : 'Unknown Vehicle'}
                        </h2>
                        <p className="text-gray-600">
                          {booking.carDetails ? `${booking.carDetails.brand} ${booking.carDetails.model} • ${booking.carDetails.year}` : ''}
                        </p>
                      </div>
                      <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                        {getStatusIcon(booking.status)}
                        <span className="ml-2 text-sm font-medium">{getStatusText(booking.status)}</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Booking Dates</h3>
                        <div className="flex items-center mt-1">
                          <Calendar className="h-4 w-4 text-accent mr-2" />
                          <span>{formatDate(booking.startDate)} - {formatDate(booking.endDate)}</span>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Total Price</h3>
                        <p className="mt-1 font-semibold">${booking.totalPrice}</p>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Pick-up Location</h3>
                        <p className="mt-1">{booking.pickupLocation || 'Not specified'}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Drop-off Location</h3>
                        <p className="mt-1">{booking.dropoffLocation || 'Not specified'}</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Link
                        to={`/bookings/${booking.id}`}
                        className="btn btn-primary flex items-center"
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <AlertTriangle className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h2 className="text-xl font-semibold mb-2">No {activeTab} bookings found</h2>
            <p className="text-gray-600 mb-6">
              {activeTab === 'upcoming'
                ? "You don't have any upcoming bookings."
                : activeTab === 'completed'
                ? "You don't have any completed bookings yet."
                : "You don't have any cancelled bookings."}
            </p>
            <Link to="/cars" className="btn btn-accent">
              Browse Cars
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};
 