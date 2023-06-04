"use strict";
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.assemble = exports.applyPattern = exports.matchPattern = exports.chatResponse = void 0;
var words_1 = require("./words");
// List of replacements to make in the input words.
var INPUT_REPLACEMENTS = new Map([
    ["dont", ["don't"]],
    ["cant", ["can't"]],
    ["wont", ["won't"]],
    ["recollect", ["remember"]],
    ["dreamt", ["dreamed"]],
    ["dreams", ["dream"]],
    ["maybe", ["perhaps"]],
    ["how", ["what"]],
    ["when", ["what"]],
    ["certainly", ["yes"]],
    ["machine", ["computer"]],
    ["computers", ["computer"]],
    ["were", ["was"]],
    ["you're", ["you", "are"]],
    ["i'm", ["i", "am"]],
    ["same", ["alike"]],
]);
// List of replacements to make in the output words.
var OUTPUT_REPLACEMENTS = new Map([
    ["am", ["are"]],
    ["your", ["my"]],
    ["me", ["you"]],
    ["myself", ["yourself"]],
    ["yourself", ["myself"]],
    ["i", ["you"]],
    ["you", ["I"]],
    ["my", ["your"]],
    ["i'm", ["you", "are"]],
]);
// Pattern to use if nothing above matches.
var DEFAULT_PATTERN = {
    name: ".none",
    contains: [],
    responses: [
        ["I'm", "not", "sure", "I", "understand", "you", "fully", "."],
        ["Please", "go", "on", "."],
        ["What", "does", "that", "suggest", "to", "you", "?"],
        ["Do", "you", "feel", "strongly", "about", "discussing", "such", "things", "?"]
    ]
};
/**
 * Returns the next response from the chatbot.
 * @param words words in the user's message
 * @param lastUsed map from name to the last response used for that word.
 *     (This is kept so that we can avoid reusing them as much as possible.)
 * @param patterns set of word patterns to use
 * @modifies lastUsed, memory
 * @returns words of the response
 */
