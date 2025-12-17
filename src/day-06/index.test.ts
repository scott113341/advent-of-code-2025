import test from "node:test";
import assert from "node:assert";

import { loadInput } from "../common/input";
import { parseInput1, parseInput2, part1, part2 } from "./index";

const TEST_1 = loadInput(6, 1);

test("parseInput1", () => {
  const problems = parseInput1(TEST_1);
  assert.strictEqual(problems.length, 4);
  assert.deepEqual(problems[0], {
    numbers: [123, 45, 6],
    operation: "*",
  });
});

test("parseInput2", () => {
  const problems = parseInput2(TEST_1);
  assert.strictEqual(problems.length, 4);
  assert.deepEqual(problems, [
    {
      numbers: [4, 431, 623],
      operation: "+",
    },
    {
      numbers: [175, 581, 32],
      operation: "*",
    },
    {
      numbers: [8, 248, 369],
      operation: "+",
    },
    {
      numbers: [356, 24, 1],
      operation: "*",
    },
  ]);
});

test("part1", () => {
  const result = part1(TEST_1);
  assert.strictEqual(result, 4277556);
});

test("part2", () => {
  const result = part2(TEST_1);
  assert.strictEqual(result, 3263827);
});
