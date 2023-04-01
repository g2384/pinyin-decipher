"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const decipher_1 = require("./decipher");
var collection = [];
const printCallback = jest.fn((input, text) => {
    collection.push(input.concat([text]));
});
function getTestName(expect) {
    var _a, _b;
    return ((_b = (_a = expect.getState().currentTestName) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : "").replace("Decipher pinyin ", "").toUpperCase();
}
describe("Decipher pinyin", () => {
    test('aa', () => {
        collection = [];
        let name = getTestName(expect);
        let settings = new decipher_1.Settings(name, -1, -1);
        (0, decipher_1.decipher)(name, '', '', '', 0, settings, printCallback);
        expect(collection.length).toBe(1);
        expect(collection[0]).toEqual([true, 'a a ', 5]);
    });
    test('aab', () => {
        collection = [];
        let name = getTestName(expect);
        let settings = new decipher_1.Settings(name, -1, -1);
        (0, decipher_1.decipher)(name, '', '', '', 0, settings, printCallback);
        expect(collection.length).toBe(0);
    });
    test('aabb', () => {
        collection = [];
        let name = getTestName(expect);
        let settings = new decipher_1.Settings(name, -1, -1);
        (0, decipher_1.decipher)(name, '', '', '', 0, settings, printCallback);
        expect(collection.length).toBe(1);
        expect(collection[0]).toEqual([true, 'a a ', 5]);
    });
});
describe("Replace all", () => {
    test('replace letter', () => {
        expect((0, decipher_1.replaceAll)('abc', 'a', 'b')).toBe("bbc");
    });
});
