import  { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminSidebar } from '../components/AdminSidebar';
import { useAuth } from '../contexts/AuthContext';
import { Driver } from '../types';
import { Plus, Edit, Trash2, Star, AlertCircle, Search, X } from 'lucide-react';

export const AdminDriversPage = () => {
  const { currentUser, userData } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  
  // New driver form state
  const [newDriver, setNewDriver] = useState<Partial<Driver>>({
    name: '',
    email: '',
    phone: '',
    licenseNumber: '',
    experience: 1,
    rating: 5,
    available: true,
    image: '',
    specialties: []
  });
  
  // Edit driver state
  const [editingDriver, setEditingDriver] = useState<Partial<Driver> | null>(null);
  
  useEffect(() => {
    // Check if user is admin
    if (!currentUser || !userData?.isAdmin) {
      navigate('/');
      return;
    }
    
    // Fetch drivers
    const fetchDrivers = async () => {
      try {
        // In a real application, we would fetch from Firestore
        // Mock data for demonstration
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
            specialties: ['Safari Tours', 'Mountain Driving', 'Wildlife Expert']
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
            specialties: ['City Tours', 'Business Travel', 'Cultural Tours']
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
            specialties: ['Off-Road Driving', 'Gorilla Trekking', 'Photography Tours']
          },
          {
            id: 'd4',
            name: 'Diane Iradukunda',
            email: 'diane@example.com',
            phone: '+250 786 234 567',
            licenseNumber: 'RW-DL-234567',
            experience: 3,
            rating: 4.5,
            available: false,
            image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&fit=fillmax&h=150&w=150&q=80',
            specialties: ['Luxury Transportation', 'Airport Transfers']
          }
        ];
        
        setDrivers(mockDrivers);
      } catch (error) {
        console.error('Error fetching drivers:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchDrivers();
  }, [currentUser, userData, navigate]);
  
  const handleAddDriver = () => {
    // In a real application, we would add to Firestore
    const newId = `d${drivers.length + 1}`;
    const driverToAdd = {
      ...newDriver,
      id: newId
    } as Driver;
    
    setDrivers([...drivers, driverToAdd]);
    setShowAddModal(false);
    setNewDriver({
      name: '',
      email: '',
      phone: '',
      licenseNumber: '',
      experience: 1,
      rating: 5,
      available: true,
      image: '',
      specialties: []
    });
  };
  
  const handleEditDriver = (driver: Driver) => {
    setEditingDriver(driver);
  };
  
  const handleSaveEdit = () => {
    if (!editingDriver || !editingDriver.id) return;
    
    // In a real application, we would update in Firestore
    const updatedDrivers = drivers.map(driver => 
      driver.id === editingDriver.id ? { ...driver, ...editingDriver } as Driver : driver
    );
    
    setDrivers(updatedDrivers);
    setEditingDriver(null);
  };
  
  const handleDeleteDriver = (id: string) => {
    // In a real application, we would delete from Firestore
    const updatedDrivers = drivers.filter(driver => driver.id !== id);
    setDrivers(updatedDrivers);
  };
  
  const handleToggleAvailability = (id: string) => {
    // In a real application, we would update in Firestore
    const updatedDrivers = drivers.map(driver => 
      driver.id === id ? { ...driver, available: !driver.available } as Driver : driver
    );
    
    setDrivers(updatedDrivers);
  };
  
  const filteredDrivers = drivers.filter(driver => 
    driver.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    driver.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    driver.phone.includes(searchQuery)
  );
  
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
            <h1 className="text-2xl font-bold text-primary">Manage Drivers</h1>
            <button
              onClick={() => setShowAddModal(true)}
              className="btn btn-accent flex items-center"
            >
              <Plus className="mr-2 h-5 w-5" />
              Add New Driver
            </button>
          </div>
          
          {/* Search */}
          <div className="bg-white p-4 rounded-lg shadow-md mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search drivers by name, email, or phone..."
                className="input pl-10 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          {/* Drivers Table */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Driver
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Experience
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
                  {filteredDrivers.map((driver) => (
                    <tr key={driver.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-12 w-12 flex-shrink-0">
                            <img className="h-12 w-12 rounded-full object-cover" src={driver.image} alt={driver.name} />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{driver.name}</div>
                            <div className="flex items-center text-sm text-gray-500">
                              <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                              <span>{driver.rating.toFixed(1)}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{driver.email}</div>
                        <div className="text-sm text-gray-500">{driver.phone}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{driver.experience} years</div>
                        <div className="text-sm text-gray-500">{driver.licenseNumber}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleToggleAvailability(driver.id)}
                          className={`px-3 py-1 rounded-full text-xs font-medium 
                            ${driver.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                        >
                          {driver.available ? 'Available' : 'Unavailable'}
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditDriver(driver)}
                            className="text-primary hover:text-primary-light"
                          >
                            <Edit className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleDeleteDriver(driver.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-5 w-5" />
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
      
      {/* Add Driver Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-primary">Add New Driver</h2>
                <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-500">
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    className="input w-full"
                    value={newDriver.name}
                    onChange={(e) => setNewDriver({...newDriver, name: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    className="input w-full"
                    value={newDriver.email}
                    onChange={(e) => setNewDriver({...newDriver, email: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    className="input w-full"
                    value={newDriver.phone}
                    onChange={(e) => setNewDriver({...newDriver, phone: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">License Number</label>
                  <input
                    type="text"
                    className="input w-full"
                    value={newDriver.licenseNumber}
                    onChange={(e) => setNewDriver({...newDriver, licenseNumber: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Years of Experience</label>
                  <input
                    type="number"
                    className="input w-full"
                    value={newDriver.experience}
                    onChange={(e) => setNewDriver({...newDriver, experience: parseInt(e.target.value)})}
                    min="1"
                    max="50"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rating (1-5)</label>
                  <input
                    type="number"
                    className="input w-full"
                    value={newDriver.rating}
                    onChange={(e) => setNewDriver({...newDriver, rating: parseFloat(e.target.value)})}
                    min="1"
                    max="5"
                    step="0.1"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Profile Image URL</label>
                  <input
                    type="text"
                    className="input w-full"
                    value={newDriver.image}
                    onChange={(e) => setNewDriver({...newDriver, image: e.target.value})}
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Specialties (comma separated)</label>
                  <input
                    type="text"
                    className="input w-full"
                    placeholder="e.g. Safari Tours, Mountain Driving, Wildlife Expert"
                    value={newDriver.specialties?.join(', ') || ''}
                    onChange={(e) => setNewDriver({
                      ...newDriver, 
                      specialties: e.target.value.split(',').map(s => s.trim()).filter(s => s)
                    })}
                  />
                </div>
                <div className="md:col-span-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-accent focus:ring-accent border-gray-300 rounded"
                      checked={newDriver.available}
                      onChange={(e) => setNewDriver({...newDriver, available: e.target.checked})}
                    />
                    <label className="ml-2 block text-sm text-gray-700">Available for assignments</label>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="btn btn-primary"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddDriver}
                  className="btn btn-accent"
                >
                  Add Driver
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Edit Driver Modal */}
      {editingDriver && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-primary">Edit Driver</h2>
                <button onClick={() => setEditingDriver(null)} className="text-gray-400 hover:text-gray-500">
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    className="input w-full"
                    value={editingDriver.name}
                    onChange={(e) => setEditingDriver({...editingDriver, name: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    className="input w-full"
                    value={editingDriver.email}
                    onChange={(e) => setEditingDriver({...editingDriver, email: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    className="input w-full"
                    value={editingDriver.phone}
                    onChange={(e) => setEditingDriver({...editingDriver, phone: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">License Number</label>
                  <input
                    type="text"
                    className="input w-full"
                    value={editingDriver.licenseNumber}
                    onChange={(e) => setEditingDriver({...editingDriver, licenseNumber: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Years of Experience</label>
                  <input
                    type="number"
                    className="input w-full"
                    value={editingDriver.experience}
                    onChange={(e) => setEditingDriver({...editingDriver, experience: parseInt(e.target.value)})}
                    min="1"
                    max="50"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rating (1-5)</label>
                  <input
                    type="number"
                    className="input w-full"
                    value={editingDriver.rating}
                    onChange={(e) => setEditingDriver({...editingDriver, rating: parseFloat(e.target.value)})}
                    min="1"
                    max="5"
                    step="0.1"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Profile Image URL</label>
                  <input
                    type="text"
                    className="input w-full"
                    value={editingDriver.image}
                    onChange={(e) => setEditingDriver({...editingDriver, image: e.target.value})}
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Specialties (comma separated)</label>
                  <input
                    type="text"
                    className="input w-full"
                    placeholder="e.g. Safari Tours, Mountain Driving, Wildlife Expert"
                    value={editingDriver.specialties?.join(', ') || ''}
                    onChange={(e) => setEditingDriver({
                      ...editingDriver, 
                      specialties: e.target.value.split(',').map(s => s.trim()).filter(s => s)
                    })}
                  />
                </div>
                <div className="md:col-span-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-accent focus:ring-accent border-gray-300 rounded"
                      checked={editingDriver.available}
                      onChange={(e) => setEditingDriver({...editingDriver, available: e.target.checked})}
                    />
                    <label className="ml-2 block text-sm text-gray-700">Available for assignments</label>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setEditingDriver(null)}
                  className="btn btn-primary"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="btn btn-accent"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
 