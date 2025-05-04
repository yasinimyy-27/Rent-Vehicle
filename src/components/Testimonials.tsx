import  { Star } from 'lucide-react';

export const Testimonials = () => {
  const testimonials = [
    {
      name: 'James Wilson',
      role: 'Safari Enthusiast',
      comment: 'Our Land Cruiser was perfect for exploring Akagera National Park. The driver was knowledgeable about wildlife and took us to the best viewing spots!',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80'
    },
    {
      name: 'Sophia Chen',
      role: 'Business Traveler',
      comment: 'The Mercedes service in Kigali was exceptional. Driver was punctual, professional, and the vehicle was immaculate. Perfect for business meetings.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80'
    },
    {
      name: 'Michael Thompson',
      role: 'Adventure Traveler',
      comment: 'We booked a 10-day tour through Rwanda and our driver Emmanuel was incredible. His knowledge of the country made our gorilla trekking experience unforgettable.',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80'
    }
  ];

  return (
    <div className="py-20 bg-primary text-white relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-accent font-medium uppercase tracking-widest mb-2">Client Feedback</p>
          <h2 className="text-4xl font-display text-white mb-4 tracking-wide">What Our Clients Say</h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
          <p className="text-gray-400 max-w-2xl mx-auto">Read testimonials from travelers who explored Rwanda with our premium vehicles and services.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-primary-light p-8 rounded-lg shadow-xl border border-gray-800 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-accent/20">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-accent mr-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-white">{testimonial.name}</h3>
                  <p className="text-accent text-sm">{testimonial.role}</p>
                </div>
              </div>
              
              <div className="flex mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star 
                    key={i}
                    className={`h-5 w-5 ${i < testimonial.rating ? 'text-accent fill-current' : 'text-gray-700'}`}
                  />
                ))}
              </div>
              
              <p className="text-gray-400 italic">&ldquo;{testimonial.comment}&rdquo;</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
 