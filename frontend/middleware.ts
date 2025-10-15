import { NextResponse } from "next/server";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Public routes that do NOT require authentication
const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/public(.*)"
]);

export default clerkMiddleware(async (auth, req) => {
  // Always await auth() — it returns a Promise
  const session = await auth();
  const { userId } = session;

  // If not signed in and route is protected, redirect to sign-in
  if (!userId && !isPublicRoute(req)) {
    return session.redirectToSignIn({ returnBackUrl: req.url });
  }

  // Otherwise allow request to continue
  return NextResponse.next();
});

// Required matcher for edge middleware
export const config = {
  matcher: [
    // Match all routes except Next.js internals and static files
    "/((?!_next|.*\\..*|api/public).*)"
  ]
};
