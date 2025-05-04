import  { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { Settings, Bell, Lock, Shield, Moon, Sun, CheckCircle, Info } from 'lucide-react';

export const SettingsPage = () => {
  const { userData } = useAuth();
  const { theme, toggleTheme } = useTheme();
  
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [isPublicProfile, setIsPublicProfile] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  
  const handleSaveSettings = () => {
    // In a real app, you would save these settings to Firestore
    setSaveMessage('Settings saved successfully!');
    
    setTimeout(() => {
      setSaveMessage('');
    }, 3000);
  };
  
  return (
    <div className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-primary dark:text-white mb-8 flex items-center">
          <Settings className="mr-3 h-8 w-8 text-accent" />
          Settings
        </h1>
        
        {saveMessage && (
          <div className="bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 text-green-700 dark:text-green-300 px-4 py-3 rounded mb-6 flex items-start">
            <CheckCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
            <span>{saveMessage}</span>
          </div>
        )}
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-8">
          <div className="px-6 py-4 bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
            <h2 className="text-xl font-semibold text-primary dark:text-white">Appearance</h2>
          </div>
          
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Theme</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Choose between light and dark mode</p>
              </div>
              <button 
                onClick={toggleTheme}
                className="flex items-center px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                {theme === 'light' ? (
                  <>
                    <Moon className="h-5 w-5 mr-2" />
                    <span>Dark Mode</span>
                  </>
                ) : (
                  <>
                    <Sun className="h-5 w-5 mr-2" />
                    <span>Light Mode</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-8">
          <div className="px-6 py-4 bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
            <h2 className="text-xl font-semibold text-primary dark:text-white">Notifications</h2>
          </div>
          
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Email Notifications</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Receive booking confirmations and updates via email</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={emailNotifications}
                    onChange={() => setEmailNotifications(!emailNotifications)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent-light dark:peer-focus:ring-accent rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-accent"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">SMS Notifications</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Receive text messages for important updates</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={smsNotifications}
                    onChange={() => setSmsNotifications(!smsNotifications)}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent-light dark:peer-focus:ring-accent rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-accent"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-8">
          <div className="px-6 py-4 bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
            <h2 className="text-xl font-semibold text-primary dark:text-white">Privacy</h2>
          </div>
          
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Public Profile</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Allow others to see your profile information</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={isPublicProfile}
                  onChange={() => setIsPublicProfile(!isPublicProfile)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-accent-light dark:peer-focus:ring-accent rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-accent"></div>
              </label>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-8">
          <div className="px-6 py-4 bg-gray-100 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
            <h2 className="text-xl font-semibold text-primary dark:text-white">Payment Methods</h2>
          </div>
          
          <div className="p-6">
            <div className="bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 text-blue-700 dark:text-blue-300 px-4 py-3 rounded mb-6 flex items-start">
              <Info className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">Securely manage your payment methods</p>
                <p className="text-sm">We accept Visa, Mastercard, American Express, and mobile payment options</p>
              </div>
            </div>
            
            <button className="btn btn-accent">
              Add Payment Method
            </button>
          </div>
        </div>
        
        <div className="flex justify-end">
          <button 
            onClick={handleSaveSettings}
            className="btn btn-primary"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};
 