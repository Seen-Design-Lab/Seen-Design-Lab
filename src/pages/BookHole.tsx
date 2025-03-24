
import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { X, Book } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BookReader from '../components/BookReader';
import { useAuth } from '@/components/Auth/AuthContext';
import type { Database } from '@/integrations/supabase/types';
import BookHoleHeader from '@/components/BookHole/BookHoleHeader';
import Sidebar from '@/components/BookHole/Sidebar';
import BooksContainer from '@/components/BookHole/BooksContainer';

// Types
type BookType = Database['public']['Tables']['books']['Row'];

interface CategoryType {
  id: string;
  name: string;
  color: string;
}

interface FolderType {
  id: string;
  name: string;
  children: {
    id: string;
    name: string;
  }[];
}

const BookHole = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBook, setSelectedBook] = useState<BookType | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isReaderOpen, setIsReaderOpen] = useState(false);
  const [expandedFolders, setExpandedFolders] = useState<string[]>([]);
  
  // Categories data
  const categories: CategoryType[] = [
    { id: 'design', name: 'Design', color: 'bg-blue-500' },
    { id: 'technology', name: 'Technology', color: 'bg-purple-500' },
    { id: 'business', name: 'Business', color: 'bg-green-500' },
    { id: 'productivity', name: 'Productivity', color: 'bg-yellow-500' },
    { id: 'user-uploaded', name: 'My Uploads', color: 'bg-pink-500' },
  ];
  
  // Folders data
  const folders: FolderType[] = [
    { 
      id: 'design-books', 
      name: 'Design Books',
      children: [
        { id: 'ui-design', name: 'UI Design' },
        { id: 'ux-design', name: 'UX Design' },
        { id: 'graphic-design', name: 'Graphic Design' },
      ]
    },
    { 
      id: 'tech-books', 
      name: 'Tech Books',
      children: [
        { id: 'programming', name: 'Programming' },
        { id: 'web-development', name: 'Web Development' },
      ]
    },
    { 
      id: 'business-books', 
      name: 'Business Books',
      children: []
    },
    {
      id: 'user-uploads',
      name: 'My Uploads',
      children: []
    }
  ];
  
  // Fetch books from Supabase
  const { data: booksData, isLoading, error, refetch: refetchBooks } = useQuery({
    queryKey: ['books'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('books')
        .select('*');
      
      if (error) throw error;
      
      // For local development - override the PDF URL for "Don't Shoot the Dog" to use local file
      const modifiedData = data?.map(book => {
        if (book.title === "Don't Shoot the Dog") {
          return {
            ...book,
            pdf_url: '/pdfs/dont-shoot-the-dog.pdf'
          };
        }
        return book;
      });
      
      return modifiedData || [];
    },
  });
  
  // Fetch saved books for the current user
  const { data: savedBooks, refetch: refetchSavedBooks } = useQuery({
    queryKey: ['savedBooks', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('user_saved_books')
        .select('book_id')
        .eq('user_id', user.id);
      
      if (error) throw error;
      return data?.map((item) => item.book_id) || [];
    },
    enabled: !!user,
  });
  
  // Handle Google Drive callback from URL
  useEffect(() => {
    const handleGoogleDriveCallback = async () => {
      const url = new URL(window.location.href);
      const callbackParam = url.searchParams.get('callback');
      const codeParam = url.searchParams.get('code');
      
      if (callbackParam === 'google-drive' && codeParam && user) {
        try {
          // Process the callback via the edge function
          const { data, error } = await supabase.functions.invoke('google-drive-auth/callback', {
            method: 'POST',
            body: { code: codeParam },
          });
          
          if (error) throw error;
          
          // Remove query parameters
          url.searchParams.delete('callback');
          url.searchParams.delete('code');
          window.history.replaceState({}, '', url.toString());
          
        } catch (error) {
          console.error('Error processing Google Drive callback:', error);
        }
      }
    };
    
    if (user) {
      handleGoogleDriveCallback();
    }
  }, [user]);
  
  // Add escape key listener to close reader
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isReaderOpen) {
        closeReader();
      }
    };
    
    window.addEventListener('keydown', handleEscapeKey);
    return () => window.removeEventListener('keydown', handleEscapeKey);
  }, [isReaderOpen]);
  
  const toggleFolder = (folderId: string) => {
    setExpandedFolders(prev => 
      prev.includes(folderId) 
        ? prev.filter(id => id !== folderId)
        : [...prev, folderId]
    );
  };
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  const openReader = (book: BookType) => {
    setSelectedBook(book);
    setIsReaderOpen(true);
    document.body.style.overflow = 'hidden';
  };
  
  const closeReader = () => {
    setIsReaderOpen(false);
    document.body.style.overflow = '';
  };
  
  // Filter books based on search query and selected category
  const filteredBooks = booksData?.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || book.category.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  }) || [];
  
  return (
    <div className="min-h-screen bg-seen-dark overflow-x-hidden">
      <Header />
      
      <main className="pt-20 md:pt-24 pb-20">
        <BookHoleHeader 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
        />
        
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <AnimatePresence initial={false}>
            {isSidebarOpen && (
              <Sidebar
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                categories={categories}
                folders={folders}
                expandedFolders={expandedFolders}
                toggleFolder={toggleFolder}
                filteredBooks={filteredBooks}
                user={user}
                refetchBooks={refetchBooks}
              />
            )}
          </AnimatePresence>
          
          {/* Toggle Sidebar Button (Mobile) */}
          <div className="md:hidden fixed bottom-6 left-6 z-30">
            <button
              onClick={toggleSidebar}
              className="w-12 h-12 glass rounded-full flex items-center justify-center shadow-lg"
            >
              {isSidebarOpen ? <X size={20} /> : <Book size={20} />}
            </button>
          </div>
          
          {/* Books Container */}
          <BooksContainer 
            isLoading={isLoading}
            error={error}
            filteredBooks={filteredBooks}
            selectedCategory={selectedCategory}
            categories={categories}
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
            openReader={openReader}
            savedBooks={savedBooks}
            user={user}
            refetchSavedBooks={refetchSavedBooks}
          />
        </div>
      </main>
      
      <Footer />
      
      {/* Book Reader Modal */}
      {isReaderOpen && selectedBook && (
        <BookReader 
          pdfUrl={selectedBook.pdf_url || ""} 
          title={selectedBook.title} 
          onClose={closeReader} 
        />
      )}
    </div>
  );
};

export default BookHole;
