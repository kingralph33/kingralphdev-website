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
      className="bg-white dark:bg-gray-800 p-5 lg:p-6 rounded-lg border-2 border-blue-900 dark:border-gray-200
                 transition-all duration-200 hover:shadow-lg cursor-pointer group"
      data-testid="blog-card"
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`Read article: ${post.title}`}
    >
      <h2 className="text-lg lg:text-xl font-bold mb-3 text-blue-900 dark:text-white
                     group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
        {post.title}
      </h2>
      <div className="flex items-center gap-2 text-xs lg:text-sm text-gray-600 dark:text-gray-400 mb-3">
        <time dateTime={post.date}>{post.date}</time>
        <span aria-hidden="true">•</span>
        <span>{post.readingTime} min read</span>
      </div>
      <p className="text-sm lg:text-base text-gray-700 dark:text-gray-100 dark:font-semibold mb-4 leading-relaxed">
        {post.excerpt}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2.5 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      <span className="text-sm font-medium text-green-600 dark:text-green-400 group-hover:underline inline-flex items-center gap-1">
        Read more <span aria-hidden="true">→</span>
      </span>
    </article>
  );
};

export default memo(BlogCard);
