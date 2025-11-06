/**
 * BlogList component
 * Displays a filtered list of blog posts with category filters
 */

import { memo } from 'react';
import type { BlogPostPreview } from '../../data/blog/types';
import BlogCard from './BlogCard';

interface BlogListProps {
  posts: BlogPostPreview[];
  selectedCategory?: string;
  onCategoryChange?: (category: string) => void;
  categories?: string[];
}

const BlogList = ({
  posts,
  selectedCategory,
  onCategoryChange,
  categories = []
}: BlogListProps) => {
  if (posts.length === 0) {
    return (
      <div className="text-center py-16" data-testid="no-posts-message">
        <p className="text-lg lg:text-xl text-gray-700 dark:text-gray-100 dark:font-semibold mb-2">
          No posts found.
        </p>
        {selectedCategory && (
          <p className="text-sm lg:text-base text-gray-600 dark:text-gray-400">
            Try selecting a different category or clearing your search.
          </p>
        )}
      </div>
    );
  }

  return (
    <div>
      {categories.length > 0 && onCategoryChange && (
        <div className="mb-8 flex flex-wrap gap-2 lg:gap-3" role="group" aria-label="Filter posts by category" data-testid="category-filters">
          <button
            onClick={() => onCategoryChange('')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
              ${!selectedCategory
                ? 'bg-green-600 text-white dark:bg-green-500 shadow-md'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
              } focus:outline-none focus:ring-2 focus:ring-green-600 dark:focus:ring-green-400 focus:ring-offset-2`}
            aria-pressed={!selectedCategory}
            data-testid="category-filter-all"
          >
            All Posts
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                ${selectedCategory === category
                  ? 'bg-green-600 text-white dark:bg-green-500 shadow-md'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                } focus:outline-none focus:ring-2 focus:ring-green-600 dark:focus:ring-green-400 focus:ring-offset-2`}
              aria-pressed={selectedCategory === category}
              data-testid={`category-filter-${category.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2" data-testid="blog-posts-grid">
        {posts.map((post) => (
          <BlogCard
            key={post.id}
            post={post}
          />
        ))}
      </div>
    </div>
  );
};

export default memo(BlogList);
