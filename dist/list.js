"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.explode_array = exports.compact_list = exports.rev = exports.concat = exports.len = exports.cons = exports.nil = void 0;
exports.nil = "nil";
function cons(hd, tl) {
    return { kind: "cons", hd: hd, tl: tl };
}
exports.cons = cons;
/**
 * Returns the length of the given list
 * @param L list whose length should be returned
 * @returns 0 if L === nil else 1 + len(L.tl)
 */
function len(L) {
    if (L === exports.nil) {
        return 0;
    }
    else {
        return 1 + len(L.tl);
    }
}
exports.len = len;
/**
 * Returns the a list consisting of L followed by R.
 * @param L list to go at the front of the result
 * @param R list to go at the end of the result
 * @returns A single list consisting of L's elements followed by R's
 */
function concat(L, R) {
    if (L === exports.nil) {
        return R;
    }
    else {
        return cons(L.hd, concat(L.tl, R));
    }
}
exports.concat = concat;
/**
 * Returns the reverse of the given list.
 * @param L list to revese
 * @returns list containing the same elements but in reverse order
 */
function rev(L) {
    if (L === exports.nil) {
        return exports.nil;
    }
    else {
        return concat(rev(L.tl), cons(L.hd, exports.nil));
    }
}
exports.rev = rev;
/**
 * Returns the elements of a list, packed into an array.
 * @param L the list to turn into an array
 * @returns array containing the same elements as in L in the same order
 */
function compact_list(L) {
    var arr = [];
    while (L !== exports.nil) {
        arr.push(L.hd);
        L = L.tl;
    }
    return arr;
}
exports.compact_list = compact_list;
/**
 * Returns the elements in the given array as a list.
 * @param arr the array to turn into a list
 * @returns list containing the same elements as in arr in the same order
 */
function explode_array(arr) {
    var L = exports.nil;
    for (var i = arr.length - 1; i >= 0; i--) {
        L = cons(arr[i], L);
    }
    return L;
}
exports.explode_array = explode_array;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9saXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUlhLFFBQUEsR0FBRyxHQUFHLEtBQUssQ0FBQztBQUV6QixTQUFnQixJQUFJLENBQUksRUFBSyxFQUFFLEVBQVc7SUFDeEMsT0FBTyxFQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFDLENBQUM7QUFDeEMsQ0FBQztBQUZELG9CQUVDO0FBR0Q7Ozs7R0FJRztBQUNILFNBQWdCLEdBQUcsQ0FBSSxDQUFVO0lBQy9CLElBQUksQ0FBQyxLQUFLLFdBQUcsRUFBRTtRQUNiLE9BQU8sQ0FBQyxDQUFDO0tBQ1Y7U0FBTTtRQUNMLE9BQU8sQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7S0FDdEI7QUFDSCxDQUFDO0FBTkQsa0JBTUM7QUFFRDs7Ozs7R0FLRztBQUNILFNBQWdCLE1BQU0sQ0FBSSxDQUFVLEVBQUUsQ0FBVTtJQUM5QyxJQUFJLENBQUMsS0FBSyxXQUFHLEVBQUU7UUFDYixPQUFPLENBQUMsQ0FBQztLQUNWO1NBQU07UUFDTCxPQUFPLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDcEM7QUFDSCxDQUFDO0FBTkQsd0JBTUM7QUFFRDs7OztHQUlHO0FBQ0gsU0FBZ0IsR0FBRyxDQUFJLENBQVU7SUFDL0IsSUFBSSxDQUFDLEtBQUssV0FBRyxFQUFFO1FBQ2IsT0FBTyxXQUFHLENBQUM7S0FDWjtTQUFNO1FBQ0wsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxXQUFHLENBQUMsQ0FBQyxDQUFDO0tBQzNDO0FBQ0gsQ0FBQztBQU5ELGtCQU1DO0FBRUQ7Ozs7R0FJRztBQUNILFNBQWdCLFlBQVksQ0FBSSxDQUFVO0lBQ3hDLElBQU0sR0FBRyxHQUFRLEVBQUUsQ0FBQztJQUNwQixPQUFPLENBQUMsS0FBSyxXQUFHLEVBQUU7UUFDZCxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNmLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDO0tBQ1o7SUFDRCxPQUFPLEdBQUcsQ0FBQztBQUNiLENBQUM7QUFQRCxvQ0FPQztBQUVEOzs7O0dBSUc7QUFDSCxTQUFnQixhQUFhLENBQUksR0FBcUI7SUFDcEQsSUFBSSxDQUFDLEdBQVksV0FBRyxDQUFDO0lBQ3JCLEtBQUssSUFBSSxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUN0QyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztLQUN2QjtJQUNELE9BQU8sQ0FBQyxDQUFDO0FBQ1gsQ0FBQztBQU5ELHNDQU1DIn0=