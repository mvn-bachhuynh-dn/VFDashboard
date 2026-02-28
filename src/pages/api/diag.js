export const prerender = false;

export const GET = async ({ locals }) => {
    const runtimeEnv = locals?.runtime?.env || {};

    const requiredVars = [
        "GOOGLE_CLIENT_ID",
        "GOOGLE_CLIENT_SECRET",
        "VINFAST_XHASH_SECRET",
        "BACKUP_PROXY_URL",
        "BACKUP_PROXY_URL_2",
        "BACKUP_PROXY_URL_3"
    ];

    const status = {};
    requiredVars.forEach(v => {
        const val = runtimeEnv[v] || (typeof process !== 'undefined' ? process.env[v] : undefined);
        status[v] = {
            exists: !!val,
            length: val ? val.length : 0,
            prefix: val ? val.substring(0, 3) + "..." : null
        };
    });

    return new Response(JSON.stringify({
        env: status,
        timestamp: new Date().toISOString(),
        userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'server'
    }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
    });
};
