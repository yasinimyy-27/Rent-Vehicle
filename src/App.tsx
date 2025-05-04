import  { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { WelcomePage } from './pages/WelcomePage';
import { useAuth } from './contexts/AuthContext';

// Lazy load components to improve initial load time
const CarsPage = lazy(() => import('./pages/CarsPage').then(module => ({ default: module.CarsPage })));
const CarDetailsPage = lazy(() => import('./pages/CarDetailsPage').then(module => ({ default: module.CarDetailsPage })));
const BookingConfirmationPage = lazy(() => import('./pages/BookingConfirmationPage').then(module => ({ default: module.BookingConfirmationPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then(module => ({ default: module.AboutPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(module => ({ default: module.ContactPage })));
const LoginPage = lazy(() => import('./pages/LoginPage').then(module => ({ default: module.LoginPage })));
const RegisterPage = lazy(() => import('./pages/RegisterPage').then(module => ({ default: module.RegisterPage })));
const ProfilePage = lazy(() => import('./pages/ProfilePage').then(module => ({ default: module.ProfilePage })));
const SettingsPage = lazy(() => import('./pages/SettingsPage').then(module => ({ default: module.SettingsPage })));
const BookingsPage = lazy(() => import('./pages/BookingsPage').then(module => ({ default: module.BookingsPage })));
const AdminLoginPage = lazy(() => import('./pages/AdminLoginPage').then(module => ({ default: module.AdminLoginPage })));
const AdminDashboardPage = lazy(() => import('./pages/AdminDashboardPage').then(module => ({ default: module.AdminDashboardPage })));
const AdminCarsPage = lazy(() => import('./pages/AdminCarsPage').then(module => ({ default: module.AdminCarsPage })));
const AdminDriversPage = lazy(() => import('./pages/AdminDriversPage').then(module => ({ default: module.AdminDriversPage })));
const AdminBookingsPage = lazy(() => import('./pages/AdminBookingsPage').then(module => ({ default: module.AdminBookingsPage })));

import { ProtectedRoute } from './components/ProtectedRoute';

// Loading component for Suspense fallback
const LoadingComponent = () => (
  <div className="flex w-full h-screen items-center justify-center flex-col space-y-3 p-2">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
    <div className="text-base font-semibold">Loading...</div>
  </div>
);

function App() {
  const { currentUser } = useAuth();

  return (
    <div className="flex flex-col min-h-screen dark:bg-gray-900 dark:text-white">
      <Navbar />
      <main className="flex-grow">
        <Suspense fallback={<LoadingComponent />}>
          <Routes>
            {/* Show welcome page if user is not logged in */}
            <Route path="/" element={currentUser ? <HomePage /> : <WelcomePage />} />
            <Route path="/cars" element={<CarsPage />} />
            <Route path="/cars/:id" element={<CarDetailsPage />} />
            <Route path="/cars/:id/book" element={<BookingConfirmationPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile" element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute>
                <SettingsPage />
              </ProtectedRoute>
            } />
            <Route path="/bookings" element={
              <ProtectedRoute>
                <BookingsPage />
              </ProtectedRoute>
            } />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLoginPage />} />
            <Route path="/admin" element={
              <ProtectedRoute requireAdmin>
                <AdminDashboardPage />
              </ProtectedRoute>
            } />
            <Route path="/admin/cars" element={
              <ProtectedRoute requireAdmin>
                <AdminCarsPage />
              </ProtectedRoute>
            } />
            <Route path="/admin/drivers" element={
              <ProtectedRoute requireAdmin>
                <AdminDriversPage />
              </ProtectedRoute>
            } />
            <Route path="/admin/bookings" element={
              <ProtectedRoute requireAdmin>
                <AdminBookingsPage />
              </ProtectedRoute>
            } />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

export default App;
 