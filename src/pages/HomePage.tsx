import  { Hero } from '../components/Hero';
import { FeaturedCars } from '../components/FeaturedCars';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { Testimonials } from '../components/Testimonials';

export const HomePage = () => {
  return (
    <div>
      <Hero />
      <FeaturedCars />
      <WhyChooseUs />
      <Testimonials />
    </div>
  );
};
 