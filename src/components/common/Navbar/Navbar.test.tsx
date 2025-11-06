import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './Navbar';

// Helper to render with router context
const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('Navbar', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  describe('Rendering and Structure', () => {
    it('renders the navbar with correct aria-label', () => {
      renderWithRouter(<Navbar />);
      const nav = screen.getByRole('navigation', { name: 'Main navigation' });
      expect(nav).toBeInTheDocument();
    });

    it('renders the KingRalph.dev logo/link', () => {
      renderWithRouter(<Navbar />);
      const logo = screen.getByText('KingRalph.dev');
      expect(logo).toBeInTheDocument();
      expect(logo.closest('a')).toHaveAttribute('href', '/');
    });

    it('renders desktop menu with all links', () => {
      renderWithRouter(<Navbar />);
      expect(screen.getByTestId('desktop-menu')).toBeInTheDocument();
      expect(screen.getByTestId('desktop-about-link')).toBeInTheDocument();
      expect(screen.getByTestId('desktop-resume-link')).toBeInTheDocument();
      expect(screen.getByTestId('desktop-github-link')).toBeInTheDocument();
      expect(screen.getByTestId('desktop-linkedin-link')).toBeInTheDocument();
    });

    it('renders mobile menu toggle button', () => {
      renderWithRouter(<Navbar />);
      const menuButton = screen.getByLabelText('Toggle navigation menu');
      expect(menuButton).toBeInTheDocument();
      expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    });
  });

  describe('Mobile Menu Toggle', () => {
    it('toggles mobile menu when button is clicked', async () => {
      renderWithRouter(<Navbar />);
      const menuButton = screen.getByLabelText('Toggle navigation menu');
      
      // Initially closed
      expect(menuButton).toHaveAttribute('aria-expanded', 'false');
      
      // Click to open
      fireEvent.click(menuButton);
      await waitFor(() => {
        expect(menuButton).toHaveAttribute('aria-expanded', 'true');
      });
      
      // Mobile menu should be visible
      const mobileMenu = screen.getByTestId('mobile-menu');
      expect(mobileMenu).toBeVisible();
      
      // Click to close
      fireEvent.click(menuButton);
      await waitFor(() => {
        expect(menuButton).toHaveAttribute('aria-expanded', 'false');
      });
    });

    it('closes mobile menu when a link is clicked', async () => {
      renderWithRouter(<Navbar />);
      const menuButton = screen.getByLabelText('Toggle navigation menu');
      
      // Open menu
      fireEvent.click(menuButton);
      await waitFor(() => {
        expect(menuButton).toHaveAttribute('aria-expanded', 'true');
      });
      
      // Click a link
      const aboutLink = screen.getByTestId('mobile-about-link');
      fireEvent.click(aboutLink);
      
      // Menu should close
      await waitFor(() => {
        expect(menuButton).toHaveAttribute('aria-expanded', 'false');
      });
    });
  });

  describe('Dark Mode Toggle', () => {
    it('initializes dark mode from localStorage', () => {
      localStorage.setItem('theme', 'dark');
      renderWithRouter(<Navbar />);
      
      // Check that dark class is added
      expect(document.documentElement.classList.contains('dark')).toBe(true);
    });

    it('toggles dark mode on desktop', async () => {
      renderWithRouter(<Navbar />);
      const toggleButton = screen.getByTestId('desktop-theme-toggle');
      
      // Initially light mode
      expect(document.documentElement.classList.contains('dark')).toBe(false);
      
      // Toggle to dark
      fireEvent.click(toggleButton);
      await waitFor(() => {
        expect(document.documentElement.classList.contains('dark')).toBe(true);
      });
      expect(localStorage.getItem('theme')).toBe('dark');
      
      // Toggle back to light
      fireEvent.click(toggleButton);
      await waitFor(() => {
        expect(document.documentElement.classList.contains('dark')).toBe(false);
      });
      expect(localStorage.getItem('theme')).toBe('light');
    });

    it('toggles dark mode on mobile', async () => {
      renderWithRouter(<Navbar />);
      
      // Open mobile menu
      const menuButton = screen.getByLabelText('Toggle navigation menu');
      fireEvent.click(menuButton);
      
      const toggleButton = screen.getByTestId('mobile-theme-toggle');
      
      // Toggle to dark
      fireEvent.click(toggleButton);
      await waitFor(() => {
        expect(document.documentElement.classList.contains('dark')).toBe(true);
      });
      expect(localStorage.getItem('theme')).toBe('dark');
    });

    it('uses system preference when no localStorage value exists', () => {
      // Mock matchMedia to return dark mode preference
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: vi.fn().mockImplementation((query: string) => ({
          matches: query === '(prefers-color-scheme: dark)',
          media: query,
          onchange: null,
          addListener: vi.fn(),
          removeListener: vi.fn(),
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
          dispatchEvent: vi.fn(),
        })),
      });
      
      renderWithRouter(<Navbar />);
      // Should use system preference (dark)
      expect(document.documentElement.classList.contains('dark')).toBe(true);
    });
  });

  describe('Affiliates Dropdown', () => {
    it('toggles affiliates dropdown when button is clicked', async () => {
      renderWithRouter(<Navbar />);
      const affiliatesButton = screen.getByTestId('desktop-affiliates-button');
      
      expect(affiliatesButton).toHaveAttribute('aria-expanded', 'false');
      
      // Open dropdown
      fireEvent.click(affiliatesButton);
      await waitFor(() => {
        expect(affiliatesButton).toHaveAttribute('aria-expanded', 'true');
      });
      
      // Check if dropdown menu items are visible - use getAllByText since both desktop and mobile exist
      const systemDesignLinks = screen.getAllByText(/Discount for systemdesignschool.io/i);
      const railwayLinks = screen.getAllByText(/Discount for railway.com/i);
      expect(systemDesignLinks[0]).toBeVisible();
      expect(railwayLinks[0]).toBeVisible();
    });

    it('opens affiliate link in new tab when clicked', async () => {
      const windowOpenSpy = vi.spyOn(window, 'open').mockImplementation(() => null);
      
      renderWithRouter(<Navbar />);
      const affiliatesButton = screen.getByTestId('desktop-affiliates-button');
      
      // Open dropdown
      fireEvent.click(affiliatesButton);
      
      // Click affiliate link - use getAllByText and get first one (desktop)
      const affiliateLinks = screen.getAllByText(/Discount for systemdesignschool.io/i);
      fireEvent.click(affiliateLinks[0]);
      
      await waitFor(() => {
        expect(windowOpenSpy).toHaveBeenCalledWith(
          expect.stringContaining('systemdesignschool.io'),
          '_blank',
          'noopener noreferrer'
        );
      });
      
      windowOpenSpy.mockRestore();
    });

    it('closes dropdown when clicking outside', async () => {
      renderWithRouter(<Navbar />);
      const affiliatesButton = screen.getByTestId('desktop-affiliates-button');
      
      // Open dropdown
      fireEvent.click(affiliatesButton);
      await waitFor(() => {
        expect(affiliatesButton).toHaveAttribute('aria-expanded', 'true');
      });
      
      // Click outside (on the logo)
      const logo = screen.getByText('KingRalph.dev');
      fireEvent.mouseDown(logo);
      
      await waitFor(() => {
        expect(affiliatesButton).toHaveAttribute('aria-expanded', 'false');
      });
    });

    it('closes dropdown and mobile menu when affiliate link is clicked', async () => {
      const windowOpenSpy = vi.spyOn(window, 'open').mockImplementation(() => null);
      
      renderWithRouter(<Navbar />);
      
      // Open mobile menu
      const menuButton = screen.getByLabelText('Toggle navigation menu');
      fireEvent.click(menuButton);
      
      // Open affiliates dropdown
      const affiliatesButton = screen.getByTestId('mobile-affiliates-button');
      fireEvent.click(affiliatesButton);
      
      // Click affiliate link - use getAllByText to get the mobile version (second one)
      const affiliateLinks = screen.getAllByText(/Discount for railway.com/i);
      fireEvent.click(affiliateLinks[affiliateLinks.length - 1]); // Get last one (mobile)
      
      await waitFor(() => {
        expect(windowOpenSpy).toHaveBeenCalled();
        expect(menuButton).toHaveAttribute('aria-expanded', 'false');
      });
      
      windowOpenSpy.mockRestore();
    });
  });

  describe('External Links', () => {
    it('renders resume link with correct attributes', () => {
      renderWithRouter(<Navbar />);
      const resumeLink = screen.getByTestId('desktop-resume-link');
      
      expect(resumeLink).toHaveAttribute('href', 'https://kingralphresume.com/');
      expect(resumeLink).toHaveAttribute('target', '_blank');
      expect(resumeLink).toHaveAttribute('rel', 'noopener noreferrer');
      expect(resumeLink).toHaveAttribute('aria-label', 'Resume, opens in new tab');
    });

    it('renders GitHub link with correct attributes', () => {
      renderWithRouter(<Navbar />);
      const githubLink = screen.getByTestId('desktop-github-link');
      
      expect(githubLink).toHaveAttribute('href', 'https://github.com/kingralph33');
      expect(githubLink).toHaveAttribute('target', '_blank');
      expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('renders LinkedIn link with correct attributes', () => {
      renderWithRouter(<Navbar />);
      const linkedinLink = screen.getByTestId('desktop-linkedin-link');
      
      expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/ralphkingjr/');
      expect(linkedinLink).toHaveAttribute('target', '_blank');
      expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });
});
