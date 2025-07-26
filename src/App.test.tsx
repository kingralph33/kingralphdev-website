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

  it("renders the profile section with correct image and text", () => {
    const profileImage = screen.getByAltText("Ralph King Jr a Software Engineer");
    expect(profileImage).toBeInTheDocument();
    expect(profileImage).toHaveClass(
      "w-80",
      "h-80",
      "rounded-full",
      "object-cover"
    );
  });

  it("renders the hero description text", () => {
    expect(screen.getByText(/Building scalable solutions for government and enterprise clients/)).toBeInTheDocument();
  });

  it("includes proper accessibility attributes on interactive elements", () => {
    const aboutLink = screen.getByText("Learn More").closest('a');
    expect(aboutLink).toHaveAttribute("aria-label", "View Ralph King's detailed professional background and experience");
    
    const arrowIcon = screen.getByTestId("arrow-icon");
    expect(arrowIcon).toHaveAttribute("aria-hidden", "true");
  });

  it("properly handles dark mode classes", () => {
    const heroText = screen.getByText(/Building scalable solutions for government and enterprise clients/);
    expect(heroText).toHaveClass("dark:text-gray-300");
  });

  // Additional comprehensive tests
  it("renders responsive image with proper attributes", () => {
    const profileImage = screen.getByAltText("Ralph King Jr a Software Engineer");
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
    
    const subHeading = screen.getByText("Software Engineer");
    expect(subHeading).toHaveClass("text-xl", "lg:text-2xl", "xl:text-3xl", "font-bold");
    expect(subHeading).toHaveClass("uppercase", "tracking-wider");
  });

  it("renders hero description with proper responsive styling", () => {
    const description = screen.getByText(/Building scalable solutions for government and enterprise clients/);
    expect(description).toHaveClass("text-lg", "lg:text-xl", "text-gray-600", "dark:text-gray-300");
  });

  it("renders call-to-action buttons with proper styling", () => {
    const contactButton = screen.getByText("Get In Touch");
    expect(contactButton).toHaveClass("bg-[oklch(0.32_0.03_270.43)]", "text-white");
    expect(contactButton).toHaveClass("px-6", "py-3", "rounded-md");
    
    const learnMoreButton = screen.getByText("Learn More");
    expect(learnMoreButton).toHaveClass("border-2", "border-[oklch(0.32_0.03_270.43)]");
    expect(learnMoreButton).toHaveClass("px-6", "py-3", "rounded-md");
  });

  it("renders impact metrics section", () => {
    expect(screen.getByText("$1M+")).toBeInTheDocument();
    expect(screen.getByText("Annual Cost Savings")).toBeInTheDocument();
    expect(screen.getByText("7,500+")).toBeInTheDocument();
    expect(screen.getByText("Users Served")).toBeInTheDocument();
    expect(screen.getByText("100%")).toBeInTheDocument();
    expect(screen.getByText("Compliance Rate")).toBeInTheDocument();
  });

  it("renders technology expertise section with hierarchy", () => {
    expect(screen.getByText("Technology Expertise")).toBeInTheDocument();
    expect(screen.getByText("Backend Specialization")).toBeInTheDocument();
    expect(screen.getByText("Cloud & DevOps")).toBeInTheDocument();
    expect(screen.getByText("Frontend & Full-Stack")).toBeInTheDocument();
    
    // Check for specific technologies (using getAllByText since some appear multiple times)
    expect(screen.getAllByText("Python").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Django").length).toBeGreaterThan(0);
    expect(screen.getAllByText("AWS").length).toBeGreaterThan(0);
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

describe("App Navigation", () => {
  it("navigates to About page when clicking 'Learn More'", async () => {
    render(<App />);
    
    const aboutLink = screen.getByText("Learn More");
    expect(aboutLink.closest('a')).toHaveAttribute('href', '/about');
  });

  it("has email link in 'Get In Touch' button", async () => {
    render(<App />);
    
    const contactLink = screen.getByText("Get In Touch");
    expect(contactLink.closest('a')).toHaveAttribute('href', 'mailto:ralph@kingralph.dev');
  });
});
