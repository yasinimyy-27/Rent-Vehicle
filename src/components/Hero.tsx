import  { Link } from 'react-router-dom';
import { Search, Calendar, Clock, ArrowRight } from 'lucide-react';

export const Hero = () => {
  return (
    <div className="relative">
      <div 
        className="h-[85vh] bg-cover bg-center relative"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1532751203793-812308a10d8e?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwzfHxsdXh1cnklMjBjYXIlMjByZW50YWxzJTIwbG9nbyUyMHByZW1pdW18ZW58MHx8fHwxNzQ2MzQ5OTA5fDA&ixlib=rb-4.0.3&fit=fillmax&h=600&w=800')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-primary opacity-90"></div>
        
        <div className="absolute h-full w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
            <div className="max-w-2xl">
              <div className="flex items-center mb-3">
                <div className="h-1 w-16 bg-accent mr-4"></div>
                <span className="text-accent font-semibold tracking-wider uppercase text-sm">Premium Experience</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 font-display tracking-wide">
                DRIVE <span className="text-accent glow">EXCELLENCE</span>
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 max-w-xl">
                Experience Rwanda's breathtaking landscapes with our premium vehicle fleet and professional drivers.
              </p>
              
              <div className="flex space-x-4">
                <Link to="/cars" className="btn btn-accent group">
                  <span className="flex items-center">
                    Explore Our Fleet
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
                <Link to="/about" className="btn btn-outline text-white border-white">
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
        <div className="bg-white rounded-lg shadow-2xl p-6 shine">
          <h2 className="text-2xl font-display text-primary mb-6 tracking-wide">Find Your Perfect Vehicle</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col">
              <label className="mb-2 font-medium text-gray-700">Location</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-accent" />
                <select className="input pl-10 w-full border-2 border-gray-200 hover:border-accent">
                  <option>Kigali</option>
                  <option>Musanze (Volcanoes National Park)</option>
                  <option>Nyungwe Forest</option>
                  <option>Akagera National Park</option>
                  <option>Lake Kivu</option>
                </select>
              </div>
            </div>
            
            <div className="flex flex-col">
              <label className="mb-2 font-medium text-gray-700">Pick-up Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-5 w-5 text-accent" />
                <input 
                  type="date" 
                  className="input pl-10 w-full border-2 border-gray-200 hover:border-accent"
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>
            
            <div className="flex flex-col">
              <label className="mb-2 font-medium text-gray-700">Duration</label>
              <div className="relative">
                <Clock className="absolute left-3 top-3 h-5 w-5 text-accent" />
                <select className="input pl-10 w-full border-2 border-gray-200 hover:border-accent">
                  <option>1 Day</option>
                  <option>2 Days</option>
                  <option>3 Days</option>
                  <option>1 Week</option>
                  <option>2 Weeks</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-center md:justify-end">
            <Link to="/cars" className="btn btn-primary group">
              <span className="flex items-center">
                Search Vehicles
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
 