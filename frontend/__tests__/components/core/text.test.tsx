// __tests__/components/core/text.test.tsx
import { Text } from "@/components/core/text";
import { render, screen } from "@testing-library/react";

describe("Text Component Suite", () => {
  it("renders children correctly", () => {
    render(<Text>Test content</Text>);
    expect(screen.getByText("Test content")).toBeInTheDocument();
  });

  it("applies default size and weight classes", () => {
    render(<Text>Default Text</Text>);
    const el = screen.getByText("Default Text");
    expect(el).toHaveClass("text-base");
    expect(el).toHaveClass("font-normal");
  });

  it("applies custom size and weight classes", () => {
    render(
      <Text size="2xl" weight="bold">
        Custom Text
      </Text>
    );
    const el = screen.getByText("Custom Text");
    expect(el).toHaveClass("text-2xl");
    expect(el).toHaveClass("font-bold");
  });

  it("merges additional className prop", () => {
    render(
      <Text className="text-red-500" size="lg" weight="semibold">
        Styled Text
      </Text>
    );
    const el = screen.getByText("Styled Text");
    expect(el).toHaveClass("text-lg");
    expect(el).toHaveClass("font-semibold");
    expect(el).toHaveClass("text-red-500");
  });
});
