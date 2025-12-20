import { loadInput } from "../common/input.js";
import { isMain } from "../common/util.js";

const INPUT = loadInput(1);

export function part1(input = INPUT) {
  return 1;
}

export function part2(input = INPUT) {
  return 2;
}

export function parseInput(input: string): Array<any> {
  return [];
}

if (isMain(import.meta)) {
  console.log("Part 1: ", part1());
  console.log("Part 2: ", part2());
}
