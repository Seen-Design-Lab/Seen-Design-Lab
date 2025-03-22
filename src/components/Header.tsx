import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Book, BookOpen } from 'lucide-react';
import UserMenu from './Auth/UserMenu';

const Header = () => {
  const location = useLocation();
  const isBookHolePage = location.pathname === '/book-hole';

  return (
    <header className="bg-seen-dark/80 backdrop-blur-md fixed top-0 left-0 w-full z-40 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center text-xl font-bold">
          <BookOpen size={24} className="mr-2 text-gradient-blue" />
          <span className="text-white">Seen Design Lab</span>
        </Link>

        <nav className="flex items-center space-x-6">
          <Link to="/" className="text-white/80 hover:text-white transition-colors">
            Home
          </Link>
          <Link to="/about" className="text-white/80 hover:text-white transition-colors">
            About
          </Link>
          <Link to="/work" className="text-white/80 hover:text-white transition-colors">
            Work
          </Link>
          <Link to="/contact" className="text-white/80 hover:text-white transition-colors">
            Contact
          </Link>
          {/* Book Hole Link - Conditionally Rendered */}
          {!isBookHolePage && (
            <Link
              to="/book-hole"
              className="flex items-center text-white/80 hover:text-white transition-colors"
            >
              <Book size={16} className="mr-1" />
              Book Hole
            </Link>
          )}
        </nav>

        {/* Add this somewhere in the header, typically on the right side */}
        <div className="ml-auto">
          <UserMenu />
        </div>

      </div>
    </header>
  );
};

export default Header;
