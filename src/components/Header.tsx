
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, Info, Briefcase, Package, Mail } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');
  const lastScrollY = useRef(0);
  const location = useLocation();
  
  // Handle scroll direction and position
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      
      // Determine scroll direction
      if (currentScrollY > lastScrollY.current) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }
      
      lastScrollY.current = currentScrollY;
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const navigationItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'About', path: '/about', icon: Info },
    { name: 'Work', path: '/work', icon: Briefcase }, 
    { name: 'Book Hole', path: '/book-hole', icon: Package },
    { name: 'Contact', path: '/contact', icon: Mail }
  ];
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <>
      <AnimatePresence>
        {/* Dynamic Island Style Header - Top position when scrolling up or at top */}
        {(scrollDirection === 'up' || !isScrolled) && (
          <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between mx-auto py-4 px-6 md:px-8 ${isScrolled ? 'glass' : ''}`}
          >
            <Link to="/" className="group">
              <h1 className="text-xl md:text-2xl font-bold relative">
                <span className="text-gradient-blue group-hover:text-gradient-purple transition-all duration-500">Seen</span>
                <span className="text-white/90 group-hover:text-white transition-colors duration-300"> Design Lab</span>
                <motion.span 
                  className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-seen-accent1 to-seen-accent2"
                  animate={{ width: isMenuOpen ? "100%" : "0%" }}
                  transition={{ duration: 0.3 }}
                />
              </h1>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`relative text-sm font-medium group transition-colors duration-300 ${
                    isActive(item.path) ? 'text-seen-accent1' : 'text-white/70 hover:text-white'
                  }`}
                >
                  <span>{item.name}</span>
                  <span className={`absolute -bottom-1 left-0 w-full h-px transform scale-x-0 transition-transform duration-300 ${
                    isActive(item.path) ? 'scale-x-100 bg-seen-accent1' : 'group-hover:scale-x-100 bg-white/30'
                  }`} />
                </Link>
              ))}
            </nav>
            
            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden text-white/90 hover:text-white focus:outline-none"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isMenuOpen ? 'close' : 'menu'}
                  initial={{ opacity: 0, rotate: isMenuOpen ? -90 : 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: isMenuOpen ? 90 : -90 }}
                  transition={{ duration: 0.2 }}
                >
                  {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
                </motion.div>
              </AnimatePresence>
            </button>
          </motion.header>
        )}
        
        {/* Dynamic Island Style Header - Bottom position when scrolling down */}
        {scrollDirection === 'down' && isScrolled && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            className="fixed bottom-6 left-0 right-0 z-50 flex justify-center px-6"
          >
            <motion.nav className="glass flex items-center px-6 py-3 rounded-full space-x-4 md:space-x-8">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className={`relative flex flex-col items-center transition-colors duration-300 ${
                      isActive(item.path) ? 'text-seen-accent1' : 'text-white/70 hover:text-white'
                    }`}
                  >
                    <Icon size={20} className="mb-1" />
                    <span className="text-xs font-medium">{item.name}</span>
                    {isActive(item.path) && (
                      <motion.span
                        layoutId="activePage"
                        className="absolute -bottom-1 w-full h-0.5 bg-seen-accent1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </Link>
                );
              })}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/80 backdrop-blur-md md:hidden"
          >
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="h-full flex flex-col items-center justify-center space-y-8 p-6"
            >
              {navigationItems.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.1 }}
                  >
                    <Link
                      to={item.path}
                      className={`flex items-center text-xl font-medium transition-colors duration-300 ${
                        isActive(item.path) ? 'text-seen-accent1' : 'text-white hover:text-seen-accent1'
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Icon size={20} className="mr-2" />
                      <span>{item.name}</span>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.nav>
            
            <button
              onClick={toggleMenu}
              className="absolute top-5 right-5 text-white/90 hover:text-white focus:outline-none"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
