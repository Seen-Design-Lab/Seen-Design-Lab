
import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  
  return (
    <motion.section 
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-20 px-4"
    >
      {/* Background gradient elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-seen-accent1/10 rounded-full filter blur-3xl opacity-50 animate-pulse-slow"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-seen-accent2/10 rounded-full filter blur-3xl opacity-50 animate-pulse-slow"></div>
      
      <motion.div 
        style={{ y, opacity }}
        className="relative z-10 max-w-6xl mx-auto text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-4"
        >
          <span className="px-3 py-1 text-xs md:text-sm font-medium bg-white/5 rounded-full border border-white/10 text-seen-accent1">
            Design • Innovation • Future
          </span>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight md:leading-tight tracking-tight mb-6 text-balance"
        >
          Crafting Digital <span className="text-gradient-blue">Experiences</span> That
          <br className="hidden md:block" /> Shape the <span className="text-gradient-purple">Future</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto mb-10"
        >
          Seen Design Lab transforms visions into extraordinary digital realities 
          through innovative design, cutting-edge technology, and unparalleled creativity.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link to="/work">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 bg-gradient-to-r from-seen-accent1 to-seen-accent2 text-black font-medium rounded-full flex items-center group transition-all duration-300"
            >
              <span>Explore Our Work</span>
              <ArrowRight size={18} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </Link>
          
          <Link to="/contact">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 border border-white/10 hover:border-white/20 text-white/90 hover:text-white font-medium rounded-full flex items-center group transition-all duration-300"
            >
              <span>Get in Touch</span>
              <ArrowRight size={18} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </Link>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute left-1/2 bottom-10 transform -translate-x-1/2"
        >
          <motion.div 
            animate={{ y: [0, 10, 0] }} 
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center items-start p-1"
          >
            <motion.div 
              animate={{ height: ['20%', '40%', '20%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 bg-white/60 rounded-full"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default Hero;
