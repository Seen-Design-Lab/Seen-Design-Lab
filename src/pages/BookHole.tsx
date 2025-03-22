
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Book, FolderOpen, Tag, Filter, BookOpen, Book as BookIcon, FileText, X, Plus, Clock, ChevronDown, ChevronRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BookReader from '../components/BookReader';

const BookHole = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBook, setSelectedBook] = useState<any | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isReaderOpen, setIsReaderOpen] = useState(false);
  const [expandedFolders, setExpandedFolders] = useState<string[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  // Mock data
  const categories = [
    { id: 'design', name: 'Design', color: 'bg-blue-500' },
    { id: 'technology', name: 'Technology', color: 'bg-purple-500' },
    { id: 'business', name: 'Business', color: 'bg-green-500' },
    { id: 'productivity', name: 'Productivity', color: 'bg-yellow-500' },
  ];
  
  const folders = [
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
  ];
  
  const books = [
    {
      id: 1,
      title: 'Design Systems Handbook',
      author: 'Marco Suarez, Jina Anne, Katie Sylor-Miller',
      coverImage: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1000&auto=format&fit=crop',
      categories: ['design'],
      folder: 'design-books',
      publicationDate: '2022',
      pdfUrl: 'https://example.com/design-systems-handbook.pdf',
      pageCount: 127
    },
    {
      id: 2,
      title: 'Atomic Design',
      author: 'Brad Frost',
      coverImage: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=1000&auto=format&fit=crop',
      categories: ['design'],
      folder: 'design-books',
      publicationDate: '2021',
      pdfUrl: 'https://example.com/atomic-design.pdf',
      pageCount: 198
    },
    {
      id: 3,
      title: 'Clean Code',
      author: 'Robert C. Martin',
      coverImage: 'https://images.unsplash.com/photo-1629208113515-4ce8ce3de79d?q=80&w=1000&auto=format&fit=crop',
      categories: ['technology'],
      folder: 'tech-books',
      publicationDate: '2008',
      pdfUrl: 'https://example.com/clean-code.pdf',
      pageCount: 464
    },
    {
      id: 4,
      title: 'Zero to One',
      author: 'Peter Thiel',
      coverImage: 'https://images.unsplash.com/photo-1592496431122-2349e0fbc666?q=80&w=1000&auto=format&fit=crop',
      categories: ['business'],
      folder: 'business-books',
      publicationDate: '2014',
      pdfUrl: 'https://example.com/zero-to-one.pdf',
      pageCount: 224
    },
    {
      id: 5,
      title: 'The Design of Everyday Things',
      author: 'Don Norman',
      coverImage: 'https://images.unsplash.com/photo-1544967082-d9d25d867d66?q=80&w=1000&auto=format&fit=crop',
      categories: ['design'],
      folder: 'design-books',
      publicationDate: '2013',
      pdfUrl: 'https://example.com/design-of-everyday-things.pdf',
      pageCount: 368
    },
    {
      id: 6,
      title: 'JavaScript: The Good Parts',
      author: 'Douglas Crockford',
      coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop',
      categories: ['technology'],
      folder: 'tech-books',
      publicationDate: '2008',
      pdfUrl: 'https://example.com/javascript-good-parts.pdf',
      pageCount: 176
    }
  ];
  
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
  
  const openReader = (book: any) => {
    setSelectedBook(book);
    setIsReaderOpen(true);
    document.body.style.overflow = 'hidden';
  };
  
  const closeReader = () => {
    setIsReaderOpen(false);
    document.body.style.overflow = '';
  };
  
  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || book.categories.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });
  
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
    <div className="min-h-screen bg-seen-dark overflow-x-hidden">
      <Header />
      
      <main className="pt-20 md:pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 mb-12">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Seen <span className="text-gradient-blue">Book Hole</span>
            </h1>
            <p className="text-white/70 text-lg mb-8">
              Access our curated collection of design and technology resources,
              all available to read directly in your browser.
            </p>
            
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
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <AnimatePresence initial={false}>
            {isSidebarOpen && (
              <motion.aside
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 280, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full md:w-72 flex-shrink-0 overflow-hidden"
              >
                <div className="glass-card rounded-xl overflow-hidden h-full">
                  <div className="p-4 border-b border-white/10">
                    <h2 className="text-lg font-semibold flex items-center">
                      <Book size={18} className="mr-2 text-seen-accent1" />
                      Library
                    </h2>
                  </div>
                  
                  <div className="p-4 border-b border-white/10">
                    <h3 className="text-sm font-medium text-white/60 mb-3">Categories</h3>
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setSelectedCategory(null)}
                        className={`px-3 py-1 text-xs font-medium rounded-full border transition-colors ${
                          selectedCategory === null 
                            ? 'bg-white text-seen-dark border-white' 
                            : 'bg-transparent text-white/70 border-white/20 hover:border-white/40'
                        }`}
                      >
                        All
                      </button>
                      
                      {categories.map(category => (
                        <button
                          key={category.id}
                          onClick={() => setSelectedCategory(category.id)}
                          className={`px-3 py-1 text-xs font-medium rounded-full border transition-colors ${
                            selectedCategory === category.id 
                              ? `${category.color} text-white border-transparent` 
                              : 'bg-transparent text-white/70 border-white/20 hover:border-white/40'
                          }`}
                        >
                          {category.name}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="text-sm font-medium text-white/60 mb-3 flex items-center">
                      <FolderOpen size={16} className="mr-1" />
                      Folders
                    </h3>
                    
                    <div className="space-y-1">
                      {folders.map(folder => (
                        <div key={folder.id}>
                          <button
                            onClick={() => toggleFolder(folder.id)}
                            className="w-full flex items-center justify-between px-2 py-1.5 hover:bg-white/5 rounded transition-colors text-left group"
                          >
                            <div className="flex items-center">
                              {expandedFolders.includes(folder.id) ? (
                                <ChevronDown size={16} className="text-white/40 mr-1.5" />
                              ) : (
                                <ChevronRight size={16} className="text-white/40 mr-1.5" />
                              )}
                              <span className="text-sm text-white/80 group-hover:text-white transition-colors">
                                {folder.name}
                              </span>
                            </div>
                            <span className="text-xs text-white/40 px-1.5 py-0.5 bg-white/5 rounded">
                              {books.filter(book => book.folder === folder.id).length}
                            </span>
                          </button>
                          
                          {expandedFolders.includes(folder.id) && folder.children.length > 0 && (
                            <div className="ml-6 space-y-1 mt-1">
                              {folder.children.map(child => (
                                <button
                                  key={child.id}
                                  className="w-full flex items-center px-2 py-1.5 hover:bg-white/5 rounded transition-colors text-left group"
                                >
                                  <span className="text-sm text-white/70 group-hover:text-white transition-colors">
                                    {child.name}
                                  </span>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="px-4 py-3 border-t border-white/10">
                    <button className="w-full flex items-center justify-between px-3 py-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
                      <div className="flex items-center">
                        <Plus size={16} className="text-white/70 mr-2" />
                        <span className="text-sm font-medium">New Collection</span>
                      </div>
                    </button>
                  </div>
                </div>
              </motion.aside>
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
          
          {/* Content */}
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
                    onClick={toggleSidebar}
                    className="hidden md:flex items-center justify-center w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    {isSidebarOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
                  </button>
                </div>
              </div>
              
              {filteredBooks.length === 0 ? (
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
                  {filteredBooks.map(book => (
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
                          src={book.coverImage} 
                          alt={book.title}
                          className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute bottom-3 left-3 right-3 z-20">
                          <div className="flex items-center space-x-2 mb-2">
                            {book.categories.map(categoryId => {
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
                              {book.pageCount} pages
                            </span>
                            <span className="flex items-center">
                              <Clock size={12} className="mr-1" />
                              {book.publicationDate}
                            </span>
                          </div>
                        </div>
                      </div>
                      <h3 className="font-medium mb-1 group-hover:text-seen-accent1 transition-colors duration-300">
                        {book.title}
                      </h3>
                      <p className="text-sm text-white/60">{book.author}</p>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      
      {/* Book Reader Modal */}
      {isReaderOpen && selectedBook && (
        <BookReader 
          pdfUrl={selectedBook.pdfUrl} 
          title={selectedBook.title} 
          onClose={closeReader} 
        />
      )}
    </div>
  );
};

export default BookHole;
