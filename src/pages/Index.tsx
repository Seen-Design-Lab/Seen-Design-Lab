
import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import AboutSection from '../components/AboutSection';
import WorkSection from '../components/WorkSection';
import ProductsSection from '../components/ProductsSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import Header from '../components/Header';

const Index = () => {
  // Smooth page transition effect
  useEffect(() => {
    document.body.classList.add('loaded');
    return () => {
      document.body.classList.remove('loaded');
    };
  }, []);

  return (
    <div className="min-h-screen bg-seen-dark overflow-x-hidden">
      <Header />
      <main>
        <Hero />
        <AboutSection />
        <WorkSection />
        <ProductsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
