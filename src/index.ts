import * as day1 from './day-01';
import * as day2 from './day-02';

const run: Array<[string, (_?: string) => { toString(): string }]> = [
  ['Day 1 Part 1', day1.part1],
  ['Day 1 Part 2', day1.part2],

  ['Day 2 Part 1', day2.part1],
  ['Day 2 Part 2', day2.part2],
];

for (const [d, f] of run) {
  console.log(`${d}: ${f()}`);
}
