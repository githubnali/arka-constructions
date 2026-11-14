import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

const devPrerender: Plugin = {
  name: "arka-dev-prerender",
  apply: "serve",
  async transformIndexHtml(html, context) {
    if (!context.server) return html;
    const { render } = await context.server.ssrLoadModule("/src/entry-server.tsx");
    const path = context.path.replace(/\/index\.html$/, "").replace(/\/$/, "");
    const view = path === "/services" ? "services" : path === "/projects" ? "projects" : path === "/packages" ? "packages" : path === "/house-construction-company-chennai" ? "residential" : path === "/commercial-construction-company-chennai" ? "commercial" : path === "/industrial-construction-company-chennai" ? "industrial" : "home";
    return html.replace('<div id="root"></div>', `<div id="root">${render(view)}</div>`);
  },
};

export default defineConfig({
  plugins: [react(), devPrerender],
  build: {
    rollupOptions: {
      input: {
        home: resolve(import.meta.dirname, "index.html"),
        services: resolve(import.meta.dirname, "services/index.html"),
        projects: resolve(import.meta.dirname, "projects/index.html"),
        packages: resolve(import.meta.dirname, "packages/index.html"),
        residential: resolve(import.meta.dirname, "house-construction-company-chennai/index.html"),
        commercial: resolve(import.meta.dirname, "commercial-construction-company-chennai/index.html"),
        industrial: resolve(import.meta.dirname, "industrial-construction-company-chennai/index.html"),
      },
    },
  },
});
