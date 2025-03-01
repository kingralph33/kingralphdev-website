import { render, screen } from "@testing-library/react";
import ResumeHeader from "../ResumeHeader";

describe("ResumeHeader", () => {
  it("renders the name correctly", () => {
    render(<ResumeHeader />);
    expect(screen.getByText("RALPH KING JR")).toBeInTheDocument();
  });

  it("renders contact information", () => {
    render(<ResumeHeader />);
    const contactInfo = screen.getByText(
      /ralph@kingralph\.dev.*Washington DC-Baltimore Area/
    );
    expect(contactInfo).toBeInTheDocument();
  });

  it("contains a horizontal rule", () => {
    render(<ResumeHeader />);
    expect(screen.getByRole("separator")).toBeInTheDocument();
  });
});
