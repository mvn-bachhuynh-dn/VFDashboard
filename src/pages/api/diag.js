export const prerender = false;

export const GET = async ({ locals, cookies, url }) => {
    const runtimeEnv = locals?.runtime?.env || {};
    const kv = runtimeEnv.VFDashboard;

    // Test cookie setting
    const setTest = url.searchParams.get("setTestCookie");
    if (setTest) {
        cookies.set("diag_test_cookie", "works_" + Date.now(), {
            path: "/",
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            maxAge: 60 * 5 // 5 mins
        });
    }

    const accessToken = cookies.get("access_token")?.value;
    const testCookie = cookies.get("diag_test_cookie")?.value;

    const requiredVars = [
        "GOOGLE_CLIENT_ID",
        "GOOGLE_CLIENT_SECRET",
        "VINFAST_XHASH_SECRET",
        "BACKUP_PROXY_URL",
        "BACKUP_PROXY_URL_2",
        "BACKUP_PROXY_URL_3"
    ];

    const envStatus = {};
    requiredVars.forEach(v => {
        const val = runtimeEnv[v] || (typeof process !== 'undefined' ? process.env[v] : undefined);
        envStatus[v] = {
            exists: !!val,
            length: val ? val.length : 0,
            isDefault: val === "Vinfast@2025"
        };
    });

    let kvStatus = "untested";
    let kvKeys = [];
    if (kv) {
        try {
            const list = await kv.list({ limit: 5 });
            kvStatus = "ok";
            kvKeys = list.keys.map(k => k.name);
        } catch (e) {
            kvStatus = "error: " + e.message;
        }
    } else {
        kvStatus = "missing binding";
    }

    return new Response(JSON.stringify({
        env: envStatus,
        kv: {
            status: kvStatus,
            keys: kvKeys
        },
        session: {
            hasToken: !!accessToken,
            tokenLength: accessToken ? accessToken.length : 0,
            testCookieStatus: testCookie || (setTest ? "setting..." : "not set")
        },
        timestamp: new Date().toISOString(),
        node_version: typeof process !== 'undefined' ? process.version : 'unknown'
    }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
    });
};
