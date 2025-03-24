
import React from 'react';
import { motion } from 'framer-motion';
import { Book } from 'lucide-react';
import CategorySelector from './CategorySelector';
import FolderList from './FolderList';
import DriveIntegration from '../DriveIntegration';

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

interface SidebarProps {
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  categories: CategoryType[];
  folders: FolderType[];
  expandedFolders: string[];
  toggleFolder: (folderId: string) => void;
  filteredBooks: any[];
  user: any;
  refetchBooks: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  selectedCategory,
  setSelectedCategory,
  categories,
  folders,
  expandedFolders,
  toggleFolder,
  filteredBooks,
  user,
  refetchBooks
}) => {
  return (
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
        
        <CategorySelector 
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={categories}
        />
        
        <FolderList 
          folders={folders}
          expandedFolders={expandedFolders}
          toggleFolder={toggleFolder}
          filteredBooks={filteredBooks}
        />
        
        {user && (
          <div className="px-4 py-3 border-t border-white/10">
            <DriveIntegration refetchBooks={refetchBooks} />
          </div>
        )}
      </div>
    </motion.aside>
  );
};

export default Sidebar;
