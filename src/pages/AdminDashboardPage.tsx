import  { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminSidebar } from '../components/AdminSidebar';
import { useAuth } from '../contexts/AuthContext';
import { Car, Users, Calendar, CreditCard, ArrowUp, ArrowDown } from 'lucide-react';

export const AdminDashboardPage = () => {
  const { currentUser, userData } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  
  // Stats
  const [stats, setStats] = useState({
    totalCars: 0,
    availableCars: 0,
    totalBookings: 0,
    pendingBookings: 0,
    totalUsers: 0,
    totalRevenue: 0,
    revenueChange: 0
  });
  
  // Recent bookings
  const [recentBookings, setRecentBookings] = useState<any[]>([]);
  
  useEffect(() => {
    // Check if user is admin
    if (!currentUser || !userData?.isAdmin) {
      navigate('/');
      return;
    }
    
    // Fetch dashboard data
    const fetchDashboardData = async () => {
      try {
        // In a real application, we would fetch these from Firestore
        // Mock data for demonstration
        setStats({
          totalCars: 12,
          availableCars: 8,
          totalBookings: 47,
          pendingBookings: 5,
          totalUsers: 32,
          totalRevenue: 8750,
          revenueChange: 12.5 // percentage increase from last month
        });
        
        setRecentBookings([
          {
            id: 'b1',
            customerName: 'John Doe',
            car: 'Toyota Land Cruiser Safari',
            startDate: '2023-08-15',
            endDate: '2023-08-20',
            status: 'confirmed',
            amount: 750
          },
          {
            id: 'b2',
            customerName: 'Jane Smith',
            car: 'Mercedes Luxury Sedan',
            startDate: '2023-08-12',
            endDate: '2023-08-14',
            status: 'completed',
            amount: 600
          },
          {
            id: 'b3',
            customerName: 'Robert Johnson',
            car: 'Eco-Friendly Explorer',
            startDate: '2023-08-18',
            endDate: '2023-08-22',
            status: 'pending',
            amount: 900
          },
          {
            id: 'b4',
            customerName: 'Emily Chen',
            car: 'Toyota Land Cruiser Safari',
            startDate: '2023-08-20',
            endDate: '2023-08-25',
            status: 'confirmed',
            amount: 825
          }
        ]);
        
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, [currentUser, userData, navigate]);
  
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
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-primary">Dashboard</h1>
            <p className="text-gray-600">Welcome back, Admin</p>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100 text-blue-500 mr-4">
                  <Car className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Total Cars</p>
                  <h3 className="text-2xl font-bold">{stats.totalCars}</h3>
                </div>
              </div>
              <p className="mt-2 text-sm text-gray-600">
                {stats.availableCars} cars available
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-green-100 text-green-500 mr-4">
                  <Calendar className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Total Bookings</p>
                  <h3 className="text-2xl font-bold">{stats.totalBookings}</h3>
                </div>
              </div>
              <p className="mt-2 text-sm text-gray-600">
                {stats.pendingBookings} pending bookings
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-purple-100 text-purple-500 mr-4">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Total Users</p>
                  <h3 className="text-2xl font-bold">{stats.totalUsers}</h3>
                </div>
              </div>
              <p className="mt-2 text-sm text-gray-600">
                Active users this month
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-yellow-100 text-yellow-500 mr-4">
                  <CreditCard className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Total Revenue</p>
                  <h3 className="text-2xl font-bold">${stats.totalRevenue}</h3>
                </div>
              </div>
              <p className="mt-2 text-sm flex items-center">
                {stats.revenueChange >= 0 ? (
                  <>
                    <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-green-500">{stats.revenueChange}%</span>
                  </>
                ) : (
                  <>
                    <ArrowDown className="h-4 w-4 text-red-500 mr-1" />
                    <span className="text-red-500">{Math.abs(stats.revenueChange)}%</span>
                  </>
                )}
                <span className="text-gray-600 ml-1">from last month</span>
              </p>
            </div>
          </div>
          
          {/* Recent Bookings */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-lg font-semibold mb-4">Recent Bookings</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Car
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Dates
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentBookings.map((booking) => (
                    <tr key={booking.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{booking.customerName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{booking.car}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                            booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-blue-100 text-blue-800'}`}
                        >
                          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${booking.amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Rwanda Tourism Section */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img 
                  src="https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?ixlib=rb-4.0.3&fit=fillmax&h=800&w=1200" 
                  alt="Rwanda landscape" 
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
              <div className="md:w-1/2 p-6">
                <h2 className="text-xl font-bold text-primary mb-3">Rwanda Tourism Insights</h2>
                <p className="text-gray-600 mb-4">
                  Rwanda continues to be a top destination for eco-tourism with a 23% increase in visitors this year.
                  The most popular destinations include Volcanoes National Park, Nyungwe Forest, and Lake Kivu.
                </p>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">75%</div>
                    <p className="text-sm text-gray-500">Safari Bookings</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">42%</div>
                    <p className="text-sm text-gray-500">Business Travel</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">28%</div>
                    <p className="text-sm text-gray-500">Luxury Travel</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600">
                  Optimize your fleet based on seasonal tourism patterns and customer preferences.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
 