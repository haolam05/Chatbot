"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.joinWords = exports.wordsContain = exports.splitWords = exports.replaceWords = exports.substitute = void 0;
var DEBUG = true; // turn this to 'false' later if you want to prevent
// the CheckInv functions from executing. For this project you don't need to change it
// to false, but in a bigger program we might want to turn it off after debugging is
// complete, to avoid running expensive invariant checks when the project is released.
/** TODO: (part 1a) write the specification */
/**
 * Substitutes some words in an array of words with corresponding values from reps if these words are in reps
 * @param words initial list of words
 * @param reps map from strings to their replacements
 * @modifies words
 * @effects words = substitute(words, reps) where
 *    substitute([], reps)       := []
 *    substitute(A ++ [w], reps) := substitute(A, reps) ++ [reps[w]]    if w is in reps
 *    substitute(A ++ [w], reps) := substitute(A, reps) ++ [w]          if w is not in reps
 */
function substitute(words, reps) {
    // TODO: (part 1b) implement this
    var j = 0;
    // {{ Inv: words = substitute(words0[0 .. j − 1],reps) ++ words0[j .. n − 1] }} where n = words.length
    while (j < words.length) {
        var result = reps.get(words[j]);
        if (result != undefined) {
            words[j] = reps.get(words[j]);
        }
        j++;
    }
}
exports.substitute = substitute;
/**
 * Returns the list of words that results when each of the words in the given
 * map is replaced by its value, which can be multiple words.
 * @param words initial list of words
 * @param replacements map from strings to their replacements
 * @returns join(map(words, replacement)),
 *     where map(nil, reps) = nil
 *           map(cons(w, L), reps)) = reps.get(w) if w in reps
 *                                  = [w]         if w not in reps
 *     where join([]) = []
 *           join(L @ []) = join(L)
 *           join(L @ [S @ [w]]) = join(L @ S) @ [w]
 */
function replaceWords(words, replacements) {
    var replaced = [];
    var i = 0;
    // Inv: replaced[0..i-1] = map(words[0..i-1], replacements) and
    //      replaced[i..n-1] is unchanged
    while (i !== words.length) {
        var val = replacements.get(words[i]);
        if (val !== undefined) {
            replaced.push(val);
        }
        else {
            replaced.push([words[i]]);
        }
        i = i + 1;
    }
    var result = [];
    var j = 0;
    // Inv: result = join(replaced[0..j-1])
    while (j !== replaced.length) {
        var L = replaced[j];
        var k = 0;
        // Inv: result = join(replaced[0..j-1]) @ L[0..k-1]
        while (k !== L.length) {
            result.push(L[k]);
            k = k + 1;
        }
        j = j + 1;
    }
    return result;
}
exports.replaceWords = replaceWords;
// String containing all punctuation characters.
var PUNCT = ",.?;:!";
// Determines whether ch is a punctuation character.
function isPunct(ch) {
    if (ch.length !== 1)
        throw new Error("expecting a single character not \"".concat(ch, "\""));
    return PUNCT.indexOf(ch) >= 0;
}
/**
 * Breaks the given string into a sequence of words, separated by spaces or
 * punctuation. Spaces are not included in the result. Punctuation is included
 * as its own word.
 * @param str the string in question
 * @return an array of strings words such that
 *     1. join(words) = del-spaces(str), i.e., the concatenation of all the
 *        words is str but with all whitespace removed
 *     2. adjacent letters in the original string are in the same word
 *     3. no word includes any whitespace
 *     4. each word is either a single punctuation character or 1+ letters
 */
function splitWords(str) {
    var splits = [0]; // TODO (part a): fix this
    var j = 0; // TODO (part a): fix this
    CheckInv1(splits, str, j);
    // Inv  1. 0 = splits[0] < splits[1] < ... < splits[n] = j
    //      2. for i = 0 .. n-1, if splits[i+1] - splits[i] > 1, then 
    //         str[splits[i] ..  splits[i+1]-1] is all letters
    //      3. for i = 1 .. n-1, splits[i] is not between two letters
    //  where n = parts.length
    while (j < str.length) { // TODO (part 6a): fix this
        // TODO (part 6a): implement this
        while (j + 1 !== str.length && !isPunct(str[j + 1][0]) && str[j + 1] !== " " && str[j] !== " " && !isPunct(str[j][0])) {
            j++;
        }
        j++;
        splits.push(j);
        CheckInv1(splits, str, j);
    }
    var words = [];
    var i = 0;
    CheckInv2(words, splits, str, i);
    // Inv: 1. join(words) = del-space(s[0..splits[i]-1]))
    //      2. no element of words contains any whitespace
    while (i + 1 !== splits.length) {
        if (str[splits[i]] !== " ")
            words.push(str.substring(splits[i], splits[i + 1]));
        i = i + 1;
        CheckInv2(words, splits, str, i);
    }
    // Post: join(words) = del-space(str), each punctuation is its own word,
    //       adjacent letters are in the same word, and no word has spaces
    return words;
}
exports.splitWords = splitWords;
// Verify that the invariant from the first loop of splitWords holds.
function CheckInv1(splits, str, j) {
    if (!DEBUG)
        return; // skip this
    if (splits.length === 0 || splits[0] !== 0)
        throw new Error("splits should start with 0");
    if (splits[splits.length - 1] !== j)
        throw new Error("splits should end with the string's length ".concat(j));
    var n = splits.length - 1;
    for (var i = 0; i < n; i++) {
        if (splits[i + 1] - splits[i] <= 0)
            throw new Error("should have at least 1 char between splits at ".concat(splits[i], " and ").concat(splits[i + 1]));
        var w = str.substring(splits[i], splits[i + 1]);
        if (w.length > 1) {
            for (var j_1 = 0; j_1 < w.length; j_1++) {
                if (w[j_1] === " " || isPunct(w[j_1]))
                    throw new Error("space/punct \"".concat(w[j_1], "\" is in a part with other characters"));
            }
        }
        if (i > 0) {
            var c1 = str[splits[i] - 1];
            var c2 = str[splits[i]];
            if ((c1 !== " ") && !isPunct(c1) && (c2 !== " ") && !isPunct(c2))
                throw new Error("split at ".concat(splits[i], " is between two letters \"").concat(c1, "\" and \"").concat(c2, "\""));
        }
    }
}
// Verify that the invariant from the second loop of splitWords holds.
function CheckInv2(words, splits, str, i) {
    if (!DEBUG)
        return; // skip this
    var s1 = words.join("");
    if (s1.indexOf(" ") >= 0)
        throw new Error("words contains space charactrs: \"".concat(s1, "\""));
    var s2 = str.slice(0, splits[i]);
    while (s2.indexOf(" ") >= 0)
        s2 = s2.replace(" ", "");
    if (s1 !== s2)
        throw new Error("words do not match the string (minus spaces): \"".concat(s1, "\" vs \"").concat(s2, "\""));
}
/**
 * Finds where the words of "sub" appear as a sub-array within "all".
 * @param all full list of words
 * @param sub non-empty list of words to search for in all
 * @returns an index j <= all.length - sub.length such that
 *     lower(all[j+i]) = lower(sub[i]) for i = 0 .. sub.length - 1
 *     or -1 if none exists
 */
