import test from "node:test";
import assert from "node:assert";

import { loadInput } from "../common/input";
import { parseInput, part1, part2 } from "./index";

const TEST_1 = loadInput(5, 1);

test("parseInput", () => {
  const ingredients = parseInput(TEST_1);
  assert.strictEqual(ingredients.freshRanges.length, 4);
  assert.deepEqual([...ingredients.freshRanges[0]], [3, 4, 5]);
  assert.deepEqual(ingredients.ingredientIds, [1, 5, 8, 11, 17, 32]);
});

test("part1", () => {
  const result = part1(TEST_1);
  assert.strictEqual(result, 3);
});

test("part2", () => {
  const result = part2(TEST_1);
  assert.strictEqual(result, 14);
});
