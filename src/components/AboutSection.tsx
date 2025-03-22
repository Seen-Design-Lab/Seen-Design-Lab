
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code, Palette, Lightbulb } from 'lucide-react';

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  
  const features = [
    {
      icon: Palette,
      title: 'Design Excellence',
      description: 'Our designs blend aesthetics with functionality, creating intuitive and beautiful interfaces.'
    },
    {
      icon: Code,
      title: 'Technical Innovation',
      description: 'We leverage cutting-edge technologies to bring complex digital visions to life.'
    },
    {
      icon: Lightbulb,
      title: 'Creative Thinking',
      description: 'We approach every challenge with a fresh perspective, pushing boundaries in design.'
    }
  ];
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };
  
  return (
    <section ref={sectionRef} className="py-20 px-4 relative overflow-hidden" id="about">
      {/* Background Elements */}
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-seen-accent2/10 rounded-full filter blur-3xl" />
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-seen-accent1/10 rounded-full filter blur-3xl" />
      
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 text-sm font-medium bg-white/5 text-seen-accent1 rounded-full mb-4">
            Who We Are
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Where Creativity Meets Technology</h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Seen Design Lab is a forward-thinking design studio dedicated to creating meaningful digital 
            experiences that push the boundaries of what's possible.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card rounded-2xl p-8 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-seen-accent1/10 rounded-full filter blur-xl opacity-40 -translate-y-1/2 translate-x-1/2" />
            
            <h3 className="text-xl font-bold mb-4">Our Vision</h3>
            <p className="text-white/70 mb-6">
              To redefine digital experiences by combining cutting-edge technology with thoughtful design, creating
              products that are not just functional but also emotionally engaging and aesthetically captivating.
            </p>
            
            <div className="w-20 h-1 bg-gradient-to-r from-seen-accent1 to-seen-accent2 rounded-full" />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="glass-card rounded-2xl p-8 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-seen-accent2/10 rounded-full filter blur-xl opacity-40 -translate-y-1/2 translate-x-1/2" />
            
            <h3 className="text-xl font-bold mb-4">Our Approach</h3>
            <p className="text-white/70 mb-6">
              We believe in a human-centered approach, deeply understanding user needs while pushing the boundaries
              of what's technically possible, always striving for simplicity in even the most complex solutions.
            </p>
            
            <div className="w-20 h-1 bg-gradient-to-r from-seen-accent2 to-seen-accent3 rounded-full" />
          </motion.div>
        </div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="glass-light hover:glass-card rounded-xl p-6 text-center transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-5 group-hover:bg-white/10 transition-colors duration-300">
                  <Icon size={24} className="text-seen-accent1 group-hover:text-seen-accent2 transition-colors duration-300" />
                </div>
                <h3 className="text-lg font-bold mb-3">{feature.title}</h3>
                <p className="text-white/60 text-sm">{feature.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
