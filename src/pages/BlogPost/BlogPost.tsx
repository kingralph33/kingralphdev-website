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
          onClick={() => navigate('/posts')}
          className="mb-8 text-green-600 dark:text-green-400 hover:underline font-medium
                     focus:outline-none focus:ring-2 focus:ring-green-600 dark:focus:ring-green-400 rounded px-2 py-1
                     inline-flex items-center gap-1 transition-colors"
        >
          <span aria-hidden="true">←</span> Back to Posts
        </button>
        <div className="flex items-center justify-center py-16">
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
          onClick={() => navigate('/posts')}
          className="mb-8 text-green-600 dark:text-green-400 hover:underline font-medium
                     focus:outline-none focus:ring-2 focus:ring-green-600 dark:focus:ring-green-400 rounded px-2 py-1
                     inline-flex items-center gap-1 transition-colors"
        >
          <span aria-hidden="true">←</span> Back to Posts
        </button>
        <div className="text-center py-16">
          <p className="text-lg lg:text-xl text-red-600 dark:text-red-400 mb-4">
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
        onClick={() => navigate('/posts')}
        className="mb-8 text-green-600 dark:text-green-400 hover:underline font-medium
                   focus:outline-none focus:ring-2 focus:ring-green-600 dark:focus:ring-green-400 rounded px-2 py-1
                   inline-flex items-center gap-1 transition-colors"
      >
        <span aria-hidden="true">←</span> Back to Posts
      </button>

      <article className="bg-white dark:bg-gray-800 p-6 lg:p-10 rounded-lg border-2 border-blue-900 dark:border-gray-200">
        <header className="mb-8 pb-8 border-b-2 border-gray-200 dark:border-gray-700">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4 text-blue-900 dark:text-white leading-tight text-left">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-sm lg:text-base text-gray-600 dark:text-gray-400 mb-5">
            <time dateTime={post.date}>{post.date}</time>
            <span aria-hidden="true">•</span>
            <span>{post.readingTime} min read</span>
          </div>
          <p className="text-base lg:text-lg text-gray-700 dark:text-gray-100 dark:font-semibold mb-5 leading-relaxed text-left">
            {post.excerpt}
          </p>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs lg:text-sm px-2.5 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        <div className="prose dark:prose-invert max-w-none text-left
                       prose-headings:text-blue-900 dark:prose-headings:text-white prose-headings:font-bold prose-headings:text-left
                       prose-h1:text-2xl lg:prose-h1:text-3xl prose-h1:mb-4
                       prose-h2:text-xl lg:prose-h2:text-2xl prose-h2:mb-3 prose-h2:mt-8
                       prose-h3:text-lg lg:prose-h3:text-xl prose-h3:mb-2 prose-h3:mt-6
                       prose-p:text-gray-700 dark:prose-p:text-gray-100 dark:prose-p:font-semibold prose-p:leading-relaxed prose-p:mb-4 prose-p:text-left
                       prose-a:text-green-600 dark:prose-a:text-green-400 prose-a:no-underline hover:prose-a:underline prose-a:font-medium
                       prose-strong:text-blue-900 dark:prose-strong:text-white prose-strong:font-bold
                       prose-ul:my-4 prose-ul:text-left prose-ol:my-4 prose-ol:text-left prose-li:text-gray-700 dark:prose-li:text-gray-100 dark:prose-li:font-semibold prose-li:mb-2
                       prose-blockquote:border-l-4 prose-blockquote:border-green-600 dark:prose-blockquote:border-green-400
                       prose-blockquote:bg-gray-100 dark:prose-blockquote:bg-gray-700 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:my-4 prose-blockquote:text-left
                       prose-code:text-green-600 dark:prose-code:text-green-400 prose-code:bg-gray-100 dark:prose-code:bg-gray-700
                       prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono
                       prose-pre:bg-transparent prose-pre:p-0
                       prose-img:rounded-lg prose-img:shadow-md">
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
                    customStyle={{
                      borderRadius: '0.5rem',
                      padding: '1.25rem',
                      marginTop: '1rem',
                      marginBottom: '1rem',
                    }}
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
