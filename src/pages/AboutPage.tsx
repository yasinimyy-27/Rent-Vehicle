import  { CheckCircle, Award, ShieldCheck } from 'lucide-react';

export const AboutPage = () => {
  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-primary mb-4">About Elite Drive Rwanda</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We are dedicated to providing exceptional vehicle rental experiences in Rwanda with a focus on quality, local expertise, and customer satisfaction.
          </p>
        </div>
        
        {/* Our Story */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-12">
          <div className="md:flex items-center">
            <div className="md:w-1/2 md:pr-8 mb-6 md:mb-0">
              <h2 className="text-3xl font-bold text-primary mb-4">Our Story</h2>
              <p className="text-gray-700 mb-4">
                Elite Drive Rwanda was founded in 2015 by a team of passionate Rwandan tourism experts who recognized the need for reliable, high-quality transportation for visitors exploring our beautiful country. What started as a small fleet of vehicles has grown into one of Rwanda's most trusted car rental and chauffeur services.
              </p>
              <p className="text-gray-700">
                Our mission is to showcase the best of Rwanda to our clients through excellent service, local knowledge, and a commitment to sustainable tourism. We believe that quality transportation is essential to a memorable Rwandan experience, whether you're tracking gorillas in Volcanoes National Park, going on safari in Akagera, or attending business meetings in Kigali.
              </p>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1494625927555-6ec4433b1571?ixlib=rb-4.0.3&fit=fillmax&h=800&w=1200" 
                alt="Rwanda landscape" 
                className="rounded-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
        
        {/* Our Values */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-primary text-center mb-8">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="flex justify-center mb-4">
                <Award className="h-16 w-16 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2">Excellence</h3>
              <p className="text-gray-700">
                We are committed to excellence in every aspect of our service, from the vehicles we offer to the drivers we employ and the customer experience we provide.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="flex justify-center mb-4">
                <CheckCircle className="h-16 w-16 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2">Local Expertise</h3>
              <p className="text-gray-700">
                Our team consists of knowledgeable locals who can provide authentic insights and recommendations for an unforgettable Rwandan experience.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="flex justify-center mb-4">
                <ShieldCheck className="h-16 w-16 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-primary mb-2">Sustainability</h3>
              <p className="text-gray-700">
                We are dedicated to responsible tourism practices that protect Rwanda's natural beauty and support local communities through economic development.
              </p>
            </div>
          </div>
        </div>
        
        {/* Rwanda Tourism Section */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-12">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?ixlib=rb-4.0.3&fit=fillmax&h=800&w=1200" 
                alt="Rwanda aerial landscape"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="md:w-1/2 p-8">
              <h2 className="text-3xl font-bold text-primary mb-4">Discover Rwanda</h2>
              <p className="text-gray-700 mb-6">
                Rwanda, known as the "Land of a Thousand Hills," offers breathtaking landscapes, incredible wildlife, and a rich cultural heritage. From the mountain gorillas of Volcanoes National Park to the savannah plains of Akagera, the ancient rainforests of Nyungwe, and the vibrant city life of Kigali, Rwanda has something for every traveler.
              </p>
              <p className="text-gray-700 mb-6">
                Our fleet of vehicles and experienced drivers are ready to help you explore all that Rwanda has to offer, ensuring a comfortable, safe, and informative journey throughout your stay.
              </p>
              <div className="flex justify-center">
                <a 
                  href="/cars" 
                  className="btn btn-accent"
                >
                  Explore Our Fleet
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Our Team */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold text-primary text-center mb-8">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80" 
                alt="CEO" 
                className="w-40 h-40 object-cover rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-primary">Jean-Paul Mugisha</h3>
              <p className="text-gray-600">Founder & CEO</p>
            </div>
            
            <div className="text-center">
              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80" 
                alt="Operations Director" 
                className="w-40 h-40 object-cover rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-primary">Marie Claire Uwimana</h3>
              <p className="text-gray-600">Operations Director</p>
            </div>
            
            <div className="text-center">
              <img 
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80" 
                alt="Fleet Manager" 
                className="w-40 h-40 object-cover rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-primary">Emmanuel Habimana</h3>
              <p className="text-gray-600">Fleet Manager</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
 