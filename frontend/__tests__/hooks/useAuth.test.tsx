// __tests__/hooks/useAuth.test.tsx
import { useAuth } from "@/hooks/useAuth";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { act, renderHook } from "@testing-library/react";

const mockSetShowAuthFlow = jest.fn();

// Mock useDynamicContext
jest.mock("@dynamic-labs/sdk-react-core", () => ({
  useDynamicContext: jest.fn(),
}));

describe("useAuth Hook Suite", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns user, primaryWallet and computes isAuthenticated correctly", () => {
    const mockUser = { email: "test@example.com" };
    const mockWallet = { address: "0x123" };

    (useDynamicContext as jest.Mock).mockReturnValue({
      user: mockUser,
      primaryWallet: mockWallet,
      setShowAuthFlow: mockSetShowAuthFlow,
    });

    const { result } = renderHook(() => useAuth());

    expect(result.current.user).toBe(mockUser);
    expect(result.current.primaryWallet).toBe(mockWallet);
    expect(result.current.isAuthenticated).toBe(true);
  });

  it("isAuthenticated is false when no user or no wallet", () => {
    (useDynamicContext as jest.Mock).mockReturnValue({
      user: null,
      primaryWallet: null,
      setShowAuthFlow: mockSetShowAuthFlow,
    });

    const { result } = renderHook(() => useAuth());

    expect(result.current.isAuthenticated).toBe(false);
  });

  it("handleLogin calls setShowAuthFlow and fetches /api/auth", async () => {
    const mockUser = { email: "test@example.com" };
    const mockWallet = { address: "0x123" };

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ success: true }),
      })
    ) as jest.Mock;

    (useDynamicContext as jest.Mock).mockReturnValue({
      user: mockUser,
      primaryWallet: mockWallet,
      setShowAuthFlow: mockSetShowAuthFlow,
    });

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.handleLogin();
    });

    expect(mockSetShowAuthFlow).toHaveBeenCalledWith(true);
    expect(global.fetch).toHaveBeenCalledWith("/api/auth", { method: "POST" });
  });
});
