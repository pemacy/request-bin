import express from 'express'
import * as webRouteController from '../controllers/webRouteController'

const webHookRoutes = express.Router()

webHookRoutes.get('/hello_world', webRouteController.helloWorld)
webHookRoutes.get('/', webRouteController.main)

webHookRoutes.post('/bins/new/:id', webRouteController.createBin)
webHookRoutes.get('/bins', webRouteController.getBins)
webHookRoutes.get('/:bin_id', webRouteController.showBin)
webHookRoutes.post('/:bin_id', webRouteController.createRecord)
webHookRoutes.get('/bins/:bin_id/records', webRouteController.getRecords)

export default webHookRoutes
