import { render, screen } from "@testing-library/react";
import ResumeSummary from "./ResumeSummary";

describe("ResumeSummary", () => {
  beforeEach(() => {
    render(<ResumeSummary />);
  });

  it("renders the SUMMARY heading", () => {
    expect(screen.getByText("SUMMARY")).toBeInTheDocument();
    expect(screen.getByText("SUMMARY")).toHaveClass("section-h2");
  });

  it("renders the summary text", () => {
    const summaryText = screen.getByText(/Results-driven Cloud Engineer/);
    expect(summaryText).toBeInTheDocument();
    expect(summaryText).toHaveClass("p-header");
  });

  it("applies correct styling classes", () => {
    const { container } = render(<ResumeSummary />);
    const section = container.querySelector("section");
    expect(section).toHaveClass("mb-8");
  });
});
