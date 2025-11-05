/**
 * BlogList component
 * Displays a filtered list of blog posts
 */

import type { BlogPostMetadata } from '../../data/blog/types';
import BlogCard from './BlogCard';

interface BlogListProps {
  posts: BlogPostMetadata[];
}

const BlogList = ({ posts }: BlogListProps) => {
  if (posts.length === 0) {
    return (
      <p className="text-center text-gray-600 dark:text-gray-400">
        No posts found.
      </p>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {posts.map((post) => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default BlogList;
