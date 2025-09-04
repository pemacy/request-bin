import app from './app'
import connectMongoDB from './db/mongodb/connectMongoDB'
import pgClient from './db/postgres/pgClient'
import http from "http"
import WebSocket from 'ws'

const PORT = process.env.PORT || 3000

connectMongoDB()
pgClient.connect().then(() => {
  console.log('Postgres DB connected:', pgClient.database)
})

const server = http.createServer(app)
export const wss = new WebSocket.Server({ server })

wss.on("connection", (ws) => {
  console.log("Client Connected")
  ws.send(JSON.stringify(({ type: "Welcome", message: 'Connected to web socket' })))
})

server.listen(PORT, () => {
  console.log('Request Bin server started on port', PORT)
})
