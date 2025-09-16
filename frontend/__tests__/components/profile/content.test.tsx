// __tests__/components/profile/profileContent.test.tsx
import { ProfileContent } from "@/components/profile/content";
import { useAuth } from "@/hooks/useAuth";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";

// Mock useAuth
jest.mock("@/hooks/useAuth", () => ({
  useAuth: jest.fn(),
}));

// Mock next/navigation
const pushMock = jest.fn();
const refreshMock = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
    refresh: refreshMock,
  }),
}));

// Mock fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ success: true }),
  })
) as jest.Mock;

describe("ProfileContent Component Suite", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the user's name and truncated wallet", () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: { firstName: "xyz", email: "xyz@example.com" },
      primaryWallet: { address: "0x1234567890abcdef" },
    });

    render(<ProfileContent />);

    expect(screen.getByText(/Welcome, xyz/i)).toBeInTheDocument();
    expect(screen.getByText(/90abcdef.../i)).toBeInTheDocument();
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

  it("logs out and redirects on logout button click", async () => {
    (useAuth as jest.Mock).mockReturnValue({
      user: { firstName: "xyz", email: "xyz@example.com" },
      primaryWallet: { address: "0x1234567890abcdef" },
    });

    render(<ProfileContent />);

    const logoutButton = screen.getByText("Logout");

    await act(async () => {
      fireEvent.click(logoutButton);
    });
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith("/api/auth/logout", {
        method: "POST",
      });
      expect(pushMock).toHaveBeenCalledWith("/");
      expect(refreshMock).toHaveBeenCalled();
    });
  });
});
