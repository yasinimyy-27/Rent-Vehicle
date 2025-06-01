import { CheckCircle, Award, ShieldCheck } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export const AboutPage = () => {
  const { theme } = useTheme();
  return (
    <div className={`py-12 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className={`text-4xl font-bold ${theme === 'dark' ? 'text-white' : 'text-primary'} mb-4`}>About Elite Drive Rwanda</h1>
          <p className={`text-xl ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto`}>
            We are dedicated to providing exceptional vehicle rental experiences in Rwanda with a focus on quality, local expertise, and customer satisfaction.
          </p>
        </div>
        
        {/* Our Story */}
        <div className={`rounded-lg shadow-md p-8 mb-12 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="md:flex items-center">
            <div className="md:w-1/2 md:pr-8 mb-6 md:mb-0">
              <h2 className="text-3xl font-bold text-primary mb-4">Our Story</h2>
              <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Elite Drive Rwanda was founded in 2015 by a team of passionate Rwandan tourism experts who recognized the need for reliable, high-quality transportation for visitors exploring our beautiful country. What started as a small fleet of vehicles has grown into one of Rwanda's most trusted car rental and chauffeur services.
              </p>
              <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Our mission is to showcase the best of Rwanda to our clients through excellent service, local knowledge, and a commitment to sustainable tourism. We believe that quality transportation is essential to a memorable Rwandan experience, whether you're tracking gorillas in Volcanoes National Park, going on safari in Akagera, or attending business meetings in Kigali.
              </p>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://media.istockphoto.com/id/1025394558/photo/agricultural-landscape-with-green-fields.jpg?s=1024x1024&w=is&k=20&c=7i7l2JAlgF5wkCi_yymwAuzstdlojQgv0Wp__puYOtk=" 
                alt="Rwanda landscape" 
                className="rounded-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
        
        {/* Our Values */}
        <div className="mb-12">
          <h2 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-primary'} text-center mb-8`}>Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className={`rounded-lg shadow-md p-6 text-center ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white'}`}>
              <div className="flex justify-center mb-4">
                <Award className="h-16 w-16 text-accent" />
              </div>
              <h3 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-primary'} mb-2`}>Excellence</h3>
              <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                We are committed to excellence in every aspect of our service, from the vehicles we offer to the drivers we employ and the customer experience we provide.
              </p>
            </div>
            
            <div className={`rounded-lg shadow-md p-6 text-center ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white'}`}>
              <div className="flex justify-center mb-4">
                <CheckCircle className="h-16 w-16 text-accent" />
              </div>
              <h3 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-primary'} mb-2`}>Local Expertise</h3>
              <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                Our team consists of knowledgeable locals who can provide authentic insights and recommendations for an unforgettable Rwandan experience.
              </p>
            </div>

            <div className={`rounded-lg shadow-md p-6 text-center ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white'}`}>
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
        <div className={`rounded-lg shadow-md overflow-hidden mb-12 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="md:flex">
            <div className="md:w-1/2">
              <img 
                src="https://media.istockphoto.com/id/1147512198/photo/lake-kivu.jpg?s=1024x1024&w=is&k=20&c=v-_kvCrWDlJ_j3AevbT5AxbouoppmtewwWFe0dyfGj4=" 
                alt="Rwanda aerial landscape"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="md:w-1/2 p-8">
              <h2 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-primary'} mb-4`}>Discover Rwanda</h2>
              <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-6`}>
                Rwanda, known as the "Land of a Thousand Hills," offers breathtaking landscapes, incredible wildlife, and a rich cultural heritage. From the mountain gorillas of Volcanoes National Park to the savannah plains of Akagera, the ancient rainforests of Nyungwe, and the vibrant city life of Kigali, Rwanda has something for every traveler.
              </p>
              <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} mb-6`}>
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
        <div className={`rounded-lg shadow-md p-8 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-primary'} text-center mb-8`}>Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className={`text-center ${theme === 'dark' ? 'text-white' : ''}`}>
              <img 
                src="https://scontent.fkgl4-1.fna.fbcdn.net/v/t39.30808-6/472217260_1055904492887943_1038013082198358342_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeG4cbULYbp4kYkjLh7Zo_2IYqS5MDeHZ7hipLkwN4dnuHR7sadJoQ8ypmG9LQB59G2lJuLCfS02Fie0W4vuce4h&_nc_ohc=jILNGsTvxtwQ7kNvwFQBZof&_nc_oc=AdkN8GxfcEyiaarwqdx6y5h6ixv9Sb5D5_LYJGZ2d-L-hd4-rb-BFXwOkPldeanMl_0ZlFfeSYa9apjivTNYxrDH&_nc_zt=23&_nc_ht=scontent.fkgl4-1.fna&_nc_gid=lltptKPD2f6xAB1biHyk9g&oh=00_AfK0TOKJ1W739KL2p4vPz2fFceKjmHejSIx8w_mA3XaRZQ&oe=683F27F9" 
                alt="CEO"
                className="w-40 h-40 object-cover rounded-full mx-auto mb-4"
              />
              <h3 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-primary'}`}>yasin iradukund</h3>
              <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Founder & CEO</p>
            </div>
            
            <div className={`text-center ${theme === 'dark' ? 'text-white' : ''}`}>
              <img 
                src="https://scontent.fkgl4-1.fna.fbcdn.net/v/t39.30808-6/476833406_1079969307148128_2091630967143122442_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeHYPnLAft5hU3M86b78nFOgJoxP_5UAD8ImjE__lQAPwgCiELdkEOBYRkbIe1WHg5_1QYI4rR2hjA_Y4MBJOZWc&_nc_ohc=aFzXrfEERu0Q7kNvwHvDLcS&_nc_oc=AdmBk4WVc_l5fhU9xXVk26jn5JtC3nhMH4IjU1aKuK_ZO00mDggMmhUF71JQJI92Z0-EtBxuaOtguSsK92RonyZG&_nc_zt=23&_nc_ht=scontent.fkgl4-1.fna&_nc_gid=jdMgNHMhVTV0E8dlicbFbA&oh=00_AfINTnNwkcODcIu9zY1kqPbgnAXaq0WafMhzf6KSz7B9ng&oe=683F2AF1" 
                alt="Operations Director"
                className="w-40 h-40 object-cover rounded-full mx-auto mb-4"
              />
              <h3 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-primary'}`}>yasin myy</h3>
              <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>Operations Director</p>
            </div>
            
            <div className={`text-center ${theme === 'dark' ? 'text-white' : ''}`}>
              <img 
                src="https://i.pinimg.com/280x280_RS/9e/21/87/9e2187b5654d6cc65ed63cceb61b67b2.jpg" 
                alt="Fleet Manager" 
                className="w-40 h-40 object-cover rounded-full mx-auto mb-4"
              />
              <h3 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-primary'}`}>Unkown</h3>
              <p className="text-gray-600">Fleet Manager</p>
            </div>
          </div>
        </div>


        {/* Our Sponsors */}
        <div className={`py-12 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className={`text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-primary'} text-center mb-8`}>Our Sponsors</h2>
            <p className={`text-center text-lg mb-8 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
 Our success is made possible by the generous support and partnership of these leading automotive brands. We are proud to be associated with companies that represent excellence and innovation in the industry.
 </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
              <div className={`rounded-lg shadow-lg p-6 flex justify-center items-center ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                <img src="https://www.carlogos.org/car-logos/tesla-logo-2007-full-640.png" alt="Tesla Logo" className="h-16 object-contain" />
              </div>
              <div className={`rounded-lg shadow-lg p-6 flex justify-center items-center ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                <img src="https://www.carlogos.org/car-logos/ferrari-logo-2002-640.png" alt="Ferrari Logo" className="h-16 object-contain" />
              </div>
              <div className={`rounded-lg shadow-lg p-6 flex justify-center items-center ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                <img src="https://www.carlogos.org/car-logos/bentley-logo-2002-640.png" alt="Bentley Logo" className="h-16 object-contain" />
              </div>
              <div className={`rounded-lg shadow-lg p-6 flex justify-center items-center ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                <img src="https://www.carlogos.org/car-logos/toyota-logo-2020-europe-640.png" alt="Toyota Logo" className="h-16 object-contain" />
              </div>
              <div className={`rounded-lg shadow-lg p-6 flex justify-center items-center ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
                <img src="https://www.carlogos.org/car-logos/mercedes-benz-logo.png" alt="Benz Logo" className="h-16 object-contain" />
              </div>
              <div className={`rounded-lg shadow-lg p-6 flex justify-center items-center ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
 <img src="https://www.carlogos.org/car-logos/maybach-logo.png" alt="Maybach Logo" className="h-16 object-contain" />
              </div>
              <div className={`rounded-lg shadow-lg p-6 flex justify-center items-center ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
 <img src="https://www.carlogos.org/car-logos/rolls-royce-logo.png" alt="Rolls-Royce Logo" className="h-16 object-contain" />
              </div>
              <div className={`rounded-lg shadow-lg p-6 flex justify-center items-center ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
 <img src="https://www.carlogos.org/car-logos/lamborghini-logo.png" alt="Lamborghini Logo" className="h-16 object-contain" />
              </div>
              <div className={`rounded-lg shadow-lg p-6 flex justify-center items-center ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
 <img src="https://www.carlogos.org/car-logos/bmw-logo.png" alt="BMW Logo" className="h-16 object-contain" />
              </div>
              <div className={`rounded-lg shadow-md p-4 flex justify-center items-center ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
 <img src="https://www.carlogos.org/car-logos/chevrolet-logo.png" alt="Chevrolet Logo" className="h-12 object-contain" />
              </div>
              <div className={`rounded-lg shadow-md p-4 flex justify-center items-center ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
 <img src="https://www.carlogos.org/car-logos/hummer-logo.png" alt="Hummer Logo" className="h-12 object-contain" />
              </div>
              <div className={`rounded-lg shadow-md p-4 flex justify-center items-center ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
 <img src="https://www.carlogos.org/car-logos/aston-martin-logo.png" alt="Aston Martin Logo" className="h-12 object-contain" />
              </div>
              <div className={`rounded-lg shadow-lg p-6 flex justify-center items-center ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
 <img src="https://www.carlogos.org/car-logos/bugatti-logo.png" alt="Bugatti Logo" className="h-16 object-contain" />
              </div>
              <div className={`rounded-lg shadow-lg p-6 flex justify-center items-center ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
 <img src="https://www.carlogos.org/car-logos/chevrolet-logo.png" alt="Chevrolet Logo" className="h-12 object-contain" />
              </div>
              <div className={`rounded-lg shadow-lg p-6 flex justify-center items-center ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
 <img src="https://www.carlogos.org/car-logos/infiniti-logo.png" alt="Infiniti Logo" className="h-16 object-contain" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
 );
};
 