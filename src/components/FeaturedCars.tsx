import  { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, query, limit, getDocs, where } from 'firebase/firestore';
import { db } from '../firebase';
import { Car } from '../types';
import { CarCard } from './CarCard';
import { ArrowRight } from 'lucide-react';

export const FeaturedCars = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

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
            image: 'https://images.unsplash.com/photo-1580576582449-3e34e5ddad21?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjYXIlMjByZW50YWxzJTIwbG9nbyUyMHByZW1pdW18ZW58MHx8fHwxNzQ2MzQ5OTA5fDA&ixlib=rb-4.0.3&fit=fillmax&h=600&w=800',
            description: 'Experience the thrill of driving a Lamborghini Aventador, a luxury sports car that combines stunning design with exhilarating performance.',
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
            image: 'https://images.unsplash.com/photo-1515569067071-ec3b51335dd0?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwyfHxsdXh1cnklMjBjYXIlMjByZW50YWxzJTIwbG9nbyUyMHByZW1pdW18ZW58MHx8fHwxNzQ2MzQ5OTA5fDA&ixlib=rb-4.0.3&fit=fillmax&h=600&w=800',
            description: 'The Mercedes-Benz S-Class is the epitome of luxury sedans, offering exceptional comfort, cutting-edge technology, and sophisticated design.',
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
            image: 'https://images.unsplash.com/photo-1498887960847-2a5e46312788?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHw0fHxsdXh1cnklMjBjYXIlMjByZW50YWxzJTIwbG9nbyUyMHByZW1pdW18ZW58MHx8fHwxNzQ2MzQ5OTA5fDA&ixlib=rb-4.0.3&fit=fillmax&h=600&w=800',
            description: 'Perfect for adventurous safaris through Rwanda\'s national parks. Rugged and reliable with open-air options.',
            available: true,
            location: 'Kigali',
            category: 'suv'
          }
        ];
        
        // Try to fetch from Firebase, fallback to mock data
        try {
          const carsQuery = query(
            collection(db, 'cars'),
            where('available', '==', true),
            limit(3)
          );
          
          const snapshot = await getDocs(carsQuery);
          
          if (!snapshot.empty) {
            const carsData = snapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            })) as Car[];
            
            setCars(carsData);
          } else {
            setCars(mockCars);
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
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-60">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
      </div>
    );
  }

  return (
    <div className="py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-accent font-medium uppercase tracking-widest mb-2">Premium Selection</p>
          <h2 className="text-4xl font-display text-primary mb-4 tracking-wide">Featured Vehicles</h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">Discover our most popular vehicles for exploring Rwanda's breathtaking landscapes and vibrant cities.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars.map(car => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
        
        <div className="text-center mt-14">
          <Link 
            to="/cars" 
            className="inline-flex items-center btn btn-accent px-8 py-3 group"
          >
            <span className="flex items-center">
              View All Vehicles
              <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};
 