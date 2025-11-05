/**
 * TypeScript interfaces for blog post data structure
 */

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  /** Date in ISO 8601 format (YYYY-MM-DD) */
  date: string;
  author: string;
  tags: string[];
  readingTime: number;
}

/**
 * Blog post metadata without full content
 * Used for post listings and previews
 */
export type BlogPostMetadata = Omit<BlogPost, 'content'>;
