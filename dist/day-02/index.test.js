"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = __importDefault(require("node:test"));
const node_assert_1 = __importDefault(require("node:assert"));
const input_1 = require("../common/input");
const index_1 = require("./index");
const TEST_1 = (0, input_1.loadInput)(2, 1);
(0, node_test_1.default)('parseInput', () => {
    const parsed = (0, index_1.parseInput)(TEST_1);
    node_assert_1.default.strictEqual(parsed.length, 11);
    node_assert_1.default.deepEqual(parsed[0], {
        start: BigInt(11),
        end: BigInt(22),
    });
    node_assert_1.default.deepEqual(parsed[10], {
        start: BigInt(2121212118),
        end: BigInt(2121212124),
    });
});
(0, node_test_1.default)('isInvalidPart1', () => {
    node_assert_1.default.strictEqual((0, index_1.isInvalidPart1)(BigInt(11)), true);
    node_assert_1.default.strictEqual((0, index_1.isInvalidPart1)(BigInt(12)), false);
    node_assert_1.default.strictEqual((0, index_1.isInvalidPart1)(BigInt(22)), true);
    node_assert_1.default.strictEqual((0, index_1.isInvalidPart1)(BigInt(123)), false);
    node_assert_1.default.strictEqual((0, index_1.isInvalidPart1)(BigInt(1010)), true);
    node_assert_1.default.strictEqual((0, index_1.isInvalidPart1)(BigInt(10101)), false);
});
(0, node_test_1.default)('isInvalidPart2', () => {
    node_assert_1.default.strictEqual((0, index_1.isInvalidPart2)(BigInt(11)), true);
    node_assert_1.default.strictEqual((0, index_1.isInvalidPart2)(BigInt(111)), true);
    node_assert_1.default.strictEqual((0, index_1.isInvalidPart2)(BigInt(11112)), false);
    node_assert_1.default.strictEqual((0, index_1.isInvalidPart2)(BigInt(1188511885)), true);
    node_assert_1.default.strictEqual((0, index_1.isInvalidPart2)(BigInt(824824824)), true);
});
(0, node_test_1.default)('part1', () => {
    const result = (0, index_1.part1)("11-22");
    node_assert_1.default.strictEqual(result, BigInt(33));
});
(0, node_test_1.default)('part1', () => {
    const result = (0, index_1.part1)(TEST_1);
    node_assert_1.default.strictEqual(result, BigInt(1227775554));
});
(0, node_test_1.default)('part2', () => {
    const result = (0, index_1.part2)(TEST_1);
    node_assert_1.default.strictEqual(result, BigInt(4174379265));
});
