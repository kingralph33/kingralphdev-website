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

The project includes comprehensive test coverage using Jest and React Testing Library. I aim to achieve high code coverage, with tests for all core components and critical user interactions. The project uses a mix of unit and integration tests to ensure the reliability of the application. Tests are located next to the component they are testing. Test cover:

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
├── components/           # Reusable components
│   ├── common/           # Shared components
│   │   ├── Footer/       # Footer component with tests
│   │   └── Navbar/       # Navigation component with tests
├── layouts/              # Layout components
│   └── MainLayout/       # Main layout with tests
├── pages/                # Page components
│   └── About/            # About page with tests
├── styles/               # Global styles
│   └── fonts.css         # Font definitions
├── assets/               # Static assets
├── App.tsx               # Main App component
├── App.css               # App-specific styles
├── main.tsx              # Entry point
└── index.css             # Global CSS
```

## Browser Compatibility

This website is optimized for the following browsers:

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- iOS Safari (latest 2 versions)
- Android Chrome (latest 2 versions)

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
