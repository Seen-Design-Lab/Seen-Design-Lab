
import React from 'react';
import { ChevronLeft, ChevronRight, Search, X } from 'lucide-react';
import BookCard from './BookCard';
import type { Database } from '@/integrations/supabase/types';

type BookType = Database['public']['Tables']['books']['Row'];

interface CategoryType {
  id: string;
  name: string;
  color: string;
}

interface BooksContainerProps {
  isLoading: boolean;
  error: unknown;
  filteredBooks: BookType[];
  selectedCategory: string | null;
  categories: CategoryType[];
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  openReader: (book: BookType) => void;
  savedBooks?: string[];
  user: any;
  refetchSavedBooks: () => void;
}

const BooksContainer: React.FC<BooksContainerProps> = ({
  isLoading,
  error,
  filteredBooks,
  selectedCategory,
  categories,
  isSidebarOpen,
  setIsSidebarOpen,
  openReader,
  savedBooks,
  user,
  refetchSavedBooks
}) => {
  return (
    <div className="flex-1">
      <div className="glass-card rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">
            {selectedCategory 
              ? `${categories.find(c => c.id === selectedCategory)?.name} Books` 
              : "All Books"}
          </h2>
          
          <div className="flex items-center">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="hidden md:flex items-center justify-center w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            >
              {isSidebarOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
            </button>
          </div>
        </div>
        
        {isLoading ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 rounded-full border-2 border-seen-accent1 border-t-transparent animate-spin mx-auto mb-4"></div>
            <p className="text-white/70">Loading books...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-white/5 mx-auto flex items-center justify-center mb-4">
              <X size={24} className="text-destructive" />
            </div>
            <h3 className="text-lg font-medium mb-2">Error loading books</h3>
            <p className="text-white/60">
              There was an error loading the books. Please try again later.
            </p>
          </div>
        ) : filteredBooks?.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-white/5 mx-auto flex items-center justify-center mb-4">
              <Search size={24} className="text-white/40" />
            </div>
            <h3 className="text-lg font-medium mb-2">No books found</h3>
            <p className="text-white/60">
              We couldn't find any books matching your search criteria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBooks?.map(book => (
              <BookCard 
                key={book.id}
                book={book} 
                categories={categories}
                savedBooks={savedBooks}
                user={user}
                openReader={openReader}
                refetchSavedBooks={refetchSavedBooks}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BooksContainer;
