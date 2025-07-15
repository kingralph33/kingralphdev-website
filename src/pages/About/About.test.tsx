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

  it("renders introduction text", () => {
    expect(screen.getByText("Welcome to my site!")).toBeInTheDocument();
    expect(screen.getByText(/My journey into tech/)).toBeInTheDocument();
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
    expect(
      screen.getByText("AWS Certified Solutions Architect - Associate Exam")
    ).toBeInTheDocument();
    expect(screen.getByText("System Design")).toBeInTheDocument();
  });

  it("renders professional interests", () => {
    expect(screen.getByText("Automation and Efficiency")).toBeInTheDocument();
    expect(screen.getByText("Process Optimization")).toBeInTheDocument();
    expect(screen.getByText("Scalable and Reliable Systems")).toBeInTheDocument();
  });

  // Additional comprehensive tests
  it("has proper responsive layout structure", () => {
    const container = screen.getByText("About Me").closest('div');
    expect(container).toHaveClass("max-w-6xl", "mx-auto", "px-4");
  });

  it("has responsive typography classes", () => {
    const heading = screen.getByText("About Me");
    expect(heading).toHaveClass("text-3xl", "lg:text-4xl", "xl:text-5xl");
    
    const introText = screen.getByText("Welcome to my site!");
    expect(introText).toHaveClass("text-lg", "lg:text-xl", "xl:text-2xl");
  });

  it("has proper text indentation for paragraphs", () => {
    const paragraphs = screen.getAllByText(/My journey into tech|Beyond my professional work/);
    paragraphs.forEach(paragraph => {
      expect(paragraph).toHaveClass("indent-6", "lg:indent-10", "xl:indent-14");
    });
  });

  it("displays divider with correct styling", () => {
    const divider = screen.getByRole("separator");
    expect(divider).toHaveClass("border-gray-200", "dark:border-gray-700", "mb-12");
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
      expect(heading).toHaveClass("text-xl", "lg:text-2xl", "xl:text-3xl", "font-bold");
      expect(heading).toHaveClass("text-gray-900", "dark:text-gray-100");
    });
  });

  it("has properly structured lists with consistent styling", () => {
    const lists = screen.getAllByRole("list");
    expect(lists).toHaveLength(3);
    
    lists.forEach(list => {
      expect(list).toHaveClass("space-y-2", "lg:space-y-3", "xl:space-y-4");
      expect(list).toHaveClass("text-gray-600", "dark:text-gray-100");
    });
  });
});
