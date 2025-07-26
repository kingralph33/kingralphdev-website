import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout/MainLayout";
import About from "../pages/About/About";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { memo } from "react";
import { Link } from "react-router-dom";

// Mock Home component for testing
const MockHome = memo(() => (
  <div className="max-w-7xl mx-auto px-4 py-8 lg:py-12 xl:py-16">
    <div className="flex flex-col items-center justify-center gap-6 md:flex-row md:items-center mb-12 lg:mb-16">
      <img
        src="/images/profile2.webp"
        alt="Ralph King Jr a Software Engineer"
        width="320"
        height="320"
        className="w-80 h-80 lg:w-96 lg:h-96 xl:w-[28rem] xl:h-[28rem] rounded-full object-cover"
        loading="eager"
        fetchPriority="high"
      />
      <div className="text-center md:text-left md:ml-6 lg:ml-8">
        <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 uppercase tracking-wider">
          Ralph King Jr
        </h1>
        <h2 className="text-xl lg:text-2xl xl:text-3xl font-bold mb-6 text-center md:text-left dark:text-white uppercase tracking-wider">
          Software Engineer
        </h2>
        <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 mb-6 max-w-md">
          Building scalable solutions for government and enterprise clients with 5+ years experience
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          <a
            href="mailto:ralph@kingralph.dev"
            className="bg-[oklch(0.32_0.03_270.43)] text-white px-6 py-3 rounded-md hover:opacity-90 transition-colors inline-flex items-center justify-center gap-2"
          >
            Get In Touch
          </a>
          <Link
            to="/about"
            className="border-2 border-[oklch(0.32_0.03_270.43)] text-[oklch(0.32_0.03_270.43)] px-6 py-3 rounded-md hover:bg-[oklch(0.32_0.03_270.43)] hover:text-white transition-colors inline-flex items-center justify-center gap-2"
            aria-label="View Ralph King's detailed professional background and experience"
          >
            Learn More
            <ArrowRightIcon
              className="h-5 w-5"
              aria-hidden="true"
              data-testid="arrow-icon"
            />
          </Link>
        </div>
      </div>
    </div>
  </div>
));

describe("Integration Tests", () => {
  describe("Navigation between pages", () => {
    it("navigates from home to about page using main CTA", () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <MainLayout>
            <Routes>
              <Route path="/" element={<MockHome />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </MainLayout>
        </MemoryRouter>
      );

      // Should be on home page initially
      expect(screen.getByText("Ralph King Jr")).toBeInTheDocument();
      expect(screen.getByText("Software Engineer")).toBeInTheDocument();

      // Click the main CTA button
      const ctaButton = screen.getByText("Learn More");
      fireEvent.click(ctaButton);

      // Should navigate to about page
      expect(screen.getByText("About Me")).toBeInTheDocument();
      expect(screen.getByText("From Banking to Building Government Systems")).toBeInTheDocument();
    });

    it("navigates using mobile menu", () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <MainLayout>
            <Routes>
              <Route path="/" element={<MockHome />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </MainLayout>
        </MemoryRouter>
      );

      // Open mobile menu
      const menuButton = screen.getByLabelText('Toggle navigation menu');
      fireEvent.click(menuButton);

      // Click mobile About link
      const mobileMenu = screen.getByTestId('mobile-menu');
      const mobileAboutLink = mobileMenu.querySelector('a[href="/about"]');
      expect(mobileAboutLink).toBeInTheDocument();
      
      if (mobileAboutLink) {
        fireEvent.click(mobileAboutLink);
      }

      // Should navigate to about page and close mobile menu
      expect(screen.getByText("About Me")).toBeInTheDocument();
      expect(mobileMenu).toHaveClass('hidden');
    });
  });

  describe("Layout consistency", () => {
    it("maintains consistent header and footer across routes", () => {
      const { rerender } = render(
        <MemoryRouter initialEntries={['/']}>
          <MainLayout>
            <MockHome />
          </MainLayout>
        </MemoryRouter>
      );

      // Check navigation on home page
      expect(screen.getByText("KingRalph.dev")).toBeInTheDocument();
      expect(screen.getByRole("contentinfo")).toBeInTheDocument();

      // Rerender with about page
      rerender(
        <MemoryRouter initialEntries={['/about']}>
          <MainLayout>
            <About />
          </MainLayout>
        </MemoryRouter>
      );

      // Check navigation and footer still present on about page
      expect(screen.getByText("KingRalph.dev")).toBeInTheDocument();
      expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    });
  });

  describe("External links security", () => {
    it("ensures all external links have proper security attributes", () => {
      render(
        <MemoryRouter>
          <MainLayout>
            <MockHome />
          </MainLayout>
        </MemoryRouter>
      );

      // Get all external links
      const externalLinks = screen.getAllByRole('link').filter(link => 
        link.getAttribute('href')?.startsWith('http')
      );

      // Check that all external links have proper security attributes
      externalLinks.forEach(link => {
        expect(link).toHaveAttribute('target', '_blank');
        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      });
    });
  });
});
