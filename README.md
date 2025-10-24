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
- **Testing:** Playwright (E2E)
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
- `pnpm test` - Run Playwright E2E tests
- `pnpm test:ui` - Run tests in Playwright UI mode
- `pnpm test:headed` - Run tests with browser visible
- `pnpm test:debug` - Run tests in debug mode
- `pnpm lint` - Run ESLint
- `pnpm type-check` - Check TypeScript types

## Testing

The project uses **Playwright** for end-to-end testing with comprehensive coverage of user interactions and accessibility features. Tests are located in the `e2e/` directory and run in Chromium by default.

### Test Coverage

- ✅ Homepage rendering and content
- ✅ Navigation and routing (internal and external links)
- ✅ User interactions (buttons, dropdowns, mobile menu)
- ✅ Dark mode toggle and persistence across navigation
- ✅ Accessibility (ARIA labels, keyboard navigation, heading hierarchy)
- ✅ Responsive behavior (desktop and mobile viewports)
- ✅ Click-outside-to-close behavior for dropdowns

### Running Tests

```bash
pnpm test              # Run all tests headless
pnpm test:ui           # Open Playwright UI for interactive debugging
pnpm test:headed       # Run tests with browser visible
pnpm test:debug        # Run tests in debug mode
```

### CI/CD

Tests automatically run on GitHub Actions for all pushes and pull requests to `main` and `dev` branches.

## Project Structure

```
src/
├── components/           # Reusable components
│   └── common/           # Shared components
│       ├── Footer/       # Footer component
│       └── Navbar/       # Navigation component
├── layouts/              # Layout components
│   └── MainLayout/       # Main layout wrapper
├── pages/                # Page components
│   └── About/            # About page
├── App.tsx               # Main App component with routing
├── App.css               # App-specific styles
├── main.tsx              # Entry point
└── index.css             # Global CSS & Tailwind config

e2e/                      # Playwright E2E tests
├── homepage.spec.ts      # Homepage tests
├── navigation.spec.ts    # Navigation & links tests
├── accessibility.spec.ts # Accessibility tests
├── dark-mode.spec.ts     # Dark mode tests
└── about-page.spec.ts    # About page tests

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
