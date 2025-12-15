export class Range {
  readonly start: number;
  readonly endInclusive: number;

  constructor(start: number, endInclusive: number) {
    this.start = start;
    this.endInclusive = endInclusive;
  }

  *[Symbol.iterator]() {
    let current = this.start;
    while (current <= this.endInclusive) {
      yield current;
      current++;
    }
  }

  includes(n: number) {
    return n >= this.start && n <= this.endInclusive;
  }
}
