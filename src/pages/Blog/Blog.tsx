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
import { getErrorMessage } from '../../utils/errorHandling';
import type { BlogPostPreview } from '../../data/blog/types';

const Blog = () => {
  const [posts, setPosts] = useState<BlogPostPreview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

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
        <h1 className="text-3xl lg:text-4xl font-bold mb-8 lg:mb-12 text-center text-blue-900 dark:text-white">
          Blog
        </h1>
        <div className="flex items-center justify-center py-12">
          <div className="animate-pulse text-gray-600 dark:text-gray-400">
            Loading posts...
          </div>
        </div>
      </div>
    );
  }

  // Error state - display error message with retry option
  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-6 lg:py-10">
        <h1 className="text-3xl lg:text-4xl font-bold mb-8 lg:mb-12 text-center text-blue-900 dark:text-white">
          Blog
        </h1>
        <div
          className="text-center py-16"
          role="alert"
          aria-live="polite"
        >
          <p className="text-lg lg:text-xl text-red-600 dark:text-red-400 mb-6">
            {error}
          </p>
          <button
            onClick={loadPosts}
            className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium
                       hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600
                       transition-colors duration-200 shadow-md hover:shadow-lg
                       focus:outline-none focus:ring-2 focus:ring-green-600 dark:focus:ring-green-400 focus:ring-offset-2"
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
        <h1 className="text-3xl lg:text-4xl font-bold mb-8 lg:mb-12 text-center text-blue-900 dark:text-white">
          Blog
        </h1>
        <div className="text-center py-16">
          <p className="text-2xl lg:text-3xl text-gray-700 dark:text-gray-100 dark:font-semibold mb-3">
            Coming soon...
          </p>
          <p className="text-base lg:text-lg text-gray-600 dark:text-gray-400">
            Check back later for new content!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 lg:py-10">
      <h1 className="text-3xl lg:text-4xl font-bold mb-8 lg:mb-12 text-center text-blue-900 dark:text-white">
        Blog
      </h1>

      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        placeholder="Search posts by title, content, or excerpt..."
      />

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
