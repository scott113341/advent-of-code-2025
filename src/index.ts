import * as day1 from './day-01';

const run: Array<[string, (_?: string) => { toString(): string }]> = [
  ['Day 1 Part 1', day1.part1],
  ['Day 1 Part 2', day1.part2],
];

for (const [d, f] of run) {
  console.log(`${d}: ${f()}`);
}
