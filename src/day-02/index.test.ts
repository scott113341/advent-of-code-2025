import test from 'node:test';
import assert from 'node:assert';

import { loadInput } from '../common/input';
import { isInvalidPart1, isInvalidPart2, parseInput, part1, part2 } from './index';

const TEST_1 = loadInput(2, 1);

test('parseInput', () => {
  const parsed = parseInput(TEST_1);
  assert.strictEqual(parsed.length, 11);
  assert.deepEqual(parsed[0], {
    start: BigInt(11),
    end: BigInt(22),
  });
  assert.deepEqual(parsed[10], {
    start: BigInt(2121212118),
    end: BigInt(2121212124),
  });
});

test('isInvalidPart1', () => {
  assert.strictEqual(isInvalidPart1(BigInt(11)), true);
  assert.strictEqual(isInvalidPart1(BigInt(12)), false);
  assert.strictEqual(isInvalidPart1(BigInt(22)), true);
  assert.strictEqual(isInvalidPart1(BigInt(123)), false);
  assert.strictEqual(isInvalidPart1(BigInt(1010)), true);
  assert.strictEqual(isInvalidPart1(BigInt(10101)), false);
});

test('isInvalidPart2', () => {
  assert.strictEqual(isInvalidPart2(BigInt(11)), true);
  assert.strictEqual(isInvalidPart2(BigInt(111)), true);
  assert.strictEqual(isInvalidPart2(BigInt(11112)), false);
  assert.strictEqual(isInvalidPart2(BigInt(1188511885)), true);
  assert.strictEqual(isInvalidPart2(BigInt(824824824)), true);
});

test('part1', () => {
  const result = part1("11-22");
  assert.strictEqual(result, BigInt(33));
});

test('part1', () => {
  const result = part1(TEST_1);
  assert.strictEqual(result, BigInt(1227775554));
});

test('part2', () => {
  const result = part2(TEST_1);
  assert.strictEqual(result, BigInt(4174379265));
});
