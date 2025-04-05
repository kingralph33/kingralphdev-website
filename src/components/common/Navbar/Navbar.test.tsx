import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./Navbar";

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe("Navbar", () => {
  beforeEach(() => {
    renderWithRouter(<Navbar />);
  });

  it("renders the logo/site name", () => {
    expect(screen.getByText("KingRalph.dev")).toBeInTheDocument();
  });

  it("renders navigation links", () => {
    expect(screen.getByText("About")).toBeInTheDocument();
    
    // Get the Resume link element
    const resumeLink = screen.getByText("Resume").closest('a');
    expect(resumeLink).toBeInTheDocument();
    expect(resumeLink).toHaveAttribute('href', 'https://kingralphresume.com/');
    expect(resumeLink).toHaveAttribute('target', '_blank');
    expect(resumeLink).toHaveAttribute('rel', 'noopener noreferrer');
    expect(resumeLink).toHaveAttribute('aria-label', 'Resume, opens in new tab');
  });

  it("renders social media links with proper accessibility attributes", () => {
    // Test GitHub link
    const githubLink = screen.getByLabelText('GitHub profile, opens in new tab');
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute('href', 'https://github.com/kingralph33');
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
    
    // Test LinkedIn link
    const linkedinLink = screen.getByLabelText('LinkedIn profile, opens in new tab');
    expect(linkedinLink).toBeInTheDocument();
    expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/ralphkingjr/');
    expect(linkedinLink).toHaveAttribute('target', '_blank');
    expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it("includes proper navigation ARIA attributes", () => {
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveAttribute('aria-label', 'Main navigation');
  });
});
