
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Package, Book, Code, LayoutGrid } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProductsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  
  const products = [
    {
      icon: Book,
      title: 'Seen Book Hole',
      description: 'A digital library for accessing, reading, and sharing PDF books and documents.',
      link: '/book-hole',
      color: 'from-seen-accent1 to-blue-500'
    },
    {
      icon: Code,
      title: 'Spectrum UI Kit',
      description: 'A comprehensive UI component library for modern web development.',
      link: '#',
      color: 'from-seen-accent2 to-purple-700'
    },
    {
      icon: LayoutGrid,
      title: 'Canvas Prototyping',
      description: 'Advanced prototyping tool for creating interactive design mockups.',
      link: '#',
      color: 'from-seen-accent3 to-pink-700'
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
    <section ref={sectionRef} className="py-20 px-4 relative overflow-hidden" id="products">
      {/* Background Elements */}
      <div className="absolute -bottom-20 left-0 w-96 h-96 bg-seen-accent2/5 rounded-full filter blur-3xl" />
      
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 text-sm font-medium bg-white/5 text-seen-accent1 rounded-full mb-4">
            <Package size={14} className="inline-block mr-1" /> Our Products
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Digital Products</h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Explore our suite of innovative tools and platforms designed to enhance creativity,
            productivity, and digital experiences.
          </p>
        </motion.div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {products.map((product, index) => {
            const Icon = product.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="glass-card hover:glass rounded-xl p-8 transition-all duration-500 group relative overflow-hidden"
              >
                <div className={`absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br ${product.color} rounded-full opacity-10 blur-2xl group-hover:opacity-20 transition-opacity duration-500`} />
                
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${product.color} flex items-center justify-center mb-6`}>
                  <Icon size={28} className="text-white" />
                </div>
                
                <h3 className="text-xl font-bold mb-3">{product.title}</h3>
                <p className="text-white/60 mb-6">{product.description}</p>
                
                <Link to={product.link}>
                  <motion.button
                    whileHover={{ x: 5 }}
                    className="inline-flex items-center text-white/80 hover:text-white text-sm font-medium group/btn"
                  >
                    Explore Product
                    <svg 
                      width="16" 
                      height="16" 
                      viewBox="0 0 16 16" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                      className="ml-1 transform transition-transform group-hover/btn:translate-x-1"
                    >
                      <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </motion.button>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 text-center p-8 glass-light rounded-2xl relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-seen-accent1/10 via-seen-accent2/10 to-seen-accent3/10 opacity-50" />
          
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-4">Looking for a Custom Solution?</h3>
            <p className="text-white/70 max-w-2xl mx-auto mb-6">
              We specialize in creating bespoke digital products tailored to your specific needs and challenges.
              Let's collaborate to bring your vision to life.
            </p>
            
            <Link to="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 bg-white text-seen-dark font-medium rounded-full inline-flex items-center group transition-all duration-300"
              >
                <span>Start a Project</span>
                <svg 
                  width="18" 
                  height="18" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-2 transform transition-transform group-hover:translate-x-1"
                >
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductsSection;
