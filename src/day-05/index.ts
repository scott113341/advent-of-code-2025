import { loadInput } from "../common/input";
import { Range } from "../common/util";

// The database operates on ingredient IDs
// There is a list of fresh ID ranges: are inclusive & can overlap
// Next, there is a list of available ingredient IDs
const INPUT = loadInput(5);

class Ingredients {
  freshRanges: Range[];
  ingredientIds: number[];

  constructor(freshRanges: Range[], ingredientIds: number[]) {
    this.freshRanges = freshRanges;
    this.ingredientIds = ingredientIds;
  }
}

// How many of the available ingredient IDs are fresh?
export function part1(input = INPUT) {
  const ingredients = parseInput(input);

  return ingredients.ingredientIds.filter((id) =>
    ingredients.freshRanges.some((r) => r.includes(id)),
  ).length;
}

// The Elves would like to know all of the IDs that would be fresh
// Second section is now irrelevant
// How many total ingredient IDs are considered to be fresh
export function part2(input = INPUT) {
  const ingredients = parseInput(input);

  const mergedRanges = mergeRanges(ingredients.freshRanges);

  return mergedRanges
    .map((r) => r.endInclusive - r.start + 1)
    .reduce((sum, count) => sum + count);
}

// Combine overlapping ranges, one at a time
function mergeRanges(ranges: Range[]) {
  let anyOverlapping = true;
  ranges = [...ranges];

  while (anyOverlapping) {
    anyOverlapping = false;

    ranges.forEach((range, idx) => {
      // Since we replace `ranges` after each merge, break out of the iteration
      // once any overlapping ranges have been found/merged
      if (anyOverlapping) {
        return;
      }

      const overlappingIdx = ranges.findIndex(
        (otherRange, otherIdx) =>
          idx !== otherIdx &&
          range.start <= otherRange.endInclusive &&
          otherRange.start <= range.endInclusive,
      );

      if (overlappingIdx !== -1) {
        // Replace both ranges with a new all-encompassing range
        const otherRange = ranges[overlappingIdx];
        const newRange = new Range(
          Math.min(range.start, otherRange.start),
          Math.max(range.endInclusive, otherRange.endInclusive),
        );

        ranges = [...ranges, newRange];
        ranges.splice(idx, 1);
        ranges.splice(overlappingIdx - 1, 1); // Ok because idx < overlappingIdx
        anyOverlapping = true;
      }
    });
  }

  return ranges;
}

export function parseInput(input: string): Ingredients {
  const [freshRangeStr, ingredientIdStr] = input.split("\n\n");

  const freshRanges = freshRangeStr.split("\n").map((line) => {
    const [startStr, endStr] = line.split("-");
    return new Range(parseInt(startStr), parseInt(endStr));
  });

  const ingredientIds = ingredientIdStr.split("\n").map((l) => parseInt(l));

  return new Ingredients(freshRanges, ingredientIds);
}
