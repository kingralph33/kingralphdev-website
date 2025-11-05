/**
 * TypeScript interfaces for blog post data structure
 */

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  tags: string[];
  readingTime: number;
}

export interface BlogPostMetadata {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  author: string;
  tags: string[];
  readingTime: number;
}
