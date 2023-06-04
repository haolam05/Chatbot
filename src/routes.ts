import { Request, Response } from "express";
import { splitWords, joinWords } from './words';
import { PATTERNS } from "./patterns";
import { chatResponse } from "./chatbot";


// Keep track of the most recently used response for each pattern.
const lastUsed = new Map<string, number>();

// Keep track of possible responses for when we run out of things to say.
const memory: string[][] = [];


/**
 * Handles request for /chat, with a message included as a query parameter,
 * by getting the next chat response.
 */
export function chat(req: Request, res: Response) {
  const msg = first(req.query.message);
  if (msg !== undefined) {
    const words = splitWords(msg);
    const result = chatResponse(words, lastUsed, memory, PATTERNS);
    res.json({response: joinWords(result)});
  } else {
    res.status(500).send('required argument "message" missing');
  }
}


// Helper to return the (first) value of the parameter if any was given.
// (This is mildly annoying because the client can also give mutiple values,
// in which case, express puts them into an array.)
function first(param: any): string|undefined {
  if (Array.isArray(param)) {
    return first(param[0]);
  } else if (typeof param === 'string') {
    return param;
  } else {
    return undefined;
  }
}