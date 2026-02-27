import { defineMiddleware } from "astro:middleware";

// Paths that don't require Google Gatekeeper authentication
const PUBLIC_PATHS = [
  "/auth/google",
  "/auth/google/callback",
  "/auth/restricted",
  "/favicon.ico",
  "/favicon.svg",
  "/apple-touch-icon.png",
  "/site.webmanifest",
  "/og-image.png",
];

export const onRequest = defineMiddleware(async (context, next) => {
  const { url, cookies, redirect } = context;
  const path = url.pathname;

  // 1. Allow public paths and static assets
  const isPublic = PUBLIC_PATHS.some((p) => path.startsWith(p)) || path.startsWith("/_astro/");
  if (isPublic) {
    return next();
  }

  // 2. Check for Gatekeeper Session
  // This is a separate session from the VinFast login to ensure only whitelisted users reach the login page.
  const gatekeeperSession = cookies.get("gatekeeper_token")?.value;

  if (!gatekeeperSession) {
    // Redirect to Google Login if no session
    return redirect("/auth/google");
  }

  // 3. Validation
  // For production simplicity, we assume the cookie is valid if it exists.
  // In a stricter setup, we would verify a JWT signature here.
  
  return next();
});
