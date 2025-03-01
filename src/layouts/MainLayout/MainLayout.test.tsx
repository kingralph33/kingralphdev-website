import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import MainLayout from "./MainLayout";

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("MainLayout", () => {
  it("renders children content", () => {
    renderWithRouter(
      <MainLayout>
        <div>Test Content</div>
      </MainLayout>
    );
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("renders navbar and footer", () => {
    renderWithRouter(
      <MainLayout>
        <div>Test Content</div>
      </MainLayout>
    );
    expect(screen.getByText("KingRalph.dev")).toBeInTheDocument(); // Navbar
    expect(screen.getByRole("contentinfo")).toBeInTheDocument(); // Footer
  });

  it("has correct layout structure", () => {
    renderWithRouter(
      <MainLayout>
        <div>Test Content</div>
      </MainLayout>
    );
    const mainContent = screen.getByRole("main");
    expect(mainContent).toHaveClass("flex-grow", "pt-16");
  });
});
