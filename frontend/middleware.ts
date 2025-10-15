import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Optional: Define which routes require auth
const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/public(.*)"
]);

export default clerkMiddleware(async (auth, req) => {
  // Always await the auth() call – it returns a Promise
  const session = await auth();
  const { userId } = session;
  const { pathname } = req.nextUrl;

  // If user not signed in and route not public → redirect to sign-in
  if (!userId && !isPublicRoute(req)) {
    return session.redirectToSignIn({ returnBackUrl: req.url });
  }

  // Continue the request
  return Response.next();
});

// Clerk requires this export for edge middleware
export const config = {
  matcher: [
    /*
     * Match all routes except static files, _next, and api routes
     */
    "/((?!_next|.*\\..*|api/public).*)"
  ]
};
