// __tests__/components/core/spinner.test.tsx
import { Spinner } from "@/components/core/spinner";
import { render, screen } from "@testing-library/react";

describe("Spinner Component Suite", () => {
  it("renders the spinner with correct test id", () => {
    render(<Spinner />);

    const spinner = screen.getByTestId("spinner-testid");
    expect(spinner).toBeInTheDocument();
  });

  it("renders an svg element inside the spinner", () => {
    render(<Spinner />);

    const svg = screen.getByTestId("spinner-testid").querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass("animate-spin");
  });

  it("includes a screen-reader text", () => {
    render(<Spinner />);
    const srText = screen.getByText("Loading...");
    expect(srText).toBeInTheDocument();
    expect(srText).toHaveClass("sr-only");
  });
});
