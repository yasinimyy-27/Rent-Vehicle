import  { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, Mail, Lock, User, AlertCircle, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [adminCode, setAdminCode] = useState('');
  const [showAdminField, setShowAdminField] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const SECRET_ADMIN_CODE = 'twoinone';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }
    
    try {
      setError('');
      setLoading(true);
      const isAdmin = showAdminField && adminCode === SECRET_ADMIN_CODE;
      await signUp(email, password, name, isAdmin);
      navigate('/');
    } catch (error) {
      setError('Failed to create an account. Email might be already in use.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-primary">Create an Account</h1>
            <p className="text-gray-600 mt-2">Join Elite Drive to book luxury cars</p>
          </div>
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6 flex items-start">
              <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="input pl-10 w-full"
                  placeholder="Enter your full name"
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="input pl-10 w-full"
                  placeholder="Enter your email"
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="input pl-10 w-full"
                  placeholder="Create a password"
                  minLength={6}
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="input pl-10 w-full"
                  placeholder="Confirm your password"
                  minLength={6}
                />
              </div>
            </div>
            
            <div className="mb-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="adminCheckbox"
                  className="h-4 w-4 text-accent focus:ring-accent border-gray-300 rounded"
                  checked={showAdminField}
                  onChange={() => setShowAdminField(!showAdminField)}
                />
                <label htmlFor="adminCheckbox" className="ml-2 block text-sm text-gray-700">
                  Register as administrator
                </label>
              </div>
              
              {showAdminField && (
                <div className="mt-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Admin Code</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Shield className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="password"
                      value={adminCode}
                      onChange={(e) => setAdminCode(e.target.value)}
                      className="input pl-10 w-full"
                      placeholder="Enter admin code"
                    />
                  </div>
                </div>
              )}
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full flex items-center justify-center"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
              ) : (
                <>
                  <UserPlus className="mr-2 h-5 w-5" />
                  Create Account
                </>
              )}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account? <Link to="/login" className="text-accent font-medium hover:underline">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
 