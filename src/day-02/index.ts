import { loadInput } from '../common/input';

const INPUT = loadInput(2);

type IdRange = {
  start: bigint;
  end: bigint;
};

export function isInvalidPart1(id: bigint) {
  const idStr = id.toString();
  const len = idStr.length;
  const firstHalf = idStr.substring(0, len / 2);
  const secondHalf = idStr.substring(len / 2);
  return firstHalf === secondHalf;
}

export function isInvalidPart2(id: bigint) {
  let isInvalid = false;

  const idStr = id.toString();
  const len = idStr.length;

  // For an ID like "123123", check chunkLen [1 ("1"), 2 ("12"), 3 ("123")]
  // For an ID like "123123123", check chunkLen [1 ("1"), 3 ("123")]
  // Skips if the length of the ID is not evenly divisible
  // Skips if the ID was already determined as invalid, skip the rest of checks
  for (let chunkLen = 1; chunkLen <= len / 2; chunkLen++) {
    if (isInvalid || len % chunkLen !== 0) {
      continue;
    }

    const chunk = idStr.substring(0, chunkLen);
    let allChunksMatch = true;

    // Check each subsequent chunk of `chunkLen` to see if it matches `chunk`
    for (let laterChunkStart = chunkLen; laterChunkStart < len; laterChunkStart += chunkLen) {
      const laterChunk = idStr.substring(laterChunkStart, laterChunkStart + chunkLen);
      if (laterChunk !== chunk) {
        allChunksMatch = false;
      }
    }

    if (allChunksMatch) {
      isInvalid = true;
    }
  }

  return isInvalid;
}

function* enumerateIds(range: IdRange) {
  for (let id = range.start; id <= range.end; id++) {
    yield id;
  }
}

// Given comma-separated product ID ranges, find invalid IDs
// Invalid if made ONLY of some sequence of digits repeated twice
// Find sum of all invalid IDs
export function part1(input = INPUT) {
  return getSum(input, isInvalidPart1);
}

// Invalid if ID is made ONLY of some sequence of digits repeated AT LEAST twice
export function part2(input = INPUT) {
  return getSum(input, isInvalidPart2);
}

function getSum(input: string, invalidFn: (id: bigint) => boolean) {
  const ranges = parseInput(input);
  let sum = BigInt(0);

  for (const range of ranges) {
    for (const id of enumerateIds(range)) {
      if (invalidFn(id)) {
        sum += id;
      }
    }
  }

  return sum;
}

export function parseInput(input: string): Array<IdRange> {
  return input
    .trim()
    .split(",")
    .map((rangeString) => {
      const [startStr, endStr] = rangeString.split('-');
      return { start: BigInt(startStr), end: BigInt(endStr) };
    });
}
