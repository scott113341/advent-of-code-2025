"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadInput = loadInput;
const node_fs_1 = __importDefault(require("node:fs"));
function loadInput(day, testNumber) {
    let path;
    const dayString = day.toString().padStart(2, '0');
    if (testNumber === undefined) {
        path = `./src/day-${dayString}/input.txt`;
    }
    else {
        path = `./src/day-${dayString}/test-${testNumber}.txt`;
    }
    return node_fs_1.default.readFileSync(path, 'utf8');
}
