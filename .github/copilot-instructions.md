# KingRalph.dev Portfolio - AI Coding Agent Instructions

## Project Overview
React 19 + TypeScript personal portfolio with Tailwind CSS v4, Vite build, React Router v7, and Playwright E2E testing. Deployed to Cloudflare Pages. Uses pnpm as package manager (Node.js ≥22.13.0).

**Project Root**: `/Users/kingralph33/Development/websites/kingralphdev-react`  
**GitHub Repository**: `kingralph33/kingralphdev-website` (not `kingralphdev-react`)

## File Path Rules (Critical)

### Always Use Absolute Paths
The `view`, `edit`, and `create` tools **require absolute paths**. Always construct paths as:
```
/Users/kingralph33/Development/websites/kingralphdev-react/{relative-path}
```

**Examples**:
- ✅ `/Users/kingralph33/Development/websites/kingralphdev-react/src/App.tsx`
- ✅ `/Users/kingralph33/Development/websites/kingralphdev-react/package.json`
- ❌ `src/App.tsx` (will fail)
- ❌ `./package.json` (will fail)

### Stay Within Project Directory
- **Never** request files outside the project directory unless explicitly necessary
- **Never** use `/tmp` for temporary files - use the project directory instead
- When using bash commands, stay in current working directory or child directories

**Examples**:
- ✅ `gh pr diff 88 > ./pr88.diff` (project directory)
- ❌ `cd /tmp && gh pr diff 88 > pr88.diff` (outside project)
- ✅ `grep -r "pattern" src/` (within project)
- ❌ `grep -r "pattern" ~/Documents/` (outside project)

## Architecture & Key Patterns

### Component Structure
- **Layout System**: `MainLayout` wraps all pages with `Navbar` + `Footer`, uses flexbox for sticky footer pattern
- **Lazy Loading**: Pages are lazy-loaded via `React.lazy()` with `Suspense` fallback (see `App.tsx`)
- **Memoization**: Components exported with `React.memo()` for performance (Navbar, Footer, MainLayout)
- **Directory Structure**: Components organized by function:
  - `common/` - Shared components (Navbar, Footer)
  - `blog/` - Blog-specific components (BlogCard, BlogList, SearchBar)
  - `layouts/` - Layout wrappers (MainLayout)
  - `pages/` - Page components (About, Blog)

### Dark Mode Implementation (Critical Pattern)
Dark mode is implemented via class-based Tailwind approach with localStorage persistence:

1. **State**: `isDarkMode` hook in Navbar checks localStorage → system preference → defaults to false
2. **Toggle**: Adds/removes `dark` class on `<html>` element via `useEffect`
3. **Persistence**: Saved to localStorage as `'theme'` key ('dark' or 'light')
4. **Styling**: Use `dark:` prefix in Tailwind classes (e.g., `dark:bg-gray-900`)
5. **Custom Gradients**: Defined in `index.css` under `@layer components` (`.navbar-dark-gradient`, `.footer-dark-gradient`)

**Important**: Dark mode toggle appears in both desktop and mobile menus. Mobile uses `.last()` selector in tests to target mobile-specific toggle.

### Click-Outside Pattern (Dropdowns)
The Affiliates dropdown uses refs for click-outside detection:
```tsx
const dropdownRef = useRef<HTMLDivElement>(null);
useEffect(() => {
  if (!isOpen) return;
  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };
  document.addEventListener('mousedown', handleClickOutside);
  return () => document.removeEventListener('mousedown', handleClickOutside);
}, [isOpen]);
```
Both desktop and mobile dropdowns have separate refs for independent tracking.

### Blog System Architecture (In Development)
Blog functionality is being implemented with markdown-based content:

1. **Data Layer** (`src/data/blog/`):
   - `blogService.ts` - Service functions for loading, parsing, and filtering markdown posts
   - `types.ts` - TypeScript interfaces (`BlogPost`, `BlogPostMetadata`, `BlogPostPreview`)
   - `posts/` - Markdown blog posts with YAML frontmatter
   - Uses Vite's glob import (`import.meta.glob()`) for automatic file loading
   - Uses `gray-matter` to parse frontmatter, `remark-gfm` for GitHub Flavored Markdown

2. **Blog Post Format**:
   ```markdown
   ---
   title: "Post Title"
   date: "2025-01-15"
   categories: ["Platform Engineering", "DevOps"]
   published: true
   slug: "url-friendly-slug"
   excerpt: "Brief description for listings"
   ---
   # Post Content (Markdown)
   ```

