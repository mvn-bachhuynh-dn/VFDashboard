export const onRequest = async (context, next) => {
    const path = context.url.pathname;

    // 1. Allow public paths and static assets
    const PUBLIC_PATHS = [
        "/auth/google",
        "/auth/google/callback",
        "/auth/restricted",
        "/api/check-gatekeeper",
        "/api/diag",
        "/favicon.ico",
        "/favicon.svg",
        "/apple-touch-icon.png",
        "/site.webmanifest",
        "/og-image.png",
    ];

    const isPublic = PUBLIC_PATHS.some((p) => path.startsWith(p)) || path.startsWith("/_astro/");
    if (isPublic) {
        return next();
    }

    // 2. Check for Gatekeeper Session
    const gatekeeperSession = context.cookies.get("gatekeeper_token")?.value;

    if (gatekeeperSession === "authorized") {
        return next();
    }

    // 3. Unauthorized -> Redirect using context.redirect for Astro compatibility
    console.log(`[Gatekeeper] Unauthorized access to ${path}. Redirecting.`);
    return context.redirect("/auth/google");
};
