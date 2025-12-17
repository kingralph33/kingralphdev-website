/**
 * About page component unit tests
 * Tests content rendering and page structure
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import About from '../About';

describe('About Page Component', () => {
  describe('Page Structure', () => {
    it('renders the main heading', () => {
      render(<About />);
      const heading = screen.getByRole('heading', { name: 'About Me', level: 1 });
      expect(heading).toBeInTheDocument();
    });

    it('renders profile image', () => {
      render(<About />);
      const image = screen.getByAltText('Ralph King Jr');
      expect(image).toBeInTheDocument();
    });

    it('profile image has correct attributes', () => {
      render(<About />);
      const image = screen.getByAltText('Ralph King Jr') as HTMLImageElement;
      expect(image).toHaveAttribute('src', '/images/profile2.webp');
      expect(image).toHaveAttribute('width', '150');
      expect(image).toHaveAttribute('height', '150');
      expect(image).toHaveAttribute('loading', 'eager');
    });
  });

  describe('Content Sections', () => {
    it('renders career transition section with banking background', () => {
      render(<About />);
      const bodyText = document.body.textContent;
      // Test that career transition story exists, not exact headings
      expect(bodyText).toContain('retail banking');
      expect(bodyText).toContain('2016');
    });

    it('renders professional summary with experience level', () => {
      render(<About />);
      const bodyText = document.body.textContent;
      // Test that professional experience is mentioned, not specific positioning language
      expect(bodyText).toMatch(/software engineer/i);
      expect(bodyText).toMatch(/experience/i);
    });

    it('renders key infrastructure metrics', () => {
      render(<About />);
      const bodyText = document.body.textContent;
      expect(bodyText).toContain('7,500');
      expect(bodyText).toContain('9 enterprise applications');
      expect(bodyText).toContain('70%');
    });

    it('renders personal life section', () => {
      render(<About />);
      const bodyText = document.body.textContent;
      expect(bodyText).toContain('husband and a father');
    });

    it('has multiple h2 section headings', () => {
      render(<About />);
      const h2Elements = screen.getAllByRole('heading', { level: 2 });
      // Should have several major sections
      expect(h2Elements.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe('Technology Tags', () => {
    it('renders technologies mentioned in the page', () => {
      render(<About />);
      // Check that key technologies are mentioned, but don't rely on exact section names
      const bodyText = document.body.textContent;
      expect(bodyText).toContain('Kubernetes');
      expect(bodyText).toContain('Python');
      expect(bodyText).toContain('TypeScript');
    });
  });

  describe('Impact Metrics', () => {
    it('renders key metrics and achievements', () => {
      render(<About />);
      // Check for numeric achievements mentioned in the page
      const bodyText = document.body.textContent;
      expect(bodyText).toContain('70%'); // release cycle improvement
      expect(bodyText).toContain('7,500'); // users
      expect(bodyText).toContain('9 enterprise applications');
    });
  });

  describe('Styling', () => {
    it('has responsive layout classes', () => {
      const { container } = render(<About />);
      const mainDiv = container.firstChild as HTMLElement;
      expect(mainDiv).toHaveClass('max-w-4xl', 'mx-auto', 'px-4', 'py-6', 'lg:py-10');
    });

    it('has dark mode support', () => {
      render(<About />);
      const heading = screen.getByRole('heading', { name: 'About Me' });
      expect(heading).toHaveClass('dark:text-white');
    });

    it('highlighted sections have proper styling', () => {
      render(<About />);
      const careerSection = screen.getByText(/My journey into tech/).closest('div') as HTMLElement;
      expect(careerSection).toHaveClass('bg-gray-100', 'dark:bg-gray-800', 'border-l-2', 'border-green-600');
    });
  });

  describe('Accessibility', () => {
    it('has proper heading hierarchy', () => {
      render(<About />);
      const h1Elements = screen.getAllByRole('heading', { level: 1 });
      const h2Elements = screen.getAllByRole('heading', { level: 2 });
      
      // Should have exactly one h1
      expect(h1Elements).toHaveLength(1);
      
      // Should have multiple h2 elements for sections
      expect(h2Elements.length).toBeGreaterThan(0);
    });

    it('profile image has alt text', () => {
      render(<About />);
      const image = screen.getByAltText('Ralph King Jr');
      expect(image).toHaveAttribute('alt');
    });
  });

  describe('Content Quality', () => {
    it('mentions key career milestones', () => {
      render(<About />);
      const bodyText = document.body.textContent;
      expect(bodyText).toContain('retail banking');
      expect(bodyText).toContain('bootcamp');
    });

    it('mentions current technical work', () => {
      render(<About />);
      const bodyText = document.body.textContent;
      // Test that technical work is mentioned, not exact positioning language
      expect(bodyText).toMatch(/infrastructure|automation|deployment/i);
      expect(bodyText).toMatch(/CI\/CD|pipeline/i);
    });

    it('includes personal values', () => {
      render(<About />);
      const bodyText = document.body.textContent;
      expect(bodyText).toContain('Family');
    });
  });
});
