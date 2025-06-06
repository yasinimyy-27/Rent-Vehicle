import  { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { Car } from '../types';
import { CarCard } from '../components/CarCard';
import { Filter, Search } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export const CarsPage = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filterOpen, setFilterOpen] = useState(false);
  
  const categoryFilter = searchParams.get('category') || '';
  const searchQuery = searchParams.get('search') || '';
  
  // Filters
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [selectedBrands] = useState<string[]>([]);
  const [selectedTypes] = useState<string[]>([]);
  const { theme } = useTheme() || { theme: 'light' };

  useEffect(() => {
    const fetchCars = async () => {
      try {
        // Mocked data in case Firebase collection isn't set up yet
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
            description: 'Experience the thrill of driving a Lamborghini Aventador, a luxury sports car that combines stunning design with exhilarating performance.',
            available: true,
            location: 'Kigali',
            category: 'Sports'
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
            category: 'Luxury'
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
            category: 'SUV'
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
            available: true,
            location: 'Kigali',
            category: 'Luxury'
          },
          {
            id: '5',
            name: 'Porsche 911',
            brand: 'Porsche',
            model: '911',
            year: 2023,
            price: 599,
            seats: 2,
            transmission: 'Automatic',
            fuelType: 'Gasoline',
            image: 'https://images.unsplash.com/photo-1580274455191-1c62238fa333?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80',
            description: 'The Porsche 911 is an iconic sports car that offers exceptional handling, speed, and the unmistakable Porsche driving experience.',
            available: true,
            location: 'Kigali',
            category: 'Sports'
          },
          {
            id: '6',
            name: 'Range Rover Autobiography',
            brand: 'Land Rover',
            model: 'Range Rover Autobiography',
            year: 2023,
            price: 549,
            seats: 5,
            transmission: 'Automatic',
            fuelType: 'Hybrid',
            image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80',
            description: 'The Range Rover Autobiography combines off-road capability with luxury, offering a premium SUV experience for both driver and passengers.',
            available: true,
            location: 'Kigali',
            category: 'SUV'
          }
        ];

        // Try to fetch from Firebase, fallback to mock data
        try {
          let carsQuery: any = query(collection(db, 'cars'), where('available', '==', true));
          
          // Apply category filter if selected
          if (categoryFilter) {
            carsQuery = query(carsQuery, where('category', '==', categoryFilter));
          }
          
          const snapshot = await getDocs(carsQuery);
          
          if (!snapshot.empty) {
            let carsData = snapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            })) as Car[];

            // Apply search filter client-side
            if (searchQuery) {
              const search = searchQuery.toLowerCase();
              carsData = carsData.filter(car =>
                car.name.toLowerCase().includes(search) || 
                car.brand.toLowerCase().includes(search) || 
                car.model.toLowerCase().includes(search) ||
                car.description.toLowerCase().includes(search)
              );
            }
            
            setCars(carsData);
          } else {
            let filteredCars = [...mockCars];

            // Mock category filtering
            if (categoryFilter) {
              const categoryMap: Record<string, string[]> = {
                'Luxury': ['Bentley', 'Mercedes-Benz'],
                'Sports': ['Lamborghini', 'Porsche'],
                'SUV': ['Land Rover', 'Jeep'],
                'electric': ['Tesla']
              };

              filteredCars = filteredCars.filter(car =>
                car.category?.toLowerCase() === categoryFilter.toLowerCase()
              );
            }
            
            // Apply search filter client-side
            if (searchQuery) {
              const search = searchQuery.toLowerCase();
              filteredCars = filteredCars.filter(car => 
                car.name.toLowerCase().includes(search) ||
                car.brand.toLowerCase().includes(search) || 
                car.model.toLowerCase().includes(search) ||
                car.description.toLowerCase().includes(search)
              );
            }
            
            setCars(filteredCars);
          }
        } catch (error) {
          console.error('Error fetching cars from Firebase:', error);
          setCars(mockCars);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [categoryFilter, searchQuery]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const search = formData.get('search') as string;

    if (search) {
      setSearchParams(prev => {
        prev.set('search', search);
        return prev;
      });
    } else {
      setSearchParams(prev => {
        prev.delete('search');
        return prev;
      });
    }
  };

  const handleCategoryChange = (category: string | undefined) => {
    setSearchParams(prev => {
      if (category) {
        prev.set('category', category);
      } else {
        prev.delete('category');
      }
 return prev;
    });
  };

  if (loading) {
    return (
      <div className={`flex justify-center items-center h-60 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
 <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 dark:border-blue-400"></div>
      </div>
    );
  }

  return (
    <div className={`py-12 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className={`text-4xl font-extrabold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Explore Our Premium Vehicles</h1>
          <p className={`text-xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Choose from our selection of premium vehicles</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters - Mobile Toggle */}
          <div className="lg:hidden mb-4">
            <button 
              onClick={() => setFilterOpen(!filterOpen)} className={`flex items-center w-full justify-center py-3 px-4 rounded-lg focus:outline-none focus:ring-2 transition duration-200 ${theme === 'dark' ? 'bg-gray-700 text-gray-200 hover:bg-gray-600 focus:ring-gray-500' : 'bg-white text-gray-800 hover:bg-gray-100 focus:ring-gray-300'} shadow-md`}
            >              
              <Filter className="mr-2 h-5 w-5" />
              {filterOpen ? 'Hide Filters' : 'Show Filters'}
            </button>
          </div>
          
          {/* Filters & Search Sidebar */}
 <div className={`lg:w-1/4 ${filterOpen ? 'block' : 'hidden'} lg:block transition-transform duration-300 ease-in-out`}>
            <div className={`${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} rounded-lg shadow-lg p-6`}>
              <h2 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Find Your Car</h2>
              <form onSubmit={handleSearch} className="mb-6">
                <div className="relative">
                  <input
                    type="text"
                    name="search"
                    placeholder="Search cars..."
                    className="input w-full pl-10"
                    defaultValue={searchQuery}
                  />
                  <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                </div>
                <button type="submit" className={`w-full mt-4 py-3 px-4 rounded-lg focus:outline-none focus:ring-2 transition duration-200 ${theme === 'dark' ? 'bg-gray-700 text-white hover:bg-gray-600 focus:ring-gray-500' : 'bg-gray-900 text-white hover:bg-gray-700 focus:ring-gray-800'}`}>Search</button>
              </form>

              <h2 className={`text-xl font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Filter by Category</h2>
              <div className="space-y-2 mb-6">
                <button
                  className={`w-full text-left py-2 px-4 rounded-md focus:outline-none focus:ring-2 transition duration-200 ${!categoryFilter ? 'bg-black text-white focus:ring-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:focus:ring-gray-500' : (theme === 'dark' ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 focus:ring-gray-500' : 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400')}`}
                  onClick={() => handleCategoryChange('')}
                >
                  All Cars
                </button>
                <button 
                  className={`w-full text-left py-2 px-4 rounded-md focus:outline-none focus:ring-2 transition duration-200 ${categoryFilter === 'luxury' ? 'bg-black text-white focus:ring-gray-600' : (theme === 'dark' ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 focus:ring-gray-500' : 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400')}`}
                  onClick={() => handleCategoryChange('luxury')}
                >
                  Luxury
                </button>
                <button 
                  className={`w-full text-left py-2 px-4 rounded-md focus:outline-none focus:ring-2 transition duration-200 ${categoryFilter === 'sports' ? 'bg-black text-white focus:ring-gray-600' : (theme === 'dark' ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 focus:ring-gray-500' : 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400')}`}
                  onClick={() => handleCategoryChange('sports')}
                >
                  Sports
                </button>
                <button 
                  className={`w-full text-left py-2 px-4 rounded-md focus:outline-none focus:ring-2 transition duration-200 ${categoryFilter === 'suv' ? 'bg-black text-white focus:ring-gray-600' : (theme === 'dark' ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 focus:ring-gray-500' : 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400')}`}
                  onClick={() => handleCategoryChange('suv')}
                >
                  SUV
                </button>
                <button 
                  className={`w-full text-left py-2 px-4 rounded-md focus:outline-none focus:ring-2 transition duration-200 ${categoryFilter === 'electric' ? 'bg-black text-white focus:ring-gray-600' : (theme === 'dark' ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 focus:ring-gray-500' : 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400')}`}
                  onClick={() => handleCategoryChange('electric')}
                >
                  Electric
                </button>
              </div>
              {/* Additional filters can be added here */}
            </div>
          </div>
          
          {/* Cars Grid */}
          <div className="lg:w-3/4">
            {cars.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cars.map(car => (
                  <CarCard 
                    key={car.id} 
                    car={car}
 />
                ))}
              </div>
            ) : (
              <div className={`${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} rounded-lg shadow-md p-6 text-center`}>
                <h2 className={`text-xl font-semibold mb-2 ${theme === 'dark' ? 'text-white' : ''}`}>No cars found</h2>
                <p className="text-gray-600">
                  Try adjusting your search criteria or explore other categories.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
 