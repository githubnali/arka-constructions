import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
export default defineConfig({plugins:[react()],build:{rollupOptions:{input:{home:resolve(import.meta.dirname,"index.html"),services:resolve(import.meta.dirname,"services/index.html"),projects:resolve(import.meta.dirname,"projects/index.html"),packages:resolve(import.meta.dirname,"packages/index.html")}}}});
