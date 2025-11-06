/**
 * Zod schemas for blog post frontmatter validation
 * These schemas provide runtime validation and type inference
 */

import { z } from 'zod';

/**
 * Zod schema for blog post frontmatter validation
 * Validates all required and optional fields with proper type checking
 */
export const BlogPostMetadataSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format')
    .refine((date) => !isNaN(Date.parse(date)), {
      message: 'Invalid ISO 8601 date',
    }),
  categories: z.array(z.string()).default([]),
  published: z.boolean().default(false),
  slug: z
    .string()
    .min(1, 'Slug is required')
    .regex(
      /^[a-z0-9-]+$/,
      'Slug must contain only lowercase letters, numbers, and hyphens'
    ),
  excerpt: z.string().min(1, 'Excerpt is required'),
  author: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

/**
 * Infer TypeScript type from Zod schema
 * This ensures types stay in sync with validation rules
 */
export type BlogPostMetadata = z.infer<typeof BlogPostMetadataSchema>;

/**
 * Schema for complete blog post with computed fields
 * This schema extends metadata with runtime-computed values.
 * Note: This schema is primarily used for type inference via z.infer<>.
 * Actual validation happens at the BlogPostMetadata level,
 * then defaults are applied in the service layer to create the full BlogPost.
 */
export const BlogPostSchema = BlogPostMetadataSchema
  .omit({ author: true, tags: true })
  .extend({
    id: z.string(),
    content: z.string(),
    author: z.string(), // Always present in final post (default applied in service)
    tags: z.array(z.string()), // Always present in final post (fallback to categories in service)
    readingTime: z.number().int().positive(),
  });

/**
 * Infer TypeScript type for complete blog post
 */
export type BlogPost = z.infer<typeof BlogPostSchema>;

/**
 * Blog post metadata for listings and previews (without full content)
 * Includes all display fields needed by components
 */
export type BlogPostPreview = Omit<BlogPost, 'content'>;
