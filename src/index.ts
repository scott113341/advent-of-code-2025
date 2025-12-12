import * as day1 from "./day-01";
import * as day2 from "./day-02";
import * as day3 from "./day-03";

const run: Array<[string, (_?: string) => { toString(): string }]> = [
  ["Day 1 Part 1", day1.part1],
  ["Day 1 Part 2", day1.part2],

  ["Day 2 Part 1", day2.part1],
  ["Day 2 Part 2", day2.part2],

  ["Day 3 Part 1", day3.part1],
  ["Day 3 Part 2", day3.part2],
];

for (const [d, f] of run) {
  console.log(`${d}: ${f()}`);
}
