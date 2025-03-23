
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Book, BookOpen, Menu, AlignJustify } from 'lucide-react';
import UserMenu from './Auth/UserMenu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { 
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger
} from '@/components/ui/drawer';

const Header = () => {
  const location = useLocation();
  const isBookHolePage = location.pathname === '/book-hole';
  const isMobile = useIsMobile();
  const [scrolled, setScrolled] = useState(false);
  
  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 100;
      setScrolled(isScrolled);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  // Mobile floating menu button (when scrolled)
  if (isMobile && scrolled) {
    return (
      <Drawer>
        <DrawerTrigger asChild>
          <button className="fixed bottom-4 right-4 z-50 w-14 h-14 rounded-full bg-seen-dark/90 shadow-lg border border-white/10 backdrop-blur-md flex items-center justify-center">
            <AlignJustify size={24} className="text-white" />
          </button>
        </DrawerTrigger>
        <DrawerContent className="bg-seen-dark border-white/10">
          <div className="p-4">
            <nav className="flex flex-col space-y-6 mt-6 mb-12">
              <NavItems />
            </nav>
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <header 
      className={cn(
        "fixed w-full z-40 border-white/5 transition-all duration-500",
        scrolled && !isMobile
          ? "bottom-4 top-auto left-1/2 -translate-x-1/2 max-w-lg w-[90%] bg-seen-dark/90 backdrop-blur-md rounded-full border shadow-lg" 
          : "bg-seen-dark/80 backdrop-blur-md top-0 left-0 border-b"
      )}
    >
      <div className={cn(
        "mx-auto px-4 h-16 flex items-center",
        scrolled && !isMobile ? "justify-center" : "justify-between md:justify-start max-w-7xl"
      )}>
        {(!scrolled || isMobile) && (
          <Link to="/" className="flex items-center text-xl font-bold">
            <BookOpen size={24} className="mr-2 text-gradient-blue" />
            <span className="text-white">Seen Design Lab</span>
          </Link>
        )}

        {/* Desktop Navigation */}
        {!isMobile ? (
          <nav className={cn(
            "flex items-center space-x-6", 
            scrolled ? "" : "mx-auto"
          )}>
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
        {(!scrolled || isMobile) && (
          <div className={isMobile ? "hidden md:block" : ""}>
            <UserMenu />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
