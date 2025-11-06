/**
 * BlogPost page component unit tests
 * Tests blog post loading, rendering, and error states
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import BlogPost from '../BlogPost';
import * as blogService from '../../../data/blog/blogService';
import type { BlogPost as BlogPostType } from '../../../data/blog/types';

// Mock the blog service
vi.mock('../../../data/blog/blogService', () => ({
  getPostById: vi.fn(),
}));

const mockPost: BlogPostType = {
  id: 'test-post',
  title: 'Test Blog Post Title',
  date: '2025-01-15',
  excerpt: 'Test excerpt',
  tags: ['React', 'Testing'],
  readingTime: 5,
  content: '# Hello World\n\nThis is test content.',
  categories: ['Technology'],
  published: true,
  slug: 'test-post',
  author: 'Test Author',
};

const renderBlogPost = (slug = 'test-post') => {
  return render(
    <MemoryRouter initialEntries={[`/posts/${slug}`]}>
      <Routes>
        <Route path="/posts/:slug" element={<BlogPost />} />
      </Routes>
    </MemoryRouter>
  );
};

describe('BlogPost Page Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Loading State', () => {
    it('displays loading message while fetching post', () => {
      // Use a promise that resolves after test completes to avoid memory leaks
      vi.mocked(blogService.getPostById).mockReturnValue(
        new Promise<BlogPostType>(() => {
          // Never resolves during test, properly demonstrating loading state
        })
      );

      renderBlogPost();

      expect(screen.getByText('Loading post...')).toBeInTheDocument();
    });

    it('displays back button during loading', () => {
      vi.mocked(blogService.getPostById).mockReturnValue(
        new Promise<BlogPostType>(() => {
          // Never resolves during test, properly demonstrating loading state
        })
      );

      renderBlogPost();

      expect(screen.getByText('Back to Posts')).toBeInTheDocument();
    });

    it('has loading animation', () => {
      vi.mocked(blogService.getPostById).mockReturnValue(
        new Promise<BlogPostType>(() => {
          // Never resolves during test, properly demonstrating loading state
        })
      );

      renderBlogPost();

      const loadingText = screen.getByText('Loading post...');
      expect(loadingText).toHaveClass('animate-pulse');
    });
  });

  describe('Successful Post Load', () => {
    it('renders post title after loading', async () => {
      vi.mocked(blogService.getPostById).mockResolvedValueOnce(mockPost);
      
      renderBlogPost();
      
      await waitFor(() => {
        expect(screen.getByText('Test Blog Post Title')).toBeInTheDocument();
      });
    });

    it('renders post metadata (date and reading time)', async () => {
      vi.mocked(blogService.getPostById).mockResolvedValueOnce(mockPost);
      
      renderBlogPost();
      
      await waitFor(() => {
        expect(screen.getByText('2025-01-15')).toBeInTheDocument();
        expect(screen.getByText('5 min read')).toBeInTheDocument();
      });
    });

    it('renders post tags', async () => {
      vi.mocked(blogService.getPostById).mockResolvedValueOnce(mockPost);
      
      renderBlogPost();
      
      await waitFor(() => {
        expect(screen.getByText('React')).toBeInTheDocument();
        expect(screen.getByText('Testing')).toBeInTheDocument();
      });
    });

    it('renders markdown content', async () => {
      vi.mocked(blogService.getPostById).mockResolvedValueOnce(mockPost);
      
      renderBlogPost();
      
      await waitFor(() => {
        expect(screen.getByText('Hello World')).toBeInTheDocument();
        expect(screen.getByText('This is test content.')).toBeInTheDocument();
      });
    });

    it('calls getPostById with correct slug', async () => {
      vi.mocked(blogService.getPostById).mockResolvedValueOnce(mockPost);
      
      renderBlogPost('test-slug-123');
      
      await waitFor(() => {
        expect(blogService.getPostById).toHaveBeenCalledWith('test-slug-123');
      });
    });
  });

  describe('Error State - Post Not Found', () => {
    it('displays error message when post is not found', async () => {
      vi.mocked(blogService.getPostById).mockResolvedValueOnce(null);
      
      renderBlogPost();
      
      await waitFor(() => {
        expect(screen.getByText('Post not found')).toBeInTheDocument();
      });
    });

    it('displays back button in error state', async () => {
      vi.mocked(blogService.getPostById).mockResolvedValueOnce(null);
      
      renderBlogPost();
      
      await waitFor(() => {
        expect(screen.getByText('Back to Posts')).toBeInTheDocument();
      });
    });
  });

  describe('Error State - Load Failure', () => {
    it('displays error message when fetch fails', async () => {
      vi.mocked(blogService.getPostById).mockRejectedValueOnce(new Error('Network error'));
      
      renderBlogPost();
      
      await waitFor(() => {
        expect(screen.getByText('Failed to load post')).toBeInTheDocument();
      });
    });

    it('logs error to console when fetch fails', async () => {
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const testError = new Error('Network error');
      vi.mocked(blogService.getPostById).mockRejectedValueOnce(testError);
      
      renderBlogPost();
      
      await waitFor(() => {
        expect(consoleErrorSpy).toHaveBeenCalledWith('Error loading post:', testError);
      });
      
      consoleErrorSpy.mockRestore();
    });
  });

  describe('Error State - No Slug', () => {
    it('displays error when no slug is provided', async () => {
      render(
        <MemoryRouter initialEntries={['/posts/']}>
          <Routes>
            <Route path="/posts/" element={<BlogPost />} />
          </Routes>
        </MemoryRouter>
      );
      
      await waitFor(() => {
        expect(screen.getByText('No post ID provided')).toBeInTheDocument();
      });
    });
  });

  describe('Back Button', () => {
    it('back button has proper styling', async () => {
      vi.mocked(blogService.getPostById).mockResolvedValueOnce(mockPost);
      
      renderBlogPost();
      
      await waitFor(() => {
        const backButton = screen.getByText('Back to Posts');
        expect(backButton).toHaveClass('text-green-600', 'dark:text-green-400', 'hover:underline');
      });
    });

    it('back button has decorative arrow', async () => {
      vi.mocked(blogService.getPostById).mockResolvedValueOnce(mockPost);
      
      renderBlogPost();
      
      await waitFor(() => {
        const arrow = screen.getByText('←');
        expect(arrow).toHaveAttribute('aria-hidden', 'true');
      });
    });
  });

  describe('Post Metadata', () => {
    it('renders time element with datetime attribute', async () => {
      vi.mocked(blogService.getPostById).mockResolvedValueOnce(mockPost);
      
      renderBlogPost();
      
      await waitFor(() => {
        const timeElement = screen.getByText('2025-01-15').closest('time');
        expect(timeElement).toHaveAttribute('datetime', '2025-01-15');
      });
    });

    it('displays all tags in tag container', async () => {
      const postWithManyTags = {
        ...mockPost,
        tags: ['React', 'Testing', 'TypeScript', 'Vitest'],
      };
      vi.mocked(blogService.getPostById).mockResolvedValueOnce(postWithManyTags);
      
      renderBlogPost();
      
      await waitFor(() => {
        expect(screen.getByText('React')).toBeInTheDocument();
        expect(screen.getByText('Testing')).toBeInTheDocument();
        expect(screen.getByText('TypeScript')).toBeInTheDocument();
        expect(screen.getByText('Vitest')).toBeInTheDocument();
      });
    });
  });

  describe('Markdown Rendering', () => {
    it('renders headings from markdown', async () => {
      const postWithHeading = {
        ...mockPost,
        content: '# Main Title\n## Subtitle\n### Third Level',
      };
      vi.mocked(blogService.getPostById).mockResolvedValueOnce(postWithHeading);
      
      renderBlogPost();
      
      await waitFor(() => {
        expect(screen.getByRole('heading', { name: 'Main Title', level: 1 })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: 'Subtitle', level: 2 })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: 'Third Level', level: 3 })).toBeInTheDocument();
      });
    });

    it('renders paragraphs from markdown', async () => {
      const postWithParagraphs = {
        ...mockPost,
        content: 'First paragraph.\n\nSecond paragraph.',
      };
      vi.mocked(blogService.getPostById).mockResolvedValueOnce(postWithParagraphs);
      
      renderBlogPost();
      
      await waitFor(() => {
        expect(screen.getByText('First paragraph.')).toBeInTheDocument();
        expect(screen.getByText('Second paragraph.')).toBeInTheDocument();
      });
    });

    it('renders lists from markdown', async () => {
      const postWithList = {
        ...mockPost,
        content: '- Item 1\n- Item 2\n- Item 3',
      };
      vi.mocked(blogService.getPostById).mockResolvedValueOnce(postWithList);
      
      renderBlogPost();
      
      await waitFor(() => {
        expect(screen.getByText('Item 1')).toBeInTheDocument();
        expect(screen.getByText('Item 2')).toBeInTheDocument();
        expect(screen.getByText('Item 3')).toBeInTheDocument();
      });
    });
  });

  describe('Accessibility', () => {
    it('has proper article landmark', async () => {
      vi.mocked(blogService.getPostById).mockResolvedValueOnce(mockPost);
      
      renderBlogPost();
      
      await waitFor(() => {
        const article = screen.getByRole('article');
        expect(article).toBeInTheDocument();
      });
    });

    it('back button is keyboard accessible', async () => {
      vi.mocked(blogService.getPostById).mockResolvedValueOnce(mockPost);
      
      renderBlogPost();
      
      await waitFor(() => {
        const backButton = screen.getByText('Back to Posts');
        expect(backButton).toHaveClass('focus:outline-none', 'focus:ring-2');
      });
    });
  });

  describe('Styling', () => {
    it('has proper layout classes', async () => {
      vi.mocked(blogService.getPostById).mockResolvedValueOnce(mockPost);
      
      const { container } = renderBlogPost();
      
      await waitFor(() => {
        const mainDiv = container.querySelector('.max-w-4xl');
        expect(mainDiv).toHaveClass('mx-auto', 'px-4', 'py-6', 'lg:py-10');
      });
    });

    it('has dark mode support', async () => {
      vi.mocked(blogService.getPostById).mockResolvedValueOnce(mockPost);
      
      renderBlogPost();
      
      await waitFor(() => {
        const title = screen.getByText('Test Blog Post Title');
        expect(title).toHaveClass('dark:text-white');
      });
    });
  });
});
