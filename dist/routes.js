"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chat = void 0;
var words_1 = require("./words");
var patterns_1 = require("./patterns");
var chatbot_1 = require("./chatbot");
// Keep track of the most recently used response for each pattern.
var lastUsed = new Map();
// Keep track of possible responses for when we run out of things to say.
var memory = [];
/**
 * Handles request for /chat, with a message included as a query parameter,
 * by getting the next chat response.
 */
function chat(req, res) {
    var msg = first(req.query.message);
    if (msg !== undefined) {
        var words = (0, words_1.splitWords)(msg);
        var result = (0, chatbot_1.chatResponse)(words, lastUsed, memory, patterns_1.PATTERNS);
        res.json({ response: (0, words_1.joinWords)(result) });
    }
    else {
        res.status(500).send('required argument "message" missing');
    }
}
exports.chat = chat;
// Helper to return the (first) value of the parameter if any was given.
// (This is mildly annoying because the client can also give mutiple values,
// in which case, express puts them into an array.)
function first(param) {
    if (Array.isArray(param)) {
        return first(param[0]);
    }
    else if (typeof param === 'string') {
        return param;
    }
    else {
        return undefined;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3JvdXRlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxpQ0FBZ0Q7QUFDaEQsdUNBQXNDO0FBQ3RDLHFDQUF5QztBQUd6QyxrRUFBa0U7QUFDbEUsSUFBTSxRQUFRLEdBQUcsSUFBSSxHQUFHLEVBQWtCLENBQUM7QUFFM0MseUVBQXlFO0FBQ3pFLElBQU0sTUFBTSxHQUFlLEVBQUUsQ0FBQztBQUc5Qjs7O0dBR0c7QUFDSCxTQUFnQixJQUFJLENBQUMsR0FBWSxFQUFFLEdBQWE7SUFDOUMsSUFBTSxHQUFHLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDckMsSUFBSSxHQUFHLEtBQUssU0FBUyxFQUFFO1FBQ3JCLElBQU0sS0FBSyxHQUFHLElBQUEsa0JBQVUsRUFBQyxHQUFHLENBQUMsQ0FBQztRQUM5QixJQUFNLE1BQU0sR0FBRyxJQUFBLHNCQUFZLEVBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsbUJBQVEsQ0FBQyxDQUFDO1FBQy9ELEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBQyxRQUFRLEVBQUUsSUFBQSxpQkFBUyxFQUFDLE1BQU0sQ0FBQyxFQUFDLENBQUMsQ0FBQztLQUN6QztTQUFNO1FBQ0wsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMscUNBQXFDLENBQUMsQ0FBQztLQUM3RDtBQUNILENBQUM7QUFURCxvQkFTQztBQUdELHdFQUF3RTtBQUN4RSw0RUFBNEU7QUFDNUUsbURBQW1EO0FBQ25ELFNBQVMsS0FBSyxDQUFDLEtBQVU7SUFDdkIsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQ3hCLE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ3hCO1NBQU0sSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7UUFDcEMsT0FBTyxLQUFLLENBQUM7S0FDZDtTQUFNO1FBQ0wsT0FBTyxTQUFTLENBQUM7S0FDbEI7QUFDSCxDQUFDIn0=