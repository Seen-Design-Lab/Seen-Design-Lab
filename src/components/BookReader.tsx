
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Bookmark, Home, Info, Download, Share, X, Maximize, Minimize } from 'lucide-react';

interface BookReaderProps {
  pdfUrl: string;
  title: string;
  onClose: () => void;
}

const BookReader: React.FC<BookReaderProps> = ({ pdfUrl, title, onClose }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [scale, setScale] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const readerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setCurrentPage(prev => Math.min(prev + 1, totalPages));
      } else if (e.key === 'ArrowLeft') {
        setCurrentPage(prev => Math.max(prev - 1, 1));
      } else if (e.key === 'Escape') {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [totalPages, onClose]);
  
  useEffect(() => {
    // Handle iframe load event to hide loading state
    const handleIframeLoad = () => {
      setIsLoading(false);
      console.log("PDF iframe loaded successfully");
    };
    
    const iframe = iframeRef.current;
    if (iframe) {
      iframe.addEventListener('load', handleIframeLoad);
      return () => iframe.removeEventListener('load', handleIframeLoad);
    }
  }, []);
  
  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (readerRef.current?.requestFullscreen) {
        readerRef.current.requestFullscreen();
        setIsFullscreen(true);
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };
  
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (document.fullscreenElement) {
        setIsFullscreen(true);
      } else {
        setIsFullscreen(false);
      }
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);
  
  // Mock for demonstration when PDF metadata isn't available
  useEffect(() => {
    setTotalPages(224); // Using the known page count for "Don't Shoot the Dog"
  }, []);
  
  const handleZoomIn = () => {
    setScale(prev => Math.min(prev + 0.25, 2));
  };
  
  const handleZoomOut = () => {
    setScale(prev => Math.max(prev - 0.25, 0.5));
  };
  
  const handleBookmark = () => {
    // Save bookmark to localStorage
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '{}');
    bookmarks[title] = { page: currentPage, url: pdfUrl };
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    
    // Show confirmation
    console.log('Bookmark added for', title, 'at page', currentPage);
  };

  // Determine if the PDF is a local or external URL
  const isLocalPdf = pdfUrl.startsWith('/');
  const pdfViewerUrl = isLocalPdf 
    ? pdfUrl
    : `https://docs.google.com/viewer?url=${encodeURIComponent(pdfUrl)}&embedded=true`;
  
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex flex-col bg-seen-darker"
        ref={readerRef}
      >
        {/* Reader toolbar */}
        <div className="glass-light flex items-center justify-between p-4 border-b border-white/10">
          <div className="flex items-center">
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 mr-4 transition-colors duration-200"
            >
              <X size={18} />
            </button>
            <h3 className="text-white/90 font-medium truncate max-w-xs md:max-w-md">{title}</h3>
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={handleZoomOut}
              className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 transition-colors duration-200"
              aria-label="Zoom out"
            >
              <ZoomOut size={16} />
            </button>
            <span className="text-white/70 text-sm">{Math.round(scale * 100)}%</span>
            <button
              onClick={handleZoomIn}
              className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 transition-colors duration-200"
              aria-label="Zoom in"
            >
              <ZoomIn size={16} />
            </button>
            
            <div className="h-5 w-px bg-white/10 mx-1"></div>
            
            <button
              onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
              disabled={currentPage === 1}
              className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-white/5 transition-colors duration-200"
              aria-label="Previous page"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="text-white/70 text-sm whitespace-nowrap">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-white/5 transition-colors duration-200"
              aria-label="Next page"
            >
              <ChevronRight size={16} />
            </button>
            
            <div className="h-5 w-px bg-white/10 mx-1 hidden md:block"></div>
            
            <div className="hidden md:flex items-center space-x-2">
              <button
                onClick={handleBookmark}
                className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 transition-colors duration-200"
                aria-label="Bookmark this page"
              >
                <Bookmark size={16} />
              </button>
              
              <button
                onClick={toggleFullscreen}
                className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 transition-colors duration-200"
                aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
              >
                {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
              </button>
            </div>
          </div>
        </div>
        
        {/* PDF Viewer Area */}
        <div className="flex-1 overflow-hidden bg-seen-darker flex items-center justify-center p-4">
          <div 
            className="w-full h-full relative overflow-auto"
            style={{ transform: `scale(${scale})`, transformOrigin: 'center center' }}
          >
            {/* PDF Viewer */}
            <iframe
              ref={iframeRef}
              src={pdfViewerUrl}
              className="w-full h-full border-0 bg-white"
              title={`PDF Viewer - ${title}`}
              allowFullScreen
            />
            
            {/* Loading state */}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-seen-darker">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full border-2 border-seen-accent1 border-t-transparent animate-spin mx-auto mb-4"></div>
                  <p className="text-white/70">Loading PDF...</p>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Mobile controls */}
        <div className="glass fixed bottom-6 left-1/2 transform -translate-x-1/2 rounded-full p-2 md:hidden flex items-center space-x-2">
          <button
            onClick={handleBookmark}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 transition-colors duration-200"
            aria-label="Bookmark this page"
          >
            <Bookmark size={18} />
          </button>
          
          <button
            onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 disabled:opacity-30 transition-colors duration-200"
            aria-label="Previous page"
          >
            <ChevronLeft size={18} />
          </button>
          
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 hover:bg-white/20 transition-colors duration-200"
            aria-label="Close reader"
          >
            <Home size={18} />
          </button>
          
          <button
            onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 disabled:opacity-30 transition-colors duration-200"
            aria-label="Next page"
          >
            <ChevronRight size={18} />
          </button>
          
          <button
            onClick={toggleFullscreen}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/10 transition-colors duration-200"
            aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          >
            {isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BookReader;
