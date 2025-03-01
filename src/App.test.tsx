import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("App Component", () => {
  it("renders the home page by default", () => {
    render(<App />);
    expect(screen.getByText("Ralph King Jr")).toBeInTheDocument();
    expect(
      screen.getByText("Software Engineer in the Washington DC Metro Area")
    ).toBeInTheDocument();
  });

  it("renders the profile section with correct image and text", () => {
    render(<App />);
    const profileImage = screen.getByAltText("Ralph King Jr");
    expect(profileImage).toBeInTheDocument();
    expect(profileImage).toHaveClass(
      "w-80",
      "h-80",
      "rounded-full",
      "object-cover"
    );
  });

  it("renders the Fullstack Developer and Cloud Engineer sections", () => {
    render(<App />);
    expect(screen.getByText("Fullstack Developer")).toBeInTheDocument();
    expect(screen.getByText("Cloud Engineer")).toBeInTheDocument();
    expect(
      screen.getByText(/Full-stack developer proficient in building/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Proficient in designing, developing, and deploying/)
    ).toBeInTheDocument();
  });

  it("navigates to About page when clicking 'Find out more about me'", async () => {
    render(<App />);
    const user = userEvent.setup();
    const aboutLink = screen.getByText("Find out more about me");

    await user.click(aboutLink);
    expect(screen.getByText("About Me")).toBeInTheDocument();
  });
});
