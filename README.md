# KingRalph.dev - Personal Portfolio Website

[![Netlify Status](https://api.netlify.com/api/v1/badges/986f586a-2b5f-45d3-ab7d-7876363a41a6/deploy-status)](https://app.netlify.com/sites/mystifying-easley-c1f16f/deploys)
[![Tests](https://github.com/kingralph33/kingralphdev-react/actions/workflows/test/badge.svg)](https://github.com/kingralph33/kingralphdev-react/actions/workflows/test)

A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS. This site showcases my professional experience, skills, and projects.

## Features

- 🌓 Dark Mode Support (System preference based)
- 📱 Fully Responsive Design
- ⚡ Fast Performance with Vite
- 🎨 Modern UI with Tailwind CSS
- 🧪 Comprehensive Test Coverage
- ♿ Accessibility Focused
- 🔍 SEO Optimized

## Tech Stack

- **Framework:** React 19
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Build Tool:** Vite
- **Testing:** Jest + React Testing Library
- **Routing:** React Router v7
- **Icons:** Heroicons + React Icons
- **Deployment:** Netlify

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
- `pnpm test` - Run tests
- `pnpm test:watch` - Run tests in watch mode
- `pnpm test:coverage` - Run tests with coverage report
- `pnpm lint` - Run ESLint

## Testing

The project includes comprehensive test coverage using Jest and React Testing Library. We aim to achieve high code coverage, with tests for all core components and critical user interactions. The project uses a mix of unit and integration tests to ensure the reliability of the application. Tests are located next to the component they are testing. Test cover:

- Component rendering (all key components are rendered)
- User interactions (the buttons, forms, and other interactive elements)
- Navigation (all routes can be reached)
- Dark mode functionality (that it switches properly)
- Accessibility features (alt text, and button labels)

Run tests with:

```bash
pnpm test
```

## Project Structure

```
src/
├── components/         # Reusable components
│   ├── common/        # Shared components (Navbar, Footer)
│   └── resume/        # Resume-specific components
├── layouts/           # Layout components
├── pages/            # Page components
│   ├── About/
│   └── Resume/
├── styles/           # Global styles
└── assets/          # Static assets
```

## Deployment

The site is automatically deployed to Netlify when changes are pushed to the main branch.

## Copyright

© 2020-2025 Ralph King Jr. All rights reserved.

This is a personal portfolio website. The content, design, and code of this website are protected by copyright law. While visitors are welcome to view and draw inspiration from the site, unauthorized copying, modification, or distribution of the content or code is prohibited without express written permission.

## Author

**Ralph King Jr**

- Website: [kingralph.dev](https://kingralph.dev)
- GitHub: [@kingralph33](https://github.com/kingralph33)
- LinkedIn: [ralphkingjr](https://www.linkedin.com/in/ralphkingjr/)
