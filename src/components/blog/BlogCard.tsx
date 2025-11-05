/**
 * BlogCard component
 * Displays a single blog post preview card with expandable content
 * Supports lazy-loading of post content
 */

import { useState, memo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import type { BlogPostPreview } from '../../data/blog/types';

interface BlogCardProps {
  post: BlogPostPreview;
  content?: string;
  isLoadingContent?: boolean;
  onExpand?: (postId: string) => Promise<void>;
  initialExpanded?: boolean;
}

const BlogCard = ({ 
  post, 
  content,
  isLoadingContent = false,
  onExpand,
  initialExpanded = false 
}: BlogCardProps) => {
  const [isExpanded, setIsExpanded] = useState(initialExpanded);

  const toggleExpand = async () => {
    const newExpandedState = !isExpanded;
    setIsExpanded(newExpandedState);
    
    // Load content when expanding if not already loaded
    if (newExpandedState && !content && onExpand) {
      await onExpand(post.id);
    }
  };

  return (
    <article
      className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-all duration-200 hover:shadow-lg"
      data-testid="blog-card"
    >
      <button
        onClick={toggleExpand}
        className="text-left w-full focus:outline-none focus:ring-2 focus:ring-green-600 dark:focus:ring-green-400 rounded"
        aria-expanded={isExpanded}
        aria-label={isExpanded ? `Collapse ${post.title}` : `Expand ${post.title}`}
        data-testid="blog-card-toggle"
      >
        <h2 className="text-xl font-bold mb-2 text-blue-900 dark:text-white hover:text-green-600 dark:hover:text-green-400 transition-colors">
          {post.title}
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
          {post.date} • {post.readingTime} min read
        </p>
        {!isExpanded && (
          <p className="text-gray-700 dark:text-gray-100 mb-4">
            {post.excerpt}
          </p>
        )}
      </button>

      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700" data-testid="blog-card-content">
          {isLoadingContent ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-pulse text-gray-600 dark:text-gray-400">
                Loading content...
              </div>
            </div>
          ) : content ? (
            <div className="prose dark:prose-invert max-w-none prose-headings:text-blue-900 dark:prose-headings:text-white prose-a:text-green-600 dark:prose-a:text-green-400">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeSanitize]}
                components={{
                  code(props) {
                    const { children, className, ...rest } = props;
                    const match = /language-(\w+)/.exec(className || '');
                    return match ? (
                      <SyntaxHighlighter
                        style={oneDark}
                        language={match[1]}
                        PreTag="div"
                      >
                        {String(children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                    ) : (
                      <code {...rest} className={className}>
                        {children}
                      </code>
                    );
                  },
                }}
              >
                {content}
              </ReactMarkdown>
            </div>
          ) : (
            <div className="text-gray-600 dark:text-gray-400 py-4">
              Failed to load content. Please try again.
            </div>
          )}
        </div>
      )}

      <div className="flex flex-wrap gap-2 mt-4">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded"
          >
            {tag}
          </span>
        ))}
      </div>

      <button
        onClick={toggleExpand}
        className="mt-4 text-sm text-green-600 dark:text-green-400 hover:underline focus:outline-none focus:ring-2 focus:ring-green-600 dark:focus:ring-green-400 rounded px-2 py-1"
        aria-label={isExpanded ? `Collapse ${post.title}` : `Expand ${post.title}`}
      >
        {isExpanded ? 'Collapse' : 'Read more'}
      </button>
    </article>
  );
};

export default memo(BlogCard);
