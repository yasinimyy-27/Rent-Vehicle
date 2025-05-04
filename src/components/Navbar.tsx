import  { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { User, Menu, LogOut, ShieldCheck, Bell } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { NotificationPanel } from './NotificationPanel';
import { ThemeToggle } from './ThemeToggle';

export const Navbar = () => {
  const auth = useAuth();
  const currentUser = auth?.currentUser;
  const userData = auth?.userData;
  const signOut = auth?.signOut;
  
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const isAdminPage = location.pathname.startsWith('/admin');

  const handleSignOut = async () => {
    try {
      if (signOut) {
        await signOut();
        if (isAdminPage) {
          navigate('/admin/login');
        } else {
          navigate('/');
        }
      }
    } catch (error) {
      console.error('Failed to sign out', error);
    }
  };

  if (isAdminPage) {
    return null;
  }

  return (
    <nav className="bg-primary dark:bg-gray-900 text-white border-b border-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center group">
              <img src="/src/assets/logo.svg" alt="RentVehicle Logo" className="h-12 w-auto mr-3 transition-transform duration-300 group-hover:scale-110" />
            </Link>
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-8">
                <Link to="/" className="group px-3 py-2 text-sm font-medium">
                  <span className="relative">
                    Home
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </Link>
                <Link to="/cars" className="group px-3 py-2 text-sm font-medium">
                  <span className="relative">
                    Vehicles
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </Link>
                <Link to="/about" className="group px-3 py-2 text-sm font-medium">
                  <span className="relative">
                    About
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </Link>
                <Link to="/contact" className="group px-3 py-2 text-sm font-medium">
                  <span className="relative">
                    Contact
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
                  </span>
                </Link>
              </div>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            
            {currentUser ? (
              <div className="relative flex items-center">
                <NotificationPanel />
                
                <button 
                  className="flex items-center px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-light dark:hover:bg-gray-800 group ml-2"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  <div className="flex items-center">
                    <span className="mr-2">{userData?.name || 'User'}</span>
                    <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                  </div>
                </button>
                {isMenuOpen && (
                  <div className="absolute right-0 top-10 mt-2 w-56 bg-white dark:bg-gray-800 text-primary dark:text-white rounded-md shadow-lg z-10 overflow-hidden">
                    <div className="py-1">
                      <Link to="/profile" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
                        Profile
                      </Link>
                      <Link to="/bookings" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
                        My Bookings
                      </Link>
                      <Link to="/settings" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
                        Settings
                      </Link>
                      {userData?.isAdmin && (
                        <Link to="/admin" className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center text-accent">
                          <ShieldCheck className="h-4 w-4 mr-2" />
                          Admin Dashboard
                        </Link>
                      )}
                      <button 
                        onClick={handleSignOut}
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-red-600 dark:text-red-400"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex space-x-3">
                <Link to="/login" className="btn btn-outline-accent">
                  Login
                </Link>
                <Link to="/register" className="btn btn-accent">
                  Register
                </Link>
                <Link to="/admin/login" className="flex items-center btn btn-outline btn-outline-accent">
                  <ShieldCheck className="h-4 w-4 mr-1" />
                  Admin
                </Link>
              </div>
            )}
          </div>
          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle />
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-primary-light dark:hover:bg-gray-700"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden animated-gradient dark:bg-gray-800 border-t border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary-light dark:hover:bg-gray-700">Home</Link>
            <Link to="/cars" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary-light dark:hover:bg-gray-700">Vehicles</Link>
            <Link to="/about" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary-light dark:hover:bg-gray-700">About</Link>
            <Link to="/contact" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary-light dark:hover:bg-gray-700">Contact</Link>
          </div>
          {currentUser ? (
            <div className="pt-4 pb-3 border-t border-gray-700">
              <div className="px-2 space-y-1">
                <Link to="/profile" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary-light dark:hover:bg-gray-700">Profile</Link>
                <Link to="/bookings" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary-light dark:hover:bg-gray-700">My Bookings</Link>
                <Link to="/settings" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary-light dark:hover:bg-gray-700">Settings</Link>
                {userData?.isAdmin && (
                  <Link to="/admin" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-primary-light dark:hover:bg-gray-700 flex items-center text-accent">
                    <ShieldCheck className="h-5 w-5 mr-2" />
                    Admin Dashboard
                  </Link>
                )}
                <button 
                  onClick={handleSignOut}
                  className="flex w-full items-center px-3 py-2 rounded-md text-base font-medium hover:bg-primary-light dark:hover:bg-gray-700 text-red-400"
                >
                  Sign Out <LogOut className="ml-2 h-5 w-5" />
                </button>
              </div>
            </div>
          ) : (
            <div className="pt-4 pb-3 border-t border-gray-700 px-4 flex flex-col space-y-2">
              <Link to="/login" className="btn btn-outline-accent w-full text-center">Login</Link>
              <Link to="/register" className="btn btn-accent w-full text-center">Register</Link>
              <Link to="/admin/login" className="btn btn-outline btn-outline-accent w-full text-center flex items-center justify-center">
                <ShieldCheck className="h-4 w-4 mr-1" />
                Admin Login
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};
 