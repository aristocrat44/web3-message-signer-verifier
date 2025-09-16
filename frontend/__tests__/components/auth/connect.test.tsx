// __tests__/components/auth/connect.test.tsx
import { Connect } from "@/components/auth/connect";
import { useAuth } from "@/hooks/useAuth";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

// mock useAuth
const mockHandleLogin = jest.fn();
jest.mock("@/hooks/useAuth", () => ({
  useAuth: jest.fn(),
}));

// mock useRouter
const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

describe("Connect Component Suite", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the Connect button initially", () => {
    (useAuth as jest.Mock).mockReturnValue({
      handleLogin: mockHandleLogin,
      isAuthenticated: false,
    });

    render(<Connect />);

    const button = screen.getByRole("button", { name: /connect/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Connect");
    expect(button).not.toBeDisabled();
  });

  it("calls handleLogin and shows spinner when clicked", async () => {
    (useAuth as jest.Mock).mockReturnValue({
      handleLogin: mockHandleLogin.mockResolvedValueOnce(undefined),
      isAuthenticated: false,
    });

    render(<Connect />);

    const button = screen.getByRole("button", { name: /connect/i });
    fireEvent.click(button);

    // handleLogin should be called
    expect(mockHandleLogin).toHaveBeenCalled();

    // Spinner should appear
    await waitFor(() => {
      expect(screen.getByTestId("spinner-testid")).toBeInTheDocument();
    });
  });

  it("disables button when isAuthenticated is true", () => {
    (useAuth as jest.Mock).mockReturnValue({
      handleLogin: mockHandleLogin,
      isAuthenticated: true,
    });

    render(<Connect />);

    const button = screen.getByRole("button", { name: /connect/i });
    expect(button).toBeDisabled();
  });

  it("redirects to /profile when authenticated", async () => {
    (useAuth as jest.Mock).mockReturnValue({
      handleLogin: mockHandleLogin,
      isAuthenticated: true,
    });

    render(<Connect />);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/profile");
    });
  });

  it("resets loading if handleLogin throws", async () => {
    (useAuth as jest.Mock).mockReturnValue({
      handleLogin: jest.fn().mockRejectedValueOnce(new Error("Failed")),
      isAuthenticated: false,
    });

    // Suppress console.error
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    render(<Connect />);
    const button = screen.getByRole("button", { name: /connect/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(button).not.toBeDisabled();
      expect(screen.queryByTestId("spinner-testid")).not.toBeInTheDocument();
    });

    consoleSpy.mockRestore();
  });
});
