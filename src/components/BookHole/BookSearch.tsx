
import React, { useRef, useEffect } from 'react';
import { Search } from 'lucide-react';

interface BookSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const BookSearch: React.FC<BookSearchProps> = ({ searchQuery, setSearchQuery }) => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  // Focus on search input when pressing Ctrl+K or Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative max-w-xl mx-auto">
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <Search size={18} className="text-white/40" />
      </div>
      <input
        ref={searchInputRef}
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search for books by title or author... (Ctrl+K)"
        className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-seen-accent1/50 focus:border-seen-accent1 text-white placeholder-white/40"
      />
      <div className="absolute inset-y-0 right-3 flex items-center">
        <kbd className="hidden sm:inline-block px-2 py-1 text-xs font-semibold text-white/40 bg-white/5 rounded">
          Ctrl+K
        </kbd>
      </div>
    </div>
  );
};

export default BookSearch;