function wordsContain(all, sub) {
    if (sub.length === 0)
        throw new Error("second list of words cannot be empty");
    if (all.length < sub.length)
        return -1; // not enough words to contain sub
    var k = -1;
    // Inv: no index 0 <= j <= k such that
    //      lower(all[j+i]) = lower(sub[i]) for i = 0 .. sub.length-1
    while (k + sub.length !== all.length) {
        k = k + 1;
        var m = 0;
        // Inv2: Inv and lower(all[k+i]) = lower(sub[i]) for i = 0 .. m-1
        while (m !== sub.length && all[k + m].toLowerCase() === sub[m].toLowerCase()) {
            m = m + 1;
        }
        if (m === sub.length) {
            // all[k+i] = sub[i] for i = 0 .. sub.length-1
            return k; // j = k matches
        }
    }
    // Post: no index 0 <= j <= all.length - sub.length such that
    //       all[j+i] = sub[i] for i = 0 .. sub.length-1
    return -1;
}
exports.wordsContain = wordsContain;
/**
 * Returns a string containing all of the given words, in the same order, but
 * with spaces before each (non-punctuation) word other than the first.
 * @param words list of words (no spaces, punctuation as its own words)
 * @return join-words(words), where
 *     join-words([]) = []
 *     join-words([w]) = w
 *     join-words(L @ [v, w]) =
 *         join-words(L @ [v]) + w        if w is punctuation
 *         join-words(L @ [v]) + " " + w  if w is not punctuation
 */
function joinWords(words) {
    // TODO (part 4a): handle the case when the array is empty
    if (words.length == 0) {
        return "";
    }
    // TODO (part 4b): write a loop for the case when the array is not empty
    var j = 0;
    var parts = [];
    // {{ Inv: join(parts) = join-words(words[0 .. j − 1]) }}
    while (j < words.length) {
        if (!isPunct(words[j][0]) && j !== 0) {
            parts.push(" ");
        }
        parts.push(words[j]);
        j++;
    }
    return parts.join("");
}
exports.joinWords = joinWords;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid29yZHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvd29yZHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsSUFBTSxLQUFLLEdBQVksSUFBSSxDQUFDLENBQUUsb0RBQW9EO0FBQ2xGLHNGQUFzRjtBQUN0RixvRkFBb0Y7QUFDcEYsc0ZBQXNGO0FBRXRGLDhDQUE4QztBQUM5Qzs7Ozs7Ozs7O0dBU0c7QUFDSCxTQUFnQixVQUFVLENBQUMsS0FBZSxFQUFFLElBQXlCO0lBQ25FLGlDQUFpQztJQUNqQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFVixzR0FBc0c7SUFDdEcsT0FBTyxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sRUFBRTtRQUN2QixJQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2xDLElBQUksTUFBTSxJQUFJLFNBQVMsRUFBRTtZQUN2QixLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQVcsQ0FBQztTQUN6QztRQUNELENBQUMsRUFBRSxDQUFDO0tBQ0w7QUFDSCxDQUFDO0FBWkQsZ0NBWUM7QUFFRDs7Ozs7Ozs7Ozs7O0dBWUc7QUFDSCxTQUFnQixZQUFZLENBQ3hCLEtBQTRCLEVBQzVCLFlBQWdEO0lBRWxELElBQU0sUUFBUSxHQUE0QixFQUFFLENBQUM7SUFDN0MsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRVYsK0RBQStEO0lBQy9ELHFDQUFxQztJQUNyQyxPQUFPLENBQUMsS0FBSyxLQUFLLENBQUMsTUFBTSxFQUFFO1FBQ3pCLElBQU0sR0FBRyxHQUFHLFlBQVksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkMsSUFBSSxHQUFHLEtBQUssU0FBUyxFQUFFO1lBQ3JCLFFBQVEsQ0FBQyxJQUFJLENB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