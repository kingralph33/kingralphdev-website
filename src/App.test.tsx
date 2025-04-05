import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

// These tests verify the Home page functionality
describe("App Home Page", () => {
  beforeEach(() => {
    render(<App />);
  });

  it("renders the home page by default", () => {
    expect(screen.getByText("Ralph King Jr")).toBeInTheDocument();
    expect(
      screen.getByText("Software Engineer in the Washington DC Metro Area")
    ).toBeInTheDocument();
  });

  it("renders the profile section with correct image and text", () => {
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
    expect(screen.getByText("Fullstack Developer")).toBeInTheDocument();
    expect(screen.getByText("Cloud Engineer")).toBeInTheDocument();
    expect(
      screen.getByText(/Full-stack developer proficient in building/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Proficient in designing, developing, and deploying/)
    ).toBeInTheDocument();
  });

  it("includes proper accessibility attributes on interactive elements", () => {
    const aboutLink = screen.getByText("Find out more about me").closest('a');
    expect(aboutLink).toHaveAttribute("aria-label", "Learn more about Ralph King");
    
    const arrowIcon = screen.getByTestId("arrow-icon");
    expect(arrowIcon).toHaveAttribute("aria-hidden", "true");
  });

  it("properly handles dark mode classes", () => {
    const subtitle = screen.getByText("Software Engineer in the Washington DC Metro Area");
    expect(subtitle).toHaveClass("dark:text-gray-100");
    
    const divider = screen.getByRole("separator");
    expect(divider).toHaveClass("dark:border-gray-700");
    
    const paragraphs = screen.getAllByText(/developer|engineer/i);
    // At least one paragraph should have the dark mode class
    expect(paragraphs.some(p => p.classList.contains("dark:text-gray-100"))).toBeTruthy();
  });
});

describe("App Navigation", () => {
  it("navigates to About page when clicking 'Find out more about me'", async () => {
    render(<App />);
    const user = userEvent.setup();
    const aboutLink = screen.getByText("Find out more about me");

    await user.click(aboutLink);
    expect(screen.getByText("About Me")).toBeInTheDocument();
  });
});
