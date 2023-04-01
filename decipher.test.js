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
        let name = getTestName(expect); // name must be capital
        let settings = new decipher_1.Settings(name, -1, -1);
        (0, decipher_1.decipher)(name, '', '', '', 0, settings, printCallback);
        expect(collection.length).toBe(3);
        expect(collection[0]).toEqual([true, 'a a ', 6]);
        expect(collection[1]).toEqual([true, 'e e ', 5]);
        expect(collection[2]).toEqual([true, 'o o ', 5]);
        expect(settings.count).toBe(6);
    });
    test('aab', () => {
        collection = [];
        let name = getTestName(expect);
        let settings = new decipher_1.Settings(name, -1, -1);
        (0, decipher_1.decipher)(name, '', '', '', 0, settings, printCallback);
        expect(collection.length).toBe(13);
        expect(collection[0]).toEqual([true, 'a ai ', 7]);
        expect(collection[1]).toEqual([true, 'a an ', 3]);
        expect(collection[2]).toEqual([true, 'a a e ', 4]);
        expect(collection[3]).toEqual([true, 'a a o ', 3]);
        expect(collection[4]).toEqual([true, 'a ao ', 1]);
        expect(collection[5]).toEqual([true, 'e ei ', 46]);
        expect(collection[6]).toEqual([true, 'e en ', 2]);
        expect(collection[7]).toEqual([true, 'e er ', 2]);
        expect(collection[8]).toEqual([true, 'e e a ', 4]);
        expect(collection[9]).toEqual([true, 'e e o ', 3]);
        expect(collection[10]).toEqual([true, 'o ou ', 46]);
        expect(collection[11]).toEqual([true, 'o o a ', 4]);
        expect(collection[12]).toEqual([true, 'o o e ', 3]);
        expect(settings.count).toBe(46);
    });
    test('aabb', () => {
        collection = [];
        let name = getTestName(expect);
        let settings = new decipher_1.Settings(name, -1, -1);
        (0, decipher_1.decipher)(name, '', '', '', 0, settings, printCallback);
        expect(collection.length).toBe(7);
        expect(collection[0]).toEqual([true, 'a a e e ', 15]);
        expect(collection[1]).toEqual([true, 'a a o o ', 5]);
        expect(collection[2]).toEqual([true, 'a ao o ', 1]);
        expect(collection[3]).toEqual([true, 'e e a a ', 22]);
        expect(collection[4]).toEqual([true, 'e e o o ', 5]);
        expect(collection[5]).toEqual([true, 'o o a a ', 16]);
        expect(collection[6]).toEqual([true, 'o o e e ', 5]);
        expect(settings.count).toBe(12);
    });
});
describe("Replace all", () => {
    test('replace letter', () => {
        expect((0, decipher_1.replaceAll)('abc', 'a', 'b')).toBe("bbc");
    });
});
