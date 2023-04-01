import { decipher, replaceAll } from './decipher';

var collection: any = [];

const printCallback = jest.fn((input: any[], text: string) => {
    collection.push(input.concat([text]));
});

function getTestName(expect: jest.Expect): string {
    return (expect.getState().currentTestName?.toString() ?? "").replace("Decipher pinyin ", "");
}

describe("Decipher pinyin", () => {
    test('aa', () => {
        collection = [];
        let name: string = getTestName(expect);
        decipher(name, '', '', '', 0, printCallback);
        expect(collection.length).toBe(1);
        expect(collection[0]).toEqual([true, 'a a ', 5, ''])
    });

    test('aab', () => {
        collection = [];
        let name: string = getTestName(expect);
        decipher(name, '', '', '', 0, printCallback);
        expect(collection.length).toBe(0);
    });

    test('aabb', () => {
        collection = [];
        let name: string = getTestName(expect);
        decipher(name, '', '', '', 0, printCallback);
        expect(collection.length).toBe(1);
        expect(collection[0]).toEqual([true, 'a a ', 5, ''])
    });
});


describe("Replace all", () => {
    test('replace letter', () => {
        expect(replaceAll('abc', 'a', 'b')).toBe("bbc");
    });
});
