import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./Navbar";

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("Navbar", () => {
  it("renders the Affiliates button in the desktop menu", () => {
    const desktopNav = screen.getByTestId("desktop-menu");
    const affiliatesButton = screen.getByRole("button", { name: /Affiliates/i });
    expect(affiliatesButton).toBeInTheDocument();
    expect(desktopNav).toContainElement(affiliatesButton);
  });

  it("shows and hides the Affiliates dropdown when clicked", () => {
    const affiliatesButton = screen.getByRole("button", { name: /Affiliates/i });
    // Dropdown should not be visible initially
    expect(screen.queryByText("Discount for systemdesignschool.io")).not.toBeInTheDocument();
    // Click to open
    fireEvent.click(affiliatesButton);
    expect(screen.getByText("Discount for systemdesignschool.io")).toBeInTheDocument();
    // Click again to close
    fireEvent.click(affiliatesButton);
    expect(screen.queryByText("Discount for systemdesignschool.io")).not.toBeInTheDocument();
  });

  it("opens System Design School link in a new tab when dropdown item is clicked", () => {
    const affiliatesButton = screen.getByRole("button", { name: /Affiliates/i });
    fireEvent.click(affiliatesButton);
    const discountButton = screen.getByText("Discount for systemdesignschool.io");
    // Mock window.open
    const openSpy = jest.spyOn(window, "open").mockImplementation(() => null);
    fireEvent.click(discountButton);
    expect(openSpy).toHaveBeenCalledWith(
      "https://systemdesignschool.io/?linkId=lp_110319&sourceId=ralph-king&tenantId=system-design-school",
      "_blank",
      "noopener noreferrer"
    );
    openSpy.mockRestore();
  });
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

  it("closes mobile menu when external links are clicked", () => {
    const menuButton = screen.getByLabelText('Toggle navigation menu');
    
    // Open the mobile menu
    fireEvent.click(menuButton);
    const mobileMenu = screen.getByTestId('mobile-menu');
    expect(mobileMenu).toHaveClass('block');
    
    // Click Resume link in mobile menu
    const resumeLink = mobileMenu.querySelector('a[href="https://kingralphresume.com/"]');
    if (resumeLink) {
      fireEvent.click(resumeLink);
      expect(mobileMenu).toHaveClass('hidden');
    }
    
    // Re-open menu to test GitHub link
    fireEvent.click(menuButton);
    expect(mobileMenu).toHaveClass('block');
    
    // Click GitHub link in mobile menu
    const githubLink = mobileMenu.querySelector('a[href="https://github.com/kingralph33"]');
    if (githubLink) {
      fireEvent.click(githubLink);
      expect(mobileMenu).toHaveClass('hidden');
    }
    
    // Re-open menu to test LinkedIn link
    fireEvent.click(menuButton);
    expect(mobileMenu).toHaveClass('block');
    
    // Click LinkedIn link in mobile menu
    const linkedinLink = mobileMenu.querySelector('a[href="https://www.linkedin.com/in/ralphkingjr/"]');
    if (linkedinLink) {
      fireEvent.click(linkedinLink);
      expect(mobileMenu).toHaveClass('hidden');
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

  // Additional comprehensive tests for better coverage
  it("supports keyboard navigation", () => {
    const menuButton = screen.getByLabelText('Toggle navigation menu');
    
    // Test Tab navigation
    menuButton.focus();
    expect(document.activeElement).toBe(menuButton);
  });

  it("has proper ARIA state management", () => {
    const menuButton = screen.getByLabelText('Toggle navigation menu');
    const mobileMenu = screen.getByTestId('mobile-menu');
    
    // Initially closed
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    expect(mobileMenu).toHaveClass('hidden');
    
    // After opening
    fireEvent.click(menuButton);
    expect(menuButton).toHaveAttribute('aria-expanded', 'true');
    expect(mobileMenu).toHaveClass('block');
  });

  it("renders correct number of navigation links", () => {
    const desktopNav = screen.getByTestId("desktop-menu");
    const mobileMenu = screen.getByTestId("mobile-menu");
    
    // Desktop should have About link, Resume link, GitHub link, LinkedIn link
    expect(desktopNav.querySelectorAll('a')).toHaveLength(4);
    
    // Mobile should have About link, Resume link, GitHub link, LinkedIn link
    expect(mobileMenu.querySelectorAll('a')).toHaveLength(4);
  });

  it("has responsive sizing classes", () => {
    const logo = screen.getByText("KingRalph.dev");
    expect(logo).toHaveClass("text-xl", "lg:text-2xl", "xl:text-3xl");
    
    const menuButton = screen.getByLabelText('Toggle navigation menu');
    const svg = menuButton.querySelector('svg');
    expect(svg).toHaveClass("h-6", "w-6", "lg:h-8", "lg:w-8", "xl:h-10", "xl:w-10");
  });

  it("maintains fixed positioning for sticky navigation", () => {
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveClass("fixed", "top-0", "left-0", "right-0", "z-10");
  });
});
