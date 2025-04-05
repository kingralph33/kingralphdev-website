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
    expect(footer).toHaveClass("bg-white", "shadow-lg", "mt-auto");
  });

  it("includes proper footer ARIA attributes", () => {
    const footer = screen.getByRole("contentinfo");
    expect(footer).toHaveAttribute("aria-label", "Footer");
  });

  it("handles dark mode classes properly", () => {
    const footer = screen.getByRole("contentinfo");
    expect(footer).toHaveClass("dark:bg-gray-900");
    expect(footer).toHaveClass("dark:border-gray-700");

    const copyrightText = screen.getByText(/Ralph King. All rights reserved./);
    expect(copyrightText).toHaveClass("dark:text-gray-100");
  });
});
