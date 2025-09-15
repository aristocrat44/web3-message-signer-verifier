import { Request, Response } from "express";
import { VerifySignatureRequest, VerifySignatureResponse } from "../types";
import { SignatureVerifier } from "../utils/crypto";

export class VerifyController {
  static async verifySignature(
    req: Request<{}, VerifySignatureResponse, VerifySignatureRequest>,
    res: Response<VerifySignatureResponse>
  ): Promise<void> {
    try {
      const body = req.body;

      console.log("body ===>", body);

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
      const result = SignatureVerifier.verify(message, signature);

      res.status(200).json(result);
    } catch (error) {
      console.error("Controller error:", error);
      res.status(500).json({
        isValid: false,
        error: "Internal server error",
      });
    }
  }
}
