/**
 * Footer component unit tests
 * Tests footer rendering and copyright year logic
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from '../Footer';

describe('Footer Component', () => {
  describe('Rendering', () => {
    it('renders the footer element', () => {
      render(<Footer />);
      const footer = screen.getByRole('contentinfo');
      expect(footer).toBeInTheDocument();
    });

    it('has proper aria-label', () => {
      render(<Footer />);
      const footer = screen.getByLabelText('Footer');
      expect(footer).toBeInTheDocument();
    });

    it('displays copyright text with Ralph King', () => {
      render(<Footer />);
      expect(screen.getByText(/Ralph King/)).toBeInTheDocument();
      expect(screen.getByText(/All rights reserved/)).toBeInTheDocument();
    });

    it('displays the current year in copyright', () => {
      render(<Footer />);
      const currentYear = new Date().getFullYear();
      expect(screen.getByText(new RegExp(currentYear.toString()))).toBeInTheDocument();
    });

    it('displays the start year (2020) in copyright', () => {
      render(<Footer />);
      expect(screen.getByText(/2020/)).toBeInTheDocument();
    });

    it('displays year range in format "2020 - YYYY"', () => {
      render(<Footer />);
      const currentYear = new Date().getFullYear();
      const expectedText = `© 2020 - ${currentYear} Ralph King. All rights reserved.`;
      expect(screen.getByText(expectedText)).toBeInTheDocument();
    });
  });

  describe('Dynamic Year', () => {
    it('uses current year from Date object', () => {
      // Mock Date to return a specific year
      const mockDate = new Date('2025-01-15');
      vi.setSystemTime(mockDate);

      render(<Footer />);
      expect(screen.getByText(/2025/)).toBeInTheDocument();

      vi.useRealTimers();
    });
  });

  describe('Styling', () => {
    it('has proper CSS classes for layout', () => {
      render(<Footer />);
      const footer = screen.getByRole('contentinfo');
      expect(footer).toHaveClass('shadow-lg', 'mt-auto', 'footer-same-bg');
    });
  });
});