3. **Service Functions** (see `src/data/blog/README.md` for full API):
   - `getAllPosts()` - Load all posts (including drafts)
   - `getPublishedPosts()` - Filter published posts only
   - `getPostBySlug(slug)` - Retrieve single post
   - `searchPosts(posts, query)` - Full-text search
   - `filterByCategory(posts, category)` - Category filtering
   - `sortByDate(posts)` - Chronological sorting

4. **Components**:
   - `BlogCard.tsx` - Post preview card with title, date, excerpt, tags
   - `BlogList.tsx` - Grid layout for multiple cards
   - `SearchBar.tsx` - Search input component
   - `Blog.tsx` - Main page (currently placeholder "Coming soon...")

5. **Reading Time Calculation**: Automatically estimates reading time at ~200 words/minute

**Important**: Blog is not yet fully implemented. Posts exist but routing and display logic are incomplete.

## Testing with Playwright

### Test Organization
- **Location**: `e2e/` directory with domain-based organization (homepage, navigation, dark-mode, accessibility, about-page)
- **Config**: `playwright.config.ts` runs Chromium only, dev server auto-starts on port 5173
- **Patterns**: Tests use descriptive `test.describe()` blocks with `beforeEach()` for page navigation

### Critical Test Patterns

#### Navigation & External Links
```typescript
// Test external links that open in new tabs
const pagePromise = context.waitForEvent('page');
await page.getByLabel('Resume, opens in new tab').first().click();
const newPage = await pagePromise;
await expect(newPage).toHaveURL(/kingralphresume\.com/);

// Navigate and verify URL + content
await page.getByRole('link', { name: 'About' }).first().click();
await expect(page).toHaveURL('/about');
await expect(page.getByRole('heading', { name: 'About Me', level: 1 })).toBeVisible();
```

#### Mobile vs Desktop Testing
```typescript
// Desktop viewport
await page.setViewportSize({ width: 1280, height: 720 });
await expect(page.getByTestId('desktop-menu')).toBeVisible();

// Mobile viewport
await page.setViewportSize({ width: 375, height: 667 });
const menuButton = page.getByLabel('Toggle navigation menu');
await menuButton.click();

// Target mobile-specific elements with .last()
const toggle = page.getByLabel(/Switch to dark mode/).last();
```

#### Dark Mode Testing
```typescript
// Verify dark mode class on <html> element
const html = page.locator('html');
await expect(html).toHaveClass(/dark/);

// Test persistence across navigation
await page.getByRole('link', { name: 'About' }).first().click();
await expect(html).toHaveClass(/dark/); // Still dark after navigation
```

#### Dropdown Click-Outside Behavior
```typescript
// Open dropdown
const affiliatesButton = page.getByLabel('Affiliates menu').first();
await affiliatesButton.click();
await expect(page.getByRole('menuitem', { name: 'Discount for systemdesignschool.io' })).toBeVisible();

// Click outside to close
await page.getByRole('heading', { name: 'Ralph King Jr' }).click();
await expect(page.getByRole('menuitem', { name: 'Discount for systemdesignschool.io' })).toBeHidden();
```

#### Accessibility Testing Patterns
```typescript
// Verify heading hierarchy (single h1, ordered h2-h6)
const h1Elements = page.getByRole('heading', { level: 1 });
await expect(h1Elements).toHaveCount(1);

// Check ARIA attributes
const nav = page.getByRole('navigation');
await expect(nav).toHaveAttribute('aria-label', 'Main navigation');

// Verify aria-expanded state changes
const menuButton = page.getByLabel('Toggle navigation menu');
await expect(menuButton).toHaveAttribute('aria-expanded', 'false');
await menuButton.click();
await expect(menuButton).toHaveAttribute('aria-expanded', 'true');

// Keyboard navigation
await page.keyboard.press('Tab');
await expect(page.getByText('KingRalph.dev')).toBeFocused();
```

