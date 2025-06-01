import  { Link } from 'react-router-dom';
import { Calendar, Users, Zap, ArrowRight } from 'lucide-react';
import { Car } from '../types';

interface CarCardProps {
  car: Car;
}
 
export const CarCard = ({ car }: CarCardProps) => {
  return (
    <div className="card group overflow-hidden transition-all duration-500 hover:translate-y-[-5px] flex flex-col">
      <div className="relative overflow-hidden h-60 bg-white dark:bg-black">
        <img 
          src={car.image} 
          alt={`${car.brand} ${car.model}`} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-0 right-0 bg-accent text-primary px-3 py-1 font-bold shadow-md text-sm">
          ${car.price}/day
        </div>
        {!car.available && (
          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
            <span className="bg-red-600 text-white px-4 py-2 rounded-md font-bold transform -rotate-12 shadow-lg">
              BOOKED
            </span>
          </div>
        )}
      </div>
      <div className="p-5 border-t-2 border-accent flex-grow bg-white dark:bg-black">
        <h3 className="text-xl font-display tracking-wide text-gray-900 mb-1 dark:text-white font-bold">{car.brand} {car.model}</h3>
        <p className="text-gray-600 mb-3 flex items-center text-sm dark:text-gray-300">
          <span className="mr-2">{car.year}</span>
          <span className="h-1 w-1 rounded-full bg-gray-600 dark:bg-gray-300 mr-2"></span>
          <span>{car.transmission} Transmission</span>
          <span className="h-1 w-1 rounded-full bg-accent mx-2"></span>
          <span>{car.fuelType}</span>
        </p>

        <div className="flex flex-wrap gap-y-2 items-center text-sm text-gray-700 dark:text-gray-300 dark:font-light mb-4">
          <span className="mr-3 flex items-center"><Users className="h-4 w-4 mr-1 text-accent" /> {car.seats} Seats</span>
          <span className="mr-3 flex items-center"><Zap className="h-4 w-4 mr-1 text-accent" /> {car.fuelType}</span>
          {/* Removed redundant transmission info */}
        </div>
      </div>
      <div className="px-5 pb-5 border-t-2 border-accent bg-white dark:bg-black rounded-b-lg">
        <Link to={`/cars/${car.id}`} 
 className="block w-full text-center py-3 px-6 rounded-lg bg-black text-white font-semibold tracking-wide shadow-md hover:bg-gray-800 transition duration-300 ease-in-out dark:bg-yellow-500 dark:hover:bg-yellow-600 dark:text-black dark:shadow-lg mt-4"
        >
          <span className="flex items-center justify-center gap-2">
            View Details
          </span>
        </Link>
      </div>
    </div>
  );
};
