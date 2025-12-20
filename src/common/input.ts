import fs from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export function loadInput(day: number, testNumber?: number) {
  const dayString = day.toString().padStart(2, "0");

  const inputPath =
    testNumber === undefined
      ? path.join(__dirname, `../../input/day-${dayString}/input.txt`)
      : path.join(
          __dirname,
          `../../input/day-${dayString}/test-${testNumber}.txt`,
        );

  return fs.readFileSync(inputPath, "utf8").trim();
}
