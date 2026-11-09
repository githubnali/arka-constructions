import { renderToString } from "react-dom/server";
import ArkaSite from "./arka-site";

export type SiteView = "home" | "services" | "projects" | "packages";

export function render(view: SiteView) {
  return renderToString(<ArkaSite view={view} />);
}
