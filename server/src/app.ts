import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import dotenv from "dotenv";
dotenv.config({ path: ".env.development", override: true });

import webHookRoutes from './routes/webHookRoutes'

const app = express()

app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.set('views', './src/views')
app.set('view engine', 'ejs')

app.use('/', webHookRoutes)

export default app
