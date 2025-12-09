"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = __importDefault(require("node:test"));
const node_assert_1 = __importDefault(require("node:assert"));
const input_1 = require("../common/input");
const index_1 = require("./index");
const TEST_1 = (0, input_1.loadInput)(1, 1);
(0, node_test_1.default)('parseInput', () => {
    const parsed = (0, index_1.parseInput)(TEST_1);
    node_assert_1.default.strictEqual(parsed.length, 10);
    node_assert_1.default.deepEqual(parsed[0], undefined);
});
(0, node_test_1.default)('part1', () => {
    const result = (0, index_1.part1)(TEST_1);
    node_assert_1.default.strictEqual(result, 111);
});
(0, node_test_1.default)('part2', () => {
    const result = (0, index_1.part2)(TEST_1);
    node_assert_1.default.strictEqual(result, 222);
});
