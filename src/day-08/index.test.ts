import test from "node:test";
import assert from "node:assert";

import { loadInput } from "../common/input.js";
import { Circuits, parseInput, part1, part2 } from "./index.js";

const TEST_1 = loadInput(8, 1);

test("parseInput", () => {
  const parsed = parseInput(TEST_1);
  assert.strictEqual(parsed.length, 20);
  assert.deepEqual(parsed[0], "162,817,812");
});

test("combineShortest", () => {
  const circuits = new Circuits(parseInput(TEST_1));
  assert.equal(circuits.circuitMemberships.size, 20);

  // First iteration
  circuits.combineShortest(1);
  assert.deepEqual(
    circuits.circuitMemberships.get("162,817,812"),
    new Set(["162,817,812", "425,690,689"]),
  );

  // Second iteration
  circuits.combineShortest(1, 1);
  assert.deepEqual(
    circuits.circuitMemberships.get("162,817,812"),
    new Set(["162,817,812", "425,690,689", "431,825,988"]),
  );
});

test("part1", () => {
  const result = part1(TEST_1, 10);
  assert.strictEqual(result, 40);
});

test("part2", () => {
  const result = part2(TEST_1);
  assert.strictEqual(result, 25272);
});
