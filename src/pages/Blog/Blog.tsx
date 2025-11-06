/**
 * Blog main page component
 * Displays list of blog posts with search and filtering capabilities
 */

import { useState, useEffect, useMemo, memo } from 'react';
import BlogList from '../../components/blog/BlogList';
import SearchBar from '../../components/blog/SearchBar';
import {
  getPublishedPostPreviews,
  searchPosts,
  filterByCategory,
  sortByDate
} from '../../data/blog/blogService';
import type { BlogPostPreview } from '../../data/blog/types';

const Blog = () => {
  const [posts, setPosts] = useState<BlogPostPreview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Helper function to get user-friendly error messages
  const getErrorMessage = (err: unknown): string => {
    // Check for network connectivity
    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      return 'No internet connection. Please check your network and try again.';
    }
    
    // Return specific error message if available
    if (err instanceof Error) {
      return err.message;
    }
    
    // Fallback for unknown errors
    return 'An unexpected error occurred while loading posts.';
  };

  // Load post previews on component mount
  const loadPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const publishedPreviews = await getPublishedPostPreviews();
      const sortedPosts = sortByDate(publishedPreviews);
      setPosts(sortedPosts);
    } catch (err) {
      console.error('Error loading posts:', err);
      const errorMessage = getErrorMessage(err);
      setError(errorMessage);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  // Get unique categories from all posts
  const categories = useMemo(() => {
    const allCategories = posts.flatMap(post => post.categories);
    return Array.from(new Set(allCategories)).sort();
  }, [posts]);

  // Filter and search posts
  const filteredPosts = useMemo(() => {
    let result = posts;

    // Apply category filter
    if (selectedCategory) {
      result = filterByCategory(result, selectedCategory);
    }

    // Apply search filter
    if (searchQuery) {
      result = searchPosts(result, searchQuery);
    }

    return result;
  }, [posts, selectedCategory, searchQuery]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-6 lg:py-10">
        <h1 className="text-2xl lg:text-3xl font-bold mb-6 text-center text-blue-900 dark:text-white">
          Blog
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-400">
          Loading posts...
        </p>
      </div>
    );
  }

  // Error state - display error message with retry option
  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-6 lg:py-10">
        <h1 className="text-2xl lg:text-3xl font-bold mb-6 text-center text-blue-900 dark:text-white">
          Blog
        </h1>
        <div 
          className="text-center py-12"
          role="alert"
          aria-live="polite"
        >
          <p className="text-lg text-red-600 dark:text-red-400 mb-4">
            {error}
          </p>
          <button
            onClick={loadPosts}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-600 dark:focus:ring-green-400 focus:ring-offset-2"
            aria-label="Try loading posts again"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Empty state - no posts found (successful load, but no content)
  if (!loading && !error && posts.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-6 lg:py-10">
        <h1 className="text-2xl lg:text-3xl font-bold mb-6 text-center text-blue-900 dark:text-white">
          Blog
        </h1>
        <div className="text-center py-12">
          <p className="text-lg lg:text-xl text-gray-700 dark:text-gray-100 dark:font-semibold mb-2">
            Coming soon...
          </p>
          <p className="text-sm lg:text-base text-gray-600 dark:text-gray-400">
            Check back later for new content!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 lg:py-10">
      <h1 className="text-2xl lg:text-3xl font-bold mb-6 text-center text-blue-900 dark:text-white">
        Blog
      </h1>
      
      <div className="mb-8">
        <SearchBar 
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search posts by title, content, or excerpt..."
        />
      </div>

      <BlogList
        posts={filteredPosts}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        categories={categories}
      />
    </div>
  );
};

export default memo(Blog);
