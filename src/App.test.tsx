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
    expect(screen.getByText("Software Engineer")).toBeInTheDocument();
  });

  it("renders the hero section with text-focused layout", () => {
    const heading = screen.getByText("Ralph King Jr");
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveClass("text-3xl", "lg:text-4xl", "xl:text-5xl", "font-bold");
  });

  it("renders the hero description text", () => {
    expect(screen.getByText(/Building scalable solutions for government and enterprise clients/)).toBeInTheDocument();
  });

  it("properly handles dark mode classes", () => {
    const heroText = screen.getByText(/Building scalable solutions for government and enterprise clients/);
    expect(heroText).toHaveClass("dark:text-white", "dark:font-semibold");
  });

  // Additional comprehensive tests
  it("renders hero section with centered text layout", () => {
    const heroSection = screen.getByText("Ralph King Jr").closest('div');
    expect(heroSection).toHaveClass("flex", "flex-col", "items-center", "justify-center", "text-center");
  });

  it("has responsive layout structure", () => {
    const container = screen.getByText("Ralph King Jr").closest('.max-w-6xl');
    expect(container).toHaveClass("max-w-6xl", "mx-auto", "px-4");
  });

  it("renders headings with proper typography classes", () => {
    const mainHeading = screen.getByText("Ralph King Jr");
    expect(mainHeading).toHaveClass("text-3xl", "lg:text-4xl", "xl:text-5xl", "font-bold");
    expect(mainHeading).toHaveClass("tracking-tight");

    const subHeading = screen.getByText("Software Engineer");
    expect(subHeading).toHaveClass("text-xl", "lg:text-2xl", "xl:text-3xl", "font-semibold");
  });

  it("renders hero description with proper responsive styling", () => {
    const description = screen.getByText(/Building scalable solutions for government and enterprise clients/);
    expect(description).toHaveClass("text-base", "lg:text-lg", "text-gray-600", "dark:text-white", "dark:font-semibold");
  });


  it("renders technology expertise section with hierarchy", () => {
    expect(screen.getByText("Technology Expertise")).toBeInTheDocument();
    expect(screen.getByText("Backend Specialization")).toBeInTheDocument();
    expect(screen.getByText("Cloud & DevOps")).toBeInTheDocument();
    expect(screen.getByText("Frontend & Full-Stack")).toBeInTheDocument();

    // Check for specific technologies (using getAllByText since some appear multiple times)
    expect(screen.getAllByText("Python").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Node.js").length).toBeGreaterThan(0);
    expect(screen.getAllByText("PostgreSQL").length).toBeGreaterThan(0);
    expect(screen.getAllByText("React").length).toBeGreaterThan(0);
  });

  it("renders recent impact projects section", () => {
    expect(screen.getByText("Recent Impact")).toBeInTheDocument();
    expect(screen.getByText("Government Compliance System")).toBeInTheDocument();
    expect(screen.getByText("Fleet Management Platform")).toBeInTheDocument();
    expect(screen.getByText(/Replaced legacy vendor software with custom Django application/)).toBeInTheDocument();
    expect(screen.getByText(/Built automated workflow system managing 2,000\+ vehicles/)).toBeInTheDocument();
  });

  it("renders enhanced value proposition", () => {
    expect(screen.getByText(/Building scalable solutions for government and enterprise clients/)).toBeInTheDocument();
    expect(screen.getByText(/5\+ years experience/)).toBeInTheDocument();
  });
});

