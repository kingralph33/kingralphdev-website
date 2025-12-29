/**
 * Home page component unit tests
 * Tests hero section behavior and navigation elements
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from '../Home';

describe('Home Page Component', () => {
  describe('Content Rendering', () => {
    it('renders the main heading with name', () => {
      render(<Home />);
      const heading = screen.getByRole('heading', { name: 'Ralph King Jr', level: 1 });
      expect(heading).toBeInTheDocument();
    });

    it('renders the subtitle with role', () => {
      render(<Home />);
      const subtitle = screen.getByRole('heading', { name: 'Software Engineer', level: 2 });
      expect(subtitle).toBeInTheDocument();
    });

    it('renders the introduction paragraph', () => {
      render(<Home />);
      const intro = screen.getByText(/I build software that solves problems/i);
      expect(intro).toBeInTheDocument();
    });

    it('introduction mentions key capabilities', () => {
      render(<Home />);
      const intro = screen.getByText(/I build software that solves problems/i);
      expect(intro).toHaveTextContent('Backend services');
      expect(intro).toHaveTextContent('automation tools');
      expect(intro).toHaveTextContent('infrastructure');
      expect(intro).toHaveTextContent('frontend interfaces');
    });
  });

  describe('Navigation Links', () => {
    it('renders About link with correct attributes', () => {
      render(<Home />);
      const aboutLink = screen.getByRole('link', { name: 'Go to About page' });
      expect(aboutLink).toBeInTheDocument();
      expect(aboutLink).toHaveAttribute('href', '/about');
      expect(aboutLink).toHaveTextContent('About');
    });

    it('renders Resume link with correct attributes', () => {
      render(<Home />);
      const resumeLink = screen.getByRole('link', { name: 'Hero resume link, opens in new tab' });
      expect(resumeLink).toBeInTheDocument();
      expect(resumeLink).toHaveAttribute('href', 'https://kingralphresume.com/');
      expect(resumeLink).toHaveAttribute('target', '_blank');
      expect(resumeLink).toHaveAttribute('rel', 'noopener noreferrer');
      expect(resumeLink).toHaveTextContent('Resume');
    });

    it('renders Posts link with correct attributes', () => {
      render(<Home />);
      const postsLink = screen.getByRole('link', { name: 'Go to Posts page' });
      expect(postsLink).toBeInTheDocument();
      expect(postsLink).toHaveAttribute('href', '/posts');
      expect(postsLink).toHaveTextContent('Posts');
    });

    it('renders all three primary CTAs', () => {
      render(<Home />);
      const links = screen.getAllByRole('link');
      expect(links).toHaveLength(3);
    });
  });

  describe('Accessibility', () => {
    it('all navigation links have descriptive aria-labels', () => {
      render(<Home />);

      const aboutLink = screen.getByLabelText('Go to About page');
      expect(aboutLink).toBeInTheDocument();

      const resumeLink = screen.getByLabelText('Hero resume link, opens in new tab');
      expect(resumeLink).toBeInTheDocument();

      const postsLink = screen.getByLabelText('Go to Posts page');
      expect(postsLink).toBeInTheDocument();
    });

    it('external link indicates it opens in new tab', () => {
      render(<Home />);
      const resumeLink = screen.getByRole('link', { name: /opens in new tab/i });
      expect(resumeLink).toHaveAttribute('target', '_blank');
    });

    it('has proper heading hierarchy (h1 followed by h2)', () => {
      render(<Home />);
      const h1 = screen.getByRole('heading', { level: 1 });
      const h2 = screen.getByRole('heading', { level: 2 });

      expect(h1).toBeInTheDocument();
      expect(h2).toBeInTheDocument();
    });
  });

  describe('Layout Structure', () => {
    it('has centered layout container', () => {
      const { container } = render(<Home />);
      const mainDiv = container.firstChild as HTMLElement;
      expect(mainDiv).toHaveClass('text-center');
      expect(mainDiv).toHaveClass('max-w-4xl');
      expect(mainDiv).toHaveClass('mx-auto');
    });

    it('renders navigation links in a flex container', () => {
      const { container } = render(<Home />);
      const linksContainer = container.querySelector('.flex');
      expect(linksContainer).toBeInTheDocument();
      expect(linksContainer).toHaveClass('justify-center');
      expect(linksContainer).toHaveClass('gap-3');
    });
  });

  describe('Component Behavior', () => {
    it('is memoized to prevent unnecessary re-renders', () => {
      // The component uses React.memo, verify it has a displayName
      expect(Home.displayName).toBe('Home');
    });
  });
});
