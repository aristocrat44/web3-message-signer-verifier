import { Request, Response } from "express";
import { VerifySignatureRequest, VerifySignatureResponse } from "../types";
import { verifySignature } from "../utils/crypto";

export async function verifySignatureHandler(
  req: Request<{}, VerifySignatureResponse, VerifySignatureRequest>,
  res: Response<VerifySignatureResponse>
): Promise<void> {
  try {
    const body = req.body;

    if (!body || typeof body !== "object") {
      res.status(400).json({
        isValid: false,
        error: "Request body is missing or invalid",
      });
      return;
    }

    const { message, signature } = body;

    if (!message || typeof message !== "string") {
      res.status(400).json({
        isValid: false,
        error: "Invalid message field",
      });
      return;
    }

    if (!signature || typeof signature !== "string") {
      res.status(400).json({
        isValid: false,
        error: "Invalid signature field",
      });
      return;
    }
    const result = verifySignature(message, signature);
    res.status(200).json(result);
  } catch (error) {
    console.error("Controller error:", error);
    res.status(500).json({
      isValid: false,
      error: "Internal server error",
    });
  }
}
