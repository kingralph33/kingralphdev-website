/**
 * BlogCard component
 * Displays a single blog post preview card
 * Clicking the card navigates to the full post page
 */

import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import type { BlogPostPreview } from '../../data/blog/types';

interface BlogCardProps {
  post: BlogPostPreview;
}

const BlogCard = ({ post }: BlogCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/blog/${post.id}`);
  };

  return (
    <article
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-all duration-200 hover:shadow-lg cursor-pointer"
      data-testid="blog-card"
      onClick={handleClick}
    >
      <h2 className="text-xl font-bold mb-2 text-blue-900 dark:text-white hover:text-green-600 dark:hover:text-green-400 transition-colors">
        {post.title}
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
        {post.date} • {post.readingTime} min read
      </p>
      <p className="text-gray-700 dark:text-gray-100 mb-4">
        {post.excerpt}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded"
          >
            {tag}
          </span>
        ))}
      </div>

      <span className="text-sm text-green-600 dark:text-green-400 hover:underline">
        Read more →
      </span>
    </article>
  );
};

export default memo(BlogCard);
