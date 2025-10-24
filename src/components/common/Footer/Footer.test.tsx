import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer", () => {
  beforeEach(() => {
    render(<Footer />);
  });

  it("renders copyright text with current year", () => {
    const currentYear = new Date().getFullYear();
    expect(
      screen.getByText(
        `© 2020 - ${currentYear} Ralph King. All rights reserved.`
      )
    ).toBeInTheDocument();
  });

  it("has the correct styling classes", () => {
    const footer = screen.getByRole("contentinfo");
    expect(footer).toHaveClass("shadow-lg", "mt-auto");
  });

  it("includes proper footer ARIA attributes", () => {
    const footer = screen.getByRole("contentinfo");
    expect(footer).toHaveAttribute("aria-label", "Footer");
  });

  it("handles dark mode classes properly", () => {
    const copyrightText = screen.getByText(/Ralph King. All rights reserved./);
    expect(copyrightText).toHaveClass("dark:text-white", "dark:font-semibold");
  });

  // Additional comprehensive tests
  it("has proper semantic HTML structure", () => {
    const footer = screen.getByRole("contentinfo");
    expect(footer.tagName).toBe("FOOTER");
  });

  it("displays copyright with correct date range", () => {
    const currentYear = new Date().getFullYear();
    const copyrightText = screen.getByText(
      `© 2020 - ${currentYear} Ralph King. All rights reserved.`
    );
    expect(copyrightText).toBeInTheDocument();
  });

  it("has responsive padding classes", () => {
    const container = screen.getByRole("contentinfo").firstChild;
    expect(container).toHaveClass("py-3", "lg:py-4");
  });

  it("has responsive text sizing", () => {
    const copyrightText = screen.getByText(/Ralph King. All rights reserved./);
    expect(copyrightText).toHaveClass("text-xs", "lg:text-sm");
  });

  it("maintains proper layout structure", () => {
    const footer = screen.getByRole("contentinfo");
    const container = footer.firstChild;
    const text = container?.firstChild;

    expect(container).toHaveClass("px-4");
    expect(text).toHaveClass("text-center");
  });
});
