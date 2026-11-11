# ARKA Constructions

Standard React + TypeScript + Vite frontend. All editorial content lives in `src/arka-site.tsx`; design tokens and responsive styles live in `src/styles.css`.

## Development
Use Node 22.13+ (or a compatible newer LTS release).
```
npm ci
npm run dev
npm run build
npm run preview
```

## Deploy to Hostinger
1. Run `npm run build`.
2. Back up any existing website before replacing files.
3. In Hostinger File Manager, open the document root for `arkaconstruction.in` (normally `public_html`).
4. Upload the **contents** of `dist/`, not the `dist` folder itself. Include the hidden `.htaccess` file.
5. Keep the assets, images, services, projects and packages folders intact.
6. Enable the free SSL certificate and confirm both HTTP and `www` redirect to `https://arkaconstruction.in/`.
7. Open `/`, `/services/`, `/projects/`, `/packages/` and refresh each directly.

This is a multi-page static build: each dedicated route has an actual index.html, so Hostinger's Apache/LiteSpeed hosting works without a Node server. The included `.htaccess` enforces the preferred HTTPS/non-www domain and configures safe static-asset caching.

After launch, submit `https://arkaconstruction.in/sitemap.xml` in Google Search Console and Bing Webmaster Tools. Confirm that `robots.txt`, `sitemap.xml`, `llms.txt` and `llms-full.txt` return HTTP 200. Domain/DNS and hosting credentials are not needed to build locally. No deployment was made to the hosting account.

## Enquiry forms and Google reCAPTCHA
Both enquiry forms use Google reCAPTCHA v2 (the **I'm not a robot checkbox**) and submit through the Supabase `submit-enquiry` Edge Function. The function verifies the token with Google before storing an enquiry. Tokens expire and are single-use; both forms clear them after each submission attempt.

1. Register a **reCAPTCHA v2 / I'm not a robot Checkbox** key pair in the [Google reCAPTCHA admin console](https://www.google.com/recaptcha/admin/create). Allow `arkaconstruction.in` and any development/preview hostnames you use. Keep Google's domain validation enabled. Use a v2 key compatible with `api.js` and the `siteverify` API.
2. Set `VITE_RECAPTCHA_SITE_KEY` in `.env.local` and your hosting build environment. This is the public site key. Keep the existing `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` settings.
3. Set `RECAPTCHA_SECRET_KEY` in Supabase Edge Function secrets to the matching Google secret. Never put this secret or the Supabase service-role key in a `VITE_` variable. Set `ALLOWED_ORIGIN` to the frontend origin without a trailing slash (current Netlify deployment: `https://arka-constructions.netlify.app`; custom domain: `https://arkaconstruction.in`).
4. Deploy the updated `supabase/functions/submit-enquiry` function and rebuild/deploy the frontend together; they now exchange `recaptcha_token`. CLI deployments read `[functions.submit-enquiry]` in `supabase/config.toml` to disable JWT verification for this public form. When deploying via the dashboard, disable **Verify JWT** there as well; the function verifies Google's token itself.
5. Remove the retired CAPTCHA provider's site-key build variable and backend secret from hosted environments.
6. Verify both the homepage enquiry form and quote modal on an allowed domain: complete the checkbox, submit, and confirm the enquiry is saved. Also check expiry, retry, and reopening the modal.

Without the Google keys, submission stays disabled. The backend also retains its existing honeypot, minimum completion time, and submission rate limit. No hosting deployment is performed by a local build.

## Migration
Removed Vinext, Next.js, Cloudflare Workers and Sites runtime dependencies. Previous starter source was backed up outside this repository in `E:/freelancing/tmp/arka-starter-backup`. The previously hosted Sites preview is not updated by these local changes.
