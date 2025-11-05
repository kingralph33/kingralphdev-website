/**
 * Blog main page component
 * Displays list of blog posts with search and filtering capabilities
 */

import { useState, useEffect, useMemo, memo } from 'react';
import BlogList from '../../components/blog/BlogList';
import SearchBar from '../../components/blog/SearchBar';
import { 
  getPublishedPosts, 
  searchPosts, 
  filterByCategory, 
  sortByDate 
} from '../../data/blog/blogService';
import type { BlogPost } from '../../data/blog/types';

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Load posts on component mount
  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        const publishedPosts = await getPublishedPosts();
        const sortedPosts = sortByDate(publishedPosts);
        setPosts(sortedPosts);
      } catch (error) {
        console.error('Error loading posts:', error);
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

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

  if (posts.length === 0) {
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
