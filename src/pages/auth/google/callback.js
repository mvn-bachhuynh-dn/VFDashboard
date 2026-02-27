export const prerender = false;

export const GET = async ({ url, cookies, redirect, locals }) => {
    const code = url.searchParams.get("code");
    const runtimeEnv = locals?.runtime?.env || import.meta.env || {};

    const GOOGLE_CLIENT_ID = runtimeEnv.GOOGLE_CLIENT_ID || (typeof process !== "undefined" ? process.env.GOOGLE_CLIENT_ID : undefined);
    const GOOGLE_CLIENT_SECRET = runtimeEnv.GOOGLE_CLIENT_SECRET || (typeof process !== "undefined" ? process.env.GOOGLE_CLIENT_SECRET : undefined);
    const kv = runtimeEnv.VFDashboard;

    if (!code || !GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
        return redirect("/auth/google?error=config_missing");
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
            console.error("Failed to get access token", tokens);
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
        // Key format: whitelist:email@gmail.com
        let isWhitelisted = false;
        if (kv) {
            const whitelistKey = `whitelist:${email.toLowerCase()}`;
            const entry = await kv.get(whitelistKey);
            if (entry !== null) {
                isWhitelisted = true;
            }
        } else {
            // In DEV or if KV is missing, we might want a fallback or stricter behavior
            console.warn("KV VFDashboard not found, denying access by default.");
        }

        if (!isWhitelisted) {
            console.warn(`Access denied for: ${email}`);
            return redirect("/auth/restricted?email=" + encodeURIComponent(email));
        }

        // 4. Success -> Set Session Cookie
        // In a real app, sign this token or use a session store. 
        // For this dashboard, we just set a simple token.
        cookies.set("gatekeeper_token", "authorized", {
            path: "/",
            httpOnly: true,
            secure: url.protocol === "https:",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7, // 1 week
        });

        return redirect("/");
    } catch (e) {
        console.error("OAuth Callback Error:", e);
        return redirect("/auth/google?error=internal_error");
    }
};
