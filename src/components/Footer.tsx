import  { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center mr-3">
                <span className="text-primary font-bold text-xl">R</span>
              </div>
              <div className="font-display text-xl tracking-wider">
                <span className="text-accent">RENT</span>
                <span className="text-white">VEHICLE</span>
              </div>
            </div>
            <p className="text-gray-400 mb-4 leading-relaxed">Premium vehicle rental service in Rwanda, offering exceptional quality vehicles and professional drivers for all your needs.</p>
            <div className="flex space-x-4">
              <a href="#" className="group">
                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-accent">
                  <Facebook className="h-4 w-4 text-white group-hover:text-primary" />
                </div>
              </a>
              <a href="#" className="group">
                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-accent">
                  <Instagram className="h-4 w-4 text-white group-hover:text-primary" />
                </div>
              </a>
              <a href="#" className="group">
                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-accent">
                  <Twitter className="h-4 w-4 text-white group-hover:text-primary" />
                </div>
              </a>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <h3 className="text-accent font-display text-lg mb-4 tracking-wide">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-accent transition-colors duration-300 flex items-center">
                  <span className="h-0.5 w-0 bg-accent mr-0 transition-all duration-300 inline-block"></span>
                  <span className="hover:ml-2 transition-all duration-300">Home</span>
                </Link>
              </li>
              <li>
                <Link to="/cars" className="text-gray-400 hover:text-accent transition-colors duration-300 flex items-center">
                  <span className="h-0.5 w-0 bg-accent mr-0 transition-all duration-300 inline-block"></span>
                  <span className="hover:ml-2 transition-all duration-300">Vehicles</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-accent transition-colors duration-300 flex items-center">
                  <span className="h-0.5 w-0 bg-accent mr-0 transition-all duration-300 inline-block"></span>
                  <span className="hover:ml-2 transition-all duration-300">About Us</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-accent transition-colors duration-300 flex items-center">
                  <span className="h-0.5 w-0 bg-accent mr-0 transition-all duration-300 inline-block"></span>
                  <span className="hover:ml-2 transition-all duration-300">Contact</span>
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="lg:col-span-1">
            <h3 className="text-accent font-display text-lg mb-4 tracking-wide">Popular Destinations</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/cars?location=kigali" className="text-gray-400 hover:text-accent transition-colors duration-300 flex items-center">
                  <span className="h-0.5 w-0 bg-accent mr-0 transition-all duration-300 inline-block"></span>
                  <span className="hover:ml-2 transition-all duration-300">Kigali City</span>
                </Link>
              </li>
              <li>
                <Link to="/cars?location=volcanoes" className="text-gray-400 hover:text-accent transition-colors duration-300 flex items-center">
                  <span className="h-0.5 w-0 bg-accent mr-0 transition-all duration-300 inline-block"></span>
                  <span className="hover:ml-2 transition-all duration-300">Volcanoes National Park</span>
                </Link>
              </li>
              <li>
                <Link to="/cars?location=akagera" className="text-gray-400 hover:text-accent transition-colors duration-300 flex items-center">
                  <span className="h-0.5 w-0 bg-accent mr-0 transition-all duration-300 inline-block"></span>
                  <span className="hover:ml-2 transition-all duration-300">Akagera National Park</span>
                </Link>
              </li>
              <li>
                <Link to="/cars?location=nyungwe" className="text-gray-400 hover:text-accent transition-colors duration-300 flex items-center">
                  <span className="h-0.5 w-0 bg-accent mr-0 transition-all duration-300 inline-block"></span>
                  <span className="hover:ml-2 transition-all duration-300">Nyungwe Forest</span>
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="lg:col-span-1">
            <h3 className="text-accent font-display text-lg mb-4 tracking-wide">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                  <MapPin className="h-4 w-4 text-accent" />
                </div>
                <span className="text-gray-400">KG 123 Street, Kigali, Rwanda</span>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <Phone className="h-4 w-4 text-accent" />
                </div>
                <span className="text-gray-400">+250 78 123 4567</span>
              </div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                  <Mail className="h-4 w-4 text-accent" />
                </div>
                <span className="text-gray-400">info@rentvehicle.com</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} RentVehicle. All rights reserved. Built with jdoodle.ai
            </p>
            <div className="flex space-x-6">
              <Link to="/terms" className="text-gray-500 hover:text-accent text-sm">Terms & Conditions</Link>
              <Link to="/privacy" className="text-gray-500 hover:text-accent text-sm">Privacy Policy</Link>
              <Link to="/faq" className="text-gray-500 hover:text-accent text-sm">FAQ</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
 