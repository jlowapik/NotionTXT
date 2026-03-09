const fs = require("fs");
const path = require("path");

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/[\s]+/g, "-")
    .replace(/-{2,}/g, "-")
    .replace(/^-|-$/g, "");
}

function resolveOutputPath(title, outDir) {
  const base = slugify(title);
  const ext = ".txt";
  let candidate = path.join(outDir, base + ext);
  let suffix = 1;

  while (fs.existsSync(candidate)) {
    suffix++;
    candidate = path.join(outDir, base + "-" + suffix + ext);
  }

  return candidate;
}

const command = process.argv[2];

if (command === "slugify") {
  process.stdout.write(slugify(process.argv[3]));
} else if (command === "resolve") {
  const title = process.argv[3];
  const outDir = process.argv[4] || "./exports";
  process.stdout.write(resolveOutputPath(title, outDir));
}
