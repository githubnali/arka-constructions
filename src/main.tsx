import { createRoot } from "react-dom/client";
import ArkaSite from "./arka-site";
import "./styles.css";
import "./home.css";
const path = window.location.pathname.replace(/\/index\.html$/, "").replace(/\/$/, "");
const view = path === "/services" ? "services" : path === "/projects" ? "projects" : path === "/packages" ? "packages" : "home";
createRoot(document.getElementById("root")!).render(<ArkaSite view={view} />);
