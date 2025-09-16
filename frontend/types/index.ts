export interface SignedMessage {
  id: string;
  message: string;
  signature: string;
  timestamp: Date;
  verified?: boolean;
  signer?: string;
}

export interface VerificationResult {
  isValid: boolean;
  signer?: string;
  originalMessage?: string;
  error?: string;
}
