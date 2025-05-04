import  { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User as FirebaseUser,
  AuthError
} from 'firebase/auth';
import { doc, getDoc, setDoc, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { User } from '../types';

interface AuthContextType {
  currentUser: FirebaseUser | null;
  userData: User | null;
  isLoading: boolean;
  signUp: (email: string, password: string, name: string, isAdmin?: boolean) => Promise<void>;
  signIn: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<void>;
  checkAdmin: () => boolean;
  addNotification: (userId: string, message: string, type: string) => Promise<void>;
}

// Create context with default values
const defaultContextValue: AuthContextType = {
  currentUser: null,
  userData: null,
  isLoading: true,
  signUp: async () => {},
  signIn: async () => null,
  signOut: async () => {},
  checkAdmin: () => false,
  addNotification: async () => {}
};

const AuthContext = createContext<AuthContextType>(defaultContextValue);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<FirebaseUser | null>(null);
  const [userData, setUserData] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const signUp = async (email: string, password: string, name: string, isAdmin = false) => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, 'users', user.uid), {
        name,
        email,
        isAdmin,
        createdAt: new Date(),
        phone: '',
        address: ''
      });

      // Add welcome notification
      await addNotification(
        user.uid, 
        `Welcome to Elite Drive Rwanda, ${name}! Your account has been created successfully.`, 
        'info'
      );

      // If user is admin, add special notification
      if (isAdmin) {
        await addNotification(
          user.uid,
          'You have registered as an administrator. You now have access to the admin dashboard.',
          'success'
        );
      }
    } catch (error) {
      console.error("Error in signUp:", error);
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      // For testing purposes, allow a demo login
      if (email === 'demo@example.com' && password === 'password123') {
        // Create or find demo user
        const demoUserRef = doc(db, 'users', 'demouser123');
        const demoUser = await getDoc(demoUserRef);
        
        if (!demoUser.exists()) {
          await setDoc(demoUserRef, {
            name: 'Demo User',
            email: 'demo@example.com',
            isAdmin: true,
            createdAt: new Date(),
            phone: '+250 788 123 456',
            address: 'Kigali, Rwanda'
          });
        }
        
        // Manually set current user state for demo login
        const demoUserData = { 
          uid: 'demouser123',
          email: 'demo@example.com',
          displayName: 'Demo User'
        } as unknown as FirebaseUser;
        
        setCurrentUser(demoUserData);
        setUserData({
          id: 'demouser123',
          name: 'Demo User',
          email: 'demo@example.com',
          isAdmin: true,
          phone: '+250 788 123 456',
          address: 'Kigali, Rwanda'
        });
        
        return { user: demoUserData };
      }
      
      // Regular Firebase authentication
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      const authError = error as AuthError;
      console.error("Error in signIn:", authError);
      
      // Handle specific Firebase errors with more user-friendly messages
      if (authError.code === 'auth/invalid-credential') {
        throw new Error('Invalid email or password. Please try again.');
      } else if (authError.code === 'auth/user-not-found') {
        throw new Error('No account found with this email. Please register first.');
      } else if (authError.code === 'auth/wrong-password') {
        throw new Error('Incorrect password. Please try again.');
      } else if (authError.code === 'auth/too-many-requests') {
        throw new Error('Too many failed login attempts. Please try again later.');
      } else if (authError.code === 'auth/network-request-failed') {
        throw new Error('Network error. Please check your internet connection.');
      } else {
        throw new Error('Failed to sign in. Please try again later.');
      }
    }
  };

  const signOut = async () => {
    try {
      return await firebaseSignOut(auth);
    } catch (error) {
      console.error("Error in signOut:", error);
      throw error;
    }
  };
  
  const checkAdmin = () => {
    return !!userData?.isAdmin;
  };

  const addNotification = async (userId: string, message: string, type: string) => {
    try {
      await addDoc(collection(db, 'notifications'), {
        userId,
        message,
        type, // 'info', 'success', 'warning', 'error'
        read: false,
        createdAt: serverTimestamp()
      });
    } catch (error) {
      console.error("Error adding notification:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        try {
          const docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists()) {
            setUserData({ id: user.uid, ...docSnap.data() } as User);
          } else {
            // Create a basic user document if it doesn't exist
            const userData = {
              name: user.displayName || 'User',
              email: user.email || '',
              isAdmin: false,
              createdAt: new Date(),
              phone: '',
              address: ''
            };
            
            await setDoc(docRef, userData);
            setUserData({ id: user.uid, ...userData } as User);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        setUserData(null);
      }
      
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userData,
    isLoading,
    signUp,
    signIn,
    signOut,
    checkAdmin,
    addNotification
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
 