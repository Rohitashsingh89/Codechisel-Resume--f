// scripts/gen-theme-registry.mjs
import { promises as fs } from "fs";
import path from "path";

const themeDir = path.resolve("src/components/(resumes)/resume/theme");
const outFile = path.resolve(themeDir, "registry.generated.ts");

const toSlug = (base) =>
  base
    .replace(/^Theme/, "")
    .replace(/\.(tsx|ts|jsx|js)$/, "")
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/_/g, "-")
    .toLowerCase();

const files = (await fs.readdir(themeDir)).filter((f) => /^Theme[A-Za-z0-9_-]+\.(tsx|ts|jsx|js)$/.test(f));

let imports = `/* AUTO-GENERATED: do not edit */\n"use client";\nimport dynamic from "next/dynamic";\n`;
let registry = `export const themeRegistry: Record<string, any> = {\n`;
let meta = `export const themeMeta: Record<string, { name: string }> = {\n`;

for (const f of files) {
  const slug = toSlug(f);
  const varName = `Theme_${slug.replace(/[-]/g, "_")}`;
  const importPath = `./${f.replace(/\.(tsx|ts|jsx|js)$/, "")}`;
  imports += `const ${varName} = dynamic(() => import("${importPath}"), { ssr: false });\n`;
  registry += `  "${slug}": ${varName},\n`;
  const name = slug.replace(/-/g, " ").replace(/\b\w/g, (m) => m.toUpperCase());
  meta += `  "${slug}": { name: "${name}" },\n`;
}
registry += `};\n`;
meta += `};\n`;

await fs.writeFile(outFile, imports + "\n" + registry + meta, "utf8");
