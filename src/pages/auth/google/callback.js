export const prerender = false;

export const GET = async ({ url, cookies, locals, redirect }) => {
    const code = url.searchParams.get("code");
    const runtimeEnv = locals?.runtime?.env || {};

    const GOOGLE_CLIENT_ID = runtimeEnv.GOOGLE_CLIENT_ID;
    const GOOGLE_CLIENT_SECRET = runtimeEnv.GOOGLE_CLIENT_SECRET;
    const kv = runtimeEnv.VFDashboard;

    if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
        console.error("[GoogleAuth] Missing environment variables");
        return new Response("Auth Configuration Error", { status: 500 });
    }

    if (!code) {
        return redirect("/auth/google?error=no_code");
    }

    try {
        const baseUrl = url.origin;
        const redirectUri = `${baseUrl}/auth/google/callback`;

        // 1. Exchange code for tokens
        const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                code,
                client_id: GOOGLE_CLIENT_ID,
                client_secret: GOOGLE_CLIENT_SECRET,
                redirect_uri: redirectUri,
                grant_type: "authorization_code",
            }),
        });

        const tokens = await tokenResponse.json();
        if (!tokens.access_token) {
            console.error("[GoogleAuth] Token exchange failed", tokens);
            return redirect("/auth/google?error=token_failed");
        }

        // 2. Fetch User Info
        const userResponse = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
            headers: { Authorization: `Bearer ${tokens.access_token}` },
        });
        const user = await userResponse.json();
        const email = user.email;

        if (!email) {
            return redirect("/auth/google?error=email_missing");
        }

        // 3. Whitelist check via Cloudflare KV
        let isWhitelisted = false;
        if (kv) {
            const entry = await kv.get(`whitelist:${email.toLowerCase()}`);
            if (entry !== null) {
                isWhitelisted = true;
            }
        }

        if (!isWhitelisted) {
            console.warn(`[GoogleAuth] Denied: ${email}`);
            return redirect("/auth/restricted?email=" + encodeURIComponent(email));
        }

        // 4. Success -> Set Session Cookie and Redirect
        // Using cookies.set and then returning redirect()
        cookies.set("gatekeeper_token", "authorized", {
            path: "/",
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7,
        });

        return redirect("/");
    } catch (e) {
        console.error("OAuth Callback Error:", e);
        return new Response("Internal Authentication Error", { status: 500 });
    }
};
