/**
 * Blog service layer for loading, parsing, and filtering markdown blog posts
 */

import matter from 'gray-matter';
import { z } from 'zod';
import { BlogPostMetadataSchema } from './schemas';
import type { BlogPost } from './types';

/**
 * Calculate estimated reading time based on word count
 * Assumes average reading speed of 200 words per minute
 */
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

/**
 * Parse a markdown file and extract post data
 */
function parseMarkdownPost(slug: string, fileContent: string): BlogPost {
  try {
    const { data, content } = matter(fileContent);

    // Validate frontmatter with Zod
    const metadata = BlogPostMetadataSchema.parse(data);

    // Create post object with defaults for optional fields
    const post: BlogPost = {
      ...metadata,
      id: slug,
      content: content,
      author: metadata.author || 'Ralph King Jr',
      tags: metadata.tags ?? metadata.categories,
      readingTime: calculateReadingTime(content),
    };

    return post;
  } catch (error) {
    if (error instanceof z.ZodError) {
      const issues = error.issues
        .map((i) => `${i.path.join('.')}: ${i.message}`)
        .join(', ');
      throw new Error(`Invalid frontmatter in "${slug}": ${issues}`);
    }
    throw new Error(
      `Failed to parse markdown post "${slug}": ${error instanceof Error ? error.message : String(error)}`
    );
  }
}

/**
 * Import all markdown files from the posts directory
 * Uses Vite's glob import feature to dynamically load posts
 */
export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    // Use Vite's glob import to load all markdown files
    const postModules = import.meta.glob<string>('./posts/*.md', {
      query: '?raw',
      import: 'default',
    });

    const posts: BlogPost[] = [];

    for (const [path, loadPost] of Object.entries(postModules)) {
      try {
        const content = await loadPost();
        // Extract slug from file path (e.g., "./posts/my-post.md" -> "my-post")
        const slug = path.replace(/^.*\/(.+)\.md$/, '$1');
        const post = parseMarkdownPost(slug, content);
        posts.push(post);
      } catch (error) {
        console.error(`Error loading post from ${path}:`, error);
        // Continue loading other posts even if one fails
        continue;
      }
    }

    return posts;
  } catch (error) {
    console.error('Error loading posts:', error);
    return [];
  }
}

/**
 * Get only published posts
 * Filters out draft posts where published === false
 */
export async function getPublishedPosts(): Promise<BlogPost[]> {
  const allPosts = await getAllPosts();
  return allPosts.filter((post) => post.published === true);
}

/**
 * Get a single post by its slug
 * Returns null if post not found
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const allPosts = await getAllPosts();
  return allPosts.find((post) => post.slug === slug) || null;
}

/**
 * Search posts by keywords in title, excerpt, or content
 * Case-insensitive search
 */
export function searchPosts(posts: BlogPost[], query: string): BlogPost[] {
  if (!query || query.trim() === '') {
    return posts;
  }

  const searchTerm = query.toLowerCase().trim();

  return posts.filter((post) => {
    const titleMatch = post.title.toLowerCase().includes(searchTerm);
    const excerptMatch = post.excerpt.toLowerCase().includes(searchTerm);
    const contentMatch = post.content.toLowerCase().includes(searchTerm);

    return titleMatch || excerptMatch || contentMatch;
  });
}

/**
 * Filter posts by category
 * Returns posts that have the specified category
 */
export function filterByCategory(
  posts: BlogPost[],
  category: string
): BlogPost[] {
  if (!category || category.trim() === '') {
    return posts;
  }

  return posts.filter((post) =>
    post.categories.some(
      (cat) => cat.toLowerCase() === category.toLowerCase()
    )
  );
}

/**
 * Sort posts by date (newest first)
 * Handles invalid dates gracefully
 */
export function sortByDate(posts: BlogPost[]): BlogPost[] {
  return [...posts].sort((a, b) => {
    try {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();

      // If dates are invalid, treat as 0
      const timeA = isNaN(dateA) ? 0 : dateA;
      const timeB = isNaN(dateB) ? 0 : dateB;

      return timeB - timeA; // Newest first
    } catch {
      return 0;
    }
  });
}
