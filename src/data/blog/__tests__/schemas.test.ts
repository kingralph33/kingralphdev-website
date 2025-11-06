/**
 * Unit tests for blog post schema validation
 * Tests the Zod schemas that validate frontmatter
 */

import { describe, it, expect } from 'vitest';
import { BlogPostMetadataSchema } from '../schemas';

describe('BlogPostMetadataSchema', () => {
  const validMetadata = {
    title: 'Test Post',
    date: '2024-01-01',
    categories: ['Tech'],
    published: true,
    slug: 'test-post',
    excerpt: 'This is a test excerpt',
  };

  describe('valid metadata', () => {
    it('parses valid metadata successfully', () => {
      const result = BlogPostMetadataSchema.parse(validMetadata);

      expect(result.title).toBe('Test Post');
      expect(result.date).toBe('2024-01-01');
      expect(result.slug).toBe('test-post');
      expect(result.published).toBe(true);
    });

    it('applies defaults for optional fields', () => {
      const minimal = {
        title: 'Test',
        date: '2024-01-01',
        slug: 'test',
        excerpt: 'Excerpt',
      };

      const result = BlogPostMetadataSchema.parse(minimal);

      expect(result.categories).toEqual([]);
      expect(result.published).toBe(false); // default
      expect(result.author).toBeUndefined();
      expect(result.tags).toBeUndefined();
    });

    it('accepts optional author field', () => {
      const withAuthor = {
        ...validMetadata,
        author: 'John Doe',
      };

      const result = BlogPostMetadataSchema.parse(withAuthor);

      expect(result.author).toBe('John Doe');
    });

    it('accepts optional tags field', () => {
      const withTags = {
        ...validMetadata,
        tags: ['react', 'typescript'],
      };

      const result = BlogPostMetadataSchema.parse(withTags);

      expect(result.tags).toEqual(['react', 'typescript']);
    });
  });

  describe('title validation', () => {
    it('rejects empty title', () => {
      const invalid = { ...validMetadata, title: '' };

      expect(() => BlogPostMetadataSchema.parse(invalid)).toThrow('Title is required');
    });

    it('rejects missing title', () => {
      const { title, ...invalid } = validMetadata;

      expect(() => BlogPostMetadataSchema.parse(invalid)).toThrow();
    });
  });

  describe('date validation', () => {
    it('accepts valid YYYY-MM-DD format', () => {
      const valid = { ...validMetadata, date: '2024-12-31' };

      const result = BlogPostMetadataSchema.parse(valid);

      expect(result.date).toBe('2024-12-31');
    });

    it('rejects invalid date format', () => {
      const invalid = { ...validMetadata, date: '01/01/2024' };

      expect(() => BlogPostMetadataSchema.parse(invalid)).toThrow('Date must be in YYYY-MM-DD format');
    });

    it('rejects invalid date value', () => {
      const invalid = { ...validMetadata, date: '2024-13-45' };

      expect(() => BlogPostMetadataSchema.parse(invalid)).toThrow('Invalid ISO 8601 date');
    });

    it('rejects non-numeric date', () => {
      const invalid = { ...validMetadata, date: 'not-a-date' };

      expect(() => BlogPostMetadataSchema.parse(invalid)).toThrow();
    });

    it('rejects missing date', () => {
      const { date, ...invalid } = validMetadata;

      expect(() => BlogPostMetadataSchema.parse(invalid)).toThrow();
    });
  });

  describe('slug validation', () => {
    it('accepts valid lowercase slug with hyphens', () => {
      const valid = { ...validMetadata, slug: 'my-awesome-post-123' };

      const result = BlogPostMetadataSchema.parse(valid);

      expect(result.slug).toBe('my-awesome-post-123');
    });

    it('rejects uppercase in slug', () => {
      const invalid = { ...validMetadata, slug: 'My-Post' };

      expect(() => BlogPostMetadataSchema.parse(invalid)).toThrow('Slug must contain only lowercase letters');
    });

    it('rejects spaces in slug', () => {
      const invalid = { ...validMetadata, slug: 'my post' };

      expect(() => BlogPostMetadataSchema.parse(invalid)).toThrow('Slug must contain only lowercase letters');
    });

    it('rejects special characters in slug', () => {
      const invalid = { ...validMetadata, slug: 'my_post@123' };

      expect(() => BlogPostMetadataSchema.parse(invalid)).toThrow('Slug must contain only lowercase letters');
    });

    it('rejects empty slug', () => {
      const invalid = { ...validMetadata, slug: '' };

      expect(() => BlogPostMetadataSchema.parse(invalid)).toThrow('Slug is required');
    });

    it('rejects missing slug', () => {
      const { slug, ...invalid } = validMetadata;

      expect(() => BlogPostMetadataSchema.parse(invalid)).toThrow();
    });
  });

  describe('excerpt validation', () => {
    it('rejects empty excerpt', () => {
      const invalid = { ...validMetadata, excerpt: '' };

      expect(() => BlogPostMetadataSchema.parse(invalid)).toThrow('Excerpt is required');
    });

    it('rejects missing excerpt', () => {
      const { excerpt, ...invalid } = validMetadata;

      expect(() => BlogPostMetadataSchema.parse(invalid)).toThrow();
    });
  });

  describe('categories validation', () => {
    it('accepts array of categories', () => {
      const valid = { ...validMetadata, categories: ['Tech', 'DevOps', 'Cloud'] };

      const result = BlogPostMetadataSchema.parse(valid);

      expect(result.categories).toEqual(['Tech', 'DevOps', 'Cloud']);
    });

    it('defaults to empty array when missing', () => {
      const { categories, ...minimal } = validMetadata;

      const result = BlogPostMetadataSchema.parse(minimal);

      expect(result.categories).toEqual([]);
    });

    it('rejects non-array categories', () => {
      const invalid = { ...validMetadata, categories: 'Tech' };

      expect(() => BlogPostMetadataSchema.parse(invalid)).toThrow();
    });
  });

  describe('published validation', () => {
    it('accepts true value', () => {
      const valid = { ...validMetadata, published: true };

      const result = BlogPostMetadataSchema.parse(valid);

      expect(result.published).toBe(true);
    });

    it('accepts false value', () => {
      const valid = { ...validMetadata, published: false };

      const result = BlogPostMetadataSchema.parse(valid);

      expect(result.published).toBe(false);
    });

    it('defaults to false when missing', () => {
      const { published, ...minimal } = validMetadata;

      const result = BlogPostMetadataSchema.parse(minimal);

      expect(result.published).toBe(false);
    });

    it('rejects non-boolean values', () => {
      const invalid = { ...validMetadata, published: 'true' };

      expect(() => BlogPostMetadataSchema.parse(invalid)).toThrow();
    });
  });
});
