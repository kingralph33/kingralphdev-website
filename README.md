# KingRalph.dev - Personal Portfolio Website

A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS. This site showcases my professional experience, skills, and projects. My resume is available via an external link.

## Features

- 🌓 Dark Mode Support (System preference based)
- 📱 Fully Responsive Design
- ⚡ Fast Performance with Vite
- 🎨 Modern UI with Tailwind CSS
- 🧪 Comprehensive Test Coverage
- ♿ Accessibility Focused
- 🔍 SEO Optimized

## Performance Metrics

| Metric | Score |
|--------|-------|
| Lighthouse Performance | 98/100 |
| Lighthouse Accessibility | 100/100 |
| Lighthouse Best Practices | 100/100 |
| Lighthouse SEO | 100/100 |
| Time to Interactive | < 1.2s |
| First Contentful Paint | < 0.8s |

*Measured on desktop with simulated fast 4G connection*

## Tech Stack

- **Framework:** React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Build Tool:** Vite
- **Testing:** 
  - Vitest (Unit Tests)
  - Playwright (E2E Tests)
- **Routing:** React Router v7
- **Icons:** Heroicons + React Icons
- **Deployment:** Cloudflare Pages

## Getting Started

### Prerequisites

- Node.js >= 22.13.0
- pnpm >= 10.5.2

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/kingralph33/kingralphdev-react.git
   cd kingralphdev-react
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Start the development server:

   ```bash
   pnpm dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm test` - Run all tests (unit + E2E)
- `pnpm test:unit` - Run Vitest unit tests
- `pnpm test:unit:watch` - Run unit tests in watch mode
- `pnpm test:unit:ui` - Open Vitest UI
- `pnpm test:unit:coverage` - Generate unit test coverage report
- `pnpm test:e2e` - Run Playwright E2E tests
- `pnpm test:e2e:ui` - Run E2E tests in Playwright UI mode
- `pnpm test:e2e:headed` - Run E2E tests with browser visible
- `pnpm test:e2e:debug` - Run E2E tests in debug mode
- `pnpm lint` - Run ESLint
- `pnpm type-check` - Check TypeScript types

## Testing

The project implements a comprehensive testing strategy with two complementary approaches:

### Unit Tests (Vitest)

Fast, isolated tests for business logic, utilities, and helper functions:

- ✅ Blog service functions (search, filter, sort)
- ✅ Schema validation (Zod frontmatter validation)
- ✅ Error handling logic
- ✅ Helper functions and utilities

**Run unit tests:**
```bash
pnpm test:unit              # Run all unit tests
pnpm test:unit:watch        # Watch mode for development
pnpm test:unit:ui           # Interactive UI for debugging
pnpm test:unit:coverage     # Generate coverage report
```

### E2E Tests (Playwright)

Comprehensive end-to-end tests for user interactions and visual behavior:

- ✅ Homepage rendering and content
- ✅ Navigation and routing (internal and external links)
- ✅ User interactions (buttons, dropdowns, mobile menu)
- ✅ Dark mode toggle and persistence across navigation
- ✅ Accessibility (ARIA labels, keyboard navigation, heading hierarchy)
- ✅ Responsive behavior (desktop and mobile viewports)
- ✅ Click-outside-to-close behavior for dropdowns

**Run E2E tests:**
```bash
pnpm test:e2e              # Run all E2E tests headless
pnpm test:e2e:ui           # Open Playwright UI for interactive debugging
pnpm test:e2e:headed       # Run tests with browser visible
pnpm test:e2e:debug        # Run tests in debug mode
```

### Test Coverage

The project achieves comprehensive test coverage through a balanced testing pyramid:
- **Unit Tests:** 51 tests covering core business logic
- **E2E Tests:** Comprehensive user flow and interaction tests

### CI/CD

Tests automatically run on GitHub Actions for all pushes and pull requests to `main` and `dev` branches. Unit tests run first (fast feedback), followed by E2E tests.

## Project Structure

```
src/
├── components/           # Reusable components
│   ├── blog/             # Blog-specific components
│   └── common/           # Shared components
│       ├── Footer/       # Footer component
│       └── Navbar/       # Navigation component
├── data/                 # Data layer
│   └── blog/             # Blog service and types
│       ├── __tests__/    # Blog service unit tests
│       ├── blogService.ts # Blog data loading and filtering
│       ├── schemas.ts    # Zod validation schemas
│       └── types.ts      # TypeScript types
├── layouts/              # Layout components
│   └── MainLayout/       # Main layout wrapper
├── pages/                # Page components
│   ├── About/            # About page
│   ├── Blog/             # Blog page
│   │   └── __tests__/    # Blog component unit tests
│   └── BlogPost/         # Individual blog post page
├── test/                 # Test setup and utilities
│   └── setup.ts          # Vitest configuration
├── App.tsx               # Main App component with routing
├── App.css               # App-specific styles
├── main.tsx              # Entry point
└── index.css             # Global CSS & Tailwind config

e2e/                      # Playwright E2E tests
├── homepage.spec.ts      # Homepage tests
├── navigation.spec.ts    # Navigation & links tests
├── accessibility.spec.ts # Accessibility tests
├── dark-mode.spec.ts     # Dark mode tests
├── about-page.spec.ts    # About page tests
├── blog.spec.ts          # Blog page tests
└── blog-error-handling.spec.ts # Blog error handling tests

.claude/                  # Claude Code configuration
├── commands/             # Custom slash commands
│   ├── pre-commit.md
│   ├── security-check.md
│   └── self-review.md
└── settings.local.json   # Local settings
```

## Browser Compatibility

This website is optimized for the following browsers:

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- iOS Safari (latest 2 versions)
- Android Chrome (latest 2 versions)

## Deployment

The site is automatically deployed to **Cloudflare Pages** when changes are pushed to the `main` branch.

**Build Settings:**
- Build command: `pnpm build`
- Output directory: `dist`
- Node version: 22.x

## Copyright

© 2020-2025 Ralph King Jr. All rights reserved.

This is a personal portfolio website. The content, design, and code of this website are protected by copyright law. While visitors are welcome to view and draw inspiration from the site, unauthorized copying, modification, or distribution of the content or code is prohibited without express written permission.

## Author

**Ralph King Jr**

- Website: [kingralph.dev](https://kingralph.dev)
- GitHub: [@kingralph33](https://github.com/kingralph33)
- LinkedIn: [ralphkingjr](https://www.linkedin.com/in/ralphkingjr/)
