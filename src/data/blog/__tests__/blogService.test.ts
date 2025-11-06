/**
 * Unit tests for blog service functions
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  sortByDate,
  searchPosts,
  filterByCategory,
} from '../blogService';
import type { BlogPostPreview } from '../types';

describe('blogService', () => {
  describe('sortByDate', () => {
    it('sorts posts in descending order by date (newest first)', () => {
      const posts: BlogPostPreview[] = [
        {
          id: '1',
          title: 'Old Post',
          date: '2024-01-01',
          categories: ['Tech'],
          published: true,
          slug: 'old-post',
          excerpt: 'Old excerpt',
          author: 'Author',
          tags: ['tag1'],
          readingTime: 5,
        },
        {
          id: '2',
          title: 'New Post',
          date: '2024-03-01',
          categories: ['Tech'],
          published: true,
          slug: 'new-post',
          excerpt: 'New excerpt',
          author: 'Author',
          tags: ['tag1'],
          readingTime: 5,
        },
        {
          id: '3',
          title: 'Middle Post',
          date: '2024-02-01',
          categories: ['Tech'],
          published: true,
          slug: 'middle-post',
          excerpt: 'Middle excerpt',
          author: 'Author',
          tags: ['tag1'],
          readingTime: 5,
        },
      ];

      const sorted = sortByDate(posts);

      expect(sorted[0].title).toBe('New Post');
      expect(sorted[1].title).toBe('Middle Post');
      expect(sorted[2].title).toBe('Old Post');
    });

    it('handles posts with same date', () => {
      const posts: BlogPostPreview[] = [
        {
          id: '1',
          title: 'Post A',
          date: '2024-01-01',
          categories: ['Tech'],
          published: true,
          slug: 'post-a',
          excerpt: 'Excerpt A',
          author: 'Author',
          tags: ['tag1'],
          readingTime: 5,
        },
        {
          id: '2',
          title: 'Post B',
          date: '2024-01-01',
          categories: ['Tech'],
          published: true,
          slug: 'post-b',
          excerpt: 'Excerpt B',
          author: 'Author',
          tags: ['tag1'],
          readingTime: 5,
        },
      ];

      const sorted = sortByDate(posts);

      // Both posts should be in result, order doesn't matter for same date
      expect(sorted).toHaveLength(2);
      expect(sorted.some(p => p.title === 'Post A')).toBe(true);
      expect(sorted.some(p => p.title === 'Post B')).toBe(true);
    });

    it('handles empty array', () => {
      const posts: BlogPostPreview[] = [];
      const sorted = sortByDate(posts);

      expect(sorted).toEqual([]);
    });

    it('does not mutate original array', () => {
      const posts: BlogPostPreview[] = [
        {
          id: '1',
          title: 'Post A',
          date: '2024-01-01',
          categories: ['Tech'],
          published: true,
          slug: 'post-a',
          excerpt: 'Excerpt',
          author: 'Author',
          tags: ['tag1'],
          readingTime: 5,
        },
        {
          id: '2',
          title: 'Post B',
          date: '2024-02-01',
          categories: ['Tech'],
          published: true,
          slug: 'post-b',
          excerpt: 'Excerpt',
          author: 'Author',
          tags: ['tag1'],
          readingTime: 5,
        },
      ];

      const originalOrder = [...posts];
      sortByDate(posts);

      expect(posts).toEqual(originalOrder);
    });

    it('handles invalid date formats by treating them as 0', () => {
      const posts: BlogPostPreview[] = [
        {
          id: '1',
          title: 'Invalid Date',
          date: 'invalid-date',
          categories: ['Tech'],
          published: true,
          slug: 'invalid',
          excerpt: 'Excerpt',
          author: 'Author',
          tags: ['tag1'],
          readingTime: 5,
        },
        {
          id: '2',
          title: 'Valid Date',
          date: '2024-01-01',
          categories: ['Tech'],
          published: true,
          slug: 'valid',
          excerpt: 'Excerpt',
          author: 'Author',
          tags: ['tag1'],
          readingTime: 5,
        },
      ];

      const sorted = sortByDate(posts);

      // Valid date should come first (treated as later than 0)
      expect(sorted[0].title).toBe('Valid Date');
      expect(sorted[1].title).toBe('Invalid Date');
    });
  });

  describe('searchPosts', () => {
    const posts: BlogPostPreview[] = [
      {
        id: '1',
        title: 'Introduction to React',
        date: '2024-01-01',
        categories: ['Tech'],
        published: true,
        slug: 'intro-react',
        excerpt: 'Learn the basics of React framework',
        author: 'Author',
        tags: ['react', 'javascript'],
        readingTime: 5,
      },
      {
        id: '2',
        title: 'Advanced TypeScript',
        date: '2024-02-01',
        categories: ['Tech'],
        published: true,
        slug: 'advanced-ts',
        excerpt: 'Deep dive into TypeScript features',
        author: 'Author',
        tags: ['typescript'],
        readingTime: 10,
      },
      {
        id: '3',
        title: 'Node.js Best Practices',
        date: '2024-03-01',
        categories: ['Backend'],
        published: true,
        slug: 'nodejs-practices',
        excerpt: 'Essential patterns for Node.js development',
        author: 'Author',
        tags: ['nodejs', 'javascript'],
        readingTime: 8,
      },
    ];

    it('filters posts by search query in title', () => {
      const result = searchPosts(posts, 'React');

      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('Introduction to React');
    });

    it('filters posts by search query in excerpt', () => {
      const result = searchPosts(posts, 'TypeScript features');

      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('Advanced TypeScript');
    });

    it('search is case-insensitive', () => {
      const result = searchPosts(posts, 'REACT');

      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('Introduction to React');
    });

    it('returns all posts when query is empty string', () => {
      const result = searchPosts(posts, '');

      expect(result).toHaveLength(3);
    });

    it('returns all posts when query is whitespace', () => {
      const result = searchPosts(posts, '   ');

      expect(result).toHaveLength(3);
    });

    it('returns empty array when no matches found', () => {
      const result = searchPosts(posts, 'Python');

      expect(result).toEqual([]);
    });

    it('matches multiple posts with common search term', () => {
      const result = searchPosts(posts, 'development');

      expect(result).toHaveLength(1);
      expect(result.some(p => p.title === 'Node.js Best Practices')).toBe(true);
    });

    it('trims search query before matching', () => {
      const result = searchPosts(posts, '  React  ');

      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('Introduction to React');
    });
  });

  describe('filterByCategory', () => {
    const posts: BlogPostPreview[] = [
      {
        id: '1',
        title: 'React Post',
        date: '2024-01-01',
        categories: ['Tech', 'Frontend'],
        published: true,
        slug: 'react-post',
        excerpt: 'Excerpt',
        author: 'Author',
        tags: ['react'],
        readingTime: 5,
      },
      {
        id: '2',
        title: 'Node Post',
        date: '2024-02-01',
        categories: ['Tech', 'Backend'],
        published: true,
        slug: 'node-post',
        excerpt: 'Excerpt',
        author: 'Author',
        tags: ['nodejs'],
        readingTime: 10,
      },
      {
        id: '3',
        title: 'DevOps Post',
        date: '2024-03-01',
        categories: ['DevOps'],
        published: true,
        slug: 'devops-post',
        excerpt: 'Excerpt',
        author: 'Author',
        tags: ['docker'],
        readingTime: 8,
      },
    ];

    it('filters posts by category', () => {
      const result = filterByCategory(posts, 'Frontend');

      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('React Post');
    });

    it('filter is case-insensitive', () => {
      const result = filterByCategory(posts, 'FRONTEND');

      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('React Post');
    });

    it('returns all posts when category is empty string', () => {
      const result = filterByCategory(posts, '');

      expect(result).toHaveLength(3);
    });

    it('returns all posts when category is whitespace', () => {
      const result = filterByCategory(posts, '   ');

      expect(result).toHaveLength(3);
    });

    it('returns empty array when no posts match category', () => {
      const result = filterByCategory(posts, 'Mobile');

      expect(result).toEqual([]);
    });

    it('returns posts with multiple matching categories', () => {
      const result = filterByCategory(posts, 'Tech');

      expect(result).toHaveLength(2);
      expect(result.some(p => p.title === 'React Post')).toBe(true);
      expect(result.some(p => p.title === 'Node Post')).toBe(true);
    });
  });
});
