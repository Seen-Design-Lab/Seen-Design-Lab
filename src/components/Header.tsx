
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Book, BookOpen, Menu } from 'lucide-react';
import UserMenu from './Auth/UserMenu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';

const Header = () => {
  const location = useLocation();
  const isBookHolePage = location.pathname === '/book-hole';
  const isMobile = useIsMobile();

  const NavItems = () => (
    <>
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
    </>
  );

  return (
    <header className="bg-seen-dark/80 backdrop-blur-md fixed top-0 left-0 w-full z-40 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between md:justify-start">
        <Link to="/" className="flex items-center text-xl font-bold">
          <BookOpen size={24} className="mr-2 text-gradient-blue" />
          <span className="text-white">Seen Design Lab</span>
        </Link>

        {/* Desktop Navigation */}
        {!isMobile ? (
          <nav className="flex items-center space-x-6 mx-auto">
            <NavItems />
          </nav>
        ) : (
          <Sheet>
            <SheetTrigger className="ml-auto md:hidden">
              <Menu className="h-6 w-6 text-white" />
            </SheetTrigger>
            <SheetContent side="right" className="bg-seen-dark border-white/10">
              <nav className="flex flex-col space-y-6 mt-10">
                <NavItems />
              </nav>
            </SheetContent>
          </Sheet>
        )}

        {/* User menu */}
        <div className={isMobile ? "hidden md:block" : ""}>
          <UserMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
