// __tests__/api/verify.test.ts
import { POST } from "@/app/api/verify/route";

// Mock fetch globally
global.fetch = jest.fn();

describe("/api/verify POST Suite", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("returns 400 when message is missing", async () => {
    const mockRequest = {
      json: jest.fn().mockResolvedValue({ signature: "0x123" }),
    } as unknown as Request;

    const response = await POST(mockRequest);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data).toEqual({
      isValid: false,
      error: "Missing message or signature",
    });
  });

  it("returns 400 when signature is missing", async () => {
    const mockRequest = {
      json: jest.fn().mockResolvedValue({ message: "test" }),
    } as unknown as Request;

    const response = await POST(mockRequest);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data).toEqual({
      isValid: false,
      error: "Missing message or signature",
    });
  });

  it("successfully proxies to backend and returns valid response", async () => {
    const mockBackendResponse = {
      isValid: true,
      signer: "0xabc123",
      originalMessage: "test message",
    };

    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue(mockBackendResponse),
    });

    const mockRequest = {
      json: jest.fn().mockResolvedValue({
        message: "test message",
        signature: "0x123",
      }),
    } as unknown as Request;

    const response = await POST(mockRequest);
    const data = await response.json();

    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:3000/api/verify-signature",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: "test message", signature: "0x123" }),
      }
    );

    expect(response.status).toBe(200);
    expect(data).toEqual(mockBackendResponse);
  });

  it("returns 400 when backend returns error", async () => {
    const mockBackendResponse = {
      isValid: false,
      error: "Invalid signature",
    };

    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      json: jest.fn().mockResolvedValue(mockBackendResponse),
    });

    const mockRequest = {
      json: jest.fn().mockResolvedValue({
        message: "test message",
        signature: "0x123",
      }),
    } as unknown as Request;

    const response = await POST(mockRequest);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data).toEqual(mockBackendResponse);
  });

  it("handles internal server error", async () => {
    (global.fetch as jest.Mock).mockRejectedValue(new Error("Network error"));

    const mockRequest = {
      json: jest.fn().mockResolvedValue({
        message: "test message",
        signature: "0x123",
      }),
    } as unknown as Request;

    const response = await POST(mockRequest);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data).toEqual({
      isValid: false,
      error: "Internal server error",
    });
    expect(console.error).toHaveBeenCalled();
  });

  it("handles invalid JSON in request", async () => {
    const mockRequest = {
      json: jest.fn().mockRejectedValue(new Error("Invalid JSON")),
    } as unknown as Request;

    const response = await POST(mockRequest);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data).toEqual({
      isValid: false,
      error: "Internal server error",
    });
  });
});
