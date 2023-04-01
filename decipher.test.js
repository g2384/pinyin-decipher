import { decipher, replaceAll } from './decipher';
var collection = [];
const printCallback = jest.fn((input, text) => {
    collection.push(input.concat([text]));
});
function getTestName(expect) {
    var _a, _b;
    return ((_b = (_a = expect.getState().currentTestName) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : "").replace("Decipher pinyin ", "");
}
describe("Decipher pinyin", () => {
    test('aa', () => {
        collection = [];
        let name = getTestName(expect);
        decipher(name, '', '', '', 0, printCallback);
        expect(collection.length).toBe(1);
        expect(collection[0]).toEqual([true, 'a a ', 5]);
    });
    test('aab', () => {
        collection = [];
        let name = getTestName(expect);
        decipher(name, '', '', '', 0, printCallback);
        expect(collection.length).toBe(0);
    });
    test('aabb', () => {
        collection = [];
        let name = getTestName(expect);
        decipher(name, '', '', '', 0, printCallback);
        expect(collection.length).toBe(1);
        expect(collection[0]).toEqual([true, 'a a ', 5]);
    });
});
describe("Replace all", () => {
    test('replace letter', () => {
        expect(replaceAll('abc', 'a', 'b')).toBe("bbc");
    });
});
