import fs from 'node:fs';

export function loadInput(day: number, testNumber?: number) {
  let path;

  const dayString = day.toString().padStart(2, '0');

  if (testNumber === undefined) {
    path = `./src/day-${dayString}/input.txt`;
  } else {
    path = `./src/day-${dayString}/test-${testNumber}.txt`;
  }

  return fs.readFileSync(path, 'utf8');
}
