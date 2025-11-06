/**
 * BlogPost page component
 * Displays a single blog post with full content
 */

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { getPostById } from '../../data/blog/blogService';
import type { BlogPost } from '../../data/blog/types';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPost = async () => {
      if (!slug) {
        setError('No post ID provided');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const fullPost = await getPostById(slug);

        if (!fullPost) {
          setError('Post not found');
        } else {
          setPost(fullPost);
        }
      } catch (err) {
        console.error('Error loading post:', err);
        setError('Failed to load post');
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-6 lg:py-10">
        <button
          onClick={() => navigate('/blog')}
          className="mb-6 text-green-600 dark:text-green-400 hover:underline focus:outline-none focus:ring-2 focus:ring-green-600 dark:focus:ring-green-400 rounded px-2 py-1"
        >
          ← Back to Blog
        </button>
        <div className="flex items-center justify-center py-12">
          <div className="animate-pulse text-gray-600 dark:text-gray-400">
            Loading post...
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-6 lg:py-10">
        <button
          onClick={() => navigate('/blog')}
          className="mb-6 text-green-600 dark:text-green-400 hover:underline focus:outline-none focus:ring-2 focus:ring-green-600 dark:focus:ring-green-400 rounded px-2 py-1"
        >
          ← Back to Blog
        </button>
        <div className="text-center py-12">
          <p className="text-lg text-red-600 dark:text-red-400 mb-4">
            {error || 'Post not found'}
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            The post you're looking for doesn't exist or has been removed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 lg:py-10">
      <button
        onClick={() => navigate('/blog')}
        className="mb-6 text-green-600 dark:text-green-400 hover:underline focus:outline-none focus:ring-2 focus:ring-green-600 dark:focus:ring-green-400 rounded px-2 py-1"
      >
        ← Back to Blog
      </button>

      <article className="bg-white dark:bg-gray-800 p-6 lg:p-8 rounded-lg shadow-md">
        <header className="mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4 text-blue-900 dark:text-white">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
            <time dateTime={post.date}>{post.date}</time>
            <span>•</span>
            <span>{post.readingTime} min read</span>
          </div>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
            {post.excerpt}
          </p>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        <div className="prose dark:prose-invert max-w-none prose-headings:text-blue-900 dark:prose-headings:text-white prose-a:text-green-600 dark:prose-a:text-green-400 prose-lg">
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
            {post.content}
          </ReactMarkdown>
        </div>
      </article>
    </div>
  );
};

export default BlogPost;
