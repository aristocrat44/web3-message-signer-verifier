// __tests__/api/auth/logout.test.ts
import { POST } from "@/app/api/auth/logout/route";
import { NextResponse } from "next/server";

// Mock NextResponse
jest.mock("next/server", () => ({
  NextResponse: {
    json: jest.fn().mockImplementation((data) => ({
      json: () => Promise.resolve(data),
      cookies: {
        set: jest.fn(),
      },
    })),
  },
}));

const mockedNextResponse = NextResponse as jest.Mocked<typeof NextResponse>;

describe("/api/auth/logout POST Suite", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return success and clear auth cookie", async () => {
    const response = await POST();

    // check the NextResponse.json was called with success: true
    expect(mockedNextResponse.json).toHaveBeenCalledWith({
      success: true,
    });

    // check the auth cookie was cleared with correct options
    expect(response.cookies.set).toHaveBeenCalledWith("auth", "", {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      expires: new Date(0),
    });
  });
});
