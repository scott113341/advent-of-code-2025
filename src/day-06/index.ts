import { loadInput } from "../common/input.js";
import { isMain } from "../common/util.js";

// Each problem's numbers are arranged vertically
// At the bottom of the problem is the symbol for the operation
const INPUT = loadInput(6);

const OPERATIONS = ["*", "+"] as const;
type Operation = (typeof OPERATIONS)[number];

function isOperation(char: string): char is Operation {
  return (OPERATIONS as readonly string[]).includes(char);
}

class Problem {
  readonly numbers: number[];
  readonly operation: Operation;

  constructor(numbers: number[], operation: Operation) {
    this.numbers = numbers;
    this.operation = operation;
  }

  compute() {
    switch (this.operation) {
      case "*": {
        return this.numbers.reduce((tot, num) => tot * num);
      }
      case "+": {
        return this.numbers.reduce((tot, num) => tot + num);
      }
    }
  }
}

// What is the grand total of the answers to the individual problems?
export function part1(input = INPUT) {
  const problems = parseInput1(input);
  return problems.map((p) => p.compute()).reduce((tot, num) => tot + num);
}

// Cephalopod math is written right-to-left in columns, with the most
// significant digit at the top.
export function part2(input = INPUT) {
  const problems = parseInput2(input);
  return problems.map((p) => p.compute()).reduce((tot, num) => tot + num);
}

export function parseInput1(input: string): Array<Problem> {
  const problems: Problem[] = [];

  const lines = input.split("\n");
  const operations = lines.pop()!.trim().split(/\s+/);

  const numberLines = lines.map((l) =>
    l
      .trim()
      .split(/\s+/)
      .map((n) => parseInt(n)),
  );

  operations.forEach((operation, idx) => {
    if (operation === "*" || operation === "+") {
      const numbers = numberLines.map((l) => l[idx]);
      problems.push(new Problem(numbers, operation));
    } else {
      throw `Unknown operation: "${operation}"`;
    }
  });

  return problems;
}

export function parseInput2(input: string): Array<Problem> {
  const problems: Problem[] = [];

  const lines = input.split("\n");
  let idx = Math.max(...lines.map((l) => l.length));
  const operationLine = lines.pop()!;

  while (idx >= 0) {
    const nums = [];

    // Build each Problem
    while (true) {
      // The idx is initialized to the max line length; decrementing first is ok
      idx--;

      // Get the column chars and parse into a number
      const colChars = lines.map((l) => l[idx]);
      const colNum = parseInt(colChars.join(""));

      // The parsed number will be NaN if it was all spaces; finish the problem
      if (isNaN(colNum)) {
        // Get the operation from the column to the right
        const operation = operationLine[idx + 1];
        if (!isOperation(operation)) throw "Bug!";
        problems.push(new Problem(nums, operation));
        break;
      } else {
        nums.push(colNum);
      }
    }
  }

  return problems;
}

if (isMain(import.meta)) {
  console.log("Part 1: ", part1());
  console.log("Part 2: ", part2());
}
