import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import MainLayout from './MainLayout';

// Helper to render with router context
const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('MainLayout', () => {
  it('renders children within the main element', () => {
    renderWithRouter(
      <MainLayout>
        <div>Test Content</div>
      </MainLayout>
    );
    
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('renders Navbar component', () => {
    renderWithRouter(<MainLayout><div>Content</div></MainLayout>);
    
    // Check for navbar by its aria-label
    const navbar = screen.getByRole('navigation', { name: 'Main navigation' });
    expect(navbar).toBeInTheDocument();
  });

  it('renders Footer component', () => {
    renderWithRouter(<MainLayout><div>Content</div></MainLayout>);
    
    // Check for footer
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
    expect(screen.getByText(/Ralph King. All rights reserved./i)).toBeInTheDocument();
  });

  it('has correct main element structure and styling', () => {
    renderWithRouter(<MainLayout><div>Content</div></MainLayout>);
    
    const main = screen.getByRole('main');
    expect(main).toHaveAttribute('aria-label', 'Main content');
    expect(main).toHaveClass('grow');
    expect(main).toHaveClass('flex');
    expect(main).toHaveClass('flex-col');
    expect(main).toHaveClass('pt-14');
    expect(main).toHaveClass('lg:pt-16');
  });

  it('has correct container structure for dark mode', () => {
    renderWithRouter(<MainLayout><div>Content</div></MainLayout>);
    
    // The outermost div should have flexbox and dark mode classes
    const container = screen.getByRole('main').parentElement;
    expect(container).toHaveClass('min-h-screen');
    expect(container).toHaveClass('flex');
    expect(container).toHaveClass('flex-col');
    expect(container).toHaveClass('dark:bg-gray-900');
    expect(container).toHaveClass('dark:text-white');
  });

  it('renders multiple children correctly', () => {
    renderWithRouter(
      <MainLayout>
        <div>First Child</div>
        <div>Second Child</div>
      </MainLayout>
    );
    
    expect(screen.getByText('First Child')).toBeInTheDocument();
    expect(screen.getByText('Second Child')).toBeInTheDocument();
  });
});
