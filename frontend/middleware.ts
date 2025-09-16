import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const protectedRoutes = ["/profile"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (!protectedRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  const isAuthenticated = req.cookies.get("auth")?.value === "true";

  if (!isAuthenticated) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

// protect routes
export const config = {
  matcher: ["/profile/:path*"],
};
