import { render, screen } from "@testing-library/react";
import Resume from "./Resume";

jest.mock("../../components/resume/ResumeHeader", () => {
  return function MockResumeHeader() {
    return <div data-testid="resume-header">Header Mock</div>;
  };
});

jest.mock("../../components/resume/ResumeSummary", () => {
  return function MockResumeSummary() {
    return <div data-testid="resume-summary">Summary Mock</div>;
  };
});

jest.mock("../../components/resume/ResumeTechnicalSkills", () => {
  return function MockResumeTechnicalSkills() {
    return <div data-testid="resume-skills">Skills Mock</div>;
  };
});

jest.mock("../../components/resume/ResumeExperience", () => {
  return function MockResumeExperience() {
    return <div data-testid="resume-experience">Experience Mock</div>;
  };
});

jest.mock("../../components/resume/ResumeEducation", () => {
  return function MockResumeEducation() {
    return <div data-testid="resume-education">Education Mock</div>;
  };
});

describe("Resume Page", () => {
  beforeEach(() => {
    render(<Resume />);
  });

  it("renders all resume sections", () => {
    expect(screen.getByTestId("resume-header")).toBeInTheDocument();
    expect(screen.getByTestId("resume-summary")).toBeInTheDocument();
    expect(screen.getByTestId("resume-skills")).toBeInTheDocument();
    expect(screen.getByTestId("resume-experience")).toBeInTheDocument();
    expect(screen.getByTestId("resume-education")).toBeInTheDocument();
  });

  it("has correct layout container classes", () => {
    const container = screen.getByTestId("resume-header").parentElement;
    expect(container).toHaveClass("max-w-4xl", "mx-auto", "px-4", "py-8");
  });
});
