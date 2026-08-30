// scripts/sync-docs.mjs

import fs from "node:fs";
import path from "node:path";

const source = "docs";
const target = "content";
const indexFile = path.join(source, "all-documents-index.md");

function walk(dir) {
  let results = [];

  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);

    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      results = results.concat(walk(fullPath));
    } else if (
      file.endsWith(".md") &&
      file !== "all-documents-index.md"
    ) {
      results.push(fullPath);
    }
  }

  return results;
}

function generateIndex() {
  const docs = walk(source)
    .sort((a, b) => a.localeCompare(b));

  let output = `# Time100 Documentation Index

Generated: ${new Date().toISOString()}

---

# Current Priorities

## P0

- Profile Onboarding
- Homepage
- Auth Guard
- Microsoft Login

## P1

- About Page
- FAQ
- Contact
- Privacy Policy
- Terms of Service

## P2

- Nova V1 Design

## P3

- Voice Chat
- Nova Memory
- Achievement System

---

# Documents

`;

  for (const doc of docs) {
    const relativePath = doc.replaceAll("\\", "/");

    output += `- ${relativePath}\n`;
  }

  output += `

---

# Product

Time100

Turn Ideas Into Reality

A Product of eSeeSKy Inc.

Version: v1.0 RC1
`;

  fs.writeFileSync(indexFile, output);

  console.log("✓ all-documents-index.md generated");
}

function syncDocs() {
  fs.rmSync(target, {
    recursive: true,
    force: true,
  });

  fs.cpSync(source, target, {
    recursive: true,
  });

  console.log("✓ docs synced to content");
}

try {
  generateIndex();
  syncDocs();

  console.log("✓ documentation build complete");
} catch (error) {
  console.error("✗ documentation build failed");
  console.error(error);
  process.exit(1);
}