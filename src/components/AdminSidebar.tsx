import  { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Car, 
  Users, 
  Calendar, 
  Settings, 
  User, 
  LogOut 
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const AdminSidebar = () => {
  const location = useLocation();
  const { signOut } = useAuth();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  const menuItems = [
    {
      path: '/admin',
      name: 'Dashboard',
      icon: <LayoutDashboard className="h-5 w-5" />
    },
    {
      path: '/admin/cars',
      name: 'Vehicles',
      icon: <Car className="h-5 w-5" />
    },
    {
      path: '/admin/bookings',
      name: 'Bookings',
      icon: <Calendar className="h-5 w-5" />
    },
    {
      path: '/admin/users',
      name: 'Users',
      icon: <Users className="h-5 w-5" />
    },
    {
      path: '/admin/drivers',
      name: 'Drivers',
      icon: <User className="h-5 w-5" />
    },
    {
      path: '/admin/settings',
      name: 'Settings',
      icon: <Settings className="h-5 w-5" />
    }
  ];
  
  return (
    <div className="bg-primary text-white h-full flex flex-col animated-gradient">
      <div className="p-4 border-b border-gray-800">
        <Link to="/admin" className="flex items-center">
          <div className="w-9 h-9 bg-accent rounded-full flex items-center justify-center mr-3">
            <span className="text-primary font-bold text-lg">R</span>
          </div>
          <div className="font-display tracking-wide">
            <span className="text-accent">RENT</span>
            <span className="text-white">VEHICLE</span>
          </div>
        </Link>
        <p className="text-sm text-gray-400 mt-1 pl-12">Admin Panel</p>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center px-3 py-3 rounded-md transition-colors ${
                  isActive(item.path)
                    ? 'bg-accent text-primary font-medium'
                    : 'text-gray-300 hover:bg-gray-800'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isActive(item.path) ? 'bg-primary' : 'bg-gray-800'}`}>
                  {item.icon}
                </div>
                <span className="ml-3">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-800">
        <button
          onClick={() => signOut()}
          className="flex items-center w-full px-3 py-3 text-gray-300 hover:bg-gray-800 rounded-md group"
        >
          <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center group-hover:bg-red-500">
            <LogOut className="h-5 w-5" />
          </div>
          <span className="ml-3">Log Out</span>
        </button>
      </div>
    </div>
  );
};
 