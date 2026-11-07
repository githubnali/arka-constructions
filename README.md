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

## Upload to your hosting
1. Run `npm run build`.
2. Back up any existing website before replacing files.
3. Upload the **contents** of `dist/` to your domain document root (commonly `public_html`), not the dist folder itself.
4. Keep the assets, images, services, projects and packages folders intact. Include favicon.svg and index.html.
5. Open `/`, `/services/`, `/projects/`, `/packages/` and refresh each directly.

This is a multi-page static build: each dedicated route has an actual index.html, so Apache/LiteSpeed directory serving works without an SPA rewrite or Node server. Hosting must serve index.html as the directory index. Build assumes your domain root, not a subfolder. Domain/DNS and hosting credentials are not needed to build locally. No deployment was made to your hosting.

## Supabase later
Supabase is selected but not connected. The quote form still prepares a mailto enquiry; no submission is stored automatically. Project/package/service copy remains in the repo. Future Supabase access must use a public publishable key and appropriate RLS; never put a service-role/secret key into VITE_ variables. Notification secrets belong in a server-side function, not the browser.

## Migration
Removed Vinext, Next.js, Cloudflare Workers and Sites runtime dependencies. Previous starter source was backed up outside this repository in `E:/freelancing/tmp/arka-starter-backup`. The previously hosted Sites preview is not updated by these local changes.
