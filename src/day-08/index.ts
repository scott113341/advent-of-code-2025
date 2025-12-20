import { loadInput } from "../common/input.js";
import { isMain, times } from "../common/util.js";

// The Elves are trying to figure out which junction boxes to connect so that
// electricity can reach every junction box. Input is list of all junction boxes
// in 3d space, as X,Y,Z.
const INPUT = loadInput(8);

type Point = string;
type PointPair = string;

type Circuit = Set<Point>;

export class Circuits {
  readonly circuitMemberships: Map<Point, Circuit>;
  private sortedDistances: [PointPair, number][];

  constructor(points: Point[]) {
    this.circuitMemberships = new Map(
      points.map((point) => [point, new Set([point])]),
    );

    this.sortedDistances = this.calculateDistances(points);
  }

  longestCircuits() {
    // This works because the values of circuitMemberships are just pointers
    // to the same underlying sets in a given circuit.
    const uniqCircuits = new Set(this.circuitMemberships.values());

    const circuits = [...uniqCircuits];
    circuits.sort((a, b) => b.size - a.size);
    return circuits;
  }

  combineShortest(count: number, offset = 0) {
    let combined = [];

    for (let idx = offset; idx < count + offset; idx++) {
      const [pairKey, _dist] = this.sortedDistances[idx];
      const [pointA, pointB] = this.pairKeyToPoints(pairKey);
      combined.push(this.pairKeyToPoints(pairKey));

      // Get the existing circuits, and combine into A's circuit
      const circuitA = this.circuitMemberships.get(pointA)!;
      const circuitB = this.circuitMemberships.get(pointB)!;
      for (const point of circuitB) {
        circuitA.add(point);
        this.circuitMemberships.set(point, circuitA);
      }
    }

    return combined;
  }

  allOneCircuit() {
    const uniqCircuits = new Set(this.circuitMemberships.values());
    return uniqCircuits.size === 1;
  }

  static pointToXYZ(point: Point) {
    return point.split(",").map(Number);
  }

  private calculateDistances(points: Point[]): [PointPair, number][] {
    const distances = new Map();

    for (const pointA of points) {
      for (const pointB of points) {
        if (pointA === pointB) continue;

        const key = this.pairKey(pointA, pointB);
        if (!distances.has(key)) {
          const distance = this.findDistance(pointA, pointB);
          distances.set(key, distance);
        }
      }
    }

    // Sorted closest to furthest
    const sortedDistances = [...distances.entries()];
    sortedDistances.sort(([_aPt, aDist], [_bPt, bDist]) => aDist - bDist);

    return sortedDistances;
  }

  private pairKey(pointA: Point, pointB: Point) {
    return pointB < pointA ? `${pointB}|${pointA}` : `${pointA}|${pointB}`;
  }

  private pairKeyToPoints(pairKey: string) {
    return pairKey.split("|") as [Point, Point];
  }

  private findDistance(pointA: Point, pointB: Point) {
    const [x1, y1, z1] = Circuits.pointToXYZ(pointA);
    const [x2, y2, z2] = Circuits.pointToXYZ(pointB);
    return Math.sqrt(
      Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) + Math.pow(z2 - z1, 2),
    );
  }
}

// Connect together the 1000 pairs of junction boxes which are closest together.
// What is the product of the sizes of the three largest circuits?
export function part1(input = INPUT, comboRounds = 1000) {
  const circuits = new Circuits(parseInput(input));
  circuits.combineShortest(comboRounds);

  const longest = circuits.longestCircuits();
  return longest
    .map((c) => c.size)
    .slice(0, 3)
    .reduce((a, c) => a * c);
}

// You'll need to keep connecting junction boxes together until they're all in
// one large circuit. Continue connecting the closest unconnected pairs of
// junction boxes together until they're all in the same circuit. What do you
// get if you multiply together the X coords of the last two junction boxes?
export function part2(input = INPUT) {
  const circuits = new Circuits(parseInput(input));
  let offset = 0;
  let lastCombined: Point[][] = [];

  while (!circuits.allOneCircuit()) {
    lastCombined = circuits.combineShortest(1, offset);
    offset++;
  }

  const [pointA, pointB] = lastCombined[lastCombined.length - 1];
  const [aX, _aY, _aZ] = Circuits.pointToXYZ(pointA);
  const [bX, _bY, _bZ] = Circuits.pointToXYZ(pointB);

  return aX * bX;
}

export function parseInput(input: string): Array<string> {
  return input.split("\n");
}

if (isMain(import.meta)) {
  console.log("Part 1: ", part1());
  console.log("Part 2: ", part2());
}
