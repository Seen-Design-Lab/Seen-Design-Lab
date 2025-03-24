
import React from 'react';

interface CategoryType {
  id: string;
  name: string;
  color: string;
}

interface CategorySelectorProps {
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  categories: CategoryType[];
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ 
  selectedCategory, 
  setSelectedCategory, 
  categories 
}) => {
  return (
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
  );
};

export default CategorySelector;
