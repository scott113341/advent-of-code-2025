import { fileURLToPath } from "node:url";
import { realpathSync } from "node:fs";

export class Range {
  readonly start: number;
  readonly endInclusive: number;

  constructor(start: number, endInclusive: number) {
    this.start = start;
    this.endInclusive = endInclusive;
  }

  *[Symbol.iterator]() {
    let current = this.start;
    while (current <= this.endInclusive) {
      yield current;
      current++;
    }
  }

  includes(n: number) {
    return n >= this.start && n <= this.endInclusive;
  }
}

/**
 * Checks if the given importMeta is the main entry point of the process.
 * @param importMeta The import.meta object from the module.
 * @returns true if the module is the main entry point.
 */
export function isMain(importMeta: ImportMeta): boolean {
  if (!process.argv[1]) {
    return false;
  }

  try {
    const scriptPath = realpathSync(process.argv[1]);
    const modulePath = realpathSync(fileURLToPath(importMeta.url));
    return scriptPath === modulePath;
  } catch {
    return false;
  }
}

export function* times(n: number) {
  for (let count = 1; count <= n; count++) {
    yield count;
  }
}
