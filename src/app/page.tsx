import React from 'react';
import Hero from '../components/Home/Hero';
import FeaturedProducts from '../components/Home/FeaturedProducts';
import CarModelsSection from '../components/Home/CarModelsSection';

export default function Home() {
  return (
    <div>
      <Hero />
      <FeaturedProducts />
      <CarModelsSection />
    </div>
  );
}
