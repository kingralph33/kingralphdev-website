# Blog Data Layer

This directory contains the blog service layer that loads, parses, and filters markdown blog posts.

## Structure

```
src/data/blog/
├── types.ts          # TypeScript interfaces
├── blogService.ts    # Service functions for loading and filtering posts
├── index.ts          # Export barrel file
└── posts/            # Markdown blog posts
    ├── *.md          # Individual blog post files
    └── .gitkeep
```

## Types

### `BlogPostMetadata`
Frontmatter metadata extracted from markdown files:
- `title: string` - Post title
- `date: string` - Publication date (ISO 8601 format: YYYY-MM-DD)
- `categories: string[]` - Post categories
- `published: boolean` - Publication status (true = published, false = draft)
- `slug: string` - URL-friendly identifier
- `excerpt: string` - Short description/preview

### `BlogPost`
Complete blog post with all content:
- All fields from `BlogPostMetadata`
- `id: string` - Unique identifier (derived from filename)
- `content: string` - Full markdown content
- `author: string` - Post author (defaults to "Ralph King Jr")
- `tags: string[]` - Post tags (defaults to categories)
- `readingTime: number` - Estimated reading time in minutes

### `BlogPostPreview`
Type alias for posts without full content (used in listings):
- Same as `BlogPost` but without the `content` field

## Service Functions

### `getAllPosts(): Promise<BlogPost[]>`
Loads all markdown files from the posts directory using Vite's glob import.

**Returns:** Array of all posts (published and drafts)

**Example:**
```typescript
import { getAllPosts } from '@/data/blog';

const posts = await getAllPosts();
console.log(`Found ${posts.length} posts`);
```

### `getPublishedPosts(): Promise<BlogPost[]>`
Gets only published posts (where `published === true`).

**Returns:** Array of published posts only

**Example:**
```typescript
import { getPublishedPosts } from '@/data/blog';

const publishedPosts = await getPublishedPosts();
```

### `getPostBySlug(slug: string): Promise<BlogPost | null>`
Retrieves a single post by its slug.

**Parameters:**
- `slug` - The post's slug identifier

**Returns:** The matching post or `null` if not found

**Example:**
```typescript
import { getPostBySlug } from '@/data/blog';

const post = await getPostBySlug('building-scalable-platform-engineering');
if (post) {
  console.log(post.title);
}
```

### `searchPosts(posts: BlogPost[], query: string): BlogPost[]`
Searches posts by keywords in title, excerpt, or content (case-insensitive).

**Parameters:**
- `posts` - Array of posts to search
- `query` - Search term

**Returns:** Filtered array of matching posts

**Example:**
```typescript
import { getAllPosts, searchPosts } from '@/data/blog';

const allPosts = await getAllPosts();
const results = searchPosts(allPosts, 'kubernetes');
```

### `filterByCategory(posts: BlogPost[], category: string): BlogPost[]`
Filters posts by category (case-insensitive).

**Parameters:**
- `posts` - Array of posts to filter
- `category` - Category name

**Returns:** Posts that have the specified category

**Example:**
```typescript
import { getAllPosts, filterByCategory } from '@/data/blog';

const allPosts = await getAllPosts();
const devOpsPosts = filterByCategory(allPosts, 'DevOps');
```

### `sortByDate(posts: BlogPost[]): BlogPost[]`
Sorts posts by date, newest first. Handles invalid dates gracefully.

**Parameters:**
- `posts` - Array of posts to sort

**Returns:** New array sorted by date (does not mutate original)

**Example:**
```typescript
import { getAllPosts, sortByDate } from '@/data/blog';

const allPosts = await getAllPosts();
const sortedPosts = sortByDate(allPosts);
```

## Markdown Post Format

Blog posts are written in Markdown with YAML frontmatter:

```markdown
---
title: "My Blog Post Title"
date: "2025-01-15"
categories: ["Platform Engineering", "DevOps"]
published: true
slug: "my-blog-post"
excerpt: "A brief description that appears in listings"
author: "Ralph King Jr"
tags: ["Optional", "Custom Tags"]
---

# Your Blog Content

Write your post content here using Markdown...
```

### Required Frontmatter Fields
- `title` - Post title
- `date` - Publication date (YYYY-MM-DD)
- `slug` - URL-friendly identifier
- `excerpt` - Preview text

### Optional Frontmatter Fields
- `categories` - Array of categories (defaults to `[]`)
- `published` - Publication status (defaults to `false`)
- `author` - Author name (defaults to "Ralph King Jr")
- `tags` - Array of tags (defaults to categories)

## Error Handling

The service layer includes comprehensive error handling:

1. **Missing/Invalid Files**: If a post file fails to load, an error is logged and other posts continue loading
2. **Missing Frontmatter**: Posts without required frontmatter fields throw descriptive errors
3. **Invalid Dates**: Posts with invalid dates are handled gracefully in sorting
4. **Malformed Markdown**: gray-matter parsing errors are caught and logged

## Features

- ✅ **Vite Integration**: Uses Vite's glob import for automatic file loading
- ✅ **TypeScript**: Fully typed with strict type checking
- ✅ **Reading Time**: Automatically calculates estimated reading time
- ✅ **Draft Support**: Filter published vs. draft posts
- ✅ **Search**: Full-text search across title, excerpt, and content
- ✅ **Categories**: Filter posts by category
- ✅ **Date Sorting**: Sort posts chronologically
- ✅ **Error Handling**: Graceful failure with detailed error messages

## Usage Example

```typescript
import {
  getPublishedPosts,
  searchPosts,
  filterByCategory,
  sortByDate
} from '@/data/blog';

// Get all published posts, sorted by date
const posts = sortByDate(await getPublishedPosts());

// Search for specific content
const kubernetesPost = searchPosts(posts, 'kubernetes');

// Filter by category
const devOpsPosts = filterByCategory(posts, 'DevOps');
```

## Sample Posts

Three sample posts are included for testing:
1. **building-scalable-platform-engineering.md** - Published post about platform engineering
2. **getting-started-with-kubernetes.md** - Published post about Kubernetes basics
3. **future-of-cloud-native-development.md** - Draft post about cloud native trends
