import express from "express";
import { chat } from "./routes";


// Configure and start the HTTP server.
const port = 8080;
const app = express();
app.use(express.static('public'));
app.get("/chat", chat);
app.listen(port, () => console.log(`Server listening on ${port}`));