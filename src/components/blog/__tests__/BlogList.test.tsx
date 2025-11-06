/**
 * BlogList component unit tests
 * Tests blog list rendering, filtering, and empty states
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import BlogList from '../BlogList';
import type { BlogPostPreview } from '../../../data/blog/types';

const mockPosts: BlogPostPreview[] = [
  {
    id: 'post-1',
    title: 'First Post',
    date: '2025-01-15',
    excerpt: 'First post excerpt',
    tags: ['React', 'TypeScript'],
    readingTime: 5,
    categories: ['Frontend'],
    published: true,
    slug: 'first-post',
    author: 'Test Author',
  },
  {
    id: 'post-2',
    title: 'Second Post',
    date: '2025-01-14',
    excerpt: 'Second post excerpt',
    tags: ['JavaScript', 'Node.js'],
    readingTime: 7,
    categories: ['Backend'],
    published: true,
    slug: 'second-post',
    author: 'Test Author',
  },
];

const mockCategories = ['React', 'TypeScript', 'JavaScript', 'Node.js'];

const renderBlogList = (props: any = {}) => {
  const defaultProps = {
    posts: mockPosts,
    selectedCategory: undefined,
    onCategoryChange: undefined,
    categories: [],
  };

  return render(
    <BrowserRouter>
      <BlogList {...defaultProps} {...props} />
    </BrowserRouter>
  );
};

describe('BlogList Component', () => {
  describe('Rendering with Posts', () => {
    it('renders all blog posts', () => {
      renderBlogList();
      expect(screen.getByText('First Post')).toBeInTheDocument();
      expect(screen.getByText('Second Post')).toBeInTheDocument();
    });

    it('renders posts in a grid layout', () => {
      renderBlogList();
      const grid = screen.getByTestId('blog-posts-grid');
      expect(grid).toBeInTheDocument();
      expect(grid).toHaveClass('grid', 'gap-6', 'md:grid-cols-1', 'lg:grid-cols-2');
    });

    it('renders BlogCard for each post', () => {
      renderBlogList();
      const cards = screen.getAllByTestId('blog-card');
      expect(cards).toHaveLength(2);
    });
  });

  describe('Empty State', () => {
    it('displays "No posts found" message when posts array is empty', () => {
      renderBlogList({ posts: [] });
      expect(screen.getByText('No posts found.')).toBeInTheDocument();
    });

    it('displays additional help text when category is selected', () => {
      renderBlogList({ posts: [], selectedCategory: 'React' });
      expect(screen.getByText(/Try selecting a different category/)).toBeInTheDocument();
    });

    it('does not display help text when no category is selected', () => {
      renderBlogList({ posts: [] });
      expect(screen.queryByText(/Try selecting a different category/)).not.toBeInTheDocument();
    });

    it('has proper testid for empty state', () => {
      renderBlogList({ posts: [] });
      expect(screen.getByTestId('no-posts-message')).toBeInTheDocument();
    });
  });

  describe('Category Filters', () => {
    it('does not render filters when categories array is empty', () => {
      renderBlogList({ categories: [] });
      expect(screen.queryByTestId('category-filters')).not.toBeInTheDocument();
    });

    it('does not render filters when onCategoryChange is not provided', () => {
      renderBlogList({ categories: mockCategories });
      expect(screen.queryByTestId('category-filters')).not.toBeInTheDocument();
    });

    it('renders filters when both categories and onCategoryChange are provided', () => {
      const onCategoryChange = vi.fn();
      renderBlogList({ categories: mockCategories, onCategoryChange });
      expect(screen.getByTestId('category-filters')).toBeInTheDocument();
    });

    it('renders "All Posts" button', () => {
      const onCategoryChange = vi.fn();
      renderBlogList({ categories: mockCategories, onCategoryChange });
      expect(screen.getByTestId('category-filter-all')).toBeInTheDocument();
    });

    it('renders button for each category', () => {
      const onCategoryChange = vi.fn();
      renderBlogList({ categories: mockCategories, onCategoryChange });
      
      expect(screen.getByTestId('category-filter-react')).toBeInTheDocument();
      expect(screen.getByTestId('category-filter-typescript')).toBeInTheDocument();
      expect(screen.getByTestId('category-filter-javascript')).toBeInTheDocument();
      expect(screen.getByTestId('category-filter-node.js')).toBeInTheDocument();
    });

    it('calls onCategoryChange with empty string when "All Posts" is clicked', () => {
      const onCategoryChange = vi.fn();
      renderBlogList({ categories: mockCategories, onCategoryChange });
      
      const allButton = screen.getByTestId('category-filter-all');
      fireEvent.click(allButton);
      
      expect(onCategoryChange).toHaveBeenCalledWith('');
    });

    it('calls onCategoryChange with category name when category button is clicked', () => {
      const onCategoryChange = vi.fn();
      renderBlogList({ categories: mockCategories, onCategoryChange });
      
      const reactButton = screen.getByTestId('category-filter-react');
      fireEvent.click(reactButton);
      
      expect(onCategoryChange).toHaveBeenCalledWith('React');
    });

    it('highlights "All Posts" button when no category is selected', () => {
      const onCategoryChange = vi.fn();
      renderBlogList({ categories: mockCategories, onCategoryChange, selectedCategory: undefined });
      
      const allButton = screen.getByTestId('category-filter-all');
      expect(allButton).toHaveClass('bg-green-600', 'text-white');
      expect(allButton).toHaveAttribute('aria-pressed', 'true');
    });

    it('highlights selected category button', () => {
      const onCategoryChange = vi.fn();
      renderBlogList({ categories: mockCategories, onCategoryChange, selectedCategory: 'React' });
      
      const reactButton = screen.getByTestId('category-filter-react');
      expect(reactButton).toHaveClass('bg-green-600', 'text-white');
      expect(reactButton).toHaveAttribute('aria-pressed', 'true');
    });

    it('does not highlight unselected category buttons', () => {
      const onCategoryChange = vi.fn();
      renderBlogList({ categories: mockCategories, onCategoryChange, selectedCategory: 'React' });
      
      const tsButton = screen.getByTestId('category-filter-typescript');
      expect(tsButton).not.toHaveClass('bg-green-600');
      expect(tsButton).toHaveAttribute('aria-pressed', 'false');
    });
  });

  describe('Accessibility', () => {
    it('has proper role and aria-label for category filters', () => {
      const onCategoryChange = vi.fn();
      renderBlogList({ categories: mockCategories, onCategoryChange });
      
      const filterGroup = screen.getByRole('group', { name: 'Filter posts by category' });
      expect(filterGroup).toBeInTheDocument();
    });

    it('category buttons have aria-pressed attribute', () => {
      const onCategoryChange = vi.fn();
      renderBlogList({ categories: mockCategories, onCategoryChange });
      
      const allButton = screen.getByTestId('category-filter-all');
      expect(allButton).toHaveAttribute('aria-pressed');
    });

    it('category buttons have focus styles', () => {
      const onCategoryChange = vi.fn();
      renderBlogList({ categories: mockCategories, onCategoryChange });
      
      const allButton = screen.getByTestId('category-filter-all');
      expect(allButton).toHaveClass('focus:outline-none', 'focus:ring-2', 'focus:ring-green-600');
    });
  });

  describe('Edge Cases', () => {
    it('handles single post', () => {
      renderBlogList({ posts: [mockPosts[0]] });
      expect(screen.getAllByTestId('blog-card')).toHaveLength(1);
    });

    it('handles many posts', () => {
      const manyPosts = Array.from({ length: 20 }, (_, i) => ({
        id: `post-${i}`,
        title: `Post ${i}`,
        date: '2025-01-15',
        excerpt: `Excerpt ${i}`,
        tags: ['Tag'],
        readingTime: 5,
      }));
      
      renderBlogList({ posts: manyPosts });
      expect(screen.getAllByTestId('blog-card')).toHaveLength(20);
    });

    it('handles category name with spaces', () => {
      const onCategoryChange = vi.fn();
      const categoriesWithSpaces = ['Platform Engineering', 'Cloud Native'];
      
      renderBlogList({ categories: categoriesWithSpaces, onCategoryChange });
      
      expect(screen.getByTestId('category-filter-platform-engineering')).toBeInTheDocument();
      expect(screen.getByTestId('category-filter-cloud-native')).toBeInTheDocument();
    });
  });
});
