
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AboutSection from '../components/AboutSection';

const About = () => {
  return (
    <div className="min-h-screen bg-seen-dark overflow-x-hidden">
      <Header />
      
      <main className="pt-20 md:pt-24">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 text-sm font-medium bg-white/5 text-seen-accent1 rounded-full mb-4">
              About Us
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Who We Are</h1>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Seen Design Lab is a forward-thinking design studio dedicated to creating meaningful 
              digital experiences that push the boundaries of what's possible.
            </p>
          </div>
        </div>
        
        <AboutSection />
        
        {/* Additional About Content */}
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Story</h2>
              <p className="text-white/70 mb-4">
                Founded in 2018, Seen Design Lab began as a small team of passionate designers and developers 
                committed to challenging the status quo in digital product design.
              </p>
              <p className="text-white/70">
                What started as a boutique design consultancy has evolved into a multidisciplinary studio 
                working with clients across industries to create digital products that are both beautiful 
                and functional.
              </p>
            </div>
            <div className="glass-card rounded-xl overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop" 
                alt="Seen Design Lab Team" 
                className="w-full h-auto"
              />
            </div>
          </div>
          
          <div className="mb-16">
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Our Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  step: '01',
                  title: 'Discovery',
                  description: 'We begin by deeply understanding your business, users, and goals through collaborative workshops and research.'
                },
                {
                  step: '02',
                  title: 'Design',
                  description: 'Our design process focuses on creating intuitive, engaging experiences that solve real problems for users.'
                },
                {
                  step: '03',
                  title: 'Development',
                  description: 'We bring designs to life with clean, efficient code, ensuring the final product is both beautiful and functional.'
                }
              ].map((process, index) => (
                <div key={index} className="glass-card rounded-xl p-6 relative overflow-hidden">
                  <div className="absolute -top-6 -right-6 text-6xl font-bold text-white/5">
                    {process.step}
                  </div>
                  <h3 className="text-xl font-bold mb-3 relative z-10">{process.title}</h3>
                  <p className="text-white/70 relative z-10">{process.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="glass-card rounded-xl p-8 mb-16 relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-seen-accent2/20 rounded-full filter blur-3xl"></div>
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Our Values</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  {
                    title: 'Excellence',
                    description: 'We pursue excellence in everything we do, from design and development to client communication.'
                  },
                  {
                    title: 'Innovation',
                    description: 'We embrace new ideas and technologies, constantly pushing the boundaries of what's possible.'
                  },
                  {
                    title: 'Collaboration',
                    description: 'We believe the best results come from close collaboration with our clients and within our team.'
                  },
                  {
                    title: 'Simplicity',
                    description: 'We value simplicity in our designs, striving to create intuitive experiences that don't overwhelm users.'
                  }
                ].map((value, index) => (
                  <div key={index} className="bg-white/5 rounded-lg p-6">
                    <h3 className="text-lg font-bold mb-2">{value.title}</h3>
                    <p className="text-white/70">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Our Team</h2>
            <p className="text-white/70 max-w-2xl mx-auto mb-12">
              Meet the talented individuals who make up Seen Design Lab. Our diverse team of designers, 
              developers, and strategists brings a wealth of experience and creativity to every project.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              {
                name: 'Alex Chen',
                role: 'Creative Director',
                image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=500&auto=format&fit=crop'
              },
              {
                name: 'Sophia Lee',
                role: 'Lead UX Designer',
                image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=500&auto=format&fit=crop'
              },
              {
                name: 'Marcus Johnson',
                role: 'Technical Lead',
                image: 'https://images.unsplash.com/photo-1600486913747-55e5470d6f40?q=80&w=500&auto=format&fit=crop'
              },
              {
                name: 'Zoe Martinez',
                role: 'Product Strategist',
                image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=500&auto=format&fit=crop'
              }
            ].map((member, index) => (
              <div key={index} className="glass-card rounded-xl overflow-hidden text-center group">
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-bold mb-1">{member.name}</h3>
                  <p className="text-white/60 text-sm">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
