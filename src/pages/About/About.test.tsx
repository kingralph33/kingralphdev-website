import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import About from "./About";

describe("About Page", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <About />
      </BrowserRouter>
    );
  });

  it("renders the About Me heading", () => {
    expect(screen.getByText("About Me")).toBeInTheDocument();
  });

  it("renders career transition story prominently", () => {
    expect(screen.getByText("From Banking to Building Government Systems")).toBeInTheDocument();
    expect(screen.getByText(/My journey into tech wasn't typical/)).toBeInTheDocument();
    expect(screen.getByText(/I started in retail banking/)).toBeInTheDocument();
  });

  it("renders professional summary with impact metrics", () => {
    expect(screen.getByText(/Today, I'm a software engineer with over 5 years of experience/)).toBeInTheDocument();
    expect(screen.getByText(/I've led the development of systems that replaced expensive vendor tools/)).toBeInTheDocument();
    expect(screen.getByText(/My work has saved organizations over \$1M annually/)).toBeInTheDocument();
  });

  it("renders section headings", () => {
    expect(screen.getByText("Technical Interests")).toBeInTheDocument();
    expect(screen.getByText("Current Focus")).toBeInTheDocument();
    expect(screen.getByText("Professional Interests")).toBeInTheDocument();
  });

  it("renders technical interests", () => {
    expect(screen.getByText("Software Engineering")).toBeInTheDocument();
    expect(screen.getByText("AI & ML Engineering")).toBeInTheDocument();
    expect(screen.getByText("Cloud Solutions")).toBeInTheDocument();
  });

  it("renders current focus items", () => {
    expect(screen.getByText("AI Engineering")).toBeInTheDocument();
    expect(screen.getByText("AWS Solutions Architect Cert")).toBeInTheDocument();
    expect(screen.getByText("System Design")).toBeInTheDocument();
  });

  it("renders professional interests", () => {
    expect(screen.getByText(/Automation & Efficiency/)).toBeInTheDocument();
    expect(screen.getByText("Process Optimization")).toBeInTheDocument();
    expect(screen.getByText("Scalable Systems")).toBeInTheDocument();
  });

  // Additional comprehensive tests
  it("has proper responsive layout structure", () => {
    // Find the main container by looking for its unique characteristics
    const mainContainer = screen.getByText("About Me").closest('.max-w-4xl');
    expect(mainContainer).toHaveClass("max-w-4xl", "mx-auto", "px-4");
  });

  it("has responsive typography classes", () => {
    const heading = screen.getByText("About Me");
    expect(heading).toHaveClass("text-2xl", "lg:text-3xl");

    const introText = screen.getByText(/Today, I'm a software engineer with over 5 years of experience/);
    expect(introText).toHaveClass("text-sm", "lg:text-base");
  });

  it("displays divider with correct styling", () => {
    const divider = screen.getByRole("separator");
    expect(divider).toHaveClass("border-[--color-grinch-green]", "border-2", "mb-8");
  });

  it("has prominent career transition section with proper styling", () => {
    const careerSection = screen.getByText("From Banking to Building Government Systems").closest('div');
    expect(careerSection).toHaveClass("bg-gray-100", "dark:bg-gray-800", "p-5", "lg:p-6", "rounded-lg", "border-l-4", "border-[--color-grinch-green]");
  });

  it("has responsive grid layout for three columns", () => {
    const technicalInterestsSection = screen.getByText("Technical Interests").closest('div');
    const gridContainer = technicalInterestsSection?.parentElement;
    expect(gridContainer).toHaveClass("grid", "grid-cols-1", "md:grid-cols-3");
  });

  it("renders all section headings with consistent styling", () => {
    const headings = [
      screen.getByText("Technical Interests"),
      screen.getByText("Current Focus"),
      screen.getByText("Professional Interests")
    ];

    headings.forEach(heading => {
      expect(heading).toHaveClass("text-base", "lg:text-lg", "font-bold");
      expect(heading).toHaveClass("text-[--color-navy-blue]", "dark:text-white");
    });
  });

  it("has properly structured lists with consistent styling", () => {
    const lists = screen.getAllByRole("list");
    expect(lists).toHaveLength(3);

    lists.forEach(list => {
      expect(list).toHaveClass("space-y-1.5");
      expect(list).toHaveClass("text-gray-600", "dark:text-gray-100");
    });
  });
});
