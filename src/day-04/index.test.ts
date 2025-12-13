import test from "node:test";
import assert from "node:assert";

import { loadInput } from "../common/input";
import { parseInput, part1, part2 } from "./index";

const TEST_1 = loadInput(4, 1);

test("parseInput", () => {
  const grid = parseInput(TEST_1);
  assert.equal(grid.has({ row: 0, col: 0 }), false);
  assert.equal(grid.has({ row: 0, col: 1 }), false);
  assert.equal(grid.has({ row: 0, col: 2 }), true);
});

test("part1", () => {
  const result = part1(TEST_1);
  assert.strictEqual(result, 13);
});

test("part2", () => {
  const result = part2(TEST_1);
  assert.strictEqual(result, 43);
});
