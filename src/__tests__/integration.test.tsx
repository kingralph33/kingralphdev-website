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
        src="/images/profile.webp"
        alt="Ralph King Jr an 'AI ML Engineer'"
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
        <h2 className="text-xl lg:text-2xl xl:text-3xl font-bold mb-6 text-center dark:text-white uppercase tracking-wider">
          AI/ML Engineer & Builder
        </h2>
      </div>
    </div>
    <div>
      <p className="text-justify md:text-lg lg:text-xl xl:text-2xl leading-relaxed text-gray-700 dark:text-gray-300 max-w-5xl mx-auto mb-8 lg:mb-12">
        I design, train, and deploy machine learning models and LLM-powered
        systems using Python, FastAPI, and cloud platforms like Azure and AWS.
        Currently focused on applied AI, infrastructure automation, and building
        intelligent tools that scale.
      </p>
      <Link
        to="/about"
        className="bg-[oklch(0.32_0.03_270.43)] text-white px-6 py-3 rounded-md hover:opacity-90 transition-colors inline-flex items-center gap-2"
        aria-label="View Ralph King's detailed professional background and experience"
      >
        Find out more about me
        <ArrowRightIcon
          className="h-6 w-6 lg:h-7 lg:w-7"
          aria-hidden="true"
          data-testid="arrow-icon"
        />
      </Link>
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
      expect(screen.getByText("AI/ML Engineer & Builder")).toBeInTheDocument();

      // Click the main CTA button
      const ctaButton = screen.getByText("Find out more about me");
      fireEvent.click(ctaButton);

      // Should navigate to about page
      expect(screen.getByText("About Me")).toBeInTheDocument();
      expect(screen.getByText("Welcome to my site!")).toBeInTheDocument();
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
