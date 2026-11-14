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

for (const [file, view] of pages) {
  const outputPath = resolve("dist", file);
  const template = await readFile(outputPath, "utf8");
  const html = template.replace('<div id="root"></div>', `<div id="root">${render(view)}</div>`);

  if (html === template) {
    throw new Error(`Could not find the root mount point in ${file}`);
  }

  await writeFile(outputPath, html);
}

await rm(resolve("dist-server"), { recursive: true, force: true });
