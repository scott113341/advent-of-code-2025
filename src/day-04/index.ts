import { loadInput } from "../common/input.js";
import { isMain } from "../common/util.js";

// - Rolls of paper are "@" in the input grid
// - Forklifts can access a roll of paper if there are fewer than four rolls of
//   paper in the eight adjacent positions
const INPUT = loadInput(4);

type Point = {
  row: number; // 0 at top
  col: number; // 0 at left
};

class Grid {
  readonly papers: Set<string>;
  readonly rows: number;
  readonly cols: number;

  constructor(rows: number, cols: number) {
    this.papers = new Set();
    this.rows = rows;
    this.cols = cols;
  }

  toPointString(point: Point) {
    return `${point.row},${point.col}`;
  }

  add(point: Point) {
    this.papers.add(this.toPointString(point));
  }

  has(point: Point) {
    return this.papers.has(this.toPointString(point));
  }

  remove(point: Point) {
    return this.papers.delete(this.toPointString(point));
  }

  adjacent(point: Point): Point[] {
    const { row, col } = point;
    return [
      // Above
      { row: row - 1, col: col - 1 },
      { row: row - 1, col: col },
      { row: row - 1, col: col + 1 },

      // Sides
      { row, col: col - 1 },
      { row, col: col + 1 },

      // Below
      { row: row + 1, col: col - 1 },
      { row: row + 1, col: col },
      { row: row + 1, col: col + 1 },
    ];
  }

  *gridIter() {
    for (const pointStr of this.papers) {
      const [rowStr, colStr] = pointStr.split(",");
      yield { row: parseInt(rowStr), col: parseInt(colStr) };
    }
  }
}

// How many rolls of paper can be accessed by a forklift?
export function part1(input = INPUT) {
  const grid = parseInput(input);
  return removableRolls(grid).length;
}

// How many rolls of paper in total can be removed by forklift?
export function part2(input = INPUT) {
  const grid = parseInput(input);

  let totalRemovableRolls = 0;
  let removable = removableRolls(grid);

  while (removable.length) {
    totalRemovableRolls += removable.length;
    removable.forEach((point: Point) => grid.remove(point));
    removable = removableRolls(grid);
  }

  return totalRemovableRolls;
}

function removableRolls(grid: Grid) {
  const removable = [];

  for (const point of grid.gridIter()) {
    const adjacentCount = grid
      .adjacent(point)
      .filter((p) => grid.has(p)).length;

    if (adjacentCount < 4) {
      removable.push(point);
    }
  }

  return removable;
}

export function parseInput(input: string): Grid {
  const grid = new Grid(input.length, input.split("\n")[0].length);

  input.split("\n").forEach((line, row) => {
    line.split("").forEach((char, col) => {
      if (char === "@") {
        grid.add({ row, col });
      }
    });
  });

  return grid;
}

if (isMain(import.meta)) {
  console.log("Part 1: ", part1());
  console.log("Part 2: ", part2());
}
