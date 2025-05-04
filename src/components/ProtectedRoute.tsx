import  { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export const ProtectedRoute = ({ children, requireAdmin = false }: ProtectedRouteProps) => {
  const auth = useAuth();
  const currentUser = auth?.currentUser;
  const isLoading = auth?.isLoading;
  
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [checkingAdmin, setCheckingAdmin] = useState(requireAdmin);
  
  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!currentUser || !requireAdmin) {
        setCheckingAdmin(false);
        return;
      }
      
      try {
        const userDocRef = doc(db, 'users', currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        
        if (userDoc.exists()) {
          setIsAdmin(userDoc.data().isAdmin === true);
        } else {
          setIsAdmin(false);
        }
      } catch (error) {
        console.error('Error checking admin status:', error);
        setIsAdmin(false);
      } finally {
        setCheckingAdmin(false);
      }
    };
    
    checkAdminStatus();
  }, [currentUser, requireAdmin]);
  
  // If still loading authentication state or checking admin status, show loading spinner
  if (isLoading || checkingAdmin) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
      </div>
    );
  }
  
  // If user is not logged in, redirect to login page
  if (!currentUser) {
    return <Navigate to={requireAdmin ? "/admin/login" : "/login"} />;
  }
  
  // If admin access is required but user is not an admin, redirect to homepage
  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" />;
  }
  
  // If all checks pass, render the protected content
  return <>{children}</>;
};
 