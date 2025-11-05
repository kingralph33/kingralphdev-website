/**
 * BlogCard component
 * Displays a single blog post preview card
 */

import type { BlogPostMetadata } from '../../data/blog/types';

interface BlogCardProps {
  post: BlogPostMetadata;
}

const BlogCard = ({ post }: BlogCardProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-2 text-blue-900 dark:text-white">
        {post.title}
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
        {post.date} • {post.readingTime} min read
      </p>
      <p className="text-gray-700 dark:text-gray-100 mb-4">
        {post.excerpt}
      </p>
      <div className="flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default BlogCard;
