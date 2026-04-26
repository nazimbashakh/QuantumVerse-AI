import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/auth/signin",
    },
  }
);

// Protect all routes inside the dashboard ecosystem
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/curriculum/:path*",
    "/practicals/:path*",
    "/simulator/:path*",
    "/quantumbot/:path*",
    "/research/:path*",
    "/career/:path*",
    "/community/:path*",
    "/challenges/:path*",
    "/events/:path*",
    "/settings/:path*",
  ],
};
