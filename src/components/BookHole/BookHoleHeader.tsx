
import React from 'react';
import BookSearch from './BookSearch';

interface BookHoleHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const BookHoleHeader: React.FC<BookHoleHeaderProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 mb-12">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Seen <span className="text-gradient-blue">Book Hole</span>
        </h1>
        <p className="text-white/70 text-lg mb-8">
          Access our curated collection of design and technology resources,
          all available to read directly in your browser.
        </p>
        
        <BookSearch 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
        />
      </div>
    </div>
  );
};

export default BookHoleHeader;
