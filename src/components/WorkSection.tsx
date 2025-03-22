
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const WorkSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  
  const projects = [
    {
      title: 'Aurora UI Framework',
      category: 'Design System',
      description: 'A comprehensive design system with over 200 components for web and mobile applications.',
      imagePath: 'https://images.unsplash.com/photo-1545235617-7a424c1a60cc?q=80&w=1000&auto=format&fit=crop',
      accentColor: 'from-blue-500 to-purple-600'
    },
    {
      title: 'Quantum Analytics Platform',
      category: 'Web Application',
      description: 'Advanced data visualization dashboard with real-time analytics and AI-powered insights.',
      imagePath: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop',
      accentColor: 'from-emerald-500 to-teal-600'
    },
    {
      title: 'Nebula Social Network',
      category: 'Mobile App',
      description: 'Next-generation social platform focused on privacy and meaningful connections.',
      imagePath: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1000&auto=format&fit=crop',
      accentColor: 'from-pink-500 to-red-600'
    }
  ];
  
  return (
    <section ref={sectionRef} className="py-20 px-4 relative overflow-hidden" id="work">
      {/* Background Elements */}
      <div className="absolute -top-20 right-0 w-96 h-96 bg-seen-accent1/5 rounded-full filter blur-3xl" />
      
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 text-sm font-medium bg-white/5 text-seen-accent1 rounded-full mb-4">
            Our Work
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Selected Projects</h2>
          <p className="text-lg text-white/70 max-w-2xl mx-auto">
            Explore some of our recent work that showcases our passion for 
            creating innovative and impactful digital experiences.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10" />
              
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${project.imagePath})` }}
              />
              
              <div className="absolute top-4 left-4 z-20">
                <span className={`inline-block px-3 py-1 text-xs font-medium bg-gradient-to-r ${project.accentColor} rounded-full text-white`}>
                  {project.category}
                </span>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <h3 className="text-xl font-bold mb-2 text-white">{project.title}</h3>
                <p className="text-white/70 text-sm mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {project.description}
                </p>
                
                <div className="flex items-center space-x-3">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors duration-300"
                  >
                    <ExternalLink size={16} className="text-white" />
                  </motion.div>
                  <div className="h-6 w-px bg-white/20" />
                  <motion.span 
                    whileHover={{ x: 5 }}
                    className="text-white/80 hover:text-white text-sm font-medium cursor-pointer flex items-center group/link"
                  >
                    View Case Study
                    <svg 
                      width="16" 
                      height="16" 
                      viewBox="0 0 16 16" 
                      fill="none" 
                      xmlns="http://www.w3.org/2000/svg"
                      className="ml-1 transform transition-transform group-hover/link:translate-x-1"
                    >
                      <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </motion.span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <Link to="/work">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-3 border border-white/10 hover:border-white/20 text-white/90 hover:text-white font-medium rounded-full inline-flex items-center group transition-all duration-300"
            >
              <span>View All Projects</span>
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
        </motion.div>
      </div>
    </section>
  );
};

export default WorkSection;
