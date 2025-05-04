import  { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { format } from 'date-fns';
import { Check, Calendar, MapPin, CreditCard, Car, AlertTriangle, ArrowLeft } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { PaymentMethodsForm } from '../components/PaymentMethodsForm';

interface BookingDetails {
  startDate: string;
  endDate: string;
  pickupLocation: string;
  dropoffLocation: string;
  totalPrice: number;
  totalDays: number;
  car: {
    id: string;
    name: string;
    brand: string;
    model: string;
    image: string;
    price: number;
  };
}

export const BookingConfirmationPage = () => {
  const { carId } = useParams<{ carId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  const [bookingDetails, setBookingDetails] = useState<BookingDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [isPaid, setIsPaid] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  
  useEffect(() => {
    if (!currentUser) {
      navigate('/login', { state: { redirect: location.pathname } });
      return;
    }
    
    // In a real app, you would get this from the previous page's state or from the server
    const bookingDetails = location.state?.bookingDetails;
    
    if (!bookingDetails) {
      navigate(`/cars/${carId}`);
      return;
    }
    
    setBookingDetails(bookingDetails);
    setLoading(false);
  }, [currentUser, carId, location, navigate]);
  
  const handlePayment = () => {
    // In a real app, this would process the payment
    setIsPaid(true);
    setCurrentStep(3);
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-60">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
      </div>
    );
  }
  
  if (!bookingDetails) {
    return (
      <div className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
            <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-primary dark:text-white mb-4">Booking Details Not Found</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              We couldn't find the booking details. Please try again.
            </p>
            <Link to={`/cars/${carId}`} className="btn btn-accent">
              Return to Car Details
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMMM d, yyyy');
  };
  
  return (
    <div className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link to={`/cars/${carId}`} className="flex items-center text-accent hover:underline">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Car Details
          </Link>
        </div>
        
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-center items-center">
            <div className={`flex items-center ${currentStep >= 1 ? 'text-accent' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-accent text-primary' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'}`}>
                1
              </div>
              <span className="ml-2 text-sm font-medium">Booking Summary</span>
            </div>
            
            <div className={`w-10 h-1 mx-2 ${currentStep >= 2 ? 'bg-accent' : 'bg-gray-200 dark:bg-gray-700'}`}></div>
            
            <div className={`flex items-center ${currentStep >= 2 ? 'text-accent' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-accent text-primary' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'}`}>
                2
              </div>
              <span className="ml-2 text-sm font-medium">Payment</span>
            </div>
            
            <div className={`w-10 h-1 mx-2 ${currentStep >= 3 ? 'bg-accent' : 'bg-gray-200 dark:bg-gray-700'}`}></div>
            
            <div className={`flex items-center ${currentStep >= 3 ? 'text-accent' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 3 ? 'bg-accent text-primary' : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'}`}>
                3
              </div>
              <span className="ml-2 text-sm font-medium">Confirmation</span>
            </div>
          </div>
        </div>
        
        {/* Booking Summary (Step 1) */}
        {currentStep === 1 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-semibold text-primary dark:text-white mb-1">Booking Summary</h2>
              <p className="text-gray-600 dark:text-gray-400">Please review your booking details before proceeding to payment</p>
            </div>
            
            <div className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-2/5">
                  <div className="rounded-lg overflow-hidden mb-4">
                    <img 
                      src={bookingDetails.car.image} 
                      alt={bookingDetails.car.name} 
                      className="w-full h-48 object-cover"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-primary dark:text-white">{bookingDetails.car.brand} {bookingDetails.car.model}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{bookingDetails.car.name}</p>
                </div>
                
                <div className="md:w-3/5">
                  <h3 className="text-lg font-semibold text-primary dark:text-white mb-4">Booking Details</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Calendar className="h-5 w-5 text-accent mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-800 dark:text-gray-300">Rental Period</p>
                        <p className="text-gray-600 dark:text-gray-400">
                          {formatDate(bookingDetails.startDate)} - {formatDate(bookingDetails.endDate)}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400">
                          {bookingDetails.totalDays} {bookingDetails.totalDays === 1 ? 'day' : 'days'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-accent mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-800 dark:text-gray-300">Pick-up Location</p>
                        <p className="text-gray-600 dark:text-gray-400">{bookingDetails.pickupLocation}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <MapPin className="h-5 w-5 text-accent mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-800 dark:text-gray-300">Drop-off Location</p>
                        <p className="text-gray-600 dark:text-gray-400">{bookingDetails.dropoffLocation}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600 dark:text-gray-400">Daily Rate:</span>
                      <span className="text-gray-800 dark:text-gray-300">${bookingDetails.car.price}/day</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600 dark:text-gray-400">Number of Days:</span>
                      <span className="text-gray-800 dark:text-gray-300">{bookingDetails.totalDays}</span>
                    </div>
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-2 mt-2">
                      <div className="flex justify-between font-semibold">
                        <span className="text-gray-800 dark:text-gray-200">Total:</span>
                        <span className="text-primary dark:text-white">${bookingDetails.totalPrice}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 flex justify-end">
              <button 
                onClick={() => setCurrentStep(2)}
                className="btn btn-accent"
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        )}
        
        {/* Payment (Step 2) */}
        {currentStep === 2 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-semibold text-primary dark:text-white mb-1">Payment</h2>
              <p className="text-gray-600 dark:text-gray-400">Select your payment method or add a new one</p>
            </div>
            
            <div className="p-6">
              {showPaymentForm ? (
                <PaymentMethodsForm />
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-600 rounded flex items-center justify-center mr-4">
                        <span className="text-white font-bold text-sm">VISA</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 dark:text-gray-300">Visa ending in 4242</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Expires 12/24</p>
                      </div>
                    </div>
                    <input
                      type="radio"
                      name="paymentMethod"
                      className="h-4 w-4 text-accent focus:ring-accent border-gray-300 rounded-full"
                      defaultChecked
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-red-600 rounded flex items-center justify-center mr-4">
                        <span className="text-white font-bold text-sm">MC</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 dark:text-gray-300">Mastercard ending in 5678</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Expires 09/25</p>
                      </div>
                    </div>
                    <input
                      type="radio"
                      name="paymentMethod"
                      className="h-4 w-4 text-accent focus:ring-accent border-gray-300 rounded-full"
                    />
                  </div>
                  
                  <button
                    onClick={() => setShowPaymentForm(true)}
                    className="w-full py-3 flex items-center justify-center text-accent hover:text-accent-light border-2 border-dashed border-accent hover:border-accent-light rounded-lg"
                  >
                    <CreditCard className="h-5 w-5 mr-2" />
                    Add New Payment Method
                  </button>
                </div>
              )}
            </div>
            
            <div className="p-6 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 flex justify-between">
              <button 
                onClick={() => {
                  setShowPaymentForm(false);
                  setCurrentStep(1);
                }}
                className="btn btn-outline border-gray-300 text-gray-700 dark:text-gray-300 dark:border-gray-600"
              >
                Back
              </button>
              
              <button 
                onClick={handlePayment}
                className="btn btn-accent"
              >
                Complete Payment (${bookingDetails.totalPrice})
              </button>
            </div>
          </div>
        )}
        
        {/* Confirmation (Step 3) */}
        {currentStep === 3 && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="h-10 w-10 text-green-600 dark:text-green-300" />
              </div>
              
              <h2 className="text-2xl font-semibold text-primary dark:text-white mb-4">Booking Confirmed!</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Your booking has been successfully confirmed. A confirmation email has been sent to your registered email address.
              </p>
              
              <div className="mb-8 max-w-md mx-auto py-4 px-6 bg-gray-50 dark:bg-gray-900 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-600 dark:text-gray-400">Booking Reference:</span>
                  <span className="font-mono font-semibold text-primary dark:text-white">BK-{Math.floor(100000 + Math.random() * 900000)}</span>
                </div>
                
                <div className="flex items-center mb-2">
                  <Car className="h-5 w-5 text-accent mr-2" />
                  <span className="text-gray-800 dark:text-gray-300">{bookingDetails.car.brand} {bookingDetails.car.model}</span>
                </div>
                
                <div className="flex items-center mb-2">
                  <Calendar className="h-5 w-5 text-accent mr-2" />
                  <span className="text-gray-800 dark:text-gray-300">
                    {formatDate(bookingDetails.startDate)} - {formatDate(bookingDetails.endDate)}
                  </span>
                </div>
                
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-accent mr-2" />
                  <span className="text-gray-800 dark:text-gray-300">{bookingDetails.pickupLocation}</span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/bookings" className="btn btn-accent">
                  View My Bookings
                </Link>
                <Link to="/" className="btn btn-outline border-gray-300 text-gray-700 dark:text-gray-300 dark:border-gray-600">
                  Return to Home
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
 