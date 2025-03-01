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
    expect(screen.getByText(/Hi there!/)).toBeInTheDocument();
    expect(screen.getByText(/I'm a software developer/)).toBeInTheDocument();
  });

  it("renders all section headings", () => {
    expect(screen.getByText("Favorite Sports")).toBeInTheDocument();
    expect(screen.getByText("Favorite Foods")).toBeInTheDocument();
    expect(screen.getByText("Favorite Teams")).toBeInTheDocument();
  });

  it("renders all favorite sports", () => {
    expect(screen.getByText("American Football")).toBeInTheDocument();
    expect(screen.getByText("Mixed Martial Arts")).toBeInTheDocument();
    expect(screen.getByText("Basketball")).toBeInTheDocument();
  });

  it("renders all favorite foods", () => {
    expect(screen.getByText("Pizza")).toBeInTheDocument();
    expect(screen.getByText("Jerk Chicken")).toBeInTheDocument();
    expect(screen.getByText("Steak & Cheese")).toBeInTheDocument();
  });

  it("renders all favorite teams", () => {
    expect(screen.getByText("Philadelphia Eagles")).toBeInTheDocument();
    expect(screen.getByText("Maryland Basketball")).toBeInTheDocument();
  });
});
