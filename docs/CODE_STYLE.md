# Code Style Guide

This document outlines the coding conventions and best practices for the kingralphdev-react project.

## General Principles

- Write clean, readable, and maintainable code
- Favor clarity over cleverness
- Be consistent with existing patterns in the codebase
- Follow the principle of least surprise

## TypeScript

### Types and Interfaces

- Use TypeScript interfaces for props and state
- Prefer interfaces over type aliases for object types
- Use type aliases for union types, tuples, and function types
- Export types/interfaces that are used in multiple files
- Use descriptive names for interfaces (avoid `I` prefix)

```tsx
// Good
interface ButtonProps {
  variant: 'primary' | 'secondary';
  label: string;
  onClick: () => void;
  disabled?: boolean;
}

// Avoid
interface IButtonProps {
  v: string;
  l: string;
  o: () => void;
  d?: boolean;
}
```

### Type Annotations

- Let TypeScript infer types when obvious
- Explicitly type function parameters and return types
- Always type component props
- Use generics when appropriate

## React Components

### Component Structure

- Use functional components with hooks
- One component per file
- Co-locate test files with component files
- Keep components focused (single responsibility)
- Extract reusable logic into custom hooks

### Props

- Destructure props in function parameters
- Provide default values for optional props
- Use sensible prop names matching HTML where appropriate

```tsx
// Good
function Button({ variant = 'primary', label, onClick, disabled = false }: ButtonProps) {
  // ...
}

// Avoid
function Button(props: ButtonProps) {
  const variant = props.variant || 'primary';
  const disabled = props.disabled === undefined ? false : props.disabled;
  // ...
}
```

### State Management

- Use `useState` for component-local state
- Use `useReducer` for complex state logic
- Keep related state together

### Effects

- Minimize the use of effects
- Keep effects focused on a single concern
- Always specify dependencies
- Clean up side effects

```tsx
// Good
useEffect(() => {
  const handler = () => {
    // ...
  };
  window.addEventListener('resize', handler);
  return () => {
    window.removeEventListener('resize', handler);
  };
}, []);

// Avoid
useEffect(() => {
  window.addEventListener('resize', () => {
    // ...
  });
  // No cleanup
}, []); // eslint-disable-line react-hooks/exhaustive-deps
```

## Styling

### Tailwind CSS

- Use Tailwind utility classes for styling
- Group related classes together
- Extract common patterns to components
- Use meaningful class order (layout, typography, visual)

```tsx
// Good
<button className="px-4 py-2 font-medium text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2">
  Click me
</button>

// Avoid
<button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white focus:ring-2 rounded font-medium focus:outline-none">
  Click me
</button>
```

## Testing

### Component Tests

- Test behavior, not implementation
- Focus on user interactions
- Test accessibility concerns
- Mock external dependencies

```tsx
// Good
test('shows success message when form submitted with valid data', async () => {
  render(<ContactForm />);
  await userEvent.type(screen.getByLabelText(/name/i), 'John Doe');
  await userEvent.type(screen.getByLabelText(/email/i), 'john@example.com');
  await userEvent.click(screen.getByRole('button', { name: /submit/i }));
  expect(screen.getByText(/thanks for your message/i)).toBeInTheDocument();
});
```

### Test Organization

- Co-locate test files with implementation files
- Group related tests with `describe` blocks
- Use clear test names describing behavior

## File and Folder Naming

- Use PascalCase for component files and folders
- Use camelCase for utility files
- Use kebab-case for CSS files
- Group related components in folders
- Tests should have `.test` or `.spec` suffix

## Import Order

1. External libraries
2. Internal modules
3. Components
4. Styles
5. Types/interfaces
6. Assets

```tsx
// External libraries
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Internal modules
import { formatDate } from '../../utils/date';

// Components
import Button from '../common/Button';

// Styles
import './ComponentName.css';

// Types
import type { ComponentNameProps } from './types';

// Assets
import logo from '../../assets/logo.svg';
```

## Git Commit Messages

- Use conventional commit format
- Write descriptive commit messages
- Reference issue numbers when applicable

```
feat: add dark mode toggle
fix: resolve overflow in mobile navigation
docs: update README with setup instructions
test: add tests for resume components
refactor: simplify job entry rendering logic
```

## Code Comments

- Prefer self-documenting code
- Use comments to explain "why", not "what"
- Document complex logic or algorithms
- Use JSDoc for public APIs and components

```tsx
// Good
// Using setTimeout to avoid layout thrashing during animations
setTimeout(() => {
  recalculateLayout();
}, 100);

// Avoid
// Set timeout
setTimeout(() => {
  // Recalculate layout
  recalculateLayout();
}, 100);
```