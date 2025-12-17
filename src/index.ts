import * as day1 from "./day-01";
import * as day2 from "./day-02";
import * as day3 from "./day-03";
import * as day4 from "./day-04";
import * as day5 from "./day-05";
import * as day6 from "./day-06";

const run: Array<[string, (_?: string) => { toString(): string }]> = [
  ["Day 1 Part 1", day1.part1],
  ["Day 1 Part 2", day1.part2],

  ["Day 2 Part 1", day2.part1],
  ["Day 2 Part 2", day2.part2],

  ["Day 3 Part 1", day3.part1],
  ["Day 3 Part 2", day3.part2],

  ["Day 4 Part 1", day4.part1],
  ["Day 4 Part 2", day4.part2],

  ["Day 5 Part 1", day5.part1],
  ["Day 5 Part 2", day5.part2],

  ["Day 6 Part 1", day6.part1],
  ["Day 6 Part 2", day6.part2],
];

for (const [d, f] of run) {
  console.log(`${d}: ${f()}`);
}
