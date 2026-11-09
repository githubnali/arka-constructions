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

export async function submitEnquiry(input: EnquiryInput) {
  if (!supabaseUrl || !publishableKey) throw new Error("Supabase is not configured.");

  const response = await fetch(`${supabaseUrl}/rest/v1/enquiries`, {
    method: "POST",
    headers: {
      apikey: publishableKey,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({ ...input, page_url: window.location.href.slice(0, 500) }),
  });

  if (!response.ok) throw new Error("We could not save your enquiry. Please try again.");
}
