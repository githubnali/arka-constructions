export type EnquiryInput = {
  name: string;
  phone: string;
  email?: string;
  site_location: string;
  plot_area?: string;
  service?: string;
  message?: string;
  source: "hero" | "quote_modal";
};

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL?.replace(/\/$/, "");
const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
const recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

export async function submitEnquiry(input: EnquiryInput, recaptchaToken: string, honeypot = "", formStartedAt = 0) {
  if (!supabaseUrl || !publishableKey || !recaptchaSiteKey) throw new Error("Form protection is not configured yet.");
  if (!recaptchaToken) throw new Error("Please complete the security check and try again.");

  const response = await fetch(`${supabaseUrl}/functions/v1/submit-enquiry`, {
    method: "POST",
    headers: {
      apikey: publishableKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...input, recaptcha_token: recaptchaToken, website: honeypot, form_started_at: formStartedAt, page_url: window.location.href.slice(0, 500) }),
  });

  if (!response.ok) {
    const payload = await response.json().catch(() => null);
    throw new Error(payload?.error || "We could not save your enquiry. Please try again.");
  }
}
