import { renderToString } from "react-dom/server";
import ArkaSite from "./arka-site";

export type SiteView = "home" | "services" | "projects" | "packages" | "residential" | "commercial" | "industrial";

export function render(view: SiteView) {
  return renderToString(<ArkaSite view={view} />);
}
