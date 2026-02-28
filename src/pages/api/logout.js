export const prerender = false;

export const POST = async ({ request, cookies }) => {
  const isLocalhost = new URL(request.url).hostname === "localhost";
  const clearOpts = {
    path: "/",
    httpOnly: true,
    secure: !isLocalhost,
    sameSite: "lax",
    maxAge: 0,
  };

  cookies.set("access_token", "", clearOpts);
  cookies.set("refresh_token", "", clearOpts);
  cookies.set("vf_region", "", { path: "/", maxAge: 0 });

  const responseObj = new Response(JSON.stringify({ success: true }));
  responseObj.headers.set("Content-Type", "application/json");
  return responseObj;
};
