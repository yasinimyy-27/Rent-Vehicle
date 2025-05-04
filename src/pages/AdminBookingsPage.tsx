import  { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminSidebar } from '../components/AdminSidebar';
import { useAuth } from '../contexts/AuthContext';
import { Booking, Car, Driver } from '../types';
import { CheckCircle, Clock, X, Edit, Eye, Search, Filter, Calendar } from 'lucide-react';
import { format } from 'date-fns';

export const AdminBookingsPage = () => {
  const { currentUser, userData } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState<(Booking & { 
    carDetails?: Car, 
    driverDetails?: Driver,
    customerName?: string
  })[]>([]);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  useEffect(() => {
    // Check if user is admin
    if (!currentUser || !userData?.isAdmin) {
      navigate('/');
      return;
    }
    
    // Fetch bookings
    const fetchBookings = async () => {
      try {
        // In a real application, we would fetch from Firestore
        // Mock data for demonstration
        const mockCars: Car[] = [
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
        
        const mockDrivers: Driver[] = [
          {
            id: 'd1',
            name: 'Jean-Paul Mugisha',
            email: 'jeanpaul@example.com',
            phone: '+250 789 123 456',
            licenseNumber: 'RW-DL-123456',
            experience: 8,
            rating: 4.9,
            available: true,
            image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&fit=fillmax&h=150&w=150&q=80',
            specialties: ['Safari Tours', 'Mountain Driving']
          },
          {
            id: 'd2',
            name: 'Marie Claire Uwimana',
            email: 'marieclaire@example.com',
            phone: '+250 788 987 654',
            licenseNumber: 'RW-DL-789012',
            experience: 5,
            rating: 4.7,
            available: true,
            image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&fit=fillmax&h=150&w=150&q=80',
            specialties: ['City Tours', 'Business Travel']
          },
          {
            id: 'd3',
            name: 'Emmanuel Habimana',
            email: 'emmanuel@example.com',
            phone: '+250 787 456 789',
            licenseNumber: 'RW-DL-345678',
            experience: 10,
            rating: 5.0,
            available: true,
            image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&fit=fillmax&h=150&w=150&q=80',
            specialties: ['Off-Road Driving', 'Gorilla Trekking']
          }
        ];
        
        const mockBookings: (Booking & { 
          carDetails?: Car, 
          driverDetails?: Driver,
          customerName?: string
        })[] = [
          {
            id: 'b1',
            carId: '1',
            userId: 'u1',
            driverId: 'd1',
            startDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
            endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
            totalPrice: 600,
            status: 'confirmed',
            paymentStatus: 'paid',
            createdAt: new Date(),
            pickupLocation: 'Kigali International Airport',
            dropoffLocation: 'Volcanoes National Park',
            customerName: 'John Doe',
            carDetails: mockCars.find(car => car.id === '1'),
            driverDetails: mockDrivers.find(driver => driver.id === 'd1')
          },
          {
            id: 'b2',
            carId: '2',
            userId: 'u2',
            driverId: 'd2',
            startDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15 days ago
            endDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
            totalPrice: 1000,
            status: 'completed',
            paymentStatus: 'paid',
            createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
            pickupLocation: 'Kigali Marriott Hotel',
            dropoffLocation: 'Kigali Marriott Hotel',
            customerName: 'Jane Smith',
            carDetails: mockCars.find(car => car.id === '2'),
            driverDetails: mockDrivers.find(driver => driver.id === 'd2')
          },
          {
            id: 'b3',
            carId: '3',
            userId: 'u3',
            driverId: 'd3',
            startDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
            endDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
            totalPrice: 540,
            status: 'cancelled',
            paymentStatus: 'refunded',
            createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
            pickupLocation: 'Nyungwe Forest Lodge',
            dropoffLocation: 'Kigali International Airport',
            customerName: 'Robert Johnson',
            carDetails: mockCars.find(car => car.id === '3'),
            driverDetails: mockDrivers.find(driver => driver.id === 'd3')
          },
          {
            id: 'b4',
            carId: '1',
            userId: 'u4',
            driverId: 'd1',
            startDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // 1 day from now
            endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
            totalPrice: 750,
            status: 'pending',
            paymentStatus: 'pending',
            createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
            pickupLocation: 'Radisson Blu Hotel',
            dropoffLocation: 'Lake Kivu Serena Hotel',
            customerName: 'Emily Chen',
            carDetails: mockCars.find(car => car.id === '1'),
            driverDetails: mockDrivers.find(driver => driver.id === 'd1')
          }
        ];
        
        setBookings(mockBookings);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBookings();
  }, [currentUser, userData, navigate]);
  
  const handleUpdateStatus = (id: string, status: 'pending' | 'confirmed' | 'completed' | 'cancelled') => {
    // In a real application, we would update in Firestore
    const updatedBookings = bookings.map(booking => 
      booking.id === id ? { ...booking, status } : booking
    );
    
    setBookings(updatedBookings);
  };
  
  const handleUpdatePaymentStatus = (id: string, paymentStatus: 'pending' | 'paid' | 'refunded') => {
    // In a real application, we would update in Firestore
    const updatedBookings = bookings.map(booking => 
      booking.id === id ? { ...booking, paymentStatus } : booking
    );
    
    setBookings(updatedBookings);
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
    if (typeof date === 'string') {
      return format(new Date(date), 'MMM d, yyyy');
    }
    return format(date, 'MMM d, yyyy');
  };
  
  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      (booking.customerName && booking.customerName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (booking.pickupLocation && booking.pickupLocation.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (booking.carDetails && booking.carDetails.name.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
      </div>
    );
  }
  
  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 hidden md:block">
        <AdminSidebar />
      </div>
      
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-primary">Manage Bookings</h1>
          </div>
          
          {/* Filters */}
          <div className="bg-white p-4 rounded-lg shadow-md mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="relative md:w-1/3">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search bookings..."
                  className="input pl-10 w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <Filter className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-sm font-medium text-gray-700">Status:</span>
                </div>
                
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="input"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Bookings Table */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Car & Driver
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Dates
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredBookings.map((booking) => (
                    <tr key={booking.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{booking.customerName}</div>
                        <div className="text-sm text-gray-500">
                          <div className="mt-1 flex items-center text-xs">
                            <Calendar className="h-4 w-4 text-gray-400 mr-1" />
                            <span>Booked: {formatDate(booking.createdAt)}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {booking.carDetails ? booking.carDetails.name : 'Unknown Car'}
                        </div>
                        <div className="text-sm text-gray-500">
                          Driver: {booking.driverDetails ? booking.driverDetails.name : 'Not assigned'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {formatDate(booking.startDate)} - {formatDate(booking.endDate)}
                        </div>
                        <div className="text-sm text-gray-500">
                          ${booking.totalPrice} total
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col space-y-2">
                          <div className="flex items-center">
                            {getStatusIcon(booking.status)}
                            <select
                              value={booking.status}
                              onChange={(e) => handleUpdateStatus(
                                booking.id, 
                                e.target.value as 'pending' | 'confirmed' | 'completed' | 'cancelled'
                              )}
                              className="ml-2 input text-sm py-1"
                            >
                              <option value="pending">Pending</option>
                              <option value="confirmed">Confirmed</option>
                              <option value="completed">Completed</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </div>
                          
                          <select
                            value={booking.paymentStatus}
                            onChange={(e) => handleUpdatePaymentStatus(
                              booking.id, 
                              e.target.value as 'pending' | 'paid' | 'refunded'
                            )}
                            className={`text-xs font-medium rounded-full px-2 py-1 
                              ${booking.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' : 
                                booking.paymentStatus === 'refunded' ? 'bg-red-100 text-red-800' : 
                                'bg-yellow-100 text-yellow-800'}`}
                          >
                            <option value="pending">Payment Pending</option>
                            <option value="paid">Paid</option>
                            <option value="refunded">Refunded</option>
                          </select>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            className="text-primary hover:text-primary-light"
                            title="View details"
                          >
                            <Eye className="h-5 w-5" />
                          </button>
                          <button
                            className="text-blue-500 hover:text-blue-700"
                            title="Edit booking"
                          >
                            <Edit className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
 