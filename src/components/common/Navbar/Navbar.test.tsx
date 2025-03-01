import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./Navbar";

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("Navbar", () => {
  it("renders the logo/site name", () => {
    renderWithRouter(<Navbar />);
    expect(screen.getByText("KingRalph.dev")).toBeInTheDocument();
  });

  it("renders navigation links", () => {
    renderWithRouter(<Navbar />);
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Resume")).toBeInTheDocument();
  });

  it("renders social media links", () => {
    renderWithRouter(<Navbar />);
    const links = screen.getAllByRole("link");

    const githubLink = links.find(
      (link) => link.getAttribute("href") === "https://github.com/kingralph33"
    );
    const linkedinLink = links.find(
      (link) =>
        link.getAttribute("href") === "https://www.linkedin.com/in/ralphkingjr/"
    );

    expect(githubLink).toBeInTheDocument();
    expect(linkedinLink).toBeInTheDocument();
  });
});
