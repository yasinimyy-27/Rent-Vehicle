import  { Link } from 'react-router-dom';
import { Calendar, Users, Zap, ArrowRight } from 'lucide-react';
import { Car } from '../types';

interface CarCardProps {
  car: Car;
}

export const CarCard = ({ car }: CarCardProps) => {
  return (
    <div className="card group overflow-hidden transition-all duration-500 hover:translate-y-[-5px]">
      <div className="relative overflow-hidden h-60">
        <img 
          src={car.image} 
          alt={`${car.brand} ${car.model}`} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-0 right-0 bg-accent text-primary px-3 py-1 font-bold shadow-md">
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
      <div className="p-5 border-t-2 border-accent">
        <h3 className="text-xl font-display tracking-wide text-primary mb-1">{car.brand} {car.model}</h3>
        <p className="text-gray-500 mb-3 flex items-center">
          <span className="mr-2">{car.year}</span>
          <span className="h-1 w-1 rounded-full bg-accent mr-2"></span>
          <span>{car.transmission}</span>
          <span className="h-1 w-1 rounded-full bg-accent mx-2"></span>
          <span>{car.fuelType}</span>
        </p>
        
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="flex flex-col items-center bg-gray-100 p-2 rounded-md">
            <Users className="h-4 w-4 text-accent mb-1" />
            <span className="text-xs font-medium">{car.seats} seats</span>
          </div>
          
          <div className="flex flex-col items-center bg-gray-100 p-2 rounded-md">
            <Zap className="h-4 w-4 text-accent mb-1" />
            <span className="text-xs font-medium">{car.fuelType}</span>
          </div>
          
          <div className="flex flex-col items-center bg-gray-100 p-2 rounded-md">
            <Calendar className="h-4 w-4 text-accent mb-1" />
            <span className="text-xs font-medium">Available</span>
          </div>
        </div>
        
        <Link 
          to={`/cars/${car.id}`} 
          className="btn btn-primary w-full text-center group"
        >
          <span className="flex items-center justify-center">
            View Details
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
        </Link>
      </div>
    </div>
  );
};
 