function chatResponse(words, lastUsed, memory, patterns) {
    var e_1, _a, e_2, _b;
    // Start by making the substitutions listed above.
    words = (0, words_1.replaceWords)(words, INPUT_REPLACEMENTS);
    try {
        // Try the patterns in the order they appear. Use the first* that matches.
        // Use the next unused reponse for the matching pattern.
        // * The one exception to this is "my", which is instead pushed to memory.
        for (var patterns_1 = __values(patterns), patterns_1_1 = patterns_1.next(); !patterns_1_1.done; patterns_1_1 = patterns_1.next()) {
            var pat = patterns_1_1.value;
            var args = matchPattern(words, pat.contains);
            if (args !== undefined) {
                var out_args = [];
                try {
                    for (var args_1 = (e_2 = void 0, __values(args)), args_1_1 = args_1.next(); !args_1_1.done; args_1_1 = args_1.next()) {
                        var arg = args_1_1.value;
                        out_args.push((0, words_1.replaceWords)(arg, OUTPUT_REPLACEMENTS));
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (args_1_1 && !args_1_1.done && (_b = args_1.return)) _b.call(args_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
                var result_1 = applyPattern(pat, args, lastUsed);
                if (pat.name === "my") {
                    memory.push(result_1);
                }
                else {
                    return result_1;
                }
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (patterns_1_1 && !patterns_1_1.done && (_a = patterns_1.return)) _a.call(patterns_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    // If we have something saved to memory, then pop and return it. Otherwise,
    // we just make up a default response.
    var result = memory.pop();
    if (result !== undefined) {
        return result;
    }
    else {
        return applyPattern(DEFAULT_PATTERN, [], lastUsed);
    }
}
exports.chatResponse = chatResponse;
/**
 * Returns the arguments from the given words if those words match the given
 * pattern and undefined if not. (See WordPattern above for more info.)
 * @param words words to check against the pattern
 * @param contains list of 1, 2, or 3 sequences of words to look for (in order)
 * @returns the text before, between, and after the required words of the
 *     pattern if they appear and undefined if not
 */
function matchPattern(words, contains) {
    if (contains.length < 1 || 3 < contains.length)
        throw new Error("".concat(contains.length, " required word sequences not allowed"));
    var index1 = (0, words_1.wordsContain)(words, contains[0]);
    if (index1 < 0)
        return undefined;
    var arg1 = words.slice(0, index1);
    var words2 = words.slice(index1 + contains[0].length);
    if (contains.length === 1)
        return [arg1, words2];
    var index2 = (0, words_1.wordsContain)(words2, contains[1]);
    if (index2 < 0)
        return undefined;
    var arg2 = words2.slice(0, index2);
    var words3 = words2.slice(index2 + contains[1].length);
    if (contains.length === 2)
        return [arg1, arg2, words3];
    var index3 = (0, words_1.wordsContain)(words3, contains[2]);
    if (index3 < 0)
        return undefined;
    var arg3 = words3.slice(0, index3);
    var words4 = words3.slice(index3 + contains[2].length);
    return [arg1, arg2, arg3, words4];
}
exports.matchPattern = matchPattern;
/**
 * Returns the next response applied to the given pattern
 * @param pat pattern that matches
 * @param args arguments from matching the pattern
 * @param lastUsed (see chatResponse)
 * @modifies lastUsed changes the entry for this pattern to indicate which
 *    response was used
 * @returns result of substituting the arguments into the next unused response
 */
function applyPattern(pat, args, lastUsed) {
    var last = lastUsed.get(pat.name);
    var result;
    if (last !== undefined) {
        var next = (last + 1) % pat.responses.length;
        result = assemble(pat.responses[next], args);
        lastUsed.set(pat.name, next);
    }
    else {
        result = assemble(pat.responses[0], args);
        lastUsed.set(pat.name, 0);
    }
    return result;
}
exports.applyPattern = applyPattern;
/**
 * Returns the result of substituting, for each number in parts, the argument at
 * the corresponding index of args.
 * @param parts mix of words and numbers that indicate arguments to substitute
 * @param args values to substitute for numbers in parts
 * @returns sub(parts, args), where
 *     sub([], args) = []
 *     sub(L @ [w], args) = sub(L) @ [w]         if w is a word
 *     sub(L @ [n], args) = sub(L) @ args[n]     if n is a number
 */
function assemble(parts, args) {
    var words = [];
    var j = 0;
    // Inv: words = sub(parts[0..j-1], args)
    while (j != parts.length) {
        var part = parts[j];
        if (typeof part === 'number') {
            if (part < 0 || args.length <= part)
                throw new Error("no argument for part ".concat(part, " (only ").concat(parts.length, " args)"));
            words.push.apply(words, __spreadArray([], __read(args[part]), false));
        }
        else {
            words.push(part);
        }
        j = j + 1;
    }
    return words;
}
exports.assemble = assemble;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhdGJvdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9jaGF0Ym90LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlDQUFxRDtBQUlyRCxtREFBbUQ7QUFDbkQsSUFBTSxrQkFBa0IsR0FBRyxJQUFJLEdBQUcsQ0FBQztJQUMvQixDQUFDLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ25CLENBQUMsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDbkIsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNuQixDQUFDLFdBQVcsRUFBRSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQzNCLENBQUMsUUFBUSxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDdkIsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNyQixDQUFDLE9BQU8sRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3RCLENBQUMsS0FBSyxFQUFFLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDakIsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNsQixDQUFDLFdBQVcsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3RCLENBQUMsU0FBUyxFQUFFLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDekIsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUMzQixDQUFDLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pCLENBQUMsUUFBUSxFQUFFLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQzFCLENBQUMsS0FBSyxFQUFFLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3BCLENBQUMsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUM7Q0FDcEIsQ0FBQyxDQUFDO0FB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