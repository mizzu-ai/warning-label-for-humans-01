import { writeFileSync, mkdirSync } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const WARNING_LABEL = "WARNING: Nods along, hears nothing, agrees to terms unread since birth";

function validateLabel(label: string): void {
  if (label.length > 160) {
    throw new Error(`Label exceeds 160 characters: ${label.length}`);
  }
  if (label.includes("\n") || label.includes("\r")) {
    throw new Error("Label contains newline characters");
  }
  if (!label.trim()) {
    throw new Error("Label is empty or whitespace only");
  }
}

function writeOutput(label: string): void {
  const primaryPath = "/output/entry.txt";
  const fallbackPath = resolve(__dirname, "output/entry.txt");

  try {
    mkdirSync(dirname(primaryPath), { recursive: true });
    writeFileSync(primaryPath, label, { encoding: "utf-8" });
    console.log(`Written to ${primaryPath}`);
  } catch {
    mkdirSync(dirname(fallbackPath), { recursive: true });
    writeFileSync(fallbackPath, label, { encoding: "utf-8" });
    console.log(`Written to fallback: ${fallbackPath}`);
  }
}

validateLabel(WARNING_LABEL);
writeOutput(WARNING_LABEL);

console.log(WARNING_LABEL);
console.log(`Character count: ${WARNING_LABEL.length}`);
