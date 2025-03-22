
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-16 px-4 glass">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <Link to="/" className="inline-block group mb-4">
              <h1 className="text-2xl font-bold relative">
                <span className="text-gradient-blue group-hover:text-gradient-purple transition-all duration-500">Seen</span>
                <span className="text-white/90 group-hover:text-white transition-colors duration-300"> Design Lab</span>
              </h1>
            </Link>
            <p className="text-white/60 mb-6 max-w-sm">
              Crafting digital experiences that shape the future through innovative design and cutting-edge technology.
            </p>
            <div className="flex space-x-3">
              {['twitter', 'instagram', 'dribbble', 'linkedin', 'github'].map((social) => (
                <a
                  key={social}
                  href={`https://${social}.com`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors duration-300"
                >
                  <img 
                    src={`https://api.iconify.design/mdi:${social}.svg`} 
                    alt={social} 
                    className="w-4 h-4 text-white/80"
                  />
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-white/90 font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2">
              {[
                { name: 'Home', path: '/' },
                { name: 'About', path: '/about' },
                { name: 'Work', path: '/work' },
                { name: 'Book Hole', path: '/book-hole' },
                { name: 'Contact', path: '/contact' },
              ].map((item) => (
                <li key={item.name}>
                  <Link 
                    to={item.path}
                    className="text-white/60 hover:text-seen-accent1 transition-colors duration-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-white/90 font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {[
                { name: 'Privacy Policy', path: '#' },
                { name: 'Terms of Service', path: '#' },
                { name: 'Cookie Policy', path: '#' },
              ].map((item) => (
                <li key={item.name}>
                  <a 
                    href={item.path}
                    className="text-white/60 hover:text-seen-accent1 transition-colors duration-300"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
            
            <h3 className="text-white/90 font-semibold mt-6 mb-4">Contact</h3>
            <a 
              href="mailto:hello@seendesignlab.com"
              className="text-white/60 hover:text-seen-accent1 transition-colors duration-300 block mb-1"
            >
              hello@seendesignlab.com
            </a>
            <a 
              href="tel:+11234567890"
              className="text-white/60 hover:text-seen-accent1 transition-colors duration-300"
            >
              +1 (123) 456-7890
            </a>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-white/50 text-sm">
          <p>© {currentYear} Seen Design Lab. All rights reserved.</p>
          <div className="mt-3 md:mt-0">
            Crafted with precision and care
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
