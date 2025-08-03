import express from "express";
import http from "http";
import { WebSocketServer } from "ws";

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

const PORT = 8000;

wss.on("connection", (ws) => {
  console.log("✅ New client connected!");

  ws.on("message", (message) => {
    console.log(`Received message => ${message}`);
    ws.send(`Echo: ${message}`);
  });

  ws.on("close", () => {
    console.log("❌ Client disconnected");
  });

  ws.on("error", (error) => {
    console.error("WebSocket error:", error);
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Backend server is running on http://localhost:${PORT}`);
});
