import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

describe("Footer", () => {
  it("renders copyright text with current year", () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    expect(
      screen.getByText(
        `© 2020 - ${currentYear} Ralph King. All rights reserved.`
      )
    ).toBeInTheDocument();
  });

  it("has the correct styling classes", () => {
    render(<Footer />);
    const footer = screen.getByRole("contentinfo");
    expect(footer).toHaveClass("bg-white", "shadow-lg", "mt-auto");
  });
});
