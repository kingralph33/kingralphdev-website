import { render, screen } from "@testing-library/react";
import About from "./About";

describe("About Page", () => {
  beforeEach(() => {
    render(<About />);
  });

  it("renders the page title", () => {
    expect(screen.getByText("About Me")).toBeInTheDocument();
  });

  it("renders introduction text", () => {
    expect(screen.getByText("Welcome to my portfolio.")).toBeInTheDocument();
    expect(screen.getByText(/My journey into tech/)).toBeInTheDocument();
  });

  it("renders all section headings", () => {
    expect(screen.getByText("Technical Interests")).toBeInTheDocument();
    expect(screen.getByText("Current Focus")).toBeInTheDocument();
    expect(screen.getByText("Professional Interests")).toBeInTheDocument();
  });

  it("renders technical interests", () => {
    expect(screen.getByText("Software Engineering")).toBeInTheDocument();
    expect(
      screen.getAllByText("Machine Learning Cloud Engineering")
    ).toHaveLength(2);
    expect(screen.getByText("Cloud Solutions")).toBeInTheDocument();
  });

  it("renders current focus items", () => {
    expect(
      screen.getByText("AWS Solutions Architecture Certification")
    ).toBeInTheDocument();
    expect(screen.getByText("System Design")).toBeInTheDocument();
  });

  it("renders professional interests", () => {
    expect(screen.getByText("Automation and Efficiency")).toBeInTheDocument();
    expect(screen.getByText("Process Optimization")).toBeInTheDocument();
    expect(
      screen.getByText("Scalable and Reliable Systems")
    ).toBeInTheDocument();
  });
});
