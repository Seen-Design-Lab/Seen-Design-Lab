
import React from 'react';
import { FolderOpen, ChevronDown, ChevronRight } from 'lucide-react';

interface FolderChildType {
  id: string;
  name: string;
}

interface FolderType {
  id: string;
  name: string;
  children: FolderChildType[];
}

interface FolderListProps {
  folders: FolderType[];
  expandedFolders: string[];
  toggleFolder: (folderId: string) => void;
  filteredBooks: any[]; // Using any for simplicity, could be more specific
}

const FolderList: React.FC<FolderListProps> = ({ 
  folders, 
  expandedFolders, 
  toggleFolder, 
  filteredBooks 
}) => {
  return (
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
                {filteredBooks?.filter(book => book.folder === folder.id).length || 0}
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
  );
};

export default FolderList;
