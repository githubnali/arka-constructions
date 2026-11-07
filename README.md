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

## Supabase later
Supabase is selected but not connected. The quote form still prepares a mailto enquiry; no submission is stored automatically. Project/package/service copy remains in the repo. Future Supabase access must use a public publishable key and appropriate RLS; never put a service-role/secret key into VITE_ variables. Notification secrets belong in a server-side function, not the browser.

## Migration
Removed Vinext, Next.js, Cloudflare Workers and Sites runtime dependencies. Previous starter source was backed up outside this repository in `E:/freelancing/tmp/arka-starter-backup`. The previously hosted Sites preview is not updated by these local changes.
