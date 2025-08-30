import express, { Request, Response } from 'express'
import pgClient from '../db/postgres/pgClient'
import gitHubPayload from '../models/GitHubPayload'
import * as webRouteController from '../controllers/webRouteController'

const route = express.Router()

route.post('/', webRouteController.createRecord)
