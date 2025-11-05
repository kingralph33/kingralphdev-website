# Blog Post Frontmatter Validation Tests

This document outlines the Zod schema validation rules and test cases for blog post frontmatter.

## Validation Rules

| Field | Type | Required | Rules | Default |
|-------|------|----------|-------|---------|
| `title` | string | ✓ | Non-empty string | - |
| `date` | string | ✓ | YYYY-MM-DD format, valid ISO 8601 date | - |
| `slug` | string | ✓ | Non-empty, lowercase, alphanumeric + hyphens only | - |
| `excerpt` | string | ✓ | Non-empty string | - |
| `categories` | string[] | ✓ | Array of strings | `[]` |
| `published` | boolean | ✓ | Boolean | `false` |
| `author` | string | ✗ | Optional string | - |
| `tags` | string[] | ✗ | Optional array of strings | - |

## Test Cases

### ✅ Valid Examples

#### Minimal Valid Frontmatter
```yaml
---
title: "Getting Started with Kubernetes"
date: "2025-01-10"
slug: "getting-started-with-kubernetes"
excerpt: "A beginner's guide to understanding and deploying applications with Kubernetes."
---
```
**Result:** ✓ Passes validation with defaults applied (categories: [], published: false)

#### Complete Valid Frontmatter
```yaml
---
title: "Building Scalable Platform Engineering Solutions"
date: "2025-01-15"
slug: "building-scalable-platform-engineering"
excerpt: "Learn how to build robust platform engineering solutions."
categories: ["Platform Engineering", "DevOps"]
published: true
author: "Ralph King Jr"
tags: ["Platform Engineering", "DevOps", "Scalability"]
---
```
**Result:** ✓ Passes all validation checks

### ❌ Invalid Examples

#### Invalid Date Format (Slashes)
```yaml
---
title: "Test Post"
date: "2025/01/15"
slug: "test-post"
excerpt: "Test excerpt"
---
```
**Error:** `Invalid frontmatter in "test-post": date: Date must be in YYYY-MM-DD format`

#### Invalid Date Format (No Hyphens)
```yaml
---
title: "Test Post"
date: "20250115"
slug: "test-post"
excerpt: "Test excerpt"
---
```
**Error:** `Invalid frontmatter in "test-post": date: Date must be in YYYY-MM-DD format`

#### Invalid Date Value (Month Out of Range)
```yaml
---
title: "Test Post"
date: "2025-13-45"
slug: "test-post"
excerpt: "Test excerpt"
---
```
**Error:** `Invalid frontmatter in "test-post": date: Invalid ISO 8601 date`

#### Invalid Date Value (Day Out of Range)
```yaml
---
title: "Test Post"
date: "2025-02-30"
slug: "test-post"
excerpt: "Test excerpt"
---
```
**Error:** `Invalid frontmatter in "test-post": date: Invalid ISO 8601 date`

#### Invalid Slug (Uppercase Letters)
```yaml
---
title: "Test Post"
date: "2025-01-15"
slug: "Test-Post"
excerpt: "Test excerpt"
---
```
**Error:** `Invalid frontmatter in "test-post": slug: Slug must contain only lowercase letters, numbers, and hyphens`

#### Invalid Slug (Spaces)
```yaml
---
title: "Test Post"
date: "2025-01-15"
slug: "test post"
excerpt: "Test excerpt"
---
```
**Error:** `Invalid frontmatter in "test-post": slug: Slug must contain only lowercase letters, numbers, and hyphens`

#### Invalid Slug (Special Characters)
```yaml
---
title: "Test Post"
date: "2025-01-15"
slug: "test_post@123"
excerpt: "Test excerpt"
---
```
**Error:** `Invalid frontmatter in "test-post": slug: Slug must contain only lowercase letters, numbers, and hyphens`

#### Missing Required Field (title)
```yaml
---
date: "2025-01-15"
slug: "test-post"
excerpt: "Test excerpt"
---
```
**Error:** `Invalid frontmatter in "test-post": title: Required`

#### Missing Required Field (date)
```yaml
---
title: "Test Post"
slug: "test-post"
excerpt: "Test excerpt"
---
```
**Error:** `Invalid frontmatter in "test-post": date: Required`

#### Missing Required Field (slug)
```yaml
---
title: "Test Post"
date: "2025-01-15"
excerpt: "Test excerpt"
---
```
**Error:** `Invalid frontmatter in "test-post": slug: Required`

#### Missing Required Field (excerpt)
```yaml
---
title: "Test Post"
date: "2025-01-15"
slug: "test-post"
---
```
**Error:** `Invalid frontmatter in "test-post": excerpt: Required`

#### Empty Title
```yaml
---
title: ""
date: "2025-01-15"
slug: "test-post"
excerpt: "Test excerpt"
---
```
**Error:** `Invalid frontmatter in "test-post": title: Title is required`

#### Empty Slug
```yaml
---
title: "Test Post"
date: "2025-01-15"
slug: ""
excerpt: "Test excerpt"
---
```
**Error:** `Invalid frontmatter in "test-post": slug: Slug is required`

#### Empty Excerpt
```yaml
---
title: "Test Post"
date: "2025-01-15"
slug: "test-post"
excerpt: ""
---
```
**Error:** `Invalid frontmatter in "test-post": excerpt: Excerpt is required`

#### Wrong Type (categories as string instead of array)
```yaml
---
title: "Test Post"
date: "2025-01-15"
slug: "test-post"
excerpt: "Test excerpt"
categories: "DevOps"
---
```
**Error:** `Invalid frontmatter in "test-post": categories: Expected array, received string`

#### Wrong Type (published as string instead of boolean)
```yaml
---
title: "Test Post"
date: "2025-01-15"
slug: "test-post"
excerpt: "Test excerpt"
published: "true"
---
```
**Error:** `Invalid frontmatter in "test-post": published: Expected boolean, received string`

## Implementation Benefits

### 1. Better Error Messages
- **Before:** "Missing required frontmatter field: date"
- **After:** "Invalid frontmatter in 'my-post': date: Date must be in YYYY-MM-DD format"

### 2. Catch More Issues
- Invalid date formats (2025/01/15, 20250115)
- Invalid date values (2025-13-45, 2025-02-30)
- Invalid slug formats (spaces, uppercase, special characters)
- Type mismatches (categories as string, published as string)
- Empty required fields

### 3. Single Source of Truth
- TypeScript types are inferred from Zod schemas
- No need to manually keep types and validation in sync
- Changes to validation automatically update types

### 4. Self-Documenting
- Schemas serve as living documentation
- Validation rules are explicit and discoverable
- Error messages are actionable

## Usage in Code

### Parsing Blog Posts
```typescript
import { BlogPostMetadataSchema } from './schemas';

// Parse and validate frontmatter
const metadata = BlogPostMetadataSchema.parse(data);
```

### Type Inference
```typescript
import type { BlogPostMetadata, BlogPost } from './types';

// Types are automatically inferred from Zod schemas
function processBlogPost(post: BlogPost) {
  // TypeScript knows all the fields and their types
}
```

### Error Handling
```typescript
try {
  const metadata = BlogPostMetadataSchema.parse(data);
  // Use validated metadata
} catch (error) {
  if (error instanceof z.ZodError) {
    // Get detailed validation errors
    const issues = error.issues
      .map((i) => `${i.path.join('.')}: ${i.message}`)
      .join(', ');
    console.error(`Validation failed: ${issues}`);
  }
}
```
