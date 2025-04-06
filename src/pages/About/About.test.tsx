import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import About from "./About";
import React from "react";

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
});
