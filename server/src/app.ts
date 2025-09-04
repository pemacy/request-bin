import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import dotenv from "dotenv";
dotenv.config({ path: ".env.development", override: true });

import webHookRoutes from './routes/webHookRoutes'
import testingRoutes from './routes/testingRoutes'

const app = express()
//
//// server.ts
//import http from "http";
//import WebSocket from "ws";
//
//const app = express();
//const server = http.createServer(app);
//const wss = new WebSocket.Server({ server });
//
//wss.on("connection", (ws) => {
//  console.log("Client connected");
//
//  // Send JSON data immediately
//  ws.send(JSON.stringify({ type: "WELCOME", message: "Hello client!" }));
//
//  // Example: periodically send updates
//  const interval = setInterval(() => {
//    const payload = {
//      type: "UPDATE",
//      timestamp: new Date().toISOString(),
//      value: Math.random(),
//    };
//    ws.send(JSON.stringify(payload));
//  }, 3000);
//
//  ws.on("close", () => {
//    console.log("Client disconnected");
//    clearInterval(interval);
//  });
//});
//
//server.listen(8080, () => console.log("Server running on port 8080"));


app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.set('views', './src/views')
app.set('view engine', 'ejs')

app.use('/', webHookRoutes)
app.use('/testing', testingRoutes)

export default app
