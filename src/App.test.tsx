import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  beforeEach(() => {
    render(<App />);
  });

  it("renders the navigation links", () => {
    expect(screen.getByText("KingRalph.dev")).toBeInTheDocument();
    // Use getAllByText for elements that might appear multiple times
    expect(screen.getAllByText("About")).toHaveLength(2); // Desktop and mobile versions
    expect(screen.getAllByText("Resume")).toHaveLength(2); // Desktop and mobile versions
  });

  it("renders the home page by default", () => {
    expect(screen.getByText("Ralph King Jr")).toBeInTheDocument();
    expect(screen.getByText("AI/ML Engineer & Builder")).toBeInTheDocument();
  });

  it("renders the profile section with correct image and text", () => {
    const profileImage = screen.getByAltText("Ralph King Jr an 'AI ML Engineer'");
    expect(profileImage).toBeInTheDocument();
    expect(profileImage).toHaveClass(
      "w-80",
      "h-80",
      "rounded-full",
      "object-cover"
    );
  });

  it("renders the main description text", () => {
    expect(screen.getByText(/I design, train, and deploy machine learning models/)).toBeInTheDocument();
    expect(screen.getByText(/Currently focused on applied AI, infrastructure automation/)).toBeInTheDocument();
  });

  it("includes proper accessibility attributes on interactive elements", () => {
    const aboutLink = screen.getByText("Find out more about me").closest('a');
    expect(aboutLink).toHaveAttribute("aria-label", "View Ralph King's detailed professional background and experience");
    
    const arrowIcon = screen.getByTestId("arrow-icon");
    expect(arrowIcon).toHaveAttribute("aria-hidden", "true");
  });

  it("properly handles dark mode classes", () => {
    const mainText = screen.getByText(/I design, train, and deploy machine learning models/);
    expect(mainText).toHaveClass("dark:text-gray-300");
  });

  // Additional comprehensive tests
  it("renders responsive image with proper attributes", () => {
    const profileImage = screen.getByAltText("Ralph King Jr an 'AI ML Engineer'");
    expect(profileImage).toHaveAttribute("width", "320");
    expect(profileImage).toHaveAttribute("height", "320");
    expect(profileImage).toHaveAttribute("loading", "eager");
    expect(profileImage).toHaveAttribute("fetchPriority", "high");
  });

  it("has responsive layout structure", () => {
    const container = screen.getByText("Ralph King Jr").closest('.max-w-7xl');
    expect(container).toHaveClass("max-w-7xl", "mx-auto", "px-4");
  });

  it("displays profile section with responsive layout", () => {
    const profileSection = screen.getByText("Ralph King Jr").closest('div')?.parentElement;
    expect(profileSection).toHaveClass("flex", "flex-col", "items-center", "justify-center");
    expect(profileSection).toHaveClass("md:flex-row", "md:items-center");
  });

  it("renders headings with proper typography classes", () => {
    const mainHeading = screen.getByText("Ralph King Jr");
    expect(mainHeading).toHaveClass("text-3xl", "lg:text-4xl", "xl:text-5xl", "font-bold");
    expect(mainHeading).toHaveClass("uppercase", "tracking-wider");
    
    const subHeading = screen.getByText("AI/ML Engineer & Builder");
    expect(subHeading).toHaveClass("text-xl", "lg:text-2xl", "xl:text-3xl", "font-bold");
    expect(subHeading).toHaveClass("uppercase", "tracking-wider");
  });

  it("renders main description with proper responsive styling", () => {
    const description = screen.getByText(/I design, train, and deploy machine learning models/);
    expect(description).toHaveClass("text-justify", "md:text-lg", "lg:text-xl", "xl:text-2xl");
    expect(description).toHaveClass("leading-relaxed", "max-w-5xl", "mx-auto");
  });

  it("renders call-to-action button with proper styling", () => {
    const ctaButton = screen.getByText("Find out more about me");
    expect(ctaButton).toHaveClass("bg-[oklch(0.32_0.03_270.43)]", "text-white");
    expect(ctaButton).toHaveClass("px-6", "py-3", "rounded-md");
    expect(ctaButton).toHaveClass("hover:opacity-90", "transition-colors");
    expect(ctaButton).toHaveClass("inline-flex", "items-center", "gap-2");
  });
});

describe("App Navigation", () => {
  it("navigates to About page when clicking 'Find out more about me'", async () => {
    render(<App />);
    
    const aboutLink = screen.getByText("Find out more about me");
    expect(aboutLink.closest('a')).toHaveAttribute('href', '/about');
  });
});
