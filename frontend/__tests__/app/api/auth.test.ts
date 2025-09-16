// __tests__/api/auth.test.ts
import { POST } from "@/app/api/auth/route";
import { NextResponse } from "next/server";

// Mock NextResponse
jest.mock("next/server", () => ({
  NextResponse: {
    json: jest.fn().mockReturnValue({
      cookies: {
        set: jest.fn(),
      },
    }),
  },
}));

describe("/api/auth POST Suite", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns success response", async () => {
    const mockResponse = {
      cookies: {
        set: jest.fn(),
      },
    };

    (NextResponse.json as jest.Mock).mockReturnValue(mockResponse);

    const response = await POST();

    expect(NextResponse.json).toHaveBeenCalledWith({ success: true });
    expect(response).toBe(mockResponse);
  });

  it("sets auth cookie with correct options", async () => {
    const mockCookieSet = jest.fn();
    const mockResponse = {
      cookies: {
        set: mockCookieSet,
      },
    };

    (NextResponse.json as jest.Mock).mockReturnValue(mockResponse);

    await POST();

    expect(mockCookieSet).toHaveBeenCalledWith("auth", "true", {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });
  });
});
