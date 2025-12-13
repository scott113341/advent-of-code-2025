import { loadInput } from "../common/input";
import { Range } from "../common/util";

type Bank = number[];

// Each line is a bank of batteries, and each digit is a battery's joltage (1-9)
// Must turn on exactly two batteries in each bank
// Bank joltage is the number formed by both digits
const INPUT = loadInput(3);

// Find the largest joltage each bank can produce
// What is the sum of these joltages?
export function part1(input = INPUT) {
  const banks = parseInput(input);
  let totalJoltage = 0;

  for (const bank of banks) {
    const bankStr = bank.toString();
    for (let j = 99; j >= 11; j--) {
      const [tens, ones] = j.toString().split("");
      const regex = new RegExp(`${tens}.*${ones}`);
      if (regex.test(bankStr)) {
        totalJoltage += j;
        break;
      }
    }
  }

  return totalJoltage;
}

// 12 digits in each bank's joltage output instead of 2
export function part2(input = INPUT) {
  const JOLTAGE_LENGTH = 12;
  const banks = parseInput(input);
  let totalJoltage = 0;

  for (const bank of banks) {
    let number = "";
    let startIdx = 0;

    while (number.length < JOLTAGE_LENGTH) {
      const spaceNeeded = JOLTAGE_LENGTH - number.length;
      const largest = findLargest(bank, startIdx, spaceNeeded);
      startIdx = largest.idx + 1;
      number = number + largest.joltage.toString();
    }

    totalJoltage += parseInt(number);
  }

  return totalJoltage;
}

function findLargest(bank: Bank, startIdx: number, spaceNeeded: number) {
  const endIdx = bank.length - spaceNeeded;
  const searchRange = new Range(startIdx, endIdx);

  let max = { idx: -1, joltage: -1 };
  for (const idx of searchRange) {
    const joltage = bank[idx];
    if (joltage > max.joltage) {
      max = { idx, joltage };
    }
  }

  return max;
}

export function parseInput(input: string): Bank[] {
  return input.split("\n").map((l) => l.split("").map((b) => parseInt(b)));
}
