// __tests__/app/page.test.tsx
import LandingPage from "@/app/page";
import { render, screen } from "@testing-library/react";

// mock dynamic provider
jest.mock("@/providers/DynamicProvider", () => {
  const DynamicProvider = ({ children }: { children: React.ReactNode }) => (
    <div data-testid="dynamic-provider">{children}</div>
  );
  DynamicProvider.displayName = "DynamicProvider";
  return DynamicProvider;
});

// mock Connect component
jest.mock("@/components/auth/connect", () => {
  return {
    Connect: () => <button>Connect Wallet</button>,
  };
});

// mock Text component
jest.mock("@/components/core/text", () => {
  return {
    Text: ({ children }: { children: React.ReactNode }) => (
      <span>{children}</span>
    ),
  };
});

describe("Landing Main Page Suite", () => {
  it("renders main header and description", () => {
    render(<LandingPage />);

    expect(
      screen.getByText(/Web3 Message Signer & Verifier/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Securely sign messages with your wallet/i)
    ).toBeInTheDocument();
  });

  it("renders feature cards", () => {
    render(<LandingPage />);

    expect(screen.getByText(/Secure Authentication/i)).toBeInTheDocument();
    expect(screen.getByText(/Message Signing/i)).toBeInTheDocument();
    expect(screen.getByText(/Instant Verification/i)).toBeInTheDocument();
  });

  it("renders connect section with button", () => {
    render(<LandingPage />);

    expect(
      screen.getByText(/Ready to start signing messages securely/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Connect Wallet/i)).toBeInTheDocument();
  });

  it("renders footer", () => {
    render(<LandingPage />);

    expect(screen.getByText(/Powered by Dynamic.xyz/i)).toBeInTheDocument();
  });
});
