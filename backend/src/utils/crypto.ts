import { verifyMessage } from "ethers";
import { VerifySignatureResponse } from "../types";

export function verifySignature(
  message: string,
  signature: string
): VerifySignatureResponse {
  try {
    if (!message || typeof message !== "string") {
      return {
        isValid: false,
        error: "Message must be a non-empty string",
      };
    }

    if (!signature || typeof signature !== "string") {
      return {
        isValid: false,
        error: "Signature must be a non-empty string",
      };
    }

    if (!signature.startsWith("0x") || signature.length !== 132) {
      return {
        isValid: false,
        error:
          "Invalid signature format. Expected 0x followed by 130 hex characters",
      };
    }

    if (!/^0x[0-9a-fA-F]{130}$/.test(signature)) {
      return {
        isValid: false,
        error: "Signature contains invalid characters",
      };
    }

    const signerAddress = verifyMessage(message, signature);

    return {
      isValid: true,
      signer: signerAddress,
      originalMessage: message,
    };
  } catch (error) {
    console.error("Signature verification error:", error);

    return {
      isValid: false,
      error: error instanceof Error ? error.message : "Invalid signature",
    };
  }
}
