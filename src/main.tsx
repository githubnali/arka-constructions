import { createRoot, hydrateRoot } from "react-dom/client";
import ArkaSite from "./arka-site";
import "./styles.css";
import "./home.css";
const path = window.location.pathname.replace(/\/index\.html$/, "").replace(/\/$/, "");
const view = path === "/services" ? "services" : path === "/projects" ? "projects" : path === "/packages" ? "packages" : "home";
const root = document.getElementById("root")!;
const app = <ArkaSite view={view} />;

if (root.hasChildNodes()) {
  hydrateRoot(root, app);
} else {
  createRoot(root).render(app);
}
