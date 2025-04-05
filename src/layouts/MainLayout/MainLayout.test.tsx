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
    expect(mainContent).toHaveClass("flex-grow", "pt-16");
  });

  it("includes proper accessibility attributes", () => {
    const mainContent = screen.getByRole("main");
    expect(mainContent).toHaveAttribute("aria-label", "Main content");
  });

  it("handles dark mode classes properly", () => {
    const container = screen.getByText("Test Content").closest('div.min-h-screen');
    expect(container).toHaveClass("dark:bg-gray-900", "dark:text-white");
  });
});
