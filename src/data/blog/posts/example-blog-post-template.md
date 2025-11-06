---
# Title displayed in blog list and post header
# Required: Must be a non-empty string
title: "Example Blog Post: A Complete Template"

# Publication date in YYYY-MM-DD format (ISO 8601)
# Required: Must be a valid date string
# This is used for sorting posts chronologically
date: "2025-01-25"

# Categories for filtering and organization
# Optional: Defaults to empty array []
# Use clear, consistent category names across posts
categories: ["Platform Engineering", "DevOps", "Tutorial"]

# Publication status - controls visibility
# Optional: Defaults to false (draft mode)
# Set to true when ready to publish, false to keep as draft
published: false

# URL-friendly slug used in routes and permalinks
# Required: Must contain only lowercase letters, numbers, and hyphens
# Should be unique across all posts
# Keep it concise but descriptive
slug: "example-blog-post-template"

# Short excerpt/description shown in blog cards and previews
# Required: Must be a non-empty string
# Keep it brief (1-2 sentences) - this is what readers see before clicking
excerpt: "A comprehensive example blog post demonstrating all markdown features and frontmatter options. Use this as a template for future posts."

# Author name displayed with the post
# Optional: Defaults to "Ralph King Jr"
# Override if you want a different author name
author: "Ralph King Jr"

# Tags for more granular categorization
# Optional: Defaults to categories if not specified
# Can overlap with categories or be more specific
tags: ["Example", "Template", "Markdown", "Tutorial"]
---

# Example Blog Post: A Complete Template

This is a comprehensive example blog post that demonstrates all the markdown features supported by the blog system. Use this post as a template when creating new blog posts.

## Introduction

This post covers all the essential markdown elements you might need in a blog post. Each section demonstrates different formatting options and best practices.

### Purpose of This Template

The purpose of this template is to:
- Provide a clear example of proper frontmatter configuration
- Demonstrate all supported markdown syntax
- Serve as a starting point for new posts
- Show best practices for content structure

## Text Formatting

You can use various text formatting options to emphasize different parts of your content:

- **Bold text** for strong emphasis
- *Italic text* for subtle emphasis
- ***Bold and italic*** for maximum emphasis
- `Inline code` for technical terms, commands, or code snippets

Regular paragraphs should be well-structured and easy to read. Break up long blocks of text into smaller paragraphs to improve readability.

## Lists

### Unordered Lists

Use unordered lists for items without a specific order:

- First item in the list
- Second item with more details
  - Nested item level 1
  - Another nested item
    - Even deeper nesting level 2
- Back to the main level

### Ordered Lists

Use ordered lists for sequential steps or ranked items:

1. First step in the process
2. Second step with important details
3. Third step
   1. Sub-step 3.1
   2. Sub-step 3.2
4. Final step

## Code Examples

### Inline Code

Use `inline code` when referring to variables, functions, or short code snippets within a sentence.

### Code Blocks with Syntax Highlighting

#### JavaScript/TypeScript Example

```javascript
// Function to calculate fibonacci numbers
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Usage example
const result = fibonacci(10);
console.log(`Fibonacci(10) = ${result}`);
```

#### Python Example

```python
# Class example in Python
class BlogPost:
    def __init__(self, title, content):
        self.title = title
        self.content = content
    
    def publish(self):
        print(f"Publishing: {self.title}")
        return True

# Create and publish a post
post = BlogPost("My Post", "Content here")
post.publish()
```

#### YAML/Configuration Example

```yaml
# Docker Compose configuration example
version: '3.8'
services:
  web:
    image: nginx:latest
    ports:
      - "80:80"
    environment:
      - NODE_ENV=production
```

#### Shell/Bash Example

```bash
#!/bin/bash
# Deploy script example

echo "Starting deployment..."
npm run build
docker build -t myapp:latest .
docker push myapp:latest
echo "Deployment complete!"
```

## Links and References

You can include various types of links in your posts:

- External link: [Visit the React documentation](https://react.dev)
- Internal link: [Check out the About page](/about)
- Link with title: [GitHub Repository](https://github.com "View on GitHub")

Remember to use descriptive link text that tells readers what to expect when they click.

## Blockquotes

Use blockquotes to highlight important information, quotes, or call-out sections:

> This is a simple blockquote. It's useful for highlighting important information or quoting external sources.

> **Pro Tip:** You can use markdown formatting inside blockquotes.
>
> This includes **bold text**, *italic text*, and even `code blocks`.

> ### Nested Blockquote Example
> 
> Sometimes you might want to quote something that itself contains a quote:
> 
> > "The best way to predict the future is to invent it." - Alan Kay

## Images (Optional)

If you have images in your `public/` directory, you can reference them:

```markdown
![Alt text for accessibility](/images/example.png)
```

## Tables (Optional)

While not always necessary, tables can be useful for structured data:

| Feature | Supported | Notes |
|---------|-----------|-------|
| Markdown | ✅ | Full GFM support |
| Code Highlighting | ✅ | Multiple languages |
| Images | ✅ | Via public directory |
| Tables | ✅ | GitHub Flavored Markdown |

## Best Practices

### Writing Guidelines

1. **Clear Headings**: Use hierarchical headings (h1, h2, h3) to organize content
2. **Short Paragraphs**: Keep paragraphs concise and focused on one idea
3. **Code Examples**: Include practical, working code examples
4. **Accessibility**: Use descriptive alt text for images and meaningful link text

### Technical Considerations

- Keep slug URLs short and descriptive
- Write compelling excerpts that encourage clicks
- Use categories consistently across posts
- Mark posts as drafts (`published: false`) until ready
- Include code syntax highlighting language for better readability

## Conclusion

This template demonstrates all the essential markdown features available in the blog system. When creating your own posts:

1. Copy the frontmatter section and update all fields
2. Replace the content with your own material
3. Use appropriate markdown formatting
4. Set `published: false` while drafting
5. Update `published: true` when ready to publish

Happy blogging! 🚀

---

*This is an example template post. For more information about the blog system, see the documentation in `src/data/blog/README.md`.*
