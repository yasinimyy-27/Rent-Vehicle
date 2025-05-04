import  { Link } from 'react-router-dom';
import { ArrowRight, Check, MapPin, Shield, Star } from 'lucide-react';

export const WelcomePage = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-cover bg-center h-screen" 
           style={{ backgroundImage: "url('https://images.unsplash.com/photo-1532751203793-812308a10d8e?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwyfHxsdXh1cnklMjBjYXIlMjByZW50YWwlMjByd2FuZGElMjBzYWZhcml8ZW58MHx8fHwxNzQ2MzUyMzU3fDA&ixlib=rb-4.0.3&fit=fillmax&h=600&w=800')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <div className="text-center max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-display">
              Luxury Car Rental in Rwanda
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-10">
              Experience the beauty of Rwanda in comfort and style with our premium vehicles
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/login" className="btn btn-accent px-8 py-3 text-lg">
                Sign In to Book
              </Link>
              <Link to="/register" className="btn btn-outline text-white border-white px-8 py-3 text-lg">
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary dark:text-white mb-4">
              Why Choose Our Services
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              We offer an unmatched rental experience with premium vehicles and exceptional service
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg text-center">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-primary dark:text-white">Premium Vehicles</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Our fleet features luxury vehicles that are meticulously maintained to ensure your comfort and safety.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg text-center">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-primary dark:text-white">Top Destinations</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Explore Rwanda's breathtaking national parks, vibrant cities, and scenic landscapes with our rental services.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg text-center">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-primary dark:text-white">Complete Safety</h3>
              <p className="text-gray-600 dark:text-gray-400">
                All our vehicles are insured and undergo regular maintenance checks to ensure your safety on the road.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Vehicle Showcase */}
      <div className="py-16 md:py-24 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary dark:text-white mb-4">
              Our Premium Fleet
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Choose from our selection of luxury and utility vehicles
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-700 rounded-lg overflow-hidden shadow-lg">
              <div className="h-60 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1515569067071-ec3b51335dd0?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjYXIlMjByZW50YWwlMjByd2FuZGElMjBzYWZhcml8ZW58MHx8fHwxNzQ2MzUyMzU3fDA&ixlib=rb-4.0.3&fit=fillmax&h=600&w=800" 
                  alt="Luxury Sedan" 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-primary dark:text-white">Luxury Sedans</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Perfect for business travel and city exploration in comfort and style.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-accent font-bold">Starting at $299/day</span>
                  <Link to="/login" className="text-primary dark:text-white font-medium flex items-center hover:text-accent transition-colors">
                    Book Now <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-700 rounded-lg overflow-hidden shadow-lg">
              <div className="h-60 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1414518876340-9c8737380507?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHw2fHxsdXh1cnklMjBjYXIlMjByZW50YWwlMjByd2FuZGElMjBzYWZhcml8ZW58MHx8fHwxNzQ2MzUyMzU3fDA&ixlib=rb-4.0.3&fit=fillmax&h=600&w=800" 
                  alt="Sports Car" 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-primary dark:text-white">Sport Cars</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Experience the thrill of driving high-performance sports cars on Rwanda's scenic roads.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-accent font-bold">Starting at $499/day</span>
                  <Link to="/login" className="text-primary dark:text-white font-medium flex items-center hover:text-accent transition-colors">
                    Book Now <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-700 rounded-lg overflow-hidden shadow-lg">
              <div className="h-60 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixid=M3w3MjUzNDh8MHwxfHNlYXJjaHw3fHxsdXh1cnklMjBjYXIlMjByZW50YWwlMjByd2FuZGElMjBzYWZhcml8ZW58MHx8fHwxNzQ2MzUyMzU3fDA&ixlib=rb-4.0.3&fit=fillmax&h=600&w=800" 
                  alt="Safari Vehicle" 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-primary dark:text-white">Safari Vehicles</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Rugged 4x4 vehicles perfect for wildlife safaris in Rwanda's national parks.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-accent font-bold">Starting at $349/day</span>
                  <Link to="/login" className="text-primary dark:text-white font-medium flex items-center hover:text-accent transition-colors">
                    Book Now <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Link to="/login" className="btn btn-accent px-8 py-3 text-lg inline-flex items-center">
              View All Vehicles <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary dark:text-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Renting a vehicle with us is quick and easy
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary dark:bg-gray-700 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">1</div>
              <h3 className="text-xl font-bold mb-4 text-primary dark:text-white">Create an Account</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Sign up for an account to access our full range of services and features.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary dark:bg-gray-700 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">2</div>
              <h3 className="text-xl font-bold mb-4 text-primary dark:text-white">Choose Your Vehicle</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Browse our fleet and select the perfect vehicle for your needs.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary dark:bg-gray-700 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">3</div>
              <h3 className="text-xl font-bold mb-4 text-primary dark:text-white">Confirm & Enjoy</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Complete your booking and get ready to explore Rwanda in style.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 md:py-24 bg-primary dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Experience Rwanda in Style?
            </h2>
            <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
              Join us today and discover the luxury and convenience of our premium vehicle rental service.
            </p>
            <Link to="/register" className="btn btn-accent px-8 py-3 text-lg">
              Create Your Account Now
            </Link>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-16 md:py-24 bg-gray-100 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary dark:text-white mb-4">
              Customer Testimonials
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Hear what our customers have to say about their experience with us
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg relative">
              <div className="flex justify-center mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80" 
                  alt="Customer" 
                  className="w-20 h-20 rounded-full object-cover border-4 border-accent"
                />
              </div>
              <div className="flex justify-center mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-5 w-5 text-accent fill-current" />
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-center italic mb-6">
                "The Range Rover we rented was perfect for our safari trip to Akagera National Park. The service was exceptional from start to finish."
              </p>
              <h4 className="text-lg font-bold text-primary dark:text-white text-center">James Wilson</h4>
              <p className="text-gray-500 dark:text-gray-400 text-center">Safari Enthusiast</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg relative">
              <div className="flex justify-center mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80" 
                  alt="Customer" 
                  className="w-20 h-20 rounded-full object-cover border-4 border-accent"
                />
              </div>
              <div className="flex justify-center mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-5 w-5 text-accent fill-current" />
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-center italic mb-6">
                "I needed a reliable luxury car for business meetings in Kigali. The Mercedes S-Class was impeccable and made a great impression."
              </p>
              <h4 className="text-lg font-bold text-primary dark:text-white text-center">Sophia Chen</h4>
              <p className="text-gray-500 dark:text-gray-400 text-center">Business Traveler</p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg relative">
              <div className="flex justify-center mb-6">
                <img 
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80" 
                  alt="Customer" 
                  className="w-20 h-20 rounded-full object-cover border-4 border-accent"
                />
              </div>
              <div className="flex justify-center mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-5 w-5 text-accent fill-current" />
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-center italic mb-6">
                "Our 10-day tour through Rwanda was incredible. The driver's local knowledge made our gorilla trekking experience unforgettable."
              </p>
              <h4 className="text-lg font-bold text-primary dark:text-white text-center">Michael Thompson</h4>
              <p className="text-gray-500 dark:text-gray-400 text-center">Adventure Traveler</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
 