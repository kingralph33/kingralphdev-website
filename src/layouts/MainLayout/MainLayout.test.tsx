import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import MainLayout from "./MainLayout";

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("MainLayout", () => {
  beforeEach(() => {
    renderWithRouter(
      <MainLayout>
        <div>Test Content</div>
      </MainLayout>
    );
  });

  it("renders children content", () => {
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("renders navbar and footer", () => {
    expect(screen.getByText("KingRalph.dev")).toBeInTheDocument(); // Navbar
    expect(screen.getByRole("contentinfo")).toBeInTheDocument(); // Footer
  });

  it("has correct layout structure", () => {
    const mainContent = screen.getByRole("main");
    expect(mainContent).toHaveClass("flex-grow", "pt-14", "lg:pt-16");
  });

  it("includes proper accessibility attributes", () => {
    const mainContent = screen.getByRole("main");
    expect(mainContent).toHaveAttribute("aria-label", "Main content");
  });

  it("handles dark mode classes properly", () => {
    const container = screen.getByText("Test Content").closest('div.min-h-screen');
    expect(container).toHaveClass("dark:bg-gray-900", "dark:text-white");
  });

  // Additional comprehensive tests
  it("has proper flex layout structure", () => {
    const container = screen.getByText("Test Content").closest('div.min-h-screen');
    expect(container).toHaveClass("min-h-screen", "flex", "flex-col");
  });

  it("ensures main content area has proper flex properties", () => {
    const mainContent = screen.getByRole("main");
    expect(mainContent).toHaveClass("flex-grow", "flex", "flex-col", "justify-center", "items-center");
  });

  it("has responsive container constraints", () => {
    const mainContent = screen.getByRole("main");
    expect(mainContent).toHaveClass("max-w-7xl", "mx-auto");
  });

  it("provides top padding to account for fixed navbar", () => {
    const mainContent = screen.getByRole("main");
    expect(mainContent).toHaveClass("pt-14", "lg:pt-16");
  });

  it("renders footer at the bottom with proper styling", () => {
    const footer = screen.getByRole("contentinfo");
    expect(footer).toHaveClass("mt-auto");
  });
});
