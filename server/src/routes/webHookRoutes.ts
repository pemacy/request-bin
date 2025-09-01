import express from 'express'
import * as webRouteController from '../controllers/webRouteController'

const webHookRoutes = express.Router()

// API Routes
webHookRoutes.get('/', webRouteController.getBins)
webHookRoutes.post('/:bin_id', webRouteController.createRecord)
webHookRoutes.post('/bins/new/:bin_id', webRouteController.createBin)
webHookRoutes.get('/:bin_id/records', webRouteController.getRecords)

// Test routes
webHookRoutes.get('/hello_world', webRouteController.helloWorld)
webHookRoutes.get('/testing/bins', webRouteController.testingShowBins)
webHookRoutes.get('/testing/:bin_id', webRouteController.testingShowRecords)
webHookRoutes.get('/testing/bins/new/:bin_id', webRouteController.testingCreateBin)
webHookRoutes.get('/testing/:bin_id/records', webRouteController.testingCreateRecord)

export default webHookRoutes
