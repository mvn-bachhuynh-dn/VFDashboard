export const prerender = false;

export const GET = async ({ redirect, locals, url }) => {
    const runtimeEnv = locals?.runtime?.env || import.meta.env || {};
    const GOOGLE_CLIENT_ID = runtimeEnv.GOOGLE_CLIENT_ID || (typeof process !== "undefined" ? process.env.GOOGLE_CLIENT_ID : undefined);

    if (!GOOGLE_CLIENT_ID) {
        console.error("GOOGLE_CLIENT_ID is not configured");
        return new Response("Auth Configuration Error", { status: 500 });
    }

    // Determine redirect URI
    const baseUrl = url.origin;
    const redirectUri = `${baseUrl}/auth/google/callback`;

    // Standard Google OAuth2 Auth URL
    const googleAuthUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
    googleAuthUrl.searchParams.set("client_id", GOOGLE_CLIENT_ID);
    googleAuthUrl.searchParams.set("redirect_uri", redirectUri);
    googleAuthUrl.searchParams.set("response_type", "code");
    googleAuthUrl.searchParams.set("scope", "openid email profile");
    googleAuthUrl.searchParams.set("access_type", "online");
    googleAuthUrl.searchParams.set("prompt", "select_account");

    return new Response(null, {
        status: 302,
        headers: { Location: googleAuthUrl.toString() },
    });
};
