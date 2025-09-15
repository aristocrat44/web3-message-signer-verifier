export interface VerifySignatureRequest {
  message: string;
  signature: string;
}

export interface VerifySignatureResponse {
  isValid: boolean;
  signer?: string;
  originalMessage?: string;
  error?: string;
}

export interface ApiError {
  message: string;
  statusCode: number;
}