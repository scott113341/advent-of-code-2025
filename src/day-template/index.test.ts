import test from "node:test";
import assert from "node:assert";

import { loadInput } from "../common/input";
import { parseInput, part1, part2 } from "./index";

const TEST_1 = loadInput(9999, 1);

test("parseInput", () => {
  const parsed = parseInput(TEST_1);
  assert.strictEqual(parsed.length, 10);
  assert.deepEqual(parsed[0], undefined);
});

test("part1", () => {
  const result = part1(TEST_1);
  assert.strictEqual(result, 111);
});

test("part2", () => {
  const result = part2(TEST_1);
  assert.strictEqual(result, 222);
});
