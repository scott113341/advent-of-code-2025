export class Range {
  private readonly start: number;
  private readonly endInclusive: number;

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
}
