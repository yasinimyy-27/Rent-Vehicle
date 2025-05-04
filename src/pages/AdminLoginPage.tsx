import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, Mail, Lock, AlertCircle, ShieldCheck, Info } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

export const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setError('');
      setLoading(true);
      
      // Sign in using Firebase Authentication
      const credentials = await signIn(email, password);
      
      if (credentials && credentials.user) {
        // Check if user is an admin
        const userDocRef = doc(db, 'users', credentials.user.uid);
        const userDoc = await getDoc(userDocRef);
        
        if (userDoc.exists() && userDoc.data().isAdmin) {
          // User is an admin, navigate to admin dashboard
          navigate('/admin');
        } else {
          // User is not an admin
          setError('Access denied. You do not have administrator privileges.');
        }
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to sign in. Please check your credentials.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDemoAdminLogin = async () => {
    try {
      setError('');
      setLoading(true);
      
      await signIn('demo@example.com', 'password123');
      navigate('/admin');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to sign in with demo account.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="p-4 bg-primary rounded-full">
            <ShieldCheck className="h-12 w-12 text-accent" />
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-bold text-primary">Admin Login</h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Enter your credentials to access the admin dashboard
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6 flex items-start">
              <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}
          
          <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded mb-6 flex items-start">
            <Info className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium">Demo Admin Access</p>
              <p className="text-sm">Use the demo button below to log in with admin privileges.</p>
            </div>
          </div>
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input pl-10 block w-full"
                  placeholder="admin@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input pl-10 block w-full"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 btn btn-primary"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                ) : (
                  <>
                    <LogIn className="mr-2 h-5 w-5" />
                    Sign in to Dashboard
                  </>
                )}
              </button>
            </div>
            
            <div>
              <button
                type="button"
                onClick={handleDemoAdminLogin}
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 btn btn-accent"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-primary"></div>
                ) : (
                  <>
                    <ShieldCheck className="mr-2 h-5 w-5" />
                    Use Demo Admin Account
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
 