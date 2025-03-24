
import React from 'react';
import { motion } from 'framer-motion';
import { Book, BookOpen, FileText, Clock } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';

type BookType = Database['public']['Tables']['books']['Row'];

interface CategoryType {
  id: string;
  name: string;
  color: string;
}

interface BookCardProps {
  book: BookType;
  categories: CategoryType[];
  savedBooks?: string[];
  user: any;
  openReader: (book: BookType) => void;
  refetchSavedBooks: () => void;
}

const BookCard: React.FC<BookCardProps> = ({ 
  book, 
  categories, 
  savedBooks = [], 
  user, 
  openReader,
  refetchSavedBooks
}) => {
  // Check if a book is saved by the current user
  const isBookSaved = (bookId: string) => {
    return savedBooks?.includes(bookId);
  };
  
  // Save or unsave a book
  const toggleSaveBook = async (bookId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent opening the book
    
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to save books.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      if (isBookSaved(bookId)) {
        // Unsave the book
        await supabase
          .from('user_saved_books')
          .delete()
          .eq('user_id', user.id)
          .eq('book_id', bookId);
        
        toast({
          title: "Book removed",
          description: "The book has been removed from your saved collection.",
        });
      } else {
        // Save the book
        await supabase
          .from('user_saved_books')
          .insert({
            user_id: user.id,
            book_id: bookId,
          });
        
        toast({
          title: "Book saved",
          description: "The book has been added to your saved collection.",
        });
      }
      
      // Refetch the saved books
      refetchSavedBooks();
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error processing your request.",
        variant: "destructive",
      });
      console.error(error);
    }
  };

  return (
    <motion.div
      key={book.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group cursor-pointer"
      onClick={() => openReader(book)}
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-lg mb-3 group-hover:shadow-lg transition-shadow duration-300">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10"></div>
        <img 
          src={book.cover_image || 'https://via.placeholder.com/300x450?text=No+Cover'} 
          alt={book.title}
          className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute bottom-3 left-3 right-3 z-20">
          <div className="flex items-center space-x-2 mb-2">
            {book.category.map(categoryId => {
              const category = categories.find(c => c.id === categoryId);
              return category ? (
                <span 
                  key={categoryId}
                  className={`px-2 py-0.5 text-xs font-medium rounded-full ${category.color}`}
                >
                  {category.name}
                </span>
              ) : null;
            })}
          </div>
          <div className="flex items-center text-white/60 text-xs space-x-3">
            <span className="flex items-center">
              <FileText size={12} className="mr-1" />
              {book.page_count || 'Unknown'} pages
            </span>
            <span className="flex items-center">
              <Clock size={12} className="mr-1" />
              {book.publication_date || 'Unknown'}
            </span>
          </div>
        </div>
        
        {/* Save button */}
        {user && (
          <button
            onClick={(e) => toggleSaveBook(book.id, e)}
            className="absolute top-3 right-3 z-20 p-2 rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/50 transition-colors"
          >
            {isBookSaved(book.id) ? (
              <BookOpen size={16} className="text-seen-accent1" />
            ) : (
              <Book size={16} className="text-white" />
            )}
          </button>
        )}
      </div>
      <h3 className="font-medium mb-1 group-hover:text-seen-accent1 transition-colors duration-300">
        {book.title}
      </h3>
      <p className="text-sm text-white/60">{book.author}</p>
    </motion.div>
  );
};

export default BookCard;
