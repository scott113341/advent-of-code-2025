import fs from "node:fs";

export function loadInput(day: number, testNumber?: number) {
  const dayString = day.toString().padStart(2, "0");

  const path =
    testNumber === undefined
      ? `${__dirname}/../../input/day-${dayString}/input.txt`
      : `${__dirname}/../../input/day-${dayString}/test-${testNumber}.txt`;

  return fs.readFileSync(path, "utf8");
}
