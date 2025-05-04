import  { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminSidebar } from '../components/AdminSidebar';
import { useAuth } from '../contexts/AuthContext';
import { Car as CarType } from '../types';
import { Plus, Edit, Trash2, Check, X, AlertCircle, Search, Filter } from 'lucide-react';

export const AdminCarsPage = () => {
  const { currentUser, userData } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [cars, setCars] = useState<CarType[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // New car form state
  const [newCar, setNewCar] = useState<Partial<CarType>>({
    name: '',
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    price: 0,
    seats: 5,
    transmission: 'Automatic',
    fuelType: 'Diesel',
    image: '',
    description: '',
    available: true,
    location: 'Kigali',
    category: 'suv'
  });
  
  // Edit car state
  const [editingCar, setEditingCar] = useState<Partial<CarType> | null>(null);
  
  useEffect(() => {
    // Check if user is admin
    if (!currentUser || !userData?.isAdmin) {
      navigate('/');
      return;
    }
    
    // Fetch cars
    const fetchCars = async () => {
      try {
        // In a real application, we would fetch from Firestore
        // Mock data for demonstration
        const mockCars: CarType[] = [
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
            description: 'Experience the thrill of driving a Lamborghini Aventador, a luxury sports car that combines stunning design with exhilarating performance.',
            available: true,
            location: 'Kigali',
            category: 'sports',
            driverId: 'd1'
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
            description: 'The Mercedes-Benz S-Class is the epitome of luxury sedans, offering exceptional comfort, cutting-edge technology, and sophisticated design.',
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
            price: 299,
            seats: 4,
            transmission: 'Manual',
            fuelType: 'Diesel',
            image: 'https://images.unsplash.com/photo-1528154291023-a6525fabe5b4?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjYXJzJTIwcndhbmRhJTIwc2FmYXJpfGVufDB8fHx8MTc0MzQxMTEyMXww&ixlib=rb-4.0.3&fit=fillmax&h=600&w=800',
            description: 'Perfect for adventurous safaris through Rwanda\'s national parks. Rugged and reliable with open-air options.',
            available: true,
            location: 'Kigali',
            category: 'suv',
            driverId: 'd3'
          },
          {
            id: '4',
            name: 'Bentley Continental GT',
            brand: 'Bentley',
            model: 'Continental GT',
            year: 2022,
            price: 799,
            seats: 4,
            transmission: 'Automatic',
            fuelType: 'Gasoline',
            image: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80',
            description: 'The Bentley Continental GT is a grand tourer that represents the perfect blend of luxury, performance, and British craftsmanship.',
            available: false,
            location: 'Kigali',
            category: 'luxury',
            driverId: 'd4'
          }
        ];
        
        setCars(mockCars);
      } catch (error) {
        console.error('Error fetching cars:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCars();
  }, [currentUser, userData, navigate]);
  
  const handleAddCar = () => {
    // In a real application, we would add to Firestore
    const newId = (cars.length + 1).toString();
    const carToAdd = {
      ...newCar,
      id: newId
    } as CarType;
    
    setCars([...cars, carToAdd]);
    setShowAddModal(false);
    setNewCar({
      name: '',
      brand: '',
      model: '',
      year: new Date().getFullYear(),
      price: 0,
      seats: 5,
      transmission: 'Automatic',
      fuelType: 'Diesel',
      image: '',
      description: '',
      available: true,
      location: 'Kigali',
      category: 'suv'
    });
  };
  
  const handleEditCar = (car: CarType) => {
    setEditingCar(car);
  };
  
  const handleSaveEdit = () => {
    if (!editingCar || !editingCar.id) return;
    
    // In a real application, we would update in Firestore
    const updatedCars = cars.map(car => 
      car.id === editingCar.id ? { ...car, ...editingCar } as CarType : car
    );
    
    setCars(updatedCars);
    setEditingCar(null);
  };
  
  const handleDeleteCar = (id: string) => {
    // In a real application, we would delete from Firestore
    const updatedCars = cars.filter(car => car.id !== id);
    setCars(updatedCars);
  };
  
  const handleToggleAvailability = (id: string) => {
    // In a real application, we would update in Firestore
    const updatedCars = cars.map(car => 
      car.id === id ? { ...car, available: !car.available } as CarType : car
    );
    
    setCars(updatedCars);
  };
  
  const filteredCars = cars.filter(car => {
    const matchesSearch = car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         car.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         car.model.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || car.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
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
            <h1 className="text-2xl font-bold text-primary">Manage Cars</h1>
            <button
              onClick={() => setShowAddModal(true)}
              className="btn btn-accent flex items-center"
            >
              <Plus className="mr-2 h-5 w-5" />
              Add New Car
            </button>
          </div>
          
          {/* Filters */}
          <div className="bg-white p-4 rounded-lg shadow-md mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="relative md:w-1/3">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search cars..."
                  className="input pl-10 w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <Filter className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-sm font-medium text-gray-700">Filter:</span>
                </div>
                
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="input"
                >
                  <option value="all">All Categories</option>
                  <option value="suv">SUV</option>
                  <option value="luxury">Luxury</option>
                  <option value="sports">Sports</option>
                  <option value="electric">Electric</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Cars Table */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Car
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Details
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
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
                  {filteredCars.map((car) => (
                    <tr key={car.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-16 w-16 flex-shrink-0">
                            <img className="h-16 w-16 rounded-md object-cover" src={car.image} alt={car.name} />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{car.name}</div>
                            <div className="text-sm text-gray-500">{car.brand} {car.model}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{car.year} • {car.seats} seats</div>
                        <div className="text-sm text-gray-500">{car.transmission} • {car.fuelType}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">${car.price}/day</div>
                        <div className="text-sm text-gray-500">{car.location}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleToggleAvailability(car.id)}
                          className={`px-3 py-1 rounded-full text-xs font-medium 
                            ${car.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                        >
                          {car.available ? 'Available' : 'Unavailable'}
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditCar(car)}
                            className="text-primary hover:text-primary-light"
                          >
                            <Edit className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleDeleteCar(car.id)}
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
      
      {/* Add Car Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-primary">Add New Car</h2>
                <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-500">
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Car Name</label>
                  <input
                    type="text"
                    className="input w-full"
                    value={newCar.name}
                    onChange={(e) => setNewCar({...newCar, name: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
                  <input
                    type="text"
                    className="input w-full"
                    value={newCar.brand}
                    onChange={(e) => setNewCar({...newCar, brand: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
                  <input
                    type="text"
                    className="input w-full"
                    value={newCar.model}
                    onChange={(e) => setNewCar({...newCar, model: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                  <input
                    type="number"
                    className="input w-full"
                    value={newCar.year}
                    onChange={(e) => setNewCar({...newCar, year: parseInt(e.target.value)})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price ($/day)</label>
                  <input
                    type="number"
                    className="input w-full"
                    value={newCar.price}
                    onChange={(e) => setNewCar({...newCar, price: parseInt(e.target.value)})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Seats</label>
                  <input
                    type="number"
                    className="input w-full"
                    value={newCar.seats}
                    onChange={(e) => setNewCar({...newCar, seats: parseInt(e.target.value)})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Transmission</label>
                  <select
                    className="input w-full"
                    value={newCar.transmission}
                    onChange={(e) => setNewCar({...newCar, transmission: e.target.value})}
                  >
                    <option value="Automatic">Automatic</option>
                    <option value="Manual">Manual</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fuel Type</label>
                  <select
                    className="input w-full"
                    value={newCar.fuelType}
                    onChange={(e) => setNewCar({...newCar, fuelType: e.target.value})}
                  >
                    <option value="Diesel">Diesel</option>
                    <option value="Gasoline">Gasoline</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Electric">Electric</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    className="input w-full"
                    value={newCar.location}
                    onChange={(e) => setNewCar({...newCar, location: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    className="input w-full"
                    value={newCar.category}
                    onChange={(e) => setNewCar({...newCar, category: e.target.value})}
                  >
                    <option value="suv">SUV</option>
                    <option value="luxury">Luxury</option>
                    <option value="sports">Sports</option>
                    <option value="electric">Electric</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                  <input
                    type="text"
                    className="input w-full"
                    value={newCar.image}
                    onChange={(e) => setNewCar({...newCar, image: e.target.value})}
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    className="input w-full"
                    rows={3}
                    value={newCar.description}
                    onChange={(e) => setNewCar({...newCar, description: e.target.value})}
                    required
                  ></textarea>
                </div>
                <div className="md:col-span-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-accent focus:ring-accent border-gray-300 rounded"
                      checked={newCar.available}
                      onChange={(e) => setNewCar({...newCar, available: e.target.checked})}
                    />
                    <label className="ml-2 block text-sm text-gray-700">Available for booking</label>
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
                  onClick={handleAddCar}
                  className="btn btn-accent"
                >
                  Add Car
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Edit Car Modal */}
      {editingCar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-primary">Edit Car</h2>
                <button onClick={() => setEditingCar(null)} className="text-gray-400 hover:text-gray-500">
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Car Name</label>
                  <input
                    type="text"
                    className="input w-full"
                    value={editingCar.name}
                    onChange={(e) => setEditingCar({...editingCar, name: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
                  <input
                    type="text"
                    className="input w-full"
                    value={editingCar.brand}
                    onChange={(e) => setEditingCar({...editingCar, brand: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
                  <input
                    type="text"
                    className="input w-full"
                    value={editingCar.model}
                    onChange={(e) => setEditingCar({...editingCar, model: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                  <input
                    type="number"
                    className="input w-full"
                    value={editingCar.year}
                    onChange={(e) => setEditingCar({...editingCar, year: parseInt(e.target.value)})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price ($/day)</label>
                  <input
                    type="number"
                    className="input w-full"
                    value={editingCar.price}
                    onChange={(e) => setEditingCar({...editingCar, price: parseInt(e.target.value)})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Seats</label>
                  <input
                    type="number"
                    className="input w-full"
                    value={editingCar.seats}
                    onChange={(e) => setEditingCar({...editingCar, seats: parseInt(e.target.value)})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Transmission</label>
                  <select
                    className="input w-full"
                    value={editingCar.transmission}
                    onChange={(e) => setEditingCar({...editingCar, transmission: e.target.value})}
                  >
                    <option value="Automatic">Automatic</option>
                    <option value="Manual">Manual</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Fuel Type</label>
                  <select
                    className="input w-full"
                    value={editingCar.fuelType}
                    onChange={(e) => setEditingCar({...editingCar, fuelType: e.target.value})}
                  >
                    <option value="Diesel">Diesel</option>
                    <option value="Gasoline">Gasoline</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Electric">Electric</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    className="input w-full"
                    value={editingCar.location}
                    onChange={(e) => setEditingCar({...editingCar, location: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    className="input w-full"
                    value={editingCar.category}
                    onChange={(e) => setEditingCar({...editingCar, category: e.target.value})}
                  >
                    <option value="suv">SUV</option>
                    <option value="luxury">Luxury</option>
                    <option value="sports">Sports</option>
                    <option value="electric">Electric</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                  <input
                    type="text"
                    className="input w-full"
                    value={editingCar.image}
                    onChange={(e) => setEditingCar({...editingCar, image: e.target.value})}
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    className="input w-full"
                    rows={3}
                    value={editingCar.description}
                    onChange={(e) => setEditingCar({...editingCar, description: e.target.value})}
                    required
                  ></textarea>
                </div>
                <div className="md:col-span-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-accent focus:ring-accent border-gray-300 rounded"
                      checked={editingCar.available}
                      onChange={(e) => setEditingCar({...editingCar, available: e.target.checked})}
                    />
                    <label className="ml-2 block text-sm text-gray-700">Available for booking</label>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setEditingCar(null)}
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
 