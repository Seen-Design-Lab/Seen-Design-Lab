
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Search, ExternalLink } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Work = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const categories = [
    { id: 'all', name: 'All Work' },
    { id: 'ui-design', name: 'UI Design' },
    { id: 'web-development', name: 'Web Development' },
    { id: 'mobile', name: 'Mobile Apps' },
    { id: 'branding', name: 'Branding' }
  ];
  
  const projects = [
    {
      id: 1,
      title: 'Aurora UI Framework',
      subtitle: 'Comprehensive Design System',
      description: 'A complete design system with over 200 components for web and mobile applications. Built with accessibility and customization in mind.',
      imagePath: 'https://images.unsplash.com/photo-1545235617-7a424c1a60cc?q=80&w=1000&auto=format&fit=crop',
      categories: ['ui-design', 'web-development'],
      year: '2023',
      client: 'Internal Product'
    },
    {
      id: 2,
      title: 'Quantum Analytics Platform',
      subtitle: 'Data Visualization Dashboard',
      description: 'Advanced data visualization dashboard with real-time analytics and AI-powered insights for enterprise clients.',
      imagePath: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop',
      categories: ['web-development', 'ui-design'],
      year: '2022',
      client: 'QuantumMetrics Inc.'
    },
    {
      id: 3,
      title: 'Nebula Social Network',
      subtitle: 'Mobile App',
      description: 'Next-generation social platform focused on privacy and meaningful connections, available on iOS and Android.',
      imagePath: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1000&auto=format&fit=crop',
      categories: ['mobile', 'ui-design'],
      year: '2022',
      client: 'Nebula Technologies'
    },
    {
      id: 4,
      title: 'Harmony Music Service',
      subtitle: 'Cross-platform Application',
      description: 'Streaming service with unique AI-powered music discovery and personalized playlists. Available on web, mobile, and desktop.',
      imagePath: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1000&auto=format&fit=crop',
      categories: ['web-development', 'mobile'],
      year: '2021',
      client: 'Harmony Music Inc.'
    },
    {
      id: 5,
      title: 'Vertex Financial',
      subtitle: 'Brand Identity & Website',
      description: 'Complete brand identity and website redesign for a leading fintech company, focusing on trust and innovation.',
      imagePath: 'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1000&auto=format&fit=crop',
      categories: ['branding', 'web-development'],
      year: '2021',
      client: 'Vertex Financial'
    },
    {
      id: 6,
      title: 'Orbit Travel App',
      subtitle: 'Mobile Application',
      description: 'Award-winning travel planning and booking app with unique AR features for exploring destinations.',
      imagePath: 'https://images.unsplash.com/photo-1476984251899-8d7fdfc5c92c?q=80&w=1000&auto=format&fit=crop',
      categories: ['mobile', 'ui-design'],
      year: '2020',
      client: 'Orbit Adventures'
    }
  ];
  
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || !selectedCategory || project.categories.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });
  
  return (
    <div className="min-h-screen bg-seen-dark overflow-x-hidden">
      <Header />
      
      <main className="pt-20 md:pt-24">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 text-sm font-medium bg-white/5 text-seen-accent1 rounded-full mb-4">
              Our Work
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Featured Projects</h1>
            <p className="text-lg text-white/70 max-w-2xl mx-auto">
              Explore our portfolio of work across different industries and platforms,
              showcasing our passion for creating impactful digital experiences.
            </p>
          </div>
          
          <div className="mb-10">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 mb-6">
              <div className="flex items-center overflow-x-auto pb-3 sm:pb-0 space-x-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id === 'all' ? null : category.id)}
                    className={`px-4 py-2 rounded-full border whitespace-nowrap transition-colors ${
                      (category.id === 'all' && !selectedCategory) || selectedCategory === category.id
                        ? 'bg-white text-seen-dark border-white'
                        : 'bg-transparent text-white/70 border-white/20 hover:border-white/40'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
              
              <div className="relative w-full sm:w-64">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <Search size={16} className="text-white/40" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search projects..."
                  className="w-full pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-seen-accent1/50 focus:border-seen-accent1 text-white placeholder-white/40"
                />
              </div>
            </div>
          </div>
          
          <AnimatePresence>
            {filteredProjects.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-20"
              >
                <div className="w-16 h-16 rounded-full bg-white/5 mx-auto flex items-center justify-center mb-4">
                  <Search size={24} className="text-white/40" />
                </div>
                <h3 className="text-lg font-medium mb-2">No projects found</h3>
                <p className="text-white/60">
                  We couldn't find any projects matching your search criteria.
                </p>
              </motion.div>
            ) : (
              <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                {filteredProjects.map(project => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.4 }}
                    className="glass-card rounded-xl overflow-hidden group"
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"></div>
                      <img 
                        src={project.imagePath} 
                        alt={project.title}
                        className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute bottom-4 left-4 z-20">
                        <div className="flex items-center space-x-2 mb-2">
                          {project.categories.map(categoryId => {
                            const category = categories.find(c => c.id === categoryId);
                            return category ? (
                              <span 
                                key={categoryId}
                                className="px-2 py-0.5 text-xs font-medium bg-white/10 backdrop-blur-sm rounded-full"
                              >
                                {category.name}
                              </span>
                            ) : null;
                          })}
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold">{project.title}</h3>
                        <span className="text-white/40 text-sm">{project.year}</span>
                      </div>
                      <p className="text-seen-accent1 mb-3">{project.subtitle}</p>
                      <p className="text-white/70 mb-4">{project.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-white/50 text-sm">Client: {project.client}</span>
                        <button className="flex items-center text-seen-accent1 hover:text-seen-accent2 transition-colors">
                          <span className="mr-1 text-sm font-medium">View Project</span>
                          <ExternalLink size={14} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
          
          <div className="mt-20 p-8 glass-light rounded-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-seen-accent1/10 via-seen-accent2/10 to-seen-accent3/10 opacity-50"></div>
            
            <div className="relative z-10 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Start Your Project?</h2>
              <p className="text-white/70 max-w-2xl mx-auto mb-6">
                Let's collaborate to bring your vision to life with our expertise in design and development.
              </p>
              
              <a href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 bg-white text-seen-dark font-medium rounded-full inline-flex items-center group transition-all duration-300"
                >
                  <span>Get in Touch</span>
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
              </a>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Work;
