import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ success: true });

  res.cookies.set("auth", "", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    expires: new Date(0), // immediately expire
  });

  return res;
}
