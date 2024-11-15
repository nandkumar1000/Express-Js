import express from 'express';
import { WebSocketServer } from 'ws';
const app = express();
const port = 3000;
const http = require("http");
const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})

const wss = new WebSocketServer({ server });

wss.connection('connection', (ws) => {
  ws.on("message", (data) => {
    console.log("data from server%s:", data);
    ws.send("thanks!");
  })
})