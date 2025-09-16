// __tests__/components/profile/signedHistory.test.tsx
import { SignedHistory } from "@/components/profile/signedHistory";
import { render, screen, within } from "@testing-library/react";

describe("SignedHistory Component Suite", () => {
  it("renders fallback text when signedHistory is empty", () => {
    render(<SignedHistory signedHistory={[]} />);
    expect(screen.getByText(/no signed messages yet/i)).toBeInTheDocument();
  });

  it("renders a list of signed messages correctly", () => {
    const history = [
      {
        message: "Hello World",
        signature: "0x123signature",
        isValid: true,
        signer: "0xabcSigner",
      },
      {
        message: "Second Message",
        signature: "",
        isValid: false,
        error: "User rejected",
        signer: "",
      },
    ];

    render(<SignedHistory signedHistory={history} />);

    // Check messages
    expect(screen.getAllByText(/Hello World/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Second Message/i)[0]).toBeInTheDocument();

    // Check validity
    expect(screen.getByText(/Yes/i)).toHaveClass("text-green-500");
    expect(screen.getByText(/No - User rejected/i)).toHaveClass("text-red-500");

    // Check signer
    expect(screen.getAllByText(/0xabcSigner/i)[0]).toBeInTheDocument();
    expect(screen.getByText(/No Signer/i)).toBeInTheDocument();

    // Check signature
    expect(screen.getAllByText(/0x123signature/i)[0]).toBeInTheDocument();
    expect(screen.getByText(/No signature/i)).toBeInTheDocument();
  });

  it("renders fallback values for missing message and undefined isValid", () => {
    const history = [
      {
        message: "",
        signature: "0x456signature",
        isValid: undefined,
        signer: "",
      },
    ];

    render(<SignedHistory signedHistory={history} />);

    const item = screen.getByRole("listitem");

    // fallback for missing message
    expect(
      within(item).getAllByText(/Unknown message/i)[0]
    ).toBeInTheDocument();

    // fallback for undefined isValid
    expect(within(item).getByText(/No -/i)).toHaveClass("text-red-500");

    // fallback for signer
    expect(within(item).getByText(/No Signer/i)).toBeInTheDocument();

    // signature
    expect(within(item).getAllByText(/0x456signature/i)[0]).toBeInTheDocument();
  });
});
