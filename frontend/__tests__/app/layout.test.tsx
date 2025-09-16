// __tests__/app/layout.test.tsx
import RootLayout, { metadata } from "@/app/layout";
import { render, screen } from "@testing-library/react";

// mock Next.js fonts
jest.mock("next/font/google", () => ({
  Geist: () => ({
    variable: "--font-geist-sans",
  }),
  Geist_Mono: () => ({
    variable: "--font-geist-mono",
  }),
}));

const TestableLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="--font-geist-sans --font-geist-mono"
      data-testid="layout-body"
    >
      {children}
    </div>
  );
};

describe("Root Layout Suite", () => {
  it("renders children correctly", () => {
    render(
      <TestableLayout>
        <div data-testid="test-child">Test Content</div>
      </TestableLayout>
    );

    expect(screen.getByTestId("test-child")).toBeInTheDocument();
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("applies font classes correctly", () => {
    render(
      <TestableLayout>
        <div>Test</div>
      </TestableLayout>
    );

    const layoutBody = screen.getByTestId("layout-body");
    expect(layoutBody).toHaveClass("--font-geist-sans", "--font-geist-mono");
  });

  it("layout structure contains expected elements", () => {
    const layout = RootLayout({ children: <div>Test</div> });
    expect(layout.type).toBe("html");
    expect(layout.props.lang).toBe("en");
  });

  // metadata
  it("exports correct metadata", () => {
    expect(metadata).toBeDefined();
    expect(metadata.title).toBe("Web3 Message Signer Verifier");
    expect(metadata.description).toBe("Take home fullstack assignment");
  });
});
