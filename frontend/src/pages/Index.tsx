
import React from 'react';
import Layout from '../components/common/Layout';
import Hero from '../components/landing/Hero';
import FeaturedCars from '../components/landing/FeaturedCars';
import WhyChooseUs from '../components/landing/WhyChooseUs';
import Testimonials from '../components/landing/Testimonials';

const Index: React.FC = () => {
  return (
    <Layout>
      <Hero />
      <FeaturedCars />
      <WhyChooseUs />
      <Testimonials />
    </Layout>
  );
};

export default Index;
