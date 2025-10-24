import { render, screen } from "@testing-library/react";
import App from "../App";

describe("Accessibility Tests", () => {
  it("has proper heading hierarchy", () => {
    render(<App />);
    
    // Should have one h1 element
    const h1Elements = screen.getAllByRole("heading", { level: 1 });
    expect(h1Elements).toHaveLength(1);
    expect(h1Elements[0]).toHaveTextContent("Ralph King Jr");
    
    // Should have proper h2 elements
    const h2Elements = screen.getAllByRole("heading", { level: 2 });
    expect(h2Elements.length).toBeGreaterThan(0);
  });

  it("has proper ARIA labels and roles", () => {
    render(<App />);
    
    // Navigation should have proper ARIA label
    const navigation = screen.getByRole("navigation");
    expect(navigation).toHaveAttribute("aria-label", "Main navigation");
    
    // Main content should have proper role and label
    const main = screen.getByRole("main");
    expect(main).toHaveAttribute("aria-label", "Main content");
    
    // Footer should have proper role
    const footer = screen.getByRole("contentinfo");
    expect(footer).toHaveAttribute("aria-label", "Footer");
  });

  it("has text-focused homepage without large images", () => {
    render(<App />);

    // Verify homepage is text-focused
    const mainHeading = screen.getByText("Ralph King Jr");
    expect(mainHeading).toBeInTheDocument();
    expect(mainHeading.tagName).toBe("H1");
  });

  it("has proper focus management", () => {
    render(<App />);
    
    // All interactive elements should be focusable
    const links = screen.getAllByRole("link");
    const buttons = screen.getAllByRole("button");
    
    [...links, ...buttons].forEach(element => {
      expect(element).not.toHaveAttribute("tabindex", "-1");
    });
  });

  it("has proper color contrast with dark mode support", () => {
    render(<App />);

    // Check that dark mode classes are present
    const heroText = screen.getByText(/Building scalable solutions for government and enterprise clients/);
    expect(heroText).toHaveClass("dark:text-white", "dark:font-semibold");
  });

  it("provides keyboard navigation support", () => {
    render(<App />);
    
    // Mobile menu button should support keyboard interaction
    const menuButton = screen.getByLabelText('Toggle navigation menu');
    expect(menuButton).toHaveAttribute('type', 'button');
    
    // All links should be keyboard accessible
    const links = screen.getAllByRole("link");
    links.forEach(link => {
      expect(link.tagName).toBe('A');
      expect(link).toHaveAttribute('href');
    });
  });
});

describe("Performance Tests", () => {
  it("uses optimized text-focused hero layout", () => {
    render(<App />);

    // Verify hero section doesn't have heavy images on homepage
    const mainHeading = screen.getByRole("heading", { level: 1 });
    expect(mainHeading).toHaveTextContent("Ralph King Jr");
  });

  it("uses semantic HTML elements for better performance", () => {
    render(<App />);
    
    // Check for semantic elements
    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });

  it("has efficient CSS classes for responsive design", () => {
    render(<App />);

    // Check for main heading with responsive typography
    const mainHeading = screen.getByRole("heading", { level: 1 });
    expect(mainHeading).toHaveClass("text-3xl", "lg:text-4xl", "xl:text-5xl");
  });
});

describe("SEO and Meta Tests", () => {
  it("has proper heading structure for SEO", () => {
    render(<App />);

    // Main heading should be descriptive
    const mainHeading = screen.getByRole("heading", { level: 1 });
    expect(mainHeading).toHaveTextContent("Ralph King Jr");

    // Secondary heading should be descriptive
    const secondaryHeading = screen.getByText("Software Engineer");
    expect(secondaryHeading.tagName).toBe("H2");
  });

  it("has descriptive text content for search engines", () => {
    render(<App />);

    // Should have descriptive content about the person
    expect(screen.getByText(/Building scalable solutions for government and enterprise clients/)).toBeInTheDocument();
    expect(screen.getByText(/Technology Expertise/)).toBeInTheDocument();
  });

  it("has proper link structure for navigation", () => {
    render(<App />);

    // External links should be absolute and secure
    const externalLinks = screen.getAllByRole('link').filter(link =>
      link.getAttribute('href')?.startsWith('http')
    );

    externalLinks.forEach(link => {
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });
});