### Accessibility Requirements (Test-Enforced)
All interactive elements must have proper ARIA labels to pass tests:
- Buttons: `aria-label="descriptive action"`
- Icons: `aria-hidden="true"` for decorative icons
- Dropdowns: `aria-haspopup="true"` and `aria-expanded={isOpen}`
- External links: Include "opens in new tab" in aria-label
- Navigation: `aria-label="Main navigation"`
- Main content: `role="main"` and `aria-label="Main content"`
- Mobile menu: `aria-expanded` must toggle between "true"/"false"`

## Styling Conventions

### Tailwind Usage
- **Responsive**: Use `lg:` for desktop (1024px+), avoid `md:` unless necessary
- **Dark Mode**: Always provide `dark:` variants for colored backgrounds/text
- **Custom Classes**: Defined in `index.css` under `@layer components`:
  - `.nav-link`: Blue → green hover with dark mode support
  - `.section-h2`: Section heading styles
  - `.text-adaptive`: Gray text with dark mode support

### Color Palette
- **Primary**: `blue-900` (light mode text), `blue-400` (dark mode links)
- **Accent**: `green-600` (hover states, borders)
- **Backgrounds**: Light mode uses CSS gradient in `body`, dark mode uses `.dark body` gradient

### Responsive Breakpoints
Target desktop (`lg:`) first, then mobile. Example from Home component:
```tsx
className="text-2xl lg:text-3xl" // Mobile 2xl, desktop 3xl
className="py-6 lg:py-10"       // Mobile py-6, desktop py-10
```

## Development Workflow

### Pre-Commit Checks
Run before committing:
```bash
pnpm type-check  # Must pass (no TS errors)
pnpm lint        # Must pass (ESLint)
pnpm test        # All Playwright tests must pass
```

### Build Configuration
- **Vite**: 
  - React plugin with Fast Refresh enabled
  - Tailwind CSS v4 via `@tailwindcss/vite` plugin
  - Manual chunks: React/React-DOM/React-Router split into `vendor` bundle for better caching
  - Minification: Terser (not default esbuild) to drop `console.log` and `debugger` in production
- **TypeScript**: 
  - Strict mode enabled (`strict: true`)
  - Additional strict checks: `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`, `noUncheckedSideEffectImports`
  - Target ES2020, bundler moduleResolution
  - No `any` types allowed, use `unknown` if type is truly unknown
  - Project references pattern: `tsconfig.json` orchestrates `tsconfig.app.json` and `tsconfig.node.json`

**Critical Vite Config Pattern**:
```typescript
build: {
  minify: 'terser', // NOT esbuild - needed for console.log dropping
  terserOptions: {
    compress: { drop_console: true, drop_debugger: true }
  },
  rollupOptions: {
    output: {
      manualChunks: { vendor: ['react', 'react-dom', 'react-router-dom'] }
    }
  }
}
```

### CI/CD
GitHub Actions runs tests on push/PR to `main`/`dev`:
1. Setup Node 22.x + pnpm 10
2. Install deps + Playwright Chromium with `--with-deps`
3. Run `pnpm test` (must pass to merge)

**Workflow Conditions**: Tests run automatically for ready PRs but skip:
- Draft PRs (`github.event.pull_request.draft == true`)
- Branches starting with `copilot/` or `copilot-` (AI-generated branches)
- This ensures tests only run when human review is intended

## Common Pitfalls

1. **Dark Mode Testing**: Use `.first()` for desktop, `.last()` for mobile toggle selectors
2. **Navbar Positioning**: Fixed top with `pt-14 lg:pt-16` on main content to prevent overlap
3. **External Links**: Must include `target="_blank"` and `rel="noopener noreferrer"`
4. **TypeScript**: Component props must use interfaces, no inline types
5. **Accessibility**: Missing ARIA labels will fail accessibility.spec.ts tests

## Key Files Reference

### Core Application
- `src/App.tsx`: Routing and lazy loading setup
- `src/main.tsx`: Entry point and React 19 setup
- `src/components/common/Navbar/Navbar.tsx`: Dark mode + dropdown pattern
- `src/layouts/MainLayout/MainLayout.tsx`: Page wrapper with sticky footer
- `src/index.css`: Custom Tailwind components and dark mode gradients

### Blog System (In Development)
- `src/data/blog/blogService.ts`: Post loading and filtering logic
- `src/data/blog/types.ts`: TypeScript interfaces for blog posts
- `src/data/blog/README.md`: Complete API documentation for blog service
- `src/components/blog/`: BlogCard, BlogList, SearchBar components
- `src/pages/Blog/Blog.tsx`: Blog page (placeholder)

### Testing & Configuration
- `e2e/`: Playwright E2E tests (homepage, navigation, dark-mode, accessibility, about-page)
- `playwright.config.ts`: Test environment configuration
- `vite.config.ts`: Build configuration with Terser minification
- `tsconfig.json`: TypeScript project references
- `eslint.config.js`: ESLint with React hooks and TypeScript rules

### CI/CD
- `.github/workflows/test.yml`: Automated testing on PRs to main/dev
