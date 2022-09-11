"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
describe('Hello', () => {
    it('expect myFunc(5) to equal 25', () => {
        expect((0, index_1.myFunc)(5)).toEqual(25);
    });
});
