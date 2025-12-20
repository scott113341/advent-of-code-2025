import test from "node:test";
import assert from "node:assert";

import { loadInput } from "../common/input.js";
import { parseInput, part1, part2 } from "./index.js";

const TEST_1 = loadInput(1, 1);

test("parseInput", () => {
  const parsed = parseInput(TEST_1);
  assert.strictEqual(parsed.length, 10);
  assert.deepEqual(parsed[0], {
    direction: "left",
    steps: 68,
  });
});

test("part1", () => {
  const result = part1(TEST_1);
  assert.strictEqual(result, 3);
});

test("part2", () => {
  const result = part2(TEST_1);
  assert.strictEqual(result, 6);
});
