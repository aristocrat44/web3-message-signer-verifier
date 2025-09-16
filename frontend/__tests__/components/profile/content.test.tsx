// __tests__/components/profile/profileContent.test.tsx
import { ProfileContent } from "@/components/profile/content";
import { useAuth } from "@/hooks/useAuth";
import { render, screen } from "@testing-library/react";

jest.mock("@/hooks/useAuth", () => ({
  useAuth: jest.fn(),
}));

describe("ProfileContent Component Suite", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the user's name or email", () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: { firstName: "xyz", email: "xyz@example.com" },
      primaryWallet: { address: "0x1234567890abcdef" },
    });

    render(<ProfileContent />);

    // Header should display firstName
    expect(screen.getByText(/Welcome, xyz/i)).toBeInTheDocument();

    // Wallet info should be truncated
    expect(screen.getByText(/90abcdef.../i)).toBeInTheDocument();

    // SignMessageForm textarea should exist
    expect(
      screen.getByPlaceholderText(/Enter a message to sign/i)
    ).toBeInTheDocument();
  });

  it("falls back to email if firstName is missing", () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: { email: "xyz@example.com" },
      primaryWallet: null,
    });

    render(<ProfileContent />);

    expect(screen.getByText(/Welcome, xyz@example.com/i)).toBeInTheDocument();
    expect(screen.getByText(/Not connected/i)).toBeInTheDocument();
  });

  it("shows 'Not connected' if wallet is missing", () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: { firstName: "xyz" },
      primaryWallet: null,
    });

    render(<ProfileContent />);

    expect(screen.getByText(/Connected Wallet:/i)).toBeInTheDocument();
    expect(screen.getByText(/Not connected/i)).toBeInTheDocument();
  });
});
