/**
 * Blog service layer for loading, parsing, and filtering markdown blog posts
 */

import matter from 'gray-matter';
import { z } from 'zod';
import { BlogPostMetadataSchema } from './schemas';
import type { BlogPost, BlogPostPreview } from './types';

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
 * Parse a markdown file and extract post preview (without full content)
 * More efficient for listing pages as it doesn't load full markdown content
 */
function parseMarkdownPostPreview(slug: string, fileContent: string): BlogPostPreview {
  try {
    const { data, content } = matter(fileContent);

    // Validate frontmatter with Zod
    const metadata = BlogPostMetadataSchema.parse(data);

    // Create preview object without content
    const preview: BlogPostPreview = {
      ...metadata,
      id: slug,
      author: metadata.author || 'Ralph King Jr',
      tags: metadata.tags ?? metadata.categories,
      readingTime: calculateReadingTime(content),
    };

    return preview;
  } catch (error) {
    if (error instanceof z.ZodError) {
      const issues = error.issues
        .map((i) => `${i.path.join('.')}: ${i.message}`)
        .join(', ');
      throw new Error(`Invalid frontmatter in "${slug}": ${issues}`);
    }
    throw new Error(
      `Failed to parse markdown preview "${slug}": ${error instanceof Error ? error.message : String(error)}`
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
 * Search posts by keywords in title, excerpt
 * Case-insensitive search
 * Works with both BlogPost and BlogPostPreview types
 */
export function searchPosts<T extends BlogPostPreview>(posts: T[], query: string): T[] {
  if (!query || query.trim() === '') {
    return posts;
  }

  const searchTerm = query.toLowerCase().trim();

  return posts.filter((post) => {
    const titleMatch = post.title.toLowerCase().includes(searchTerm);
    const excerptMatch = post.excerpt.toLowerCase().includes(searchTerm);
    // Only search in content if it exists (BlogPost has it, BlogPostPreview doesn't)
    const contentMatch = 'content' in post && typeof post.content === 'string'
      ? post.content.toLowerCase().includes(searchTerm)
      : false;

    return titleMatch || excerptMatch || contentMatch;
  });
}

/**
 * Filter posts by category
 * Returns posts that have the specified category
 * Works with both BlogPost and BlogPostPreview types
 */
export function filterByCategory<T extends BlogPostPreview>(
  posts: T[],
  category: string
): T[] {
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
 * Works with both BlogPost and BlogPostPreview types
 */
export function sortByDate<T extends BlogPostPreview>(posts: T[]): T[] {
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

/**
 * Get all published post previews (without full content)
 * More efficient for listing pages - loads only metadata and excerpts
 */
export async function getPublishedPostPreviews(): Promise<BlogPostPreview[]> {
  try {
    // Use Vite's glob import to load all markdown files
    const postModules = import.meta.glob<string>('./posts/*.md', {
      query: '?raw',
      import: 'default',
    });

    const previews: BlogPostPreview[] = [];
    const errors: string[] = [];

    for (const [path, loadPost] of Object.entries(postModules)) {
      try {
        const content = await loadPost();
        // Extract slug from file path (e.g., "./posts/my-post.md" -> "my-post")
        const slug = path.replace(/^.*\/(.+)\.md$/, '$1');
        const preview = parseMarkdownPostPreview(slug, content);
        
        // Only include published posts
        if (preview.published === true) {
          previews.push(preview);
        }
      } catch (error) {
        const errorMsg = `Failed to load ${path}: ${error instanceof Error ? error.message : String(error)}`;
        console.error(errorMsg);
        errors.push(errorMsg);
        // Continue loading other posts even if one fails
        continue;
      }
    }

    // If all posts failed to load, throw an error
    if (previews.length === 0 && errors.length > 0) {
      // Limit error details to first 3 errors for better UX
      const errorSummary = errors.length > 3 
        ? `${errors.slice(0, 3).join('; ')} (and ${errors.length - 3} more)`
        : errors.join('; ');
      throw new Error(`Failed to load any blog posts. Errors: ${errorSummary}`);
    }

    return previews;
  } catch (error) {
    console.error('Error loading post previews:', error);
    // Re-throw with more context instead of returning empty array
    if (error instanceof Error) {
      throw new Error(`Unable to load blog posts: ${error.message}`);
    }
    throw new Error('Unable to load blog posts due to an unknown error');
  }
}

/**
 * Get a single post by its ID (slug)
 * Used for lazy-loading full content when expanding a post card
 * Returns null if post not found
 */
export async function getPostById(id: string): Promise<BlogPost | null> {
  try {
    // Use dynamic import to load only the specific markdown file
    const content = await import(`./posts/${id}.md?raw`);
    return parseMarkdownPost(id, content.default);
  } catch (error) {
    console.error(`Error loading post with id "${id}":`, error);
    // Return null for not found instead of throwing
    // This allows the calling component to handle the missing post gracefully
    return null;
  }
}
