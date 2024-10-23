import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./lib/utils/auth";

const protectedRoutes = ["/app/edit"];

export async function middleware(req: NextRequest) {
  const isAuthenticated = await verifyToken();
  // protected routes can only be accessed by logged in users
  if (!isAuthenticated && protectedRoutes.includes(req.nextUrl.pathname)) {
    const absoluteURL = new URL("/app/login", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
}
