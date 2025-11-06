/**
 * BlogCard component unit tests
 * Tests blog post preview card rendering and interactions
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import BlogCard from '../BlogCard';
import type { BlogPostPreview } from '../../../data/blog/types';

const mockPost: BlogPostPreview = {
  id: 'test-post',
  title: 'Test Blog Post',
  date: '2025-01-15',
  excerpt: 'This is a test excerpt for the blog post.',
  tags: ['React', 'TypeScript', 'Testing'],
  readingTime: 5,
};

const renderBlogCard = (post: BlogPostPreview = mockPost) => {
  return render(
    <BrowserRouter>
      <BlogCard post={post} />
    </BrowserRouter>
  );
};

describe('BlogCard Component', () => {
  describe('Rendering', () => {
    it('renders the blog post title', () => {
      renderBlogCard();
      expect(screen.getByText('Test Blog Post')).toBeInTheDocument();
    });

    it('renders the blog post date', () => {
      renderBlogCard();
      expect(screen.getByText('2025-01-15')).toBeInTheDocument();
    });

    it('renders the blog post excerpt', () => {
      renderBlogCard();
      expect(screen.getByText('This is a test excerpt for the blog post.')).toBeInTheDocument();
    });

    it('renders all tags', () => {
      renderBlogCard();
      expect(screen.getByText('React')).toBeInTheDocument();
      expect(screen.getByText('TypeScript')).toBeInTheDocument();
      expect(screen.getByText('Testing')).toBeInTheDocument();
    });

    it('renders reading time', () => {
      renderBlogCard();
      expect(screen.getByText('5 min read')).toBeInTheDocument();
    });

    it('renders "Read more" link', () => {
      renderBlogCard();
      expect(screen.getByText('Read more')).toBeInTheDocument();
    });

    it('renders as an article element', () => {
      renderBlogCard();
      const article = screen.getByRole('button', { name: /Read article/ });
      expect(article).toBeInTheDocument();
    });
  });

  describe('Navigation', () => {
    it('navigates to blog post when clicked', () => {
      const { container } = renderBlogCard();
      const card = screen.getByTestId('blog-card');
      
      fireEvent.click(card);
      
      // Check that we're on the correct URL path (router will handle this)
      expect(window.location.pathname).toBe('/blog/test-post');
    });

    it('navigates when Enter key is pressed', () => {
      renderBlogCard();
      const card = screen.getByTestId('blog-card');
      
      fireEvent.keyDown(card, { key: 'Enter', code: 'Enter' });
      
      expect(window.location.pathname).toBe('/blog/test-post');
    });

    it('navigates when Space key is pressed', () => {
      renderBlogCard();
      const card = screen.getByTestId('blog-card');
      
      fireEvent.keyDown(card, { key: ' ', code: 'Space' });
      
      expect(window.location.pathname).toBe('/blog/test-post');
    });

    it('does not navigate on other key presses', () => {
      renderBlogCard();
      const card = screen.getByTestId('blog-card');
      const initialPath = window.location.pathname;
      
      fireEvent.keyDown(card, { key: 'a', code: 'KeyA' });
      
      expect(window.location.pathname).toBe(initialPath);
    });
  });

  describe('Accessibility', () => {
    it('has role="button"', () => {
      renderBlogCard();
      const card = screen.getByTestId('blog-card');
      expect(card).toHaveAttribute('role', 'button');
    });

    it('is keyboard accessible with tabIndex', () => {
      renderBlogCard();
      const card = screen.getByTestId('blog-card');
      expect(card).toHaveAttribute('tabIndex', '0');
    });

    it('has descriptive aria-label', () => {
      renderBlogCard();
      const card = screen.getByLabelText('Read article: Test Blog Post');
      expect(card).toBeInTheDocument();
    });

    it('has proper time element with datetime attribute', () => {
      renderBlogCard();
      const timeElement = screen.getByText('2025-01-15').closest('time');
      expect(timeElement).toHaveAttribute('datetime', '2025-01-15');
    });

    it('has aria-hidden on decorative arrow', () => {
      renderBlogCard();
      const arrow = screen.getByText('→');
      expect(arrow).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('Styling', () => {
    it('has proper CSS classes for card styling', () => {
      renderBlogCard();
      const card = screen.getByTestId('blog-card');
      expect(card).toHaveClass('bg-white', 'dark:bg-gray-800', 'rounded-lg', 'border-2');
    });

    it('has hover effects via group classes', () => {
      renderBlogCard();
      const card = screen.getByTestId('blog-card');
      expect(card).toHaveClass('hover:shadow-lg', 'cursor-pointer', 'group');
    });
  });

  describe('Edge Cases', () => {
    it('handles post with no tags', () => {
      const postWithNoTags = { ...mockPost, tags: [] };
      renderBlogCard(postWithNoTags);
      expect(screen.getByText('Test Blog Post')).toBeInTheDocument();
    });

    it('handles post with single tag', () => {
      const postWithSingleTag = { ...mockPost, tags: ['Solo'] };
      renderBlogCard(postWithSingleTag);
      expect(screen.getByText('Solo')).toBeInTheDocument();
    });

    it('handles long title', () => {
      const postWithLongTitle = {
        ...mockPost,
        title: 'This is a very long blog post title that should still render correctly without breaking the layout',
      };
      renderBlogCard(postWithLongTitle);
      expect(screen.getByText(/very long blog post title/)).toBeInTheDocument();
    });

    it('handles long excerpt', () => {
      const postWithLongExcerpt = {
        ...mockPost,
        excerpt: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '.repeat(10),
      };
      renderBlogCard(postWithLongExcerpt);
      expect(screen.getByText(/Lorem ipsum/)).toBeInTheDocument();
    });
  });
});
