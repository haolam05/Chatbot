"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var assert = __importStar(require("assert"));
var words_1 = require("./words");
describe('words', function () {
    it('substitute', function () {
        // TODO: (part 1c) add tests here
        var m1 = new Map([["key1", "value1"], ["key2", "value2"]]);
        var m2 = new Map([["key1", "value1"], ["key2", "value2"], ["key3", "value3"], ["key4", "value4"]]);
        var s1 = [];
        var s2 = ["key3"];
        var s3 = ["key4"];
        var s4 = ["key3", "key4"];
        var s5 = ["key4", "key3"];
        (0, words_1.substitute)(s1, m1);
        assert.deepStrictEqual(s1, []);
        (0, words_1.substitute)(s1, m2);
        assert.deepStrictEqual(s1, []);
        (0, words_1.substitute)(s2, m1);
        assert.deepStrictEqual(s2, ["key3"]);
        (0, words_1.substitute)(s3, m1);
        assert.deepStrictEqual(s3, ["key4"]);
        (0, words_1.substitute)(s4, m1);
        assert.deepStrictEqual(s4, ["key3", "key4"]);
        (0, words_1.substitute)(s5, m1);
        assert.deepStrictEqual(s5, ["key4", "key3"]);
        (0, words_1.substitute)(s2, m2);
        assert.deepStrictEqual(s2, ["value3"]);
        (0, words_1.substitute)(s3, m2);
        assert.deepStrictEqual(s3, ["value4"]);
        (0, words_1.substitute)(s4, m2);
        assert.deepStrictEqual(s4, ["value3", "value4"]);
        (0, words_1.substitute)(s5, m2);
        assert.deepStrictEqual(s5, ["value4", "value3"]);
    });
    it('replaceWords', function () {
        var repl = new Map([["a", ["a", "b", "c"]], ["d", ["e", "f"]]]);
        assert.deepStrictEqual((0, words_1.replaceWords)([], repl), []);
        assert.deepStrictEqual((0, words_1.replaceWords)(["the"], repl), ["the"]);
        assert.deepStrictEqual((0, words_1.replaceWords)(["a"], repl), ["a", "b", "c"]);
        assert.deepStrictEqual((0, words_1.replaceWords)(["the", "a", "dog"], repl), ["the", "a", "b", "c", "dog"]);
        assert.deepStrictEqual((0, words_1.replaceWords)(["the", "a", "dog", "d"], repl), ["the", "a", "b", "c", "dog", "e", "f"]);
    });
    it('splitWords', function () {
        assert.deepStrictEqual((0, words_1.splitWords)(""), []);
        assert.deepStrictEqual((0, words_1.splitWords)(" "), []);
        assert.deepStrictEqual((0, words_1.splitWords)("."), ["."]);
        assert.deepStrictEqual((0, words_1.splitWords)("a"), ["a"]);
        assert.deepStrictEqual((0, words_1.splitWords)("abc"), ["abc"]);
        assert.deepStrictEqual((0, words_1.splitWords)("ab,"), ["ab", ","]);
        assert.deepStrictEqual((0, words_1.splitWords)("ab,c"), ["ab", ",", "c"]);
        assert.deepStrictEqual((0, words_1.splitWords)("ab ,c"), ["ab", ",", "c"]);
        assert.deepStrictEqual((0, words_1.splitWords)("ab, c"), ["ab", ",", "c"]);
        assert.deepStrictEqual((0, words_1.splitWords)("ab , c"), ["ab", ",", "c"]);
        assert.deepStrictEqual((0, words_1.splitWords)("a b , c"), ["a", "b", ",", "c"]);
        assert.deepStrictEqual((0, words_1.splitWords)("abc, def! gh"), ["abc", ",", "def", "!", "gh"]);
        assert.deepStrictEqual((0, words_1.splitWords)("abc def  gh"), ["abc", "def", "gh"]);
    });
    it('wordsContain', function () {
        assert.strictEqual((0, words_1.wordsContain)([], ["a"]), -1);
        assert.strictEqual((0, words_1.wordsContain)(["a", "b"], ["a"]), 0);
        assert.strictEqual((0, words_1.wordsContain)(["c", "a", "b"], ["a"]), 1);
        assert.strictEqual((0, words_1.wordsContain)(["c", "a", "c", "d"], ["d"]), 3);
        assert.strictEqual((0, words_1.wordsContain)(["c", "a", "d", "c", "e"], ["a"]), 1);
        assert.strictEqual((0, words_1.wordsContain)(["c", "a", "d", "c", "e"], ["f"]), -1);
        assert.strictEqual((0, words_1.wordsContain)([], ["a", "b"]), -1);
        assert.strictEqual((0, words_1.wordsContain)(["a", "b"], ["a", "b"]), 0);
        assert.strictEqual((0, words_1.wordsContain)(["c", "a", "b"], ["a", "b"]), 1);
        assert.strictEqual((0, words_1.wordsContain)(["c", "a", "c", "d"], ["a", "c"]), 1);
        assert.strictEqual((0, words_1.wordsContain)(["c", "a", "d", "c", "e"], ["a", "c"]), -1);
        assert.strictEqual((0, words_1.wordsContain)(["a", "b", "c", "d", "e"], ["a", "b", "c"]), 0);
        assert.strictEqual((0, words_1.wordsContain)(["a", "b", "c", "d", "e"], ["a", "b", "d"]), -1);
        assert.strictEqual((0, words_1.wordsContain)(["a", "b", "c", "d", "e"], ["b", "c", "d"]), 1);
        assert.strictEqual((0, words_1.wordsContain)(["a", "b", "c", "d", "e"], ["b", "c", "a"]), -1);
        assert.strictEqual((0, words_1.wordsContain)(["a", "b", "c", "d", "e"], ["c", "d", "e"]), 2);
        assert.strictEqual((0, words_1.wordsContain)(["a", "b", "c", "d", "e"], ["c", "d", "c"]), -1);
        assert.strictEqual((0, words_1.wordsContain)(["A", "B", "C", "D", "E"], ["c", "d", "e"]), 2);
        assert.strictEqual((0, words_1.wordsContain)(["A", "B", "C", "D", "E"], ["c", "d", "c"]), -1);
    });
    it('joinWords', function () {
        assert.strictEqual((0, words_1.joinWords)([]), "");
        assert.strictEqual((0, words_1.joinWords)(["a"]), "a");
        assert.strictEqual((0, words_1.joinWords)([","]), ",");
        assert.strictEqual((0, words_1.joinWords)(["a", "!"]), "a!");
        assert.strictEqual((0, words_1.joinWords)(["a", "b"]), "a b");
        assert.strictEqual((0, words_1.joinWords)(["abc", "def"]), "abc def");
        assert.strictEqual((0, words_1.joinWords)(["a", ",", "b"]), "a, b");
        assert.strictEqual((0, words_1.joinWords)(["a", ",", "b", "c", "!"]), "a, b c!");
        assert.strictEqual((0, words_1.joinWords)(["a", ",", "b", "c", "!", "d"]), "a, b c! d");
        assert.strictEqual((0, words_1.joinWords)(["what", "?", "!", "?"]), "what?!?");
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29yZHNfdGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy93b3Jkc190ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2Q0FBaUM7QUFDakMsaUNBQXdGO0FBR3hGLFFBQVEsQ0FBQyxPQUFPLEVBQUU7SUFFaEIsRUFBRSxDQUFDLFlBQVksRUFBRTtRQUNmLGlDQUFpQztRQUNqQyxJQUFNLEVBQUUsR0FBd0IsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDbEYsSUFBTSxFQUFFLEdBQXdCLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzFILElBQU0sRUFBRSxHQUFhLEVBQUUsQ0FBQztRQUN4QixJQUFNLEVBQUUsR0FBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzlCLElBQU0sRUFBRSxHQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDOUIsSUFBTSxFQUFFLEdBQWEsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDdEMsSUFBTSxFQUFFLEdBQWEsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFFdEMsSUFBQSxrQkFBVSxFQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ25ELElBQUEsa0JBQVUsRUFBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFBQyxNQUFNLENBQUMsZUFBZSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNuRCxJQUFBLGtCQUFVLEVBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1FBQ3pELElBQUEsa0JBQVUsRUFBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFBQyxNQUFNLENBQUMsZUFBZSxDQUFDLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDekQsSUFBQSxrQkFBVSxFQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsRUFBRSxFQUFFLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDakUsSUFBQSxrQkFBVSxFQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsRUFBRSxFQUFFLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDakUsSUFBQSxrQkFBVSxFQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztRQUMzRCxJQUFBLGtCQUFVLEVBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQzNELElBQUEsa0JBQVUsRUFBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFBQyxNQUFNLENBQUMsZUFBZSxDQUFDLEVBQUUsRUFBRSxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQ3JFLElBQUEsa0JBQVUsRUFBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFBQyxNQUFNLENBQUMsZUFBZSxDQUFDLEVBQUUsRUFBRSxDQUFDLFFBQVEsRUFBRSxRQUFRLENB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QUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN0RSxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUEsb0JBQVksRUFBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUV2RSxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUEsb0JBQVksRUFBQyxFQUFFLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3JELE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBQSxvQkFBWSxFQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDNUQsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFBLG9CQUFZLEVBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDakUsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFBLG9CQUFZLEVBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3RFLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBQSxvQkFBWSxFQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFD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QU0sQ0FBQyxXQUFXLENBQUMsSUFBQSxpQkFBUyxFQUFDLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDekQsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFBLGlCQUFTLEVBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDdkQsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFBLGlCQUFTLEVBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUNwRSxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUEsaUJBQVMsRUFBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUMsRUFBRSxXQUFXLENBQUMsQ0FBQztRQUMzRSxNQUFNLENBQUMsV0FBVyxDQUFDLElBQUEsaUJBQVMsRUFBQyxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFDcEUsQ0FBQyxDQUFDLENBQUM7QUFFTCxDQUFDLENBQUMsQ0FBQyJ9