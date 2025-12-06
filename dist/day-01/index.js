"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.part1 = part1;
exports.part2 = part2;
exports.parseInput = parseInput;
const input_1 = require("../common/input");
const INPUT = (0, input_1.loadInput)(1);
// Input is a sequence of rotations, how to open the safe
// Turn left (toward lower numbers) or to the right (toward higher numbers)
// Numbers are 0-99; dial starts at 50
// Safe is decoy; actual password is the number of times the dial is left pointing at 0 after a rotation
function part1(input = INPUT) {
    const dial = new Dial();
    const instructions = parseInput(input);
    let zeroPositionCount = 0;
    for (const instruction of instructions) {
        dial.turn(instruction);
        if (dial.getPosition() === 0)
            zeroPositionCount += 1;
    }
    return zeroPositionCount;
}
// Actually supposed to count the number of times any click causes the dial to point at 0
function part2(input = INPUT) {
    const dial = new Dial();
    const instructions = parseInput(input);
    let zeroPositionCount = 0;
    for (const instruction of instructions) {
        zeroPositionCount += dial.turnAndCountZeroClicks(instruction);
    }
    return zeroPositionCount;
}
class Dial {
    constructor() {
        this.position = 50;
    }
    getPosition() {
        return this.position;
    }
    turn(instruction) {
        const sign = instruction.direction === 'left' ? -1 : 1;
        this.position += sign * instruction.steps;
        this.normalizePosition();
    }
    turnAndCountZeroClicks(instruction) {
        let zeroCount = 0;
        const click = instruction.direction === 'left' ? -1 : 1;
        for (let i = 0; i < instruction.steps; i++) {
            this.position += click;
            this.normalizePosition();
            if (this.position === 0)
                zeroCount += 1;
        }
        return zeroCount;
    }
    normalizePosition() {
        this.position = this.position % 100;
        if (this.position < 0)
            this.position = 100 + this.position;
    }
}
function parseInput(input) {
    return input
        .split('\n')
        .filter(line => line.length > 0)
        .map(line => {
        const direction = line[0] === 'L' ? 'left' : 'right';
        const steps = parseInt(line.slice(1));
        return { direction, steps };
    });
}
