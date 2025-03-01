import { render, screen } from "@testing-library/react";
import ResumeJobEntry from "../ResumeJobEntry";

const mockJob = {
  title: "Test Job Title",
  company: "Test Company",
  location: "Test Location",
  period: "Jan 2023 - Present",
  summary: "Test job summary",
  responsibilities: ["Responsibility 1", "Responsibility 2"],
};

describe("ResumeJobEntry", () => {
  it("renders job information correctly", () => {
    render(<ResumeJobEntry {...mockJob} />);

    expect(screen.getByText(mockJob.title)).toBeInTheDocument();
    expect(screen.getByText(mockJob.company)).toBeInTheDocument();
    expect(
      screen.getByText(`${mockJob.location} | ${mockJob.period}`)
    ).toBeInTheDocument();
    expect(screen.getByText(mockJob.summary)).toBeInTheDocument();
  });

  it("renders all responsibilities", () => {
    render(<ResumeJobEntry {...mockJob} />);

    mockJob.responsibilities.forEach((responsibility) => {
      expect(screen.getByText(responsibility)).toBeInTheDocument();
    });
  });
});
