import  { Award, Shield, Clock, CreditCard } from 'lucide-react';

export const WhyChooseUs = () => {
  const features = [
    {
      icon: <Award className="h-12 w-12 text-accent" />,
      title: 'Local Expertise',
      description: 'Our team of experienced drivers know Rwanda intimately, ensuring you experience the best the country has to offer.'
    },
    {
      icon: <Shield className="h-12 w-12 text-accent" />,
      title: 'Safe Travel',
      description: 'Well-maintained vehicles and comprehensive insurance coverage for peace of mind throughout your journey.'
    },
    {
      icon: <Clock className="h-12 w-12 text-accent" />,
      title: '24/7 Support',
      description: 'Our dedicated support team is available around the clock to assist with any queries or issues during your trip.'
    },
    {
      icon: <CreditCard className="h-12 w-12 text-accent" />,
      title: 'Flexible Options',
      description: 'Choose from self-drive rentals or vehicles with experienced drivers familiar with Rwanda\'s attractions.'
    }
  ];

  return (
    <div className="py-20 bg-white relative overflow-hidden">
      {/* Design elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-gray-100 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gray-100 rounded-full translate-x-1/3 translate-y-1/3"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <p className="text-accent font-medium uppercase tracking-widest mb-2">Why Choose Us</p>
          <h2 className="text-4xl font-display text-primary mb-4 tracking-wide">Experience the Premium Difference</h2>
          <div className="w-24 h-1 bg-accent mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-b-4 border-accent">
              <div className="flex justify-center mb-6">
                <div className="p-4 rounded-full bg-gray-100 inline-block">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-xl font-display text-primary text-center mb-3">{feature.title}</h3>
              <p className="text-gray-600 text-center">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
 