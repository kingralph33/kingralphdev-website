import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./Navbar";

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("Navbar", () => {
  beforeEach(() => {
    renderWithRouter(<Navbar />);
  });

  it("renders the logo/site name", () => {
    expect(screen.getByText("KingRalph.dev")).toBeInTheDocument();
  });

  it("renders navigation links", () => {
    // Get all About links and check at least one exists
    const aboutLinks = screen.getAllByText("About");
    expect(aboutLinks.length).toBeGreaterThan(0);
    
    // Get all Resume links and check at least one exists
    const resumeLinks = screen.getAllByText("Resume");
    expect(resumeLinks.length).toBeGreaterThan(0);
    
    // Get the desktop Resume link element (the one within the md:flex container)
    const desktopNav = screen.getByTestId("desktop-menu");
    const resumeLink = desktopNav.querySelector('a[href="https://kingralphresume.com/"]');
    expect(resumeLink).toBeInTheDocument();
    expect(resumeLink).toHaveAttribute('target', '_blank');
    expect(resumeLink).toHaveAttribute('rel', 'noopener noreferrer');
    expect(resumeLink).toHaveAttribute('aria-label', 'Resume, opens in new tab');
  });

  it("renders social media links with proper accessibility attributes", () => {
    // Test GitHub link in the desktop menu
    const desktopNav = screen.getByTestId("desktop-menu");
    const githubLink = desktopNav.querySelector('a[href="https://github.com/kingralph33"]');
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
    expect(githubLink).toHaveAttribute('aria-label', 'GitHub profile, opens in new tab');
    
    // Test LinkedIn link in the desktop menu
    const linkedinLink = desktopNav.querySelector('a[href="https://www.linkedin.com/in/ralphkingjr/"]');
    expect(linkedinLink).toBeInTheDocument();
    expect(linkedinLink).toHaveAttribute('target', '_blank');
    expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer');
    expect(linkedinLink).toHaveAttribute('aria-label', 'LinkedIn profile, opens in new tab');
  });

  it("includes proper navigation ARIA attributes", () => {
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveAttribute('aria-label', 'Main navigation');
  });

  // New tests for mobile hamburger menu
  it("renders a hamburger menu button for mobile view", () => {
    const menuButton = screen.getByLabelText('Toggle navigation menu');
    expect(menuButton).toBeInTheDocument();
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');
  });

  it("toggles mobile menu visibility when hamburger button is clicked", () => {
    const menuButton = screen.getByLabelText('Toggle navigation menu');
    
    // Mobile menu should be hidden initially
    const mobileMenu = screen.getByTestId('mobile-menu');
    expect(mobileMenu).toHaveClass('hidden');
    
    // Click the hamburger menu button
    fireEvent.click(menuButton);
    
    // Mobile menu should be visible after clicking
    expect(mobileMenu).toHaveClass('block');
    expect(menuButton).toHaveAttribute('aria-expanded', 'true');
    
    // Click the hamburger menu button again
    fireEvent.click(menuButton);
    
    // Mobile menu should be hidden again
    expect(mobileMenu).toHaveClass('hidden');
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');
  });

  it("closes mobile menu when a navigation link is clicked", () => {
    const menuButton = screen.getByLabelText('Toggle navigation menu');
    
    // Open the mobile menu
    fireEvent.click(menuButton);
    const mobileMenu = screen.getByTestId('mobile-menu');
    expect(mobileMenu).toHaveClass('block');
    
    // Find and click About link in mobile menu
    const aboutLink = mobileMenu.querySelector('a[href="/about"]');
    if (aboutLink) {
      fireEvent.click(aboutLink);
      // Mobile menu should be hidden after clicking
      expect(mobileMenu).toHaveClass('hidden');
    } else {
      throw new Error('Mobile About link not found');
    }
  });

  it("makes menu button toggle between hamburger and X icon", () => {
    const menuButton = screen.getByLabelText('Toggle navigation menu');
    
    // Initially should have the hamburger icon (3 lines)
    expect(menuButton.innerHTML).toContain('M4 6h16M4 12h16M4 18h16');
    
    // After clicking, should change to X icon
    fireEvent.click(menuButton);
    expect(menuButton.innerHTML).toContain('M6 18L18 6M6 6l12 12');
    
    // After clicking again, should revert to hamburger icon
    fireEvent.click(menuButton);
    expect(menuButton.innerHTML).toContain('M4 6h16M4 12h16M4 18h16');
  });
});
