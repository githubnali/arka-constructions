const corsHeaders = {
  "Access-Control-Allow-Origin": Deno.env.get("ALLOWED_ORIGIN") || "https://arkaconstruction.in",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const json = (body: Record<string, unknown>, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });

async function sha256(value: string) {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (request.method !== "POST") return json({ error: "Method not allowed." }, 405);

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  const recaptchaSecret = Deno.env.get("RECAPTCHA_SECRET_KEY");
  if (!supabaseUrl || !serviceRoleKey || !recaptchaSecret) return json({ error: "Form protection is not configured." }, 500);

  const payload = await request.json().catch(() => null);
  if (!payload || payload.website || typeof payload.recaptcha_token !== "string" || !payload.recaptcha_token.trim()) return json({ error: "Unable to verify this submission." }, 400);
  if (Date.now() - Number(payload.form_started_at || 0) < 2500) return json({ error: "Please take a moment to complete the form." }, 429);

  const clientIp = request.headers.get("cf-connecting-ip") || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const ipHash = await sha256(`${clientIp}:${recaptchaSecret}`);
  const recent = await fetch(`${supabaseUrl}/rest/v1/enquiries?select=id&submission_ip_hash=eq.${ipHash}&created_at=gte.${encodeURIComponent(new Date(Date.now() - 15 * 60_000).toISOString())}&limit=6`, {
    headers: { apikey: serviceRoleKey, Authorization: `Bearer ${serviceRoleKey}` },
  });
  if (recent.ok && (await recent.json()).length >= 5) return json({ error: "Too many enquiries from this connection. Please try again later." }, 429);

  let verification: { success?: boolean };
  try {
    const recaptcha = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret: recaptchaSecret, response: payload.recaptcha_token, ...(clientIp !== "unknown" ? { remoteip: clientIp } : {}) }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!recaptcha.ok) throw new Error("Verification unavailable");
    verification = await recaptcha.json();
  } catch {
    return json({ error: "Security check is unavailable. Please try again." }, 503);
  }
  if (verification?.success !== true) return json({ error: "Security check failed. Please complete reCAPTCHA again." }, 403);

  const { recaptcha_token: _token, website: _website, form_started_at: _started, ...enquiry } = payload;
  const insert = await fetch(`${supabaseUrl}/rest/v1/enquiries`, {
    method: "POST",
    headers: { apikey: serviceRoleKey, Authorization: `Bearer ${serviceRoleKey}`, "Content-Type": "application/json", Prefer: "return=minimal" },
    body: JSON.stringify({ ...enquiry, submission_ip_hash: ipHash, user_agent: request.headers.get("user-agent")?.slice(0, 500), status: "new" }),
  });
  if (!insert.ok) return json({ error: "We could not save your enquiry. Please try again." }, 500);
  return json({ ok: true });
});
