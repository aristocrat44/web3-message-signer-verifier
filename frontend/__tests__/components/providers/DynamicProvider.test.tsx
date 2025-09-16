// __tests__/providers/DynamicProvider.test.tsx
import DynamicProvider from "@/providers/DynamicProvider";
import { render, screen } from "@testing-library/react";

// Mock external modules
jest.mock("@dynamic-labs/sdk-react-core", () => ({
  DynamicContextProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="dynamic-context-provider">{children}</div>
  ),
  IsBrowser: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="is-browser">{children}</div>
  ),
}));

jest.mock("@dynamic-labs/ethereum", () => ({
  EthereumWalletConnectors: jest.fn(),
}));

describe("DynamicProvider Suite", () => {
  it("renders children inside the providers", () => {
    render(
      <DynamicProvider>
        <div data-testid="child-element">Hello World</div>
      </DynamicProvider>
    );

    // Check that IsBrowser wrapper exists
    expect(screen.getByTestId("is-browser")).toBeInTheDocument();

    // Check that DynamicContextProvider wrapper exists
    expect(screen.getByTestId("dynamic-context-provider")).toBeInTheDocument();

    // Check that the child element is rendered
    expect(screen.getByTestId("child-element")).toBeInTheDocument();
    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });
});
