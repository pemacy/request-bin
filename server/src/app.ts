import express from 'express'
import cors from 'cors'
import webHookRoutes from './routes/webHookRoutes'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/', webHookRoutes)

export default app
