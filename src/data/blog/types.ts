/**
 * TypeScript interfaces for blog post data structure
 */

/**
 * Frontmatter metadata extracted from markdown files
 */
export interface BlogPostMetadata {
  title: string;
  /** Date in ISO 8601 format (YYYY-MM-DD) */
  date: string;
  categories: string[];
  published: boolean;
  slug: string;
  excerpt: string;
}

/**
 * Complete blog post with content
 */
export interface BlogPost extends BlogPostMetadata {
  id: string;
  content: string;
  author: string;
  tags: string[];
  readingTime: number;
}

/**
 * Blog post metadata for listings and previews (without full content)
 * Includes all display fields needed by components
 */
export type BlogPostPreview = Omit<BlogPost, 'content'>;
