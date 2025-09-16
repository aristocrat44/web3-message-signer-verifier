const API_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000/api";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message, signature } = body;

    if (!message || !signature) {
      return Response.json(
        { isValid: false, error: "Missing message or signature" },
        { status: 400 }
      );
    }

    const backendResponse = await fetch(`${API_BASE_URL}/verify-signature`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message, signature }),
    });

    const result = await backendResponse.json();

    return Response.json(result, {
      status: backendResponse.ok ? 200 : 400,
    });
  } catch (error) {
    console.error("API route error:", error);
    return Response.json(
      { isValid: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
