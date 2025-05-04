import  { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, MapPin, Save, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

export const ProfilePage = () => {
  const { currentUser, userData } = useAuth();
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    
    if (userData) {
      setName(userData.name || '');
      setPhone(userData.phone || '');
      setAddress(userData.address || '');
    }
  }, [currentUser, userData, navigate]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser) return;
    
    try {
      setError('');
      setSuccess('');
      setLoading(true);
      
      const userRef = doc(db, 'users', currentUser.uid);
      await updateDoc(userRef, {
        name,
        phone,
        address,
        updatedAt: new Date()
      });
      
      setSuccess('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  if (!userData) {
    return (
      <div className="flex justify-center items-center h-60">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
      </div>
    );
  }
  
  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-primary mb-8">Your Profile</h1>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/3 bg-primary text-white p-8">
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 rounded-full bg-accent flex items-center justify-center mb-4">
                  <User className="h-16 w-16 text-primary" />
                </div>
                <h2 className="text-xl font-semibold mb-2">{userData.name}</h2>
                <p className="text-sm text-gray-300 mb-6">{userData.email}</p>
                
                {userData.isAdmin && (
                  <div className="bg-accent text-primary px-4 py-1 rounded-full text-sm font-semibold">
                    Administrator
                  </div>
                )}
              </div>
              
              <div className="mt-8 space-y-4">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-accent mr-3" />
                  <span>{userData.email}</span>
                </div>
                
                {userData.phone && (
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-accent mr-3" />
                    <span>{userData.phone}</span>
                  </div>
                )}
                
                {userData.address && (
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-accent mr-3 mt-0.5" />
                    <span>{userData.address}</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="md:w-2/3 p-8">
              <h2 className="text-2xl font-semibold text-primary mb-6">Edit Profile</h2>
              
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6 flex items-start">
                  <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}
              
              {success && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-6">
                  {success}
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="input w-full"
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      value={userData.email}
                      disabled
                      className="input w-full bg-gray-100"
                    />
                    <p className="mt-1 text-sm text-gray-500">Email cannot be changed</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="input w-full"
                      placeholder="Your phone number"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <textarea
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      rows={3}
                      className="input w-full"
                      placeholder="Your address"
                    ></textarea>
                  </div>
                </div>
                
                <div className="mt-6">
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-accent flex items-center justify-center"
                  >
                    {loading ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-primary"></div>
                    ) : (
                      <>
                        <Save className="mr-2 h-5 w-5" />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
 