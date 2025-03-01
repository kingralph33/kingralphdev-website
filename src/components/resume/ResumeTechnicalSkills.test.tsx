import { render, screen } from "@testing-library/react";
import ResumeTechnicalSkills from "./ResumeTechnicalSkills";

describe("ResumeTechnicalSkills", () => {
  beforeEach(() => {
    render(<ResumeTechnicalSkills />);
  });

  it("renders the TECHNICAL SKILLS heading", () => {
    expect(screen.getByText("TECHNICAL SKILLS")).toBeInTheDocument();
    expect(screen.getByText("TECHNICAL SKILLS")).toHaveClass("section-h2");
  });

  it("renders all skill categories", () => {
    const categories = [
      "Cloud Platforms",
      "Programming Languages",
      "Frameworks & Libraries",
      "Databases",
      "Tools",
    ];

    categories.forEach((category) => {
      expect(screen.getByText(new RegExp(category + ":"))).toBeInTheDocument();
    });
  });

  it("renders skills with correct formatting", () => {
    const skillsList = screen.getByRole("list");
    expect(skillsList).toHaveClass("list-adaptive");

    const skillItems = screen.getAllByRole("listitem");
    expect(skillItems.length).toBe(5); // Five main categories

    // Check that each category header is bold
    const boldHeaders = screen.getAllByText(/:$/, { selector: "strong" });
    expect(boldHeaders).toHaveLength(5);
    boldHeaders.forEach((header) => {
      expect(header).toHaveClass("text-adaptive-bold");
    });
  });

  it("applies adaptive text styling for dark mode", () => {
    const section = screen.getByRole("complementary");
    expect(section).toHaveClass("mb-8");

    const list = screen.getByRole("list");
    expect(list).toHaveClass("list-adaptive");
  });
});
