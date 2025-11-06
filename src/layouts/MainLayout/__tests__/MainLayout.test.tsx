/**
 * MainLayout component unit tests
 * Tests layout structure and composition
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import MainLayout from '../MainLayout';

const renderMainLayout = (children: React.ReactNode = <div>Test Content</div>) => {
  return render(
    <BrowserRouter>
      <MainLayout>{children}</MainLayout>
    </BrowserRouter>
  );
};

describe('MainLayout Component', () => {
  describe('Structure', () => {
    it('renders the Navbar component', () => {
      renderMainLayout();
      // Navbar has a navigation landmark with aria-label
      const nav = screen.getByRole('navigation', { name: 'Main navigation' });
      expect(nav).toBeInTheDocument();
    });

    it('renders the Footer component', () => {
      renderMainLayout();
      // Footer has a contentinfo landmark
      const footer = screen.getByRole('contentinfo');
      expect(footer).toBeInTheDocument();
    });

    it('renders main content area', () => {
      renderMainLayout();
      const main = screen.getByRole('main');
      expect(main).toBeInTheDocument();
    });

    it('renders children inside main element', () => {
      renderMainLayout(<div data-testid="test-child">Child Content</div>);
      const child = screen.getByTestId('test-child');
      expect(child).toBeInTheDocument();
      
      const main = screen.getByRole('main');
      expect(main).toContainElement(child);
    });
  });

  describe('Accessibility', () => {
    it('has proper main landmark with aria-label', () => {
      renderMainLayout();
      const main = screen.getByLabelText('Main content');
      expect(main).toBeInTheDocument();
      expect(main).toHaveAttribute('role', 'main');
    });

    it('has proper semantic structure (nav, main, footer)', () => {
      renderMainLayout();
      expect(screen.getByRole('navigation')).toBeInTheDocument();
      expect(screen.getByRole('main')).toBeInTheDocument();
      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    });
  });

  describe('Layout Styling', () => {
    it('has flexbox layout classes', () => {
      const { container } = renderMainLayout();
      const layoutRoot = container.firstChild as HTMLElement;
      expect(layoutRoot).toHaveClass('min-h-screen', 'flex', 'flex-col');
    });

    it('has dark mode support classes', () => {
      const { container } = renderMainLayout();
      const layoutRoot = container.firstChild as HTMLElement;
      expect(layoutRoot).toHaveClass('dark:text-white');
    });

    it('main content has proper spacing classes', () => {
      renderMainLayout();
      const main = screen.getByRole('main');
      expect(main).toHaveClass('grow', 'flex', 'flex-col', 'pt-14', 'lg:pt-16');
    });

    it('main content has max-width and centering', () => {
      renderMainLayout();
      const main = screen.getByRole('main');
      expect(main).toHaveClass('max-w-7xl', 'mx-auto');
    });
  });

  describe('Content Rendering', () => {
    it('renders text content', () => {
      renderMainLayout(<p>Test paragraph</p>);
      expect(screen.getByText('Test paragraph')).toBeInTheDocument();
    });

    it('renders multiple children', () => {
      renderMainLayout(
        <>
          <h1>Title</h1>
          <p>Content</p>
        </>
      );
      expect(screen.getByText('Title')).toBeInTheDocument();
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('renders complex nested content', () => {
      renderMainLayout(
        <div>
          <section>
            <article>
              <h2>Article Title</h2>
            </article>
          </section>
        </div>
      );
      expect(screen.getByText('Article Title')).toBeInTheDocument();
    });
  });

  describe('Component Ordering', () => {
    it('renders components in correct order: Navbar, Main, Footer', () => {
      const { container } = renderMainLayout();
      const children = container.firstChild?.childNodes;
      
      // First child should be nav (Navbar)
      expect(children?.[0].nodeName).toBe('NAV');
      
      // Second child should be main
      expect(children?.[1].nodeName).toBe('MAIN');
      
      // Third child should be footer
      expect(children?.[2].nodeName).toBe('FOOTER');
    });
  });
});
