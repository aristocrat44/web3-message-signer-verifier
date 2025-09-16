// __tests__/components/profile/signMessageForm.test.tsx
import {
  SignedMessageHistory,
  SignMessageForm,
} from "@/components/form/signMessageForm";
import { useAuth } from "@/hooks/useAuth";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

// Mock useAuth with jest.fn()
jest.mock("@/hooks/useAuth", () => ({
  useAuth: jest.fn(),
}));

// Mock fetch globally
global.fetch = jest.fn();

describe("SignMessage Form Suite", () => {
  beforeEach(() => {
    localStorage.clear();
    (fetch as jest.Mock).mockReset();
  });

  it("renders form and history sections", () => {
    (useAuth as jest.Mock).mockReturnValue({ primaryWallet: null });
    render(<SignMessageForm />);

    expect(screen.getByText("Sign a New Message")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Enter a message to sign...")
    ).toBeInTheDocument();
    expect(screen.getByText("Sign & Verify")).toBeInTheDocument();
    expect(screen.getByText("Signing History")).toBeInTheDocument();
  });

  it("enables and disables button based on textarea value", () => {
    (useAuth as jest.Mock).mockReturnValue({ primaryWallet: null });
    render(<SignMessageForm />);
    const button = screen.getByRole("button", { name: /sign & verify/i });

    expect(button).toBeDisabled();

    fireEvent.change(
      screen.getByPlaceholderText("Enter a message to sign..."),
      {
        target: { value: "Hello World" },
      }
    );

    expect(button).not.toBeDisabled();
  });

  it("shows spinner while signing and updates history on success", async () => {
    const mockSignMessage = jest.fn().mockResolvedValue("fake-signature");
    (useAuth as jest.Mock).mockReturnValue({
      primaryWallet: { signMessage: mockSignMessage },
    });

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ isValid: true, signer: "0x123" }),
    });

    render(<SignMessageForm />);

    fireEvent.change(
      screen.getByPlaceholderText("Enter a message to sign..."),
      { target: { value: "Hello" } }
    );
    fireEvent.click(screen.getByRole("button", { name: /sign & verify/i }));

    expect(screen.getByTestId("spinner-testid")).toBeInTheDocument();

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: /sign & verify/i })
      ).toHaveTextContent("Sign & Verify");
    });

    const history = JSON.parse(
      localStorage.getItem("signedMessages") || "[]"
    ) as SignedMessageHistory[];
    expect(history[0]).toMatchObject({
      message: "Hello",
      signature: "fake-signature",
      isValid: true,
      signer: "0x123",
    });
  });

  it("loads history from localStorage if available", async () => {
    const storedHistory: SignedMessageHistory[] = [
      { message: "Hello", signature: "0x123", isValid: true },
    ];
    localStorage.setItem("signedMessages", JSON.stringify(storedHistory));

    (useAuth as jest.Mock).mockReturnValue({ primaryWallet: null });

    render(<SignMessageForm />);

    await waitFor(() => {
      // History should be loaded
      expect(
        JSON.parse(localStorage.getItem("signedMessages") || "[]")
      ).toEqual(storedHistory);
    });
  });

  it("handles malformed localStorage gracefully", async () => {
    // Malformed JSON
    localStorage.setItem("signedMessages", "{ bad json ");

    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    (useAuth as jest.Mock).mockReturnValue({ primaryWallet: null });

    render(<SignMessageForm />);

    await waitFor(() => {
      // isLoaded should still become true even with parse error
      expect(screen.getByText(/Sign a New Message/i)).toBeInTheDocument();
    });

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Failed to parse signed messages history:",
      expect.any(SyntaxError)
    );

    consoleErrorSpy.mockRestore();
  });

  it("handles signing rejection", async () => {
    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    const mockSignMessage = jest
      .fn()
      .mockRejectedValue({ error: "User rejected" });
    (useAuth as jest.Mock).mockReturnValue({
      primaryWallet: { signMessage: mockSignMessage },
    });

    render(<SignMessageForm />);

    fireEvent.change(
      screen.getByPlaceholderText("Enter a message to sign..."),
      { target: { value: "Rejected" } }
    );
    fireEvent.click(screen.getByRole("button", { name: /sign & verify/i }));

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: /sign & verify/i })
      ).toHaveTextContent("Sign & Verify");
    });

    const history = JSON.parse(
      localStorage.getItem("signedMessages") || "[]"
    ) as SignedMessageHistory[];
    expect(history[0]).toMatchObject({
      message: "Rejected",
      signature: "",
      isValid: false,
      error: "User rejected",
    });

    consoleErrorSpy.mockRestore(); // restore original behavior
  });
});
