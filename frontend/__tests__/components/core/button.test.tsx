// __tests__/components/core/button.test.tsx
import { CoreButton } from "@/components/core/button";
import { fireEvent, render, screen } from "@testing-library/react";

describe("CoreButton Component Suite", () => {
  it("renders children correctly", () => {
    render(<CoreButton handleClick={() => {}}>Click Me</CoreButton>);

    const button = screen.getByTestId("corebutton-testid");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Click Me");
  });

  it("calls handleClick when clicked", () => {
    const handleClick = jest.fn();
    render(<CoreButton handleClick={handleClick}>Click</CoreButton>);

    const button = screen.getByTestId("corebutton-testid");
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("applies the disabled state and prevents clicks", () => {
    const handleClick = jest.fn();
    render(
      <CoreButton handleClick={handleClick} disabled>
        Disabled
      </CoreButton>
    );

    const button = screen.getByTestId("corebutton-testid");
    expect(button).toBeDisabled();

    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("merges custom className with base styles", () => {
    render(
      <CoreButton handleClick={() => {}} className="custom-class">
        Styled
      </CoreButton>
    );

    const button = screen.getByTestId("corebutton-testid");
    expect(button.className).toMatch(/custom-class/);
    expect(button.className).toMatch(/bg-blue-600/);
  });
});
