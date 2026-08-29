import fs from "node:fs";

const source = "docs";
const target = "content";

fs.rmSync(target, {
  recursive: true,
  force: true,
});

fs.cpSync(source, target, {
  recursive: true,
});

console.log("✓ docs synced to content");