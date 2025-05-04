import  { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import { Booking, Car } from '../types';
import { Calendar, CheckCircle, Clock, X, AlertTriangle, Car as CarIcon, Users } from 'lucide-react';
import { format } from 'date-fns';

interface Notification {
  id: string;
  message: string;
  type: string;
  read: boolean;
  createdAt: any;
}

export const UserDashboardPage = () => {
  const { currentUser, userData } = useAuth();
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState<(Booking & { carDetails: Car | null })[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    if (!currentUser) return;

    const fetchUserData = async () => {
      setLoading(true);
      try {
        // Fetch bookings
        try {
          const bookingsQuery = query(
            collection(db, 'bookings'),
            where('userId', '==', currentUser.uid),
            orderBy('createdAt', 'desc')
          );
          
          const bookingsSnapshot = await getDocs(bookingsQuery);
          
          if (!bookingsSnapshot.empty) {
            const bookingsData = bookingsSnapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data(),
              carDetails: null
            })) as (Booking & { carDetails: Car | null })[];
            
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
          console.error('Error fetching bookings:', error);
          const mockBookings = getMockBookings();
          setBookings(mockBookings);
        }

        // Fetch notifications
        try {
          const notificationsQuery = query(
            collection(db, 'notifications'),
            where('userId', '==', currentUser.uid),
            orderBy('createdAt', 'desc')
          );
          
          const notificationsSnapshot = await getDocs(notificationsQuery);
          const notificationsList = notificationsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          })) as Notification[];
          
          setNotifications(notificationsList);
        } catch (error) {
          console.error('Error fetching notifications:', error);
          setNotifications([]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [currentUser]);

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
        description: 'Perfect for wildlife safaris and off-road adventures in Rwanda.',
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
        description: 'Premium luxury sedan perfect for business travel.',
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
        description: 'Perfect for adventurous safaris through Rwanda\'s national parks.',
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
      }
    ];
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

  const formatDate = (date: Date | string) => {
    return typeof date === 'string' 
      ? format(new Date(date), 'MMM d, yyyy') 
      : format(date, 'MMM d, yyyy');
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'error':
        return <X className="h-5 w-5 text-red-500" />;
      default: // info
        return <AlertTriangle className="h-5 w-5 text-blue-500" />;
    }
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary">Welcome, {userData?.name}</h1>
          <p className="text-gray-600 mt-2">Manage your bookings and account information</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <CarIcon className="h-8 w-8 text-accent p-1 bg-accent-light rounded-full" />
              <h2 className="text-xl font-semibold ml-2">Your Bookings</h2>
            </div>
            <p className="text-3xl font-bold">{bookings.length}</p>
            <p className="text-gray-600">Total bookings made</p>
            <Link to="/bookings" className="btn btn-primary mt-4 w-full">View All Bookings</Link>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <Calendar className="h-8 w-8 text-accent p-1 bg-accent-light rounded-full" />
              <h2 className="text-xl font-semibold ml-2">Upcoming Trips</h2>
            </div>
            <p className="text-3xl font-bold">
              {bookings.filter(b => 
                (b.status === 'confirmed' || b.status === 'pending') && 
                new Date(b.startDate) > new Date()
              ).length}
            </p>
            <p className="text-gray-600">Scheduled trips</p>
            <Link to="/cars" className="btn btn-accent mt-4 w-full">Book New Trip</Link>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <Users className="h-8 w-8 text-accent p-1 bg-accent-light rounded-full" />
              <h2 className="text-xl font-semibold ml-2">Account</h2>
            </div>
            <p className="text-sm mb-1"><span className="font-medium">Email:</span> {userData?.email}</p>
            <p className="text-sm mb-1"><span className="font-medium">Phone:</span> {userData?.phone || 'Not provided'}</p>
            <p className="text-sm"><span className="font-medium">Status:</span> {userData?.isAdmin ? 'Administrator' : 'Customer'}</p>
            <Link to="/profile" className="btn btn-primary mt-4 w-full">Edit Profile</Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-primary text-white px-6 py-4">
              <h2 className="text-xl font-semibold">Recent Bookings</h2>
            </div>
            <div className="p-6">
              {bookings.length > 0 ? (
                <div className="space-y-4">
                  {bookings.slice(0, 3).map((booking) => (
                    <div key={booking.id} className="flex items-start border-b border-gray-100 pb-4">
                      <div className="flex-shrink-0 mr-4">
                        <img 
                          src={booking.carDetails?.image || 'https://via.placeholder.com/150'} 
                          alt={booking.carDetails?.name || 'Car'} 
                          className="w-16 h-16 object-cover rounded"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-semibold">{booking.carDetails?.name || 'Unknown Vehicle'}</h3>
                          <div className="flex items-center">
                            {getStatusIcon(booking.status)}
                            <span className="ml-1 text-sm capitalize">{booking.status}</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">
                          {formatDate(booking.startDate)} - {formatDate(booking.endDate)}
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">${booking.totalPrice}</span> • {booking.pickupLocation}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600">You don't have any bookings yet</p>
                  <Link to="/cars" className="btn btn-accent mt-4">Browse Cars</Link>
                </div>
              )}
              
              {bookings.length > 3 && (
                <div className="mt-4 text-center">
                  <Link to="/bookings" className="text-accent font-medium hover:underline">
                    View all bookings
                  </Link>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-primary text-white px-6 py-4">
              <h2 className="text-xl font-semibold">Recent Notifications</h2>
            </div>
            <div className="p-6">
              {notifications.length > 0 ? (
                <div className="space-y-4">
                  {notifications.slice(0, 5).map((notification) => (
                    <div key={notification.id} className="flex items-start border-b border-gray-100 pb-4">
                      <div className="flex-shrink-0 mr-3">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {notification.createdAt ? new Date(notification.createdAt.toDate()).toLocaleString() : 'Just now'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <AlertTriangle className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600">No notifications yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
 