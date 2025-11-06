/**
 * Navbar component unit tests
 * Tests component behavior in isolation without full browser
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../Navbar';

// Mock window.open
const mockWindowOpen = vi.fn();
window.open = mockWindowOpen;

// Helper to render Navbar with Router
const renderNavbar = () => {
  return render(
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  );
};

describe('Navbar Component', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    // Reset mocks
    mockWindowOpen.mockClear();
  });

  afterEach(() => {
    // Clean up document modifications
    document.documentElement.classList.remove('dark');
  });

  describe('Rendering', () => {
    it('renders the logo/brand name', () => {
      renderNavbar();
      expect(screen.getByText('KingRalph.dev')).toBeInTheDocument();
    });

    it('renders desktop navigation links', () => {
      renderNavbar();
      const desktopMenu = screen.getByTestId('desktop-menu');
      expect(desktopMenu).toBeInTheDocument();
      expect(screen.getByTestId('desktop-about-link')).toBeInTheDocument();
      expect(screen.getByTestId('desktop-blog-link')).toBeInTheDocument();
      expect(screen.getByTestId('desktop-resume-link')).toBeInTheDocument();
    });

    it('renders social media links', () => {
      renderNavbar();
      expect(screen.getByTestId('desktop-github-link')).toBeInTheDocument();
      expect(screen.getByTestId('desktop-linkedin-link')).toBeInTheDocument();
    });

    it('renders affiliates dropdown button', () => {
      renderNavbar();
      expect(screen.getByTestId('desktop-affiliates-button')).toBeInTheDocument();
    });

    it('renders theme toggle button', () => {
      renderNavbar();
      expect(screen.getByTestId('desktop-theme-toggle')).toBeInTheDocument();
    });
  });

  describe('Mobile Menu Toggle', () => {
    it('mobile menu is hidden by default', () => {
      renderNavbar();
      const mobileMenu = screen.getByTestId('mobile-menu');
      expect(mobileMenu).toHaveClass('hidden');
    });

    it('toggles mobile menu visibility when clicking menu button', () => {
      renderNavbar();
      const menuButton = screen.getByLabelText('Toggle navigation menu');
      const mobileMenu = screen.getByTestId('mobile-menu');

      // Initially hidden
      expect(mobileMenu).toHaveClass('hidden');
      expect(menuButton).toHaveAttribute('aria-expanded', 'false');

      // Click to open
      fireEvent.click(menuButton);
      expect(mobileMenu).toHaveClass('block');
      expect(menuButton).toHaveAttribute('aria-expanded', 'true');

      // Click to close
      fireEvent.click(menuButton);
      expect(mobileMenu).toHaveClass('hidden');
      expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    });

    it('closes mobile menu when clicking a navigation link', () => {
      renderNavbar();
      const menuButton = screen.getByLabelText('Toggle navigation menu');
      const mobileMenu = screen.getByTestId('mobile-menu');

      // Open menu
      fireEvent.click(menuButton);
      expect(mobileMenu).toHaveClass('block');

      // Click about link
      const aboutLink = screen.getByTestId('mobile-about-link');
      fireEvent.click(aboutLink);

      // Menu should close
      expect(mobileMenu).toHaveClass('hidden');
    });
  });

  describe('Dark Mode Toggle', () => {
    it('starts in light mode by default when no preference saved', () => {
      renderNavbar();
      expect(document.documentElement.classList.contains('dark')).toBe(false);
      expect(localStorage.getItem('theme')).toBe('light');
    });

    it('toggles dark mode when clicking desktop theme button', () => {
      renderNavbar();
      const themeToggle = screen.getByTestId('desktop-theme-toggle');

      // Initially light mode
      expect(document.documentElement.classList.contains('dark')).toBe(false);

      // Toggle to dark
      fireEvent.click(themeToggle);
      expect(document.documentElement.classList.contains('dark')).toBe(true);
      expect(localStorage.getItem('theme')).toBe('dark');

      // Toggle back to light
      fireEvent.click(themeToggle);
      expect(document.documentElement.classList.contains('dark')).toBe(false);
      expect(localStorage.getItem('theme')).toBe('light');
    });

    it('loads dark mode preference from localStorage', () => {
      localStorage.setItem('theme', 'dark');
      renderNavbar();
      expect(document.documentElement.classList.contains('dark')).toBe(true);
    });

    it('updates aria-label when toggling theme', () => {
      renderNavbar();
      const themeToggle = screen.getByTestId('desktop-theme-toggle');

      // Initially shows "Switch to dark mode"
      expect(themeToggle).toHaveAttribute('aria-label', 'Switch to dark mode');

      // After toggle, shows "Switch to light mode"
      fireEvent.click(themeToggle);
      expect(themeToggle).toHaveAttribute('aria-label', 'Switch to light mode');
    });
  });

  describe('Affiliates Dropdown', () => {
    it('dropdown is closed by default', () => {
      renderNavbar();
      const dropdown = screen.queryByRole('menu', { name: 'Affiliates dropdown' });
      expect(dropdown).not.toBeInTheDocument();
    });

    it('opens dropdown when clicking affiliates button', () => {
      renderNavbar();
      const affiliatesButton = screen.getByTestId('desktop-affiliates-button');

      fireEvent.click(affiliatesButton);

      const dropdown = screen.getByRole('menu', { name: 'Affiliates dropdown' });
      expect(dropdown).toBeInTheDocument();
      expect(affiliatesButton).toHaveAttribute('aria-expanded', 'true');
    });

    it('closes dropdown when clicking affiliates button again', () => {
      renderNavbar();
      const affiliatesButton = screen.getByTestId('desktop-affiliates-button');

      // Open
      fireEvent.click(affiliatesButton);
      expect(screen.getByRole('menu', { name: 'Affiliates dropdown' })).toBeInTheDocument();

      // Close
      fireEvent.click(affiliatesButton);
      expect(screen.queryByRole('menu', { name: 'Affiliates dropdown' })).not.toBeInTheDocument();
    });

    it('displays affiliate links when dropdown is open', () => {
      renderNavbar();
      const affiliatesButton = screen.getByTestId('desktop-affiliates-button');

      fireEvent.click(affiliatesButton);

      expect(screen.getByRole('menuitem', { name: /systemdesignschool/ })).toBeInTheDocument();
      expect(screen.getByRole('menuitem', { name: /railway/ })).toBeInTheDocument();
    });

    it('opens affiliate link in new window when clicked', () => {
      renderNavbar();
      const affiliatesButton = screen.getByTestId('desktop-affiliates-button');

      fireEvent.click(affiliatesButton);

      const sdsLink = screen.getByRole('menuitem', { name: /systemdesignschool/ });
      fireEvent.click(sdsLink);

      expect(mockWindowOpen).toHaveBeenCalledWith(
        expect.stringContaining('systemdesignschool.io'),
        '_blank',
        'noopener noreferrer'
      );
    });

    it('closes dropdown after clicking affiliate link', () => {
      renderNavbar();
      const affiliatesButton = screen.getByTestId('desktop-affiliates-button');

      fireEvent.click(affiliatesButton);
      expect(screen.getByRole('menu', { name: 'Affiliates dropdown' })).toBeInTheDocument();

      const sdsLink = screen.getByRole('menuitem', { name: /systemdesignschool/ });
      fireEvent.click(sdsLink);

      expect(screen.queryByRole('menu', { name: 'Affiliates dropdown' })).not.toBeInTheDocument();
    });

    it('closes dropdown when clicking outside', async () => {
      const { container } = renderNavbar();
      const affiliatesButton = screen.getByTestId('desktop-affiliates-button');

      // Open dropdown
      fireEvent.click(affiliatesButton);
      expect(screen.getByRole('menu', { name: 'Affiliates dropdown' })).toBeInTheDocument();

      // Click outside (on the container)
      fireEvent.mouseDown(container);

      await waitFor(() => {
        expect(screen.queryByRole('menu', { name: 'Affiliates dropdown' })).not.toBeInTheDocument();
      });
    });
  });

  describe('Navigation Links', () => {
    it('about link has correct href', () => {
      renderNavbar();
      const aboutLink = screen.getByTestId('desktop-about-link');
      expect(aboutLink).toHaveAttribute('href', '/about');
    });

    it('blog link has correct href', () => {
      renderNavbar();
      const blogLink = screen.getByTestId('desktop-blog-link');
      expect(blogLink).toHaveAttribute('href', '/posts');
    });

    it('resume link opens in new tab', () => {
      renderNavbar();
      const resumeLink = screen.getByTestId('desktop-resume-link');
      expect(resumeLink).toHaveAttribute('href', 'https://kingralphresume.com/');
      expect(resumeLink).toHaveAttribute('target', '_blank');
      expect(resumeLink).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('github link opens in new tab', () => {
      renderNavbar();
      const githubLink = screen.getByTestId('desktop-github-link');
      expect(githubLink).toHaveAttribute('href', 'https://github.com/kingralph33');
      expect(githubLink).toHaveAttribute('target', '_blank');
      expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('linkedin link opens in new tab', () => {
      renderNavbar();
      const linkedinLink = screen.getByTestId('desktop-linkedin-link');
      expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/ralphkingjr/');
      expect(linkedinLink).toHaveAttribute('target', '_blank');
      expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  describe('Accessibility', () => {
    it('has proper navigation landmark', () => {
      renderNavbar();
      const nav = screen.getByRole('navigation', { name: 'Main navigation' });
      expect(nav).toBeInTheDocument();
    });

    it('mobile menu button has proper aria attributes', () => {
      renderNavbar();
      const menuButton = screen.getByLabelText('Toggle navigation menu');
      expect(menuButton).toHaveAttribute('aria-expanded');
      expect(menuButton).toHaveAttribute('type', 'button');
    });

    it('affiliates dropdown has proper aria attributes', () => {
      renderNavbar();
      const affiliatesButton = screen.getByTestId('desktop-affiliates-button');
      expect(affiliatesButton).toHaveAttribute('aria-haspopup', 'true');
      expect(affiliatesButton).toHaveAttribute('aria-expanded', 'false');
    });

    it('external links have descriptive aria-labels', () => {
      renderNavbar();
      const resumeLink = screen.getByTestId('desktop-resume-link');
      const githubLink = screen.getByTestId('desktop-github-link');
      const linkedinLink = screen.getByTestId('desktop-linkedin-link');

      expect(resumeLink).toHaveAttribute('aria-label', expect.stringContaining('opens in new tab'));
      expect(githubLink).toHaveAttribute('aria-label', expect.stringContaining('opens in new tab'));
      expect(linkedinLink).toHaveAttribute('aria-label', expect.stringContaining('opens in new tab'));
    });
  });
});
