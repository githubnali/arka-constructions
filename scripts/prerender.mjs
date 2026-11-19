import { readFile, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { render } from "../dist-server/entry-server.js";

const pages = [
  ["index.html", "home"],
  ["services/index.html", "services"],
  ["projects/index.html", "projects"],
  ["packages/index.html", "packages"],
  ["house-construction-company-chennai/index.html", "residential"],
  ["commercial-construction-company-chennai/index.html", "commercial"],
  ["industrial-construction-company-chennai/index.html", "industrial"],
];
const inlinedStylesheets = new Map();

for (const [file, view] of pages) {
  const outputPath = resolve("dist", file);
  const template = await readFile(outputPath, "utf8");
  let html = template.replace('<div id="root"></div>', `<div id="root">${render(view)}</div>`);

  if (html === template) {
    throw new Error(`Could not find the root mount point in ${file}`);
  }

  const stylesheet = html.match(/<link rel="stylesheet"[^>]*href="([^"]+\.css)"[^>]*>/);
  if (stylesheet) {
    const stylesheetPath = resolve("dist", stylesheet[1].replace(/^\//, ""));
    let css = inlinedStylesheets.get(stylesheetPath);
    if (!css) {
      css = await readFile(stylesheetPath, "utf8");
      inlinedStylesheets.set(stylesheetPath, css);
    }
    html = html.replace(stylesheet[0], `<style data-inlined-styles>${css}</style>`);
  }

  await writeFile(outputPath, html);
}

await Promise.all([...inlinedStylesheets.keys()].map((path) => rm(path, { force: true })));

await rm(resolve("dist-server"), { recursive: true, force: true });
